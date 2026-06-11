import os
from pathlib import Path
from typing import Any

import pandas as pd
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR.parent / "BackEnd" / ".env")
load_dotenv(BASE_DIR / ".env")
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sklearn.linear_model import LinearRegression
from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine

load_dotenv()

MIN_SAMPLES_FOR_REGRESSION = 5
CONFIDENCE_MARGIN = 0.10

app = FastAPI(title="YMMO Data Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_engine: Engine | None = None


class PredictRequest(BaseModel):
    city: str
    surface: float = Field(gt=0)
    rooms: int = Field(ge=0)
    type: str


def success_response(data: Any) -> dict[str, Any]:
    return {"success": True, "data": data}


def get_engine() -> Engine:
    global _engine
    if _engine is None:
        database_url = os.getenv("DATABASE_URL")
        if not database_url:
            raise HTTPException(
                status_code=500,
                detail="DATABASE_URL n'est pas configurée.",
            )
        _engine = create_engine(database_url)
    return _engine


def read_query(query: str) -> pd.DataFrame:
    try:
        return pd.read_sql(text(query), get_engine())
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Erreur de connexion à la base de données : {exc}",
        ) from exc


def load_properties() -> pd.DataFrame:
    return read_query(
        """
        SELECT id, title, price, surface, rooms, type, city, "postalCode", status, "createdAt", "agentId"
        FROM "Property"
        WHERE price > 0 AND surface > 0
        """
    )


def load_favorites() -> pd.DataFrame:
    return read_query('SELECT id, "propertyId", "userId" FROM "Favorite"')


def load_transactions() -> pd.DataFrame:
    return read_query('SELECT id, "propertyId", "offerPrice", status, "createdAt" FROM "Transaction"')


def train_regression(df: pd.DataFrame) -> tuple[LinearRegression, float] | None:
    if len(df) < MIN_SAMPLES_FOR_REGRESSION:
        return None

    x = df[["surface"]].values
    y = df["price"].values
    model = LinearRegression()
    model.fit(x, y)
    r2 = round(float(model.score(x, y)), 2)
    return model, r2


def regression_stats(model: LinearRegression, r2: float) -> dict[str, float]:
    return {
        "coefficient": round(float(model.coef_[0]), 2),
        "intercept": round(float(model.intercept_), 2),
        "r2": r2,
    }


def national_price_per_sqm(properties: pd.DataFrame) -> float:
    if properties.empty:
        raise HTTPException(
            status_code=404,
            detail="Aucune donnée immobilière disponible pour estimer un prix.",
        )
    return float((properties["price"] / properties["surface"]).mean())


def predict_price(
    properties: pd.DataFrame,
    city: str,
    surface: float,
    property_type: str | None = None,
) -> dict[str, Any]:
    city_df = properties[properties["city"].str.lower() == city.lower()]

    if property_type:
        typed_df = city_df[city_df["type"] == property_type.upper()]
        if len(typed_df) >= MIN_SAMPLES_FOR_REGRESSION:
            city_df = typed_df

    result = train_regression(city_df)
    if result is not None:
        model, r2 = result
        predicted = float(model.predict([[surface]])[0])
        return {
            "predictedPrice": round(predicted, 2),
            "confidenceMin": round(predicted * (1 - CONFIDENCE_MARGIN), 2),
            "confidenceMax": round(predicted * (1 + CONFIDENCE_MARGIN), 2),
            "method": "city_regression",
            "city": city,
            "surface": surface,
            "model": regression_stats(model, r2),
        }

    price_per_sqm = national_price_per_sqm(properties)
    predicted = price_per_sqm * surface
    message = (
        f"Données insuffisantes pour {city} "
        f"(moins de {MIN_SAMPLES_FOR_REGRESSION} biens). "
        "Estimation basée sur la moyenne nationale."
    )

    return {
        "predictedPrice": round(predicted, 2),
        "confidenceMin": round(predicted * (1 - CONFIDENCE_MARGIN), 2),
        "confidenceMax": round(predicted * (1 + CONFIDENCE_MARGIN), 2),
        "method": "national_average",
        "city": city,
        "surface": surface,
        "pricePerSqm": round(price_per_sqm, 2),
        "message": message,
    }


@app.get("/analytics/market")
def get_market_analytics():
    properties = load_properties()

    if properties.empty:
        return success_response(
            {
                "message": "Aucune propriété disponible pour l'analyse du marché.",
                "cities": {},
            }
        )

    grouped = (
        properties.groupby(["city", "type"])["price"]
        .agg(["mean", "median", "min", "max"])
        .round(2)
        .reset_index()
    )

    cities: dict[str, dict[str, dict[str, float]]] = {}
    for _, row in grouped.iterrows():
        city = row["city"]
        property_type = row["type"]
        cities.setdefault(city, {})[property_type] = {
            "mean": float(row["mean"]),
            "median": float(row["median"]),
            "min": float(row["min"]),
            "max": float(row["max"]),
        }

    return success_response({"cities": cities})


@app.get("/analytics/popular")
def get_popular_properties():
    properties = load_properties()
    favorites = load_favorites()
    transactions = load_transactions()

    if properties.empty:
        return success_response(
            {
                "message": "Aucune propriété disponible.",
                "properties": [],
            }
        )

    fav_counts = (
        favorites.groupby("propertyId").size().reset_index(name="favorites")
        if not favorites.empty
        else pd.DataFrame(columns=["propertyId", "favorites"])
    )
    tx_counts = (
        transactions.groupby("propertyId").size().reset_index(name="transactions")
        if not transactions.empty
        else pd.DataFrame(columns=["propertyId", "transactions"])
    )

    popular = properties[["id", "title", "city", "price"]].copy()
    popular = popular.merge(fav_counts, left_on="id", right_on="propertyId", how="left")
    popular = popular.merge(tx_counts, left_on="id", right_on="propertyId", how="left")
    popular["favorites"] = popular["favorites"].fillna(0).astype(int)
    popular["transactions"] = popular["transactions"].fillna(0).astype(int)
    popular["score"] = popular["favorites"] * 1 + popular["transactions"] * 2

    top = (
        popular.sort_values("score", ascending=False)
        .head(10)[["id", "title", "city", "price", "score"]]
        .round({"price": 2})
    )

    return success_response(
        {
            "properties": [
                {
                    "id": row["id"],
                    "title": row["title"],
                    "city": row["city"],
                    "price": float(row["price"]),
                    "score": int(row["score"]),
                }
                for _, row in top.iterrows()
            ]
        }
    )


@app.get("/analytics/predictions")
def get_predictions():
    properties = load_properties()

    if properties.empty:
        return success_response(
            {
                "message": "Aucune propriété disponible pour entraîner les modèles.",
                "predictions": {},
            }
        )

    predictions: dict[str, dict[str, float]] = {}
    skipped: dict[str, str] = {}

    for city, city_df in properties.groupby("city"):
        result = train_regression(city_df)
        if result is None:
            skipped[city] = (
                f"Moins de {MIN_SAMPLES_FOR_REGRESSION} biens — modèle non entraîné."
            )
            continue
        model, r2 = result
        predictions[city] = regression_stats(model, r2)

    return success_response(
        {
            "predictions": predictions,
            "skipped": skipped,
        }
    )


@app.post("/analytics/predict")
def predict_property_price(body: PredictRequest):
    properties = load_properties()
    data = predict_price(
        properties=properties,
        city=body.city,
        surface=body.surface,
        property_type=body.type,
    )
    data["rooms"] = body.rooms
    data["type"] = body.type.upper()
    return success_response(data)


@app.get("/health")
def health_check():
    return success_response({"status": "ok"})


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

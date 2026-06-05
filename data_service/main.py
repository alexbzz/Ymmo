from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Ymmo Data Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Prix moyens au m2 par ville ────────────────────────
PRICE_PER_M2 = {
    "Paris": 10500,
    "Lyon": 5200,
    "Marseille": 3800,
    "Bordeaux": 4600,
    "Toulouse": 3900,
    "Nice": 5800,
    "Nantes": 4100,
    "Strasbourg": 3700
}

# ── Routes ─────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok", "service": "Ymmo Data Service"}

@app.get("/predict")
def predict_price(city: str, surface: float, rooms: int):
    if city not in PRICE_PER_M2:
        return {
            "error": f"Ville inconnue.",
            "availableCities": list(PRICE_PER_M2.keys())
        }

    base_price = PRICE_PER_M2[city] * surface
    room_bonus = (rooms - 1) * 5000
    predicted = base_price + room_bonus

    return {
        "city": city,
        "surface": surface,
        "rooms": rooms,
        "predictedPrice": round(predicted, 2),
        "pricePerM2": PRICE_PER_M2[city]
    }

@app.get("/trends")
def get_trends():
    trends = [
        {"city": city, "pricePerM2": price, "trend": "stable"}
        for city, price in PRICE_PER_M2.items()
    ]
    trends.sort(key=lambda x: x["pricePerM2"], reverse=True)
    return {"trends": trends}

@app.get("/popular")
def get_popular():
    popular = [
        {"city": "Paris", "count": 142, "avgPrice": 850000},
        {"city": "Lyon", "count": 98, "avgPrice": 320000},
        {"city": "Bordeaux", "count": 87, "avgPrice": 280000},
        {"city": "Marseille", "count": 76, "avgPrice": 210000},
        {"city": "Nantes", "count": 65, "avgPrice": 240000},
    ]
    return {"popular": popular}
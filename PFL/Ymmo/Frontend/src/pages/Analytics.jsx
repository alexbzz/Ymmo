import React, { useMemo, useState } from 'react';
import { analyticsAPI } from '../services/api';
import { useAnalytics } from '../hooks/useAnalytics';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { formatPrice, formatType } from '../utils/formatters';

const PROPERTY_TYPES = ['APARTMENT', 'HOUSE', 'LAND', 'COMMERCIAL'];

const EMPTY_FORM = {
  city: '',
  surface: '',
  rooms: '',
  type: 'APARTMENT',
};

const typeOrder = (type) => PROPERTY_TYPES.indexOf(type);

export const Analytics = () => {
  const { data, loading, error, refetch } = useAnalytics();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [prediction, setPrediction] = useState(null);
  const [predictionError, setPredictionError] = useState(null);
  const [predicting, setPredicting] = useState(false);

  const marketRows = useMemo(() => {
    const cities = data.market?.cities || {};

    return Object.entries(cities)
      .flatMap(([city, types]) =>
        Object.entries(types).map(([propertyType, stats]) => ({
          city,
          propertyType,
          ...stats,
        }))
      )
      .sort((left, right) => {
        const cityCompare = left.city.localeCompare(right.city, 'fr');
        if (cityCompare !== 0) {
          return cityCompare;
        }

        return typeOrder(left.propertyType) - typeOrder(right.propertyType);
      });
  }, [data.market]);

  const popularProperties = data.popular?.properties || [];
  const maxScore = popularProperties.length > 0
    ? Math.max(...popularProperties.map((property) => property.score), 1)
    : 1;
  const predictionStats = data.predictions?.predictions || {};
  const skippedPredictions = data.predictions?.skipped || {};
  const analyticsReady = !loading && !error;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPredicting(true);
    setPredictionError(null);

    try {
      const response = await analyticsAPI.predict({
        city: formData.city.trim(),
        surface: Number(formData.surface),
        rooms: Number(formData.rooms),
        type: formData.type,
      });

      setPrediction(response.data);
    } catch (err) {
      setPrediction(null);
      setPredictionError(err.message);
    } finally {
      setPredicting(false);
    }
  };

  return (
    <main className="page-container" id="main-content">
      <h1 style={{ marginTop: 0 }}>Analytics immobiliers</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
        Consultez les tendances du marché, les biens les plus populaires et testez un simulateur de prix.
      </p>

      {error && (
        <div className="alert alert-error" role="alert" aria-live="polite">
          {error}
        </div>
      )}

      {loading && !error && <LoadingSpinner label="Chargement des analyses..." />}

      <section style={{ marginBottom: '2rem' }} aria-labelledby="market-title">
        <h2 id="market-title">Marché</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Prix moyen, médian, minimum et maximum par ville et type de bien.
        </p>

        {!analyticsReady ? null : marketRows.length === 0 ? (
          <div className="alert alert-info" role="status">
            Aucune donnée de marché disponible pour le moment.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="analytics-table" aria-label="Tableau des prix du marché">
              <thead>
                <tr>
                  {['Ville', 'Type', 'Moyenne', 'Médiane', 'Min', 'Max'].map((header) => (
                    <th key={header} scope="col">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {marketRows.map((row) => (
                  <tr key={`${row.city}-${row.propertyType}`}>
                    <td>{row.city}</td>
                    <td>{formatType(row.propertyType)}</td>
                    <td>{formatPrice(row.mean)}</td>
                    <td>{formatPrice(row.median)}</td>
                    <td>{formatPrice(row.min)}</td>
                    <td>{formatPrice(row.max)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section style={{ marginBottom: '2rem' }} aria-labelledby="popular-title">
        <h2 id="popular-title">Biens populaires</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Top 10 des biens les plus populaires, calculé à partir des favoris et des transactions.
        </p>

        {!analyticsReady ? null : popularProperties.length === 0 ? (
          <div className="alert alert-info" role="status">
            Aucun bien populaire à afficher pour le moment.
          </div>
        ) : (
          <div className="properties-grid" role="list" aria-label="Liste des biens populaires">
            {popularProperties.map((property) => {
              const scoreWidth = (property.score / maxScore) * 100;

              return (
                <article
                  key={property.id}
                  className="stat-box"
                  role="listitem"
                  aria-label={`${property.title}, score ${property.score}`}
                  style={{ textAlign: 'left' }}
                >
                  <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{property.title}</h3>
                  <p style={{ margin: '0 0 0.25rem', color: 'var(--color-text-muted)' }}>{property.city}</p>
                  <p style={{ margin: '0 0 1rem', fontWeight: 600 }}>{formatPrice(property.price)}</p>

                  <div aria-hidden="true" style={{ marginBottom: '0.5rem' }}>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${scoreWidth}%` }} />
                    </div>
                  </div>

                  <strong>Score : {property.score}</strong>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section aria-labelledby="simulator-title">
        <h2 id="simulator-title">Simulateur de prix</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Saisissez les caractéristiques d'un bien pour obtenir une estimation avec intervalle de confiance.
        </p>

        <form className="form-card" onSubmit={handleSubmit} aria-label="Simulateur de prix immobilier">
          <div className="form-group">
            <label htmlFor="city">Ville</label>
            <input
              id="city"
              name="city"
              type="text"
              className="form-input"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ex. Paris"
              required
              aria-label="Ville"
            />
          </div>

          <div className="form-group">
            <label htmlFor="surface">Surface (m²)</label>
            <input
              id="surface"
              name="surface"
              type="number"
              className="form-input"
              value={formData.surface}
              onChange={handleChange}
              min="1"
              step="0.1"
              required
              aria-label="Surface en mètres carrés"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rooms">Pièces</label>
            <input
              id="rooms"
              name="rooms"
              type="number"
              className="form-input"
              value={formData.rooms}
              onChange={handleChange}
              min="0"
              step="1"
              required
              aria-label="Nombre de pièces"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
              required
              aria-label="Type de bien"
            >
              {PROPERTY_TYPES.map((propertyType) => (
                <option key={propertyType} value={propertyType}>
                  {formatType(propertyType)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={predicting}
            aria-busy={predicting}
          >
            {predicting ? 'Estimation en cours...' : 'Estimer'}
          </button>
        </form>

        {predictionError && (
          <div className="alert alert-error" role="alert" aria-live="polite">
            {predictionError}
          </div>
        )}

        {prediction && (
          <div className="alert alert-info" role="status" aria-live="polite">
            <strong>{formatPrice(prediction.predictedPrice)}</strong>
            {' '}— intervalle de confiance entre {formatPrice(prediction.confidenceMin)} et {formatPrice(prediction.confidenceMax)}.
            {prediction.message && <div style={{ marginTop: '0.5rem' }}>{prediction.message}</div>}
          </div>
        )}

        {analyticsReady && !prediction && !predictionError && (
          <div className="alert alert-info" role="status" aria-live="polite">
            Renseignez un bien puis lancez une estimation pour voir le résultat ici.
          </div>
        )}

        {analyticsReady && Object.keys(predictionStats).length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h3>Modèles par ville</h3>
            <div className="properties-grid" role="list" aria-label="Synthèse des modèles de régression">
              {Object.entries(predictionStats).map(([city, stats]) => (
                <article key={city} className="stat-box" role="listitem" style={{ textAlign: 'left' }}>
                  <h4 style={{ marginTop: 0 }}>{city}</h4>
                  <p style={{ margin: '0.35rem 0' }}>Coefficient : {stats.coefficient}</p>
                  <p style={{ margin: '0.35rem 0' }}>R² : {stats.r2}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {analyticsReady && Object.keys(skippedPredictions).length > 0 && (
          <div className="alert alert-info" role="status" aria-live="polite" style={{ marginTop: '1rem' }}>
            Certaines villes n'ont pas assez de données pour entraîner un modèle :
            <ul style={{ marginBottom: 0 }}>
              {Object.entries(skippedPredictions).map(([city, message]) => (
                <li key={city}>{city} — {message}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <div style={{ marginTop: '2rem' }}>
        <button type="button" className="btn btn-primary" onClick={refetch}>
          Rafraîchir les données
        </button>
      </div>
    </main>
  );
};

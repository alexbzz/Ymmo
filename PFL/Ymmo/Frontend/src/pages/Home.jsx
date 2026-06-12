import React from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties';
import { PropertyCard } from '../components/properties/PropertyCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const Home = () => {
  const { properties, loading, error } = useProperties();

  return (
    <div>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div>
            <div className="hero-kicker">Plateforme immobilière premium</div>
            <h1 id="hero-title" className="hero-title">
              Trouvez, analysez et valorisez le bien idéal avec Ymmo.
            </h1>
            <p className="hero-subtitle">
              Une expérience immobilière moderne, pilotée par des données fiables, des biens sélectionnés et une interface pensée pour comparer rapidement les opportunités.
            </p>
            <div className="hero-actions">
              <Link to="/properties" className="btn btn-primary">
                Voir les biens
              </Link>
              <Link to="/analytics" className="btn btn-outline">
                Analyser le marché
              </Link>
            </div>
          </div>

          <aside className="hero-card" aria-label="Aperçu Ymmo">
            <div className="hero-card__row">
              <span className="hero-card__label">Biens suivis</span>
              <strong className="hero-card__value">1 000+</strong>
            </div>
            <div className="hero-card__row">
              <span className="hero-card__label">Prix analysés</span>
              <strong className="hero-card__value">Marché IA</strong>
            </div>
            <div className="hero-card__row">
              <span className="hero-card__label">Zones couvertes</span>
              <strong className="hero-card__value">Grandes villes FR</strong>
            </div>
          </aside>
        </div>
      </section>

      <section className="page-container" aria-labelledby="why-title">
        <h2 id="why-title" className="section-heading">Pourquoi Ymmo</h2>
        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">🔒</div>
            <h3 className="feature-title">Sécurisé</h3>
            <p className="feature-text">
              Des parcours clairs, des accès protégés et des actions visibles pour chaque profil.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">📊</div>
            <h3 className="feature-title">Données IA</h3>
            <p className="feature-text">
              Un suivi du marché et des tendances pour comparer plus vite les biens et les prix.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">🏠</div>
            <h3 className="feature-title">12 agences</h3>
            <p className="feature-text">
              Un réseau multi-ville pour proposer des biens variés, du centre-ville à la maison familiale.
            </p>
          </article>
        </div>
      </section>

      <section className="page-container" style={{ marginTop: '1rem' }} aria-labelledby="recent-title">
        <h2 id="recent-title" className="section-heading">Propriétés récentes</h2>
        {error && <div className="alert alert-error" role="alert">{error}</div>}
        {loading ? (
          <LoadingSpinner label="Chargement des propriétés récentes…" />
        ) : (
          <div className="properties-grid" role="list">
            {properties.slice(0, 6).map((property) => (
              <div key={property.id} role="listitem">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="stats-row" aria-label="Chiffres clés">
        <div className="stat-card">
          <h3 style={styles.statNumber}>1000+</h3>
          <p style={styles.statLabel}>Propriétés</p>
        </div>
        <div className="stat-card">
          <h3 style={styles.statNumber}>500+</h3>
          <p style={styles.statLabel}>Agents</p>
        </div>
        <div className="stat-card">
          <h3 style={styles.statNumber}>10k+</h3>
          <p style={styles.statLabel}>Clients satisfaits</p>
        </div>
      </section>
    </div>
  );
};

const styles = {
  statNumber: {
    fontSize: '2rem',
    color: 'var(--color-primary)',
    margin: '0',
  },
  statLabel: {
    color: 'var(--color-text-muted)',
    margin: '0.5rem 0 0 0',
  },
};

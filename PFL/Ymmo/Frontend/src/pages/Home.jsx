import React from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties';
import { PropertyCard } from '../components/properties/PropertyCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const Home = () => {
  const { properties, loading, error } = useProperties();

  return (
    <div>
      <section style={styles.hero} aria-labelledby="hero-title">
        <div style={styles.heroContent}>
          <h1 id="hero-title" style={styles.heroTitle}>Bienvenue sur YMMO</h1>
          <p style={styles.heroSubtitle}>Découvrez les meilleures propriétés</p>
          <Link to="/properties" className="btn" style={styles.heroButton}>
            Explorer les biens
          </Link>
        </div>
      </section>

      <section className="container" style={styles.section} aria-labelledby="recent-title">
        <h2 id="recent-title" style={styles.sectionTitle}>Propriétés récentes</h2>
        {error && (
          <div className="alert alert-error" role="alert">{error}</div>
        )}
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
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    padding: '4rem 1rem',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
    marginBottom: '1rem',
  },
  heroSubtitle: {
    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
    marginBottom: '2rem',
  },
  heroButton: {
    display: 'inline-block',
    background: '#fff',
    color: '#667eea',
    padding: '0.75rem 2rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  section: {
    margin: '3rem auto',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    marginBottom: '2rem',
  },
  statNumber: {
    fontSize: '2rem',
    color: '#e74c3c',
    margin: '0',
  },
  statLabel: {
    color: '#666',
    margin: '0.5rem 0 0 0',
  },
};

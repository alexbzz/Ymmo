import React from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties';
import { PropertyCard } from '../components/properties/PropertyCard';

export const Home = () => {
  const { properties, loading } = useProperties();

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Bienvenue sur YMMO</h1>
          <p style={styles.heroSubtitle}>Découvrez les meilleures propriétés</p>
          <Link to="/properties" style={styles.heroButton}>
            Explorer les biens
          </Link>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Propriétés récentes</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div style={styles.grid}>
            {properties.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>

      <section style={styles.statsSection}>
        <div style={styles.stat}>
          <h3 style={styles.statNumber}>1000+</h3>
          <p style={styles.statLabel}>Propriétés</p>
        </div>
        <div style={styles.stat}>
          <h3 style={styles.statNumber}>500+</h3>
          <p style={styles.statLabel}>Agents</p>
        </div>
        <div style={styles.stat}>
          <h3 style={styles.statNumber}>10k+</h3>
          <p style={styles.statLabel}>Clients satisfaits</p>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    width: '100%'
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    padding: '4rem 1rem',
    textAlign: 'center'
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem'
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem'
  },
  heroButton: {
    display: 'inline-block',
    background: '#fff',
    color: '#667eea',
    padding: '0.75rem 2rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  section: {
    maxWidth: '1200px',
    margin: '3rem auto',
    padding: '0 1rem'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    marginBottom: '2rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '2rem'
  },
  statsSection: {
    background: '#f8f9fa',
    display: 'flex',
    justifyContent: 'center',
    gap: '4rem',
    padding: '3rem 1rem',
    textAlign: 'center'
  },
  stat: {
    flex: 1
  },
  statNumber: {
    fontSize: '2rem',
    color: '#e74c3c',
    margin: '0'
  },
  statLabel: {
    color: '#666',
    margin: '0.5rem 0 0 0'
  }
};

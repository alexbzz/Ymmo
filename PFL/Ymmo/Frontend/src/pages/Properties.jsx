import React, { useState } from 'react';
import { useProperties } from '../hooks/useProperties';
import { PropertyCard } from '../components/properties/PropertyCard';

export const Properties = () => {
  const [filters, setFilters] = useState({});
  const { properties, loading } = useProperties(filters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value || undefined });
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <aside style={styles.sidebar}>
          <h3 style={styles.filterTitle}>Filtres</h3>
          
          <div style={styles.filterGroup}>
            <label>Ville</label>
            <input
              type="text"
              name="city"
              placeholder="Entrez une ville"
              onChange={handleFilterChange}
              style={styles.input}
            />
          </div>

          <div style={styles.filterGroup}>
            <label>Type</label>
            <select name="type" onChange={handleFilterChange} style={styles.select}>
              <option value="">Tous</option>
              <option value="APARTMENT">Appartement</option>
              <option value="HOUSE">Maison</option>
              <option value="LAND">Terrain</option>
              <option value="COMMERCIAL">Commercial</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label>Prix min</label>
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              onChange={handleFilterChange}
              style={styles.input}
            />
          </div>

          <div style={styles.filterGroup}>
            <label>Prix max</label>
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              onChange={handleFilterChange}
              style={styles.input}
            />
          </div>

          <div style={styles.filterGroup}>
            <label>Surface min (m²)</label>
            <input
              type="number"
              name="minSurface"
              placeholder="Min"
              onChange={handleFilterChange}
              style={styles.input}
            />
          </div>
        </aside>

        <main style={styles.main}>
          <h1 style={styles.title}>Propriétés</h1>
          {loading ? (
            <p>Chargement...</p>
          ) : properties.length === 0 ? (
            <p>Aucune propriété trouvée</p>
          ) : (
            <div style={styles.grid}>
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  content: {
    display: 'flex',
    gap: '2rem'
  },
  sidebar: {
    flex: '0 0 250px',
    background: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
    height: 'fit-content'
  },
  filterTitle: {
    marginTop: 0,
    marginBottom: '1.5rem'
  },
  filterGroup: {
    marginBottom: '1.5rem'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    marginTop: '0.5rem'
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    marginTop: '0.5rem'
  },
  main: {
    flex: 1
  },
  title: {
    marginTop: 0
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '2rem'
  }
};

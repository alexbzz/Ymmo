import React, { useState } from 'react';
import { useProperties } from '../hooks/useProperties';
import { PropertyCard } from '../components/properties/PropertyCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const Properties = () => {
  const [filters, setFilters] = useState({});
  const { properties, loading, error } = useProperties(filters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value || undefined }));
  };

  const handleReset = () => setFilters({});

  return (
    <main className="page-container" id="main-content">
      <div className="page-layout">
        <aside className="filters-sidebar" aria-label="Filtres de recherche">
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.1rem' }}>Filtres</h2>

          <form onSubmit={(e) => e.preventDefault()} aria-label="Formulaire de filtres">
            <div className="form-group">
              <label htmlFor="filter-city">Ville</label>
              <input
                id="filter-city"
                type="text"
                name="city"
                className="form-input"
                placeholder="Entrez une ville"
                value={filters.city || ''}
                onChange={handleFilterChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="filter-type">Type</label>
              <select
                id="filter-type"
                name="type"
                className="form-select"
                value={filters.type || ''}
                onChange={handleFilterChange}
              >
                <option value="">Tous</option>
                <option value="APARTMENT">Appartement</option>
                <option value="HOUSE">Maison</option>
                <option value="LAND">Terrain</option>
                <option value="COMMERCIAL">Commercial</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="filter-minPrice">Prix min (€)</label>
              <input
                id="filter-minPrice"
                type="number"
                name="minPrice"
                className="form-input"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={handleFilterChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="filter-maxPrice">Prix max (€)</label>
              <input
                id="filter-maxPrice"
                type="number"
                name="maxPrice"
                className="form-input"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={handleFilterChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="filter-minSurface">Surface min (m²)</label>
              <input
                id="filter-minSurface"
                type="number"
                name="minSurface"
                className="form-input"
                placeholder="Min"
                value={filters.minSurface || ''}
                onChange={handleFilterChange}
                min="0"
              />
            </div>

            <button type="button" className="btn btn-outline btn-full" onClick={handleReset}>
              Réinitialiser les filtres
            </button>
          </form>
        </aside>

        <section style={{ flex: 1 }} aria-labelledby="properties-title">
          <h1 id="properties-title" style={{ marginTop: 0 }}>Propriétés</h1>

          {error && (
            <div className="alert alert-error" role="alert" aria-live="polite">
              {error}
            </div>
          )}

          {loading ? (
            <LoadingSpinner label="Chargement des propriétés…" />
          ) : properties.length === 0 ? (
            <p role="status" style={{ color: '#666' }}>Aucune propriété trouvée.</p>
          ) : (
            <div className="properties-grid" role="list" aria-label={`${properties.length} propriété(s) trouvée(s)`}>
              {properties.map((property) => (
                <div key={property.id} role="listitem">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

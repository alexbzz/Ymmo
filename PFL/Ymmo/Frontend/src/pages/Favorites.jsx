import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { PropertyCard } from '../components/properties/PropertyCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const Favorites = () => {
  const { favorites, loading, error } = useFavorites();

  return (
    <main className="page-container" id="main-content">
      <h1 style={{ marginTop: 0 }}>Mes favoris</h1>

      {error && (
        <div className="alert alert-error" role="alert" aria-live="polite">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner label="Chargement de vos favoris…" />
      ) : favorites.length === 0 ? (
        <p role="status" style={{ color: '#666' }}>
          Vous n'avez pas encore de biens en favoris. Parcourez les{' '}
          <Link to="/properties" style={{ color: '#667eea' }}>propriétés disponibles</Link>.
        </p>
      ) : (
        <div className="properties-grid" role="list" aria-label="Liste des favoris">
          {favorites.map((fav) => (
            <div key={fav.id} role="listitem">
              <PropertyCard property={fav.property} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

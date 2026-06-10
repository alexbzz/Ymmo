import { useState, useEffect, useCallback } from 'react';
import { favoritesAPI } from '../services/api';

export const useFavorites = (enabled = true) => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);

  const fetchFavorites = useCallback(async () => {
    if (!enabled) return;
    try {
      setLoading(true);
      setError(null);
      const response = await favoritesAPI.getAll();
      setFavorites(response.data);
      setFavoriteIds(new Set(response.data.map((f) => f.propertyId)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (enabled) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [fetchFavorites, enabled]);

  const toggleFavorite = async (propertyId) => {
    const isFavorite = favoriteIds.has(propertyId);
    if (isFavorite) {
      await favoritesAPI.remove(propertyId);
    } else {
      await favoritesAPI.add(propertyId);
    }
    await fetchFavorites();
  };

  return { favorites, favoriteIds, loading, error, toggleFavorite, refetch: fetchFavorites };
};

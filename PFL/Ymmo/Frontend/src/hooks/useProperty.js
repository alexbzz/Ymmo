import { useState, useEffect } from 'react';
import { propertiesAPI } from '../services/api';

export const useProperty = (id) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await propertiesAPI.getById(id);
        if (!cancelled) setProperty(response.data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProperty();
    return () => { cancelled = true; };
  }, [id]);

  return { property, loading, error };
};

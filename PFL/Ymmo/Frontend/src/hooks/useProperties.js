import { useState, useEffect } from 'react';
import { propertiesAPI } from '../services/api';

const EMPTY_FILTERS = {};

export const useProperties = (filters = EMPTY_FILTERS) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const filterKey = JSON.stringify(filters);

  useEffect(() => {
    let cancelled = false;

    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await propertiesAPI.getAll(filters);
        if (!cancelled) setProperties(response.data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProperties();
    return () => { cancelled = true; };
  }, [filterKey]);

  return { properties, loading, error };
};

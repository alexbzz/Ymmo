import { useCallback, useEffect, useState } from 'react';
import { analyticsAPI } from '../services/api';

export const useAnalytics = () => {
  const [data, setData] = useState({
    market: null,
    popular: null,
    predictions: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [marketResponse, popularResponse, predictionsResponse] = await Promise.all([
        analyticsAPI.getMarket(),
        analyticsAPI.getPopular(),
        analyticsAPI.getPredictions(),
      ]);

      setData({
        market: marketResponse.data,
        popular: popularResponse.data,
        predictions: predictionsResponse.data,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { data, loading, error, refetch: fetchAnalytics };
};

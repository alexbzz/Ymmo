import { useCallback, useEffect, useState } from 'react';
import { adminAPI } from '../services/api';

export const useAdminDashboard = () => {
  const [data, setData] = useState({
    overview: null,
    users: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [overviewResponse, usersResponse] = await Promise.all([
        adminAPI.getOverview(),
        adminAPI.getUsers(),
      ]);

      setData({
        overview: overviewResponse.data,
        users: usersResponse.data,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { data, loading, error, refetch: fetchDashboard };
};

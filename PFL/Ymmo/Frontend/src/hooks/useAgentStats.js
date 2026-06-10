import { useState, useEffect } from 'react';
import { agentsAPI } from '../services/api';

export const useAgentStats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await agentsAPI.getMyStats();
      const statsData = response.data;
      try {
        const agentResponse = await agentsAPI.getById(statsData.agent.id);
        setData({ ...statsData, agent: agentResponse.data });
      } catch {
        setData(statsData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { data, loading, error, refetch: fetchStats };
};

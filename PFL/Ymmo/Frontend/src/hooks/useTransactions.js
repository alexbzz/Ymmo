import { useState, useEffect, useCallback } from 'react';
import { transactionsAPI } from '../services/api';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await transactionsAPI.getMyTransactions();
      setTransactions(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const createOffer = async (propertyId, offerPrice) => {
    await transactionsAPI.create({ propertyId, offerPrice: Number(offerPrice) });
    await fetchTransactions();
  };

  const updateStatus = async (id, status) => {
    await transactionsAPI.updateStatus(id, status);
    await fetchTransactions();
  };

  return { transactions, loading, error, createOffer, updateStatus, refetch: fetchTransactions };
};

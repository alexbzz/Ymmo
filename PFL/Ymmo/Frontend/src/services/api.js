import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const ANALYTICS_UNAVAILABLE_MESSAGE =
  'Le service Python d\'analytics est indisponible. Vérifiez que le backend FastAPI est bien démarré.';

const normalizeAnalyticsError = (error) => {
  if (error?.message === 'Une erreur est survenue.' || error?.message === 'Network Error') {
    return new Error(ANALYTICS_UNAVAILABLE_MESSAGE);
  }

  return error;
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => ({
    ...response,
    data: response.data?.data !== undefined ? response.data.data : response.data,
  }),
  (error) => Promise.reject(
    new Error(error.response?.data?.message || 'Une erreur est survenue.')
  )
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
};

export const propertiesAPI = {
  getAll: (filters) => api.get('/properties', { params: filters }),
  getById: (id) => api.get(`/properties/${id}`),
  create: (data) => api.post('/properties', data),
  update: (id, data) => api.put(`/properties/${id}`, data),
  delete: (id) => api.delete(`/properties/${id}`),
  addPhotos: (id, photos) => api.post(`/properties/${id}/photos`, photos),
};

export const usersAPI = {
  getMe: () => api.get('/users'),
  update: (data) => api.put('/users', data),
  delete: () => api.delete('/users'),
};

export const agentsAPI = {
  getAll: () => api.get('/agents'),
  getById: (id) => api.get(`/agents/${id}`),
  getMyStats: () => api.get('/agents/my-stats'),
  register: (data) => api.post('/agents/register', data),
  updateMe: (data) => api.put('/agents/me', data),
};

export const transactionsAPI = {
  create: (data) => api.post('/transactions', data),
  getMyTransactions: () => api.get('/transactions/me'),
  updateStatus: (id, status) => api.patch(`/transactions/${id}`, { status }),
};

export const favoritesAPI = {
  getAll: () => api.get('/favorites'),
  add: (propertyId) => api.post(`/favorites/${propertyId}`),
  remove: (propertyId) => api.delete(`/favorites/${propertyId}`),
};

export const adminAPI = {
  getOverview: () => api.get('/admin/overview'),
  getUsers: () => api.get('/admin/users'),
  updateUserRole: (id, role) => api.patch(`/admin/users/${id}/role`, { role }),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
};

export const analyticsAPI = {
  getMarket: async () => {
    try {
      return await api.get('/analytics/market');
    } catch (error) {
      throw normalizeAnalyticsError(error);
    }
  },
  getPopular: async () => {
    try {
      return await api.get('/analytics/popular');
    } catch (error) {
      throw normalizeAnalyticsError(error);
    }
  },
  getPredictions: async () => {
    try {
      return await api.get('/analytics/predictions');
    } catch (error) {
      throw normalizeAnalyticsError(error);
    }
  },
  predict: async (data) => {
    try {
      return await api.post('/analytics/predict', data);
    } catch (error) {
      throw normalizeAnalyticsError(error);
    }
  },
};

export default api;

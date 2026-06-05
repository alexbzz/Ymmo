import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Ajouter le token au header si disponible
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
  verify: (token) => api.post('/auth/verify', { token }),
};

// Properties endpoints
export const propertiesAPI = {
  getAll: (filters) => api.get('/properties', { params: filters }),
  getById: (id) => api.get(`/properties/${id}`),
  create: (data) => api.post('/properties', data),
  update: (id, data) => api.put(`/properties/${id}`, data),
  delete: (id) => api.delete(`/properties/${id}`),
};

// Users endpoints
export const usersAPI = {
  getMe: () => api.get('/users'),
  update: (data) => api.put('/users', data),
  delete: () => api.delete('/users'),
};

// Agents endpoints
export const agentsAPI = {
  getAll: () => api.get('/agents'),
  getById: (id) => api.get(`/agents/${id}`),
  getMyStats: () => api.get('/agents/my-stats'),
  updateMe: (data) => api.put('/agents/me', data),
};

// Transactions endpoints
export const transactionsAPI = {
  create: (data) => api.post('/transactions', data),
  getMyTransactions: () => api.get('/transactions/me'),
  updateStatus: (id, status) => api.patch(`/transactions/${id}`, { status }),
};

export default api;

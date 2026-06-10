import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authAPI, usersAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const response = await usersAPI.getMe();
      setUser(response.data);
    } catch {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token, fetchUser]);

  const login = async (email, password) => {
    const response = await authAPI.login(email, password);
    const { token: newToken, user: loggedUser } = response.data;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(loggedUser);
    return response.data;
  };

  const register = async (data) => {
    await authAPI.register(data);
    return login(data.email, data.password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

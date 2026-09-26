// context/AuthContext.jsx
// Provides authentication state and actions across the app
import { createContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('resellhub_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  // On mount, verify token validity by fetching current user
  useEffect(() => {
    const token = localStorage.getItem('resellhub_token');
    if (!token) {
      setLoading(false);
      return;
    }
    authService
      .getMe()
      .then((data) => {
        setUser(data.user);
        localStorage.setItem('resellhub_user', JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem('resellhub_token');
        localStorage.removeItem('resellhub_user');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (credentials) => {
    const data = await authService.login(credentials);
    localStorage.setItem('resellhub_token', data.token);
    localStorage.setItem('resellhub_user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (info) => {
    const data = await authService.register(info);
    localStorage.setItem('resellhub_token', data.token);
    localStorage.setItem('resellhub_user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('resellhub_token');
    localStorage.removeItem('resellhub_user');
    setUser(null);
  }, []);

  const updateUserInContext = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('resellhub_user', JSON.stringify(updatedUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateUserInContext, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

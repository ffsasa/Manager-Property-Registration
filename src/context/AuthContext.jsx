import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { storage } from '../utils/storage.js';
import { login as loginRequest } from '../services/authService.js';

export const AuthContext = createContext({
  token: null,
  user: null,
  isAuthenticated: false,
  login: async () => undefined,
  logout: () => undefined,
  authLoading: false,
  authError: null,
  isInitializing: true
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => storage.getToken());
  const [user, setUser] = useState(() => storage.getUser());
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    setIsInitializing(false);
  }, []);

  useEffect(() => {
    if (token) {
      storage.setToken(token);
    } else {
      storage.removeToken();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      storage.setUser(user);
    } else {
      storage.removeUser();
    }
  }, [user]);

  const login = useCallback(async (credentials) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const result = await loginRequest(credentials);
      setToken(result.token);
      setUser(result.user ?? null);
      return result;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Đăng nhập thất bại';
      setAuthError(message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    storage.removeToken();
    storage.removeUser();
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
      authLoading,
      authError,
      isInitializing
    }),
    [token, user, login, logout, authLoading, authError, isInitializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node
};
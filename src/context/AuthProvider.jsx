import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authenticateUser from '../features/auth/actions/authUser';
import registerUser from '../features/auth/actions/registerUser';
import { logout, clearError } from '../features/auth/AuthReducer';
import isTokenExpired from '../lib/isTokenExpired';
import { AuthContext } from "@/context/AuthContext.jsx";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated, token, loading, error } = useSelector((state) => state.auth);

  const login = (credentials) => {
    return dispatch(authenticateUser(credentials));
  };

  const register = (credentials) => {
    return dispatch(registerUser(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      handleLogout();
    }
  }, [token]);

  const value = useMemo(
    () => ({
      user,
      login,
      isAuthenticated,
      register,
      logout: handleLogout,
      loading,
      error,
      clearError: handleClearError,
    }),
    [user, isAuthenticated, token, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


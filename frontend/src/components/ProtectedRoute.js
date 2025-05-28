import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, setToken, removeToken } from '../services/auth';


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = getToken() !== null;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

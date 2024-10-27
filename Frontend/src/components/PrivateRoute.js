// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Verificamos si el token existe en localStorage

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si hay token, permitimos que el componente hijo (children) se renderice
  return children;
};

export default PrivateRoute;

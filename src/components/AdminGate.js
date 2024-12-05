import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminGate = () => {
  const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    return decodedToken.role === 'admin';
  };

  return isAdmin() ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default AdminGate;
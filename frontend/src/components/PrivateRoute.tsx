import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Atualize o caminho

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext)!;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

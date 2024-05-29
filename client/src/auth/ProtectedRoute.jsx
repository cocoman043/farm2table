import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { AuthContext } from './AuthProvider.jsx';
import { useAuth } from './AuthProvider.jsx';

const ProtectedRoute = ({ allowedRoles }) => {
  // const { isAuthenticated, user } = useContext(AuthContext);
  const user = useAuth();

  console.log(user.token, user.userType, user.userId, user)

  if (!user.token) {
    return <Navigate to="/login" />;
  }

  if (!user.token || !allowedRoles.includes(user.userType)) {
    return <Navigate to="/user/shop" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

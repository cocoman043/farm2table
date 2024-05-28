import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/user/shop" />;
    }

    return children;
};

export default ProtectedRoute;
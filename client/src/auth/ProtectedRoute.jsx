import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider.jsx';

const ProtectedRoute = ({ allowedRoles }) => {
  const user = useAuth();

  if (user.loading) {
    return <div>Loading...</div>;
  }

  console.log("Protected Route: ", user.token, user.userType, user.userId, user)

  if (!user.token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.userType)) {
    console.log(user.userType, "not allowed, not ", allowedRoles);
    if (user.userType == "user") {
      return <Navigate to="/user/shop" />;
    } else {
      return <Navigate to="/admin" />;
    }
    
  } else {
    console.log(user.userType, "is allowed, is ", allowedRoles);
  }

  return <Outlet />;
};

export default ProtectedRoute;

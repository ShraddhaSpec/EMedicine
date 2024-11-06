import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  roles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {

  const role = localStorage.getItem("role") ?? "";
  const user = localStorage.getItem("username");
  
  if (!user) {
     return <Navigate to="/login" replace />;
  }

  if (!role && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

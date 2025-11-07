// src/routes/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import RestrictedAccess from '../components/common/RestrictedAccess';

function ProtectedRoute({ children, requiredRole, allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Check authentication
  if (!isAuthenticated || !user) {
    return <RestrictedAccess />;
  }

  // Check role access
  const roles = allowedRoles || (requiredRole ? [requiredRole] : []);
  const hasAccess = roles.length === 0 || roles.includes(user.role);

  if (!hasAccess) {
    return <RestrictedAccess />;
  }

  return children;
}

export default ProtectedRoute;
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute — wraps routes that require a logged-in user.
 * Redirects unauthenticated users to /login while preserving intended path.
 */
export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  // While the session is being restored from storage, show nothing
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

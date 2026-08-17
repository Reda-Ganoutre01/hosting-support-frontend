import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext.jsx";
import { checkIsAdmin } from "@/lib/isAdmin";

export default function AdminBlockRoute({ children }) {
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  // If user is authenticated AND is an Admin, block client pages and redirect directly to Admin Dashboard
  if (isAuthenticated && checkIsAdmin(user)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

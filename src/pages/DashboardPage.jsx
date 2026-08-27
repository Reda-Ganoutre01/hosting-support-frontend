import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext.jsx";
import { checkIsAdmin } from "@/lib/isAdmin";

export default function DashboardPage() {
  const { user } = useContext(AuthContext);

  if (checkIsAdmin(user)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/client/dashboard" replace />;
}


import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "@/context/AuthProvider.jsx";
import { ToastProvider } from "@/context/ToastContext.jsx";
import ProtectedRoute from "@/components/auth/ProtectedRoute.jsx";
import { LoadingPage } from "../pages/loading/LoadingPage.jsx";

import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import TicketsPage from "../pages/tickets/TicketsPage.jsx";
import TicketDetailPage from "../pages/tickets/TicketDetailPage.jsx";
import PlansPage from "../pages/plans/PlansPage.jsx";
import HostingAccountsPage from "../pages/accounts/HostingAccountsPage.jsx";
import NotificationsPage from "../pages/notifications/NotificationsPage.jsx";
import FaqPage from "../pages/faq/FaqPage.jsx";
import DomainPage from "../pages/domain/DomainPage.jsx";
import ProfilePage from "../pages/profile/ProfilePage.jsx";

export function AppRouter() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Suspense fallback={<LoadingPage />}>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/domaine" element={<DomainPage />} />
              <Route path="/domain" element={<DomainPage />} />

              {/* Protected User Routes */}
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/tickets" element={<ProtectedRoute><TicketsPage /></ProtectedRoute>} />
              <Route path="/tickets/:id" element={<ProtectedRoute><TicketDetailPage /></ProtectedRoute>} />
              <Route path="/plans" element={<ProtectedRoute><PlansPage /></ProtectedRoute>} />
              <Route path="/accounts" element={<ProtectedRoute><HostingAccountsPage /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
              <Route path="/faq" element={<ProtectedRoute><FaqPage /></ProtectedRoute>} />

              {/* Protected Admin Routes */}
              <Route path="/dashboard" element={<ProtectedRoute requireAdmin><DashboardPage /></ProtectedRoute>} />
              <Route path="/admin/tickets" element={<ProtectedRoute requireAdmin><TicketsPage /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute requireAdmin><DashboardPage /></ProtectedRoute>} />
            </Routes>
          </Router>
        </Suspense>
      </ToastProvider>
    </AuthProvider>
  );
}

export default AppRouter;

import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "@/context/AuthProvider.jsx";
import { ToastProvider } from "@/context/ToastContext.jsx";
import ProtectedRoute from "@/components/auth/ProtectedRoute.jsx";
import AdminBlockRoute from "@/components/auth/AdminBlockRoute.jsx";
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
import ContactPage from "../pages/contact/ContactPage.jsx";

export function AppRouter() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Suspense fallback={<LoadingPage />}>
          <Router>
            <Routes>
              {/* Client Routes - Blocked for Admins and redirected to /dashboard */}
              <Route path="/" element={<AdminBlockRoute><HomePage /></AdminBlockRoute>} />
              <Route path="/home" element={<AdminBlockRoute><HomePage /></AdminBlockRoute>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/domaine" element={<AdminBlockRoute><DomainPage /></AdminBlockRoute>} />
              <Route path="/domain" element={<AdminBlockRoute><DomainPage /></AdminBlockRoute>} />
              <Route path="/contact" element={<AdminBlockRoute><ContactPage /></AdminBlockRoute>} />

              {/* Client User Routes */}
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/tickets" element={<ProtectedRoute><TicketsPage /></ProtectedRoute>} />
              <Route path="/tickets/:id" element={<ProtectedRoute><TicketDetailPage /></ProtectedRoute>} />
              <Route path="/plans" element={<ProtectedRoute><PlansPage /></ProtectedRoute>} />
              <Route path="/accounts" element={<ProtectedRoute><HostingAccountsPage /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
              <Route path="/faq" element={<ProtectedRoute><FaqPage /></ProtectedRoute>} />

              {/* Protected Admin Only Routes */}
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

import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "@/context/AuthProvider.jsx";
import { ToastProvider } from "@/context/ToastContext.jsx";
import ProtectedRoute from "@/components/auth/ProtectedRoute.jsx";
import AdminBlockRoute from "@/components/auth/AdminBlockRoute.jsx";
import { LoadingPage } from "../pages/loading/LoadingPage.jsx";

import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx";
import ClientDashboardPage from "../pages/client/ClientDashboardPage.jsx";
import TicketsPage from "../pages/tickets/TicketsPage.jsx";
import TicketDetailPage from "../pages/tickets/TicketDetailPage.jsx";
import CreateTicketPage from "../pages/tickets/CreateTicketPage.jsx";
import PlansPage from "../pages/plans/PlansPage.jsx";
import HostingAccountsPage from "../pages/accounts/HostingAccountsPage.jsx";
import NotificationsPage from "../pages/notifications/NotificationsPage.jsx";
import FaqPage from "../pages/faq/FaqPage.jsx";
import DomainPage from "../pages/domain/DomainPage.jsx";
import ProfilePage from "../pages/profile/ProfilePage.jsx";
import ContactPage from "../pages/contact/ContactPage.jsx";
import UsersManagementPage from "../pages/admin/UsersManagementPage.jsx";
import AdminHostingPlansPage from "../pages/admin/AdminHostingPlansPage.jsx";
import AdminHostingAccountsPage from "../pages/admin/AdminHostingAccountsPage.jsx";
import AdminTicketsPage from "../pages/admin/AdminTicketsPage.jsx";
import AdminFaqPage from "../pages/admin/AdminFaqPage.jsx";
import AdminProfilePage from "../pages/admin/AdminProfilePage.jsx";

import AiAssistantPage from "../pages/client/AiAssistantPage.jsx";
import ClientSettingsPage from "../pages/client/ClientSettingsPage.jsx";
import WorkflowLogsPage from "../pages/admin/WorkflowLogsPage.jsx";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { checkIsAdmin } from "@/lib/isAdmin.js";

function ProfileRedirect() {
  const { user } = useAuth();
  if (checkIsAdmin(user)) {
    return <Navigate to="/admin/profile" replace />;
  }
  return <Navigate to="/client/profile" replace />;
}

export function AppRouter() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Suspense fallback={<LoadingPage />}>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<AdminBlockRoute><HomePage /></AdminBlockRoute>} />
              <Route path="/home" element={<AdminBlockRoute><HomePage /></AdminBlockRoute>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/domaine" element={<AdminBlockRoute><DomainPage /></AdminBlockRoute>} />
              <Route path="/domain" element={<AdminBlockRoute><DomainPage /></AdminBlockRoute>} />
              <Route path="/contact" element={<AdminBlockRoute><ContactPage /></AdminBlockRoute>} />

              {/* Dynamic Dashboard Redirect */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

              {/* Client Routes */}
              <Route path="/client/dashboard" element={<ProtectedRoute><ClientDashboardPage /></ProtectedRoute>} />
              <Route path="/client/accounts" element={<ProtectedRoute><HostingAccountsPage /></ProtectedRoute>} />
              <Route path="/client/hosting" element={<ProtectedRoute><HostingAccountsPage /></ProtectedRoute>} />
              <Route path="/client/tickets" element={<ProtectedRoute><TicketsPage /></ProtectedRoute>} />
              <Route path="/client/tickets/new" element={<ProtectedRoute><CreateTicketPage /></ProtectedRoute>} />
              <Route path="/client/tickets/:id" element={<ProtectedRoute><TicketDetailPage /></ProtectedRoute>} />
              <Route path="/client/ai-assistant" element={<ProtectedRoute><AiAssistantPage /></ProtectedRoute>} />
              <Route path="/client/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
              <Route path="/client/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/client/settings" element={<ProtectedRoute><ClientSettingsPage /></ProtectedRoute>} />

              {/* Protected Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute requireAdmin><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute requireAdmin><UsersManagementPage /></ProtectedRoute>} />
              <Route path="/admin/hosting-plans" element={<ProtectedRoute requireAdmin><AdminHostingPlansPage /></ProtectedRoute>} />
              <Route path="/admin/hosting-accounts" element={<ProtectedRoute requireAdmin><AdminHostingAccountsPage /></ProtectedRoute>} />
              <Route path="/admin/tickets" element={<ProtectedRoute requireAdmin><AdminTicketsPage /></ProtectedRoute>} />
              <Route path="/admin/faq" element={<ProtectedRoute requireAdmin><AdminFaqPage /></ProtectedRoute>} />
              <Route path="/admin/workflow-logs" element={<ProtectedRoute requireAdmin><WorkflowLogsPage /></ProtectedRoute>} />
              <Route path="/admin/notifications" element={<ProtectedRoute requireAdmin><NotificationsPage /></ProtectedRoute>} />
              <Route path="/admin/profile" element={<ProtectedRoute requireAdmin><AdminProfilePage /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><AdminSettingsPage /></ProtectedRoute>} />

              {/* Shortcuts / Backward Compatibility */}
              <Route path="/profile" element={<ProtectedRoute><ProfileRedirect /></ProtectedRoute>} />
              <Route path="/tickets" element={<ProtectedRoute><TicketsPage /></ProtectedRoute>} />
              <Route path="/tickets/:id" element={<ProtectedRoute><TicketDetailPage /></ProtectedRoute>} />
              <Route path="/plans" element={<ProtectedRoute><PlansPage /></ProtectedRoute>} />
              <Route path="/accounts" element={<ProtectedRoute><HostingAccountsPage /></ProtectedRoute>} />
              <Route path="/hosting-accounts" element={<ProtectedRoute><HostingAccountsPage /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute requireAdmin><UsersManagementPage /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
              <Route path="/faq" element={<ProtectedRoute><FaqPage /></ProtectedRoute>} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </Suspense>
      </ToastProvider>
    </AuthProvider>
  );
}

export default AppRouter;


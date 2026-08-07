import { Routes, Route } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import ProtectedRoute from '@/routes/ProtectedRoute';
import RoleBasedRoute from '@/routes/RoleBasedRoute';
import AdminLayout from '@/layouts/AdminLayout';                
import ClientLayout from '@/layouts/ClientLayout';
import { ROLES } from '@/utils/constants';

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public routes */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Admin routes — protected + role-restricted */}
            <Route element={<ProtectedRoute />}>
                <Route element={<RoleBasedRoute allowedRoles={[ROLES.ADMIN]} />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        {/* Nested admin pages added Day 34+ */}
                    </Route>
                </Route>

                {/* Client routes — protected only */}
                <Route element={<RoleBasedRoute allowedRoles={[ROLES.CLIENT]} />}>
                    <Route path="/app" element={<ClientLayout />}>
                        {/* Nested client pages added later */}
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
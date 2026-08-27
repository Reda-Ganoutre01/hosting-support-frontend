import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/pages/admin/components/app-sidebar";
import { SiteHeader } from "@/pages/admin/components/site-header";
import Navbar from "@/components/layout/Navbar.jsx";
import { Footer } from "@/components/layout/Footer.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { checkIsAdmin } from "@/lib/isAdmin.js";

export default function AppLayout({ children, breadcrumbs = [] }) {
  const { user } = useAuth();
  const isAdmin = checkIsAdmin(user);

  // If user is Admin, render the Admin Sidebar Dashboard Layout
  if (isAdmin) {
    return (
      <SidebarProvider
        className="min-h-screen bg-background text-foreground"
        style={{
          "--sidebar-width": "16rem",
          "--header-height": "3.5rem"
        }}>
        <AppSidebar variant="sidebar" />
        <SidebarInset className="bg-background">
          <SiteHeader breadcrumbs={breadcrumbs} />
          <div className="flex flex-1 flex-col overflow-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto w-full space-y-6">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // If user is Client / Standard User, render Clean Header Navbar Layout (User Interface 2)
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar isScrolled={true} />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}

import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/pages/admin/components/app-sidebar";
import { SiteHeader } from "@/pages/admin/components/site-header";

export default function AppLayout({ children, breadcrumbs = [] }) {
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

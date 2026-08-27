import React from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";

export default function AdminSettingsPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Paramètres Système" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Paramètres d'administration
          </h1>
          <p className="text-muted-foreground">
            Configuration globale de la plateforme et de la sécurité.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

import React from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";

export default function ClientSettingsPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Paramètres" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Paramètres du compte
          </h1>
          <p className="text-muted-foreground">
            Gérez vos préférences et notifications.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

import React from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";

export default function WorkflowLogsPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Journaux des workflows" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Journaux des workflows n8n
          </h1>
          <p className="text-muted-foreground">
            Suivi et surveillance de l'exécution des workflows automatisés.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

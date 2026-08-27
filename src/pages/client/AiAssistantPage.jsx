import React from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";

export default function AiAssistantPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Assistant IA" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Assistant IA Support
          </h1>
          <p className="text-muted-foreground">
            Posez vos questions techniques et obtenez une assistance immédiate.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

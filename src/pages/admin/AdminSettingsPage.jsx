import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import { useToast } from "@/context/ToastContext.jsx";
import { Settings, ShieldAlert, Cpu, Server, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  const toast = useToast();

  const [n8nAutoAssign, setN8nAutoAssign] = useState(true);
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState("0.6");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Paramètres système d'administration mis à jour.");
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Administration" }, { label: "Paramètres Système" }]}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <Settings className="h-7 w-7 text-indigo-500" /> Paramètres Système & IA
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Configuration globale de la plateforme, de l'assistant IA et des intégrations n8n.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Cpu className="h-5 w-5 text-purple-500" /> Configuration Assistant IA & Workflows n8n
              </CardTitle>
              <CardDescription>Ajustez le seuil de confiance de l'assistant IA et les automatisations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="threshold">Seuil de confiance minimum (Confidence Score)</Label>
                <Input
                  id="threshold"
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="1.0"
                  value={aiConfidenceThreshold}
                  onChange={(e) => setAiConfidenceThreshold(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Si le score de l'IA est inférieur à ce seuil (ex: 0.60), le système redirigera automatiquement vers la création d'un ticket.
                </p>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-border">
                <div>
                  <div className="font-semibold text-sm text-foreground">Exécution automatique n8n</div>
                  <div className="text-xs text-muted-foreground">Déclencher les webhooks n8n lors de la création d'un ticket.</div>
                </div>
                <Switch checked={n8nAutoAssign} onCheckedChange={setN8nAutoAssign} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-amber-500" /> Mode Maintenance & Sécurité
              </CardTitle>
              <CardDescription>Option de verrouillage temporaire pour mise à jour serveur.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="font-semibold text-sm text-foreground">Mode Maintenance</div>
                  <div className="text-xs text-muted-foreground">Restreindre l'accès client pendant les interventions.</div>
                </div>
                <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <Save className="h-4 w-4" /> Enregistrer la configuration
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

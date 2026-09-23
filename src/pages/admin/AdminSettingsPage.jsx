import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import { useToast } from "@/context/ToastContext.jsx";
import { Settings, ShieldAlert, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
// Input and Label removed: AI/n8n settings removed from this page
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Switch } from "@/components/ui/switch";
import SettingService from "@/services/SettingService.js";

export default function AdminSettingsPage() {
  const toast = useToast();

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [savingMaintenance, setSavingMaintenance] = useState(false);

  useEffect(() => {
    let cancelled = false;
    SettingService.getMaintenanceStatus()
      .then((res) => {
        if (!cancelled) setMaintenanceMode(Boolean(res.data?.enabled));
      })
      .catch(() => {
        if (!cancelled) setMaintenanceMode(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSavingMaintenance(true);
      const res = await SettingService.setMaintenanceMode(maintenanceMode);
      setMaintenanceMode(Boolean(res.data?.enabled));
      toast.success("Paramètres système d'administration mis à jour.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Erreur lors de la mise à jour de la configuration.");
    } finally {
      setSavingMaintenance(false);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Administration" }, { label: "Paramètres Système" }]}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight sm:text-3xl text-foreground">
            <Settings className="text-indigo-500 h-7 w-7" /> Paramètres Système & IA
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Configuration globale de la plateforme.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          

          <Card className="shadow-sm bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldAlert className="w-5 h-5 text-amber-500" /> Mode Maintenance & Sécurité
              </CardTitle>
              <CardDescription>Option de verrouillage temporaire pour mise à jour serveur.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-semibold text-foreground">Mode Maintenance</div>
                  <div className="text-xs text-muted-foreground">Restreindre l'accès client pendant les interventions.</div>
                </div>
                <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={savingMaintenance} className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4" /> Enregistrer la configuration
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

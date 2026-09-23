import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import { useToast } from "@/context/ToastContext.jsx";
import { Settings, Bell, Shield, Moon, Sun, Save, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Switch } from "@/components/ui/switch";

export default function ClientSettingsPage() {
  const toast = useToast();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [ticketUpdates, setTicketUpdates] = useState(true);
  const [expirationAlerts, setExpirationAlerts] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Vos préférences de paramètres ont été enregistrées.");
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Paramètres" }]}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <Settings className="h-7 w-7 text-blue-500" /> Paramètres du Compte Client
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gérez vos préférences de notifications, de sécurité et d'affichage.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Notifications Card */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-500" /> Notifications & Alertes
              </CardTitle>
              <CardDescription>Choisissez comment vous souhaitez être informé de l'activité de vos comptes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div>
                  <div className="font-semibold text-sm text-foreground">Notifications par email</div>
                  <div className="text-xs text-muted-foreground">Recevoir un récapitulatif par email.</div>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-border">
                <div>
                  <div className="font-semibold text-sm text-foreground">Mises à jour de tickets</div>
                  <div className="text-xs text-muted-foreground">Alerte lors d'une réponse de l'équipe support.</div>
                </div>
                <Switch checked={ticketUpdates} onCheckedChange={setTicketUpdates} />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="font-semibold text-sm text-foreground">Rappels d'expiration de domaine</div>
                  <div className="text-xs text-muted-foreground">Recevoir un avertissement 30 jours avant expiration.</div>
                </div>
                <Switch checked={expirationAlerts} onCheckedChange={setExpirationAlerts} />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <Save className="h-4 w-4" /> Enregistrer les modifications
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

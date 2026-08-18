import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import HostingPlanService from "@/services/HostingPlanService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { Server, Globe, RefreshCw, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HostingAccountsPage() {
  const toast = useToast();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const loadAccounts = async () => {
    setLoading(true);
    try {
      const res = await HostingPlanService.getHostingAccounts();
      setAccounts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Impossible de charger vos comptes d'hébergement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleRenew = async (id) => {
    try {
      await HostingPlanService.renewHostingAccount(id);
      toast.success("Votre compte a été renouvelé avec succès pour 1 an!");
      loadAccounts();
    } catch (err) {
      toast.error("Erreur lors du renouvellement.");
    }
  };

  const handleCancel = async (id) => {
    try {
      await HostingPlanService.cancelHostingAccount(id);
      toast.info("Compte suspendu/annulé.");
      loadAccounts();
    } catch (err) {
      toast.error("Erreur lors de l'annulation.");
    }
  };

  const filteredAccounts = accounts.filter((acc) => {
    if (statusFilter === "ALL") return true;
    return acc.status === statusFilter;
  });

  return (
    <AppLayout breadcrumbs={[{ label: "Mes Hébergements" }]}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Mes Comptes Hébergement
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gérez vos domaines, renouvellements et statut de vos serveurs.
          </p>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44 bg-card border-border text-foreground">
            <SelectValue placeholder="Tous les Statuts" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border text-popover-foreground">
            <SelectItem value="ALL">Tous les Statuts</SelectItem>
            <SelectItem value="ACTIVE">Actif</SelectItem>
            <SelectItem value="SUSPENDED">Suspendu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm font-medium">Chargement de vos hébergements...</p>
        </div>
      ) : filteredAccounts.length === 0 ? (
        <Card className="py-16 text-center bg-card border-border p-8 space-y-4">
          <Server className="h-12 w-12 text-muted-foreground mx-auto" />
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-foreground">Aucun hébergement actif</h3>
            <p className="text-sm text-muted-foreground">
              Souscrivez à une offre d'hébergement pour lancer votre site web.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccounts.map((acc) => {
            const isActive = acc.status === "ACTIVE";
            return (
              <Card key={acc.id} className="bg-card border-border shadow-sm flex flex-col justify-between">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base text-foreground font-bold">
                          {acc.domainName || "domaine.com"}
                        </CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">
                          Plan #{acc.hostingPlanId || 1}
                        </CardDescription>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className={
                        isActive
                          ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10"
                          : "border-red-500/30 text-red-500 bg-red-500/10"
                      }>
                      {isActive ? "Actif" : "Suspendu"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 border-t border-b border-border py-3 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Date de début:</span>
                    <span className="font-medium text-foreground">{acc.startDate || "2026-01-01"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Expiration:</span>
                    <span className="font-medium text-foreground">{acc.expirationDate || "2027-01-01"}</span>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 flex items-center justify-between gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRenew(acc.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs">
                    <RefreshCw className="h-3.5 w-3.5" /> Renouveler
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleCancel(acc.id)}
                    className="flex items-center justify-center gap-1.5 text-xs">
                    <XCircle className="h-3.5 w-3.5" /> Suspendre
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
}

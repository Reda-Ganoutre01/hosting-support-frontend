import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import HostingPlanService from "@/services/HostingPlanService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { Server, Globe, RefreshCw, XCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/button";

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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Mes Comptes Hébergement</h1>
          <p className="text-slate-400 text-sm mt-1">Gérez vos domaines, renouvellements et statut de vos serveurs.</p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="ALL">Tous les Statuts</option>
          <option value="ACTIVE">Actif</option>
          <option value="SUSPENDED">Suspendu</option>
        </select>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm">Chargement de vos hébergements...</p>
        </div>
      ) : filteredAccounts.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-4">
          <Server className="h-12 w-12 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-200">Aucun hébergement actif</h3>
            <p className="text-sm text-slate-400">Souscrivez à une offre d'hébergement pour lancer votre site web.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccounts.map((acc) => {
            const isActive = acc.status === "ACTIVE";
            return (
              <div key={acc.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{acc.domainName || "domaine.com"}</h3>
                      <p className="text-xs text-slate-400">Plan #{acc.hostingPlanId || 1}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${isActive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                    {isActive ? "Actif" : "Suspendu"}
                  </span>
                </div>

                <div className="space-y-2 border-t border-b border-slate-800/80 py-3 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Date de début:</span>
                    <span className="font-medium text-slate-200">{acc.startDate || "2026-01-01"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Expiration:</span>
                    <span className="font-medium text-slate-200">{acc.expirationDate || "2027-01-01"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Button size="sm" variant="outline" onClick={() => handleRenew(acc.id)} className="flex-1 flex items-center justify-center gap-1.5 text-xs">
                    <RefreshCw className="h-3.5 w-3.5" /> Renouveler
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleCancel(acc.id)} className="flex items-center justify-center gap-1.5 text-xs">
                    <XCircle className="h-3.5 w-3.5" /> Suspendre
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
}

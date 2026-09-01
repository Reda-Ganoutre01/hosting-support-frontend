import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import HostingPlanService from "@/services/HostingPlanService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { Globe, RefreshCw, ShieldCheck, CheckCircle2, Search, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ClientDomainsPage() {
  const toast = useToast();
  const { user } = useAuth();
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadDomains = async () => {
    setLoading(true);
    try {
      let res;
      if (user?.id) {
        try {
          res = await HostingPlanService.getHostingAccountsByUser(user.id);
        } catch {
          res = await HostingPlanService.getHostingAccounts();
        }
      } else {
        res = await HostingPlanService.getHostingAccounts();
      }

      let list = Array.isArray(res.data) ? res.data : [];
      if (user && list.length > 0) {
        const uId = Number(user.id);
        const uEmail = (user.email || "").toLowerCase();
        const filtered = list.filter((a) => {
          const accUserId = a.userId || a.user?.id;
          const accUserEmail = (a.userEmail || a.user?.email || "").toLowerCase();
          return (uId && accUserId === uId) || (uEmail && accUserEmail === uEmail);
        });
        if (filtered.length > 0) list = filtered;
      }

      setDomains(list);
    } catch (err) {
      console.error(err);
      toast.error("Impossible de charger la liste de vos noms de domaine.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDomains();
  }, [user]);

  const filteredDomains = domains.filter((d) => {
    const name = (d.domainName || "").toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });

  return (
    <AppLayout breadcrumbs={[{ label: "Mes Noms de Domaine" }]}>
      <div className="space-y-6">
        {/* Header Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Globe className="h-7 w-7 text-emerald-500" /> Mes Noms de Domaine
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Gestion de vos noms de domaine enregistrés, statuts DNS & renouvellements.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un domaine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background border-border text-foreground text-sm"
            />
          </div>
        </div>

        {/* Domains Grid List */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <p className="text-sm font-medium">Chargement de vos domaines...</p>
          </div>
        ) : filteredDomains.length === 0 ? (
          <Card className="py-16 text-center bg-card border-border p-8 space-y-4">
            <Globe className="h-12 w-12 text-muted-foreground/60 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-foreground">Aucun nom de domaine trouvé</h3>
              <p className="text-sm text-muted-foreground">
                Vous n'avez pas encore enregistré de domaine actif sous votre compte.
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDomains.map((dom) => (
              <Card key={dom.id} className="bg-card border-border shadow-sm flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                <CardHeader className="space-y-3 pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base text-foreground font-bold flex items-center gap-1.5">
                          {dom.domainName || "domaine.ma"}
                          <a
                            href={`https://${dom.domainName || "valahosting.com"}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-emerald-500 transition-colors"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </CardTitle>
                        <CardDescription className="text-xs text-muted-foreground font-medium">
                          Extension: <span className="uppercase text-emerald-600 dark:text-emerald-400 font-bold">.{ (dom.domainName || "").split(".").pop() || "ma" }</span>
                        </CardDescription>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className="border-emerald-500/30 text-emerald-500 bg-emerald-500/10 flex items-center gap-1 text-xs"
                    >
                      <CheckCircle2 className="h-3 w-3" /> Actif
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 border-t border-b border-border py-3 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Gestion DNS:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" /> Sécurisé / Vala DNS
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Date d'enregistrement:</span>
                    <span className="font-medium text-foreground">{dom.startDate || "2026-01-01"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Date d'expiration:</span>
                    <span className="font-medium text-foreground">{dom.expirationDate || "2027-01-01"}</span>
                  </div>
                </CardContent>

                <CardFooter className="pt-3 flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.success(`Configuration DNS envoyée pour ${dom.domainName}`)}
                    className="flex-1 text-xs border-border hover:bg-accent"
                  >
                    Gérer DNS
                  </Button>
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 text-xs shadow-sm"
                    onClick={() => toast.success(`Demande de renouvellement lancée pour ${dom.domainName}`)}
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Renouveler
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

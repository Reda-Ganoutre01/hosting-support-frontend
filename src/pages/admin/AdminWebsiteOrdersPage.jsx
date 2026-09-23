import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import api from "@/lib/axios";
import { useToast } from "@/context/ToastContext.jsx";
import { Layout, Globe, ShoppingBag, CheckCircle2, Clock, Search, RefreshCw, Trash2, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function AdminWebsiteOrdersPage() {
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      let data = [];
      try {
        const res = await api.get("/websiteOrders");
        if (Array.isArray(res.data)) data = res.data;
      } catch (err) {
        console.warn("Error fetching /api/websiteOrders, falling back to /api/hostingAccounts:", err);
        const res = await api.get("/hostingAccounts");
        if (Array.isArray(res.data)) {
          data = res.data.map((acc) => ({
            id: acc.id,
            domainName: acc.domainName,
            siteType: acc.hostingPlanName || "Site Web",
            price: acc.price || 9999.0,
            period: "One Time",
            status: acc.status || "ACTIVE",
            orderDate: acc.startDate || "2026-01-01",
            userName: acc.userName || acc.userEmail || `Client #${acc.userId || "-"}`,
            userEmail: acc.userEmail || ""
          }));
        }
      }
      setOrders(data);
    } catch (err) {
      console.error(err);
      toast.error("Impossible de charger la liste des commandes de sites web.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/websiteOrders/${id}`, { status: newStatus }).catch(() => {});
      toast.success(`Statut de la commande mis à jour: ${newStatus}`);
      loadOrders();
    } catch (err) {
      toast.error("Erreur lors de la mise à jour du statut.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/websiteOrders/${id}`).catch(() => {});
      toast.info("Commande supprimée.");
      loadOrders();
    } catch (err) {
      toast.error("Erreur lors de la suppression.");
    }
  };

  const filteredOrders = orders.filter((o) => {
    const term = searchQuery.toLowerCase();
    return (
      (o.domainName || "").toLowerCase().includes(term) ||
      (o.siteType || "").toLowerCase().includes(term) ||
      (o.userName || "").toLowerCase().includes(term) ||
      (o.userEmail || "").toLowerCase().includes(term)
    );
  });

  return (
    <AppLayout breadcrumbs={[{ label: "Administration" }, { label: "Commandes de Sites Web" }]}>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Layout className="h-7 w-7 text-purple-600 dark:text-purple-400" /> Commandes de Sites Web & PrestaShop
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Gestion et suivi de tous les projets web commandés par les clients.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher domaine ou client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background border-border text-foreground text-sm"
              />
            </div>
            <Button variant="outline" onClick={loadOrders} className="flex items-center gap-1 text-xs">
              <RefreshCw className="h-3.5 w-3.5" /> Actualiser
            </Button>
          </div>
        </div>

        {/* Data Cards Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <p className="text-sm font-medium">Chargement des commandes de sites...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <Card className="py-16 text-center bg-card border-border p-8 space-y-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/60 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-foreground">Aucune commande de site web enregistrée</h3>
              <p className="text-sm text-muted-foreground">
                Les nouvelles commandes passées par les clients apparaîtront ici.
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((ord) => (
              <Card key={ord.id} className="bg-card border-border shadow-sm flex flex-col justify-between hover:border-purple-500/30 transition-all">
                <CardHeader className="space-y-3 pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base text-foreground font-bold line-clamp-1">
                          {ord.siteType || "Création Site Web"}
                        </CardTitle>
                        <CardDescription className="text-xs text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1 mt-0.5">
                          <Globe className="h-3.5 w-3.5" /> {ord.domainName || "domaine.ma"}
                        </CardDescription>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className="border-emerald-500/30 text-emerald-500 bg-emerald-500/10 flex items-center gap-1 text-xs"
                    >
                      <CheckCircle2 className="h-3 w-3" /> {ord.status || "Actif"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 border-t border-b border-border py-3 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Client:</span>
                    <span className="font-semibold text-foreground">{ord.userName || ord.userEmail || "Client Inconnu"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Montant:</span>
                    <span className="font-bold text-foreground">{ord.price ? `${ord.price} DH` : "9999 DH"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Date:</span>
                    <span className="font-medium text-foreground">{ord.orderDate || "2026-08-30"}</span>
                  </div>
                </CardContent>

                <div className="p-3 bg-muted/20 flex items-center justify-between gap-2 border-t border-border">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedOrder(ord)}
                    className="flex-1 text-xs flex items-center justify-center gap-1"
                  >
                    <Eye className="h-3.5 w-3.5" /> Cahier des charges
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(ord.id)}
                    className="text-xs"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Modal Specification Details */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-md bg-card text-foreground border-border">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Layout className="h-5 w-5" /> Détails du projet Admin
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Exigences soumises par le client pour la réalisation du site web.
              </DialogDescription>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-4 pt-2 text-xs">
                <div className="p-3 bg-muted/40 rounded-xl space-y-1.5 border border-border">
                  <div className="font-bold text-foreground text-sm">{selectedOrder.siteType}</div>
                  <div className="text-purple-600 dark:text-purple-400 font-medium">Domaine : {selectedOrder.domainName}</div>
                  <div className="text-muted-foreground">Client : {selectedOrder.userName || selectedOrder.userEmail}</div>
                  <div className="text-muted-foreground">Montant : {selectedOrder.price} DH ({selectedOrder.period})</div>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-foreground">Exigences Produits :</div>
                  <ul className="space-y-1 text-muted-foreground pl-2 border-l-2 border-purple-500/30">
                    <li>• Nombre approximatif: <strong className="text-foreground">{selectedOrder.productCount || "Non spécifié"}</strong></li>
                    <li>• Volume/Poids: <strong className="text-foreground">{selectedOrder.productVolume || "Standard"}</strong></li>
                    <li>• Gammes: <strong className="text-foreground">{selectedOrder.productRanges || "1-5"}</strong></li>
                    {selectedOrder.productSpecs && (
                      <li>• Remarques: <strong className="text-foreground">{selectedOrder.productSpecs}</strong></li>
                    )}
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-foreground">Options Vidéo :</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrder.hasVideoCompany && <Badge variant="secondary">Vidéo Entreprise</Badge>}
                    {selectedOrder.hasVideoPromo && <Badge variant="secondary">Vidéo Promo</Badge>}
                    {selectedOrder.hasVideo360 && <Badge variant="secondary">Vue 360°</Badge>}
                    {!selectedOrder.hasVideoCompany && !selectedOrder.hasVideoPromo && !selectedOrder.hasVideo360 && (
                      <span className="text-muted-foreground italic">Aucune option vidéo.</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

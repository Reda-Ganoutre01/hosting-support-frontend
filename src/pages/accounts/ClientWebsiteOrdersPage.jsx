import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import api from "@/lib/axios";
import HostingPlanService from "@/services/HostingPlanService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { Layout, Globe, ShoppingBag, CheckCircle2, Clock, Video, Package, Layers, ExternalLink, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function ClientWebsiteOrdersPage() {
  const toast = useToast();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const uId = user?.id ? Number(user.id) : null;

      let siteOrders = [];
      if (uId) {
        const res = await api.get(`/websiteOrders/user/${uId}`);
        if (Array.isArray(res.data)) {
          siteOrders = res.data
            .filter((order) => Number(order?.userId ?? order?.user?.id ?? 0) === uId)
            .sort((a, b) => Number(b?.id ?? 0) - Number(a?.id ?? 0));
        }
      }

      setOrders(siteOrders);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement de vos commandes de site web.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [user]);

  return (
    <AppLayout breadcrumbs={[{ label: "Site Web & Services" }]}>
      <div className="space-y-6">
        {/* Banner Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Layout className="h-7 w-7 text-purple-600 dark:text-purple-400" /> Mes Sites Web & Services Commandés
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Consultez vos projets souscrits (E-Commerce PrestaShop, Site Mojoud, etc.) et le détail de vos spécifications.
            </p>
          </div>
          <Button
            onClick={() => window.location.href = "/plans"}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center gap-2 shadow-sm rounded-xl px-5 py-2.5 shrink-0"
          >
            <Sparkles className="h-4 w-4" /> Commander un autre site
          </Button>
        </div>

        {/* Orders Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <p className="text-sm font-medium">Chargement de vos projets web...</p>
          </div>
        ) : orders.length === 0 ? (
          <Card className="py-16 text-center bg-card border-border p-8 space-y-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/60 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-foreground">Aucun projet de site web commandé</h3>
              <p className="text-sm text-muted-foreground">
                Découvrez nos formules clés en main pour lancer votre boutique en ligne ou site vitrine dès aujourd'hui.
              </p>
            </div>
            <Button onClick={() => window.location.href = "/plans"} className="bg-purple-600 hover:bg-purple-700 text-white mt-2">
              Découvrir nos offres Site Web
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((ord) => (
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
                      <CheckCircle2 className="h-3 w-3" /> Actif
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 border-t border-b border-border py-3 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Prix total:</span>
                    <span className="font-bold text-foreground">{ord.price ? `${ord.price} DH` : "Sur devis"} ({ord.period || "Unique"})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Date de commande:</span>
                    <span className="font-medium text-foreground">{ord.orderDate || "Récemment"}</span>
                  </div>
                  {ord.productCount && (
                    <div className="flex items-center justify-between">
                      <span>Volume Produits:</span>
                      <span className="font-medium text-foreground">{ord.productCount}</span>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="pt-3 flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedOrder(ord)}
                    className="flex-1 text-xs border-border hover:bg-accent"
                  >
                    Voir le Cahier des Charges
                  </Button>
                  <a
                    href={`https://${ord.domainName || "valahosting.com"}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1 text-xs">
                      Visiter <ExternalLink className="h-3 w-3" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Modal Specification Details */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-md bg-card text-foreground border-border">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Layout className="h-5 w-5" /> Détails du projet
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Spécifications et cahier des charges soumis lors de la commande.
              </DialogDescription>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-4 pt-2 text-xs">
                <div className="p-3 bg-muted/40 rounded-xl space-y-1.5 border border-border">
                  <div className="font-bold text-foreground text-sm">{selectedOrder.siteType}</div>
                  <div className="text-purple-600 dark:text-purple-400 font-medium">Domaine : {selectedOrder.domainName}</div>
                  <div className="text-muted-foreground">Montant : {selectedOrder.price} DH ({selectedOrder.period})</div>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-foreground">Exigences Produits :</div>
                  <ul className="space-y-1 text-muted-foreground pl-2 border-l-2 border-purple-500/30">
                    <li>• Nombre approximatif: <strong className="text-foreground">{selectedOrder.productCount || "Non spécifié"}</strong></li>
                    <li>• Dimensions/Poids: <strong className="text-foreground">{selectedOrder.productVolume || "Standard"}</strong></li>
                    <li>• Nombre de gammes: <strong className="text-foreground">{selectedOrder.productRanges || "1"}</strong></li>
                    {selectedOrder.productSpecs && (
                      <li>• Caractéristiques: <strong className="text-foreground">{selectedOrder.productSpecs}</strong></li>
                    )}
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-foreground">Options Vidéo Demandées :</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrder.hasVideoCompany && <Badge variant="secondary">Vidéo Entreprise</Badge>}
                    {selectedOrder.hasVideoPromo && <Badge variant="secondary">Vidéo Promo Produits</Badge>}
                    {selectedOrder.hasVideo360 && <Badge variant="secondary">Vue Produit 360°</Badge>}
                    {!selectedOrder.hasVideoCompany && !selectedOrder.hasVideoPromo && !selectedOrder.hasVideo360 && (
                      <span className="text-muted-foreground italic">Aucune option vidéo sélectionnée.</span>
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

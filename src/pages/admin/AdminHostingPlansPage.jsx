import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import HostingPlanService from "@/services/HostingPlanService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { Server, Plus, Edit, Trash2, Loader2, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminHostingPlansPage() {
  const toast = useToast();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    storage: "",
    bandwidth: "",
    emailAccounts: 5,
    sslIncluded: true,
  });

  const loadPlans = async () => {
    setLoading(true);
    try {
      const res = await HostingPlanService.getHostingPlans();
      setPlans(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement des formules d'hébergement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleOpenCreate = () => {
    setEditingPlan(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      storage: "",
      bandwidth: "",
      emailAccounts: 5,
      sslIncluded: true,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name || "",
      description: plan.description || "",
      price: plan.price || "",
      storage: plan.storage || "",
      bandwidth: plan.bandwidth || "",
      emailAccounts: plan.emailAccounts || 5,
      sslIncluded: plan.sslIncluded ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      toast.error("Le nom et le prix de la formule sont obligatoires.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        storage: formData.storage.trim() || "10 GB",
        bandwidth: formData.bandwidth.trim() || "100 GB",
        emailAccounts: Number(formData.emailAccounts),
        sslIncluded: Boolean(formData.sslIncluded),
      };

      if (editingPlan) {
        await HostingPlanService.updateHostingPlan(editingPlan.id, payload);
        toast.success("Formule d'hébergement mise à jour avec succès !");
      } else {
        await HostingPlanService.createHostingPlan(payload);
        toast.success("Nouvelle formule créée avec succès !");
      }

      setIsDialogOpen(false);
      loadPlans();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'enregistrement de la formule.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette formule d'hébergement ?")) return;

    try {
      await HostingPlanService.deleteHostingPlan(id);
      toast.success("Formule d'hébergement supprimée.");
      loadPlans();
    } catch (err) {
      console.error(err);
      toast.error("Impossible de supprimer la formule.");
    }
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Administration" }, { label: "Formules d'hébergement" }]}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Server className="h-7 w-7 text-blue-500" /> Gestion des Formules d'Hébergement
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Créez, modifiez et gérez les offres d'hébergement proposées à vos clients.
            </p>
          </div>
          <Button onClick={handleOpenCreate} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
            <Plus className="h-4 w-4" /> Nouvelle Formule
          </Button>
        </div>

        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-0">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="text-sm font-medium">Chargement des formules...</p>
              </div>
            ) : plans.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground space-y-3">
                <Server className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="text-base font-semibold text-foreground">Aucune formule d'hébergement trouvée</p>
                <Button variant="outline" size="sm" onClick={handleOpenCreate}>
                  Créer une formule
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom de la formule</TableHead>
                    <TableHead>Prix (DH/an)</TableHead>
                    <TableHead>Stockage</TableHead>
                    <TableHead>Bande passante</TableHead>
                    <TableHead>Comptes email</TableHead>
                    <TableHead>SSL Inclus</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-bold text-foreground">
                        {plan.name}
                        {plan.description && (
                          <div className="text-xs text-muted-foreground font-normal">{plan.description}</div>
                        )}
                      </TableCell>
                      <TableCell className="font-semibold text-blue-500">{Number(plan.price || 0).toFixed(2)} DH / an</TableCell>
                      <TableCell>{plan.storage || "10 GB"}</TableCell>
                      <TableCell>{plan.bandwidth || "100 GB"}</TableCell>
                      <TableCell>{plan.emailAccounts ?? 5}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            plan.sslIncluded
                              ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10"
                              : "border-muted text-muted-foreground"
                          }
                        >
                          {plan.sslIncluded ? "Oui" : "Non"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(plan)}>
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(plan.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Modal Dialog Form */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle>{editingPlan ? "Modifier la formule" : "Nouvelle formule d'hébergement"}</DialogTitle>
              <DialogDescription>
                Remplissez les détails techniques de l'offre d'hébergement.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de la formule</Label>
                <Input
                  id="name"
                  placeholder="Ex: Formule Starter / Pro"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix annuel (DH)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="299"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailAccounts">Comptes Email</Label>
                  <Input
                    id="emailAccounts"
                    type="number"
                    value={formData.emailAccounts}
                    onChange={(e) => setFormData({ ...formData, emailAccounts: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storage">Espace disque</Label>
                  <Input
                    id="storage"
                    placeholder="Ex: 20 GB SSD"
                    value={formData.storage}
                    onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bandwidth">Bande passante</Label>
                  <Input
                    id="bandwidth"
                    placeholder="Ex: 500 GB / Illimitée"
                    value={formData.bandwidth}
                    onChange={(e) => setFormData({ ...formData, bandwidth: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description synthétique de l'offre"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enregistrer"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

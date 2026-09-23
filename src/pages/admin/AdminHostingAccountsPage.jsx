import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import HostingPlanService from "@/services/HostingPlanService.js";
import AdminService from "@/services/AdminService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { Database, Plus, Search, CheckCircle, XCircle, Clock, Loader2, Globe, Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminHostingAccountsPage() {
  const toast = useToast();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Create Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [plans, setPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    domainName: "",
    userId: "",
    hostingPlanId: "",
    status: "ACTIVE",
  });

  // Edit Dialog State
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    domainName: "",
    userId: "",
    hostingPlanId: "",
    status: "ACTIVE",
    startDate: "",
    expirationDate: "",
  });

  const [usersMap, setUsersMap] = useState({});
  const [plansMap, setPlansMap] = useState({});

  const loadAccounts = async () => {
    setLoading(true);
    try {
      const [accountsRes, plansRes, usersRes] = await Promise.all([
        HostingPlanService.getHostingAccounts(),
        HostingPlanService.getHostingPlans().catch(() => ({ data: [] })),
        AdminService.getUsers().catch(() => ({ data: [] }))
      ]);
      
      const accList = Array.isArray(accountsRes.data) ? accountsRes.data : [];
      setAccounts(accList);

      const pList = Array.isArray(plansRes.data) ? plansRes.data : [];
      setPlans(pList);
      const pMap = {};
      pList.forEach((p) => { pMap[p.id] = p; });
      setPlansMap(pMap);

      const uList = Array.isArray(usersRes.data)
        ? usersRes.data
        : usersRes.data?.content && Array.isArray(usersRes.data.content)
        ? usersRes.data.content
        : [];
      setUsers(uList);
      const uMap = {};
      uList.forEach((u) => { uMap[u.id] = u; });
      setUsersMap(uMap);
    } catch (err) {
      console.error(err);
      toast.error("Impossible de charger la liste des comptes d'hébergement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleOpenCreate = async () => {
    try {
      const [plansRes, usersRes] = await Promise.all([
        HostingPlanService.getHostingPlans(),
        AdminService.getUsers(),
      ]);
      setPlans(Array.isArray(plansRes.data) ? plansRes.data : []);
      const userList = Array.isArray(usersRes.data)
        ? usersRes.data
        : usersRes.data?.content && Array.isArray(usersRes.data.content)
        ? usersRes.data.content
        : [];
      setUsers(userList);

      setFormData({
        domainName: "",
        userId: userList.length > 0 ? String(userList[0].id) : "",
        hostingPlanId: plansRes.data?.length > 0 ? String(plansRes.data[0].id) : "",
        status: "ACTIVE",
      });
      setIsDialogOpen(true);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la préparation du formulaire.");
    }
  };

  const handleOpenEdit = (acc) => {
    setEditingAccountId(acc.id);
    setEditFormData({
      domainName: acc.domainName || "",
      userId: acc.userId ? String(acc.userId) : (users.length > 0 ? String(users[0].id) : ""),
      hostingPlanId: acc.hostingPlanId ? String(acc.hostingPlanId) : (plans.length > 0 ? String(plans[0].id) : ""),
      status: acc.status || "ACTIVE",
      startDate: acc.startDate || new Date().toISOString().split("T")[0],
      expirationDate: acc.expirationDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    });
    setIsEditDialogOpen(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.domainName.trim() || !formData.userId || !formData.hostingPlanId) {
      toast.error("Veuillez remplir le nom de domaine, le client et la formule.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        domainName: formData.domainName.trim(),
        userId: Number(formData.userId),
        hostingPlanId: Number(formData.hostingPlanId),
        status: formData.status,
        startDate: new Date().toISOString().split("T")[0],
        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      };

      await HostingPlanService.createHostingAccount(payload);
      toast.success("Compte d'hébergement créé et assigné avec succès !");
      setIsDialogOpen(false);
      loadAccounts();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la création du compte.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editFormData.domainName.trim() || !editFormData.userId || !editFormData.hostingPlanId) {
      toast.error("Veuillez remplir les informations requises.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        domainName: editFormData.domainName.trim(),
        userId: Number(editFormData.userId),
        hostingPlanId: Number(editFormData.hostingPlanId),
        status: editFormData.status,
        startDate: editFormData.startDate,
        expirationDate: editFormData.expirationDate,
      };

      await HostingPlanService.updateHostingAccount(editingAccountId, payload);
      toast.success("Compte d'hébergement mis à jour avec succès !");
      setIsEditDialogOpen(false);
      loadAccounts();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour du compte.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await HostingPlanService.updateHostingAccount(id, { status: newStatus });
      toast.success(`Statut mis à jour : ${newStatus}`);
      loadAccounts();
    } catch (err) {
      console.error(err);
      toast.error("Impossible de modifier le statut.");
    }
  };

  const filteredAccounts = accounts.filter((acc) => {
    const matchesDomain = (acc.domainName || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || acc.status === statusFilter;
    return matchesDomain && matchesStatus;
  });

  return (
    <AppLayout breadcrumbs={[{ label: "Administration" }, { label: "Comptes d'hébergement" }]}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Database className="h-7 w-7 text-blue-500" /> Gestion des Comptes d'Hébergement
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Consultez tous les serveurs des clients, modifiez leur état (Actif, Suspendu, Expiré) et assignez de nouvelles formules.
            </p>
          </div>
          <Button onClick={handleOpenCreate} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
            <Plus className="h-4 w-4" /> Nouveau Compte / Assigner
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-4 rounded-xl border border-border">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par domaine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-background border-border">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tous les statuts</SelectItem>
              <SelectItem value="ACTIVE">Actif</SelectItem>
              <SelectItem value="SUSPENDED">Suspendu</SelectItem>
              <SelectItem value="EXPIRED">Expiré</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-0">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="text-sm font-medium">Chargement des comptes...</p>
              </div>
            ) : filteredAccounts.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground space-y-3">
                <Database className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="text-base font-semibold text-foreground">Aucun compte d'hébergement trouvé</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom de domaine</TableHead>
                    <TableHead>Client (Utilisateur)</TableHead>
                    <TableHead>Formule d'Hébergement</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date début</TableHead>
                    <TableHead>Expiration</TableHead>
                    <TableHead className="text-right">Actions Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.map((acc) => {
                    const clientName = acc.userName || (usersMap[acc.userId] ? usersMap[acc.userId].name || usersMap[acc.userId].email : null) || acc.userEmail || `Client #${acc.userId || "-"}`;
                    const planName = acc.hostingPlanName || (plansMap[acc.hostingPlanId] ? plansMap[acc.hostingPlanId].name : null) || `Formule #${acc.hostingPlanId || "-"}`;
                    
                    return (
                      <TableRow key={acc.id}>
                        <TableCell className="font-bold text-foreground flex items-center gap-2">
                          <Globe className="h-4 w-4 text-blue-500" />
                          {acc.domainName || `Domaine #${acc.id}`}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">{clientName}</TableCell>
                        <TableCell className="font-medium text-blue-600 dark:text-blue-400">{planName}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            acc.status === "ACTIVE"
                              ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10"
                              : acc.status === "SUSPENDED"
                              ? "border-amber-500/30 text-amber-500 bg-amber-500/10"
                              : "border-red-500/30 text-red-500 bg-red-500/10"
                          }
                        >
                          {acc.status === "ACTIVE" ? "Actif" : acc.status === "SUSPENDED" ? "Suspendu" : "Expiré"}
                        </Badge>
                      </TableCell>
                      <TableCell>{acc.startDate || "2026-01-01"}</TableCell>
                      <TableCell>{acc.expirationDate || "2027-01-01"}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenEdit(acc)}
                          className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          <Pencil className="h-3.5 w-3.5 mr-1" /> Modifier
                        </Button>

                        {acc.status !== "ACTIVE" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(acc.id, "ACTIVE")}
                            className="text-xs text-emerald-500 hover:text-emerald-600"
                          >
                            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Activer
                          </Button>
                        )}
                        {acc.status !== "SUSPENDED" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(acc.id, "SUSPENDED")}
                            className="text-xs text-amber-500 hover:text-amber-600"
                          >
                            <XCircle className="h-3.5 w-3.5 mr-1" /> Suspendre
                          </Button>
                        )}
                        {acc.status !== "EXPIRED" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(acc.id, "EXPIRED")}
                            className="text-xs text-red-500 hover:text-red-600"
                          >
                            <Clock className="h-3.5 w-3.5 mr-1" /> Expirer
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Dialog for Creating / Assigning Hosting Account */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle>Assigner un compte d'hébergement</DialogTitle>
              <DialogDescription>Créez et associez un nouveau compte d'hébergement à un client.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateSubmit} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="domainName">Nom de domaine</Label>
                <Input
                  id="domainName"
                  placeholder="Ex: monsiteclient.ma"
                  value={formData.domainName}
                  onChange={(e) => setFormData({ ...formData, domainName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Client (Utilisateur)</Label>
                <Select value={formData.userId} onValueChange={(val) => setFormData({ ...formData, userId: val })}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((u) => (
                      <SelectItem key={u.id} value={String(u.id)}>
                        {u.name || u.email} (#{u.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Formule d'hébergement</Label>
                <Select value={formData.hostingPlanId} onValueChange={(val) => setFormData({ ...formData, hostingPlanId: val })}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Sélectionner une formule" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>
                        {p.name} ({p.price} DH/an)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Statut initial</Label>
                <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Actif</SelectItem>
                    <SelectItem value="SUSPENDED">Suspendu</SelectItem>
                    <SelectItem value="EXPIRED">Expiré</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Créer le compte"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Dialog for Editing Hosting Account */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle>Modifier le compte d'hébergement</DialogTitle>
              <DialogDescription>Mettez à jour les informations du compte d'hébergement.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleEditSubmit} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="editDomainName">Nom de domaine</Label>
                <Input
                  id="editDomainName"
                  placeholder="Ex: monsiteclient.ma"
                  value={editFormData.domainName}
                  onChange={(e) => setEditFormData({ ...editFormData, domainName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Client (Utilisateur)</Label>
                <Select value={editFormData.userId} onValueChange={(val) => setEditFormData({ ...editFormData, userId: val })}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((u) => (
                      <SelectItem key={u.id} value={String(u.id)}>
                        {u.name || u.email} (#{u.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Formule d'hébergement</Label>
                <Select value={editFormData.hostingPlanId} onValueChange={(val) => setEditFormData({ ...editFormData, hostingPlanId: val })}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Sélectionner une formule" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>
                        {p.name} ({p.price} DH/an)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Statut</Label>
                <Select value={editFormData.status} onValueChange={(val) => setEditFormData({ ...editFormData, status: val })}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Actif</SelectItem>
                    <SelectItem value="SUSPENDED">Suspendu</SelectItem>
                    <SelectItem value="EXPIRED">Expiré</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editStartDate">Date début</Label>
                  <Input
                    id="editStartDate"
                    type="date"
                    value={editFormData.startDate}
                    onChange={(e) => setEditFormData({ ...editFormData, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editExpirationDate">Expiration</Label>
                  <Input
                    id="editExpirationDate"
                    type="date"
                    value={editFormData.expirationDate}
                    onChange={(e) => setEditFormData({ ...editFormData, expirationDate: e.target.value })}
                  />
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enregistrer les modifications"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

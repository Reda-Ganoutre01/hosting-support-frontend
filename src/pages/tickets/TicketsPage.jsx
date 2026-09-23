import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout.jsx";
import TicketService from "@/services/TicketService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import {
  Plus,
  Search,
  Ticket,
  AlertCircle,
  Loader2,
  X,
  Pencil,
  Trash2,
  Eye,
  LifeBuoy
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TicketsPage() {
  const toast = useToast();
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  // Create Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [category, setCategory] = useState("GENERAL");

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [editSubject, setEditSubject] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("MEDIUM");
  const [editStatus, setEditStatus] = useState("OPEN");
  const [updating, setUpdating] = useState(false);

  const loadTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const currentUserId = user?.id || user?.userId || (user?.user && user.user.id);
      const currentUserEmail = user?.email || user?.name || user?.sub || (user?.user && (user.user.email || user.user.name));
      let createdIds = [];
      try {
        createdIds = JSON.parse(localStorage.getItem("user_created_ticket_ids") || "[]");
      } catch { /* ignore malformed localStorage */ }

      const response = await TicketService.getTickets();
      const rawData = Array.isArray(response.data) ? response.data : response.data?.content || [];

      // Filter tickets for connected user (including user_id 1 records and created session tickets)
      const filtered = rawData.filter((t) => {
        if (createdIds.includes(t.id)) return true;

        if (currentUserId && !isNaN(Number(currentUserId)) && (Number(t.userId) === Number(currentUserId) || Number(t.user?.id) === Number(currentUserId))) {
          return true;
        }

        if (currentUserEmail) {
          const uStr = String(currentUserEmail).toLowerCase();
          if (t.userEmail && String(t.userEmail).toLowerCase().includes(uStr)) return true;
          if (t.user?.email && String(t.user.email).toLowerCase().includes(uStr)) return true;
          if (t.user?.username && String(t.user.username).toLowerCase().includes(uStr)) return true;
        }

        // Include tickets for default primary user_id 1
        if (t.userId === 1 || t.user?.id === 1) return true;

        return false;
      });

      setTickets(filtered.length > 0 ? filtered : rawData);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger la liste de vos tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTickets();
  }, [user]);

  const mapPriorityToEnum = (prio) => {
    if (!prio) return "MEDIUM";
    const u = prio.toUpperCase();
    if (u === "URGENT" || u === "URGENTE" || u === "ELEVEE" || u === "HIGH") return "HIGH";
    if (u === "FAIBLE" || u === "LOW") return "LOW";
    return "MEDIUM";
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const currentUserId = user?.id || user?.userId || (user?.user && user.user.id) || 1;
      const res = await TicketService.createTicket({
        subject: subject.trim(),
        description: description.trim(),
        priority: mapPriorityToEnum(priority),
        category,
        status: "OPEN",
        userId: Number(currentUserId)
      });

      if (res?.data?.id) {
        try {
          const createdIds = JSON.parse(localStorage.getItem("user_created_ticket_ids") || "[]");
          if (!createdIds.includes(res.data.id)) {
            createdIds.push(res.data.id);
            localStorage.setItem("user_created_ticket_ids", JSON.stringify(createdIds));
          }
        } catch { /* ignore malformed localStorage */ }
      }

      toast.success("Votre ticket a été créé avec succès!");
      setSubject("");
      setDescription("");
      setPriority("MEDIUM");
      setCategory("GENERAL");
      setModalOpen(false);
      loadTickets();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erreur lors de la création du ticket.");
    } finally {
      setCreating(false);
    }
  };

  const handleOpenEdit = (ticket) => {
    setEditingTicket(ticket);
    setEditSubject(ticket.subject || "");
    setEditDescription(ticket.description || "");
    setEditPriority(mapPriorityToEnum(ticket.priority));
    setEditStatus(ticket.status || "OPEN");
    setEditModalOpen(true);
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    if (!editingTicket) return;
    setUpdating(true);
    try {
      const currentUserId = user?.id || user?.userId || (user?.user && user.user.id) || 1;
      await TicketService.updateTicket(editingTicket.id, {
        subject: editSubject.trim(),
        description: editDescription.trim(),
        priority: mapPriorityToEnum(editPriority),
        status: editStatus,
        userId: Number(currentUserId)
      });
      toast.success("Ticket mis à jour avec succès!");
      setEditModalOpen(false);
      setEditingTicket(null);
      loadTickets();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erreur lors de la modification du ticket.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce ticket ?")) {
      return;
    }
    try {
      await TicketService.deleteTicket(ticketId);
      toast.success("Ticket supprimé avec succès!");
      loadTickets();
    } catch (err) {
      console.error(err);
      toast.error("Échec de la suppression du ticket.");
    }
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      (t.subject || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.id || "").toString().includes(search);
    const matchesStatus = statusFilter === "ALL" || t.status === statusFilter;
    const matchesPriority = priorityFilter === "ALL" || t.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "OPEN":
        return <Badge className="text-blue-600 bg-blue-500/10 border-blue-500/30 dark:text-blue-400">Ouvert</Badge>;
      case "IN_PROGRESS":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400">En cours</Badge>;
      case "RESOLVED":
      case "CLOSED":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400">Résolu</Badge>;
      default:
        return <Badge variant="secondary">{status || "Ouvert"}</Badge>;
    }
  };

  const getPriorityBadge = (prio) => {
    switch (prio) {
      case "HIGH":
      case "URGENT":
        return <Badge variant="outline" className="text-red-600 bg-red-500/10 border-red-500/30 dark:text-red-400">Haute</Badge>;
      case "MEDIUM":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400">Moyenne</Badge>;
      case "LOW":
      default:
        return <Badge variant="outline" className="bg-slate-500/10 text-slate-600 border-slate-500/30 dark:text-slate-400">Basse</Badge>;
    }
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Tickets Support" }]}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight sm:text-3xl text-foreground">
              <LifeBuoy className="text-blue-600 h-7 w-7 dark:text-blue-400" /> Mes Tickets Support
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Gérez et suivez vos demandes d'assistance technique personnelles pour{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">{user?.name || user?.email || "Client Connecté"}</span>.
            </p>
          </div>
          <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Nouveau Ticket</span>
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 gap-4 p-4 border sm:grid-cols-2 lg:grid-cols-3 bg-card rounded-xl border-border">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par sujet ou n° de ticket..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tous les statuts</SelectItem>
              <SelectItem value="OPEN">Ouvert</SelectItem>
              <SelectItem value="IN_PROGRESS">En cours</SelectItem>
              <SelectItem value="RESOLVED">Résolu</SelectItem>
              <SelectItem value="CLOSED">Fermé</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Toutes les priorités" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Toutes les priorités</SelectItem>
              <SelectItem value="LOW">Basse</SelectItem>
              <SelectItem value="MEDIUM">Moyenne</SelectItem>
              <SelectItem value="HIGH">Haute</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tickets Table */}
        <Card className="shadow-sm bg-card border-border">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin dark:text-blue-400" />
                <p className="text-sm font-medium">Chargement de vos tickets...</p>
              </div>
            ) : error ? (
              <div className="py-16 space-y-3 text-center text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto text-red-500/70" />
                <p className="text-sm font-medium text-foreground">{error}</p>
                <Button variant="outline" size="sm" onClick={loadTickets}>Réessayer</Button>
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="py-16 space-y-4 text-center text-muted-foreground">
                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-muted">
                  <Ticket className="w-8 h-8 text-muted-foreground/60" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-foreground">Aucun ticket trouvé</h3>
                  <p className="text-sm text-muted-foreground">Créez votre premier ticket ou modifiez vos critères de recherche.</p>
                </div>
                <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2 mx-auto">
                  <Plus className="w-4 h-4" /> Créer un ticket
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sujet</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Date de création</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-semibold text-foreground">
                        <Link to={`/tickets/${ticket.id}`} className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                          {ticket.subject || `Ticket #${ticket.id}`}
                        </Link>
                      </TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString("fr-FR") : "Récemment"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/tickets/${ticket.id}`}>
                            <Button variant="outline" size="sm" className="h-8 px-2.5 text-xs flex items-center gap-1">
                              <Eye className="h-3.5 w-3.5" />
                              <span>Voir</span>
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenEdit(ticket)}
                            className="h-8 px-2.5 text-xs flex items-center gap-1 hover:bg-amber-500/10 hover:text-amber-600 hover:border-amber-500/40 dark:hover:text-amber-400"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            <span>Modifier</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTicket(ticket.id)}
                            className="h-8 px-2.5 text-xs flex items-center gap-1 text-red-600 dark:text-red-400 hover:bg-red-500/10 hover:border-red-500/40"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Supprimer</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Ticket Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="absolute p-1 transition-colors rounded-md right-4 top-4 text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </button>
          <DialogHeader>
            <DialogTitle>Nouveau Ticket de Support</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateTicket} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ticket-subject">Sujet du ticket</Label>
              <Input
                id="ticket-subject"
                type="text"
                required
                placeholder="Ex: Problème d'accès à mon VPS"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Priorité</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="w-full bg-background border-border">
                    <SelectValue placeholder="Sélectionner la priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Basse</SelectItem>
                    <SelectItem value="MEDIUM">Moyenne</SelectItem>
                    <SelectItem value="HIGH">Haute / Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full bg-background border-border">
                    <SelectValue placeholder="Choisir la catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GENERAL">Général</SelectItem>
                    <SelectItem value="HOSTING">Hébergement Web</SelectItem>
                    <SelectItem value="VPS">Serveur VPS</SelectItem>
                    <SelectItem value="BILLING">Facturation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticket-description">Description détaillée</Label>
              <Textarea
                id="ticket-description"
                rows={4}
                required
                placeholder="Décrivez votre problème avec le plus de détails possible..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Annuler</Button>
              <Button type="submit" disabled={creating}>
                {creating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Création...
                  </>
                ) : (
                  "Soumettre Ticket"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Ticket Dialog */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <button
            type="button"
            onClick={() => setEditModalOpen(false)}
            className="absolute p-1 transition-colors rounded-md right-4 top-4 text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </button>
          <DialogHeader>
            <DialogTitle>Modifier le Ticket</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdateTicket} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-subject">Sujet du ticket</Label>
              <Input
                id="edit-subject"
                type="text"
                required
                value={editSubject}
                onChange={(e) => setEditSubject(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Priorité</Label>
                <Select value={editPriority} onValueChange={setEditPriority}>
                  <SelectTrigger className="w-full bg-background border-border">
                    <SelectValue placeholder="Sélectionner la priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Basse</SelectItem>
                    <SelectItem value="MEDIUM">Moyenne</SelectItem>
                    <SelectItem value="HIGH">Haute / Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Statut</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger className="w-full bg-background border-border">
                    <SelectValue placeholder="Sélectionner le statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OPEN">Ouvert</SelectItem>
                    <SelectItem value="IN_PROGRESS">En cours</SelectItem>
                    <SelectItem value="RESOLVED">Résolu</SelectItem>
                    <SelectItem value="CLOSED">Fermé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description détaillée</Label>
              <Textarea
                id="edit-description"
                rows={4}
                required
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>Annuler</Button>
              <Button type="submit" disabled={updating}>
                {updating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enregistrement...
                  </>
                ) : (
                  "Enregistrer les modifications"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

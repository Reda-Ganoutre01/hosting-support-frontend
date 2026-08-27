import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout.jsx";
import TicketService from "@/services/TicketService.js";
import AdminService from "@/services/AdminService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { LifeBuoy, Search, Filter, MessageSquare, CheckCircle, Clock, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/card";
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

export default function AdminTicketsPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [tickets, setTickets] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(true);

  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const loadTickets = async () => {
    setLoading(true);
    try {
      const [ticketsRes, usersRes] = await Promise.all([
        TicketService.getTickets(),
        AdminService.getUsers().catch(() => ({ data: [] }))
      ]);
      setTickets(Array.isArray(ticketsRes.data) ? ticketsRes.data : []);

      const userList = Array.isArray(usersRes.data)
        ? usersRes.data
        : usersRes.data?.content && Array.isArray(usersRes.data.content)
        ? usersRes.data.content
        : [];
      const uMap = {};
      userList.forEach((u) => { uMap[u.id] = u; });
      setUsersMap(uMap);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement des tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await TicketService.updateTicket(id, { status: newStatus });
      toast.success(`Statut du ticket #${id} mis à jour.`);
      loadTickets();
    } catch (err) {
      console.error(err);
      toast.error("Impossible de mettre à jour le statut du ticket.");
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSubject = (ticket.subject || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "ALL" || ticket.priority === priorityFilter;
    return matchesSubject && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "OPEN":
        return <Badge className="bg-blue-500/10 text-blue-500 border border-blue-500/30">Ouvert</Badge>;
      case "IN_PROGRESS":
        return <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/30">En cours</Badge>;
      case "RESOLVED":
        return <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">Résolu</Badge>;
      case "CLOSED":
        return <Badge className="bg-slate-500/10 text-slate-400 border border-slate-500/30">Fermé</Badge>;
      default:
        return <Badge variant="secondary">{status || "Ouvert"}</Badge>;
    }
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Administration" }, { label: "Tickets de support" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <LifeBuoy className="h-7 w-7 text-amber-500" /> Gestion des Tickets de Support
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Supervisez les requêtes de tous vos clients, répondez aux tickets et modifiez leur état.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-card p-4 rounded-xl border border-border">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par sujet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Filtrer par statut" />
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
              <SelectValue placeholder="Filtrer par priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Toutes les priorités</SelectItem>
              <SelectItem value="LOW">Faible</SelectItem>
              <SelectItem value="MEDIUM">Moyenne</SelectItem>
              <SelectItem value="HIGH">Élevée</SelectItem>
              <SelectItem value="URGENT">Urgente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-0">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                <p className="text-sm font-medium">Chargement des tickets de support...</p>
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground space-y-3">
                <LifeBuoy className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="text-base font-semibold text-foreground">Aucun ticket trouvé</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sujet du ticket</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date de création</TableHead>
                    <TableHead className="text-right">Actions Admin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((t) => {
                    const clientObj = usersMap[t.userId] || t.user;
                    const clientName = clientObj?.fullName || clientObj?.userName || clientObj?.email || `Client #${t.userId || "-"}`;

                    return (
                      <TableRow key={t.id}>
                        <TableCell
                          onClick={() => navigate(`/tickets/${t.id}`)}
                          className="font-bold text-foreground hover:underline cursor-pointer"
                        >
                          {t.subject || `Ticket #${t.id}`}
                        </TableCell>
                        <TableCell className="text-foreground text-xs font-semibold">
                          {clientName}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              t.priority === "URGENT" || t.priority === "HIGH"
                                ? "border-red-500/30 text-red-500 bg-red-500/10"
                                : "border-blue-500/30 text-blue-500 bg-blue-500/10"
                            }
                          >
                            {t.priority || "MEDIUM"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(t.status)}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{t.createdAt || "Récemment"}</TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/tickets/${t.id}`)}
                            className="text-xs text-blue-500 hover:text-blue-600"
                          >
                            <MessageSquare className="h-4 w-4 mr-1 text-blue-500" /> Répondre
                          </Button>

                          {t.status !== "CLOSED" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateStatus(t.id, "CLOSED")}
                              className="text-xs text-red-500 hover:text-red-600"
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" /> Fermer
                            </Button>
                          )}
                          {t.status !== "RESOLVED" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateStatus(t.id, "RESOLVED")}
                              className="text-xs text-emerald-500 hover:text-emerald-600"
                            >
                              <CheckCircle className="h-3.5 w-3.5 mr-1" /> Résoudre
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
      </div>
    </AppLayout>
  );
}

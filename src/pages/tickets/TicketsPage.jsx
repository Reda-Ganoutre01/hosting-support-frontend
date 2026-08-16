import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout.jsx";
import TicketService from "@/services/TicketService.js";
import { useToast } from "@/context/ToastContext.jsx";
import {
  Plus,
  Search,
  Filter,
  Ticket,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  X
} from "lucide-react";
import Button from "@/components/ui/button";

export default function TicketsPage() {
  const toast = useToast();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const [modalOpen, setModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [category, setCategory] = useState("GENERAL");

  const loadTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await TicketService.getTickets();
      const data = Array.isArray(response.data) ? response.data : response.data?.content || [];
      setTickets(data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger la liste des tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await TicketService.createTicket({
        subject,
        description,
        priority,
        category,
        status: "OPEN"
      });
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
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">Ouvert</span>;
      case "IN_PROGRESS":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">En Cours</span>;
      case "RESOLVED":
      case "CLOSED":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Résolu</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20">{status || "Ouvert"}</span>;
    }
  };

  const getPriorityBadge = (prio) => {
    switch (prio) {
      case "HIGH":
      case "URGENT":
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-500/10 text-red-400">Haute</span>;
      case "MEDIUM":
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-400">Moyenne</span>;
      case "LOW":
      default:
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-500/10 text-slate-400">Basse</span>;
    }
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Tickets Support" }]}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Tickets Support</h1>
          <p className="text-slate-400 text-sm mt-1">Gérez et suivez vos demandes d'assistance technique.</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Nouveau Ticket</span>
        </Button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par sujet ou ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-400">Filtres:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Tous les Statuts</option>
            <option value="OPEN">Ouvert</option>
            <option value="IN_PROGRESS">En Cours</option>
            <option value="RESOLVED">Résolu</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Toutes les Priorités</option>
            <option value="LOW">Basse</option>
            <option value="MEDIUM">Moyenne</option>
            <option value="HIGH">Haute</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm">Chargement de vos tickets...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-950/30 border border-red-900/50 rounded-2xl text-center text-red-400 space-y-3">
          <AlertCircle className="h-8 w-8 mx-auto" />
          <p>{error}</p>
          <Button variant="outline" size="sm" onClick={loadTickets}>Réessayer</Button>
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-4">
          <Ticket className="h-12 w-12 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-200">Aucun ticket trouvé</h3>
            <p className="text-sm text-slate-400">Créez votre premier ticket ou modifiez vos critères de recherche.</p>
          </div>
          <Button onClick={() => setModalOpen(true)}>Créer un ticket</Button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/60 text-xs uppercase font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Sujet</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4">Priorité</th>
                  <th className="px-6 py-4">Date de Création</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">#{ticket.id}</td>
                    <td className="px-6 py-4 font-semibold text-white">
                      <Link to={`/tickets/${ticket.id}`} className="hover:text-blue-400 transition-colors">
                        {ticket.subject}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(ticket.status)}</td>
                    <td className="px-6 py-4">{getPriorityBadge(ticket.priority)}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString("fr-FR") : "Récemment"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/tickets/${ticket.id}`}>
                        <Button variant="outline" size="sm">Voir Détails</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">Nouveau Ticket de Support</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Sujet du ticket</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Problème d'accès à mon VPS"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priorité</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="LOW">Basse</option>
                    <option value="MEDIUM">Moyenne</option>
                    <option value="HIGH">Haute</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="GENERAL">Général</option>
                    <option value="HOSTING">Hébergement Web</option>
                    <option value="VPS">Serveur VPS</option>
                    <option value="BILLING">Facturation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description détaillée</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Décrivez votre problème avec le plus de détails possible..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Annuler</Button>
                <Button type="submit" disabled={creating}>
                  {creating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" /> Création...
                    </>
                  ) : (
                    "Soumettre Ticket"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

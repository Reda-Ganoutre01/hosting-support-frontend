import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout.jsx";
import TicketService from "@/services/TicketService.js";
import HostingPlanService from "@/services/HostingPlanService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LifeBuoy, ArrowLeft, Loader2, Send } from "lucide-react";

export default function CreateTicketPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [hostingAccountId, setHostingAccountId] = useState("");

  const [hostingAccounts, setHostingAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await HostingPlanService.getHostingAccounts();
        const accounts = Array.isArray(res.data) ? res.data : [];
        setHostingAccounts(accounts);
        if (accounts.length > 0) {
          setHostingAccountId(String(accounts[0].id));
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des comptes d'hébergement", err);
      } finally {
        setLoadingAccounts(false);
      }
    };

    fetchAccounts();
  }, []);

  const mapPriorityToEnum = (prio) => {
    if (!prio) return "MEDIUM";
    const u = prio.toUpperCase();
    if (u === "URGENT" || u === "URGENTE" || u === "ELEVEE" || u === "HIGH") return "HIGH";
    if (u === "FAIBLE" || u === "LOW") return "LOW";
    return "MEDIUM";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject.trim()) {
      toast.error("Le sujet du ticket est obligatoire.");
      return;
    }

    if (!description.trim()) {
      toast.error("La description du ticket est obligatoire.");
      return;
    }

    setSubmitting(true);

    try {
      const currentUserId = user?.id || user?.userId || (user?.user && user.user.id) || 1;
      const payload = {
        subject: subject.trim(),
        description: description.trim(),
        priority: mapPriorityToEnum(priority),
        hostingAccountId: hostingAccountId ? Number(hostingAccountId) : null,
        userId: Number(currentUserId)
      };

      await TicketService.createTicket(payload);
      toast.success("Ticket de support créé avec succès!");
      navigate("/client/tickets");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la création du ticket. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Mes tickets", href: "/client/tickets" }, { label: "Nouveau ticket" }]}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <LifeBuoy className="h-7 w-7 text-blue-500" />
              Créer un ticket de support
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Décrivez votre problème technique. Notre équipe vous répondra dans les plus brefs délais.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/client/tickets")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Retour
          </Button>
        </div>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Formulaire de demande d'assistance</CardTitle>
            <CardDescription>Tous les champs marqués sont requis pour traiter votre demande.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet du ticket</Label>
                <Input
                  id="subject"
                  placeholder="Ex: Problème d'accès FTP / Erreur 500 sur mon site"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={submitting}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priorité</Label>
                  <Select value={priority} onValueChange={setPriority} disabled={submitting}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Sélectionnez la priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Basse / Faible</SelectItem>
                      <SelectItem value="MEDIUM">Normale / Moyenne</SelectItem>
                      <SelectItem value="HIGH">Haute / Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Compte d'hébergement concerné</Label>
                  {loadingAccounts ? (
                    <div className="flex items-center gap-2 h-10 text-xs text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-500" /> Chargement des hébergements...
                    </div>
                  ) : hostingAccounts.length === 0 ? (
                    <div className="h-10 px-3 py-2 rounded-md border border-border bg-muted/50 text-xs text-muted-foreground flex items-center">
                      Aucun hébergement actif
                    </div>
                  ) : (
                    <Select value={hostingAccountId} onValueChange={setHostingAccountId} disabled={submitting}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Sélectionner un hébergement" />
                      </SelectTrigger>
                      <SelectContent>
                        {hostingAccounts.map((acc) => (
                          <SelectItem key={acc.id} value={String(acc.id)}>
                            {acc.domainName || `Hébergement #${acc.id}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description détaillée</Label>
                <Textarea
                  id="description"
                  rows={6}
                  placeholder="Fournissez le maximum de détails : messages d'erreur, étapes pour reproduire, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={submitting}
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/client/tickets")}
                  disabled={submitting}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Création en cours...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Envoyer le ticket
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

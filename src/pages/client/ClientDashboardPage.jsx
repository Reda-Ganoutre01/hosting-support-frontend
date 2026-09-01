import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout.jsx";
import { AuthContext } from "@/context/AuthContext.jsx";
import NotificationService from "@/services/NotificationService.js";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import {
  Server,
  LifeBuoy,
  Bell,
  PlusCircle,
  Bot,
  ArrowRight,
  Loader2,
  Globe,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function ClientDashboardPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userId = Number(user?.id);
        const [accRes, tickRes, notifRes] = await Promise.allSettled([
          userId && !isNaN(userId)
            ? HostingPlanService.getHostingAccountsByUser(userId)
            : Promise.resolve({ data: [] }),
          userId && !isNaN(userId)
            ? TicketService.getTicketsByUser(userId)
            : Promise.resolve({ data: [] }),
          userId && !isNaN(userId)
            ? NotificationService.getNotificationsByUser(userId)
            : Promise.resolve({ data: [] }),
        ]);

        if (accRes.status === "fulfilled" && Array.isArray(accRes.value?.data)) {
          let list = accRes.value.data;
          if (user && list.length > 0) {
            const uId = Number(user.id);
            const uEmail = (user.email || "").toLowerCase();
            list = list.filter((a) => {
              const accUserId = Number(a.userId ?? a.user?.id ?? 0);
              const accUserEmail = (a.userEmail || a.user?.email || "").toLowerCase();
              return (uId > 0 && accUserId === uId) || (uEmail && accUserEmail === uEmail);
            });
          }
          setAccounts(list);
        } else {
          setAccounts([]);
        }
        if (tickRes.status === "fulfilled" && Array.isArray(tickRes.value?.data)) {
          let list = tickRes.value.data;
          if (userId && !isNaN(userId)) {
            list = list.filter((t) => Number(t.userId ?? t.user?.id ?? 0) === userId);
          }
          setTickets(list);
        } else {
          setTickets([]);
        }
        if (notifRes.status === "fulfilled" && Array.isArray(notifRes.value?.data)) {
          const list = notifRes.value.data.filter((n) => {
            const ownerId = Number(n.userId ?? n.user?.id ?? 0);
            return !userId || Number.isNaN(userId) ? true : ownerId === userId;
          });
          setNotifications(list);
        } else {
          setNotifications([]);
        }
      } catch (err) {
        console.error("Erreur de chargement du tableau de bord client", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const activeAccountsCount = accounts.filter((a) => a.status === "ACTIVE").length;
  const openTicketsCount = tickets.filter((t) => t.status !== "FERME" && t.status !== "RESOLU").length;

  return (
    <AppLayout breadcrumbs={[{ label: "Tableau de bord" }]}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Bonjour, {user?.name || user?.email || "Client"} 👋
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Bienvenue sur votre espace de gestion d'hébergement web Vala Hosting.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/client/tickets/new")}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="h-4 w-4" /> Nouveau Ticket
            </Button>
          </div>
        </div>

        {/* Statistical Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card border-border shadow-sm hover:border-blue-500/30 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hébergements actifs</CardTitle>
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                <Server className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-foreground">{loading ? "-" : activeAccountsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Sur {accounts.length} compte(s) au total
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm hover:border-blue-500/30 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tickets en cours</CardTitle>
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <LifeBuoy className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-foreground">{loading ? "-" : openTicketsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {tickets.length} ticket(s) créé(s) au total
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm hover:border-blue-500/30 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Notifications</CardTitle>
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                <Bell className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-foreground">{loading ? "-" : notifications.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {notifications.filter(n => !n.read).length} notification(s) non lue(s)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Bar */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Actions rapides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/client/accounts")}
              className="h-auto p-4 flex items-center justify-between bg-card border-border hover:border-blue-500/50 hover:bg-accent/50 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">Gérer mes hébergements</div>
                  <div className="text-xs text-muted-foreground">Voir les détails & domaines</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/client/tickets/new")}
              className="h-auto p-4 flex items-center justify-between bg-card border-border hover:border-blue-500/50 hover:bg-accent/50 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <LifeBuoy className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">Créer un ticket</div>
                  <div className="text-xs text-muted-foreground">Obtenir du support technique</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/client/ai-assistant")}
              className="h-auto p-4 flex items-center justify-between bg-card border-border hover:border-blue-500/50 hover:bg-accent/50 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">Assistant IA Support</div>
                  <div className="text-xs text-muted-foreground">Réponses instantanées 24/7</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Dashboard Sections: My Hostings & Recent Tickets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Hostings Card */}
          <Card className="bg-card border-border shadow-sm flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg text-foreground">Mes Hébergements</CardTitle>
                <CardDescription>Aperçu de vos serveurs et domaines</CardDescription>
              </div>
              <Link to="/client/accounts">
                <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                  Tout voir <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center text-muted-foreground gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                  <span className="text-xs">Chargement...</span>
                </div>
              ) : accounts.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground space-y-2">
                  <Server className="h-10 w-10 mx-auto text-muted-foreground/60" />
                  <p className="text-sm font-medium">Aucun compte d'hébergement pour le moment.</p>
                  <Button size="sm" variant="outline" onClick={() => navigate("/plans")}>
                    Découvrir nos offres
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {accounts.slice(0, 3).map((acc) => (
                    <div
                      key={acc.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50 hover:bg-accent/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                          <Globe className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-foreground">
                            {acc.domainName || `Hébergement #${acc.id}`}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Expire le : {acc.expirationDate || "2027-01-01"}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          acc.status === "ACTIVE"
                            ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10"
                            : "border-red-500/30 text-red-500 bg-red-500/10"
                        }
                      >
                        {acc.status === "ACTIVE" ? "Actif" : "Suspendu"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Support Tickets Card */}
          <Card className="bg-card border-border shadow-sm flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg text-foreground">Tickets de Support Récents</CardTitle>
                <CardDescription>Vos demandes d'assistance en cours</CardDescription>
              </div>
              <Link to="/client/tickets">
                <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                  Tout voir <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center text-muted-foreground gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                  <span className="text-xs">Chargement...</span>
                </div>
              ) : tickets.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground space-y-2">
                  <CheckCircle2 className="h-10 w-10 mx-auto text-emerald-500/60" />
                  <p className="text-sm font-medium">Aucun ticket de support ouvert.</p>
                  <Button size="sm" variant="outline" onClick={() => navigate("/client/tickets/new")}>
                    Créer un ticket
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {tickets.slice(0, 3).map((tick) => (
                    <div
                      key={tick.id}
                      onClick={() => navigate(`/client/tickets/${tick.id}`)}
                      className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50 hover:bg-accent/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                          <LifeBuoy className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-foreground line-clamp-1">
                            {tick.subject || `Ticket #${tick.id}`}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {tick.createdAt || "Récemment"}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {tick.status || "OUVERT"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

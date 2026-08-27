import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext.jsx";
import { useToast } from "@/context/ToastContext.jsx";
import AppLayout from "@/components/layout/AppLayout.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar.jsx";
import Button from "@/components/ui/Button.jsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card.jsx";
import { Badge } from "@/components/ui/Badge.jsx";
import Input from "@/components/ui/Input.jsx";
import UserService from "@/services/UserService.js";
import TicketService from "@/services/TicketService.js";
import HostingPlanService from "@/services/HostingPlanService.js";
import AdminService from "@/services/AdminService.js";
import { Edit, Settings, LogOut, Loader2, UserCheck, ShieldCheck, Users, Server, Database, Ticket, Check, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import adminProfileImg from "@/assets/users/admin_profile.png";

export default function AdminProfilePage() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbUser, setDbUser] = useState(null);

  const [stats, setStats] = useState({
    usersCount: 0,
    plansCount: 0,
    accountsCount: 0,
    ticketsCount: 0
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "ADMIN"
  });

  const loadAdminData = async () => {
    setLoading(true);
    try {
      let activeUser = user;
      if (user?.id) {
        try {
          const res = await UserService.getUserById(user.id);
          if (res?.data) {
            activeUser = { ...user, ...res.data };
            setDbUser(res.data);
          }
        } catch (e) {
          console.warn("Could not fetch admin user by ID");
        }
      }

      const realEmail = activeUser?.email || user?.email || "reda@example.com";
      const realName = activeUser?.fullName || activeUser?.full_name || activeUser?.name || "Reda";

      setFormData({
        fullName: realName,
        email: realEmail,
        phone: activeUser?.phone || "+212 6 00 00 00 00",
        role: activeUser?.role || "ADMIN"
      });

      // Load counts for Admin Metrics
      const [usersRes, plansRes, accountsRes, ticketsRes] = await Promise.allSettled([
        AdminService.getUsers(0, 100),
        HostingPlanService.getHostingPlans(),
        HostingPlanService.getHostingAccounts(),
        TicketService.getTickets()
      ]);

      const usersList = usersRes.status === "fulfilled" ? (usersRes.value?.data?.content || usersRes.value?.data || []) : [];
      const plansList = plansRes.status === "fulfilled" ? (plansRes.value?.data || []) : [];
      const accountsList = accountsRes.status === "fulfilled" ? (accountsRes.value?.data || []) : [];
      const ticketsList = ticketsRes.status === "fulfilled" ? (ticketsRes.value?.data || []) : [];

      setStats({
        usersCount: Array.isArray(usersList) ? usersList.length : 12,
        plansCount: Array.isArray(plansList) ? plansList.length : 12,
        accountsCount: Array.isArray(accountsList) ? accountsList.length : 12,
        ticketsCount: Array.isArray(ticketsList) ? ticketsList.length : 12
      });

    } catch (err) {
      console.error("Error loading admin profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.info("Déconnexion réussie");
    navigate("/login");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const userId = user?.id || dbUser?.id || 1;
      await UserService.updateUser(userId, {
        fullName: formData.fullName,
        userName: formData.fullName.toLowerCase().replace(/\s+/g, "_"),
        email: formData.email,
        phone: formData.phone,
        role: "ADMIN"
      });

      setDbUser((prev) => ({
        ...prev,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone
      }));

      toast.success("Profil Administrateur mis à jour !");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour.");
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "AD";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Administration" }, { label: "Profil Administrateur" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Shield className="h-7 w-7 text-blue-600" /> Mon Profil Administrateur
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Gérez vos informations personnelles et vos paramètres d'accès à la plateforme Vala Blue.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="border-border hover:bg-accent"
            >
              <Edit className="mr-2 h-4 w-4" />
              {isEditing ? "Annuler" : "Modifier le profil"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin/settings")}
              className="border-border hover:bg-accent"
            >
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm font-medium">Chargement du profil administrateur...</p>
          </div>
        ) : (
          <>
            {/* Quick System Metric Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-card border-border shadow-sm hover:border-blue-500/40 transition-colors cursor-pointer" onClick={() => navigate("/admin/users")}>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.usersCount}</p>
                    <p className="text-xs text-muted-foreground font-medium">Utilisateurs Enregistrés</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-sm hover:border-blue-500/40 transition-colors cursor-pointer" onClick={() => navigate("/admin/hosting-plans")}>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
                    <Server className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.plansCount}</p>
                    <p className="text-xs text-muted-foreground font-medium">Formules d'Hébergement</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-sm hover:border-blue-500/40 transition-colors cursor-pointer" onClick={() => navigate("/admin/hosting-accounts")}>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl">
                    <Database className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.accountsCount}</p>
                    <p className="text-xs text-muted-foreground font-medium">Comptes Hébergés</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-sm hover:border-blue-500/40 transition-colors cursor-pointer" onClick={() => navigate("/admin/tickets")}>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
                    <Ticket className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.ticketsCount}</p>
                    <p className="text-xs text-muted-foreground font-medium">Tickets de Support</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Grid */}
            <div className="grid gap-6 md:grid-cols-4">
              {/* Sidebar Identity Card */}
              <div className="md:col-span-1">
                <Card className="bg-card border-border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-28 w-28 ring-4 ring-blue-600/30 shadow-xl bg-slate-900 border-2 border-blue-500/30">
                        <AvatarFallback className="bg-slate-900 text-white font-extrabold text-3xl tracking-wider">
                          {getInitials(formData.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <h2 className="mt-4 text-xl font-bold text-foreground text-center">{formData.fullName}</h2>
                      <p className="text-muted-foreground text-sm text-center">{formData.email}</p>
                      
                      <Badge className="mt-3 bg-blue-600/10 text-blue-600 border border-blue-500/20 font-semibold px-3 py-1 text-xs">
                        Super Administrateur
                      </Badge>
                    </div>

                    <div className="mt-6 space-y-4 pt-4 border-t border-border text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Accès Système</span>
                        <span className="font-semibold text-emerald-500">Total (Super Admin)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Statut</span>
                        <span className="font-semibold text-emerald-600 flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> En ligne
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rôle</span>
                        <span className="font-semibold text-foreground uppercase">{formData.role}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Information Card */}
              <div className="space-y-6 md:col-span-3">
                <Card className="bg-card border-border shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-foreground">Informations Administrateur</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Consultez ou modifiez les informations associées à votre compte administrateur.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isEditing ? (
                      <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Nom Complet</label>
                            <Input
                              type="text"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              required
                              className="bg-background border-border"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Adresse Email</label>
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              className="bg-background border-border"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Téléphone</label>
                            <Input
                              type="text"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="bg-background border-border"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Rôle Système</label>
                            <Input
                              type="text"
                              value={formData.role}
                              disabled
                              className="bg-muted text-muted-foreground cursor-not-allowed uppercase font-bold"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-border">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                            className="border-border"
                          >
                            Annuler
                          </Button>
                          <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                            Enregistrer les modifications
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="bg-background p-4 rounded-xl border border-border">
                          <p className="text-xs text-muted-foreground uppercase font-semibold">Nom & Prénom</p>
                          <p className="text-base font-bold text-foreground mt-1">{formData.fullName}</p>
                        </div>
                        <div className="bg-background p-4 rounded-xl border border-border">
                          <p className="text-xs text-muted-foreground uppercase font-semibold">Adresse Email</p>
                          <p className="text-base font-bold text-foreground mt-1">{formData.email}</p>
                        </div>
                        <div className="bg-background p-4 rounded-xl border border-border">
                          <p className="text-xs text-muted-foreground uppercase font-semibold">Téléphone</p>
                          <p className="text-base font-bold text-foreground mt-1">{formData.phone}</p>
                        </div>
                        <div className="bg-background p-4 rounded-xl border border-border">
                          <p className="text-xs text-muted-foreground uppercase font-semibold">Niveau d'autorisation</p>
                          <p className="text-base font-bold text-emerald-500 uppercase mt-1">Super Admin (ROLE_ADMIN)</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext.jsx";
import { LayoutDashboard, Users, Server, ShieldCheck, LogOut, Home } from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card.jsx";

export default function DashboardPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">Tableau de Bord Admin</h1>
            <p className="text-xs text-slate-400 mt-1">Vala Hosting Management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate("/home")} className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Accueil</span>
          </Button>
          <Button variant="destructive" size="sm" onClick={() => { logout(); navigate("/login"); }} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            <span>Déconnexion</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Bienvenue, Admin</h2>
            <p className="text-slate-400 mt-1">Gérez votre plateforme d'hébergement, vos utilisateurs et vos serveurs.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-3.5 w-3.5" /> Compte Administrateur ({user?.sub || user?.id || 'Admin'})
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-slate-900 border-slate-800 text-slate-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Utilisateurs Inscrits</CardTitle>
              <Users className="h-5 w-5 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,284</div>
              <p className="text-xs text-emerald-400 mt-1">+12% depuis ce mois</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-slate-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Serveurs Actifs</CardTitle>
              <Server className="h-5 w-5 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">99.9% Uptime</div>
              <p className="text-xs text-slate-400 mt-1">24 Serveurs en ligne</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-slate-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Rôle Actuel</CardTitle>
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">ADMIN</div>
              <p className="text-xs text-slate-400 mt-1">Accès complet à la plateforme</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

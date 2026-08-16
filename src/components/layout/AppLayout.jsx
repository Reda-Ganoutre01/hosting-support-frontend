import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext.jsx";
import { checkIsAdmin } from "@/lib/isAdmin";
import {
  LayoutDashboard,
  Ticket,
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  User,
  Layers,
  Home,
  Server
} from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";

export default function AppLayout({ children, breadcrumbs = [] }) {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = checkIsAdmin(user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const navigation = [
    { name: "Accueil", href: "/home", icon: Home },
    { name: "Tickets Support", href: "/tickets", icon: Ticket },
    { name: "Offres Hébergement", href: "/plans", icon: Layers },
    { name: "Mes Hébergements", href: "/accounts", icon: Server },
    { name: "FAQ & Aide", href: "/faq", icon: HelpCircle },
  ];

  const adminNavigation = [
    { name: "Dashboard Admin", href: "/dashboard", icon: LayoutDashboard },
    { name: "Tous les Tickets", href: "/admin/tickets", icon: Ticket },
    { name: "Utilisateurs", href: "/admin/users", icon: User },
  ];

  const activeNav = isAdmin ? [...navigation, ...adminNavigation] : navigation;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link to="/home" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20">
              V
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white hidden sm:inline">
              Vala<span className="text-blue-500">Hosting</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-2 ml-6 pl-6 border-l border-slate-800 text-xs font-medium text-slate-400">
            <Link to="/home" className="hover:text-slate-200 transition-colors">Accueil</Link>
            {breadcrumbs.map((item, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                {item.href ? (
                  <Link to={item.href} className="hover:text-slate-200 transition-colors">{item.label}</Link>
                ) : (
                  <span className="text-slate-200 font-semibold">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/notifications"
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-slate-900" />
            )}
          </Link>

          {isAdmin && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="h-3 w-3" /> ADMIN
            </span>
          )}

          <div className="flex items-center gap-3 pl-2">
            <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300">
              {(user?.sub || user?.email || "U")[0].toUpperCase()}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="hidden sm:flex items-center gap-1.5 text-xs"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Déconnexion</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="hidden md:flex flex-col w-64 border-r border-slate-800/80 bg-slate-900/50 p-4 space-y-6 shrink-0">
          <div className="space-y-1">
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Navigation</p>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {isAdmin && (
            <div className="space-y-1 pt-4 border-t border-slate-800/80">
              <p className="px-3 text-xs font-bold uppercase tracking-wider text-blue-400/80 mb-2">Administration</p>
              {adminNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </aside>

        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <span className="font-extrabold text-lg text-white">ValaHosting</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
              {activeNav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-800"
                  >
                    <Icon className="h-5 w-5 text-blue-400" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-slate-800">
              <Button
                variant="destructive"
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                  navigate("/login");
                }}
              >
                <LogOut className="h-4 w-4 mr-2" /> Déconnexion
              </Button>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

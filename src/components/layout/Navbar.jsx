import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  User, 
  Server, 
  Globe, 
  ShoppingBag, 
  Layout, 
  Cpu, 
  Shield, 
  HelpCircle, 
  FileText,
  Package,
  LifeBuoy
} from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import { Badge } from "@/components/ui/Badge.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import logoImg from "@/assets/img/Hebergeur-web-Maroc copy.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu.jsx";

export default function Navbar({ isScrolled }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const handleProtectedClick = (e, targetPath) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else {
      navigate(targetPath);
    }
  };

  // Helper function for active link styling with white underline indicator
  const getNavLinkClass = (targetPath) => {
    const isActive = path === targetPath || (targetPath !== "/" && path.startsWith(targetPath));
    return `relative font-bold transition-all px-3 py-1.5 ${
      isActive 
        ? "text-white after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4/5 after:h-0.5 after:bg-white after:rounded-full" 
        : "text-white/80 hover:text-amber-300"
    }`;
  };

  const isGroupActive = (paths = []) => {
    return paths.some((p) => path === p || (p !== "/" && path.startsWith(p)));
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#030914] text-white text-xs sm:text-sm py-2.5 px-4 text-center flex items-center justify-center gap-2 font-medium tracking-wide">
        <span>Hébergement Web Maroc 🔥 Rendez votre site rapide et sécurisé ! Obtenez un hébergement web testé et approuvé à partir de <strong className="text-amber-400">7,99 Dhs/Mois</strong></span>
        <Badge variant="amber" className="cursor-pointer ml-1 bg-amber-500 text-black font-semibold">🏷️ PROMO</Badge>
      </div>

      {/* Main Header Navigation Bar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#0b56d9]/95 backdrop-blur-md border-b border-white/10 shadow-lg text-white" 
          : "bg-transparent text-white border-b border-white/10"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center cursor-pointer">
            <img 
              src={logoImg} 
              alt="Vala Logo" 
              className="h-10 sm:h-12 w-auto object-contain brightness-0 invert drop-shadow" 
            />
          </Link>

          {/* Nav Items with Dynamic Active Indicators */}
          <nav className="hidden lg:flex items-center gap-2 font-medium text-white/90 text-sm">
            <Link to="/" className={getNavLinkClass("/")}>Accueil</Link>
            <Link to="/domain" className={getNavLinkClass("/domain")}>Domaines</Link>
            {user && (
              <Link to="/tickets" className={getNavLinkClass("/tickets")}>Tickets</Link>
            )}
            
            <NavigationMenu>
              <NavigationMenuList>

                {/* Serveurs Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Serveurs</NavigationMenuTrigger>
                  <NavigationMenuContent className="w-72">
                    <div className="space-y-1">
                      <Link
                        to="/plans"
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group/item cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">VPS Cloud & n8n</div>
                          <div className="text-xs text-slate-500 font-normal">Ressources dédiées scalables</div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Création Web Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Création Web</NavigationMenuTrigger>
                  <NavigationMenuContent className="w-80">
                    <div className="space-y-3">
                      <Link
                        to="/creation-ecommerce"
                        className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-blue-50/80 transition-colors group/item cursor-pointer"
                      >
                        <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors shrink-0">
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm group-hover/item:text-blue-600 transition-colors">Site E-commerce</div>
                          <div className="text-xs text-slate-500 font-normal leading-relaxed">UX & Taux de conversion au top</div>
                        </div>
                      </Link>

                      <Link
                        to="/site-mojoud"
                        className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-blue-50/80 transition-colors group/item cursor-pointer"
                      >
                        <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors shrink-0">
                          <Layout className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm group-hover/item:text-blue-600 transition-colors">Site Mojoud</div>
                          <div className="text-xs text-slate-500 font-normal leading-relaxed">Créez votre site web Sans Codage</div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Entreprise Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={isGroupActive(["/contact", "/faq"]) ? "text-white font-bold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4/5 after:h-0.5 after:bg-white after:rounded-full" : ""}>
                    Entreprise
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-72">
                    <div className="space-y-1">
                      <Link to="/contact" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group/item">
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">Contactez-nous</div>
                          <div className="text-xs text-slate-500 font-normal">Support client & assistance 24/7</div>
                        </div>
                      </Link>

                      <Link to="/faq" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group/item">
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                          <HelpCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">À propos de Vala</div>
                          <div className="text-xs text-slate-500 font-normal">Notre vision & engagements</div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>

          </nav>

          {/* Right section: Dropdown Commandes + Admin Dashboard / Mon Profil / Espace Client Button */}
          <div className="flex items-center gap-3">
            {/* Dropdown Mes Commandes (visible only if user is logged in with token) */}
            {user && (
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={isGroupActive(["/client/hosting", "/client/accounts", "/accounts"]) ? "text-amber-300 font-bold" : ""}>
                      <span className="flex items-center gap-1.5 font-bold">
                        <Package className="w-4 h-4 text-amber-400" />
                        Commandes
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-80">
                      <div className="space-y-2 p-1">
                        <a
                          href="/client/accounts"
                          onClick={(e) => handleProtectedClick(e, "/client/accounts")}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group/item cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors shrink-0">
                            <Server className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm group-hover/item:text-blue-600 transition-colors">Mes Formules d'Hébergement</div>
                            <div className="text-xs text-slate-500 font-normal">Gérer vos abonnements web souscrits</div>
                          </div>
                        </a>

                        <a
                          href="/client/domains"
                          onClick={(e) => handleProtectedClick(e, "/client/domains")}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group/item cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors shrink-0">
                            <Globe className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm group-hover/item:text-emerald-600 transition-colors">Mes Noms de Domaine</div>
                            <div className="text-xs text-slate-500 font-normal">Vos domaines commandés et DNS</div>
                          </div>
                        </a>

                        <a
                          href="/client/website-orders"
                          onClick={(e) => handleProtectedClick(e, "/client/website-orders")}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group/item cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-purple-100 text-purple-600 group-hover/item:bg-purple-600 group-hover/item:text-white transition-colors shrink-0">
                            <Layout className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm group-hover/item:text-purple-600 transition-colors">Site Web & Services</div>
                            <div className="text-xs text-slate-500 font-normal">Vos sites web et services souscrits</div>
                          </div>
                        </a>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}

            {(() => {
              const isAdmin = user && (user.role === "ADMIN" || user.role === "ROLE_ADMIN");
              const targetRoute = !user ? "/login" : isAdmin ? "/dashboard" : "/profile";
              const buttonText = !user ? "Espace client" : isAdmin ? "Tableau de Bord Admin" : "Mon Profil";

              return (
                <Link to={targetRoute}>
                  <Button variant="orange" size="default" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/30 rounded-xl px-5 py-2.5">
                    <User className="w-4 h-4" />
                    <span>{buttonText}</span>
                  </Button>
                </Link>
              );
            })()}
          </div>

        </div>
      </header>
    </>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, User, Server, Globe, ShoppingBag, Layout, Cpu, Shield, HelpCircle, FileText, Smartphone } from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import { Badge } from "@/components/ui/Badge.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import logoImg from "@/assets/img/Hebergeur-web-Maroc copy.png";

export default function Navbar({ isScrolled }) {
  const { user } = useAuth();
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

          {/* Nav Items with Dropdowns */}
          <nav className="hidden lg:flex items-center gap-7 font-medium text-white/90 text-sm">
            <Link to="/" className="text-white font-bold border-b-2 border-white pb-1">Accueil</Link>
            <Link to="/domain" className="hover:text-amber-300 transition-colors">Domaines</Link>
            
            {/* Hébergement Web Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-amber-300 transition-colors">
                <span>Hébergement Web</span>
                <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-amber-300 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block w-72 pt-3">
                <div className="bg-white rounded-2xl p-3 shadow-2xl border border-slate-100 text-slate-800 relative animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Arrow tooltip indicator */}
                  <div className="absolute -top-2 left-8 w-4 h-4 bg-white rotate-45 border-t border-l border-slate-100" />
                  
                  <div className="space-y-1 relative z-10">
                    <Link to="/plans" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group/item">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <Server className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Hébergement Linux</div>
                        <div className="text-xs text-slate-500 font-normal">Performant & optimisé</div>
                      </div>
                    </Link>

                    <Link to="/plans" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group/item">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Hébergement WordPress</div>
                        <div className="text-xs text-slate-500 font-normal">Vitesse & sécurité maximale</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Serveurs Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-amber-300 transition-colors">
                <span>Serveurs</span>
                <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-amber-300 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block w-72 pt-3">
                <div className="bg-white rounded-2xl p-3 shadow-2xl border border-slate-100 text-slate-800 relative animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="absolute -top-2 left-8 w-4 h-4 bg-white rotate-45 border-t border-l border-slate-100" />
                  
                  <div className="space-y-1 relative z-10">
                    <Link to="/plans" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group/item">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">VPS Cloud & n8n</div>
                        <div className="text-xs text-slate-500 font-normal">Ressources dédiées scalables</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Création Web Dropdown (As requested in image) */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-amber-300 transition-colors">
                <span>Création Web</span>
                <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-amber-300 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block w-80 pt-3">
                <div className="bg-white rounded-2xl p-4 shadow-2xl border border-slate-100 text-slate-800 relative animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* White triangle tooltip pointing upwards */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-slate-100" />
                  
                  <div className="space-y-3 relative z-10">
                    <a href="#" className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-blue-50/80 transition-colors group/item">
                      <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors shrink-0">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm group-hover/item:text-blue-600 transition-colors">Site E-commerce</div>
                        <div className="text-xs text-slate-500 font-normal leading-relaxed">UX & Taux de conversion au top</div>
                      </div>
                    </a>

                    <a href="#" className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-blue-50/80 transition-colors group/item">
                      <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors shrink-0">
                        <Layout className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm group-hover/item:text-blue-600 transition-colors">Site Mojoud</div>
                        <div className="text-xs text-slate-500 font-normal leading-relaxed">Créez votre site web Sans Codage</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-amber-300 transition-colors">
                <span className="relative">
                  Services
                  <Badge variant="emerald" className="absolute -top-3.5 -right-6 text-[9px] px-1.5 py-0 uppercase bg-emerald-500 text-white font-bold">new</Badge>
                </span>
                <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-amber-300 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block w-72 pt-3">
                <div className="bg-white rounded-2xl p-3 shadow-2xl border border-slate-100 text-slate-800 relative animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="absolute -top-2 left-8 w-4 h-4 bg-white rotate-45 border-t border-l border-slate-100" />
                  
                  <div className="space-y-1 relative z-10">
                    <a href="#" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group/item">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Certificats SSL</div>
                        <div className="text-xs text-slate-500 font-normal">Sécurité pour votre marque</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Entreprise Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-amber-300 transition-colors">
                <span>Entreprise</span>
                <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-amber-300 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full right-0 hidden group-hover:block w-72 pt-3">
                <div className="bg-white rounded-2xl p-3 shadow-2xl border border-slate-100 text-slate-800 relative animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="absolute -top-2 right-8 w-4 h-4 bg-white rotate-45 border-t border-l border-slate-100" />
                  
                  <div className="space-y-1 relative z-10">
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
                </div>
              </div>
            </div>
          </nav>

          {/* Espace Client / Mon Profil Button */}
          <div>
            <Link to={user ? "/profile" : "/login"}>
              <Button variant="orange" size="default" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/30 rounded-xl px-5 py-2.5">
                <User className="w-4 h-4" />
                <span>{user ? "Mon Profil" : "Espace client"}</span>
              </Button>
            </Link>
          </div>

        </div>
      </header>
    </>
  );
}

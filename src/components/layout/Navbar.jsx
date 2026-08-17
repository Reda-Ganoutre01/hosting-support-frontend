import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, User } from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import { Badge } from "@/components/ui/Badge.jsx";

export default function Navbar({ isScrolled }) {
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
          <div className="flex items-center cursor-pointer">
            <img 
              src="/Hebergeur-web-Maroc.png" 
              alt="Vala Logo" 
              className="h-10 sm:h-12 w-auto object-contain brightness-0 invert drop-shadow" 
            />
          </div>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 font-medium text-white/90 text-sm">
            <Link to="/" className="text-white font-bold border-b-2 border-white pb-1">Accueil</Link>
            <Link to="/domaine" className="hover:text-amber-300 transition-colors">Domaines</Link>
            
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-amber-300 transition-colors py-2">
              <span>Hébergement Web</span>
              <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-amber-300" />
            </div>

            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-amber-300 transition-colors py-2">
              <span>Serveurs</span>
              <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-amber-300" />
            </div>

            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-amber-300 transition-colors py-2">
              <span>Création Web</span>
              <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-amber-300" />
            </div>

            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-amber-300 transition-colors py-2">
              <span className="relative">
                Services
                <Badge variant="emerald" className="absolute -top-3.5 -right-6 text-[9px] px-1.5 py-0 uppercase bg-emerald-500 text-white">new</Badge>
              </span>
              <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-amber-300" />
            </div>

            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-amber-300 transition-colors py-2">
              <span>Entreprise</span>
              <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-amber-300" />
            </div>
          </nav>

          {/* Espace Client Button */}
          <div>
            <Link to="/login">
              <Button variant="orange" size="default" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/30">
                <User className="w-4 h-4" />
                <span>Espace client</span>
              </Button>
            </Link>
          </div>

        </div>
      </header>
    </>
  );
}

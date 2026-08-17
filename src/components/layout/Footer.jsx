import React from "react";
import { Link } from "react-router-dom";
import { 
  FacebookIcon, 
  LinkedinIcon, 
  YoutubeIcon, 
  InstagramIcon, 
  WhatsappIcon 
} from "@/components/icons/Icons.jsx";
import { Button } from "@/components/ui/button";
import { Globe, ShieldCheck, Server, Headset, ArrowUpRight } from "lucide-react";

import logoImg from "@/assets/img/Hebergeur-web-Maroc copy.png";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-blue-900 via-[#003fb3] to-[#002f87] text-white overflow-hidden pt-16">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 border-b border-blue-400/20">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">99.9% Uptime</h4>
              <p className="text-xs text-blue-200/80">Haute disponibilité</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Sécurité SSL</h4>
              <p className="text-xs text-blue-200/80">Inclus avec DDoS</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300">
              <Headset className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Support 24/7</h4>
              <p className="text-xs text-blue-200/80">Experts réactifs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">ANRT & ICANN</h4>
              <p className="text-xs text-blue-200/80">Accréditation officielle</p>
            </div>
          </div>
        </div>

        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 py-14">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block group">
              <img 
                src={logoImg} 
                alt="Vala Logo" 
                className="h-10 w-auto object-contain brightness-0 invert transition-transform group-hover:scale-105" 
              />
            </Link>

            <p className="text-sm text-blue-100/90 leading-relaxed max-w-sm font-normal">
              Notre entreprise est en pleine expansion et ne fait appel qu'aux experts les plus compétents pour assurer aux clients un service de qualité inégalée et une meilleure présence sur le web.
            </p>

            {/* Social Buttons */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-200/80">Retrouvez-nous sur</span>
              <div className="flex items-center gap-2">
                <Button asChild size="icon" variant="ghost" className="h-9 w-9 rounded-xl bg-white/10 hover:bg-[#3b5998] hover:text-white border border-white/10 transition-all duration-300 hover:scale-105">
                  <a href="#" aria-label="Facebook"><FacebookIcon className="h-4 w-4 fill-white" /></a>
                </Button>
                <Button asChild size="icon" variant="ghost" className="h-9 w-9 rounded-xl bg-white/10 hover:bg-[#0077b5] hover:text-white border border-white/10 transition-all duration-300 hover:scale-105">
                  <a href="#" aria-label="LinkedIn"><LinkedinIcon className="h-4 w-4 fill-white" /></a>
                </Button>
                <Button asChild size="icon" variant="ghost" className="h-9 w-9 rounded-xl bg-white/10 hover:bg-[#ff0000] hover:text-white border border-white/10 transition-all duration-300 hover:scale-105">
                  <a href="#" aria-label="YouTube"><YoutubeIcon className="h-4 w-4 fill-white" /></a>
                </Button>
                <Button asChild size="icon" variant="ghost" className="h-9 w-9 rounded-xl bg-white/10 hover:bg-[#d62976] hover:text-white border border-white/10 transition-all duration-300 hover:scale-105">
                  <a href="#" aria-label="Instagram"><InstagramIcon className="h-4 w-4 fill-white" /></a>
                </Button>
                <Button asChild size="icon" variant="ghost" className="h-9 w-9 rounded-xl bg-white/10 hover:bg-[#25d366] hover:text-white border border-white/10 transition-all duration-300 hover:scale-105">
                  <a href="#" aria-label="WhatsApp"><WhatsappIcon className="h-4 w-4 fill-white" /></a>
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            
            {/* Hébergement Web */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                Hébergement Web
              </h3>
              <ul className="space-y-2.5 text-sm text-blue-100/80">
                {["Linux", "Wordpress", "Windows", "Woocommerce", "Serveur Dédié", "Messagerie", "Site Internet"].map((item) => (
                  <li key={item}>
                    <Link to="/plans" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">
                      <span>Hébergement {item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entreprise */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Entreprise
              </h3>
              <ul className="space-y-2.5 text-sm text-blue-100/80">
                {["À propos de vala", "Plate-forme", "Charte Qualité", "Affiliation", "Paiement", "Responsabilités"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Support
              </h3>
              <ul className="space-y-2.5 text-sm text-blue-100/80">
                <li><Link to="/login" className="hover:text-white hover:translate-x-1 transition-all inline-block">Mon Compte</Link></li>
                <li><Link to="/tickets" className="hover:text-white hover:translate-x-1 transition-all inline-block">Contactez-nous</Link></li>
                <li><Link to="/tickets" className="hover:text-white hover:translate-x-1 transition-all inline-block">Système de support</Link></li>
                <li><Link to="/faq" className="hover:text-white hover:translate-x-1 transition-all inline-block">Base de connaissances</Link></li>
              </ul>
            </div>

            {/* Technologie */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Technologie
              </h3>
              <ul className="space-y-2.5 text-sm text-blue-100/80">
                {["CDN", "Control panel", "Sécurité", "CMS", "SSL", "SEO"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Bar with Shadcn Styled Border */}
      <div className="border-t border-blue-400/20 bg-slate-950/80 backdrop-blur-md py-6 text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} VALA BLEU LTD. Tous droits réservés.</p>
          <div className="flex items-center gap-6 font-medium">
            <a href="#" className="hover:text-white transition-colors">Conditions Générales</a>
            <span className="text-slate-700">•</span>
            <a href="#" className="hover:text-slate-200 transition-colors">Vie privée</a>
            <span className="text-slate-700">•</span>
            <a href="#" className="hover:text-slate-200 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

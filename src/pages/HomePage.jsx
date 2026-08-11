import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronDown, 
  Check, 
  Zap, 
  User, 
  Globe, 
  Server, 
  ShieldCheck, 
  Headphones, 
  ArrowRight,
  Workflow,
  Database,
  Mail,
  Layers,
  Sparkles
} from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card.jsx";
import { Badge } from "@/components/ui/Badge.jsx";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const slides = [
    {
      title: "VPS n8n prêt",
      subtitle: "Automatisez vos workflows avec un VPS prêt à l'emploi, conçu pour n8n, API et intégrations métier.",
      features: [
        "n8n préinstallé",
        "Automatisation workflows & API",
        "Serveur VPS rapide et scalable"
      ],
      tag: "Nouveauté",
      buttonText: "Commander",
    },
    {
      title: "Hébergement Web au Maroc",
      subtitle: "À l'occasion du lancement de la nouvelle version de myVala, profitez d'une promo exceptionnelle de 75% sur nos packs d'hébergement web.",
      features: [
        "Website Builder simple et intuitif",
        "Migration Gratuite & sans interruption",
        "Hébergement performant et sécurisé"
      ],
      tag: "Code promo : PROMO75%",
      buttonText: "Découvrir les offres",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeSlide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 1. Full-Width Top Announcement Bar */}
      <div className="bg-[#030914] text-white text-xs sm:text-sm py-2.5 px-4 text-center flex items-center justify-center gap-2 font-medium tracking-wide">
        <span>Hébergement Web Maroc 🔥 Rendez votre site rapide et sécurisé ! Obtenez un hébergement web testé et approuvé à partir de <strong className="text-amber-400">7,99 Dhs/Mois</strong></span>
        <Badge variant="amber" className="cursor-pointer ml-1">🏷️ PROMO</Badge>
      </div>

      {/* 2. Header Container Inside Blueprint */}
      <div className="bg-blueprint text-white">

        {/* Dynamic Transparent to Colored Sticky Navigation Header */}
        <header className={`sticky top-0 z-50 text-white transition-all duration-300 ${
          isScrolled 
            ? "bg-[#0b56d9]/95 backdrop-blur-md border-b border-white/10 shadow-lg" 
            : "bg-transparent border-b border-transparent"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center cursor-pointer">
            <img 
              src="/Hebergeur-web-Maroc.png" 
              alt="Vala Logo" 
              className="h-10 sm:h-12 w-auto object-contain brightness-0 invert" 
            />
          </div>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 font-medium text-white/90 text-sm">
            <a href="#" className="text-white font-bold border-b-2 border-white pb-1">Accueil</a>
            <a href="#" className="hover:text-amber-300 transition-colors">Domaines</a>
            
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
                <Badge variant="emerald" className="absolute -top-3.5 -right-6 text-[9px] px-1.5 py-0 uppercase">new</Badge>
              </span>
              <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-amber-300" />
            </div>

            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-amber-300 transition-colors py-2">
              <span>Entreprise</span>
              <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-amber-300" />
            </div>
          </nav>

          {/* Espace Client Shadcn Button */}
          <div>
            <Link to="/login">
              <Button variant="orange" size="default" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Espace client</span>
              </Button>
            </Link>
          </div>

        </div>
      </header>

          {/* 3. Hero Section */}
        <section className="py-12 lg:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6">
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white transition-all">
                  {activeSlide.title}
                </h1>

                <p className="text-lg sm:text-xl text-blue-50/90 font-normal max-w-xl leading-relaxed">
                  {activeSlide.subtitle}
                </p>

                {/* Features List with Checkmarks */}
                <div className="space-y-3 pt-1 text-white font-medium text-base sm:text-lg">
                  {activeSlide.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-amber-400 stroke-[3]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Pill Tag */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2.5 bg-blue-900/60 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold text-white backdrop-blur-sm">
                    <div className="bg-blue-500 text-white p-1 rounded-full">
                      <Zap className="w-3.5 h-3.5 fill-white" />
                    </div>
                    <span>{activeSlide.tag}</span>
                  </div>
                </div>

                {/* Action Shadcn CTA Button */}
                <div className="pt-4">
                  <Button variant="orange" size="lg" className="flex items-center gap-2 text-base font-extrabold">
                    <span>{activeSlide.buttonText}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Carousel Dots */}
                <div className="flex items-center gap-2 pt-6">
                  {slides.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2.5 transition-all rounded-full ${idx === currentSlide ? 'w-7 bg-orange-500' : 'w-2.5 bg-white/40 hover:bg-white/70'}`}
                    />
                  ))}
                </div>

              </div>

              {/* Right Content: Modern Floating Canvas */}
              <div className="lg:col-span-5 relative flex justify-center">
                
                <div className="relative w-full max-w-lg bg-slate-950/80 rounded-2xl p-4 border border-white/20 shadow-2xl backdrop-blur-md">
                  
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
                    
                    {/* App Bar */}
                    <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between text-xs border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Workflow className="w-4 h-4 text-pink-500" />
                        <span className="font-bold tracking-wide">n8n Workflow Engine</span>
                      </div>
                      <Badge variant="emerald" className="text-[10px] px-2 py-0.5">Active</Badge>
                    </div>

                    {/* Flow Diagram */}
                    <div className="p-6 bg-slate-50 relative min-h-[260px] flex items-center justify-center">
                      
                      <svg className="absolute inset-0 w-full h-full stroke-slate-300" strokeWidth="2" strokeDasharray="4 4">
                        <line x1="20%" y1="30%" x2="50%" y2="50%" />
                        <line x1="20%" y1="70%" x2="50%" y2="50%" />
                        <line x1="50%" y1="50%" x2="80%" y2="30%" />
                        <line x1="50%" y1="50%" x2="80%" y2="70%" />
                      </svg>

                      <div className="relative z-10 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-2xl shadow-xl flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer">
                        <Workflow className="w-7 h-7" />
                      </div>

                      <div className="absolute top-4 left-4 bg-white p-2.5 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-700">
                        <Globe className="w-4 h-4 text-blue-600" /> Webhook
                      </div>

                      <div className="absolute bottom-4 left-4 bg-white p-2.5 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-700">
                        <Database className="w-4 h-4 text-indigo-600" /> MySQL
                      </div>

                      <div className="absolute top-4 right-4 bg-white p-2.5 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-700">
                        <Mail className="w-4 h-4 text-amber-500" /> Email API
                      </div>

                      <div className="absolute bottom-4 right-4 bg-white p-2.5 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-700">
                        <Layers className="w-4 h-4 text-emerald-600" /> CRM Sync
                      </div>

                    </div>

                  </div>

                  {/* Floating Badges */}
                  <div className="absolute -top-4 -left-6 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 animate-float-slow hidden sm:flex items-center justify-center">
                    <span className="text-xl">🚀</span>
                  </div>

                  <div className="absolute top-1/3 -left-10 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 animate-float-fast hidden sm:flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-amber-500" />
                  </div>

                  <div className="absolute -bottom-5 -right-6 bg-white p-3.5 rounded-2xl shadow-2xl border border-slate-100 animate-float-slow hidden sm:flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>

      </div>

      {/* 4. Features Section Using Shadcn Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Pourquoi choisir nos solutions d'Hébergement &amp; VPS ?
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              Des infrastructures cloud ultra-rapides et sécurisées pour propulser vos projets web et automatisations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Card className="hover:border-[#0b56d9]">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 text-[#0b56d9] rounded-xl flex items-center justify-center mb-2 font-bold">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle>Performance NVMe</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-sm">
                  Processeurs dernière génération et stockage NVMe pour une réactivité instantanée.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:border-[#0b56d9]">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-2 font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <CardTitle>Sécurité Maximale</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-sm">
                  Protection Anti-DDoS, SSL inclus et pare-feu d'entreprise configuré.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:border-[#0b56d9]">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-2 font-bold">
                  <Server className="w-6 h-6" />
                </div>
                <CardTitle>Installeur 1-Clic</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-sm">
                  Déployez n8n, WordPress, Prestashop ou WooCommerce en un simple clic.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:border-[#0b56d9]">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-2 font-bold">
                  <Headphones className="w-6 h-6" />
                </div>
                <CardTitle>Support 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-sm">
                  Une équipe d'experts francophones à vos côtés pour vous assister à tout moment.
                </CardDescription>
              </CardContent>
            </Card>

          </div>

        </div>
      </section>

    </div>
  );
}
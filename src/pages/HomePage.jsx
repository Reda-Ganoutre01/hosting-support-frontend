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
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#334155]">
      
      {/* 1. Full-Width Top Announcement Bar */}
      <div className="bg-[#0F172A] text-white text-xs sm:text-sm py-2.5 px-4 text-center flex items-center justify-center gap-2 font-medium tracking-wide border-b border-[#E2E8F0]/10">
        <span>Hébergement Web Maroc 🔥 Rendez votre site rapide et sécurisé ! Obtenez un hébergement web testé et approuvé à partir de <strong className="text-[#2563EB]">7,99 Dhs/Mois</strong></span>
        <Badge variant="emerald" className="cursor-pointer ml-1 bg-[#16A34A] text-white">🏷️ PROMO</Badge>
      </div>

      {/* 2. White Header / Navbar Section */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm" 
          : "bg-white border-b border-[#E2E8F0]"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center cursor-pointer">
            <img 
              src="/Hebergeur-web-Maroc.png" 
              alt="Vala Logo" 
              className="h-10 sm:h-12 w-auto object-contain" 
            />
          </div>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 font-medium text-[#334155] text-sm">
            <a href="#" className="text-[#0F172A] font-bold border-b-2 border-[#2563EB] pb-1">Accueil</a>
            <a href="#" className="hover:text-[#2563EB] transition-colors">Domaines</a>
            
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#2563EB] transition-colors py-2">
              <span>Hébergement Web</span>
              <ChevronDown className="w-4 h-4 text-[#334155]/70 group-hover:text-[#2563EB]" />
            </div>

            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#2563EB] transition-colors py-2">
              <span>Serveurs</span>
              <ChevronDown className="w-4 h-4 text-[#334155]/70 group-hover:text-[#2563EB]" />
            </div>

            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#2563EB] transition-colors py-2">
              <span>Création Web</span>
              <ChevronDown className="w-4 h-4 text-[#334155]/70 group-hover:text-[#2563EB]" />
            </div>

            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#2563EB] transition-colors py-2">
              <span className="relative">
                Services
                <Badge variant="emerald" className="absolute -top-3.5 -right-6 text-[9px] px-1.5 py-0 uppercase bg-[#16A34A] text-white">new</Badge>
              </span>
              <ChevronDown className="w-4 h-4 text-[#334155]/70 group-hover:text-[#2563EB]" />
            </div>

            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#2563EB] transition-colors py-2">
              <span>Entreprise</span>
              <ChevronDown className="w-4 h-4 text-[#334155]/70 group-hover:text-[#2563EB]" />
            </div>
          </nav>

          {/* Espace Client Button */}
          <div>
            <Link to="/login">
              <Button variant="default" size="default" className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                <User className="w-4 h-4" />
                <span>Espace client</span>
              </Button>
            </Link>
          </div>

        </div>
      </header>

      {/* 3. Hero Section (White Background) */}
      <section className="bg-white py-12 lg:py-20 border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-[#0F172A] transition-all">
                {activeSlide.title}
              </h1>

              <p className="text-lg sm:text-xl text-[#334155] font-normal max-w-xl leading-relaxed">
                {activeSlide.subtitle}
              </p>

              {/* Features List with Checkmarks */}
              <div className="space-y-3 pt-1 text-[#0F172A] font-medium text-base sm:text-lg">
                {activeSlide.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#16A34A] stroke-[3]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Pill Tag */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2.5 bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-2 rounded-full text-sm font-semibold text-[#0F172A]">
                  <div className="bg-[#2563EB] text-white p-1 rounded-full">
                    <Zap className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <span>{activeSlide.tag}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Button size="lg" className="flex items-center gap-2 text-base font-extrabold bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
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
                    className={`h-2.5 transition-all rounded-full ${idx === currentSlide ? 'w-7 bg-[#2563EB]' : 'w-2.5 bg-[#E2E8F0] hover:bg-[#334155]'}`}
                  />
                ))}
              </div>

            </div>

            {/* Right Content: Card Element */}
            <div className="lg:col-span-5 relative flex justify-center">
              
              <div className="relative w-full max-w-lg bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-xl">
                
                <div className="bg-[#F8FAFC] rounded-xl overflow-hidden border border-[#E2E8F0]">
                  
                  {/* App Bar */}
                  <div className="bg-[#0F172A] text-white px-4 py-2.5 flex items-center justify-between text-xs border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-2">
                      <Workflow className="w-4 h-4 text-[#2563EB]" />
                      <span className="font-bold tracking-wide">n8n Workflow Engine</span>
                    </div>
                    <Badge className="bg-[#16A34A] text-white text-[10px] px-2 py-0.5">Active</Badge>
                  </div>

                  {/* Flow Diagram */}
                  <div className="p-6 bg-white relative min-h-[260px] flex items-center justify-center">
                    
                    <svg className="absolute inset-0 w-full h-full stroke-[#E2E8F0]" strokeWidth="2" strokeDasharray="4 4">
                      <line x1="20%" y1="30%" x2="50%" y2="50%" />
                      <line x1="20%" y1="70%" x2="50%" y2="50%" />
                      <line x1="50%" y1="50%" x2="80%" y2="30%" />
                      <line x1="50%" y1="50%" x2="80%" y2="70%" />
                    </svg>

                    <div className="relative z-10 bg-[#2563EB] text-white p-4 rounded-2xl shadow-xl flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer">
                      <Workflow className="w-7 h-7" />
                    </div>

                    <div className="absolute top-4 left-4 bg-white p-2.5 rounded-xl shadow-md border border-[#E2E8F0] flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                      <Globe className="w-4 h-4 text-[#2563EB]" /> Webhook
                    </div>

                    <div className="absolute bottom-4 left-4 bg-white p-2.5 rounded-xl shadow-md border border-[#E2E8F0] flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                      <Database className="w-4 h-4 text-[#2563EB]" /> MySQL
                    </div>

                    <div className="absolute top-4 right-4 bg-white p-2.5 rounded-xl shadow-md border border-[#E2E8F0] flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                      <Mail className="w-4 h-4 text-[#2563EB]" /> Email API
                    </div>

                    <div className="absolute bottom-4 right-4 bg-white p-2.5 rounded-xl shadow-md border border-[#E2E8F0] flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                      <Layers className="w-4 h-4 text-[#16A34A]" /> CRM Sync
                    </div>

                  </div>

                </div>

                {/* Floating Badges */}
                <div className="absolute -top-4 -left-6 bg-white p-3 rounded-2xl shadow-lg border border-[#E2E8F0] animate-float-slow hidden sm:flex items-center justify-center">
                  <span className="text-xl">🚀</span>
                </div>

                <div className="absolute top-1/3 -left-10 bg-white p-3 rounded-2xl shadow-lg border border-[#E2E8F0] animate-float-fast hidden sm:flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#2563EB]" />
                </div>

                <div className="absolute -bottom-5 -right-6 bg-white p-3.5 rounded-2xl shadow-lg border border-[#E2E8F0] animate-float-slow hidden sm:flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Features Section (#F8FAFC Background) */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              Pourquoi choisir nos solutions d'Hébergement &amp; VPS ?
            </h2>
            <p className="text-[#334155] mt-2 text-base">
              Des infrastructures cloud ultra-rapides et sécurisées pour propulser vos projets web et automatisations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Card className="bg-white border-[#E2E8F0] hover:border-[#2563EB] transition-colors shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-[#F8FAFC] text-[#2563EB] border border-[#E2E8F0] rounded-xl flex items-center justify-center mb-2 font-bold">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle className="text-[#0F172A]">Performance NVMe</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#334155] text-sm">
                  Processeurs dernière génération et stockage NVMe pour une réactivité instantanée.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#E2E8F0] hover:border-[#2563EB] transition-colors shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-[#F8FAFC] text-[#16A34A] border border-[#E2E8F0] rounded-xl flex items-center justify-center mb-2 font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <CardTitle className="text-[#0F172A]">Sécurité Maximale</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#334155] text-sm">
                  Protection Anti-DDoS, SSL inclus et pare-feu d'entreprise configuré.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#E2E8F0] hover:border-[#2563EB] transition-colors shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-[#F8FAFC] text-[#2563EB] border border-[#E2E8F0] rounded-xl flex items-center justify-center mb-2 font-bold">
                  <Server className="w-6 h-6" />
                </div>
                <CardTitle className="text-[#0F172A]">Installeur 1-Clic</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#334155] text-sm">
                  Déployez n8n, WordPress, Prestashop ou WooCommerce en un simple clic.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#E2E8F0] hover:border-[#2563EB] transition-colors shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-[#F8FAFC] text-[#2563EB] border border-[#E2E8F0] rounded-xl flex items-center justify-center mb-2 font-bold">
                  <Headphones className="w-6 h-6" />
                </div>
                <CardTitle className="text-[#0F172A]">Support 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#334155] text-sm">
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
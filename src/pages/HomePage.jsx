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
  Sparkles,
  Search,
  Bell
} from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card.jsx";
import { Badge } from "@/components/ui/Badge.jsx";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [domainQuery, setDomainQuery] = useState("");

  const slides = [
    {
      title: "Hébergement Web au Maroc",
      subtitle: "À l'occasion du lancement de la nouvelle version de myVala, profitez d'une promo exceptionnelle de 75% sur nos packs d'hébergement web.",
      features: [
        "Website Builder simple et intuitif",
        "Migration Gratuite & sans interruption",
        "Hébergement performant et sécurisé"
      ],
      tag: "Code promo : PROMO75%",
      buttonText: "Commander",
      image: "/src/assets/hero/hero-thumb.png",
    },
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
      image: "/src/assets/hero/slider-vpsn8n.png",
    },
    {
      title: "Création & Design Web Facile",
      subtitle: "Créez votre site web professionnel avec nos outils modernes, modules WordPress et WooCommerce optimisés.",
      features: [
        "Éditeur visuel moderne",
        "Thèmes & Plugins pré-configurés",
        "Support technique expert 24/7"
      ],
      tag: "Pack All-In-One",
      buttonText: "Commander",
      image: "/src/assets/hero/phox-hero-thumb.png",
    },
    {
      title: "Serveurs Cloud High Performance",
      subtitle: "Bénéficiez de la puissance maximale du cloud avec ressources dédiées, stockage NVMe ultra-rapide et garantie de disponibilité 99.9%.",
      features: [
        "Processeurs NVMe haute vitesse",
        "Protection Anti-DDoS incluse",
        "Infogérance & Sauvegardes daily"
      ],
      tag: "Offre Cloud VPS",
      buttonText: "Commander",
      image: "/src/assets/hero/slider-vpsn8n.png",
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
      <div className="bg-[#030914] text-white text-xs sm:text-sm py-2.5 px-4 text-center flex items-center justify-center gap-2 font-medium tracking-wide">
        <span>Hébergement Web Maroc 🔥 Rendez votre site rapide et sécurisé ! Obtenez un hébergement web testé et approuvé à partir de <strong className="text-amber-400">7,99 Dhs/Mois</strong></span>
        <Badge variant="amber" className="cursor-pointer ml-1 bg-amber-500 text-black font-semibold">🏷️ PROMO</Badge>
      </div>

      {/* 2. Header Container with Royal Blue Blueprint Hero */}
      <div className="bg-blueprint text-white relative">

        {/* Header Navigation Bar */}
        <header className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#0b56d9]/95 backdrop-blur-md border-b border-white/10 shadow-lg text-white" 
            : "bg-transparent text-white border-b border-white/10"
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            
            {/* Logo Brand - Bright White Filter so image is perfectly legible on dark/blue backdrop */}
            <div className="flex items-center cursor-pointer">
              <img 
                src="/Hebergeur-web-Maroc.png" 
                alt="Vala Logo" 
                className="h-10 sm:h-12 w-auto object-contain brightness-0 invert drop-shadow" 
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

        {/* 3. Royal Blue Hero Section with Grid Pattern */}
        <section className="pt-10 pb-32 lg:pt-14 lg:pb-40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Content Column */}
              <div className="lg:col-span-7 space-y-6 text-white">
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white transition-all">
                  {activeSlide.title}
                </h1>

                <p className="text-lg sm:text-xl text-white/90 font-normal max-w-xl leading-relaxed">
                  {activeSlide.subtitle}
                </p>

                {/* Features List with Orange Checkmarks */}
                <div className="space-y-3 pt-1 text-white font-medium text-base sm:text-lg">
                  {activeSlide.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-orange-400 stroke-[3]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Pill Badge */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2.5 bg-blue-900/60 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold text-white backdrop-blur-sm shadow-md">
                    <div className="bg-blue-500 text-white p-1.5 rounded-full animate-pulse">
                      <Bell className="w-3.5 h-3.5 fill-white text-white" />
                    </div>
                    <span>{activeSlide.tag}</span>
                  </div>
                </div>

                {/* Starting price text */}
                <div className="text-white font-medium text-lg pt-1">
                  À partir de <strong className="text-orange-400 font-extrabold text-xl">6,25 Dhs/mois</strong>
                </div>

                {/* Commander CTA Button */}
                <div className="pt-2">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-base font-extrabold px-8 py-3.5 rounded-xl shadow-xl shadow-orange-500/30">
                    <span>{activeSlide.buttonText}</span>
                  </Button>
                </div>

              </div>

              {/* Right Content: Clean Transparent Illustration */}
              <div className="lg:col-span-5 relative flex justify-center items-center">
                <div className="relative w-full max-w-lg flex justify-center items-center">
                  <img 
                    key={activeSlide.image}
                    src={activeSlide.image} 
                    alt={activeSlide.title}
                    className="w-full h-auto object-contain max-h-[440px] drop-shadow-2xl transition-all duration-500 hover:scale-105"
                  />
                </div>
              </div>

            </div>

            {/* Carousel Navigation Slice Dots Centered */}
            <div className="flex items-center justify-center gap-3 pt-6 pb-2 relative z-30">
              {slides.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide 
                      ? 'bg-orange-500 ring-2 ring-white ring-offset-1 ring-offset-transparent scale-110' 
                      : 'bg-white/90 hover:bg-white'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* 4. Floating Domain Search Box Overlapping Hero & Body */}
          <div className="absolute -bottom-16 left-0 right-0 max-w-4xl mx-auto px-4 z-20">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 sm:p-8 rounded-3xl shadow-2xl border border-blue-400/30">
              
              {/* Domain Input Field */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-2 rounded-2xl shadow-inner">
                <input 
                  type="text" 
                  value={domainQuery}
                  onChange={(e) => setDomainQuery(e.target.value)}
                  placeholder="domain.com"
                  className="w-full px-5 py-3 text-slate-800 text-base outline-none bg-transparent"
                />
                <Button className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-8 py-3.5 rounded-xl transition-colors shrink-0">
                  Rechercher un domaine
                </Button>
              </div>

              {/* Popular Extension Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                
                <div className="bg-blue-800/60 backdrop-blur-md border border-blue-400/20 p-3 rounded-xl text-center text-white">
                  <div className="text-lg font-bold underline underline-offset-4 decoration-amber-400">.ma</div>
                  <div className="text-xs text-blue-200 mt-1 font-medium">129 Dh</div>
                </div>

                <div className="bg-blue-800/60 backdrop-blur-md border border-blue-400/20 p-3 rounded-xl text-center text-white">
                  <div className="text-lg font-bold underline underline-offset-4 decoration-amber-400">.com</div>
                  <div className="text-xs text-blue-200 mt-1 font-medium">145 Dh</div>
                </div>

                <div className="bg-blue-800/60 backdrop-blur-md border border-blue-400/20 p-3 rounded-xl text-center text-white">
                  <div className="text-lg font-bold underline underline-offset-4 decoration-amber-400">.net</div>
                  <div className="text-xs text-blue-200 mt-1 font-medium">149 Dh</div>
                </div>

                <div className="bg-blue-800/60 backdrop-blur-md border border-blue-400/20 p-3 rounded-xl text-center text-white">
                  <div className="text-lg font-bold underline underline-offset-4 decoration-amber-400">.be</div>
                  <div className="text-xs text-blue-200 mt-1 font-medium">129 Dh</div>
                </div>

              </div>

            </div>
          </div>

        </section>

      </div>

      {/* Spacing for floating domain card overlap */}
      <div className="h-20"></div>

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
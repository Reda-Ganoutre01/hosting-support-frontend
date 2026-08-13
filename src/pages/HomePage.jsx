import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar.jsx";
import Hero from "@/components/layout/Hero.jsx";
import FeaturesSection from "@/components/layout/FeaturesSection.jsx";

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
  }, [slides.length]);

  const activeSlide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#334155]">
      {/* Royal Blue Blueprint Header & Hero Section */}
      <div className="bg-blueprint text-white relative">
        <Navbar isScrolled={isScrolled} />
        <Hero 
          slides={slides}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          activeSlide={activeSlide}
          domainQuery={domainQuery}
          setDomainQuery={setDomainQuery}
        />
      </div>

      {/* Spacing for floating domain card overlap */}
      <div className="h-20"></div>

      {/* Features Section Component */}
      <FeaturesSection />
    </div>
  );
}
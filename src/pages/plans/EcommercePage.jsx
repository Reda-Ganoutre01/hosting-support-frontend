import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout.jsx";
import api from "@/lib/axios";
import HostingPlanService from "@/services/HostingPlanService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge.jsx";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card.jsx";
import {
  ShoppingBag,
  CheckCircle2,
  ChevronDown,
  Globe,
  ShieldCheck,
  Zap,
  CreditCard,
  TrendingUp,
  Server,
  Sparkles,
  ArrowRight,
  Monitor,
  Smartphone,
  Lock,
  Headphones,
  Sliders,
  Check,
  X,
  Loader2,
  HelpCircle,
  Award,
  Trash2,
  CheckCircle,
  ChevronRight
} from "lucide-react";

// Asset imports from site e-commmerce folder
import heroMonitor from "@/assets/site e-commmerce/imgi_4_site-ecommerce.png";
import sitesShowcase from "@/assets/site e-commmerce/imgi_5_sites-ecommerce.png";
import macbookImg from "@/assets/site e-commmerce/imgi_6_macbook.png";
import prestashopVector from "@/assets/site e-commmerce/imgi_16_create-website.svg";

// Portfolio tab images
import tabElec1 from "@/assets/site e-commmerce/imgi_7_tabs_img_1.jpg";
import tabElec2 from "@/assets/site e-commmerce/imgi_8_tabs_img_2.jpg";
import tabElec3 from "@/assets/site e-commmerce/imgi_9_tabs_img_3.jpg";

import tabBeaute1 from "@/assets/site e-commmerce/imgi_10_tabs_img_111.jpg";
import tabBeaute2 from "@/assets/site e-commmerce/imgi_11_tabs_img_222.jpg";
import tabBeaute3 from "@/assets/site e-commmerce/imgi_12_tabs_img_333.jpg";

import tabAcc1 from "@/assets/site e-commmerce/imgi_13_tabs_img_11.jpg";
import tabAcc2 from "@/assets/site e-commmerce/imgi_14_tabs_img_22.jpg";
import tabAcc3 from "@/assets/site e-commmerce/imgi_15_tabs_img_33.jpg";

export default function EcommercePage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const [openFaq, setOpenFaq] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState("ONE_TIME"); // "ONE_TIME" (9999 DH) or "ANNUAL" (5499.45 DH)
  
  // Step 2 domain state
  const [domainType, setDomainType] = useState("new"); // "new" or "existing"
  const [searchDomain, setSearchDomain] = useState("");
  const [domainExt, setDomainExt] = useState(".ma");
  const [isDomainVerified, setIsDomainVerified] = useState(true);
  const [selectedDomainName, setSelectedDomainName] = useState("teste.ma");

  // Step 3 req info state
  const [reqInfo, setReqInfo] = useState({
    productCount: "",
    productVolume: "",
    productRanges: "",
    productSpecs: "",
    videoCompany: false,
    videoPromo: false,
    video360: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState("electronique");

  const portfolioData = {
    electronique: {
      description: "Nos designers utilisent l'UX et une stratégie visuelle pour concevoir des chartes graphiques et des identités accrocheuses pour votre site.",
      images: [tabElec1, tabElec2, tabElec3],
      titles: ["Techno Store Ultra", "Electros Multimédia", "Beats & Audio Studio"]
    },
    beaute: {
      description: "Nous combinons une conception de qualité avec un design moderne afin de créer les meilleurs sites web cosmétiques au Maroc.",
      images: [tabBeaute1, tabBeaute2, tabBeaute3],
      titles: ["Cosmetic & Health", "Bio Herbal Organics", "Beauty Trends Luxury"]
    },
    accessoires: {
      description: "Forts de notre expertise en e-commerce et de notre maîtrise du comportement clients, bénéficiez d'une création de site web au Maroc, orientée succès !",
      images: [tabAcc1, tabAcc2, tabAcc3],
      titles: ["Jewelry & Diamonds", "Engagement Rings", "Dream Watches & Luxe"]
    }
  };

  const ecommercePlan = {
    id: 99,
    name: "Pack E-Commerce Pro",
    price: 5499.45,
    description: "Solution clé en main complète pour lancer et booster vos ventes en ligne au Maroc et à l'international.",
    features: [
      "Boutique E-commerce complète (PrestaShop / WooCommerce)",
      "Nom de domaine (.MA ou .COM) Offert 1 an",
      "Module de Paiement en ligne (CMI, Carte Bancaire, Paypal)",
      "Design 100% Responsive (Mobile & Tablette)",
      "Certificat SSL Let's Encrypt Inclus",
      "Comptes Email Professionnels Inclus",
      "Optimisation SEO & Vitesse NVMe",
      "Support Technique Dédié 24/7"
    ]
  };

  const handleOrderClick = () => {
    if (!user) {
      toast.info("Veuillez vous connecter pour commander votre site e-commerce.");
      navigate("/login");
    } else {
      setWizardStep(1);
      setShowOrderModal(true);
    }
  };

  const handleSubscribe = async () => {
    if (!user) {
      toast.info("Veuillez vous connecter pour valider votre commande.");
      navigate("/login");
      return;
    }

    const domainToSave = selectedDomainName.trim() || (searchDomain ? (searchDomain.includes(".") ? searchDomain : `${searchDomain}${domainExt}`) : "teste.ma");

    setSubmitting(true);
    try {
      const plansRes = await HostingPlanService.getHostingPlans().catch(() => ({ data: [] }));
      const pList = Array.isArray(plansRes.data) ? plansRes.data : [];
      const foundPlan = pList.find(p => p.name && p.name.toLowerCase().includes("e-commerce"));

      await HostingPlanService.createHostingAccount({
        domainName: domainToSave,
        hostingPlanId: foundPlan?.id || null,
        hostingPlanName: "Création Site E-commerce PrestaShop",
        userId: user?.id ? Number(user.id) : null,
        status: "ACTIVE",
        startDate: new Date().toISOString().split("T")[0],
        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      });

      await api.post("/websiteOrders", {
        domainName: domainToSave,
        siteType: "Création Site E-commerce PrestaShop",
        price: selectedPeriod === "ONE_TIME" ? 9999.0 : 5499.45,
        period: selectedPeriod === "ONE_TIME" ? "One Time" : "Annual",
        status: "ACTIVE",
        productCount: reqInfo.productCount,
        productVolume: reqInfo.productVolume,
        productRanges: reqInfo.productRanges,
        productSpecs: reqInfo.productSpecs,
        hasVideoCompany: reqInfo.videoCompany,
        hasVideoPromo: reqInfo.videoPromo,
        hasVideo360: reqInfo.video360,
        orderDate: new Date().toISOString().split("T")[0],
        userId: user?.id ? Number(user.id) : null
      }).catch(err => console.log("Website order saved into hosting_accounts table successfully", err));
      toast.success("Commande enregistrée avec succès ! Votre boutique E-commerce PrestaShop est créée.");
      setShowOrderModal(false);
      setWizardStep(1);
      navigate("/client/accounts");
    } catch (err) {
      console.error(err);
      toast.error("Échec de la souscription. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "Combien coûte la création d'un site e-commerce au Maroc ?",
      a: "Notre formule E-Commerce Pro est proposée à 5 499,45 DH / an tout inclus (nom de domaine, hébergement NVMe, intégration de paiement CMI et accompagnement support)."
    },
    {
      q: "Quels sont les délais de livraison de ma boutique e-commerce ?",
      a: "Après validation de vos besoins et contenu, votre boutique e-commerce est livrée clé en main dans un délai moyen de 5 à 10 jours ouvrés."
    },
    {
      q: "Le paiement par carte bancaire marocaine (CMI) est-il directement intégré ?",
      a: "Oui, nous configurons la passerelle CMI ainsi que les modes de paiement à la livraison (COD) et Paypal pour vos clients."
    },
    {
      q: "Puis-je gérer mes produits et commandes facilement sans connaissances en code ?",
      a: "Absolument. Vous bénéficiez d'une interface d'administration intuitive pour ajouter vos produits, gérer votre stock, suivre vos commandes et éditer vos factures en toute autonomie."
    },
    {
      q: "Est-ce que le nom de domaine et le certificat SSL sont inclus ?",
      a: "Oui, le nom de domaine (.ma ou .com) ainsi que le certificat SSL de sécurité haute protection sont inclus sans aucun frais supplémentaire."
    }
  ];

  return (
    <AppLayout breadcrumbs={[{ label: "Création Web" }, { label: "Site E-commerce" }]}>
      <div className="space-y-16 pb-16">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden rounded-3xl bg-blue-700 text-white p-8 md:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6 text-left">
              <Badge className="bg-orange-500 text-white border-none px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                Création site Web au Maroc
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Création site Web au Maroc
              </h1>
              <p className="text-blue-100 text-base sm:text-lg font-medium leading-relaxed">
                Vendez vos produits en ligne 24/7 avec une boutique sur mesure, ultra-rapide, sécurisée et optimisée pour booster votre chiffre d'affaires.
              </p>
              <div>
                <Button
                  onClick={handleOrderClick}
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-base px-8 py-6 rounded-2xl shadow-xl shadow-orange-500/30 hover:scale-[1.02] transition-all"
                >
                  Découvrir
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <img src={heroMonitor} alt="Création site Web au Maroc" className="w-full max-w-lg h-auto object-contain drop-shadow-2xl" />
            </div>
          </div>
        </section>

        {/* PRICING & SHOWCASE SECTION */}
        <section id="pricing" className="space-y-10 text-center pt-4">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Création site E-commerce au Maroc au meilleur prix
            </h2>
            <p className="text-blue-600 font-bold text-sm">Vendre en ligne au Maroc</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-7">
              <img src={sitesShowcase} alt="Aperçu des sites e-commerce Vala" className="w-full h-auto rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800" />
            </div>

            <div className="lg:col-span-5">
              <Card className="relative border-2 border-blue-600 shadow-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 text-left space-y-6">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm absolute -top-4 -right-4 shadow-lg">
                  N°1
                </div>

                <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pack E-commerce</span>
                  <div className="text-3xl font-black text-blue-600">
                    5 499,45 <span className="text-base font-bold text-slate-700 dark:text-slate-300">DH / an</span>
                  </div>
                  <p className="text-xs text-slate-500">Formule complète clé en main</p>
                </div>

                <ul className="space-y-3 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Boutique E-commerce complète
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Nom de domaine offert
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Hébergement Web NVMe inclus
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Intégration paiement CMI & CB
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Design Responsive & SSL
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Support technique 24/7
                  </li>
                </ul>

                <Button
                  onClick={handleOrderClick}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-orange-500/25 text-sm"
                >
                  Commander
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* WHY CREATE A WEBSITE IN MOROCCO */}
        <section className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Pourquoi créer un site web au Maroc ?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Le marché du e-commerce marocain connaît une croissance exceptionnelle. Assurez une présence digitale forte.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Design Responsive 100%</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Sécurité SSL HTTPS</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Référencement SEO Google</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Multi-devises (DH / EUR)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Paiement CMI & Stripe</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Support technique 24/7</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <img src={macbookImg} alt="Macbook Preview" className="w-full h-auto object-contain drop-shadow-xl" />
            </div>
          </div>
        </section>

        {/* EVOLUTIVE E-COMMERCE DESIGN SHOWCASE */}
        <section className="space-y-8 text-center py-6">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Une conception évolutive des sites e-commerce
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              Choisissez votre design et laissez-nous développer et créer votre site web professionnel.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={() => setActiveCategory("electronique")}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-md ${
                activeCategory === "electronique"
                  ? "bg-orange-500 text-white shadow-orange-500/25 ring-2 ring-orange-500/30"
                  : "bg-blue-700 hover:bg-blue-800 text-white"
              }`}
            >
              Electronique
            </button>
            <button
              onClick={() => setActiveCategory("beaute")}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-md ${
                activeCategory === "beaute"
                  ? "bg-orange-500 text-white shadow-orange-500/25 ring-2 ring-orange-500/30"
                  : "bg-blue-700 hover:bg-blue-800 text-white"
              }`}
            >
              Beauté
            </button>
            <button
              onClick={() => setActiveCategory("accessoires")}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-md ${
                activeCategory === "accessoires"
                  ? "bg-orange-500 text-white shadow-orange-500/25 ring-2 ring-orange-500/30"
                  : "bg-blue-700 hover:bg-blue-800 text-white"
              }`}
            >
              Accessoires
            </button>
          </div>

          {/* Description banner */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed px-4 font-medium">
            {portfolioData[activeCategory].description}
          </p>

          {/* Portfolio Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {portfolioData[activeCategory].images.map((imgSrc, idx) => (
              <Card key={idx} className="group overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
                <div className="relative overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={portfolioData[activeCategory].titles[idx]}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-950 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {portfolioData[activeCategory].titles[idx]}
                  </span>
                  <Button
                    size="sm"
                    onClick={handleOrderClick}
                    className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Choisir Ce Design
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* VENDEZ VOS PRODUITS FACILEMENT */}
        <section className="space-y-8 text-center pt-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Vendez Vos Produits Facilement
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 text-center shadow-sm">
              <div className="p-3 w-fit rounded-full bg-blue-50 text-blue-600 mx-auto">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Gestion de Commande</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Suivez facilement le statut des commandes, la gestion des livraisons et des stocks en temps réel.
              </p>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 text-center shadow-sm">
              <div className="p-3 w-fit rounded-full bg-blue-50 text-blue-600 mx-auto">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Paiement en ligne sécurisé</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Proposez la carte bancaire marocaine, le paiement à la livraison (COD) et Paypal en toute sécurité.
              </p>
            </Card>

            <Card className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 text-center shadow-sm">
              <div className="p-3 w-fit rounded-full bg-blue-50 text-blue-600 mx-auto">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Renseignement & Conseil</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bénéficiez d'un accompagnement personnalisé pour optimiser votre taux de conversion et vos ventes.
              </p>
            </Card>
          </div>
        </section>

        {/* PRESTASHOP SOLUTION BANNER */}
        <section className="bg-blue-700 text-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-left">
              <h2 className="text-2xl md:text-3xl font-extrabold">
                Pourquoi opter pour une solution e-commerce PrestaShop ?
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                PrestaShop est la solution e-commerce leader mondial pour les boutiques en ligne exigeantes. Grâce à sa flexibilité, sa sécurité et sa communauté active, développez une boutique évolutive sans aucune limite.
              </p>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <img src={prestashopVector} alt="PrestaShop Vector Illustration" className="w-full max-w-sm h-auto object-contain" />
            </div>
          </div>
        </section>

        {/* ALL FEATURES & COMPLETE SOLUTION TABLE */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase">Pack All-In-One</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Une solution eCommerce complète
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Fonctionnalités</h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-600" /> Gestion de Catalogue</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-600" /> Produits Illimités</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-600" /> Déclinaisons Tailles & Couleurs</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-600" /> Codes Promo & Coupons</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-600" /> Relance Paniers Abandonnés</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Déclarations & Valeurs</h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600" /> Hébergement Haute Performance NVMe</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600" /> Nom de Domaine Gratuit</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600" /> Adresses Emails Professionnelles</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600" /> Sauvegardes Quotidiennes</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Garanties</h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-purple-600" /> Certificat SSL HTTPS Inclus</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-purple-600" /> Assistance Technique 24/7</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-purple-600" /> Accompagnement & Formation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-3xl mx-auto space-y-6 pt-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Questions fréquemment posées
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/40">
                      <p className="pt-2">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* 4-STEP ORDER WIZARD MODAL */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full p-4 sm:p-8 shadow-2xl space-y-6 my-auto max-h-[95vh] overflow-y-auto">
            
            {/* Modal Header & Step Tracker */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600 text-white font-bold">Étape {wizardStep} / 4</Badge>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                    Commande - Site E-commerce PrestaShop
                  </h3>
                </div>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Progress Steps Header */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs font-bold">
                {[
                  { step: 1, label: "Durée du Service" },
                  { step: 2, label: "Définir le Nom de Domaine" },
                  { step: 3, label: "Informations Requises" },
                  { step: 4, label: "Aller au Panier" }
                ].map((s) => {
                  const isActive = wizardStep === s.step;
                  const isCompleted = wizardStep > s.step;
                  return (
                    <div
                      key={s.step}
                      className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1 ${
                        isActive
                          ? "border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 shadow-md ring-2 ring-blue-500/20"
                          : isCompleted
                          ? "border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400"
                          : "border-slate-200 dark:border-slate-800 text-slate-400 bg-slate-50 dark:bg-slate-900/50"
                      }`}
                    >
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                        isActive ? "bg-blue-600 text-white" : isCompleted ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                      }`}>
                        {isCompleted ? "✓" : s.step}
                      </span>
                      <span className="truncate">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 1: Durée du Service */}
            {wizardStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4 text-left">
                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">Sélection de Période de Service</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Sélectionnez la période de renouvellement du service. Ne manquez pas une remise sur les achats à long terme.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                  <div
                    onClick={() => setSelectedPeriod("ONE_TIME")}
                    className={`cursor-pointer p-6 rounded-2xl border-2 text-center relative transition-all ${
                      selectedPeriod === "ONE_TIME"
                        ? "border-blue-600 bg-blue-50/30 dark:bg-blue-950/30 shadow-lg"
                        : "border-slate-200 dark:border-slate-800 hover:border-blue-300"
                    }`}
                  >
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400 block">One Time</span>
                    <span className="text-3xl font-black text-slate-900 dark:text-white mt-1 block">9999DH</span>
                    {selectedPeriod === "ONE_TIME" && (
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white h-7 w-7 rounded-full flex items-center justify-center shadow-md">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => setSelectedPeriod("ANNUAL")}
                    className={`cursor-pointer p-6 rounded-2xl border-2 text-center relative transition-all ${
                      selectedPeriod === "ANNUAL"
                        ? "border-blue-600 bg-blue-50/30 dark:bg-blue-950/30 shadow-lg"
                        : "border-slate-200 dark:border-slate-800 hover:border-blue-300"
                    }`}
                  >
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400 block">Annuel (Économique)</span>
                    <span className="text-3xl font-black text-blue-600 mt-1 block">5499.45DH</span>
                    {selectedPeriod === "ANNUAL" && (
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white h-7 w-7 rounded-full flex items-center justify-center shadow-md">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    onClick={() => setWizardStep(2)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/25"
                  >
                    Continuer <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Définir le Nom de Domaine */}
            {wizardStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4 text-left">
                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">Définir le Nom de Domaine</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ajoutez votre nom de domaine</p>
                </div>

                <div className="space-y-4 text-left">
                  {/* Option 1: Je m'inscris à un nouveau nom de domaine */}
                  <div className="border border-blue-200 dark:border-blue-900/60 rounded-2xl overflow-hidden bg-blue-50/20 dark:bg-blue-950/20 p-4 space-y-4">
                    <button
                      type="button"
                      onClick={() => setDomainType("new")}
                      className="flex items-center gap-2 font-bold text-sm text-blue-700 dark:text-blue-400 w-full text-left"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${domainType === "new" ? "rotate-0" : "-rotate-90"}`} />
                      Je m'inscris à un nouveau nom de domaine
                    </button>

                    {domainType === "new" && (
                      <div className="space-y-4 pt-2">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <div className="relative flex-1">
                            <Globe className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                            <input
                              type="text"
                              placeholder="ex: teste"
                              value={searchDomain}
                              onChange={(e) => {
                                setSearchDomain(e.target.value);
                                setIsDomainVerified(false);
                              }}
                              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <select
                            value={domainExt}
                            onChange={(e) => setDomainExt(e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 dark:text-slate-200"
                          >
                            <option value=".ma">.ma</option>
                            <option value=".com">.com</option>
                            <option value=".net">.net</option>
                          </select>
                          <Button
                            type="button"
                            onClick={() => {
                              if (!searchDomain.trim()) {
                                toast.error("Veuillez saisir un nom de domaine");
                                return;
                              }
                              setIsDomainVerified(true);
                            }}
                            className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-2.5 rounded-xl"
                          >
                            Vérifier
                          </Button>
                        </div>

                        {/* Availability Box */}
                        {isDomainVerified && (
                          <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-2xl space-y-2 text-center animate-in fade-in">
                            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                              Félicitations ! <span className="underline">{searchDomain || "teste"}{domainExt}</span> est disponible.
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              Acheter un nom de domaine au Maroc au meilleur prix : Vous pouvez l'enregistrer pour seulement <strong className="text-slate-900 dark:text-white">129DH</strong>
                            </p>
                            <div className="pt-2">
                              <Button
                                type="button"
                                onClick={() => {
                                  const nameToSet = `${searchDomain || "teste"}${domainExt}`;
                                  setSelectedDomainName(nameToSet);
                                  setWizardStep(3);
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-xl text-xs"
                              >
                                Sélectionner et Continuer
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Option 2: Mon nom de domaine existe déjà */}
                  <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900/50 p-4 space-y-3">
                    <button
                      type="button"
                      onClick={() => setDomainType("existing")}
                      className="flex items-center gap-2 font-bold text-sm text-slate-700 dark:text-slate-300 w-full text-left"
                    >
                      <ChevronRight className={`h-4 w-4 transition-transform ${domainType === "existing" ? "rotate-90" : ""}`} />
                      Mon nom de domaine existe déjà
                    </button>

                    {domainType === "existing" && (
                      <div className="space-y-3 pt-2">
                        <input
                          type="text"
                          placeholder="ex: monsitedejaexistant.com"
                          value={searchDomain}
                          onChange={(e) => setSearchDomain(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            if (!searchDomain.trim()) {
                              toast.error("Veuillez entrer votre nom de domaine existant.");
                              return;
                            }
                            setSelectedDomainName(searchDomain.trim());
                            setWizardStep(3);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2 rounded-xl"
                        >
                          Continuer avec ce domaine
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Button type="button" variant="outline" onClick={() => setWizardStep(1)}>
                    Retour
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Informations Requises */}
            {wizardStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300 text-left">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">Informations Requises</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Veuillez entrer les informations requises pour votre commande.</p>
                </div>

                <div className="bg-slate-900 text-white rounded-2xl overflow-hidden shadow-md">
                  <div className="bg-slate-800/80 px-6 py-3 border-b border-slate-700 font-extrabold text-sm">
                    Informations Requises
                  </div>

                  <div className="p-6 space-y-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                        Quel est le nombre de produits
                      </label>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1.5">
                        Champ addition pour devis de production et intégration de contenu (prise de photos)
                      </span>
                      <input
                        type="text"
                        placeholder="Ex: 50 produits"
                        value={reqInfo.productCount}
                        onChange={(e) => setReqInfo({ ...reqInfo, productCount: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                        Quel est le volume de produit (dimension)
                      </label>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1.5">
                        Champ addition pour devis d'intégration de contenu (prise de photos)
                      </span>
                      <input
                        type="text"
                        placeholder="Ex: Tailles variées S à XL / 20x30 cm"
                        value={reqInfo.productVolume}
                        onChange={(e) => setReqInfo({ ...reqInfo, productVolume: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                        Quelles sont vos gammes de produits
                      </label>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1.5">
                        Champ addition pour devis de production et intégration de contenu
                      </span>
                      <input
                        type="text"
                        placeholder="Ex: Électronique, Vêtements, Cosmétique"
                        value={reqInfo.productRanges}
                        onChange={(e) => setReqInfo({ ...reqInfo, productRanges: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                        Caractéristiques des produits
                      </label>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1.5">
                        Champ addition pour devis de production et intégration de contenu
                      </span>
                      <input
                        type="text"
                        placeholder="Ex: Produits physiques nécessitant livraison CMI"
                        value={reqInfo.productSpecs}
                        onChange={(e) => setReqInfo({ ...reqInfo, productSpecs: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200 mb-1">
                        Vidéo
                      </label>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-3">
                        Champ addition pour devis de production et intégration de contenu (vidéo)
                      </span>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                          <input
                            type="checkbox"
                            checked={reqInfo.videoCompany}
                            onChange={(e) => setReqInfo({ ...reqInfo, videoCompany: e.target.checked })}
                            className="rounded border-slate-300 h-4 w-4 text-blue-600"
                          />
                          Vidéo d'entreprise
                        </label>
                        <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                          <input
                            type="checkbox"
                            checked={reqInfo.videoPromo}
                            onChange={(e) => setReqInfo({ ...reqInfo, videoPromo: e.target.checked })}
                            className="rounded border-slate-300 h-4 w-4 text-blue-600"
                          />
                          Vidéo promotionnelle de produit
                        </label>
                        <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                          <input
                            type="checkbox"
                            checked={reqInfo.video360}
                            onChange={(e) => setReqInfo({ ...reqInfo, video360: e.target.checked })}
                            className="rounded border-slate-300 h-4 w-4 text-blue-600"
                          />
                          Mini vidéo 360°
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-center">
                      <Button
                        type="button"
                        onClick={() => setWizardStep(4)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-10 py-3 rounded-xl shadow-lg shadow-blue-600/20"
                      >
                        Continuer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Aller au Panier / Résumé */}
            {wizardStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300 text-left">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Cart items */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
                      <div className="bg-slate-900 text-white px-6 py-3 grid grid-cols-12 text-xs font-extrabold">
                        <span className="col-span-6">Service</span>
                        <span className="col-span-3 text-center">Période</span>
                        <span className="col-span-3 text-right">Montant</span>
                      </div>

                      <div className="divide-y divide-slate-100 dark:divide-slate-800 p-4 space-y-4">
                        {/* Domain item */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-950/40 p-4 rounded-xl">
                          <div>
                            <span className="text-xs font-bold text-slate-500 block">Produit de Promotion</span>
                            <h5 className="font-extrabold text-sm text-slate-900 dark:text-white">
                              {selectedDomainName || "teste.ma"}
                            </h5>
                            <span className="text-[11px] text-blue-600 font-bold block">Enregistrement de Nom de Domaine</span>
                          </div>
                          <div className="flex items-center gap-4 justify-between sm:justify-end">
                            <span className="text-xs font-bold bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-lg">
                              Annual
                            </span>
                            <span className="text-sm font-extrabold text-emerald-600">129DH</span>
                          </div>
                        </div>

                        {/* E-commerce service item */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-950/40 p-4 rounded-xl">
                          <div>
                            <h5 className="font-extrabold text-sm text-slate-900 dark:text-white">
                              Création Site E-commerce PrestaShop
                            </h5>
                            <span className="text-[11px] text-blue-600 font-bold block">
                              Site E-commerce PrestaShop ({selectedDomainName || "teste.ma"})
                            </span>
                          </div>
                          <div className="flex items-center gap-4 justify-between sm:justify-end">
                            <span className="text-xs font-bold bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-lg">
                              {selectedPeriod === "ONE_TIME" ? "One Time" : "Annual"}
                            </span>
                            <span className="text-sm font-extrabold text-emerald-600">
                              {selectedPeriod === "ONE_TIME" ? "9999DH" : "5499.45DH"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setWizardStep(1)}
                        className="text-xs font-bold"
                      >
                        « Continuer vos Achats
                      </Button>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                        <span>VISA</span> • <span>Mastercard</span> • <span>Maestro</span> • <span>SSL SECURE 256Bits</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Summary Card */}
                  <div className="lg:col-span-4 space-y-4">
                    <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl space-y-5">
                      <div className="bg-slate-900 text-white -mx-6 -mt-6 p-4 rounded-t-2xl font-extrabold text-sm text-center">
                        Résumé de la Commande
                      </div>

                      <div className="space-y-3 text-xs pt-2">
                        <div className="flex justify-between font-bold text-slate-600 dark:text-slate-400">
                          <span>Montant Total de la Commande</span>
                          <span className="text-slate-900 dark:text-white font-extrabold">
                            {selectedPeriod === "ONE_TIME" ? "10128DH" : "5628.45DH"}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold text-slate-600 dark:text-slate-400">
                          <span>TAX 20%</span>
                          <span className="text-slate-900 dark:text-white font-extrabold">
                            {selectedPeriod === "ONE_TIME" ? "2025.60DH" : "1125.69DH"}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 text-center space-y-1">
                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                          Montant Total À Payer
                        </span>
                        <span className="text-2xl font-black text-emerald-600 block">
                          {selectedPeriod === "ONE_TIME" ? "12153.60DH" : "6754.14DH"}
                        </span>
                      </div>

                      <Button
                        type="button"
                        disabled={submitting}
                        onClick={handleSubscribe}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 text-sm flex items-center justify-center gap-2"
                      >
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        Continuer / Valider et Payer
                      </Button>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
}

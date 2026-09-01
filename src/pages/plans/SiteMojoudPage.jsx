import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout.jsx";
import HostingPlanService from "@/services/HostingPlanService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge.jsx";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card.jsx";
import {
  Globe,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Monitor,
  Smartphone,
  Server,
  Mail,
  Edit3,
  Check,
  X,
  Loader2,
  Headphones,
  Sliders,
  Award
} from "lucide-react";

// Asset imports from site moujoud folder
import heroImg from "@/assets/site moujoud/imgi_4_site-mojoud.jpg";
import domainImg from "@/assets/site moujoud/imgi_5_domain (1).jpg";
import hostingImg from "@/assets/site moujoud/imgi_6_hebergement-web.jpg";
import emailImg from "@/assets/site moujoud/imgi_7_email.jpg";
import creationImg from "@/assets/site moujoud/imgi_8_creation-site.jpg";

import step1Icon from "@/assets/site moujoud/imgi_28_one.png";
import step2Icon from "@/assets/site moujoud/imgi_29_two.png";
import step3Icon from "@/assets/site moujoud/imgi_30_three.png";

import showcaseLawyer from "@/assets/site moujoud/imgi_31_Avocate-Elhadeg-hasna.png";
import showcaseRiad from "@/assets/site moujoud/imgi_32_Riad-Asma.png";
import showcaseCargo from "@/assets/site moujoud/imgi_33_JustCargo-.png";

import catAssoc from "@/assets/site moujoud/imgi_34_site-association.jpg";
import catImmo from "@/assets/site moujoud/imgi_35_immobilier.jpg";
import catPort from "@/assets/site moujoud/imgi_36_site-porfolio.png";

import packImg from "@/assets/site moujoud/imgi_37_pack-site-mojoud.png";

// Client models
import mSante from "@/assets/site moujoud/imgi_38_sante.jpg";
import mEscargot from "@/assets/site moujoud/imgi_39_marocescargot.jpg";
import mConst from "@/assets/site moujoud/imgi_40_construction.jpg";
import mElec from "@/assets/site moujoud/imgi_41_electronique.jpg";
import mMetal from "@/assets/site moujoud/imgi_42_metal.jpg";
import mTrans from "@/assets/site moujoud/imgi_43_transports.jpg";
import mFastfood from "@/assets/site moujoud/imgi_44_fastfood.jpg";
import mChild from "@/assets/site moujoud/imgi_45_childreen.jpg";
import mSoccer from "@/assets/site moujoud/imgi_46_soccer.jpg";
import mGems from "@/assets/site moujoud/imgi_47_gems.jpg";
import m3es from "@/assets/site moujoud/imgi_48_3es.jpg";
import mCoop from "@/assets/site moujoud/imgi_49_coopalghanbaz.jpg";

// Template previews
import t1 from "@/assets/site moujoud/imgi_9_fresh_960.jpg";
import t2 from "@/assets/site moujoud/imgi_10_hiking_960.jpg";
import t3 from "@/assets/site moujoud/imgi_11_healthyFood_960.jpg";
import t4 from "@/assets/site moujoud/imgi_12_homedecor_960.jpg";
import t5 from "@/assets/site moujoud/imgi_16_pizzeria_960.jpg";
import t6 from "@/assets/site moujoud/imgi_18_bakery_960.jpg";

export default function SiteMojoudPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [domainName, setDomainName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const plans = [
    {
      id: 201,
      name: "Formule Mojoud 1 An",
      price: 3799.00,
      daily: "10.41 DH / jour",
      features: [
        "Nom de domaine .MA ou .COM Offert 1 an",
        "Hébergement Web NVMe Ultra-Rapide",
        "Constructeur de Site Web Sans Codage",
        "Plus de 200 Modèles Prêts à l'Emploi",
        "Comptes E-mail Professionnels Inclus",
        "Certificat SSL HTTPS Sécurisé",
        "Support Technique Marocain 24/7"
      ]
    },
    {
      id: 202,
      name: "Formule Mojoud 3 Ans (Économique)",
      price: 4500.00,
      daily: "4.10 DH / jour",
      isBest: true,
      features: [
        "Nom de domaine .MA ou .COM Gratuit (3 Ans)",
        "Hébergement Web NVMe Illimité",
        "Constructeur Premium + Fonctionnalités IA",
        "Modèles E-Commerce & Vitrines Illimités",
        "Comptes E-mail Pro Illimités",
        "Certificat SSL HTTPS Haute Protection",
        "Accompagnement & Déploiement VIP"
      ]
    }
  ];

  const handleOrderClick = (plan) => {
    if (!user) {
      toast.info("Veuillez vous connecter pour commander la formule Site Mojoud.");
      navigate("/login");
    } else {
      setSelectedPlan(plan);
      setShowOrderModal(true);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.info("Veuillez vous connecter pour valider votre commande.");
      navigate("/login");
      return;
    }

    if (!domainName.trim()) {
      toast.error("Veuillez saisir un nom de domaine valide.");
      return;
    }

    setSubmitting(true);
    try {
      const plansRes = await HostingPlanService.getHostingPlans().catch(() => ({ data: [] }));
      const pList = Array.isArray(plansRes.data) ? plansRes.data : [];
      const targetName = selectedPlan?.name || "Formule Mojoud 1 An";
      const foundPlan = pList.find(p => p.name && p.name.toLowerCase().includes(targetName.toLowerCase()));

      const isThreeYears = targetName.includes("3 Ans");

      await HostingPlanService.createHostingAccount({
        domainName: domainName.endsWith(".ma") || domainName.endsWith(".com") ? domainName : `${domainName}.ma`,
        hostingPlanId: foundPlan?.id || null,
        hostingPlanName: targetName,
        userId: user?.id ? Number(user.id) : null,
        status: "ACTIVE",
        startDate: new Date().toISOString().split("T")[0],
        expirationDate: isThreeYears
          ? new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
          : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      });
      toast.success("Commande enregistrée avec succès ! Votre pack Site Mojoud est en cours de création.");
      setShowOrderModal(false);
      setDomainName("");
      navigate("/client/accounts");
    } catch (err) {
      console.error(err);
      toast.error("Échec de la souscription. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  const clientModels = [
    { title: "Santé & Cabinet Médical", img: mSante },
    { title: "Construction & BTP", img: mConst },
    { title: "Électronique & High-Tech", img: mElec },
    { title: "Métallurgie & Industrie", img: mMetal },
    { title: "Transport & Logistique", img: mTrans },
    { title: "Fast-Food & Restauration", img: mFastfood },
    { title: "Éducation & Enfance", img: mChild },
    { title: "Club Sportif & Académie", img: mSoccer },
    { title: "Bijouterie & Luxe", img: mGems },
    { title: "Services & Conseils", img: m3es },
    { title: "Coopérative & Terroir", img: mCoop },
    { title: "Élevage & Agroalimentaire", img: mEscargot }
  ];

  return (
    <AppLayout breadcrumbs={[{ label: "Création Web" }, { label: "Site Mojoud" }]}>
      <div className="space-y-16 pb-16">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-8 md:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6 text-left">
              <Badge className="bg-orange-500 text-white border-none px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                ⚡ Site Web Clé en Main
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Votre site web, prêt en 5 minutes !
              </h1>
              <p className="text-blue-100 text-base sm:text-lg max-w-2xl font-medium leading-relaxed">
                Créez vous-même un site web complet sans aucune compétence technique grâce à notre générateur et constructeur intuitif <strong>Site Mojoud</strong>.
              </p>
              
              <ul className="space-y-2 text-sm font-semibold text-blue-50">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange-400" /> Nom de domaine .MA offert 1 an
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange-400" /> Hébergement Web NVMe inclus
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange-400" /> Messagerie professionnelle incluse
                </li>
              </ul>

              <div className="pt-2">
                <Button
                  onClick={() => handleOrderClick(plans[0])}
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-base px-8 py-6 rounded-2xl shadow-xl shadow-orange-500/30 hover:scale-[1.02] transition-all"
                >
                  Créer Mon Site Maintenant <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl max-w-md bg-white">
                <img src={heroImg} alt="Site Mojoud Builder Preview" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* 4 PILLARS INCLUDED */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Pack Tout-en-Un pour Lancer Votre Activité en Ligne
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Tout ce dont vous avez besoin pour exister et vendre sur internet sans frais cachés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <Card className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row gap-6 items-center shadow-md rounded-2xl">
              <img src={domainImg} alt="Nom de Domaine Gratuit" className="w-full md:w-44 h-32 object-cover rounded-xl shrink-0" />
              <div className="space-y-2 text-left">
                <Badge variant="blue" className="bg-blue-100 text-blue-700 font-bold text-[11px]">Étape 1</Badge>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">1- Nom de Domaine Gratuit</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Votre nom de domaine en .MA ou .COM est offert la première année pour donner une image professionnelle à votre entreprise.
                </p>
              </div>
            </Card>

            {/* Pillar 2 */}
            <Card className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row gap-6 items-center shadow-md rounded-2xl">
              <img src={hostingImg} alt="Hébergement Web NVMe" className="w-full md:w-44 h-32 object-cover rounded-xl shrink-0" />
              <div className="space-y-2 text-left">
                <Badge variant="blue" className="bg-emerald-100 text-emerald-700 font-bold text-[11px]">Étape 2</Badge>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">2- Hébergement Web</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Un hébergement rapide et sécurisé au Maroc avec bande passante illimitée et sauvegardes automatiques.
                </p>
              </div>
            </Card>

            {/* Pillar 3 */}
            <Card className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row gap-6 items-center shadow-md rounded-2xl">
              <img src={emailImg} alt="Messagerie Professionnelle" className="w-full md:w-44 h-32 object-cover rounded-xl shrink-0" />
              <div className="space-y-2 text-left">
                <Badge variant="blue" className="bg-purple-100 text-purple-700 font-bold text-[11px]">Étape 3</Badge>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">3- Messagerie Professionnelle</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Créez vos adresses emails personnalisées (ex: contact@votreentreprise.ma) pour inspirer confiance à vos clients.
                </p>
              </div>
            </Card>

            {/* Pillar 4 */}
            <Card className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row gap-6 items-center shadow-md rounded-2xl">
              <img src={creationImg} alt="Constructeur de Site Web" className="w-full md:w-44 h-32 object-cover rounded-xl shrink-0" />
              <div className="space-y-2 text-left">
                <Badge variant="blue" className="bg-amber-100 text-amber-700 font-bold text-[11px]">Étape 4</Badge>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">4- Outil de Création Sans Codage</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Glissez-déposez vos éléments, modifiez les textes et photos facilement sans toucher à la moindre ligne de code.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* TEMPLATES PREVIEW GALLERY */}
        <section className="space-y-6 text-center">
          <div className="space-y-2">
            <Badge className="bg-blue-100 text-blue-700 text-xs font-bold">🎨 Modèles Prêts à l'Emploi</Badge>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Plus de 200 Modèles de Sites Web</h2>
            <p className="text-xs text-slate-500">Sélectionnez le style qui correspond le mieux à votre activité.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[t1, t2, t3, t4, t5, t6].map((imgSrc, idx) => (
              <div key={idx} className="group overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
                <img src={imgSrc} alt={`Template Site Mojoud ${idx + 1}`} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* PRICING PLANS */}
        <section className="max-w-4xl mx-auto space-y-8 text-center pt-4">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Nos Tarifs Site Mojoud</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
              Optez pour la formule adaptée à la durée de votre projet web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative p-8 border-2 ${
                  plan.isBest ? "border-orange-500 shadow-2xl bg-white dark:bg-slate-900" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                } rounded-3xl text-left flex flex-col justify-between`}
              >
                {plan.isBest && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-md">
                    Formule Économique (Recommandée)
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-4xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                      <span className="text-base font-bold text-blue-600">DH</span>
                    </div>
                    <p className="text-xs text-orange-600 font-bold mt-1">{plan.daily}</p>
                  </div>

                  <ul className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Button
                    onClick={() => handleOrderClick(plan)}
                    className={`w-full py-3 rounded-xl font-extrabold ${
                      plan.isBest ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25" : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    Commander Cette Formule
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 3 EASY STEPS */}
        <section className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 space-y-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Créez votre site internet en 3 étapes simples sur Site Mojoud
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <img src={step1Icon} alt="Étape 1" className="h-12 w-12 mx-auto" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">1. Choisissez un modèle</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Sélectionnez parmi des centaines de thèmes conçus par des designers professionnels.</p>
            </div>

            <div className="space-y-4 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <img src={step2Icon} alt="Étape 2" className="h-12 w-12 mx-auto" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">2. Personnalisez votre contenu</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Insérez vos textes, logos, images et vidéos grâce à l'éditeur visuel en glisser-déposer.</p>
            </div>

            <div className="space-y-4 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <img src={step3Icon} alt="Étape 3" className="h-12 w-12 mx-auto" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">3. Publiez en 1 clic</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Mettez votre site en ligne instantanément sous votre nom de domaine personnalisé.</p>
            </div>
          </div>
        </section>

        {/* FEATURED EXAMPLES (LAWYER, RIAD, CARGO) */}
        <section className="space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Réalisations sur Site Mojoud</h2>
            <p className="text-xs text-slate-500">Des sites réels développés avec notre constructeur Site Mojoud.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
              <img src={showcaseLawyer} alt="Cabinet d'Avocat" className="w-full h-48 object-cover" />
              <div className="p-4 text-left">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Cabinet d'Avocat Hasna El Hadeg</h4>
                <p className="text-xs text-slate-500">Site vitrine juridique professionnel</p>
              </div>
            </Card>

            <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
              <img src={showcaseRiad} alt="Riad Asma Marrakech" className="w-full h-48 object-cover" />
              <div className="p-4 text-left">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Riad Asma Marrakech</h4>
                <p className="text-xs text-slate-500">Site d'hébergement touristique & réservation</p>
              </div>
            </Card>

            <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
              <img src={showcaseCargo} alt="Just Cargo Logistique" className="w-full h-48 object-cover" />
              <div className="p-4 text-left">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Just Cargo Logistique</h4>
                <p className="text-xs text-slate-500">Site d'entreprise de transport international</p>
              </div>
            </Card>
          </div>
        </section>

        {/* PROJECTS BY CATEGORY (ASSOCIATION, IMMOBILIER, PORTFOLIO) */}
        <section className="bg-blue-700 text-white rounded-3xl p-8 md:p-12 space-y-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">À chaque projet, son site Mojoud</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 space-y-3 border border-white/20">
              <img src={catAssoc} alt="Site Association" className="w-full h-36 object-cover rounded-xl" />
              <h4 className="font-bold text-base">Site Association</h4>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 space-y-3 border border-white/20">
              <img src={catImmo} alt="Site Immobilier" className="w-full h-36 object-cover rounded-xl" />
              <h4 className="font-bold text-base">Site Immobilier</h4>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 space-y-3 border border-white/20">
              <img src={catPort} alt="Site Portfolio" className="w-full h-36 object-cover rounded-xl" />
              <h4 className="font-bold text-base">Site Portfolio</h4>
            </div>
          </div>
        </section>

        {/* CLIENT MODELS GALLERY */}
        <section className="space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Quelques modèles créés pour nos clients</h2>
            <p className="text-xs text-slate-500">Des secteurs variés pour répondre à toutes les exigences.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {clientModels.map((item, idx) => (
              <div key={idx} className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all">
                <img src={item.img} alt={item.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-3 text-center">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ORDER MODAL */}
      {showOrderModal && selectedPlan && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Souscrire à {selectedPlan.name}</h3>
                <p className="text-xs text-orange-600 font-bold mt-0.5">{selectedPlan.price} DH / an TTC</p>
              </div>
              <button onClick={() => setShowOrderModal(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nom de Domaine Souhaité
                </label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="ex: mon-entreprise.ma"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Votre domaine .MA est offert la première année.</p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button type="button" variant="outline" onClick={() => setShowOrderModal(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={submitting} className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Valider Ma Commande
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

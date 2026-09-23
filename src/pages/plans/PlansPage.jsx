import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout.jsx";
import HostingPlanService from "@/services/HostingPlanService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { Check, Loader2, X, Globe, Zap, Server, ShieldCheck, HardDrive, Cpu } from "lucide-react";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge.jsx";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/Card.jsx";

export default function PlansPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [domainName, setDomainName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fallbackPlans = [
    { id: 1, name: "Starter", price: 199.0, storage: 20, bandwidth: 200, emailAccounts: 5, sslIncluded: true, popular: false, description: "Parfait pour démarrer votre premier site web" },
    { id: 2, name: "Growth", price: 399.0, storage: 50, bandwidth: 500, emailAccounts: 10, sslIncluded: true, popular: true, description: "Formule recommandée pour les blogs et TPE" },
    { id: 3, name: "Business", price: 699.0, storage: 100, bandwidth: 1000, emailAccounts: 15, sslIncluded: true, popular: false, description: "Haute performance pour sites e-commerce" },
    { id: 4, name: "Pro", price: 999.0, storage: 150, bandwidth: 1200, emailAccounts: 20, sslIncluded: true, popular: false, description: "Ressources garanties et puissance maximale" }
  ];

  useEffect(() => {
    HostingPlanService.getHostingPlans()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : fallbackPlans;
        setPlans(data.length > 0 ? data : fallbackPlans);
      })
      .catch(() => setPlans(fallbackPlans))
      .finally(() => setLoading(false));
  }, []);

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
      await HostingPlanService.createHostingAccount({
        domainName: domainName.endsWith(".ma") || domainName.endsWith(".com") ? domainName : `${domainName}.com`,
        hostingPlanId: selectedPlan?.id || 1,
        userId: user?.id ? Number(user.id) : null,
        status: "ACTIVE",
        startDate: new Date().toISOString().split("T")[0],
        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      });
      toast.success("Souscription réussie ! Votre formule d'hébergement est prête.");
      setSelectedPlan(null);
      setDomainName("");
      navigate("/client/accounts");
    } catch (err) {
      console.error(err);
      toast.error("Échec de la souscription. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Offres Hébergement" }]}>
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3 py-4">
        <Badge variant="blue" className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-semibold text-xs">
          ⚡ Hébergement NVMe Haute Performance
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Nos Formules d'Hébergement Web
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Choisissez la formule adaptée à vos besoins. Tous nos plans incluent la sécurité SSL et le support 24/7.
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Chargement des offres d'hébergement...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 items-stretch pt-2 pb-12">
          {plans.map((plan, index) => {
            const isPopular = plan.popular || index === 1;
            const priceDisplay = typeof plan.price === 'number' 
              ? `${plan.price.toFixed(2)} DH` 
              : plan.price || "199.00 DH";

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col justify-between transition-all duration-300 border bg-white dark:bg-slate-900 shadow-md hover:shadow-xl hover:-translate-y-1 ${
                  isPopular 
                    ? "border-blue-500 ring-2 ring-blue-500/20 dark:border-blue-500 shadow-blue-500/10" 
                    : "border-slate-200 dark:border-slate-800 hover:border-blue-400"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-3 py-0.5 text-[11px] uppercase tracking-wider shadow-md">
                      🔥 Le Plus Populaire
                    </Badge>
                  </div>
                )}

                <CardHeader className="pt-7 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                      {plan.name}
                    </CardTitle>
                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                      <Server className="h-5 w-5" />
                    </div>
                  </div>
                  <CardDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">
                    {plan.description || "Infrastructures haut de gamme hébergées au Maroc."}
                  </CardDescription>

                  <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      {priceDisplay}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">/ an</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300 py-2">
                  <div className="flex items-center gap-3">
                    <span className="p-1 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                      <HardDrive className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium">{plan.storage ? `${plan.storage} GB Stockage NVMe` : "Stockage NVMe Dédié"}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="p-1 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                      <Zap className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium">{plan.bandwidth ? `${plan.bandwidth} GB Bande passante/mois` : "Bande Passante Illimitée"}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="p-1 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                      <Cpu className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium">{plan.emailAccounts ? `${plan.emailAccounts} Comptes Email Pro` : "Comptes Emails Dédiés"}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="p-1 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium">Certificat SSL Let's Encrypt Inclus</span>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 pb-6">
                  <Button
                    onClick={() => {
                      if (!user) {
                        toast.info("Veuillez vous connecter pour souscrire à une formule d'hébergement.");
                        navigate("/login");
                      } else {
                        setSelectedPlan(plan);
                      }
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold transition-all ${
                      isPopular
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
                        : "bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900"
                    }`}
                  >
                    Commander Maintenant
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* Subscription Dialog Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Souscrire à la formule {selectedPlan.name}</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-0.5">
                  {typeof selectedPlan.price === 'number' ? `${selectedPlan.price.toFixed(2)} DH / an` : selectedPlan.price}
                </p>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
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
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Vous pourrez associer votre domaine immédiatement après souscription.</p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button type="button" variant="outline" onClick={() => setSelectedPlan(null)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Valider la Commande
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

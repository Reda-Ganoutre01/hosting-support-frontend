import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout.jsx";
import HostingPlanService from "@/services/HostingPlanService.js";
import { useToast } from "@/context/ToastContext.jsx";
import { Check, Loader2, X, Globe } from "lucide-react";
import Button from "@/components/ui/button";

export default function PlansPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [domainName, setDomainName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fallbackPlans = [
    { id: 1, name: "Starter Cloud", price: "29 DH/mois", disk: "10 GB NVMe", ram: "1 GB RAM", sites: "1 Site Web", popular: false },
    { id: 2, name: "Pro Web Performance", price: "69 DH/mois", disk: "50 GB NVMe", ram: "4 GB RAM", sites: "Sites Illimités", popular: true },
    { id: 3, name: "Business & VPS Cloud", price: "149 DH/mois", disk: "150 GB NVMe", ram: "8 GB RAM", sites: "Ressources Dédiées", popular: false },
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
    if (!domainName.trim()) {
      toast.error("Veuillez saisir un nom de domaine valide.");
      return;
    }

    setSubmitting(true);
    try {
      await HostingPlanService.createHostingAccount({
        domainName: domainName.endsWith(".ma") || domainName.endsWith(".com") ? domainName : `${domainName}.com`,
        hostingPlanId: selectedPlan?.id || 1,
        status: "ACTIVE",
        startDate: new Date().toISOString().split("T")[0],
        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      });
      toast.success("Souscription réussie! Votre compte d'hébergement est prêt.");
      setSelectedPlan(null);
      setDomainName("");
      navigate("/accounts");
    } catch (err) {
      console.error(err);
      toast.error("Échec de la souscription. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Offres Hébergement" }]}>
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Nos Offres d'Hébergement Web</h1>
        <p className="text-slate-400 text-sm sm:text-base">Choisissez la formule adaptée à vos besoins et lancez vos projets en ligne.</p>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm">Chargement des offres...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl bg-slate-900 border p-8 flex flex-col justify-between transition-all duration-300 ${plan.popular ? "border-blue-500 shadow-2xl shadow-blue-500/20 scale-105" : "border-slate-800 hover:border-slate-700"}`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-extrabold bg-blue-600 text-white uppercase tracking-wider shadow-md">
                  Le Plus Populaire
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price || "59 DH"}</span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-slate-300 border-t border-slate-800 pt-6">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{plan.disk || "50 GB Stockage NVMe"}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{plan.ram || "4 GB RAM Dédiée"}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{plan.sites || "Sites Web Illimités"}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Certificat SSL SSL Inclus</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => setSelectedPlan(plan)}
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full py-3"
                >
                  Commander Maintenant
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Souscrire à {selectedPlan.name}</h3>
                <p className="text-xs text-blue-400 font-semibold">{selectedPlan.price}</p>
              </div>
              <button onClick={() => setSelectedPlan(null)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nom de Domaine</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="mon-site-web.com"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setSelectedPlan(null)}>Annuler</Button>
                <Button type="submit" disabled={submitting}>
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

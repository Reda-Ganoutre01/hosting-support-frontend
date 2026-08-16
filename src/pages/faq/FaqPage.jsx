import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import { useToast } from "@/context/ToastContext.jsx";
import { Search, ChevronDown, ThumbsUp } from "lucide-react";
import Button from "@/components/ui/button";

export default function FaqPage() {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [openId, setOpenId] = useState(null);
  const [helpfulCounts, setHelpfulCounts] = useState({});

  const faqs = [
    { id: 1, category: "HOSTING", question: "Comment migrer mon site web vers Vala Hosting ?", answer: "Nos équipes d'experts s'occupent gratuitement de la migration intégrale de votre site sans aucune interruption de service. Il vous suffit d'ouvrir un ticket support." },
    { id: 2, category: "VPS", question: "Comment accéder à mon serveur VPS n8n ?", answer: "Après la livraison de votre VPS, vos identifiants SSH et le lien de l'interface web n8n vous sont automatiquement transmis dans vos informations de compte." },
    { id: 3, category: "SECURITY", question: "Le certificat SSL est-il gratuit ?", answer: "Oui, un certificat SSL Let's Encrypt gratuit et auto-renouvelable est inclus avec tous nos plans d'hébergement web et VPS." },
    { id: 4, category: "BILLING", question: "Quels sont les modes de paiement acceptés ?", answer: "Nous acceptons les cartes bancaires marocaines et internationales (Visa, Mastercard), les virements bancaires ainsi que le paiement à la livraison." },
  ];

  const handleToggleHelpful = (id) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    toast.success("Merci pour votre retour!");
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch = f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "ALL" || f.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <AppLayout breadcrumbs={[{ label: "FAQ & Centre d'aide" }]}>
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Centre d'aide & FAQ</h1>
        <p className="text-slate-400 text-sm sm:text-base">Trouvez rapidement des réponses à toutes vos questions techniques et administratives.</p>

        <div className="relative max-w-xl mx-auto pt-2">
          <Search className="absolute left-4 top-5 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une question ou un mot clé..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-xl"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 pt-4">
        {["ALL", "HOSTING", "VPS", "SECURITY", "BILLING"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${category === cat ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"}`}
          >
            {cat === "ALL" && "Toutes"}
            {cat === "HOSTING" && "Hébergement Web"}
            {cat === "VPS" && "Serveur VPS"}
            {cat === "SECURITY" && "Sécurité & SSL"}
            {cat === "BILLING" && "Facturation"}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto space-y-4 pt-4">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all">
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-base hover:bg-slate-800/40 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-blue-400" : ""}`} />
              </button>

              {isOpen && (
                <div className="p-5 pt-0 border-t border-slate-800/60 text-sm text-slate-300 space-y-4 leading-relaxed bg-slate-950/40">
                  <p className="pt-3">{faq.answer}</p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/40">
                    <span className="text-slate-500">Cette réponse vous a-t-elle aidé ?</span>
                    <Button size="sm" variant="outline" onClick={() => handleToggleHelpful(faq.id)} className="flex items-center gap-1.5 text-xs">
                      <ThumbsUp className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Utile ({helpfulCounts[faq.id] || 0})</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}

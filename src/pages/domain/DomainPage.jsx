import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar.jsx";
import { Footer } from "@/components/layout/Footer.jsx";
import { useToast } from "@/context/ToastContext.jsx";
import {
  Search,
  ShieldCheck,
  Globe,
  Lock,
  Headphones,
  Zap,
  ChevronDown,
  ArrowRight,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Star,
  Server,
  Check,
} from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card.jsx";
import Input from "@/components/ui/Input.jsx";

export default function DomainPage() {
  const toast = useToast();
  const [searchDomain, setSearchDomain] = useState("");
  const [selectedTld, setSelectedTld] = useState(".ma");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [openFaqId, setOpenFaqId] = useState(1);

  const popularTlds = [
    { tld: ".ma", price: "125 DH", oldPrice: "150 DH", popular: true, description: "Extension officielle du Maroc pour un positionnement local." },
    { tld: ".com", price: "110 DH", oldPrice: "135 DH", popular: true, description: "Le choix idéal pour une présence digitale internationale." },
    { tld: ".net", price: "140 DH", oldPrice: "165 DH", popular: false, description: "Idéal pour les réseaux, startups et solutions tech." },
    { tld: ".org", price: "145 DH", oldPrice: "170 DH", popular: false, description: "Parfait pour les associations, ONG et institutions." },
    { tld: ".shop", price: "49 DH", oldPrice: "290 DH", popular: true, description: "Pour booster votre boutique en ligne et vos ventes." },
    { tld: ".co.ma", price: "99 DH", oldPrice: "120 DH", popular: false, description: "Une extension locale crédible pour les entreprises." },
  ];

  const domainTable = [
    { tld: ".ma", period: "1 An", register: "125 DH", renew: "125 DH", transfer: "125 DH", restore: "300 DH" },
    { tld: ".com", period: "1 An", register: "110 DH", renew: "120 DH", transfer: "110 DH", restore: "450 DH" },
    { tld: ".net", period: "1 An", register: "140 DH", renew: "150 DH", transfer: "140 DH", restore: "480 DH" },
    { tld: ".org", period: "1 An", register: "145 DH", renew: "155 DH", transfer: "145 DH", restore: "500 DH" },
    { tld: ".co.ma", period: "1 An", register: "99 DH", renew: "110 DH", transfer: "99 DH", restore: "300 DH" },
    { tld: ".info", period: "1 An", register: "79 DH", renew: "140 DH", transfer: "79 DH", restore: "400 DH" },
    { tld: ".biz", period: "1 An", register: "89 DH", renew: "160 DH", transfer: "89 DH", restore: "420 DH" },
    { tld: ".store", period: "1 An", register: "39 DH", renew: "250 DH", transfer: "39 DH", restore: "550 DH" },
  ];

  const faqs = [
    { id: 1, question: "Comment enregistrer un nom de domaine en .MA ?", answer: "Saisissez votre nom de domaine dans la barre de recherche, vérifiez sa disponibilité, puis confirmez votre commande. Vala Hosting est un prestataire accrédité ANRT." },
    { id: 2, question: "Combien de temps prend l'activation de mon domaine ?", answer: "L'activation est généralement instantanée après validation du paiement et configuration du DNS." },
    { id: 3, question: "Puis-je transférer mon domaine existant vers Vala ?", answer: "Oui. Vous aurez besoin du code d'autorisation (EPP/Auth-Code) fourni par votre registrar actuel pour lancer le transfert." },
    { id: 4, question: "Le certificat SSL et le masque WHOIS sont-ils inclus ?", answer: "Oui. Votre domaine inclut en standard un certificat SSL Let's Encrypt et la protection WHOIS pour plus de confidentialité." },
  ];

  // Handle auto search from URL parameter (e.g. /domain?q=myname)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    if (query) {
      setSearchDomain(query);
      triggerDomainSearch(query, selectedTld);
    }
  }, []);

  const triggerDomainSearch = (query, tld) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchResult(null);

    setTimeout(() => {
      setIsSearching(false);
      const cleanName = query.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "");
      const fullDomain = cleanName.includes(".") ? cleanName : `${cleanName}${tld}`;
      const isAvailable = !cleanName.includes("google") && !cleanName.includes("facebook");

      setSearchResult({
        domain: fullDomain,
        available: isAvailable,
        price: tld === ".ma" ? "125 DH" : "110 DH",
      });

      if (isAvailable) {
        toast.success(`Le domaine ${fullDomain} est disponible !`);
      } else {
        toast.error(`Le domaine ${fullDomain} est déjà réservé.`);
      }
    }, 700);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    triggerDomainSearch(searchDomain, selectedTld);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar isScrolled={true} />

      <main className="pb-16">
        <section className="bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_35%)] border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-8 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                Accréditation ANRT & ICANN
              </span>
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    Trouvez le nom de domaine parfait
                  </h1>
                  <p className="max-w-xl text-base text-slate-600 sm:text-lg">
                    Enregistrez un domaine .ma, .com ou .net en quelques clics avec un service simple, rapide et professionnel.
                  </p>
                </div>

                <form onSubmit={handleSearch} className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm ring-1 ring-slate-100">
                  <div className="flex flex-col gap-2 md:flex-row">
                    <div className="relative flex-1">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        type="text"
                        value={searchDomain}
                        onChange={(e) => setSearchDomain(e.target.value)}
                        placeholder="Ex: monentreprise"
                        className="h-12 border-0 bg-slate-50 pl-10 text-sm text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-0"
                      />
                    </div>

                    <div className="relative md:w-32">
                      <select
                        value={selectedTld}
                        onChange={(e) => setSelectedTld(e.target.value)}
                        className="h-12 w-full appearance-none rounded-md border border-slate-200 bg-slate-50 px-3 pr-8 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value=".ma">.ma</option>
                        <option value=".com">.com</option>
                        <option value=".net">.net</option>
                        <option value=".org">.org</option>
                        <option value=".shop">.shop</option>
                        <option value=".co.ma">.co.ma</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <Button type="submit" disabled={isSearching} className="h-12 rounded-md bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                      {isSearching ? "Recherche..." : "Vérifier"}
                    </Button>
                  </div>
                </form>

                {searchResult && (
                  <div className={`flex items-center justify-between gap-4 rounded-xl border p-3 ${searchResult.available ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
                    <div className="flex items-center gap-2 font-medium">
                      {searchResult.available ? <CheckCircle2 className="h-5 w-5" /> : <HelpCircle className="h-5 w-5" />}
                      <span>
                        {searchResult.domain} est {searchResult.available ? "disponible" : "déjà réservé"}
                      </span>
                    </div>
                    {searchResult.available && (
                      <Link to="/login">
                        <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">
                          Réserver {searchResult.price}
                        </Button>
                      </Link>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                  {[
                    ".MA 125 DH",
                    ".COM 110 DH",
                    ".NET 140 DH",
                    ".ORG 145 DH",
                  ].map((item) => (
                    <span key={item} className="rounded-full border border-slate-200 bg-white px-2.5 py-1.5 font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <Server className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">Offre de lancement</CardTitle>
                  <CardDescription className="text-slate-600">Une solution clé en main pour sécuriser et gérer votre présence en ligne.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-slate-900">125 DH</span>
                      <span className="pb-1 text-sm text-slate-500">/an</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">Domaine .ma inclus, SSL + protection DNS</p>
                  </div>

                  <ul className="space-y-3 text-sm text-slate-700">
                    {["SSL gratuit", "Protection WHOIS", "DNS manager", "Support 24/7"].map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link to="/login">
                    <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">
                      Commander maintenant
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Extensions populaires</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Choisissez l’extension qui correspond à votre marque</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {popularTlds.map((item) => (
              <Card key={item.tld} className={`border ${item.popular ? "border-blue-200 bg-blue-50/40" : "border-slate-200 bg-white"}`}>
                <CardContent className="p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-3xl font-bold tracking-tight text-slate-900">{item.tld}</span>
                    {item.popular && (
                      <span className="rounded-full bg-blue-600 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                        Populaire
                      </span>
                    )}
                  </div>

                  <p className="mb-5 min-h-12 text-sm leading-6 text-slate-600">{item.description}</p>

                  <div className="mb-5 flex items-end gap-2">
                    <span className="text-3xl font-bold text-slate-900">{item.price}</span>
                    <span className="pb-1 text-xs text-slate-400 line-through">{item.oldPrice}</span>
                  </div>

                  <div className="flex gap-2">
                    <Link to="/login" className="flex-1">
                      <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Réserver</Button>
                    </Link>
                    <Link to="/login" className="flex-1">
                      <Button variant="outline" className="w-full border-slate-200 bg-white hover:bg-slate-50">
                        Transférer
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 py-12 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Pourquoi nous choisir ?</p>
              <h2 className="text-3xl font-bold tracking-tight">Un service fiable pour votre présence digitale</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                { icon: Globe, title: "Gestion DNS", text: "Configurez facilement vos points d'entrée web et email." },
                { icon: ShieldCheck, title: "Sécurité", text: "SSL gratuit, protection WHOIS et verrouillage du domaine." },
                { icon: Lock, title: "Contrôle total", text: "Gérez vos transferts et renouvellements avec transparence." },
                { icon: Headphones, title: "Support dédié", text: "Une équipe à l’écoute pour une assistance rapide." },
              ].map(({ icon: Icon, title, text }) => (
                <Card key={title} className="border-slate-800 bg-slate-950/50 text-white shadow-none">
                  <CardContent className="p-5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                    <p className="text-sm leading-6 text-slate-300">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Tarifs</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Comparez les extensions</h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Extension</th>
                    <th className="px-5 py-4 font-semibold">Période</th>
                    <th className="px-5 py-4 font-semibold">Enregistrement</th>
                    <th className="px-5 py-4 font-semibold">Renouvellement</th>
                    <th className="px-5 py-4 font-semibold">Transfert</th>
                    <th className="px-5 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {domainTable.map((row) => (
                    <tr key={row.tld} className="hover:bg-slate-50/60">
                      <td className="px-5 py-4 font-bold text-slate-900">{row.tld}</td>
                      <td className="px-5 py-4">{row.period}</td>
                      <td className="px-5 py-4 font-semibold text-emerald-600">{row.register}</td>
                      <td className="px-5 py-4">{row.renew}</td>
                      <td className="px-5 py-4">{row.transfer}</td>
                      <td className="px-5 py-4 text-right">
                        <Link to="/login">
                          <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                            Commander
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">FAQ</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Questions fréquentes</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-slate-800 hover:bg-slate-50"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Offre spéciale</p>
                <h3 className="text-2xl font-bold text-slate-900">Profitez d’une réduction sur les domaines .MA et .COM</h3>
              </div>

              <Link to="/login">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  En profiter maintenant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

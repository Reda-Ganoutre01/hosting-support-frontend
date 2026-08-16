import React from "react";
import { ArrowRight, Server, HardDrive, Mail, ShoppingBag, Cloud, Users } from "lucide-react";

export default function HostingPlansSection() {
  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center rounded-md bg-white border border-[#E2E8F0] px-3.5 py-1 text-xs font-semibold text-[#475569] shadow-2xs">
            Hébergement Web Fiable Au Maroc
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Choisissez un plan pour héberger votre site
          </h2>
          <p className="text-[#475569] text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Choisissez le plan d'hébergement web au Maroc qui vous convient pour booster vos projets en ligne. Nous veillons à fournir un service fiable.
          </p>
        </div>

        {/* Row 1: 3 Cards (Hero Blue Card + VPS Maroc + Serveurs Dédiés) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Featured Blue Hero Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0052D4] via-[#4364F7] to-[#6FB1FC] p-7 text-white shadow-xl flex flex-col justify-between group min-h-[320px]">
            {/* Background Light Pattern */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 space-y-4">
              <span className="inline-block rounded-md bg-white/15 border border-white/25 px-3 py-1 text-xs font-medium text-white backdrop-blur-xs">
                Hébergement Web
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-white leading-snug">
                Hébergement Mutualisé Puissant Pour Des Sites Web Plus Rapides Et Performants !
              </h3>
            </div>

            {/* Cloud & Server Graphic */}
            <div className="relative z-10 mt-6 flex items-end justify-between">
              <button 
                type="button" 
                className="rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 text-sm font-semibold shadow-md border border-white/20 transition-all active:scale-95 cursor-pointer"
              >
                Commander
              </button>

              {/* Server/Cloud Graphic Illustration */}
              <div className="relative w-28 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-white/10 rounded-xl blur-xs" />
                <div className="relative flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md">
                  <Server className="w-10 h-10 text-white" />
                  <Cloud className="w-8 h-8 text-blue-100 absolute -top-2 -right-2 drop-shadow-md" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Serveurs VPS Maroc */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] p-7 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100/80 flex items-center justify-center text-cyan-600 group-hover:scale-105 transition-transform">
                <Server className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">
                Serveurs VPS Maroc
              </h3>
              <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                Que vous soyez un établissement public à la recherche d'une solution locale ou un particulier ayant besoin de ressources dédiées, nos VPS s'adaptent à tous vos besoins avec fiabilité et performance.
              </p>
            </div>

            <div className="pt-6 flex justify-end">
              <button 
                type="button"
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Serveurs Dédiés */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] p-7 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                <HardDrive className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">
                Serveurs Dédiés
              </h3>
              <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                Découvrez nos serveurs dédiés haut de gamme et personnalisez les fonctions selon vos besoins en termes CPU, mémoire RAM, disques SSD et distributions.
              </p>
            </div>

            <div className="pt-6 flex justify-end">
              <button 
                type="button"
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Row 2: 4 Bottom Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 4: Messagerie Professionnelle */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100/80 flex items-center justify-center text-sky-500 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">
                Messagerie Professionnelle
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Valorisez l'image de marque en optant pour un email professionnel ultra sécurisé. Meilleures options s'offrent à vous : Antivirus, antispam, rapidité, synchronisation.
              </p>
            </div>

            <div className="pt-5 flex justify-end">
              <button 
                type="button"
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 5: Boutiques E-Commerce */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-500 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">
                Boutiques E-Commerce
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Développez vos chiffres d'affaires et augmentez vos ventes grâce à nos créations de sites e-commerce ultra optimisées et payez le pack en une seule fois.
              </p>
            </div>

            <div className="pt-5 flex justify-end">
              <button 
                type="button"
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 6: VPS Cloud Pro */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-500 group-hover:scale-105 transition-transform">
                <Cloud className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">
                VPS Cloud Pro
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Profitez d'un VPS rapide et performant basé sur le cloud NVMe spécialement conçu pour satisfaire les exigences des projets les plus complexes.
              </p>
            </div>

            <div className="pt-5 flex justify-end">
              <button 
                type="button"
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 7: Hébergement Revendeurs */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100/80 flex items-center justify-center text-teal-500 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">
                Hébergement Revendeurs
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Démarrez votre activité en ligne dès aujourd'hui et profitez de nos offres avantageuses pour revendeurs d'hébergement web au Maroc, idéales pour créer une source de revenus durable et rentable.
              </p>
            </div>

            <div className="pt-5 flex justify-end">
              <button 
                type="button"
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

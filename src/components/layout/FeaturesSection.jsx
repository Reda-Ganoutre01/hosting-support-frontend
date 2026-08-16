import React from "react";
import { Zap, ShieldCheck, Box, Headphones } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Pourquoi choisir nos solutions d'Hébergement &amp; VPS ?
          </h2>
          <p className="text-[#475569] text-base md:text-lg max-w-2xl mx-auto font-normal">
            Des infrastructures cloud ultra-rapides et sécurisées pour propulser vos projets web et automatisations.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Performance NVMe */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 mb-5 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                Performance NVMe
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Processeurs dernière génération et stockage NVMe pour une réactivité instantanée.
              </p>
            </div>
          </div>

          {/* Card 2: Sécurité Maximale */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                Sécurité Maximale
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Protection Anti-DDoS, SSL inclus et pare-feu d'entreprise configuré.
              </p>
            </div>
          </div>

          {/* Card 3: Installeur 1-Clic */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 mb-5 group-hover:scale-105 transition-transform">
                <Box className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                Installeur 1-Clic
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Déployez n8n, WordPress, Prestashop ou WooCommerce en un simple clic.
              </p>
            </div>
          </div>

          {/* Card 4: Support 24/7 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 mb-5 group-hover:scale-105 transition-transform">
                <Headphones className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                Support 24/7
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Une équipe d'experts francophones à vos côtés pour vous assister à tout moment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

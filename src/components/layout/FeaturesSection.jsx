import React from "react";
import { Zap, ShieldCheck, Server, Headphones } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card.jsx";

export default function FeaturesSection() {
  return (
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
  );
}

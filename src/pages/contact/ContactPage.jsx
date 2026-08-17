import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar.jsx";
import { Footer } from "@/components/layout/Footer.jsx";
import Button from "@/components/ui/Button.jsx";
import Input from "@/components/ui/Input.jsx";
import { useToast } from "@/context/ToastContext.jsx";
import { MessageSquare, Rss, PhoneCall, Send, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
    cguAccepted: false,
    cndpAccepted: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cguAccepted || !formData.cndpAccepted) {
      toast.error("Veuillez accepter les conditions et le traitement de vos données.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Votre message a été envoyé avec succès! Notre équipe vous répondra très rapidement.");
      setFormData({
        nom: "",
        email: "",
        objet: "",
        message: "",
        cguAccepted: false,
        cndpAccepted: false,
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        <Navbar isScrolled={true} />

        {/* Hero Banner */}
        <section className="bg-blue-600 text-white py-16 text-center shadow-lg">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Contactez-nous</h1>
          </div>
        </section>

        {/* 3 Top Support Cards */}
        <section className="container mx-auto px-4 -mt-10 mb-16 relative z-10 2xl:max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Support Par Ticket */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl flex flex-col justify-between items-center text-center relative overflow-hidden group hover:border-blue-500 transition-all">
              <div className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
                  <MessageSquare className="h-7 w-7" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm tracking-wider uppercase">SUPPORT PAR TICKET</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Vous pouvez ouvrir un ticket vers notre assistance technique depuis votre espace client, afin d'assurer un meilleur suivi et un traitement optimal à vos demandes spécifiques.
                </p>
              </div>
              <div className="pt-6 w-full">
                <Link to="/tickets">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md">
                    Créer un ticket
                  </Button>
                </Link>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-tl-xl" />
            </div>

            {/* Card 2: Guide d'aide en ligne */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl flex flex-col justify-between items-center text-center relative overflow-hidden group hover:border-blue-500 transition-all">
              <div className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
                  <Rss className="h-7 w-7" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm tracking-wider uppercase">GUIDE D'AIDE EN LIGNE</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Obtenez toutes les réponses aux questions qui vous préoccupent en consultant nos FAQ, une multitude de tutoriels et des vidéos explicatives. Chez nous, de nombreuses solutions existent !
                </p>
              </div>
              <div className="pt-6 w-full">
                <Link to="/faq">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md">
                    Visiter la base de connaissance
                  </Button>
                </Link>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-tl-xl" />
            </div>

            {/* Card 3: Solutions Plus Efficaces */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl flex flex-col justify-between items-center text-center relative overflow-hidden group hover:border-blue-500 transition-all">
              <div className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
                  <PhoneCall className="h-7 w-7" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm tracking-wider uppercase">SOLUTIONS PLUS EFFICACES</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Vous n'avez pas envie d'attendre quelqu'un au téléphone. C'est pourquoi nous pensons que le chat en direct et les tickets peuvent aider à résoudre vos problèmes rapidement et efficacement.
                </p>
              </div>
              <div className="pt-6 w-full">
                <a href="tel:+212528000000">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md">
                    Nous appeler
                  </Button>
                </a>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-tl-xl" />
            </div>
          </div>
        </section>

        {/* Section Contact Form + Map */}
        <section className="container mx-auto px-4 py-10 2xl:max-w-[1400px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Contactez-nous <span className="text-slate-500 font-normal">Nous attendons vos questions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Nom</label>
                <Input
                  type="text"
                  required
                  placeholder="Votre nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="bg-slate-50 border-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Email</label>
                <Input
                  type="email"
                  required
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-slate-50 border-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Objet</label>
                <Input
                  type="text"
                  required
                  placeholder="Sujet de votre message"
                  value={formData.objet}
                  onChange={(e) => setFormData({ ...formData, objet: e.target.value })}
                  className="bg-slate-50 border-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Votre message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-600">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.cguAccepted}
                    onChange={(e) => setFormData({ ...formData, cguAccepted: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    J'ai lu et j'accepte les <a href="#" className="text-blue-600 hover:underline">les Conditions Générales d'Utilisation</a>
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.cndpAccepted}
                    onChange={(e) => setFormData({ ...formData, cndpAccepted: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition au traitement de vos données personnelles. <a href="#" className="text-blue-600 hover:underline">En savoir plus</a>. Ce traitement a été autorisé par la CNDP au titre de l'autorisation n° D-GC-298/2022.
                  </span>
                </label>
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-500/20">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                  Envoyer
                </Button>
              </div>
            </form>

            {/* Google Map iframe */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm h-[520px] overflow-hidden">
              <iframe
                title="Vala Bleu Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.442654316082!2d-9.598144623725835!3d30.423528974735508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b6fcf0113c2f%3A0xbbf5d4ff3c3c72b2!2sAgadir!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "1rem" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

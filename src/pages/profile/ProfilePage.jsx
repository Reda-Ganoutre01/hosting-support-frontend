import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext.jsx";
import { useToast } from "@/context/ToastContext.jsx";
import Navbar from "@/components/layout/Navbar.jsx";
import { Footer } from "@/components/layout/Footer.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar.jsx";
import Button from "@/components/ui/Button.jsx";
import { Card, CardContent } from "@/components/ui/Card.jsx";
import { Badge } from "@/components/ui/Badge.jsx";
import Input from "@/components/ui/Input.jsx";
import { Edit, Mail, Settings, Star, Users, Ticket, Check, ShieldCheck, UserCheck } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || user?.username || "Jean Dupont",
    email: user?.email || "jean.dupont@example.com",
    role: user?.role || "USER",
    phone: user?.phone || "+212 6 12 34 56 78",
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success("Profil mis à jour avec succès !");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        <Navbar isScrolled={true} />

        <main className="container mx-auto px-4 py-10 md:px-6 2xl:max-w-[1400px]">
          <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Mon Profil</h1>
              <p className="text-sm text-slate-500">Gérez vos informations personnelles et préférences de compte</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <Edit className="mr-2 h-4 w-4" />
                {isEditing ? "Annuler" : "Modifier le profil"}
              </Button>
              <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card className="p-0 border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20 ring-4 ring-blue-50 shadow-md">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                        alt={formData.name}
                      />
                      <AvatarFallback className="bg-blue-600 text-white font-bold text-xl">
                        {getInitials(formData.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h2 className="mt-4 text-lg font-bold text-slate-900">{formData.name}</h2>
                    <p className="text-slate-500 text-sm">{formData.email}</p>
                    
                    <Badge className="mt-2 bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 font-semibold px-3 py-1">
                      {formData.role === "ADMIN" || formData.role === "ROLE_ADMIN" ? "Administrateur" : "Membre VIP"}
                    </Badge>

                    <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Support Client
                    </Button>
                  </div>

                  <div className="mt-6 space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Membre depuis</span>
                      <span className="font-medium text-slate-800">Jan 2024</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Dernière activité</span>
                      <span className="font-medium text-emerald-600">En ligne</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Rôle</span>
                      <span className="font-medium text-slate-800 uppercase">{formData.role}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="space-y-6 md:col-span-3">
              
              {/* Stats Cards */}
              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="p-0 border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-50 text-blue-600 rounded-xl p-3">
                        <Ticket className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-900">12</p>
                        <p className="text-slate-500 text-sm">Tickets Traités</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-0 border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-50 text-emerald-600 rounded-xl p-3">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-900">4</p>
                        <p className="text-slate-500 text-sm">Hébergements Actifs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-0 border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-amber-50 text-amber-600 rounded-xl p-3">
                        <Star className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-900">99%</p>
                        <p className="text-slate-500 text-sm">Taux d'Uptime</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Edit Form or Information Card */}
              <Card className="p-0 border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-bold text-slate-900">Informations Personnelles</h3>

                  {isEditing ? (
                    <form onSubmit={handleSave} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-slate-700 mb-1 block">Nom Complet</label>
                          <Input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 mb-1 block">Adresse Email</label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-slate-700 mb-1 block">Téléphone</label>
                          <Input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 mb-1 block">Rôle de compte</label>
                          <Input
                            type="text"
                            value={formData.role}
                            disabled
                            className="bg-slate-100 text-slate-500 cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className="border-slate-200"
                        >
                          Annuler
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                          <Check className="mr-2 h-4 w-4" /> Enregistrer
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      {[
                        { title: "Mise à jour du serveur DNS", desc: "Configuration domaine .MA effectuée avec succès", date: "Il y a 2 heures" },
                        { title: "Renouvellement SSL Auto", desc: "Certificat Let's Encrypt renouvelé pour 12 mois", date: "Hier" },
                        { title: "Ticket #4023 résolu", desc: "Support technique Vala a clôturé la demande", date: "Il y a 3 jours" }
                      ].map((act, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                        >
                          <div className="bg-blue-50 text-blue-600 rounded-full p-2.5 shrink-0">
                            <UserCheck className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{act.title}</p>
                            <p className="text-xs text-slate-500">{act.desc}</p>
                            <p className="text-[11px] text-slate-400 mt-1">{act.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

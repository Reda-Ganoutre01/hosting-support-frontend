import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import { useToast } from "@/context/ToastContext.jsx";
import { Ticket, Server, Info } from "lucide-react";
import Button from "@/components/ui/button";

export default function NotificationsPage() {
  const toast = useToast();
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Nouveau message sur Ticket #104", description: "L'équipe support a répondu à votre demande concernant le VPS n8n.", read: false, date: "Il y a 10 min", icon: Ticket, color: "text-blue-400" },
    { id: 2, title: "Hébergement renouvelé", description: "Votre hébergement valahosting.com a été renouvelé avec succès.", read: false, date: "Il y a 2 heures", icon: Server, color: "text-emerald-400" },
    { id: 3, title: "Maintenance planifiée", description: "Une mise à jour système aura lieu ce dimanche entre 02h00 et 04h00.", read: true, date: "Hier", icon: Info, color: "text-amber-400" },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    toast.success("Notification marquée comme lue.");
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("Toutes les notifications sont marquées comme lues.");
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Notifications" }]}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Centre de Notifications</h1>
          <p className="text-slate-400 text-sm mt-1">Restez informé de vos tickets, alertes et serveurs.</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
          Tout marquer comme lu
        </Button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800 shadow-xl">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className={`p-5 flex items-start justify-between gap-4 transition-colors ${!n.read ? "bg-blue-950/20" : "hover:bg-slate-800/30"}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-xl bg-slate-850 border border-slate-800 shrink-0 ${n.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm">{n.title}</h3>
                    {!n.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{n.description}</p>
                  <p className="text-[11px] text-slate-500">{n.date}</p>
                </div>
              </div>

              {!n.read && (
                <Button size="sm" variant="ghost" onClick={() => handleMarkAsRead(n.id)} className="text-xs text-blue-400">
                  Marquer comme lu
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}

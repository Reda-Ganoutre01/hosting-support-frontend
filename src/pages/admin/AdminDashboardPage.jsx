import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import { ChartAreaInteractive } from "./components/chart-area-interactive";
import { DataTable } from "./components/data-table";
import { SectionCards } from "./components/section-cards";
import HostingPlanService from "@/services/HostingPlanService.js";
import TicketService from "@/services/TicketService.js";
import AdminService from "@/services/AdminService.js";
import { Loader2 } from "lucide-react";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeAccountsCount: 0,
    totalAccountsCount: 0,
    openTicketsCount: 0,
    totalTicketsCount: 0,
    usersCount: 0,
    revenueEst: 0,
  });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [accRes, tickRes, usersRes, plansRes] = await Promise.allSettled([
          HostingPlanService.getHostingAccounts(),
          TicketService.getTickets(),
          AdminService.getUsers(),
          HostingPlanService.getHostingPlans(),
        ]);

        const accounts = accRes.status === "fulfilled" && Array.isArray(accRes.value?.data) ? accRes.value.data : [];
        const tickets = tickRes.status === "fulfilled" && Array.isArray(tickRes.value?.data) ? tickRes.value.data : [];
        
        let users = [];
        if (usersRes.status === "fulfilled") {
          users = Array.isArray(usersRes.value?.data)
            ? usersRes.value.data
            : usersRes.value?.data?.content && Array.isArray(usersRes.value.data.content)
            ? usersRes.value.data.content
            : [];
        }

        const plans = plansRes.status === "fulfilled" && Array.isArray(plansRes.value?.data) ? plansRes.value.data : [];
        const plansMap = {};
        plans.forEach((p) => { plansMap[p.id] = p.price || 400; });

        const activeAcc = accounts.filter((a) => a.status === "ACTIVE");
        const openTick = tickets.filter((t) => t.status === "OPEN" || t.status === "OUVERT" || t.status === "IN_PROGRESS");

        let revenueEst = 0;
        accounts.forEach((a) => {
          if (a.status === "ACTIVE") {
            revenueEst += plansMap[a.hostingPlanId] || 499;
          }
        });

        setStats({
          activeAccountsCount: activeAcc.length,
          totalAccountsCount: accounts.length,
          openTicketsCount: openTick.length,
          totalTicketsCount: tickets.length,
          usersCount: users.length,
          revenueEst,
        });

        const formattedAccounts = accounts.map((acc) => ({
          id: `ACC-${acc.id}`,
          header: acc.domainName || `Domaine #${acc.id}`,
          type: acc.hostingPlanName || "Hébergement Cloud",
          status: acc.status === "ACTIVE" ? "Done" : acc.status === "SUSPENDED" ? "In Progress" : "Cancelled",
          target: acc.userName || acc.userEmail || `Client #${acc.userId || "-"}`,
          limit: acc.expirationDate || "2027-01-01",
          reviewer: "Vala Admin",
        }));

        setTableData(formattedAccounts);
      } catch (err) {
        console.error("Erreur de chargement du dashboard admin", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard Admin" }]}>
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm font-medium">Chargement des données réelles de la plateforme...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <SectionCards stats={stats} />
          <ChartAreaInteractive />
          <DataTable data={tableData.length > 0 ? tableData : []} />
        </div>
      )}
    </AppLayout>
  );
}

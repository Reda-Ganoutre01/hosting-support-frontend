import * as React from "react";
import { Link } from "react-router-dom";
import {
  IconDashboard,
  IconDatabase,
  IconHeadset,
  IconCpu,
  IconUsers,
  IconSettings,
  IconHelp,
  IconServer,
  IconBell,
  IconUser,
  IconRobot,
  IconFileText
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import logoImg from "@/assets/img/Hebergeur-web-Maroc copy.png";
import { AuthContext } from "@/context/AuthContext";
import { checkIsAdmin } from "@/lib/isAdmin";

export function AppSidebar({ ...props }) {
  const { user } = React.useContext(AuthContext);
  const isAdmin = checkIsAdmin(user);

  const adminNav = [
    { title: "Tableau de bord", url: "/admin/dashboard", icon: IconDashboard },
    { title: "Utilisateurs", url: "/admin/users", icon: IconUsers },
    { title: "Formules d'hébergement", url: "/admin/hosting-plans", icon: IconServer },
    { title: "Comptes d'hébergement", url: "/admin/hosting-accounts", icon: IconDatabase },
    { title: "Commandes de Sites Web", url: "/admin/website-orders", icon: IconFileText },
    { title: "Tickets de support", url: "/admin/tickets", icon: IconHeadset },
    { title: "FAQ", url: "/admin/faq", icon: IconHelp },
    { title: "Journaux des workflows", url: "/admin/workflow-logs", icon: IconCpu },
    { title: "Notifications", url: "/admin/notifications", icon: IconBell }
  ];

  const clientNav = [
    { title: "Tableau de bord", url: "/client/dashboard", icon: IconDashboard },
    { title: "Mes hébergements", url: "/client/accounts", icon: IconDatabase },
    { title: "Site Web & Services", url: "/client/website-orders", icon: IconFileText },
    { title: "Mes tickets", url: "/client/tickets", icon: IconHeadset },
    { title: "Assistant IA", url: "/client/ai-assistant", icon: IconRobot },
    { title: "FAQ", url: "/faq", icon: IconHelp },
    { title: "Notifications", url: "/client/notifications", icon: IconBell }
  ];

  const secondaryNav = [
    { title: "Profil", url: isAdmin ? "/admin/profile" : "/client/profile", icon: IconUser },
    { title: "Paramètres", url: isAdmin ? "/admin/settings" : "/client/settings", icon: IconSettings },
  ];

  return (
    <Sidebar collapsible="icon" className="h-auto border-r border-border bg-sidebar" {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link to={isAdmin ? "/admin/dashboard" : "/client/dashboard"} className="flex items-center">
                <img src={logoImg} alt="ValaHosting Logo" className="h-8 w-auto object-contain shrink-0" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={isAdmin ? adminNav : clientNav} />
        <NavSecondary items={secondaryNav} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}


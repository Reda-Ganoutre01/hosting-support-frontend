import * as React from "react";
import { Link } from "react-router-dom";
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconWorld,
  IconHeadset,
  IconCpu,
  IconReceiptTax,
  IconUsers,
  IconSettings,
  IconHelp,
  IconShieldCheck,
  IconServer
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { NavDocuments } from "./nav-documents";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import logoImg from "@/assets/img/Hebergeur-web-Maroc copy.png";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard
    },
    {
      title: "Hosting Accounts",
      url: "/hosting-accounts",
      icon: IconDatabase
    },
    {
      title: "Domain Names",
      url: "/domains",
      icon: IconWorld
    },
    {
      title: "Support Tickets",
      url: "/tickets",
      icon: IconHeadset
    },
    {
      title: "Cloud Servers",
      url: "/servers",
      icon: IconCpu
    },
    {
      title: "Clients & Users",
      url: "/users",
      icon: IconUsers
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings
    },
    {
      title: "System Status",
      url: "#",
      icon: IconShieldCheck
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp
    }
  ],
  documents: [
    {
      name: "Billing & Invoices",
      url: "#",
      icon: IconReceiptTax
    },
    {
      name: "Bandwidth Logs",
      url: "#",
      icon: IconChartBar
    },
    {
      name: "Backup Vaults",
      url: "#",
      icon: IconServer
    }
  ]
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" className="h-auto border-r border-border bg-sidebar" {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link to="/dashboard" className="flex items-center">
                <img src={logoImg} alt="ValaHosting Logo" className="h-8 w-auto object-contain shrink-0" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}

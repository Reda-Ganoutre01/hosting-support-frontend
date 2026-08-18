import * as React from "react";
import { useLocation } from "react-router-dom";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import Button from "@/components/ui/Button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";
import { HeaderUserMenu } from "./nav-user";

export function SiteHeader({ breadcrumbs = [] }) {
  const location = useLocation();

  const getPageTitle = () => {
    if (breadcrumbs && breadcrumbs.length > 0) {
      return breadcrumbs[breadcrumbs.length - 1].label;
    }
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/accounts":
      case "/hosting-accounts":
        return "Mes Hébergements";
      case "/domains":
      case "/domain":
      case "/domaine":
        return "Noms de Domaine";
      case "/tickets":
        return "Tickets Support";
      case "/profile":
        return "Mon Profil";
      case "/plans":
        return "Offres Hébergement";
      case "/notifications":
        return "Notifications";
      case "/faq":
        return "FAQ & Aide";
      default:
        return "Dashboard Admin";
    }
  };

  return (
    <header className="bg-background/90 sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-border backdrop-blur-md transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-base font-semibold text-foreground">{getPageTitle()}</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm" className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white">
            <IconCirclePlusFilled className="h-4 w-4" />
            <span>Quick Create</span>
          </Button>
          <HeaderUserMenu />
        </div>
      </div>
    </header>
  );
}

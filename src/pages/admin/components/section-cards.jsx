import * as React from "react";
import { IconTrendingUp, IconServer, IconHeadset, IconDatabase, IconCurrencyDollar, IconUsers, IconLayout } from "@tabler/icons-react";

import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/Card";

export function SectionCards({ stats = {} }) {
  const {
    activeAccountsCount = 0,
    totalAccountsCount = 0,
    openTicketsCount = 0,
    totalTicketsCount = 0,
    usersCount = 0,
    websiteOrdersCount = 0,
    revenueEst = 0,
  } = stats;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 lg:grid-cols-5">
      <Card className="@container/card bg-card border-border shadow-sm">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconCurrencyDollar className="h-4 w-4 text-blue-500" />
            Revenu Estimé
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums sm:text-2xl text-foreground">
            {revenueEst.toLocaleString("fr-FR")} DH/an
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1 border-blue-500/30 text-blue-400">
              <IconTrendingUp className="h-3.5 w-3.5" />
              Direct
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-xs">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-foreground">
            Formules actives <IconTrendingUp className="size-4 text-emerald-400" />
          </div>
          <div className="text-muted-foreground">Plateforme Vala</div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-card border-border shadow-sm">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconDatabase className="h-4 w-4 text-emerald-500" />
            Hébergements
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums sm:text-2xl text-foreground">
            {activeAccountsCount} Actifs
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1 border-emerald-500/30 text-emerald-400">
              {totalAccountsCount} Total
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-xs">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-foreground">
            Vala Cloud & cPanel <IconTrendingUp className="size-4 text-emerald-400" />
          </div>
          <div className="text-muted-foreground">Domaines & VPS</div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-card border-border shadow-sm">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconLayout className="h-4 w-4 text-purple-500" />
            Sites Commandés
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums sm:text-2xl text-foreground">
            {websiteOrdersCount} Projets
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1 border-purple-500/30 text-purple-400">
              PrestaShop
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-xs">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-foreground">
            E-Commerce & Mojoud
          </div>
          <div className="text-muted-foreground">Projets soumis</div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-card border-border shadow-sm">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconHeadset className="h-4 w-4 text-amber-500" />
            Tickets Support
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums sm:text-2xl text-foreground">
            {openTicketsCount} En cours
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1 border-amber-500/30 text-amber-400">
              {totalTicketsCount} Total
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-xs">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-foreground">
            Assistance Vala AI
          </div>
          <div className="text-muted-foreground">Temps optimal</div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-card border-border shadow-sm">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconUsers className="h-4 w-4 text-cyan-500" />
            Utilisateurs
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums sm:text-2xl text-foreground">
            {usersCount} Clients
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1 border-cyan-500/30 text-cyan-400">
              Vérifiés
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-xs">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-foreground">
            Comptes enregistrés
          </div>
          <div className="text-muted-foreground">Espace Client & Admin</div>
        </CardFooter>
      </Card>
    </div>
  );
}

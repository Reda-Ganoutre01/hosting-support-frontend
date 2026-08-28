import * as React from "react";
import { IconTrendingUp, IconServer, IconHeadset, IconDatabase, IconCurrencyDollar, IconUsers } from "@tabler/icons-react";

import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function SectionCards({ stats = {} }) {
  const {
    activeAccountsCount = 0,
    totalAccountsCount = 0,
    openTicketsCount = 0,
    totalTicketsCount = 0,
    usersCount = 0,
    revenueEst = 0,
  } = stats;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="@container/card bg-card border-border shadow-sm">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconCurrencyDollar className="h-4 w-4 text-blue-500" />
            Revenu Estimé Hébergements
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl text-foreground">
            {revenueEst.toLocaleString("fr-FR")} DH/an
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1 border-blue-500/30 text-blue-400">
              <IconTrendingUp className="h-3.5 w-3.5" />
              Direct
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-foreground">
            Basé sur les formules actives <IconTrendingUp className="size-4 text-emerald-400" />
          </div>
          <div className="text-muted-foreground text-xs">Données réelles de la plateforme</div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-card border-border shadow-sm">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconDatabase className="h-4 w-4 text-emerald-500" />
            Comptes d'Hébergement
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl text-foreground">
            {activeAccountsCount} Actifs
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1 border-emerald-500/30 text-emerald-400">
              <IconTrendingUp className="h-3.5 w-3.5" />
              {totalAccountsCount} Total
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-foreground">
            Serveurs Vala Cloud & cPanel <IconTrendingUp className="size-4 text-emerald-400" />
          </div>
          <div className="text-muted-foreground text-xs">Gestion des domaines & VPS</div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-card border-border shadow-sm">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconHeadset className="h-4 w-4 text-amber-500" />
            Tickets de Support
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl text-foreground">
            {openTicketsCount} En cours
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1 border-amber-500/30 text-amber-400">
              {totalTicketsCount} Total
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-foreground">
            Assistance Vala AI & Équipe <IconHeadset className="size-4 text-amber-400" />
          </div>
          <div className="text-muted-foreground text-xs">Temps de réponse optimal</div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-card border-border shadow-sm">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconUsers className="h-4 w-4 text-purple-500" />
            Utilisateurs Inscrits
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl text-foreground">
            {usersCount} Clients
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1 border-purple-500/30 text-purple-400">
              <IconTrendingUp className="h-3.5 w-3.5" />
              Vérifiés
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-foreground">
            {usersCount} comptes utilisateurs <IconServer className="size-4 text-purple-400" />
          </div>
          <div className="text-muted-foreground text-xs">Accès Espace Client & Admin</div>
        </CardFooter>
      </Card>
    </div>
  );
}

import * as React from "react";
import { IconTrendingDown, IconTrendingUp, IconServer, IconHeadset, IconDatabase, IconCurrencyDollar } from "@tabler/icons-react";

import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="@container/card bg-card border-border">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconCurrencyDollar className="h-4 w-4 text-blue-500" />
            Monthly Hosting Revenue
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl text-foreground">
            $24,850.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1 border-blue-500/30 text-blue-400">
              <IconTrendingUp className="h-3.5 w-3.5" />
              +14.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-foreground">
            +18 new VPS subscriptions <IconTrendingUp className="size-4 text-emerald-400" />
          </div>
          <div className="text-muted-foreground text-xs">Compared to last month</div>
        </CardFooter>
      </Card>
      <Card className="@container/card bg-card border-border">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconDatabase className="h-4 w-4 text-emerald-500" />
            Active Accounts
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl text-foreground">
            1,420
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1 border-emerald-500/30 text-emerald-400">
              <IconTrendingUp className="h-3.5 w-3.5" />
              +8.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-foreground">
            cPanel & Cloud Servers <IconTrendingUp className="size-4 text-emerald-400" />
          </div>
          <div className="text-muted-foreground text-xs">98.4% retention rate</div>
        </CardFooter>
      </Card>
      <Card className="@container/card bg-card border-border">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconHeadset className="h-4 w-4 text-amber-500" />
            Support Tickets
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl text-foreground">
            18 Pending
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1 border-amber-500/30 text-amber-400">
              <IconTrendingDown className="h-3.5 w-3.5" />
              -4 Urgent
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-foreground">
            Avg. response time 14m <IconHeadset className="size-4 text-amber-400" />
          </div>
          <div className="text-muted-foreground text-xs">4 High priority requiring review</div>
        </CardFooter>
      </Card>
      <Card className="@container/card bg-card border-border">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconServer className="h-4 w-4 text-purple-500" />
            Server Network Health
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl text-foreground">
            99.98%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1 border-purple-500/30 text-purple-400">
              <IconTrendingUp className="h-3.5 w-3.5" />
              Optimal
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-foreground">
            12 Nodes operational <IconServer className="size-4 text-purple-400" />
          </div>
          <div className="text-muted-foreground text-xs">Zero downtime recorded this week</div>
        </CardFooter>
      </Card>
    </div>
  );
}

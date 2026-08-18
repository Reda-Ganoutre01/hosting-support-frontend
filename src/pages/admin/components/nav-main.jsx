import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                  <Link to={item.url} className="flex items-center gap-2">
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

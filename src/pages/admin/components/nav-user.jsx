import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle
} from "@tabler/icons-react";

import Avatar from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { AuthContext } from "@/context/AuthContext.jsx";

export function HeaderUserMenu() {
  const navigate = useNavigate();
  const { user, logout } = React.useContext(AuthContext);

  const displayUser = {
    name: user?.name || user?.username || "Admin User",
    email: user?.email || "admin@valahosting.com",
    avatar: user?.avatar || "/avatars/shadcn.jpg"
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2.5 border border-border/80 bg-background/80 hover:bg-accent px-2.5 py-1 rounded-xl transition-all text-left">
          <Avatar name={displayUser.name} src={displayUser.avatar} className="h-7 w-7 rounded-lg" />
          <div className="hidden sm:grid flex-1 text-left text-xs leading-tight">
            <span className="truncate font-semibold text-foreground">{displayUser.name}</span>
            <span className="text-muted-foreground truncate text-[10px]">{displayUser.email}</span>
          </div>
          <IconDotsVertical className="size-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 min-w-56 rounded-xl bg-popover text-popover-foreground border-border shadow-xl"
        align="end"
        sideOffset={6}>
        <DropdownMenuLabel className="p-2 font-normal">
          <div className="flex items-center gap-2 text-left text-sm">
            <Avatar name={displayUser.name} src={displayUser.avatar} className="h-8 w-8 rounded-lg" />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{displayUser.name}</span>
              <span className="text-muted-foreground truncate text-xs">{displayUser.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
            <IconUserCircle className="h-4 w-4 mr-2" />
            Profile & Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/notifications")} className="cursor-pointer">
            <IconNotification className="h-4 w-4 mr-2" />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/tickets")} className="cursor-pointer">
            <IconCreditCard className="h-4 w-4 mr-2" />
            Support Tickets
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-600 focus:bg-red-500/10">
          <IconLogout className="h-4 w-4 mr-2" />
          Déconnexion (Log out)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function NavUser() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const { user, logout } = React.useContext(AuthContext);

  const displayUser = {
    name: user?.name || user?.username || "Admin User",
    email: user?.email || "admin@valahosting.com",
    avatar: user?.avatar || "/avatars/shadcn.jpg"
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border border-border/40 rounded-lg p-2">
              <Avatar name={displayUser.name} src={displayUser.avatar} className="h-8 w-8 rounded-lg" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-sidebar-foreground">{displayUser.name}</span>
                <span className="text-muted-foreground truncate text-xs">{displayUser.email}</span>
              </div>
              <IconDotsVertical className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 min-w-56 rounded-lg bg-popover text-popover-foreground border-border shadow-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}>
            <DropdownMenuLabel className="p-2 font-normal">
              <div className="flex items-center gap-2 text-left text-sm">
                <Avatar name={displayUser.name} src={displayUser.avatar} className="h-8 w-8 rounded-lg" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{displayUser.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{displayUser.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                <IconUserCircle className="h-4 w-4 mr-2" />
                Profile & Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/notifications")} className="cursor-pointer">
                <IconNotification className="h-4 w-4 mr-2" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/tickets")} className="cursor-pointer">
                <IconCreditCard className="h-4 w-4 mr-2" />
                Support Tickets
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-600 focus:bg-red-500/10">
              <IconLogout className="h-4 w-4 mr-2" />
              Déconnexion (Log out)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

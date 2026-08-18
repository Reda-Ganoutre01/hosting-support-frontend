import * as React from "react";
import { cn } from "@/lib/utils";

const SidebarContext = React.createContext({
  expanded: true,
  setExpanded: () => {},
  isMobile: false,
});

export function useSidebar() {
  return React.useContext(SidebarContext);
}

export function SidebarProvider({ children, className, style }) {
  const [expanded, setExpanded] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded, isMobile }}>
      <div className={cn("flex min-h-screen w-full bg-background text-foreground", className)} style={style}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({ children, className, collapsible = "icon", ...props }) {
  const { expanded } = useSidebar();

  return (
    <aside
      className={cn(
        "group/sidebar relative flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
        expanded ? "w-64" : "w-16",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({ children, className, ...props }) {
  return (
    <div className={cn("flex h-14 items-center px-4 border-b border-sidebar-border", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarContent({ children, className, ...props }) {
  return (
    <div className={cn("flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-4", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarFooter({ children, className, ...props }) {
  return (
    <div className={cn("p-2 border-t border-sidebar-border mt-auto", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarGroup({ children, className, ...props }) {
  return (
    <div className={cn("px-2 py-1.5 flex flex-col gap-1", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarGroupLabel({ children, className, ...props }) {
  const { expanded } = useSidebar();
  if (!expanded) return null;
  return (
    <div className={cn("px-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-1", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarGroupContent({ children, className, ...props }) {
  return <div className={cn("space-y-1", className)} {...props}>{children}</div>;
}

export function SidebarMenu({ children, className, ...props }) {
  return <ul className={cn("flex flex-col gap-1 w-full", className)} {...props}>{children}</ul>;
}

export function SidebarMenuItem({ children, className, ...props }) {
  return <li className={cn("relative group/menu-item", className)} {...props}>{children}</li>;
}

export function SidebarMenuButton({ children, asChild, className, size = "default", tooltip, ...props }) {
  const { expanded } = useSidebar();
  const Component = asChild ? "div" : "button";

  return (
    <Component
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        size === "lg" && "py-2.5 px-3",
        !expanded && "justify-center px-0",
        className
      )}
      title={!expanded ? tooltip : undefined}
      {...props}
    >
      {children}
    </Component>
  );
}

export function SidebarMenuAction({ children, className, showOnHover, ...props }) {
  return (
    <button
      className={cn(
        "absolute right-2 top-1.5 flex h-7 w-7 items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        showOnHover && "opacity-0 group-hover/menu-item:opacity-100 transition-opacity",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SidebarTrigger({ className, ...props }) {
  const { expanded, setExpanded } = useSidebar();
  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className={cn("p-2 rounded-lg text-foreground/80 hover:bg-accent hover:text-foreground transition-colors", className)}
      {...props}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}

export function SidebarInset({ children, className, ...props }) {
  return (
    <div className={cn("flex flex-1 flex-col overflow-hidden min-w-0 bg-background", className)} {...props}>
      {children}
    </div>
  );
}

import * as React from "react";
import { ChevronDown } from "lucide-react";

export function NavigationMenu({ children, className = "" }) {
  return (
    <nav className={`relative z-50 flex items-center justify-center ${className}`}>
      {children}
    </nav>
  );
}

export function NavigationMenuList({ children, className = "" }) {
  return (
    <ul className={`flex items-center gap-1 list-none ${className}`}>
      {children}
    </ul>
  );
}

export function NavigationMenuItem({ children, className = "" }) {
  return <li className={`relative group ${className}`}>{children}</li>;
}

export function NavigationMenuTrigger({ children, className = "" }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium transition-colors hover:text-amber-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50 py-2 px-3 ${className}`}
    >
      {children}
      <ChevronDown className="h-4 w-4 text-white/70 transition duration-200 group-hover:rotate-180 group-hover:text-amber-300" />
    </button>
  );
}

export function NavigationMenuContent({ children, className = "" }) {
  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block pt-2 animate-in fade-in slide-in-from-top-2 duration-200 ${className}`}
    >
      <div className="bg-white rounded-2xl p-3 shadow-2xl border border-slate-100 text-slate-800 relative">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-slate-100" />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

export function NavigationMenuLink({ children, className = "", ...props }) {
  return (
    <div className={`block select-none space-y-1 rounded-xl p-2.5 leading-none no-underline outline-none transition-colors hover:bg-slate-100 text-slate-900 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function navigationMenuTriggerStyle() {
  return "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-amber-300 py-2 px-3 text-white";
}

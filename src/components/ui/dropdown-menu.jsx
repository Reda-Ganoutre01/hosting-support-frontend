import * as React from "react";
import { cn } from "@/lib/utils";

export function DropdownMenu({ children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative inline-block text-left">
      {React.Children.map(children, (child) => {
        if (!child) return null;
        if (child.type === DropdownMenuTrigger) {
          return React.cloneElement(child, { open, setOpen });
        }
        if (child.type === DropdownMenuContent) {
          return open ? React.cloneElement(child, { setOpen }) : null;
        }
        return child;
      })}
    </div>
  );
}

export function DropdownMenuTrigger({ children, asChild, open, setOpen, className, ...props }) {
  const Component = asChild ? "div" : "button";
  return (
    <Component
      onClick={(e) => {
        e.stopPropagation();
        setOpen(!open);
      }}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function DropdownMenuContent({ children, className, align = "start", side = "bottom", setOpen }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "absolute z-50 min-w-[10rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80",
        align === "end" ? "right-0" : "left-0",
        side === "top" ? "bottom-full mb-1" : side === "right" ? "left-full top-0 ml-1" : "top-full mt-1",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (!child) return null;
        return React.cloneElement(child, { setOpen });
      })}
    </div>
  );
}

export function DropdownMenuItem({ children, className, variant, onClick, setOpen }) {
  return (
    <div
      onClick={(e) => {
        if (onClick) onClick(e);
        if (setOpen) setOpen(false);
      }}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
        variant === "destructive" && "text-destructive hover:bg-destructive/10 hover:text-destructive",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuCheckboxItem({ children, checked, onCheckedChange, className, setOpen }) {
  return (
    <div
      onClick={() => {
        if (onCheckedChange) onCheckedChange(!checked);
      }}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      <input type="checkbox" checked={checked} onChange={() => {}} className="h-4 w-4 rounded border-gray-300 accent-primary" />
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ children, className }) {
  return <div className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)}>{children}</div>;
}

export function DropdownMenuGroup({ children }) {
  return <div className="py-1">{children}</div>;
}

export function DropdownMenuSeparator({ className }) {
  return <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />;
}

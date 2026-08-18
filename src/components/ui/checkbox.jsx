import * as React from "react";
import { cn } from "@/lib/utils";

export function Checkbox({ className, checked, onCheckedChange, ...props }) {
  return (
    <input
      type="checkbox"
      checked={checked === true}
      onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)}
      className={cn(
        "h-4 w-4 rounded border border-input bg-background accent-primary text-primary focus:ring-1 focus:ring-ring cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

export function Separator({ className, orientation = "horizontal", ...props }) {
  return (
    <div
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }) {
  return (
    <label
      className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
      {...props}
    />
  );
}

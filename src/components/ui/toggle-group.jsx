import * as React from "react";
import { cn } from "@/lib/utils";

export function ToggleGroup({ type = "single", value, onValueChange, className, children, ...props }) {
  return (
    <div className={cn("inline-flex items-center gap-1 rounded-lg bg-muted p-1", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (!child) return null;
        return React.cloneElement(child, {
          isSelected: value === child.props.value,
          onSelect: () => onValueChange && onValueChange(child.props.value),
        });
      })}
    </div>
  );
}

export function ToggleGroupItem({ value, children, isSelected, onSelect, className, ...props }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        isSelected ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

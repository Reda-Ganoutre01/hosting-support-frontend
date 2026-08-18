import * as React from "react";
import { cn } from "@/lib/utils";

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative inline-block text-left">
      {React.Children.map(children, (child) => {
        if (!child) return null;
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, { open, setOpen, value });
        }
        if (child.type === SelectContent) {
          return open ? React.cloneElement(child, { setOpen, onValueChange }) : null;
        }
        return child;
      })}
    </div>
  );
}

export function SelectTrigger({ children, className, size = "default", open, setOpen, value, ...props }) {
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" && "h-8 px-2 text-xs",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SelectValue({ placeholder, value }) {
  return <span>{value || placeholder}</span>;
}

export function SelectContent({ children, className, setOpen, onValueChange, side = "bottom" }) {
  return (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
        side === "top" ? "bottom-full mb-1" : "top-full mt-1",
        className
      )}
    >
      <div className="p-1">
        {React.Children.map(children, (child) => {
          if (!child) return null;
          return React.cloneElement(child, {
            onClick: () => {
              if (child.props.value && onValueChange) {
                onValueChange(child.props.value);
              }
              setOpen(false);
            },
          });
        })}
      </div>
    </div>
  );
}

export function SelectItem({ children, className, value, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
    >
      {children}
    </div>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange && onOpenChange(false)}
      />
      {/* Content Container */}
      <div className="relative z-50 w-full max-w-lg p-6 mx-4">
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "relative w-full rounded-2xl bg-card border border-border p-6 shadow-2xl space-y-4 animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn("space-y-1.5 text-left", className)} {...props} />;
}

export function DialogFooter({ className, ...props }) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 pt-2", className)} {...props} />;
}

export function DialogTitle({ className, ...props }) {
  return <h2 className={cn("text-lg font-bold text-foreground tracking-tight", className)} {...props} />;
}

export function DialogDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

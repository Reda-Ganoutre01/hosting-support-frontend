import * as React from "react";
import { cn } from "@/lib/utils";

export function Tabs({ defaultValue, value, onValueChange, className, children, ...props }) {
  const [selectedTab, setSelectedTab] = React.useState(defaultValue || "");
  const currentTab = value !== undefined ? value : selectedTab;

  const handleTabChange = (val) => {
    setSelectedTab(val);
    if (onValueChange) onValueChange(val);
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (!child) return null;
        return React.cloneElement(child, { currentTab, handleTabChange });
      })}
    </div>
  );
}

export function TabsList({ className, children, currentTab, handleTabChange, ...props }) {
  return (
    <div className={cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (!child) return null;
        return React.cloneElement(child, { currentTab, handleTabChange });
      })}
    </div>
  );
}

export function TabsTrigger({ value, className, children, currentTab, handleTabChange, ...props }) {
  const isActive = currentTab === value;

  return (
    <button
      type="button"
      onClick={() => handleTabChange && handleTabChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-background text-foreground shadow-sm" : "hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children, currentTab, ...props }) {
  if (currentTab !== value) return null;

  return (
    <div className={cn("mt-2 ring-offset-background focus-visible:outline-none", className)} {...props}>
      {children}
    </div>
  );
}

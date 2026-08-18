import React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-[#0b56d9] text-white hover:bg-blue-700",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100",
    emerald: "bg-emerald-500 text-slate-950 font-bold",
    amber: "bg-amber-400 text-slate-900 font-extrabold",
    outline: "text-slate-950 border border-slate-200 dark:border-slate-800 dark:text-slate-100",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export default Badge;

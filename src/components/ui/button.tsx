import React from "react";
import cn from "clsx";

export default function Button({ children, variant = "primary", className, ...props }) {
  const base = "px-4 py-2 rounded-md font-medium focus:outline-none";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  };
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

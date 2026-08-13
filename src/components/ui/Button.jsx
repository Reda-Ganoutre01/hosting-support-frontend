import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-md shadow-blue-500/20",
        orange: "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/30",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        outline: "border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]",
        secondary: "bg-[#F8FAFC] text-[#0F172A] hover:bg-[#E2E8F0] border border-[#E2E8F0]",
        ghost: "hover:bg-[#F8FAFC] hover:text-[#0F172A] text-[#334155]",
        link: "text-[#2563EB] underline-offset-4 hover:underline hover:text-[#1D4ED8]",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base font-bold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export default function Button({ className, variant, size, children, ...props }) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </button>
  );
}
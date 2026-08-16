import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackButton({ className, label = "Retour", ...props }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-white hover:text-blue-600 hover:shadow-md hover:shadow-blue-500/10 active:scale-95 dark:border-slate-800/80 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:bg-slate-900 dark:hover:text-blue-400 cursor-pointer overflow-hidden",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5 text-slate-500 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400" />
      <span className="relative z-10">{label}</span>
    </button>
  );
}

export default BackButton;

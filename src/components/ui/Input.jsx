import React from "react";

export default function Input({ label, ...props }) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-sm font-medium text-slate-700">{label}</div>}
      <input
        {...props}
        className="w-full px-3 py-2 bg-white border rounded-md text-slate-900 focus:ring-2 focus:ring-blue-300"
      />
    </label>
  );
}

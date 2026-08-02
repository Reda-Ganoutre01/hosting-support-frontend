import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 bg-white border-b h-14">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-600 rounded" />
        <span className="font-semibold">Hosting Support</span>
      </div>
      <div className="flex items-center space-x-3">
        <button className="text-sm text-slate-700">Notifications</button>
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
      </div>
    </header>
  );
}

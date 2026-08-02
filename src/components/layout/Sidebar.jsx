import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const items = [
    { to: "/", label: "Dashboard" },
    { to: "/hosting", label: "Hosting Plans" },
    { to: "/tickets", label: "Tickets" },
    { to: "/users", label: "Users" },
  ];
  return (
    <aside className="w-64 min-h-screen p-4 bg-white border-r">
      <div className="mb-6 font-bold">Admin</div>
      <nav className="flex flex-col space-y-2">
        {items.map((i) => (
          <Link key={i.to} to={i.to} className="text-slate-700 hover:text-blue-600">
            {i.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

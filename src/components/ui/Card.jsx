import React from "react";

export default function Card({ children, className }) {
  return <div className={`bg-white shadow-sm rounded-md p-6 ${className || ""}`}>{children}</div>;
}

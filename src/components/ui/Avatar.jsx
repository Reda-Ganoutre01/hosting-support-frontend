import React from "react";

export function Avatar({ className = "", src, name, alt, children, ...props }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "CN";

  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-800 text-slate-200 items-center justify-center font-semibold text-xs border border-slate-700 ${className}`}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          className="aspect-square h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}
      {children || <span>{initials}</span>}
    </div>
  );
}

export function AvatarImage({ src, alt = "", className = "", ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`aspect-square h-full w-full object-cover ${className}`}
      {...props}
    />
  );
}

export function AvatarFallback({ className = "", children, ...props }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-slate-800 font-medium text-slate-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Avatar;

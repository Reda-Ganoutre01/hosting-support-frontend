import React, { useState, useEffect } from "react";

const AvatarContext = React.createContext({
  hasImage: false,
  imageError: false,
  setImageError: () => {},
});

export function Avatar({ className = "", src, name, alt, children, ...props }) {
  const [imageError, setImageError] = useState(false);
  const hasSrcProp = !!src;

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "RE";

  return (
    <AvatarContext.Provider value={{ hasImage: hasSrcProp, imageError, setImageError }}>
      <div
        className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-800 text-slate-200 items-center justify-center font-semibold text-xs border border-slate-700 ${className}`}
        {...props}
      >
        {children ? (
          children
        ) : src && !imageError ? (
          <img
            src={src}
            alt={alt || name || "Avatar"}
            className="aspect-square h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
    </AvatarContext.Provider>
  );
}

export function AvatarImage({ src, alt = "", className = "", onError, ...props }) {
  const { setImageError } = React.useContext(AvatarContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (!src || error) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={`aspect-square h-full w-full object-cover ${className}`}
      onError={(e) => {
        setError(true);
        if (setImageError) setImageError(true);
        if (onError) onError(e);
      }}
      {...props}
    />
  );
}

export function AvatarFallback({ className = "", children, ...props }) {
  const { imageError, hasImage } = React.useContext(AvatarContext);

  // Hide fallback if image is present and has no loading error
  if (hasImage && !imageError) return null;

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

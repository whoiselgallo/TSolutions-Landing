import React from "react";

export default function Avatar({
  src,
  alt = "avatar",
  size = "md",
  glow = true,
  className = "",
  ...props
}) {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <div
      {...props}
      className={`
        overflow-hidden rounded-full bg-midnightPanel flex items-center justify-center
        ${sizes[size]}
        ${glow ? "shadow-glowTurquesaSoft" : ""}
        ${className}
      `}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-blancoPuro font-bruno text-sm">?</span>
      )}
    </div>
  );
}

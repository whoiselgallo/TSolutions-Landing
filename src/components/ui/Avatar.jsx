import React from "react";

export default function Avatar({
  src,
  alt = "avatar",
  name = "",
  size = "md",
  glow = true,
  shape = "round",
  className = "",
  ...props
}) {
  const sizes = {
    sm: "w-10 h-10",   // 40px
    md: "w-14 h-14",   // 56px
    lg: "w-18 h-18",   // 72px
  };

  const shapes = {
    round: "rounded-full",
    soft: "rounded-soft",
    square: "rounded-none",
  };

  const initials = name
    ? name
        .trim()
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div
      {...props}
      className={`
        bg-midnightPanel overflow-hidden flex items-center justify-center
        ${sizes[size]}
        ${shapes[shape]}
        ${glow ? "shadow-glowTurquesaSoft hover:shadow-glowTurquesaHover" : ""}
        border border-midnightBorder
        ${className}
      `}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-blancoPuro font-bruno text-sm">
          {initials}
        </span>
      )}
    </div>
  );
}

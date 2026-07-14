import React from "react";

export default function Card({
  children,
  title,
  footer,
  variant = "dark",
  glow = true,
  padding = "md",
  className = "",
}) {
  const variants = {
    dark: "bg-negroProfundo text-blancoPuro",
    light: "bg-blancoPuro text-negroProfundo",
    turquesa: "bg-aquaTurquesa text-negroProfundo",
  };

  const paddings = {
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
  };

  const glowEffect = glow ? "shadow-glowTurquesaSoft" : "";

  return (
    <div
      className={`rounded-soft ${variants[variant]} ${glowEffect} ${className}`}
    >
      {title && (
        <div className="px-5 pt-4 pb-2 font-inter text-lg font-semibold">
          {title}
        </div>
      )}

      <div className={`${paddings[padding]}`}>{children}</div>

      {footer && (
        <div className="px-5 pb-4 pt-2 font-inter text-sm opacity-80">
          {footer}
        </div>
      )}
    </div>
  );
}

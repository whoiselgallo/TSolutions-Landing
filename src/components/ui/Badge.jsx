import React from "react";

export default function Badge({
  label,
  icon: Icon,
  variant = "aqua",
  glow = true,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center gap-1 px-2 py-1 rounded-soft font-inter text-xs tracking-wide transition-all duration-300";

  const variants = {
    aqua: "bg-aquaTurquesa text-negroProfundo",
    naranja: "bg-naranjaEnergy text-blancoPuro",
    blanco: "bg-blancoPuro text-negroProfundo",
    ghost: "bg-transparent text-blancoPuro border border-blancoPuro",
  };

  const glowEffect = glow
    ? "shadow-glowTurquesaSoft hover:shadow-glowTurquesaHover"
    : "";

  return (
    <span
      {...props}
      className={`${base} ${variants[variant]} ${glowEffect} ${className}`}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {label}
    </span>
  );
}

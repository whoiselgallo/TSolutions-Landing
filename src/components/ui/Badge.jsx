import React from "react";

export default function Badge({
  label,
  variant = "aqua",
  glow = true,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center px-2 py-1 rounded-soft font-inter text-xs tracking-wide transition-all duration-300";

  const variants = {
    aqua: "bg-aquaTurquesa text-negroProfundo",
    naranja: "bg-naranjaEnergy text-blancoPuro",
    blanco: "bg-blancoPuro text-negroProfundo",
    ghost: "bg-transparent text-blancoPuro border border-blancoPuro",
  };

  return (
    <span
      {...props}
      className={`
        ${base}
        ${variants[variant]}
        ${glow ? "shadow-glowTurquesaSoft hover:shadow-glowTurquesaHover" : ""}
        ${className}
      `}
    >
      {label}
    </span>
  );
}

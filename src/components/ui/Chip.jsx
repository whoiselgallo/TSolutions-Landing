import React from "react";

export default function Chip({
  label,
  variant = "default",
  glow = true,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center px-3 py-1 rounded-soft font-inter text-sm transition-all duration-300";

  const variants = {
    default: "bg-midnightPanel text-blancoPuro border border-deepGrid",
    aqua: "bg-aquaTurquesa text-negroProfundo",
    naranja: "bg-naranjaEnergy text-blancoPuro",
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

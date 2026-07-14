import React from "react";

export default function Button({
  label,
  iconLeft: IconLeft,
  iconRight: IconRight,
  variant = "naranja",
  size = "md",
  glow = true,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-inter rounded-soft transition-all duration-300";

  const sizes = {
    sm: "text-xs px-3 py-1 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-5 py-3 gap-2.5",
  };

  const variants = {
    naranja: "bg-naranjaEnergy text-blancoPuro hover:bg-naranjaEnergy/90",
    turquesa: "bg-aquaTurquesa text-negroProfundo hover:bg-aquaTurquesa/90",
    blanco: "bg-blancoPuro text-negroProfundo hover:bg-blancoPuro/90",
    ghost: "bg-transparent border border-blancoPuro text-blancoPuro hover:bg-blancoPuro/10",
  };

  const glowEffect = glow
    ? "shadow-glowTurquesaSoft hover:shadow-glowTurquesaHover"
    : "";

  return (
    <button
      {...props}
      className={`${base} ${sizes[size]} ${variants[variant]} ${glowEffect} ${className}`}
    >
      {IconLeft && <IconLeft className="w-4 h-4" />}
      {label}
      {IconRight && <IconRight className="w-4 h-4" />}
    </button>
  );
}

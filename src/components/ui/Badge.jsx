import React from "react";

export default function Badge({
  label,
  icon: Icon,
  variant = "naranja",
  size = "md",
  glow = true,
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center font-inter tracking-wide rounded-soft transition-all duration-300";

  const sizes = {
    sm: "text-[10px] px-2 py-[2px] gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3 py-1.5 gap-2",
  };

  const variants = {
    turquesa: "bg-aquaTurquesa text-negroProfundo",
    naranja: "bg-naranjaEnergy text-blancoPuro",
    blanco: "bg-blancoPuro text-negroProfundo",
    ghost: "bg-transparent text-blancoPuro border border-blancoPuro",
  };

  const glowEffect = glow
    ? "shadow-glowEnergy hover:shadow-glowEnergyHover"
    : "";

  return (
    <span
      {...props}
      className={`${base} ${sizes[size]} ${variants[variant]} ${glowEffect} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 opacity-90" />}
      {label || children}
    </span>
  );
}

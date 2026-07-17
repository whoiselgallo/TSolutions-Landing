import React from "react";

export default function Chip({
  label,
  icon: Icon = null,
  variant = "default",
  size = "md",
  glow = true,
  interactive = true,
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center gap-2 rounded-soft font-inter transition-all duration-300";

  const sizes = {
    mini: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const variants = {
    default: "bg-midnightPanel text-blancoPuro border border-deepGrid",
    aqua: "bg-aquaTurquesa text-negroProfundo",
    naranja: "bg-naranjaEnergy text-blancoPuro",
    ghost: "bg-transparent text-blancoPuro border border-blancoPuro",
    outline: "bg-transparent border border-midnightBorder text-blancoPuro",
    soft: "bg-midnightSoft text-blancoPuro",
  };

  const glowEffect = glow
    ? "shadow-glowEnergy hover:shadow-glowEnergyHover"
    : "";

  const interactiveEffect = interactive
    ? "cursor-pointer hover:scale-[1.03]"
    : "";

  return (
    <span
      {...props}
      className={`
        ${base}
        ${sizes[size]}
        ${variants[variant]}
        ${glowEffect}
        ${interactiveEffect}
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label || children}
    </span>
  );
}

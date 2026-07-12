import React from "react";
import { RippleButton } from "../../effects/click/RippleButton";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  className = "",
  ...props
}) {
  /* ============================
     🎨 BASE DEL BOTÓN
     ============================ */
  const base =
    "inline-flex items-center justify-center gap-3 font-bruno tracking-brunoMedium transition-all duration-300 rounded-medium shadow-turquesaSoft";

  /* ============================
     🎨 VARIANTES CORPORATIVAS
     ============================ */
  const variants = {
    primary:
      "bg-naranjaEnergy text-blancoPuro hover:bg-[#fb8a2f] hover:shadow-turquesaHover",
    secondary:
      "bg-aquaTurquesa text-negroProfundo hover:bg-[#4ef2ff] hover:shadow-turquesaHover",
    ghost:
      "bg-transparent text-blancoPuro border border-midnightPanel hover:bg-midnightPanel hover:text-blancoPuro hover:shadow-turquesaHover",
    outlineTurquesa:
      "border border-aquaTurquesa text-aquaTurquesa hover:bg-aquaTurquesa hover:text-negroProfundo hover:shadow-turquesaHover",
    outlineBlanco:
      "border border-blancoPuro text-blancoPuro hover:bg-blancoPuro hover:text-negroProfundo hover:shadow-turquesaHover",
  };

  /* ============================
     📏 TAMAÑOS
     ============================ */
  const sizes = {
    md: "px-6 py-3 text-base",
    mini: "px-3 py-1 text-sm rounded-soft",
    xl: "px-10 py-6 text-[90px] font-montserratSlim tracking-tightSlim rounded-large",
  };

  return (
    <RippleButton
      {...props}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && (
        <span className="w-5 h-5 bg-blancoPuro rounded-full shadow-turquesaSoft"></span>
      )}
      {children}
    </RippleButton>
  );
}

import React from "react";
import { RippleButton } from "../../effects/click/RippleButton";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon = null,
  loading = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  /* ============================
     🎨 BASE DEL BOTÓN
     ============================ */
  const base =
    "inline-flex items-center justify-center gap-3 font-bruno tracking-brunoMedium transition-all duration-300 rounded-medium";

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
     📏 TAMAÑOS CORPORATIVOS
     ============================ */
  const sizes = {
    md: "px-6 py-3 text-base",
    mini: "px-3 py-1 text-sm rounded-soft",
    lg: "px-8 py-4 text-lg rounded-large",
  };

  /* ============================
     🔄 LOADING STATE
     ============================ */
  const Loader = () => (
    <span className="w-4 h-4 border-2 border-blancoPuro border-t-transparent rounded-full animate-spin"></span>
  );

  return (
    <RippleButton
      {...props}
      disabled={loading || props.disabled}
      className={`
        ${base}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${loading ? "opacity-70 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </>
      )}
    </RippleButton>
  );
}

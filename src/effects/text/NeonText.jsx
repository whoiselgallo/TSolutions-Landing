// ============================================================
// ⚡ NeonText — TSolutions IPIDD
// Texto con glow turquesa y variantes corporativas
// ============================================================

import React from "react";

const NeonText = ({
  children,
  variant = "turquesa",
  size = "xl",
  glow = true,
  className = "",
}) => {
  const variants = {
    turquesa: "text-aquaTurquesa",
    hero: "text-blancoPuro font-montserratSlim tracking-tightMega",
    cta: "text-naranjaEnergy font-bruno tracking-brunoMedium",
    dashboard: "text-blancoPuro font-inter",
  };

  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
    xl: "text-4xl",
    mega: "text-6xl",
  };

  return (
    <span
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${glow ? "animate-glowPulse shadow-glowTurquesaSoft" : ""}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default NeonText;

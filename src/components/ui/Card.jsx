import React from "react";
import { MagneticCard } from "../../effects/mouse/MagneticCard";

export default function Card({
  children,
  glow = false,
  className = "",
  ...props
}) {
  const base =
    "p-6 bg-midnightPanel text-blancoPuro rounded-large shadow-card transition-all duration-300";

  return (
    <MagneticCard>
      <div
        {...props}
        className={`
          ${base}
          ${glow ? "shadow-glowTurquesaSoft hover:shadow-glowTurquesaHover" : ""}
          ${className}
        `}
      >
        {children}
      </div>
    </MagneticCard>
  );
}

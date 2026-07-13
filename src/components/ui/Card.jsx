import React from "react";
import { MagneticCard } from "../../effects/mouse/MagneticCard";

export default function Card({
  children,
  variant = "default",
  glow = false,
  interactive = true,
  className = "",
  ...props
}) {
  const base =
    "p-6 rounded-large transition-all duration-300 bg-midnightPanel text-blancoPuro shadow-card";

  const variants = {
    default: "",
    soft: "bg-midnightSoft text-blancoPuro",
    outline: "border border-midnightBorder",
    glass: "bg-midnightGlass backdrop-blur-md",
  };

  const glowEffect = glow
    ? "shadow-glowTurquesaSoft hover:shadow-glowTurquesaHover"
    : "";

  const Wrapper = interactive ? MagneticCard : React.Fragment;

  return (
    <Wrapper>
      <div
        {...props}
        className={`
          ${base}
          ${variants[variant]}
          ${glowEffect}
          ${className}
        `}
      >
        {children}
      </div>
    </Wrapper>
  );
}

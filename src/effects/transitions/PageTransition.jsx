import React from "react";

/**
 * PageTransition
 * Envuelve cualquier vista y aplica animaciones suaves al montar/desmontar.
 *
 * Props:
 * - children: contenido de la página
 * - type: "fade" | "slide" | "scale"
 * - glow: activa el glow turquesa
 * - className: clases adicionales
 */

export default function PageTransition({
  children,
  type = "fade",
  glow = false,
  className = "",
}) {
  const animations = {
    fade: "animate-fadeTurquesa",
    slide: "animate-slideSoft",
    scale: "animate-scaleIn",
  };

  return (
    <div
      className={`
        ${animations[type]}
        ${glow ? "shadow-glowTurquesaSoft" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

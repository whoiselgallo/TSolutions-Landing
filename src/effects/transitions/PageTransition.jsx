import React from "react";

/**
 * PageTransition — Versión ESTABLE
 * Animaciones suaves sin desmontaje ni parpadeo.
 *
 * Props:
 * - children: contenido
 * - type: "fade" | "slide" | "scale"
 * - direction: "up" | "down" | "left" | "right" (solo slide)
 * - speed: "slow" | "normal" | "fast"
 * - glow: activa glow turquesa corporativo
 * - className: clases adicionales
 */

export default function PageTransition({
  children,
  type = "fade",
  direction = "up",
  speed = "normal",
  glow = false,
  className = "",
}) {
  // Variantes de velocidad
  const speedMap = {
    slow: "duration-700",
    normal: "duration-500",
    fast: "duration-300",
  };

  // Variantes de dirección para slide
  const slideDirection = {
    up: "translate-y-6",
    down: "-translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
  };

  // Animaciones de entrada (siempre activas)
  const enterAnimations = {
    fade: "animate-fadeTurquesa",
    scale: "animate-scaleIn",
    slide: `animate-slideSoft ${slideDirection[direction]}`,
  };

  return (
    <div
      className={`
        ${enterAnimations[type]}
        ${speedMap[speed]}
        ${glow ? "shadow-glowTurquesaSoft" : ""}
        transition-all ease-out
        ${className}
      `}
    >
      {children}
    </div>
  );
}

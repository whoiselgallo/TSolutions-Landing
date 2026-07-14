import React, { useEffect, useState } from "react";

/**
 * PageTransition PRO — TSolutions IPIDD
 * Transiciones suaves, profesionales y corporativas.
 *
 * Props:
 * - children: contenido
 * - type: "fade" | "slide" | "scale"
 * - direction: "up" | "down" | "left" | "right" (solo slide)
 * - speed: "slow" | "normal" | "fast"
 * - glow: activa glow turquesa
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
  const [isMounted, setIsMounted] = useState(false);

  // Activa animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

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

  // Animaciones de entrada
  const enterAnimations = {
    fade: "opacity-0 animate-fadeTurquesa",
    scale: "opacity-0 scale-95 animate-scaleIn",
    slide: `opacity-0 ${slideDirection[direction]} animate-slideSoft`,
  };

  // Animaciones de salida
  const exitAnimations = {
    fade: "opacity-0",
    scale: "opacity-0 scale-95",
    slide: "opacity-0 translate-y-6",
  };

  return (
    <div
      className={`
        ${isMounted ? enterAnimations[type] : exitAnimations[type]}
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

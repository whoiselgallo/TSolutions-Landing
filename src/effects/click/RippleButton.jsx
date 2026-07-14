// ============================================================
// ⚡ RippleButton — TSolutions IPIDD
// Botón interactivo con efecto ripple, glow corporativo y motion dinámico
// ============================================================

import React, { useRef } from "react";
import { UI } from "../../components/ui/ui.config";

const RippleButton = ({
  children,
  variant = "cta",
  size = "md",
  icon = null,
  glow = true,
  motion = "fade", // fade | slide | pulse | none
  disabled = false,
  loading = false,
  className = "",
  ...props
}) => {
  const btnRef = useRef(null);

  const createRipple = (event) => {
    if (disabled || loading) return;
    const button = btnRef.current;
    const ripple = document.createElement("span");

    const rect = button.getBoundingClientRect();
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add("ts-ripple");

    const oldRipple = button.getElementsByClassName("ts-ripple")[0];
    if (oldRipple) oldRipple.remove();

    button.appendChild(ripple);
  };

  const color =
    UI.variants.button[variant]?.split(" ")[0] ||
    UI.variants.chip[variant]?.split(" ")[0] ||
    "#F97316";

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  };

  const motionMap = {
    fade: "animate-fadeTurquesa",
    slide: "animate-slideSoft",
    pulse: "animate-glowPulse",
    none: "",
  };

  return (
    <button
      ref={btnRef}
      onClick={createRipple}
      disabled={disabled}
      className={`
        relative overflow-hidden rounded-soft
        min-h-button min-w-button
        transition-all duration-200
        ${sizes[size]}
        ${glow ? "shadow-glowTurquesaSoft" : ""}
        ${motionMap[motion]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${loading ? "animate-pulse" : ""}
        ${className}
      `}
      style={{
        backgroundColor: color,
        color: variant === "dashboard" ? "#FFF" : "#000",
      }}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {icon && <span className="animate-slideSoft">{icon}</span>}
        {loading ? "Cargando..." : children}
      </span>
    </button>
  );
};

export default RippleButton;

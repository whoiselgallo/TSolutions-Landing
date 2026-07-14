// ============================================================
// 🔶 LogoPulse — TSolutions IPIDD
// Renderiza el logo corporativo con glow y pulso animado
// ============================================================

import React from "react";
import logo from "../../assets/logo-tsolutions.WEBP";
import { UI } from "../../components/ui/ui.config"; // integración con tokens corporativos

const LogoPulse = ({
  size = 160,
  glow = true,
  pulse = true,
  variant = "naranja",
  glowStrength = 12,
  className = "",
}) => {
  const color =
    UI.variants.button[variant]?.split(" ")[0] ||
    UI.variants.chip[variant]?.split(" ")[0] ||
    "#F97316";

  return (
    <div
      className={`
        relative flex items-center justify-center
        ${glow ? "animate-glowPulse" : ""}
        ${pulse ? "animate-ping" : ""}
        ${className}
      `}
      style={{
        width: size,
        height: size,
        filter: glow
          ? `drop-shadow(0 0 ${glowStrength}px ${color})`
          : "none",
      }}
    >
      <img
        src={logo}
        alt="TSolutions Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default LogoPulse;

// ============================================================
// 🔶 Logopulse — TSolutions IPIDD
// Renderiza el logo corporativo con glow y pulso animado
// ============================================================

import React from "react";
import logo from "../assets/logo-tsolutions.png"; // versión PNG con fondo transparente

const Logopulse = ({
  size = 160,
  glow = true,
  pulse = true,
  variant = "naranja",
  className = "",
}) => {
  const variants = {
    naranja: "shadow-naranjaEnergySoft",
    turquesa: "shadow-glowTurquesaSoft",
    blanco: "shadow-blancoPulse",
    dashboard: "shadow-turquesaSoft",
  };

  return (
    <div
      className={`
        relative flex items-center justify-center
        ${glow ? "animate-glowPulse" : ""}
        ${pulse ? "animate-ping" : ""}
        ${variants[variant]}
        ${className}
      `}
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src={logo}
        alt="TSolutions Logo"
        className="w-full h-full object-contain"
        style={{
          filter: glow
            ? "drop-shadow(0 0 12px rgba(255, 90, 0, 0.6))"
            : "none",
        }}
      />
    </div>
  );
};

export default Logopulse;

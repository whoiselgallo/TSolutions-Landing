// ============================================================
// 🔶 LogoPulseSvg — TSolutions IPIDD (SVG animado)
// Hexágono + triángulo con glow y pulso
// ============================================================

import React from "react";

const LogoPulseSvg = ({
  size = 160,
  glow = true,
  pulse = true,
  className = "",
}) => {
  return (
    <div
      className={`
        inline-flex items-center justify-center
        ${glow ? "animate-glowPulse" : ""}
        ${pulse ? "animate-ping" : ""}
        ${className}
      `}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fondo transparente */}
        <rect width="200" height="200" fill="none" />

        {/* Hexágono */}
        <polygon
          points="100,20 170,60 170,140 100,180 30,140 30,60"
          fill="none"
          stroke="#F97316"
          strokeWidth="10"
          strokeLinejoin="round"
        />

        {/* Triángulo interno */}
        <polygon
          points="100,50 145,135 55,135"
          fill="none"
          stroke="#F97316"
          strokeWidth="10"
          strokeLinejoin="round"
        />

        {/* Glow interno */}
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="rgba(249,115,22,0.18)"
        />
      </svg>
    </div>
  );
};

export default LogoPulseSvg;

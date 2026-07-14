// ============================================================
// 🔶 LogoPulseSvg — TSolutions IPIDD (Versión Optimizada)
// Hexágono + triángulo con glow dinámico, pulso y variantes corporativas
// ============================================================

import React from "react";
import { UI } from "../../components/ui/ui.config";

const LogoPulseSvg = ({
  size = 160,
  glow = true,
  pulse = true,
  variant = "naranja",
  glowStrength = 18,
  strokeWidth = 10,
  innerGlowOpacity = 0.22,
  className = "",
}) => {
  // Color corporativo desde UI.config
  const color =
    UI.variants.button[variant]?.split(" ")[0] ||
    UI.variants.chip[variant]?.split(" ")[0] ||
    "#F97316";

  return (
    <div
      className={`
        inline-flex items-center justify-center
        ${glow ? "animate-glowPulse" : ""}
        ${pulse ? "animate-pulseSoft" : ""}
        ${className}
      `}
      style={{
        width: size,
        height: size,
        filter: glow ? `drop-shadow(0 0 ${glowStrength}px ${color})` : "none",
      }}
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
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />

        {/* Triángulo interno */}
        <polygon
          points="100,50 145,135 55,135"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />

        {/* Glow interno */}
        <circle
          cx="100"
          cy="100"
          r="70"
          fill={`${color}${Math.floor(innerGlowOpacity * 255).toString(16)}`}
        >
          {glow && (
            <animate
              attributeName="r"
              values="68;72;68"
              dur="3s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </svg>
    </div>
  );
};

export default LogoPulseSvg;

// ============================================================
// 🔄 LoaderIntegral — TSolutions IPIDD
// Loader circular con glow corporativo y rotación suave
// ============================================================

import React from "react";
import { UI } from "../../components/ui/ui.config";

const LoaderIntegral = ({
  size = 80,
  variant = "turquesa",
  glow = true,
  speed = "1.2s",
  className = "",
}) => {
  const color =
    UI.variants.button[variant]?.split(" ")[0] ||
    UI.variants.chip[variant]?.split(" ")[0] ||
    "#00E5FF";

  return (
    <div
      className={`
        flex items-center justify-center
        ${glow ? "animate-glowPulse" : ""}
        ${className}
      `}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
        style={{ animationDuration: speed }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="180"
          strokeDashoffset="60"
        />
      </svg>
    </div>
  );
};

export default LoaderIntegral;

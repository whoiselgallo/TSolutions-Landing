// ============================================================
// ⚡ LoaderIntegral — TSolutions IPIDD
// Loader corporativo con glow, spinner, pulso y texto animado
// ============================================================

import React from "react";

const LoaderIntegral = ({
  text = "Cargando...",
  variant = "turquesa",
  size = 48,
  glow = true,
  className = "",
}) => {
  const variants = {
    turquesa: {
      spinner: "border-aquaTurquesa",
      pulse: "bg-aquaTurquesa/40",
      text: "text-aquaTurquesa",
    },
    naranja: {
      spinner: "border-naranjaEnergy",
      pulse: "bg-naranjaEnergy/40",
      text: "text-naranjaEnergy",
    },
    dashboard: {
      spinner: "border-blancoPuro",
      pulse: "bg-blancoPuro/30",
      text: "text-blancoPuro",
    },
    blanco: {
      spinner: "border-blancoPuro",
      pulse: "bg-blancoPuro/40",
      text: "text-blancoPuro",
    },
  };

  const v = variants[variant];

  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-3
        ${glow ? "animate-glowPulse" : ""}
        ${className}
      `}
    >
      {/* Spinner */}
      <div
        className={`
          w-${size} h-${size}
          rounded-full
          border-4 border-t-transparent
          animate-spin
          ${v.spinner}
        `}
      />

      {/* Pulso */}
      <div
        className={`
          w-${size / 1.4} h-${size / 1.4}
          rounded-full
          animate-ping
          ${v.pulse}
        `}
      />

      {/* Texto */}
      <span
        className={`
          font-inter tracking-wide
          animate-fadeTurquesa
          ${v.text}
        `}
      >
        {text}
      </span>
    </div>
  );
};

export default LoaderIntegral;

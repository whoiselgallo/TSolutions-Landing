// ============================================================
// ⚡ Shockwave — TSolutions IPIDD
// Onda expansiva futurista con tokens corporativos
// ============================================================

import React, { useEffect, useRef } from "react";

const Shockwave = ({
  trigger = "click", // click | auto | hover
  size = 320,
  duration = 900,
  variant = "turquesa",
  glow = true,
  className = "",
}) => {
  const waveRef = useRef(null);

  const variants = {
    turquesa: "bg-aquaTurquesa/40 shadow-glowTurquesaSoft",
    naranja: "bg-naranjaEnergy/40 shadow-turquesaHover",
    blanco: "bg-blancoPuro/40 shadow-blancoPulse",
    dashboard: "bg-midnightPanel/40 shadow-turquesaSoft",
  };

  const v = variants[variant];

  const launchWave = (x, y) => {
    const wave = waveRef.current;
    if (!wave) return;

    wave.style.left = `${x - size / 2}px`;
    wave.style.top = `${y - size / 2}px`;

    wave.style.width = `${size}px`;
    wave.style.height = `${size}px`;

    wave.style.opacity = glow ? 0.45 : 0.25;
    wave.style.transform = "scale(0)";
    wave.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;

    requestAnimationFrame(() => {
      wave.style.transform = "scale(4)";
      wave.style.opacity = 0;
    });
  };

  useEffect(() => {
    if (trigger === "auto") {
      launchWave(window.innerWidth / 2, window.innerHeight / 2);
      return;
    }

    const handler = (e) => {
      launchWave(e.clientX, e.clientY);
    };

    if (trigger === "click") {
      window.addEventListener("click", handler);
    }

    if (trigger === "hover") {
      window.addEventListener("mousemove", handler);
    }

    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("mousemove", handler);
    };
  }, [trigger, size, duration, glow]);

  return (
    <div
      ref={waveRef}
      className={`
        pointer-events-none
        fixed
        rounded-full
        mix-blend-screen
        ${v}
        ${className}
      `}
      style={{
        position: "fixed",
        width: size,
        height: size,
        opacity: 0,
        transform: "scale(0)",
        zIndex: 3,
      }}
    />
  );
};

export default Shockwave;

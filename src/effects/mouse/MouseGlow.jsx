import React, { useRef, useEffect } from "react";

const MouseGlow = ({
  variant = "default",
  size = 240,
  intensity = 0.35,
  glow = true,
  motion = "fade", // fade | slide | none
  className = "",
}) => {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      const glowEl = glowRef.current;
      if (!glowEl) return;

      glowEl.style.left = `${e.clientX - size / 2}px`;
      glowEl.style.top = `${e.clientY - size / 2}px`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [size]);

  const variants = {
    default: `
      bg-aquaTurquesa/20 
      shadow-glowTurquesaSoft
    `,
    hero: `
      bg-aquaTurquesa/30 
      shadow-glowTurquesaHover
    `,
    dashboard: `
      bg-midnightPanel/40 
      shadow-turquesaSoft
    `,
    turquesa: `
      bg-aquaTurquesa/25 
      shadow-glowTurquesaSoft
    `,
  };

  const motionMap = {
    fade: "animate-fadeTurquesa",
    slide: "animate-slideSoft",
    none: "",
  };

  return (
    <div
      ref={glowRef}
      className={`
        pointer-events-none 
        fixed 
        rounded-full 
        mix-blend-screen 
        blur-3xl 
        transition-all duration-200
        ${variants[variant]}
        ${glow ? "animate-glowPulse" : ""}
        ${motionMap[motion]}
        ${className}
      `}
      style={{
        width: size,
        height: size,
        opacity: intensity,
        zIndex: 1,
      }}
    />
  );
};

export default MouseGlow;

// ============================================================
// ✨ TypewriterLoop — TSolutions IPIDD
// Escritura dinámica con múltiples frases en loop infinito
// ============================================================

import React, { useState, useEffect } from "react";

const TypewriterLoop = ({
  phrases = [],
  speed = 60,
  pause = 1200,
  variant = "turquesa",
  glow = true,
  className = "",
}) => {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const current = phrases[index];

    const interval = setInterval(() => {
      setDisplay(current.slice(0, i));
      i++;

      if (i > current.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % phrases.length);
        }, pause);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [index, phrases, speed, pause]);

  const variants = {
    turquesa: "text-aquaTurquesa",
    hero: "text-blancoPuro font-montserratSlim tracking-tightMega",
    cta: "text-naranjaEnergy font-bruno tracking-brunoMedium",
    dashboard: "text-blancoPuro font-inter",
  };

  return (
    <span
      className={`
        ${variants[variant]}
        ${glow ? "shadow-glowTurquesaSoft animate-fadeTurquesa" : ""}
        ${className}
      `}
    >
      {display}
      <span className="animate-ping text-aquaTurquesa">|</span>
    </span>
  );
};

export default TypewriterLoop;

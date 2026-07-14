// ============================================================
// 🧲 MagneticCard — TSolutions IPIDD
// Efecto magnético 3D con rotación suave y glow corporativo
// ============================================================

import React, { useRef } from "react";

const MagneticCard = ({
  children,
  intensity = 20,
  glow = true,
  className = "",
}) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `rotateY(${x / intensity}deg) rotateX(${-y / intensity}deg)`;
  };

  const reset = () => {
    cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={`
        transition-transform duration-300 ease-out
        ${glow ? "shadow-glowTurquesaSoft" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default MagneticCard;

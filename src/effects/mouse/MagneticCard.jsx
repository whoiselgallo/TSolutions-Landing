import React, { useRef } from "react";

const MagneticCard = ({
  children,
  variant = "default",
  glow = false,
  motion = "fade", // fade | slide | none
  className = "",
  ...props
}) => {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    card.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
  };

  const resetMove = () => {
    const card = cardRef.current;
    card.style.transform = "translate(0px, 0px)";
  };

  const variants = {
    default: `
      bg-midnightPanel 
      text-blancoPuro 
      shadow-card 
      border border-deepGrid
    `,
    hero: `
      bg-negroProfundo 
      text-blancoPuro 
      shadow-glowTurquesaSoft 
      border border-aquaTurquesa
    `,
    dashboard: `
      bg-midnightPanel 
      text-blancoPuro 
      border border-aquaTurquesa 
      hover:shadow-turquesaHover
    `,
    glow: `
      bg-midnightPanel 
      text-blancoPuro 
      shadow-glowTurquesaSoft 
      border border-aquaTurquesa
    `,
  };

  const motionMap = {
    fade: "animate-fadeTurquesa",
    slide: "animate-slideSoft",
    none: "",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={resetMove}
      className={`
        min-w-card min-h-card 
        rounded-soft 
        p-6 
        transition-all duration-300 
        ${variants[variant]}
        ${glow ? "animate-glowPulse" : ""}
        ${motionMap[motion]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default MagneticCard;

import React, { useEffect, useRef } from "react";

const MouseTrail = ({
  variant = "default",
  count = 12,
  size = 24,
  intensity = 0.35,
  motion = "fade", // fade | slide | none
  className = "",
}) => {
  const trailRefs = useRef([]);

  useEffect(() => {
    const handleMove = (e) => {
      trailRefs.current.forEach((el, index) => {
        const delay = index * 0.035;

        setTimeout(() => {
          el.style.left = `${e.clientX - size / 2}px`;
          el.style.top = `${e.clientY - size / 2}px`;
        }, delay * 1000);
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [size]);

  const variants = {
    default: `
      bg-aquaTurquesa/30 
      shadow-glowTurquesaSoft
    `,
    hero: `
      bg-aquaTurquesa/40 
      shadow-glowTurquesaHover
    `,
    dashboard: `
      bg-midnightPanel/50 
      shadow-turquesaSoft
    `,
    turquesa: `
      bg-aquaTurquesa/35 
      shadow-glowTurquesaSoft
    `,
  };

  const motionMap = {
    fade: "animate-fadeTurquesa",
    slide: "animate-slideSoft",
    none: "",
  };

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className={`
            pointer-events-none 
            fixed 
            rounded-full 
            mix-blend-screen 
            blur-xl 
            transition-all duration-200
            ${variants[variant]}
            ${motionMap[motion]}
            ${className}
          `}
          style={{
            width: size,
            height: size,
            opacity: intensity,
            zIndex: 2,
          }}
        />
      ))}
    </>
  );
};

export default MouseTrail;

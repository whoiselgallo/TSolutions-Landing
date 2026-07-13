import React, { useRef } from "react";

const RippleButton = ({
  children,
  variant = "cta",
  size = "md",
  icon = null,
  glow = true,
  motion = "fade", // fade | slide | none
  className = "",
  ...props
}) => {
  const btnRef = useRef(null);

  const createRipple = (event) => {
    const button = btnRef.current;
    const ripple = document.createElement("span");

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
    ripple.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
    ripple.classList.add("ts-ripple");

    const oldRipple = button.getElementsByClassName("ts-ripple")[0];
    if (oldRipple) oldRipple.remove();

    button.appendChild(ripple);
  };

  const variants = {
    /* ============================================================
       CTA — Botón principal naranja (visto en “Acceder →” y “Explorar Componentes”)
    ============================================================ */
    cta: `
      bg-naranjaEnergy text-negroProfundo
      shadow-turquesaSoft hover:shadow-turquesaHover
      font-bruno tracking-brunoMedium
    `,

    /* ============================================================
       HERO — Botón turquesa brillante (visto en “Ver Tokens”)
    ============================================================ */
    hero: `
      bg-aquaTurquesa text-negroProfundo
      shadow-glowTurquesaSoft hover:shadow-glowTurquesaHover
      font-montserratSlim tracking-tightMega
    `,

    /* ============================================================
       DASHBOARD — Botón oscuro con borde turquesa (visto en Overview / Metrics)
    ============================================================ */
    dashboard: `
      bg-midnightPanel text-blancoPuro
      border border-aquaTurquesa
      hover:bg-aquaTurquesa hover:text-negroProfundo
      shadow-turquesaSoft
    `,
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  };

  const motionMap = {
    fade: "animate-fadeTurquesa",
    slide: "animate-slideSoft",
    none: "",
  };

  return (
    <button
      ref={btnRef}
      onClick={createRipple}
      className={`
        relative overflow-hidden rounded-soft
        min-h-button min-w-button
        transition-all duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${glow ? "animate-glowPulse" : ""}
        hover:animate-hoverPulse
        ${className}
      `}
      {...props}
    >
      <span className={`${motionMap[motion]} flex items-center`}>
        {icon && <span className="mr-2 animate-slideSoft">{icon}</span>}
        {children}
      </span>
    </button>
  );
};

export default RippleButton;

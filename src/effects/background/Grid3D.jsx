// ============================================================
// 🟦 Grid3D — TSolutions IPIDD
// Fondo 3D animado con glow corporativo y perspectiva dinámica
// ============================================================

import React, { useEffect, useRef } from "react";

const Grid3D = ({
  density = 22,
  speed = 0.35,
  glow = true,
  variant = "turquesa",
  className = "",
}) => {
  const canvasRef = useRef(null);

  const variants = {
    turquesa: "#00E5FF",
    naranja: "#F97316",
    dashboard: "#00E5FF",
    hero: "#F97316",
  };

  const color = variants[variant];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = glow ? 0.35 : 0.18;

      const step = density;
      offset += speed;

      for (let x = -canvas.height; x < canvas.width + canvas.height; x += step) {
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x - canvas.height + offset, canvas.height);
        ctx.stroke();
      }

      for (let y = -canvas.width; y < canvas.height + canvas.width; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(canvas.width, y - canvas.width + offset);
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, [density, speed, glow, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`
        fixed inset-0 -z-10
        mix-blend-screen
        ${glow ? "animate-glowPulse" : ""}
        ${className}
      `}
    />
  );
};

export default Grid3D;

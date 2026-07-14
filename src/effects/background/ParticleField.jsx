// ============================================================
// 🟦 ParticleField — TSolutions IPIDD
// Campo de partículas 3D con glow corporativo y movimiento suave
// ============================================================

import React, { useEffect, useRef } from "react";
import { UI } from "../../components/ui/ui.config"; // integración con tokens corporativos

const ParticleField = ({
  count = 120,
  speed = 0.35,
  size = 3,
  glow = true,
  variant = "turquesa",
  className = "",
}) => {
  const canvasRef = useRef(null);

  // Color corporativo desde UI.config
  const color =
    UI.variants.button[variant]?.split(" ")[0] ||
    UI.variants.chip[variant]?.split(" ")[0] ||
    "#00E5FF";

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Crear partículas
    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
    }));

    let animationId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx * p.z;
        p.y += p.vy * p.z;

        if (p.x < 0 || p.x > canvas.width) p.x = Math.random() * canvas.width;
        if (p.y < 0 || p.y > canvas.height) p.y = Math.random() * canvas.height;

        ctx.fillStyle = glow ? `${color}AA` : `${color}66`;
        ctx.shadowColor = color;
        ctx.shadowBlur = glow ? 12 * p.z : 4 * p.z;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size * p.z, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [count, speed, size, glow, color]);

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

export default ParticleField;

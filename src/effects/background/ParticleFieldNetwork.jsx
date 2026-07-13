// ============================================================
// 🟦 ParticleFieldNetwork — TSolutions IPIDD
// Campo de partículas conectadas (network mode) con glow 3D
// ============================================================

import React, { useEffect, useRef } from "react";

const ParticleFieldNetwork = ({
  count = 140,
  speed = 0.35,
  size = 3,
  linkDistance = 140,
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

    // Crear partículas
    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render de partículas
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

      // Render de conexiones
      ctx.lineWidth = 1;
      particles.forEach((a) => {
        particles.forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < linkDistance) {
            const alpha = 1 - dist / linkDistance;

            ctx.strokeStyle = glow
              ? `${color}${Math.floor(alpha * 180).toString(16)}`
              : `${color}${Math.floor(alpha * 120).toString(16)}`;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, [count, speed, size, linkDistance, glow, color]);

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

export default ParticleFieldNetwork;

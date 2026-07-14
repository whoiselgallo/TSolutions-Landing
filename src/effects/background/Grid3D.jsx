import React, { useEffect, useRef } from "react";
import { UI } from "../../components/ui/ui.config";

const Grid3D = ({
  density = 22,
  speed = 0.35,
  glow = true,
  variant = "turquesa",
  className = "",
}) => {
  const canvasRef = useRef(null);
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

    let offset = 0;
    let animationId;

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

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [density, speed, glow, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 mix-blend-screen ${glow ? "animate-glowPulse" : ""} ${className}`}
    />
  );
};

export default Grid3D;

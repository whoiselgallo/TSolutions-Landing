// ============================================================
// 💡 MouseGlow — TSolutions IPIDD
// Glow dinámico que sigue el cursor con color corporativo
// ============================================================

import React, { useEffect, useRef } from "react";

const MouseGlow = ({
  color = "#00E5FF",
  size = 180,
  opacity = 0.25,
  className = "",
}) => {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    const move = (e) => {
      glow.style.left = `${e.clientX - size / 2}px`;
      glow.style.top = `${e.clientY - size / 2}px`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [size]);

  return (
    <div
      ref={glowRef}
      className={`pointer-events-none fixed rounded-full mix-blend-screen ${className}`}
      style={{
        backgroundColor: `${color}`,
        width: size,
        height: size,
        opacity,
        filter: `blur(${size / 4}px)`,
        zIndex: 5,
      }}
    />
  );
};

export default MouseGlow;

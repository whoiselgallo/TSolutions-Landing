// ============================================================
// 🌀 MouseTrail — TSolutions IPIDD
// Rastro de partículas que siguen el cursor con fade dinámico
// ============================================================

import React, { useEffect } from "react";

const MouseTrail = ({ color = "#00E5FF", size = 6, count = 20 }) => {
  useEffect(() => {
    const trail = [];
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      dot.className = "trail-dot";
      dot.style.position = "fixed";
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.borderRadius = "50%";
      dot.style.backgroundColor = color;
      dot.style.pointerEvents = "none";
      dot.style.opacity = 0.4;
      dot.style.zIndex = 10;
      document.body.appendChild(dot);
      trail.push(dot);
    }

    const move = (e) => {
      trail.forEach((dot, i) => {
        setTimeout(() => {
          dot.style.left = `${e.clientX - size / 2}px`;
          dot.style.top = `${e.clientY - size / 2}px`;
        }, i * 15);
      });
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      trail.forEach((dot) => dot.remove());
    };
  }, [color, size, count]);

  return null;
};

export default MouseTrail;

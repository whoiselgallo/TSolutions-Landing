// ============================================================
// ⚡ useScrollVelocityGlow — TSolutions IPIDD
// Glow dinámico según velocidad de scroll
// ============================================================

import { useEffect, useState } from "react";
import useScroll from "./useScroll";

export default function useScrollVelocityGlow(intensity = 0.35) {
  const { y } = useScroll();
  const [lastY, setLastY] = useState(0);
  const [glow, setGlow] = useState(0);

  useEffect(() => {
    const velocity = Math.abs(y - lastY);
    setLastY(y);

    const mapped = Math.min(velocity / 40, 1) * intensity;
    setGlow(mapped);
  }, [y, lastY, intensity]);

  return {
    style: {
      boxShadow: `0 0 ${glow * 40}px rgba(0,229,255,${glow})`,
    },
  };
}

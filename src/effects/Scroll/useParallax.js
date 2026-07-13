// ============================================================
// 🎢 useParallax — TSolutions IPIDD
// Parallax suave basado en scroll progress
// ============================================================

import { useEffect, useState } from "react";
import useScroll from "./useScroll";

export default function useParallax(strength = 40) {
  const { progress } = useScroll();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const eased = progress ** 0.65; // easing suave corporativo
    setOffset(eased * strength);
  }, [progress, strength]);

  return offset;
}

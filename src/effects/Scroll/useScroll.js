// ============================================================
// 🌀 useScroll — TSolutions IPIDD
// Listener de scroll con throttling y valores normalizados
// ============================================================

import { useEffect, useState } from "react";

export default function useScroll(throttle = 20) {
  const [scroll, setScroll] = useState({
    y: 0,
    direction: "down",
    progress: 0,
  });

  useEffect(() => {
    let last = 0;

    const handleScroll = () => {
      const now = Date.now();
      if (now - last < throttle) return;
      last = now;

      const y = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;

      setScroll({
        y,
        direction: y > scroll.y ? "down" : "up",
        progress: max > 0 ? y / max : 0,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll.y, throttle]);

  return scroll;
}

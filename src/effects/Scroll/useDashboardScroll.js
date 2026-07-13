// ============================================================
// 📊 useDashboardScroll — TSolutions IPIDD
// Efectos de scroll para paneles de Dashboard (Overview, Metrics, Logs)
// Tokens: glowPulse, fadeTurquesa, turquesaSoft, deepGrid
// ============================================================

import { useEffect, useState } from "react";

export default function useDashboardScroll({
  sections = [],
  glowIntensity = 0.35,
  velocityFactor = 40,
  threshold = 0.25,
} = {}) {
  const [activeSection, setActiveSection] = useState(null);
  const [velocityGlow, setVelocityGlow] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      // -----------------------------
      // 1. Velocidad → Glow dinámico
      // -----------------------------
      const velocity = Math.abs(y - lastY);
      setLastY(y);

      const mappedGlow = Math.min(velocity / velocityFactor, 1) * glowIntensity;
      setVelocityGlow(mappedGlow);

      // -----------------------------
      // 2. Detectar sección activa
      // -----------------------------
      let current = null;

      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const visible = rect.top < window.innerHeight * (1 - threshold) &&
                        rect.bottom > window.innerHeight * threshold;

        if (visible) current = sec.id;
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, glowIntensity, velocityFactor, threshold, lastY]);

  return {
    activeSection,
    glowStyle: {
      boxShadow: `0 0 ${velocityGlow * 40}px rgba(0,229,255,${velocityGlow})`,
    },
    isScrollingFast: velocityGlow > 0.25,
  };
}

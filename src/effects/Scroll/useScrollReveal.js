// ============================================================
// ✨ useScrollReveal — TSolutions IPIDD
// Revela elementos al entrar en viewport con animaciones corporativas
// ============================================================

import { useEffect, useState, useRef } from "react";

export default function useScrollReveal({
  threshold = 0.15,
  animation = "animate-fadeTurquesa",
} = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return {
    ref,
    className: visible ? animation : "opacity-0 translate-y-4",
  };
}

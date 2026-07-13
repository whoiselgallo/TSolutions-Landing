// ============================================================
// 🚀 HeroTitle — TSolutions IPIDD
// Combina NeonText + Typewriter para títulos hero futuristas
// ============================================================

import React from "react";
import NeonText from "./NeonText";
import Typewriter from "./Typewriter";

const HeroTitle = ({
  title = "TSolutions IPIDD",
  subtitle = "Tecnología, diseño y automatización para el futuro.",
  variant = "hero",
  glow = true,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <NeonText variant={variant} size="mega" glow={glow}>
        {title}
      </NeonText>

      <Typewriter
        text={subtitle}
        speed={45}
        variant={variant}
        glow={glow}
        className="mt-1"
      />
    </div>
  );
};

export default HeroTitle;

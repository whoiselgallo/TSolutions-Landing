import React from "react";

export default function Avatar({
  src,
  alt = "avatar",
  size = "md",
  glow = false,
  border = false,
  className = "",
}) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
  };

  const glowEffect = glow ? "shadow-glowEnergy" : "";
  const borderEffect = border ? "border border-blancoPuro" : "";
  const fallbackChar = (alt || "A").toString().substring(0, 1).toUpperCase();

  return (
    <div
      className={`rounded-full overflow-hidden bg-negroProfundo flex items-center justify-center font-inter ${sizes[size]} ${glowEffect} ${borderEffect} ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-blancoPuro opacity-80">
          {fallbackChar}
        </span>
      )}
    </div>
  );
}

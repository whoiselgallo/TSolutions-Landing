import React, { useState } from "react";

export default function Input({
  label,
  glow = false,
  value,
  onChange,
  className = "",
  ...props
}) {
  const [focus, setFocus] = useState(false);

  return (
    <div className="relative w-full">
      {label && (
        <label
          className={`
            absolute left-3 transition-all duration-300 pointer-events-none
            ${focus || value ? "top-1 text-xs text-aquaTurquesa" : "top-3 text-blancoPuro/60"}
          `}
        >
          {label}
        </label>
      )}

      <input
        {...props}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`
          w-full bg-midnightPanel text-blancoPuro border border-deepGrid
          rounded-medium px-3 py-3 font-inter outline-none transition duration-300
          ${glow ? "shadow-glowTurquesaSoft focus:shadow-glowTurquesaHover" : ""}
          ${className}
        `}
      />
    </div>
  );
}

import React from "react";

export default function Select({
  label,
  glow = false,
  options = [],
  value,
  onChange,
  className = "",
  ...props
}) {
  return (
    <div className="relative w-full">
      {label && (
        <label className="block mb-2 text-aquaTurquesa font-inter">
          {label}
        </label>
      )}

      <select
        {...props}
        value={value}
        onChange={onChange}
        className={`
          w-full bg-midnightPanel text-blancoPuro border border-deepGrid
          rounded-medium px-3 py-3 font-inter outline-none transition duration-300
          appearance-none cursor-pointer
          ${glow ? "shadow-glowTurquesaSoft hover:shadow-glowTurquesaHover" : ""}
          ${className}
        `}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-aquaTurquesa pointer-events-none z-10">
        ▼
      </div>
    </div>
  );
}

import React from "react";

export default function Slider({
  label,
  glow = true,
  value,
  onChange,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-aquaTurquesa font-inter">
          {label}
        </label>
      )}

      <input
        type="range"
        {...props}
        value={value}
        onChange={onChange}
        className={`
          w-full h-2 bg-deepGrid rounded-full appearance-none cursor-pointer
          accent-aquaTurquesa
          ${glow ? "shadow-glowTurquesaSoft" : ""}
          ${className}
        `}
      />

      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 18px;
            height: 18px;
            background: var(--color-aquaTurquesa);
            border-radius: var(--radiusFull);
            box-shadow: var(--glowTurquesaSoft);
            transition: 0.3s ease;
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            box-shadow: var(--glowTurquesaHover);
          }
        `}
      </style>
    </div>
  );
}

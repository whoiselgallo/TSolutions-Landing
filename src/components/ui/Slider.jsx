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
        <label className="block mb-2 text-naranjaEnergy font-inter text-sm">
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
          accent-naranjaEnergy
          ${glow ? "shadow-glowEnergy" : ""}
          ${className}
        `}
      />

      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 18px;
            height: 18px;
            background: var(--color-naranjaEnergy);
            border-radius: var(--radiusFull);
            box-shadow: 0 0 8px rgba(249,115,22,0.4);
            transition: 0.3s ease;
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            box-shadow: 0 0 14px rgba(249,115,22,0.8);
          }
        `}
      </style>
    </div>
  );
}

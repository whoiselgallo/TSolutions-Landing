import React from "react";

export default function Select({
  label,
  glow = false,
  options = [],
  value,
  onChange,
  placeholder = "Selecciona una opción",
  size = "md",
  variant = "default",
  error = false,
  disabled = false,
  className = "",
  ...props
}) {
  const sizes = {
    mini: "px-2 py-2 text-xs rounded-soft",
    md: "px-3 py-3 text-sm rounded-medium",
    lg: "px-4 py-4 text-base rounded-large",
  };

  const variants = {
    default: "bg-midnightPanel text-blancoPuro border border-deepGrid",
    soft: "bg-midnightSoft text-blancoPuro",
    outline: "bg-transparent border border-naranjaEnergy text-naranjaEnergy",
    ghost: "bg-transparent text-blancoPuro border border-blancoPuro",
  };

  const glowEffect = glow
    ? "shadow-glowEnergy hover:shadow-glowEnergyHover"
    : "";

  const errorEffect = error
    ? "border-naranjaEnergy text-naranjaEnergy"
    : "";

  return (
    <div className="relative w-full">
      {label && (
        <label className="block mb-2 text-naranjaEnergy font-inter text-sm">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          {...props}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={`
            w-full outline-none transition duration-300 appearance-none cursor-pointer pr-10
            ${sizes[size]}
            ${variants[variant]}
            ${glowEffect}
            ${errorEffect}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${className}
          `}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}

          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Ícono corporativo */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-naranjaEnergy pointer-events-none z-10">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {error && (
        <p className="text-naranjaEnergy text-sm font-inter mt-1 animate-fadeTurquesa">
          {error}
        </p>
      )}
    </div>
  );
}

import React from "react";

export default function Toggle({
  checked,
  onChange,
  label,
  className = "",
  ...props
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`
          w-12 h-6 rounded-full flex items-center px-1
          transition-all duration-300
          ${checked ? "bg-aquaTurquesa" : "bg-deepGrid"}
        `}
        {...props}
      >
        <span
          className={`
            w-4 h-4 rounded-full bg-blancoPuro shadow-glowTurquesaSoft
            transform transition-all duration-300
            ${checked ? "translate-x-6" : "translate-x-0"}
          `}
        />
      </button>

      {label && (
        <span className="text-blancoPuro font-inter">
          {label}
        </span>
      )}
    </div>
  );
}

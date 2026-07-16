import React from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  glow = true,
  className = "",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeTurquesa">

      <div className="absolute inset-0" onClick={onClose} />

      <div
        className={`
          relative bg-midnightPanel text-blancoPuro p-8 rounded-large w-[90%] max-w-lg shadow-card
          transition-all duration-300
          ${glow ? "shadow-glowEnergy hover:shadow-glowEnergyHover border border-naranjaEnergy/25" : ""}
          ${className}
        `}
      >
        {title && (
          <h2 className="text-2xl font-bruno text-naranjaEnergy mb-4">
            {title}
          </h2>
        )}

        {children}

        <button
          onClick={onClose}
          className="mt-6 px-6 py-3 bg-naranjaEnergy text-negroProfundo rounded-medium font-bruno hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] transition duration-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

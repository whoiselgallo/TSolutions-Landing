import React, { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  glow = true,
  className = "",
}) {
  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 animate-fadeTurquesa overflow-y-auto py-6 px-4">

      {/* Clic en el fondo cierra el modal */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className={`
          relative bg-midnightPanel text-blancoPuro p-8 rounded-large w-full max-w-lg shadow-card
          transition-all duration-300 my-auto
          ${glow ? "shadow-glowEnergy hover:shadow-glowEnergyHover border border-naranjaEnergy/25" : ""}
          ${className}
        `}
      >
        {/* Botón X para cerrar arriba */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 text-white/40 hover:text-naranjaEnergy transition-colors text-xl leading-none"
        >
          ✕
        </button>

        {title && (
          <h2 className="text-2xl font-bruno text-naranjaEnergy mb-4 pr-8">
            {title}
          </h2>
        )}

        {/* Contenido con scroll propio si el modal es muy alto */}
        <div className="max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-naranjaEnergy/30 scrollbar-track-transparent">
          {children}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full px-6 py-3 bg-naranjaEnergy text-negroProfundo rounded-medium font-bruno hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] transition duration-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

import React from "react";

export default function Loader({ text = "Cargando..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-negroProfundo text-blancoPuro">
      <div className="w-16 h-16 border-4 border-aquaTurquesa border-t-transparent rounded-full animate-spin shadow-glowTurquesaSoft"></div>
      <p className="mt-6 text-aquaTurquesa font-bruno animate-pulse">
        {text}
      </p>
    </div>
  );
}

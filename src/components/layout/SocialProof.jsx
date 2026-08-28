import React from "react";

export default function SocialProof() {
  return (
    <section className="py-12 bg-midnightPanel/50 border-b border-blancoPuro/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs uppercase tracking-widest text-humo font-bold mb-8">
          Proyectos, comercios e industrias que confían en nuestro estándar
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-5 rounded-medium bg-negroProfundo/70 border border-naranjaEnergy/20 shadow-card">
            <p className="text-2xl sm:text-3xl font-bruno text-naranjaEnergy">+100%</p>
            <p className="text-xs text-humo mt-1 font-medium">Independencia Operativa</p>
          </div>
          <div className="p-5 rounded-medium bg-negroProfundo/70 border border-naranjaEnergy/20 shadow-card">
            <p className="text-2xl sm:text-3xl font-bruno text-blancoPuro">0 Fugas</p>
            <p className="text-xs text-humo mt-1 font-medium">En Google Maps y Ubicaciones</p>
          </div>
          <div className="p-5 rounded-medium bg-negroProfundo/70 border border-naranjaEnergy/20 shadow-card">
            <p className="text-2xl sm:text-3xl font-bruno text-naranjaEnergy">3 Dominios</p>
            <p className="text-xs text-humo mt-1 font-medium">Cognitivo, Psicomotor, Afectivo</p>
          </div>
          <div className="p-5 rounded-medium bg-negroProfundo/70 border border-naranjaEnergy/20 shadow-card">
            <p className="text-2xl sm:text-3xl font-bruno text-blancoPuro">Constancia</p>
            <p className="text-xs text-humo mt-1 font-medium">De Aprendizaje & Dominio</p>
          </div>
        </div>
      </div>
    </section>
  );
}

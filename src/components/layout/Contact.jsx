import React from "react";

export default function Contact() {
  return (
    <section className="py-24 bg-negroProfundo text-blancoPuro flex flex-col justify-center items-center px-6 border-b border-blancoPuro/5">
      <div className="w-full max-w-lg bg-midnightPanel border border-naranjaEnergy/20 p-8 rounded-medium shadow-card backdrop-blur-sm relative overflow-hidden">
        
        {/* Glow de fondo */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-naranjaEnergy/10 rounded-full blur-3xl pointer-events-none"></div>

        <h2 className="font-bruno text-3xl text-center mb-8 text-blancoPuro tracking-wider">
          Iniciar <span className="text-naranjaEnergy">Proyecto</span>
        </h2>

        <form className="flex flex-col gap-6 w-full">
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label className="font-montserratSlim text-xs text-blancoPuro/70 tracking-widest uppercase">
              Nombre Completo
            </label>
            <input
              type="text"
              className="min-h-input border border-blancoPuro/10 rounded-soft px-4 py-3 bg-negroProfundo/50 text-blancoPuro font-inter text-sm focus:border-naranjaEnergy outline-none transition-all duration-300 placeholder-blancoPuro/30 focus:shadow-[0_0_12px_rgba(249,115,22,0.15)]"
              placeholder="Ej. Juan Pérez"
            />
          </div>

          {/* Correo */}
          <div className="flex flex-col gap-2">
            <label className="font-montserratSlim text-xs text-blancoPuro/70 tracking-widest uppercase">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="min-h-input border border-blancoPuro/10 rounded-soft px-4 py-3 bg-negroProfundo/50 text-blancoPuro font-inter text-sm focus:border-naranjaEnergy outline-none transition-all duration-300 placeholder-blancoPuro/30 focus:shadow-[0_0_12px_rgba(249,115,22,0.15)]"
              placeholder="juan@empresa.com"
            />
          </div>

          {/* Mensaje */}
          <div className="flex flex-col gap-2">
            <label className="font-montserratSlim text-xs text-blancoPuro/70 tracking-widest uppercase">
              Mensaje / Requerimiento
            </label>
            <textarea
              rows={4}
              className="border border-blancoPuro/10 rounded-soft px-4 py-3 bg-negroProfundo/50 text-blancoPuro font-inter text-sm focus:border-naranjaEnergy outline-none transition-all duration-300 placeholder-blancoPuro/30 focus:shadow-[0_0_12px_rgba(249,115,22,0.15)] resize-none"
              placeholder="Describe brevemente tu proyecto o necesidad tecnológica..."
            />
          </div>

          {/* Botón */}
          <button className="py-4 bg-naranjaEnergy text-negroProfundo font-bruno text-sm rounded-soft mt-4 hover:bg-naranjaEnergy/90 shadow-glowEnergy hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300 transform active:scale-95">
            Enviar Solicitud
          </button>
        </form>
      </div>
    </section>
  );
}

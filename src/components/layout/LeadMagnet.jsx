import React from "react";

export default function LeadMagnet() {
  return (
    <section className="py-16 bg-negroProfundo border-b border-blancoPuro/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-8 sm:p-12 rounded-large bg-midnightPanel border border-naranjaEnergy/30 shadow-glowEnergy relative overflow-hidden flex flex-col md:flex-row items-center gap-8 text-left">
          
          {/* 3D Visual Asset — Ampliado */}
          <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-large overflow-hidden shrink-0 border border-naranjaEnergy/40 shadow-glowEnergy bg-negroProfundo p-2 flex items-center justify-center">
            <img
              src="/assets/iconografia/E-book_icon_design_2K_202608271204.jpeg"
              onError={(e) => { e.target.src = "/assets/iconografia/medirimpacto.jpeg"; }}
              alt="Diagnóstico de Madurez Digital"
              className="w-full h-full object-contain rounded-medium"
            />
          </div>

          <div>
            <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy border border-naranjaEnergy/30 inline-block mb-3">
              🎁 Incentivo de Conversión Inmediata
            </span>

            <h3 className="font-bruno text-2xl sm:text-3xl text-blancoPuro mb-3">
              ¿No sabes con qué paquete iniciar?
            </h3>

            <p className="text-humo text-xs sm:text-sm mb-6 leading-relaxed">
              Solicita hoy mismo tu <strong>Auditoría de Fugas Operativas y Diagnóstico de Madurez Digital</strong>. Recibe un reporte PDF detallado y una sesión estratégica 1 a 1 de 20 minutos con nuestro Estratega Tecnológico sin costo alguno.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/diagnostico"
                className="inline-flex items-center gap-2 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs sm:text-sm px-6 py-3.5 rounded-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-glowEnergy"
              >
                <span>🚀 Llenar Diagnóstico (2 min)</span>
                <span>→</span>
              </a>
              <a
                href="/agenda"
                className="inline-flex items-center gap-2 bg-negroProfundo hover:bg-midnightPanel text-blancoPuro border border-white/15 font-bruno text-xs sm:text-sm px-5 py-3.5 rounded-medium transition-all"
              >
                <span>📅 Agendar Sesión 1 a 1</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

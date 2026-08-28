import React from "react";

export default function LeadMagnet() {
  return (
    <section className="py-16 bg-negroProfundo border-b border-blancoPuro/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-8 sm:p-12 rounded-large bg-midnightPanel border border-naranjaEnergy/30 shadow-glowEnergy relative overflow-hidden flex flex-col md:flex-row items-center gap-8 text-left">
          
          {/* 3D Visual Asset */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-large overflow-hidden shrink-0 border border-naranjaEnergy/40 shadow-glowEnergy bg-negroProfundo">
            <img
              src="/assets/iconografia/E-book_icon_design_2K_202608271204.jpeg"
              onError={(e) => { e.target.src = "/assets/iconografia/medir impacto.jpg"; }}
              alt="Diagnóstico de Madurez Digital"
              className="w-full h-full object-cover"
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

            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-blancoPuro hover:bg-blancoPerla text-negroProfundo font-bruno text-xs sm:text-sm px-6 py-3.5 rounded-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-card"
            >
              <span>Solicitar Diagnóstico Gratuito</span>
              <span>→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

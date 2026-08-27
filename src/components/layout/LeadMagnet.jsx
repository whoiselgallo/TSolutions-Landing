import React from "react";

export default function LeadMagnet() {
  return (
    <section className="py-16 bg-negroProfundo border-b border-blancoPuro/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-8 sm:p-12 rounded-large bg-midnightPanel border border-naranjaEnergy/30 shadow-glowEnergy relative overflow-hidden">
          
          <span className="text-xs font-bold uppercase px-3.5 py-1.5 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy border border-naranjaEnergy/30">
            🎁 Incentivo de Conversión Inmediata
          </span>

          <h3 className="font-bruno text-2xl sm:text-3xl text-blancoPuro mt-4 mb-3">
            ¿No sabes con qué paquete iniciar?
          </h3>

          <p className="text-humo text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Solicita hoy mismo tu <strong>Auditoría de Fugas Operativas y Diagnóstico de Madurez Digital</strong>. Recibe un reporte PDF detallado y una sesión estratégica 1 a 1 de 20 minutos con nuestro Estratega Tecnológico sin costo alguno.
          </p>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-blancoPuro hover:bg-blancoPerla text-negroProfundo font-bruno text-sm px-8 py-4 rounded-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-card"
          >
            <span>Solicitar Diagnóstico Gratuito</span>
            <span>→</span>
          </a>

        </div>
      </div>
    </section>
  );
}

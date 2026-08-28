import React from "react";

export default function Differentiator() {
  return (
    <section className="py-20 bg-midnightPanel/70 border-b border-blancoPuro/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="bg-negroProfundo border border-naranjaEnergy/40 rounded-large p-8 sm:p-12 relative overflow-hidden shadow-card">
          <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-naranjaEnergy/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-medium overflow-hidden border border-naranjaEnergy/40 shadow-glowEnergy shrink-0 bg-midnightPanel">
              <img
                src="/assets/iconografia/certificación.jpg"
                onError={(e) => { e.target.src = "/assets/iconografia/Certification_icon.jpg"; }}
                alt="Constancia de Aprendizaje y Dominio Tecnológico"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-naranjaEnergy">El Diferenciador TSolutions IPIDD</span>
              <h3 className="font-bruno text-xl sm:text-3xl text-blancoPuro">Consultoría Formativa & Transferencia de Conocimiento</h3>
            </div>
          </div>

          <p className="text-blancoPuro/90 text-sm sm:text-base leading-relaxed mb-8">
            La promesa central de TSolutions IPIDD no termina en el despliegue del software. Al finalizar la implementación, capacitamos a tu personal bajo <strong>principios andragógicos</strong> cubriendo los 3 dominios esenciales para asegurar que tu equipo venza la resistencia al cambio y opere con total soltura:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="p-5 rounded-medium bg-midnightPanel border border-white/5 flex flex-col justify-between group">
              <div>
                <div className="w-full h-28 rounded-medium overflow-hidden mb-3 border border-white/10 bg-negroProfundo">
                  <img
                    src="/assets/iconografia/aprendizaje cognitivo.jpg"
                    alt="Dominio Cognitivo"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 opacity-85"
                  />
                </div>
                <h4 className="font-bruno text-sm text-blancoPuro mb-1">Dominio Cognitivo</h4>
                <p className="text-xs text-humo leading-relaxed">Comprensión lógica de la arquitectura, flujos y el por qué de cada herramienta digital.</p>
              </div>
            </div>

            <div className="p-5 rounded-medium bg-midnightPanel border border-white/5 flex flex-col justify-between group">
              <div>
                <div className="w-full h-28 rounded-medium overflow-hidden mb-3 border border-white/10 bg-negroProfundo">
                  <img
                    src="/assets/iconografia/psychomotor_learning.jpg"
                    alt="Dominio Psicomotor"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 opacity-85"
                  />
                </div>
                <h4 className="font-bruno text-sm text-blancoPuro mb-1">Dominio Psicomotor</h4>
                <p className="text-xs text-humo leading-relaxed">Manejo ágil del panel, pedidos, despachos logísticos y actualización continua de catálogos.</p>
              </div>
            </div>

            <div className="p-5 rounded-medium bg-midnightPanel border border-white/5 flex flex-col justify-between group">
              <div>
                <div className="w-full h-28 rounded-medium overflow-hidden mb-3 border border-white/10 bg-negroProfundo">
                  <img
                    src="/assets/iconografia/dominio afectivo.jpg"
                    alt="Dominio Afectivo"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 opacity-85"
                  />
                </div>
                <h4 className="font-bruno text-sm text-blancoPuro mb-1">Dominio Afectivo</h4>
                <p className="text-xs text-humo leading-relaxed">Apropiación cultural de la tecnología, confianza y erradicación total del miedo al cambio.</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-medium bg-naranjaEnergy/10 border border-naranjaEnergy/30 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded overflow-hidden shrink-0 border border-naranjaEnergy/40">
              <img src="/assets/iconografia/Certification_icon.jpg" alt="Constancia de Aprendizaje" className="w-full h-full object-cover" />
            </div>
            <p className="text-xs text-blancoPuro leading-relaxed">
              <strong>Constancia de Aprendizaje:</strong> Como facilitadores tecnológicos, otorgamos la <em>Constancia de Participación, Aprendizaje y Dominio Tecnológico</em> emitida por TSolutions (reconocimiento formativo interno de habilidades para tu equipo, sin validez ante la STPS), asegurando que tu negocio alcance una verdadera independencia operativa.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

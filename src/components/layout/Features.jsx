import React from "react";
import MagneticCard from "../../effects/mouse/MagneticCard";

export default function Features() {
  return (
    <section className="py-20 px-8 bg-negroProfundo text-blancoPuro border-t border-b border-blancoPuro/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-bruno text-3xl text-center mb-12 tracking-wider text-blancoPuro">
          Nuestras <span className="text-naranjaEnergy">Características</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <MagneticCard>
            <div className="min-h-card p-6 rounded-soft bg-midnightPanel border border-naranjaEnergy/20 hover:border-naranjaEnergy/60 transition-all duration-300 shadow-card flex flex-col justify-between h-full hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]">
              <div>
                <h3 className="font-bruno text-xl text-naranjaEnergy mb-3">
                  Automatización
                </h3>
                <p className="font-inter text-sm text-blancoPuro/70 leading-relaxed">
                  Procesos inteligentes para optimizar tu flujo de trabajo de manera eficiente y autónoma.
                </p>
              </div>
              <div className="h-1 w-12 bg-naranjaEnergy mt-6"></div>
            </div>
          </MagneticCard>

          {/* Card 2 */}
          <MagneticCard>
            <div className="min-h-card p-6 rounded-soft bg-midnightPanel border border-blancoPuro/15 hover:border-blancoPuro/30 transition-all duration-300 shadow-card flex flex-col justify-between h-full hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <div>
                <h3 className="font-bruno text-xl text-blancoPuro mb-3">
                  Integración
                </h3>
                <p className="font-inter text-sm text-blancoPuro/70 leading-relaxed">
                  Conecta tus sistemas y APIs en una sola plataforma unificada de alto rendimiento.
                </p>
              </div>
              <div className="h-1 w-12 bg-blancoPuro/50 mt-6"></div>
            </div>
          </MagneticCard>

          {/* Card 3 */}
          <MagneticCard>
            <div className="min-h-card p-6 rounded-soft bg-midnightPanel border border-naranjaEnergy/20 hover:border-naranjaEnergy/60 transition-all duration-300 shadow-card flex flex-col justify-between h-full hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]">
              <div>
                <h3 className="font-bruno text-xl text-naranjaEnergy mb-3">
                  Escalabilidad
                </h3>
                <p className="font-inter text-sm text-blancoPuro/70 leading-relaxed">
                  Infraestructura robusta y modular diseñada para crecer contigo sin límites.
                </p>
              </div>
              <div className="h-1 w-12 bg-naranjaEnergy mt-6"></div>
            </div>
          </MagneticCard>

        </div>
      </div>
    </section>
  );
}

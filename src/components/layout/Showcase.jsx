import React from "react";
import MagneticCard from "../../effects/mouse/MagneticCard";

export default function Showcase() {
  return (
    <section className="py-20 px-8 bg-deepGrid text-blancoPuro border-b border-blancoPuro/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-bruno text-3xl text-center mb-12 tracking-wider">
          Proyectos <span className="text-naranjaEnergy">Destacados</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <MagneticCard>
            <div className="p-8 rounded-soft bg-midnightPanel border border-blancoPuro/10 hover:border-blancoPuro/30 transition-all duration-300 shadow-card flex flex-col justify-between h-full hover:shadow-[0_0_25px_rgba(255,255,255,0.05)]">
              <div>
                <h3 className="font-bruno text-2xl text-blancoPuro mb-3">
                  Proyecto A
                </h3>
                <p className="font-inter text-sm text-blancoPuro/75 leading-relaxed">
                  Integración de Inteligencia Artificial avanzada para atención al cliente y optimización del soporte técnico empresarial.
                </p>
              </div>
              <div className="mt-8 text-xs font-bruno text-aquaTurquesa">#IA #AUTOMATION</div>
            </div>
          </MagneticCard>

          {/* Card 2 */}
          <MagneticCard>
            <div className="p-8 rounded-soft bg-midnightPanel border border-naranjaEnergy/25 hover:border-naranjaEnergy/65 transition-all duration-300 shadow-card flex flex-col justify-between h-full hover:shadow-[0_0_25px_rgba(249,115,22,0.15)]">
              <div>
                <h3 className="font-bruno text-2xl text-naranjaEnergy mb-3">
                  Proyecto B
                </h3>
                <p className="font-inter text-sm text-blancoPuro/75 leading-relaxed">
                  Automatización total de procesos contables e internos utilizando bots RPA de alta precisión y velocidad.
                </p>
              </div>
              <div className="mt-8 text-xs font-bruno text-naranjaEnergy">#RPA #EFFICIENCY</div>
            </div>
          </MagneticCard>

        </div>
      </div>
    </section>
  );
}

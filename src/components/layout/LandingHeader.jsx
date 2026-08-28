import React from "react";

export default function LandingHeader() {
  return (
    <header className="w-full border-b border-white/10 bg-negroProfundo/95 backdrop-blur-md sticky top-0 z-40 py-3 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO OFICIAL TSOLUTIONS (Sin menús para evitar fugas de atención) */}
        <div className="flex items-center gap-3">
          <div 
            className="w-11 h-11 border border-naranjaEnergy bg-midnightPanel flex items-center justify-center p-1.5 shadow-glowEnergy"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          >
            <img 
              src="/assets/TSolutionslogo/logoTSVG.svg" 
              onError={(e) => { e.target.src = "/assets/TSolutionslogo/logoWEBP.webp"; }}
              alt="TSolutions Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div>
            <div className="font-bruno text-sm sm:text-base tracking-wider text-blancoPuro flex items-center gap-1.5">
              TSOLUTIONS <span className="text-naranjaEnergy text-xs font-sans font-bold px-1.5 py-0.5 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30">IPIDD</span>
            </div>
            <p className="text-[10px] text-humo tracking-widest hidden sm:block">
              TECNOLOGÍA INSTALADA &bull; CONOCIMIENTO TRANSFERIDO &bull; NEGOCIOS ESCALADOS
            </p>
          </div>
        </div>

        {/* CTA RÁPIDO */}
        <a 
          href="#contacto" 
          className="inline-flex items-center gap-2 bg-naranjaEnergy/20 hover:bg-naranjaEnergy text-naranjaEnergy hover:text-white border border-naranjaEnergy/50 hover:border-naranjaEnergy px-4 py-2 rounded-medium text-xs font-bold transition-all duration-300 shadow-glowEnergy"
        >
          <span>Cotizar Proyecto</span>
          <span className="text-sm">→</span>
        </a>

      </div>
    </header>
  );
}

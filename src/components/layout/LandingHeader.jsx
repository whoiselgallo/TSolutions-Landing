import React from "react";
import logoImg from "../../assets/logo-tsolutions.webp";

export default function LandingHeader() {
  return (
    <header className="w-full border-b border-white/10 bg-negroProfundo/90 backdrop-blur-md sticky top-0 z-40 py-3.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO & BRANDING (Sin menús de navegación para evitar fugas de atención) */}
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 border border-naranjaEnergy bg-midnightPanel flex items-center justify-center shadow-glowEnergy"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          >
            <img src={logoImg} alt="TSolutions Logo" className="w-6 h-auto object-contain" />
          </div>
          <div>
            <div className="font-bruno text-sm sm:text-base tracking-wider text-blancoPuro flex items-center gap-1.5">
              TSOLUTIONS <span className="text-naranjaEnergy text-xs font-sans font-bold px-1.5 py-0.5 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30">IPIDD</span>
            </div>
            <p className="text-[10px] text-humo tracking-widest hidden sm:block">
              TECNOLOGÍA INSTALADA &bull; CONOCIMIENTO TRANSFERIDO
            </p>
          </div>
        </div>

        {/* CTA RÁPIDO DE CONVERSIÓN */}
        <a 
          href="#contacto" 
          className="inline-flex items-center gap-2 bg-naranjaEnergy/15 hover:bg-naranjaEnergy text-naranjaEnergy hover:text-white border border-naranjaEnergy/40 hover:border-naranjaEnergy px-4 py-2 rounded-medium text-xs font-bold transition-all duration-300 shadow-glowEnergy"
        >
          <span>Cotizar Proyecto</span>
          <span className="text-sm">→</span>
        </a>

      </div>
    </header>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function LandingHeader() {
  return (
    <header className="w-full border-b border-white/10 bg-negroProfundo/95 backdrop-blur-md sticky top-0 z-40 py-3.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO OFICIAL TSOLUTIONS — ÚNICO ELEMENTO SUPERIOR */}
        <Link to="/" className="flex items-center gap-3 group">
          <div 
            className="w-11 h-11 border border-naranjaEnergy bg-midnightPanel flex items-center justify-center p-1.5 shadow-glowEnergy group-hover:scale-105 transition-transform"
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
        </Link>

        {/* DISTINTIVO DE CALIDAD */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-humo bg-midnightPanel/70 border border-white/5 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Plataforma Oficial &bull; Consultoría & Ecosistemas</span>
        </div>

      </div>
    </header>
  );
}

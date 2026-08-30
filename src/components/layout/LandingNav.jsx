import React from "react";
import { Link } from "react-router-dom";

export default function LandingNav() {
  return (
    <nav className="w-full bg-negroProfundo/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 py-3 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LEMA OFICIAL AL EXTREMO IZQUIERDO (Reemplaza al indicador de plataforma) */}
        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono tracking-wider text-humo border border-white/10 px-3.5 py-1.5 rounded-full bg-midnightPanel/60 shadow-inner">
          <span className="text-naranjaEnergy font-bold">Tecnología Instalada</span>
          <span className="text-white/30">|</span>
          <span className="text-cyan-400 font-bold">Conocimiento Transferido</span>
          <span className="text-white/30">|</span>
          <span className="text-amber-300 font-bold">Negocios Escalados</span>
        </div>

        {/* LOGO OFICIAL CON CARACTERÍSTICAS OFICIALES PNG/WEBP */}
        <Link to="/" className="flex items-center gap-3 group mx-auto md:mx-0">
          <div 
            className="w-10 h-10 border border-naranjaEnergy bg-midnightPanel flex items-center justify-center p-1.5 shadow-glowEnergy group-hover:scale-105 transition-transform"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          >
            <img 
              src="/assets/TSolutionslogo/logoTSVG.svg" 
              onError={(e) => { e.target.src = "/assets/TSolutionslogo/logoWEBP.webp"; }}
              alt="TSolutions IPIDD Logo Oficial" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div>
            <div className="font-bruno text-sm sm:text-base tracking-wider text-blancoPuro flex items-center gap-1.5">
              TSOLUTIONS <span className="text-naranjaEnergy text-xs font-sans font-bold px-1.5 py-0.5 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30">IPIDD</span>
            </div>
          </div>
        </Link>

        {/* ACCESO PRIVADO DIRECTO AL PORTAL */}
        <div className="flex items-center gap-2">
          <Link
            to="/portal-cliente"
            className="text-xs font-bold text-blancoPuro bg-midnightPanel hover:bg-negroProfundo border border-white/10 px-3.5 py-2 rounded-medium transition shadow-card"
          >
            Portal Clientes →
          </Link>
        </div>

      </div>
    </nav>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import videoBg from "../../assets/videos/VIDTS.mp4";

export default function LandingHero() {
  return (
    <section className="relative w-full min-h-[85vh] bg-negroProfundo text-blancoPuro flex flex-col items-center justify-center px-4 sm:px-6 py-16 text-center overflow-hidden border-b border-blancoPuro/5">
      
      {/* ===== BACKGROUND VIDEO & GLOWS ===== */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 mix-blend-screen pointer-events-none"
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-naranjaEnergy/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* ===== CONTENT WRAPPER ===== */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full">
        
        {/* BADGE DE IDENTIDAD */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnightPanel border border-naranjaEnergy/40 text-naranjaEnergy text-xs sm:text-sm font-semibold mb-6 shadow-glowEnergy">
          <span className="w-2 h-2 rounded-full bg-naranjaEnergy animate-ping"></span>
          <span>Ecosistemas Digitales &bull; Consultoría Estratégica para PYMES</span>
        </div>

        {/* LOGOTIPO OFICIAL TSOLUTIONS */}
        <div className="relative flex flex-col items-center justify-center mb-6">
          <div 
            className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 border-2 border-naranjaEnergy shadow-glowEnergy animate-glowPulse bg-midnightPanel/90 backdrop-blur-md p-3"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          >
            <img 
              src="/assets/TSolutionslogo/logoTSVG.svg" 
              onError={(e) => { e.target.src = "/assets/TSolutionslogo/logoWEBP.webp"; }}
              alt="TSolutions Logo Oficial" 
              className="relative z-10 w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* H1 (HEADLINE): DOLOR DIRECTO Y PROMESA */}
        <h1 className="font-bruno text-3xl sm:text-5xl lg:text-6xl text-blancoPuro tracking-wide leading-tight sm:leading-tight mb-6 max-w-4xl">
          Recupera el <span className="text-naranjaEnergy drop-shadow-md">control operativo</span> y escala tu negocio con tecnología que tu equipo sí domina.
        </h1>

        {/* SUBTÍTULO DE ALTO IMPACTO */}
        <p className="font-inter text-base sm:text-xl text-blancoPuro/90 max-w-3xl leading-relaxed mb-8">
          Erradicamos el <em>"código huérfano"</em> de las agencias tradicionales. Construimos tu infraestructura digital, capacitamos a tu personal bajo estándares andragógicos y garantizamos tu independencia operativa.
        </p>

        {/* EL LEMA OFICIAL Y SUS 3 PILARES */}
        <div className="w-full max-w-3xl bg-midnightPanel/90 border border-naranjaEnergy/30 rounded-large p-6 mb-8 backdrop-blur-md shadow-card">
          <p className="font-bruno text-base sm:text-xl text-naranjaEnergy tracking-wider mb-4">
            “Tecnología instalada. Conocimiento transferido. Negocios escalados.”
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-3 border-t border-white/10 text-xs text-humo">
            <div className="bg-negroProfundo/70 p-3.5 rounded-medium border border-white/5">
              <span className="text-naranjaEnergy font-bold flex items-center gap-1.5 mb-1.5 text-xs">
                <span className="text-sm">🛠️</span> Tecnología Instalada
              </span>
              <p className="text-[11px] leading-relaxed text-blancoPuro/80">
                Ecosistemas robustos, Smart Web, Full-Stack, IA y APIs de logística para resolver fricciones reales.
              </p>
            </div>
            <div className="bg-negroProfundo/70 p-3.5 rounded-medium border border-white/5">
              <span className="text-naranjaEnergy font-bold flex items-center gap-1.5 mb-1.5 text-xs">
                <span className="text-sm">🎓</span> Conocimiento Transferido
              </span>
              <p className="text-[11px] leading-relaxed text-blancoPuro/80">
                Capacitación andragógica al equipo, manuales SOP y entrega de constancia de aprendizaje y dominio tecnológico.
              </p>
            </div>
            <div className="bg-negroProfundo/70 p-3.5 rounded-medium border border-white/5">
              <span className="text-naranjaEnergy font-bold flex items-center gap-1.5 mb-1.5 text-xs">
                <span className="text-sm">📈</span> Negocios Escalados
              </span>
              <p className="text-[11px] leading-relaxed text-blancoPuro/80">
                Transformación de negocios tradicionales en unidades de alta rentabilidad y verdadera autonomía.
              </p>
            </div>
          </div>
        </div>

        {/* CTA PRINCIPAL (NARANJA ENERGY) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <a
            href="#contacto"
            className="w-full sm:w-auto flex-1 py-4 px-8 bg-naranjaEnergy text-white font-bruno text-base sm:text-lg rounded-medium shadow-glowEnergy hover:shadow-glowEnergyHover hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1 text-center"
          >
            🚀 Agendar Diagnóstico
          </a>
          <Link
            to="/portafolio"
            className="w-full sm:w-auto py-4 px-6 bg-midnightPanel hover:bg-midnightPanel/70 text-blancoPuro border border-white/10 hover:border-naranjaEnergy/50 rounded-medium text-sm font-bold transition-all text-center flex items-center justify-center gap-2"
          >
            <span>📦 Ver Portafolio</span>
            <span className="text-naranjaEnergy">→</span>
          </Link>
        </div>

        {/* SOCIAL BADGES */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-humo">
          <span className="flex items-center gap-1.5"><span className="text-naranjaEnergy font-bold">✓</span> Constancia de Aprendizaje Tecnológico</span>
          <span className="flex items-center gap-1.5"><span className="text-naranjaEnergy font-bold">✓</span> Cero Código Huérfano</span>
          <span className="flex items-center gap-1.5"><span className="text-naranjaEnergy font-bold">✓</span> Zona de Pulgar Mobile-First</span>
        </div>

      </div>

    </section>
  );
}

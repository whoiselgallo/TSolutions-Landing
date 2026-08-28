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
          Recupera el{" "}
          <span className="inline-block text-[1.5em] font-extrabold text-naranjaEnergy drop-shadow-[0_0_18px_rgba(255,107,0,0.9)] hover:drop-shadow-[0_0_32px_rgba(255,107,0,1)] hover:text-[#ff8533] hover:scale-105 transition-all duration-300 cursor-pointer align-baseline px-1 animate-pulse">
            control operativo
          </span>{" "}
          y escala tu negocio.
        </h1>

        {/* SUBTÍTULO DE ALTO IMPACTO */}
        <p className="font-inter text-base sm:text-xl text-blancoPuro/90 max-w-3xl leading-relaxed mb-8">
          Construimos tu infraestructura digital a la medida, capacitamos a tu personal bajo estándares andragógicos y garantizamos tu total independencia operativa.
        </p>

        {/* EL LEMA OFICIAL Y SUS 3 PILARES — MÁXIMA PRESENCIA & FONDO OFICIAL */}
        <div className="w-full max-w-4xl relative rounded-large overflow-hidden border-2 border-naranjaEnergy/60 shadow-glowEnergy mb-10 p-6 sm:p-10 group">
          
          {/* IMAGEN DE FONDO OFICIAL CON OVERLAY DARK CYBERPUNK */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('/assets/iconografia/fondo_naranja_intenso.jpeg')" }}
          ></div>
          <div className="absolute inset-0 bg-negroProfundo/85 backdrop-blur-md"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-negroProfundo via-transparent to-negroProfundo/60"></div>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-naranjaEnergy/25 rounded-full blur-3xl pointer-events-none"></div>

          {/* CONTENIDO INTERNO */}
          <div className="relative z-10">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy border border-naranjaEnergy/40 inline-block mb-3 shadow-glowEnergy">
              🛡️ NUESTRA PROMESA DE VALOR
            </span>

            <h2 className="font-bruno text-xl sm:text-3xl lg:text-4xl text-blancoPuro tracking-wide leading-tight mb-6 drop-shadow-[0_0_20px_rgba(255,107,0,0.6)]">
              “Tecnología instalada. <span className="text-naranjaEnergy">Conocimiento transferido.</span> Negocios escalados.”
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left pt-4 border-t border-white/10">
              
              {/* PILAR 1: TECNOLOGÍA INSTALADA */}
              <div className="bg-negroProfundo/90 backdrop-blur-md p-4 sm:p-5 rounded-large border border-white/10 hover:border-naranjaEnergy/70 hover:shadow-glowEnergy transition-all duration-300 group/card flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-medium overflow-hidden border border-naranjaEnergy/40 shadow-glowEnergy bg-midnightPanel p-1 mb-3 group-hover/card:scale-105 transition-transform">
                    <img 
                      src="/assets/iconografia/tecnologia_instalada_2K_202608280454.jpeg" 
                      alt="Tecnología Instalada" 
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>
                  <strong className="font-bruno text-xs sm:text-sm text-naranjaEnergy block mb-1.5 group-hover/card:text-white transition-colors">
                    🛠️ Tecnología Instalada
                  </strong>
                  <p className="text-[11px] sm:text-xs leading-relaxed text-blancoPuro/85">
                    Ecosistemas robustos, Smart Web, Full-Stack, IA y APIs de logística para resolver fricciones reales.
                  </p>
                </div>
              </div>

              {/* PILAR 2: CONOCIMIENTO TRANSFERIDO */}
              <div className="bg-negroProfundo/90 backdrop-blur-md p-4 sm:p-5 rounded-large border border-white/10 hover:border-naranjaEnergy/70 hover:shadow-glowEnergy transition-all duration-300 group/card flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-medium overflow-hidden border border-naranjaEnergy/40 shadow-glowEnergy bg-midnightPanel p-1 mb-3 group-hover/card:scale-105 transition-transform">
                    <img 
                      src="/assets/iconografia/conocimiento_2K_202608280455.jpeg" 
                      alt="Conocimiento Transferido" 
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>
                  <strong className="font-bruno text-xs sm:text-sm text-naranjaEnergy block mb-1.5 group-hover/card:text-white transition-colors">
                    🎓 Conocimiento Transferido
                  </strong>
                  <p className="text-[11px] sm:text-xs leading-relaxed text-blancoPuro/85">
                    Capacitación andragógica al equipo, manuales SOP y entrega de constancia de aprendizaje y dominio tecnológico.
                  </p>
                </div>
              </div>

              {/* PILAR 3: NEGOCIOS ESCALADOS */}
              <div className="bg-negroProfundo/90 backdrop-blur-md p-4 sm:p-5 rounded-large border border-white/10 hover:border-naranjaEnergy/70 hover:shadow-glowEnergy transition-all duration-300 group/card flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-medium overflow-hidden border border-naranjaEnergy/40 shadow-glowEnergy bg-midnightPanel p-1 mb-3 group-hover/card:scale-105 transition-transform">
                    <img 
                      src="/assets/iconografia/negocio_escalado_2K_202608280458.jpeg" 
                      alt="Negocios Escalados" 
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>
                  <strong className="font-bruno text-xs sm:text-sm text-naranjaEnergy block mb-1.5 group-hover/card:text-white transition-colors">
                    📈 Negocios Escalados
                  </strong>
                  <p className="text-[11px] sm:text-xs leading-relaxed text-blancoPuro/85">
                    Transformación de negocios tradicionales en unidades de alta rentabilidad y verdadera autonomía.
                  </p>
                </div>
              </div>

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
          <span className="flex items-center gap-1.5"><span className="text-naranjaEnergy font-bold">✓</span> Independencia Operativa Total</span>
          <span className="flex items-center gap-1.5"><span className="text-naranjaEnergy font-bold">✓</span> Zona de Pulgar Mobile-First</span>
        </div>

      </div>

    </section>
  );
}

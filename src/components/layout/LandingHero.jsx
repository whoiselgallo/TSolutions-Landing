import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LandingHero() {
  // Coordenadas del mouse para el destello perimetral de la tarjeta
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const compatibleStandards = [
    { name: "Google Workspace", font: "font-sans font-medium" },
    { name: "Vercel", font: "font-sans font-bold tracking-tight" },
    { name: "neon.tech", font: "font-mono font-medium" },
    { name: "Microsoft 365", font: "font-sans font-semibold" },
    { name: "Open IA", font: "font-sans font-bold" },
    { name: "Dify", font: "font-sans font-extrabold" },
    { name: "Hostinger", font: "font-sans font-medium" },
    { name: "GitHub", font: "font-sans font-bold" },
    { name: "Render", font: "font-mono font-bold" },
    { name: "GoDaddy", font: "font-sans font-semibold" },
  ];

  return (
    <section className="bg-negroProfundo text-blancoPuro relative overflow-hidden pt-6 pb-20 selection:bg-naranjaEnergy selection:text-white">
      
      {/* ========================================================================= */}
      {/* HERO ESTRUCTURADO FILA POR FILA                                           */}
      {/* ========================================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Fila 1: Espaciador Superior */}
        <div className="h-4 sm:h-6"></div>

        {/* Fila 2: Parte superior del titular */}
        <div className="mb-1">
          <h1 className="font-bruno text-3xl sm:text-5xl md:text-6xl tracking-tight text-blancoPuro uppercase">
            RECUPERA{" "}
            <span className="inline-block transform scale-120 text-naranjaEnergy hover:text-orange-400 drop-shadow-[0_0_25px_rgba(255,107,0,0.9)] transition-all duration-300 cursor-default">
              EL CONTROL
            </span>
          </h1>
        </div>

        {/* Fila 3: Parte inferior del titular */}
        <div className="mb-4">
          <h2 className="font-bruno text-3xl sm:text-5xl md:text-6xl tracking-tight text-blancoPuro uppercase">
            <span className="inline-block transform scale-120 text-naranjaEnergy hover:text-orange-400 drop-shadow-[0_0_25px_rgba(255,107,0,0.9)] transition-all duration-300 cursor-default">
              OPERATIVO
            </span>{" "}
            Y ESCALA TU NEGOCIO
          </h2>
        </div>

        {/* Fila 4: Espaciador */}
        <div className="h-2"></div>

        {/* Fila 5: Ecosistemas y Consultoría */}
        <div className="mb-8">
          <p className="font-inter text-sm sm:text-base font-semibold text-humo tracking-wide flex items-center justify-center gap-2 flex-wrap">
            <span className="text-naranjaEnergy font-black">°</span> Ecosistemas Digitales
            <span className="text-naranjaEnergy font-black">°</span> Consultoría Estratégica para PyMEs
          </p>
        </div>

        {/* Fila 6: Espaciador */}
        <div className="h-2"></div>

        {/* Fila 7: CTA Botón Magnético Gigante con Luz Pulsante Naranja Energy */}
        <div className="mb-8 flex justify-center">
          <Link
            to="/agenda"
            className="group relative inline-flex items-center gap-3.5 py-5 px-10 sm:px-14 bg-gradient-to-r from-naranjaEnergy via-orange-500 to-naranjaEnergy text-white font-bruno text-base sm:text-xl rounded-large shadow-[0_0_35px_rgba(255,107,0,0.85)] hover:shadow-[0_0_60px_rgba(255,107,0,1)] hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse hover:animate-none border border-orange-300/40"
          >
            <span className="text-2xl sm:text-3xl filter drop-shadow">📅</span>
            <span>AGENDAR MI SESIÓN DE 20 MIN</span>
            <span className="text-xl group-hover:translate-x-1.5 transition-transform">→</span>
          </Link>
        </div>

        {/* Fila 8: Espaciador */}
        <div className="h-2"></div>

        {/* Fila 9: Checkmarks */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-blancoPuro/90">
          <span className="flex items-center gap-1.5 bg-midnightPanel/70 border border-white/10 px-3.5 py-1.5 rounded-full shadow-inner">
            <span className="text-emerald-400 font-bold">✓</span> Constancia de Aprendizaje Tecnológico
          </span>
          <span className="flex items-center gap-1.5 bg-midnightPanel/70 border border-white/10 px-3.5 py-1.5 rounded-full shadow-inner">
            <span className="text-cyan-400 font-bold">✓</span> Independencia Operativa Total
          </span>
          <span className="flex items-center gap-1.5 bg-midnightPanel/70 border border-white/10 px-3.5 py-1.5 rounded-full shadow-inner">
            <span className="text-naranjaEnergy font-bold">✓</span> Zona de Pulgar Mobile-First
          </span>
        </div>

        {/* Fila 10: Espaciador */}
        <div className="h-2"></div>

        {/* Fila 11: Integraciones & Estándares Compatibles (Estilo Foto 2) */}
        <div className="mb-14">
          <span className="text-[11px] font-mono font-bold text-cyan-400/90 uppercase tracking-[0.25em] block mb-6">
            INTEGRACIONES & ESTÁNDARES COMPATIBLES
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12 max-w-6xl mx-auto px-4">
            {compatibleStandards.map((brand, i) => (
              <span
                key={i}
                className={`${brand.font} text-sm sm:text-base text-humo/60 hover:text-blancoPuro transition-all duration-300 cursor-default select-none hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.75)] hover:scale-105`}
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>

        {/* Fila 12: Separador de Secciones */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-16"></div>

      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN DE PROMESA DE VALOR (TARJETA MAGNÉTICA TRANSPARENTE GIGANTE)     */}
      {/* ========================================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* TARJETA MAGNÉTICA TRANSPARENTE GIGANTE CON SOMBRA GOLD Y BORDE SPOTLIGHT */}
        <div
          onMouseMove={handleMouseMove}
          className="relative rounded-2xl bg-midnightPanel/40 backdrop-blur-xl border border-amber-400/30 p-8 sm:p-12 shadow-[0_0_50px_rgba(255,215,0,0.25)] hover:shadow-[0_0_80px_rgba(255,215,0,0.45)] transition-all duration-300 overflow-hidden group"
        >
          {/* Destello Naranja Energy Neón que sigue al cursor por el contorno */}
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 107, 0, 0.4), transparent 80%)`,
            }}
          />

          <div className="relative z-10 text-center">
            
            {/* Fila 1: Título */}
            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest block mb-2">
              COMPROMISO INSTITUCIONAL
            </span>
            <h2 className="font-bruno text-2xl sm:text-4xl text-blancoPuro mb-3">
              Nuestra Promesa de Valor
            </h2>

            {/* Fila 2: Texto Principal */}
            <p className="text-humo text-xs sm:text-base max-w-3xl mx-auto leading-relaxed mb-10">
              Construimos tu infraestructura digital a la medida, capacitamos a tu personal bajo estándares andragógicos y garantizamos tu total independencia operativa.
            </p>

            {/* Fila 3: Dividida en 3 Columnas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              
              {/* Columna 1: Tecnología Instalada */}
              <div className="bg-negroProfundo/70 border border-white/10 rounded-xl p-5 hover:border-cyan-400/60 transition-all duration-300 flex flex-col group/col">
                <div className="h-44 w-full rounded-lg overflow-hidden mb-4 border border-white/10 bg-negroProfundo">
                  <img
                    src="/assets/iconografia/tecnologia_instalada_2K_202608280454.jpeg"
                    alt="Tecnología Instalada"
                    className="w-full h-full object-cover group-hover/col:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bruno text-base text-naranjaEnergy group-hover/col:text-cyan-400 group-hover/col:drop-shadow-[0_0_15px_rgba(34,211,238,0.9)] transition-all mb-2">
                  Tecnología Instalada
                </h3>
                <p className="text-humo text-xs leading-relaxed flex-1">
                  Arquitectura modular, APIs integradas y código propietario desplegado en servidores de alta disponibilidad sin dependencia forzada.
                </p>
              </div>

              {/* Columna 2: Conocimiento Transferido */}
              <div className="bg-negroProfundo/70 border border-white/10 rounded-xl p-5 hover:border-naranjaEnergy/60 transition-all duration-300 flex flex-col group/col">
                <div className="h-44 w-full rounded-lg overflow-hidden mb-4 border border-white/10 bg-negroProfundo">
                  <img
                    src="/assets/iconografia/conocimiento_2K_202608280455.jpeg"
                    alt="Conocimiento Transferido"
                    className="w-full h-full object-cover group-hover/col:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bruno text-base text-cyan-400 group-hover/col:text-naranjaEnergy group-hover/col:drop-shadow-[0_0_15px_rgba(255,107,0,0.9)] transition-all mb-2">
                  Conocimiento Transferido
                </h3>
                <p className="text-humo text-xs leading-relaxed flex-1">
                  Metodología andragógica práctica, manuales operativos (SOPs) y constancias de dominio tecnológico para que tu equipo opere con autonomía total.
                </p>
              </div>

              {/* Columna 3: Negocios Escalados */}
              <div className="bg-negroProfundo/70 border border-white/10 rounded-xl p-5 hover:border-amber-300/60 transition-all duration-300 flex flex-col group/col">
                <div className="h-44 w-full rounded-lg overflow-hidden mb-4 border border-white/10 bg-negroProfundo">
                  <img
                    src="/assets/iconografia/negocio_escalado_2K_202608280458.jpeg"
                    alt="Negocios Escalados"
                    className="w-full h-full object-cover group-hover/col:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bruno text-base text-blancoPuro group-hover/col:text-amber-300 group-hover/col:drop-shadow-[0_0_15px_rgba(255,215,0,0.9)] transition-all mb-2">
                  Negocios Escalados
                </h3>
                <p className="text-humo text-xs leading-relaxed flex-1">
                  Automatización de cobros, logística con Uber Direct y posicionamiento SEO local para convertir tráfico en facturación predecible.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* FUERA DE LA TARJETA EN LA PARTE INFERIOR CENTRAL                         */}
        {/* ========================================================================= */}
        <div className="mt-12 text-center">
          
          {/* Fila 1: CTA Botón Gold Premium */}
          <div className="mb-5 flex justify-center">
            <Link
              to="/diagnostico"
              className="inline-flex items-center gap-3 py-4 px-10 sm:px-12 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-negroProfundo font-bruno text-sm sm:text-lg rounded-large shadow-[0_0_35px_rgba(255,215,0,0.7)] hover:shadow-[0_0_55px_rgba(255,215,0,1)] hover:scale-105 transition-all duration-300 border border-yellow-200"
            >
              <span>⭐ DIAGNÓSTICO + E-BOOK GRATUITO</span>
              <span>→</span>
            </Link>
          </div>

          {/* Fila 2: Texto de Beneficios */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-humo mb-8">
            <span>✓ Entrenamiento Tecnológico a Medida</span>
            <span>✓ Operaciones Estandarizadas Cubiertas</span>
            <span>✓ Zona de Aprendizaje Continuo Asegurado</span>
          </div>

          {/* Fila 3: Separador de Secciones */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

        </div>

      </div>

    </section>
  );
}

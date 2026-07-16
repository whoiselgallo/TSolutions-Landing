import React from "react";
import { Link } from "react-router-dom";
import PageTransition from "../effects/transitions/PageTransition";

export default function TokensPreview() {
  const colors = [
    { name: "aquaTurquesa", class: "bg-aquaTurquesa", textClass: "text-negroProfundo font-bold" },
    { name: "negroProfundo", class: "bg-negroProfundo", textClass: "text-blancoPuro border border-blancoPuro/10" },
    { name: "blancoPuro", class: "bg-blancoPuro", textClass: "text-negroProfundo font-bold" },
    { name: "midnightPanel", class: "bg-midnightPanel", textClass: "text-blancoPuro border border-blancoPuro/10" },
    { name: "naranjaEnergy", class: "bg-naranjaEnergy", textClass: "text-negroProfundo font-bold" },
  ];

  const shadows = [
    { name: "shadow-card", class: "shadow-card border border-blancoPuro/5" },
    { name: "shadow-glowTurquesaSoft", class: "shadow-glowTurquesaSoft border border-aquaTurquesa/10" },
    { name: "shadow-glowEnergy", class: "shadow-glowEnergy border border-naranjaEnergy/10" },
  ];

  const radii = [
    { name: "rounded-soft", class: "rounded-soft" },
    { name: "rounded-hard", class: "rounded-hard" },
    { name: "rounded-full", class: "rounded-full" },
  ];

  const fonts = [
    { name: "font-bruno", class: "font-bruno" },
    { name: "font-inter", class: "font-inter" },
  ];

  const animations = [
    { name: "animate-fadeTurquesa", class: "animate-[fadeTurquesa_2s_infinite]" },
    { name: "animate-slideSoft", class: "animate-[slideSoft_2s_infinite]" },
    { name: "animate-scaleIn", class: "animate-[scaleIn_2s_infinite]" },
  ];

  return (
    <PageTransition type="fade" glow>
      <div className="min-h-screen bg-negroProfundo text-blancoPuro p-6 md:p-10 space-y-16">

        {/* ===== HEADER ===== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-naranjaEnergy/20">
          <div>
            <h1 className="text-3xl font-bruno text-naranjaEnergy">🟧 Tokens</h1>
            <p className="text-sm text-blancoPuro/60 mt-1">Variables de diseño del Design System V1</p>
          </div>
          <Link 
            to="/" 
            className="px-5 py-2.5 bg-negroProfundo border border-naranjaEnergy text-naranjaEnergy font-bruno rounded-soft hover:bg-naranjaEnergy hover:text-negroProfundo hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all duration-300 flex items-center gap-2 text-sm"
          >
            ← Volver al Inicio
          </Link>
        </div>

        {/* ================= COLORS ================= */}
        <section>
          <h2 className="text-2xl font-bruno text-naranjaEnergy mb-6">🎨 Colores</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {colors.map((c) => (
              <div
                key={c.name}
                className={`${c.class} ${c.textClass} p-6 rounded-soft flex items-center justify-center text-center font-bruno text-sm min-h-[80px]`}
              >
                {c.name}
              </div>
            ))}
          </div>
        </section>

        {/* ================= SHADOWS ================= */}
        <section>
          <h2 className="text-2xl font-bruno text-naranjaEnergy mb-6">🌑 Sombras</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shadows.map((s) => (
              <div
                key={s.name}
                className={`bg-midnightPanel p-8 rounded-soft ${s.class} text-center flex items-center justify-center font-bruno text-sm min-h-[100px]`}
              >
                {s.name}
              </div>
            ))}
          </div>
        </section>

        {/* ================= GROUPED DESIGN SYSTEM CARD GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Bordes / Radius */}
          <div className="bg-midnightPanel p-6 rounded-medium border border-blancoPuro/5 hover:border-naranjaEnergy/30 transition-all duration-300 shadow-card flex flex-col h-full justify-between">
            <div>
              <h3 className="font-bruno text-xl text-naranjaEnergy mb-6 pb-2 border-b border-blancoPuro/5">🔲 Bordes / Radius</h3>
              <div className="grid grid-cols-3 gap-4 justify-items-center items-center">
                {radii.map((r) => (
                  <div key={r.name} className="flex flex-col items-center gap-2">
                    <div
                      className={`bg-negroProfundo w-16 h-16 ${r.class} border border-blancoPuro/10 shadow-card flex items-center justify-center`}
                    ></div>
                    <span className="text-[10px] text-blancoPuro/60 font-inter">{r.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Tipografías */}
          <div className="bg-midnightPanel p-6 rounded-medium border border-blancoPuro/5 hover:border-naranjaEnergy/30 transition-all duration-300 shadow-card flex flex-col h-full justify-between">
            <div>
              <h3 className="font-bruno text-xl text-naranjaEnergy mb-6 pb-2 border-b border-blancoPuro/5">🔤 Tipografías</h3>
              <div className="space-y-6">
                {fonts.map((f) => (
                  <div key={f.name} className="p-3 bg-negroProfundo rounded-soft border border-blancoPuro/5">
                    <span className="text-xs text-blancoPuro/40 block mb-1 font-inter">{f.name}</span>
                    <p className={`${f.class} text-lg text-blancoPuro`}>
                      TSolutions IPIDD
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Animaciones */}
          <div className="bg-midnightPanel p-6 rounded-medium border border-blancoPuro/5 hover:border-naranjaEnergy/30 transition-all duration-300 shadow-card flex flex-col h-full justify-between">
            <div>
              <h3 className="font-bruno text-xl text-naranjaEnergy mb-6 pb-2 border-b border-blancoPuro/5">⚡ Animaciones (Loop)</h3>
              <div className="space-y-4">
                {animations.map((a) => (
                  <div
                    key={a.name}
                    className="p-4 bg-negroProfundo rounded-soft border border-blancoPuro/5 flex flex-col gap-2 overflow-hidden"
                  >
                    <span className="text-[10px] text-blancoPuro/40 font-inter">{a.name}</span>
                    <div className={`${a.class} bg-naranjaEnergy text-negroProfundo text-center py-2 px-3 rounded-soft font-bruno text-xs`}>
                      Animación Activa
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </PageTransition>
  );
}

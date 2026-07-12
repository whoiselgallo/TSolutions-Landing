import React from "react";
import PageTransition from "../effects/transitions/PageTransition";

export default function TokensPreview() {
  const colors = [
    { name: "aquaTurquesa", class: "bg-aquaTurquesa" },
    { name: "negroProfundo", class: "bg-negroProfundo" },
    { name: "blancoPuro", class: "bg-blancoPuro" },
    { name: "midnightPanel", class: "bg-midnightPanel" },
    { name: "naranjaEnergy", class: "bg-naranjaEnergy" },
  ];

  const shadows = [
    { name: "shadow-card", class: "shadow-card" },
    { name: "shadow-glowTurquesaSoft", class: "shadow-glowTurquesaSoft" },
    { name: "shadow-glowEnergy", class: "shadow-glowEnergy" },
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
    { name: "animate-fadeTurquesa", class: "animate-fadeTurquesa" },
    { name: "animate-slideSoft", class: "animate-slideSoft" },
    { name: "animate-scaleIn", class: "animate-scaleIn" },
  ];

  return (
    <PageTransition type="fade" glow>
      <div className="min-h-screen bg-negroProfundo text-blancoPuro p-10 space-y-20">

        {/* ================= COLORS ================= */}
        <section>
          <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">🎨 Colores</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {colors.map((c) => (
              <div
                key={c.name}
                className={`${c.class} p-6 rounded-soft shadow-card flex items-center justify-center`}
              >
                {c.name}
              </div>
            ))}
          </div>
        </section>

        {/* ================= SHADOWS ================= */}
        <section>
          <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">🌑 Sombras</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {shadows.map((s) => (
              <div
                key={s.name}
                className={`bg-midnightPanel p-10 rounded-soft ${s.class}`}
              >
                {s.name}
              </div>
            ))}
          </div>
        </section>

        {/* ================= RADII ================= */}
        <section>
          <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">🔲 Bordes / Radius</h2>
          <div className="flex flex-wrap gap-10">
            {radii.map((r) => (
              <div
                key={r.name}
                className={`bg-midnightPanel p-10 w-40 h-40 ${r.class} shadow-card flex items-center justify-center`}
              >
                {r.name}
              </div>
            ))}
          </div>
        </section>

        {/* ================= FONTS ================= */}
        <section>
          <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">🔤 Tipografías</h2>
          <div className="space-y-6">
            {fonts.map((f) => (
              <p key={f.name} className={`${f.class} text-2xl`}>
                {f.name}
              </p>
            ))}
          </div>
        </section>

        {/* ================= ANIMATIONS ================= */}
        <section>
          <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">⚡ Animaciones</h2>
          <div className="space-y-10">
            {animations.map((a) => (
              <div
                key={a.name}
                className={`bg-midnightPanel p-6 rounded-soft shadow-card w-64 ${a.class}`}
              >
                {a.name}
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}

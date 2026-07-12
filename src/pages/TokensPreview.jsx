import React from "react";

export default function TokensPreview() {
  const colors = [
    "naranjaEnergy",
    "aquaTurquesa",
    "negroProfundo",
    "blancoPuro",
    "midnightPanel",
    "deepGrid",
  ];

  const shadows = [
    "turquesaSoft",
    "turquesaHover",
    "blancoPulse",
    "card",
    "glowTurquesaSoft",
    "glowTurquesaHover",
    "glowBlancoPulse",
  ];

  const radii = ["soft", "medium", "large", "full"];

  const spacing = [1, 2, 3, 4, 5, 6, 7, 8];

  const animations = [
    "glowPulse",
    "fadeTurquesa",
    "slideSoft",
    "hoverPulse",
    "pulse",
    "ping",
    "spin",
    "gridMove",
    "float",
  ];

  return (
    <div className="min-h-screen bg-negroProfundo text-blancoPuro p-10 space-y-16">

      {/* COLORS */}
      <section>
        <h2 className="text-3xl font-bruno mb-6 text-aquaTurquesa">🎨 Colores</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {colors.map((c) => (
            <div key={c} className="space-y-2">
              <div className={`w-full h-20 rounded-medium bg-${c}`}></div>
              <p className="text-sm font-inter">{c}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SHADOWS */}
      <section>
        <h2 className="text-3xl font-bruno mb-6 text-aquaTurquesa">💡 Sombras & Glows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {shadows.map((s) => (
            <div key={s} className="space-y-3">
              <div className={`w-full h-24 bg-midnightPanel rounded-medium shadow-${s}`}></div>
              <p className="text-sm font-inter">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RADII */}
      <section>
        <h2 className="text-3xl font-bruno mb-6 text-aquaTurquesa">🟠 Radios</h2>
        <div className="flex flex-wrap gap-10">
          {radii.map((r) => (
            <div key={r} className="space-y-3">
              <div className={`w-32 h-32 bg-midnightPanel shadow-card rounded-${r}`}></div>
              <p className="text-sm font-inter">{r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SPACING */}
      <section>
        <h2 className="text-3xl font-bruno mb-6 text-aquaTurquesa">📐 Spacing</h2>
        <div className="space-y-4">
          {spacing.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div className={`bg-aquaTurquesa h-4 w-${s}`}></div>
              <p className="text-sm font-inter">space-{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ANIMATIONS */}
      <section>
        <h2 className="text-3xl font-bruno mb-6 text-aquaTurquesa">⚙️ Animaciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {animations.map((a) => (
            <div key={a} className="space-y-3">
              <div className={`w-full h-24 bg-midnightPanel rounded-medium shadow-card animate-${a}`}></div>
              <p className="text-sm font-inter">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPONENTS */}
      <section>
        <h2 className="text-3xl font-bruno mb-6 text-aquaTurquesa">🧩 Componentes Base</h2>

        <div className="space-y-6">

          <button className="btn-primary px-6 py-3">Botón Primario</button>
          <button className="btn-secondary px-6 py-3">Botón Secundario</button>
          <button className="btn-ghost px-6 py-3">Botón Ghost</button>

          <input className="input w-64" placeholder="Input corporativo" />

          <div className="card w-64 h-32 flex items-center justify-center">
            Card corporativa
          </div>

          <div className="modal w-64 h-64 flex items-center justify-center">
            Modal corporativo
          </div>

        </div>
      </section>

    </div>
  );
}

import React from "react";

// Page transition
import PageTransition from "../effects/transitions/PageTransition";

// Scroll effects
import {
  useScrollFade,
  useScrollSlideUp,
  useScrollScale,
} from "../effects/scroll";

// Mouse effects
import {
  useMouseGlow,
  useMouseParallax,
} from "../effects/mouse";

// Click effects
import {
  useClickPulse,
  useClickPop,
} from "../effects/click";

// Text effects
import {
  TextReveal,
  TextScramble,
} from "../effects/text";

// Background effects
import {
  BgGrid,
  BgAurora,
} from "../effects/background";

export default function EffectsPreview() {
  // Hooks de efectos
  const fadeRef = useScrollFade();
  const slideRef = useScrollSlideUp();
  const scaleRef = useScrollScale();

  const glowRef = useMouseGlow();
  const parallaxRef = useMouseParallax();

  const pulseRef = useClickPulse();
  const popRef = useClickPop();

  return (
    <PageTransition type="fade" glow>
      <div className="min-h-screen bg-negroProfundo text-blancoPuro p-10 space-y-20">

        {/* ================= SCROLL EFFECTS ================= */}
        <section>
          <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">📜 Scroll Effects</h2>

          <div ref={fadeRef} className="p-6 bg-midnightPanel rounded-soft shadow-card">
            Fade al hacer scroll
          </div>

          <div ref={slideRef} className="p-6 bg-midnightPanel rounded-soft shadow-card mt-6">
            Slide-Up al hacer scroll
          </div>

          <div ref={scaleRef} className="p-6 bg-midnightPanel rounded-soft shadow-card mt-6">
            Scale-In al hacer scroll
          </div>
        </section>

        {/* ================= MOUSE EFFECTS ================= */}
        <section>
          <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">🖱 Mouse Effects</h2>

          <div ref={glowRef} className="p-6 bg-midnightPanel rounded-soft shadow-card">
            Glow dinámico siguiendo el mouse
          </div>

          <div ref={parallaxRef} className="p-6 bg-midnightPanel rounded-soft shadow-card mt-6">
            Parallax suave con el mouse
          </div>
        </section>

        {/* ================= CLICK EFFECTS ================= */}
        <section>
          <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">🖱💥 Click Effects</h2>

          <button
            ref={pulseRef}
            className="px-6 py-3 bg-aquaTurquesa text-negroProfundo rounded-soft font-bruno"
          >
            Pulse Effect
          </button>

          <button
            ref={popRef}
            className="px-6 py-3 bg-naranjaEnergy text-blancoPuro rounded-soft font-bruno ml-6"
          >
            Pop Effect
          </button>
        </section>

        {/* ================= TEXT EFFECTS ================= */}
        <section>
          <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">🔤 Text Effects</h2>

          <TextReveal text="Efecto Reveal Corporativo" className="text-2xl font-bruno" />

          <TextScramble
            text="Efecto Scramble Futurista"
            className="text-2xl font-bruno mt-6"
          />
        </section>

        {/* ================= BACKGROUND EFFECTS ================= */}
        <section>
          <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">🌌 Background Effects</h2>

          <BgGrid className="p-10 rounded-soft shadow-card">
            Fondo Grid Corporativo
          </BgGrid>

          <BgAurora className="p-10 rounded-soft shadow-card mt-6">
            Fondo Aurora Futurista
          </BgAurora>
        </section>

      </div>
    </PageTransition>
  );
}

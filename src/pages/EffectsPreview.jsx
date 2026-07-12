import React from "react";
import { useScrollReveal } from "../effects/Scrol/useScrollReveal";
import { useParallax } from "../effects/Scrol/useParallax";
import { useScrollVelocityGlow } from "../effects/Scrol/useScrollVelocityGlow";

import { MouseGlow } from "../effects/mouse/MouseGlow";
import { MagneticCard } from "../effects/mouse/MagneticCard";
import { MouseTrail } from "../effects/mouse/MouseTrail";

import { RippleButton } from "../effects/click/RippleButton";
import { Shockwave } from "../effects/click/Shockwave";

import { NeonText } from "../effects/text/NeonText";
import { Typewriter } from "../effects/text/Typewriter";

import { ParticleField } from "../effects/background/ParticleField";
import { Grid3D } from "../effects/background/Grid3D";

import { PageTransition } from "../effects/transitions/PageTransition";
import { LoaderIntegral } from "../effects/loaders/LoaderIntegral";
import { LogoPulse } from "../effects/branding/LogoPulse";

export default function EffectsPreview() {
  const { ref, visible } = useScrollReveal();
  const offset = useParallax(0.15);
  const glow = useScrollVelocityGlow();

  return (
    <div className="relative min-h-screen bg-negroProfundo text-blancoPuro p-10 space-y-20">

      {/* BACKGROUND EFFECTS */}
      <ParticleField />
      <Grid3D />

      {/* MOUSE EFFECTS */}
      <MouseGlow />
      <MouseTrail />

      {/* SCROLL REVEAL */}
      <section ref={ref} className={`transition duration-700 ${visible ? "opacity-100 translate-y-0 shadow-turquesaSoft" : "opacity-0 translate-y-6"
        }`}>
        <h2 className="text-4xl font-bruno text-aquaTurquesa">Scroll Reveal</h2>
      </section>

      {/* PARALLAX */}
      <section style={{ transform: `translateY(${offset}px)` }}>
        <h2 className="text-3xl font-bruno text-naranjaEnergy">Parallax Multicapa</h2>
      </section>

      {/* SCROLL VELOCITY GLOW */}
      <section style={{ boxShadow: `0 0 ${glow * 20}px rgba(0,229,255,0.4)` }}>
        <h2 className="text-3xl font-bruno text-aquaTurquesa">Scroll Velocity Glow</h2>
      </section>

      {/* MAGNETIC CARD */}
      <MagneticCard>
        <div className="card w-64 h-32 flex items-center justify-center">
          Magnetic Card
        </div>
      </MagneticCard>

      {/* RIPPLE BUTTON */}
      <RippleButton className="btn-primary px-6 py-3">
        Ripple Button
      </RippleButton>

      {/* SHOCKWAVE */}
      <Shockwave active={true} />

      {/* NEON TEXT */}
      <NeonText>Neon Text Pulse</NeonText>

      {/* TYPEWRITER */}
      <Typewriter text="TSolutions IPIDD — Typewriter Futurista" speed={50} />

      {/* PAGE TRANSITION */}
      <PageTransition>
        <div className="mt-10 text-xl font-inter">
          Page Transition (Fade + Glow)
        </div>
      </PageTransition>

      {/* LOADER */}
      <LoaderIntegral />

      {/* LOGO PULSE */}
      <LogoPulse src="/logo.png" />

    </div>
  );
}

import React from "react";
import { ParticleField } from "../effects/background/ParticleField";
import { Grid3D } from "../effects/background/Grid3D";
import { NeonText } from "../effects/text/NeonText";
import { Typewriter } from "../effects/text/Typewriter";
import { RippleButton } from "../effects/click/RippleButton";
import { MouseGlow } from "../effects/mouse/MouseGlow";
import { MouseTrail } from "../effects/mouse/MouseTrail";

export default function LandingPreview() {
  return (
    <div className="relative min-h-screen bg-negroProfundo text-blancoPuro overflow-hidden">

      <ParticleField />
      <Grid3D />
      <MouseGlow />
      <MouseTrail />

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center p-20 space-y-10">

        <NeonText>
          <h1 className="text-6xl font-bruno">TSolutions IPIDD</h1>
        </NeonText>

        <Typewriter
          text="Design System V1 — Futurista, elegante y corporativo"
          speed={40}
        />

        <RippleButton className="btn-primary px-10 py-4 text-xl">
          Comenzar →
        </RippleButton>
      </section>

      {/* FEATURES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 p-20">

        <div className="card h-40 flex items-center justify-center">
          Tokens unificados
        </div>

        <div className="card h-40 flex items-center justify-center">
          Effects Library V1
        </div>

        <div className="card h-40 flex items-center justify-center">
          UI Components
        </div>

      </section>

    </div>
  );
}

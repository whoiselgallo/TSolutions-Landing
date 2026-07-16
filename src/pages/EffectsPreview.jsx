import React, { useState } from "react";
import { Link } from "react-router-dom";

// Page transition
import PageTransition from "../effects/transitions/PageTransition";

// Effects que existen en el proyecto
import { RippleButton } from "../effects/click";
import { NeonText, Typewriter, TypewriterLoop } from "../effects/text";
import { MouseGlow, MagneticCard } from "../effects/mouse";
import { Grid3D, ParticleField } from "../effects/background";
import { LogoPulseSvg } from "../effects/branding";
import { LoaderIntegral } from "../effects/loaders";

export default function EffectsPreview() {
  return (
    <div className="min-h-screen bg-negroProfundo text-blancoPuro p-6 md:p-10">
      <MouseGlow />
      
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-naranjaEnergy/20 mb-10">
        <div>
          <h1 className="text-3xl font-bruno text-naranjaEnergy">🟧 Panel de Efectos</h1>
          <p className="text-sm text-blancoPuro/60 mt-1">Interacciones avanzadas y dinámicas del Design System V1</p>
        </div>
        <Link 
          to="/" 
          className="px-5 py-2.5 bg-negroProfundo border border-naranjaEnergy text-naranjaEnergy font-bruno rounded-soft hover:bg-naranjaEnergy hover:text-negroProfundo hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all duration-300 flex items-center gap-2 text-sm"
        >
          ← Volver al Inicio
        </Link>
      </div>

      {/* ===== DASHBOARD GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {/* 1. Text Effects */}
        <MagneticCard className="h-full">
          <div className="p-6 bg-midnightPanel border border-blancoPuro/5 hover:border-naranjaEnergy/40 hover:shadow-glowEnergy transition-all duration-300 rounded-soft flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bruno text-lg text-naranjaEnergy">🔤 Text Effects</h3>
                <span className="text-xs bg-naranjaEnergy/10 text-naranjaEnergy px-2 py-1 rounded-full font-bruno">PRO</span>
              </div>
              <div className="space-y-6">
                <NeonText text="TSolutions Neon Text" />
                <div className="text-lg font-inter">
                  <Typewriter text="Typewriter: Tecnología y automatización." speed={60} />
                </div>
                <div className="text-sm font-inter">
                  <span className="text-blancoPuro/60 mr-2">Loop:</span>
                  <TypewriterLoop texts={["Innovación.", "Escalabilidad.", "Diseño Futurista."]} speed={80} />
                </div>
              </div>
            </div>
            <p className="text-xs text-blancoPuro/40 font-inter">Efectos tipográficos animados</p>
          </div>
        </MagneticCard>

        {/* 2. Click Effects */}
        <MagneticCard className="h-full">
          <div className="p-6 bg-midnightPanel border border-blancoPuro/5 hover:border-naranjaEnergy/40 hover:shadow-glowEnergy transition-all duration-300 rounded-soft flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bruno text-lg text-naranjaEnergy">💥 Click Effects</h3>
                <span className="text-xs bg-naranjaEnergy/10 text-naranjaEnergy px-2 py-1 rounded-full font-bruno">Active</span>
              </div>
              <div className="flex flex-col gap-4">
                <RippleButton className="w-full py-3 bg-aquaTurquesa text-negroProfundo rounded-soft font-bruno text-sm hover:shadow-glowEnergy">
                  Ripple Aqua
                </RippleButton>
                <RippleButton className="w-full py-3 bg-naranjaEnergy text-blancoPuro rounded-soft font-bruno text-sm hover:shadow-glowEnergy">
                  Ripple Naranja
                </RippleButton>
              </div>
            </div>
            <p className="text-xs text-blancoPuro/40 font-inter">Efecto de onda expansiva al hacer clic</p>
          </div>
        </MagneticCard>

        {/* 3. Mouse Parallax & Glow */}
        <MagneticCard className="h-full">
          <div className="p-6 bg-midnightPanel border border-blancoPuro/5 hover:border-naranjaEnergy/40 hover:shadow-glowEnergy transition-all duration-300 rounded-soft flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bruno text-lg text-naranjaEnergy">🖱 Mouse Interaction</h3>
                <span className="text-xs bg-naranjaEnergy/10 text-naranjaEnergy px-2 py-1 rounded-full font-bruno">3D</span>
              </div>
              <p className="font-inter text-sm mb-4">
                Esta tarjeta en sí misma es una <strong className="text-naranjaEnergy">Magnetic Card</strong>. Responde a la posición del cursor con inclinación 3D realista.
              </p>
              <div className="p-4 bg-negroProfundo/50 rounded-soft border border-blancoPuro/5 text-center text-xs font-inter text-blancoPuro/60">
                Pasa el mouse sobre cualquiera de estas tarjetas para ver el efecto magnético.
              </div>
            </div>
            <p className="text-xs text-blancoPuro/40 font-inter">Respuesta kinética al movimiento del mouse</p>
          </div>
        </MagneticCard>

        {/* 4. Grid 3D Background (Fondo ajustado a la tarjeta sin espacios vacíos) */}
        <MagneticCard className="h-full relative overflow-hidden rounded-soft border border-blancoPuro/5 hover:border-naranjaEnergy/40 hover:shadow-glowEnergy transition-all duration-300">
          <div className="absolute inset-0 z-0">
            <Grid3D />
          </div>
          <div className="relative z-10 p-6 bg-midnightPanel/75 backdrop-blur-xs flex flex-col justify-between h-full min-h-[260px] space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bruno text-lg text-naranjaEnergy">🌌 3D Grid</h3>
                <span className="text-xs bg-naranjaEnergy/10 text-naranjaEnergy px-2 py-1 rounded-full font-bruno">Cover</span>
              </div>
              <p className="font-inter text-sm text-blancoPuro/90 leading-relaxed">
                Fondo perspective grid dinámico proyectado en toda la extensión de esta tarjeta.
              </p>
            </div>
            <p className="text-xs text-blancoPuro/50 font-inter">Fondo de rejilla perspectiva interactiva</p>
          </div>
        </MagneticCard>

        {/* 5. Particle Field (Fondo ajustado a la tarjeta sin espacios vacíos) */}
        <MagneticCard className="h-full relative overflow-hidden rounded-soft border border-blancoPuro/5 hover:border-naranjaEnergy/40 hover:shadow-glowEnergy transition-all duration-300">
          <div className="absolute inset-0 z-0">
            <ParticleField />
          </div>
          <div className="relative z-10 p-6 bg-midnightPanel/75 backdrop-blur-xs flex flex-col justify-between h-full min-h-[260px] space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bruno text-lg text-naranjaEnergy">✨ Particle Field</h3>
                <span className="text-xs bg-naranjaEnergy/10 text-naranjaEnergy px-2 py-1 rounded-full font-bruno">Cover</span>
              </div>
              <p className="font-inter text-sm text-blancoPuro/90 leading-relaxed">
                Generador de partículas estelares flotantes abarcando toda la superficie de este bloque.
              </p>
            </div>
            <p className="text-xs text-blancoPuro/50 font-inter">Fondo de partículas estelares flotantes</p>
          </div>
        </MagneticCard>

        {/* 6. Branding & Loader */}
        <MagneticCard className="h-full">
          <div className="p-6 bg-midnightPanel border border-blancoPuro/5 hover:border-naranjaEnergy/40 hover:shadow-glowEnergy transition-all duration-300 rounded-soft flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bruno text-lg text-naranjaEnergy">🔮 Identity & Loading</h3>
                <span className="text-xs bg-naranjaEnergy/10 text-naranjaEnergy px-2 py-1 rounded-full font-bruno">Assets</span>
              </div>
              <div className="flex items-center justify-around gap-4 py-2">
                <div className="flex flex-col items-center">
                  <LogoPulseSvg size={50} />
                  <span className="text-[10px] text-blancoPuro/60 mt-1">LogoPulse</span>
                </div>
                <div className="flex flex-col items-center">
                  <LoaderIntegral />
                  <span className="text-[10px] text-blancoPuro/60 mt-1">Loader</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-blancoPuro/40 font-inter">Componentes dinámicos de identidad visual</p>
          </div>
        </MagneticCard>

      </div>
    </div>
  );
}

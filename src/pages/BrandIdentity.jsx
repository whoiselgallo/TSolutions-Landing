import React from "react";
import { NeonText, Grid3D } from "../effects";
import { Button } from "../components/ui";
import { Link } from "react-router-dom";

export default function BrandIdentity() {
  return (
    <div className="relative min-h-screen bg-negroProfundo flex flex-col items-center justify-center font-inter">
      <div className="fixed inset-0 z-0">
        <Grid3D />
      </div>
      <div className="fixed inset-0 bg-gradient-to-b from-negroProfundo/50 via-negroProfundo to-negroProfundo z-0 pointer-events-none"></div>
      
      <div className="relative z-10 text-center px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-naranjaEnergy/10 border border-naranjaEnergy/20 text-naranjaEnergy text-xs font-bold uppercase tracking-widest mb-6 animate-scaleIn">
          Próximamente
        </div>
        <h1 className="font-bruno text-4xl md:text-6xl mb-6 text-white">
          Brand <NeonText variant="turquesa" glow>Identity</NeonText> Builder
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
          El núcleo de diseño corporativo. Todo lo que necesitas para la creación de imagen, branding de logos y manuales de identidad visual.
        </p>
        <Link to="/">
          <Button variant="ghost">Volver al Hub Principal</Button>
        </Link>
      </div>
    </div>
  );
}

import React, { useState } from "react";

// Layout components
import LandingHeader from "../components/layout/LandingHeader.jsx";
import LandingHero from "../components/layout/LandingHero.jsx";
import SocialProof from "../components/layout/SocialProof.jsx";
import ProblemSolution from "../components/layout/ProblemSolution.jsx";
import Portfolio from "../components/layout/Portfolio.jsx";
import Differentiator from "../components/layout/Differentiator.jsx";
import LeadMagnet from "../components/layout/LeadMagnet.jsx";
import LandingContact from "../components/layout/LandingContact.jsx";
import LandingFAQ from "../components/layout/LandingFAQ.jsx";
import LandingFooter from "../components/layout/LandingFooter.jsx";
import RuaAgent from "../components/layout/RuaAgent.jsx";

// Page transition effect
import PageTransition from "../effects/transitions/PageTransition.jsx";

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState("Paquete Híbrido Escala Rápida ($3,700 MXN)");

  return (
    <div className="bg-negroProfundo text-blancoPuro min-h-screen selection:bg-naranjaEnergy selection:text-white pb-20 sm:pb-0">
      
      {/* 1. Encabezado de Conversión (Sin menú superior para evitar fugas) */}
      <LandingHeader />

      <PageTransition type="fade">
        {/* 2. Hero Section: Promesa, Dolor y Lema Oficial */}
        <LandingHero />

        {/* 3. Social Proof: Validación y Confianza */}
        <SocialProof />

        {/* 4. Agitación del Problema y Solución TSolutions */}
        <ProblemSolution />

        {/* 5. Portafolio Comercial de Productos y Servicios */}
        <Portfolio onSelectPackage={setSelectedPackage} />

        {/* 6. El Gran Diferenciador: Formación Andragógica y DC-3 */}
        <Differentiator />

        {/* 7. Lead Magnet: Oferta de Diagnóstico Gratuito */}
        <LeadMagnet />

        {/* 8. Lead Capture: Formulario Optimizado de Conversión */}
        <LandingContact selectedPackage={selectedPackage} />

        {/* 9. FAQ: Derribo de Objeciones Comerciales */}
        <LandingFAQ />

        {/* 10. Segundo CTA y Footer Legal */}
        <LandingFooter />
      </PageTransition>

      {/* RUA Agent — Asistente Inteligente */}
      <RuaAgent />
    </div>
  );
}

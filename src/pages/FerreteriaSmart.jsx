import React from "react";
import { Button } from "../components/ui";
import { NeonText, MagneticCard, Grid3D } from "../effects";
import { Link } from "react-router-dom";

export default function FerreteriaSmart() {
  return (
    <div className="relative min-h-screen bg-negroProfundo overflow-hidden flex flex-col font-inter">
      {/* Background Effect */}
      <div className="fixed inset-0 z-0">
        <Grid3D />
      </div>

      <div className="fixed inset-0 bg-gradient-to-b from-negroProfundo/50 via-negroProfundo to-negroProfundo z-0 pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-50 w-full bg-midnightPanel/60 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30 flex items-center justify-center">
              {/* Phosphor Wrench Icon (Assuming global phosphor load, or fallback text) */}
              <span className="text-naranjaEnergy text-xl">🔧</span>
            </div>
            <h1 className="font-bruno text-xl tracking-wider">
              <span className="text-white">TSolutions</span>
              <NeonText variant="turquesa" size="xl" className="text-xl ml-1">
                IPIDD
              </NeonText>
            </h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Hub Principal</Link>
            <a href="#roadmap" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">El Roadmap</a>
          </nav>
          <div className="hidden md:flex">
             <Link to="/dashboard">
                <Button variant="primary" glow size="sm">
                  Ver Demo
                </Button>
             </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aquaTurquesa/10 border border-aquaTurquesa/20 text-aquaTurquesa text-xs font-bold uppercase tracking-widest mb-8 animate-fadeTurquesa">
            <span className="w-2 h-2 rounded-full bg-aquaTurquesa animate-pulse"></span>
            Evolución para Ferreterías
          </div>
          
          <h2 className="mb-6 font-bruno text-5xl md:text-7xl leading-tight max-w-5xl mx-auto animate-slideSoft">
            Transformación Digital en <br />
            <NeonText variant="cta" size="mega" glow className="block mt-2">
              90 Días
            </NeonText>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light animate-scaleIn">
            Automatiza tu inventario, dispara tus ventas y revoluciona el servicio al cliente con nuestro ecosistema inteligente equipado con <strong>FerreBot IA</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard/full-demo">
              <Button variant="primary" size="lg" glow>
                Explorar el Demo Interactivo
              </Button>
            </Link>
            <a href="#roadmap">
              <Button variant="ghost" size="lg">
                Ver el Roadmap
              </Button>
            </a>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="py-24 px-6 bg-midnightPanel relative border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <NeonText variant="dashboard" size="xl" glow className="mb-4 font-bruno">
                El Camino al Éxito
              </NeonText>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Implementamos la tecnología por fases para asegurar una transición suave y resultados medibles desde el primer mes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Phase 1 */}
              <MagneticCard intensity={30} glow={true} className="p-8 rounded-2xl bg-negroProfundo border border-naranjaEnergy/20 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-naranjaEnergy/20 flex items-center justify-center mb-6 shadow-glowEnergy">
                   <span className="text-3xl text-naranjaEnergy">📦</span>
                </div>
                <div className="text-naranjaEnergy text-sm font-bold uppercase tracking-wider mb-2">Fase 1 (Día 1-30)</div>
                <h4 className="font-bold text-xl text-white mb-4">Fundamentos e Inventario</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Implementación del sistema central, migración del catálogo de productos, control de stock y capacitación inicial del personal.
                </p>
              </MagneticCard>

              {/* Phase 2 */}
              <MagneticCard intensity={30} glow={true} className="p-8 rounded-2xl bg-negroProfundo border border-aquaTurquesa/20 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-aquaTurquesa/20 flex items-center justify-center mb-6 shadow-glowTurquesaSoft">
                   <span className="text-3xl text-aquaTurquesa">🤖</span>
                </div>
                <div className="text-aquaTurquesa text-sm font-bold uppercase tracking-wider mb-2">Fase 2 (Día 31-60)</div>
                <h4 className="font-bold text-xl text-white mb-4">Integración FerreBot IA</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Despliegue del asistente virtual con Inteligencia Artificial para consultas automáticas, alertas de reabastecimiento y atención.
                </p>
              </MagneticCard>

              {/* Phase 3 */}
              <MagneticCard intensity={30} glow={true} className="p-8 rounded-2xl bg-negroProfundo border border-white/20 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 shadow-blancoPulse">
                   <span className="text-3xl text-white">📈</span>
                </div>
                <div className="text-gray-300 text-sm font-bold uppercase tracking-wider mb-2">Fase 3 (Día 61-90)</div>
                <h4 className="font-bold text-xl text-white mb-4">Dashboard Analítico Completo</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Activación del panel de control ejecutivo en tiempo real, integración con aplicación móvil y ajustes finales de escalabilidad.
                </p>
              </MagneticCard>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center">
            <h3 className="font-bruno text-3xl md:text-5xl text-white mb-8">¿Listo para modernizar tu negocio?</h3>
            <Link to="/dashboard">
              <Button variant="turquesa" size="lg" glow>
                Probar Demo de la Plataforma
              </Button>
            </Link>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10 bg-deepGrid text-center px-6">
        <p className="text-gray-500 text-sm font-medium">© 2026 TSolutions IPIDD. Módulo Ferretería Smart.</p>
      </footer>
    </div>
  );
}

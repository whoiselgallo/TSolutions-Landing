import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioAccessModal from "../modals/PortfolioAccessModal.jsx";

export default function LandingFooter() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPortfolio = () => {
    const isUnlocked = localStorage.getItem("tsolutions_portfolio_unlocked");
    if (isUnlocked === "true") {
      navigate("/portafolio");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {/* Portfolio Access Filter Modal */}
      <PortfolioAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        targetUrl="/portafolio"
      />

      {/* ===== SEGUNDO CTA (ÚLTIMA OPORTUNIDAD) ===== */}
      <section className="py-20 bg-midnightPanel text-center border-b border-blancoPuro/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-naranjaEnergy/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="font-bruno text-2xl sm:text-4xl text-blancoPuro mb-4">
            Es momento de escalar con verdadera <span className="text-naranjaEnergy">independencia</span>.
          </h2>
          <p className="text-humo text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Deja de perder clientes por herramientas desarticuladas o código que nadie sabe usar. Implementa infraestructura digital robusta hoy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 py-4 px-9 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-base sm:text-lg rounded-medium shadow-glowEnergy hover:shadow-glowEnergyHover transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>🚀 Iniciar Mi Transformación Digital</span>
            </a>
            <button
              type="button"
              onClick={handleOpenPortfolio}
              className="inline-flex items-center gap-2 py-4 px-6 bg-negroProfundo hover:bg-midnightPanel text-blancoPuro border border-white/10 hover:border-naranjaEnergy/50 rounded-medium text-sm font-bold transition-all cursor-pointer"
            >
              <span>📦 Explorar Portafolio Completo</span>
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER LEGAL (SIN MENÚS NI ENLACES DE ACCESO) ===== */}
      <footer className="py-8 bg-negroProfundo text-humo text-xs border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-bruno text-blancoPuro">TSOLUTIONS IPIDD</span> &bull; 
            <span className="ml-2">“Tecnología instalada. Conocimiento transferido. Negocios escalados.”</span>
          </div>
          <div className="text-[11px] text-humo/60">
            &copy; 2026 TSolutions IPIDD. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* ===== BARRA FLOTANTE EN ZONA DE PULGAR (MOBILE-FIRST) ===== */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-2.5 bg-negroProfundo/95 backdrop-blur-md border-t border-white/10 z-50">
        <a
          href="#contacto"
          className="w-full bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno py-3 px-4 rounded-medium text-xs flex items-center justify-center gap-1.5 shadow-glowEnergy"
        >
          <span>🚀 Iniciar Diagnóstico de Negocio</span>
          <span>→</span>
        </a>
      </div>
    </>
  );
}

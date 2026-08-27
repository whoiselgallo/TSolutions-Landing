import React from "react";

export default function LandingFooter() {
  return (
    <>
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
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 py-4 px-9 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-base sm:text-lg rounded-medium shadow-glowEnergy hover:shadow-glowEnergyHover transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>🚀 Iniciar Mi Transformación Digital</span>
          </a>
        </div>
      </section>

      {/* ===== FOOTER LEGAL ===== */}
      <footer className="py-10 bg-negroProfundo text-humo text-xs border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-bruno text-blancoPuro">TSOLUTIONS IPIDD</span> &bull; 
            <span className="ml-2">“Tecnología instalada. Conocimiento transferido. Negocios escalados.”</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#contacto" className="hover:text-naranjaEnergy transition">Aviso de Privacidad</a>
            <a href="#contacto" className="hover:text-naranjaEnergy transition">Términos del Servicio</a>
            <a href="#contacto" className="hover:text-naranjaEnergy transition">Soporte Técnico</a>
          </div>
        </div>
      </footer>

      {/* ===== BARRA FLOTANTE EN ZONA DE PULGAR (MOBILE-FIRST) ===== */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-negroProfundo/95 backdrop-blur-md border-t border-white/10 z-50 flex gap-2">
        <a
          href="https://wa.me/5215512345678?text=Hola,%20deseo%20solicitar%20el%20diagn%C3%B3stico%20de%20TSolutions"
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-2 rounded-medium text-xs flex items-center justify-center gap-1.5 shadow-card"
        >
          <span>💬 WhatsApp</span>
        </a>
        <a
          href="#contacto"
          className="flex-[2] bg-naranjaEnergy hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-medium text-xs flex items-center justify-center gap-1.5 shadow-glowEnergy"
        >
          <span>⚡ Cotizar / Diagnóstico</span>
        </a>
      </div>
    </>
  );
}

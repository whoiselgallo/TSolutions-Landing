import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function ThankYouPage() {
  const [searchParams] = useSearchParams();

  const clientName = searchParams.get("nombre") || "";
  const ebookId = searchParams.get("ebook") || "";

  const [appointment, setAppointment] = useState(null);
  const [downloadedEbook, setDownloadedEbook] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const storedApp = localStorage.getItem("tsolutions_confirmed_appointment");
      if (storedApp) {
        setAppointment(JSON.parse(storedApp));
      }
      const storedEbook = localStorage.getItem("tsolutions_downloaded_ebook");
      if (storedEbook) {
        setDownloadedEbook(JSON.parse(storedEbook));
      }
    } catch (e) {}
  }, []);

  return (
    <div className="bg-negroProfundo text-blancoPuro min-h-screen selection:bg-naranjaEnergy selection:text-white pb-20 sm:pb-12">
      
      {/* ================= HEADER ================= */}
      <header className="w-full border-b border-white/10 bg-negroProfundo/95 backdrop-blur-md sticky top-0 z-50 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div 
              className="w-10 h-10 border border-naranjaEnergy bg-midnightPanel flex items-center justify-center p-1.5 shadow-glowEnergy group-hover:scale-105 transition-transform"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            >
              <img 
                src="/assets/TSolutionslogo/logoTSVG.svg" 
                onError={(e) => { e.target.src = "/assets/TSolutionslogo/logoWEBP.webp"; }}
                alt="TSolutions Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div>
              <div className="font-bruno text-sm sm:text-base tracking-wider text-blancoPuro flex items-center gap-1.5">
                TSOLUTIONS <span className="text-naranjaEnergy text-xs font-sans font-bold px-1.5 py-0.5 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30">IPIDD</span>
              </div>
              <p className="text-[10px] text-humo tracking-widest hidden sm:block">
                BIENVENIDO A LA FAMILIA TSOLUTIONS
              </p>
            </div>
          </Link>

          <Link 
            to="/" 
            className="text-xs bg-midnightPanel hover:bg-negroProfundo text-blancoPuro border border-white/10 px-4 py-2 rounded-medium font-bold transition"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </header>

      {/* ================= HERO DE AGRADECIMIENTO Y BIENVENIDA ================= */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        
        <div className="bg-midnightPanel p-8 sm:p-12 rounded-large border border-naranjaEnergy/40 shadow-glowEnergy relative overflow-hidden text-center mb-8">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-naranjaEnergy/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* BADGE ANIMADO */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-naranjaEnergy/20 border-2 border-naranjaEnergy text-naranjaEnergy flex items-center justify-center text-4xl mx-auto mb-6 shadow-glowEnergy animate-bounce">
            🤝
          </div>

          <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block mb-2">
            CONFIRMACIÓN OFICIAL &bull; TSOLUTIONS IPIDD
          </span>

          <h1 className="font-bruno text-2xl sm:text-4xl text-blancoPuro leading-tight mb-4">
            ¡Bienvenido a la Familia <span className="text-naranjaEnergy">TSolutions</span>{clientName ? `, ${clientName}` : ""}!
          </h1>

          {/* MENSAJE EN VOZ Y TONO OFICIAL */}
          <div className="max-w-2xl mx-auto text-sm sm:text-base text-blancoPuro/90 leading-relaxed space-y-4 mb-8 text-left bg-negroProfundo/60 p-6 rounded-large border border-white/10 shadow-inner">
            <p>
              Estamos sumamente felices, agradecidos y comprometidos de que nos hagas partícipes en la <strong>construcción, renovación y escalamiento digital</strong> de tu empresa.
            </p>
            <p>
              En TSolutions IPIDD no creemos en el software huérfano ni en las soluciones genéricas. Nuestra misión es darte las herramientas exactas y transferirle el conocimiento a tu equipo para que operen con absoluta soltura y autonomía.
            </p>
            <p className="text-naranjaEnergy font-semibold">
              ¡Nos vemos en tu sesión de Entrega de Resultados! Prepararemos el análisis detallado de tus fugas operativas para trazar el mapa hacia tu independencia tecnológica.
            </p>
          </div>

          {/* RESUMEN DE LA CITA CONFIRMADA (SI EXISTE) */}
          {appointment && (
            <div className="bg-naranjaEnergy/10 border border-naranjaEnergy/30 p-5 rounded-large text-left max-w-xl mx-auto mb-8 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🗓️</span>
                <h2 className="font-bruno text-sm text-blancoPuro">
                  Resumen de tu Sesión Estratégica
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-humo block text-[11px]">Día:</span>
                  <strong className="text-blancoPuro">{appointment.selectedDate}</strong>
                </div>
                <div>
                  <span className="text-humo block text-[11px]">Hora:</span>
                  <strong className="text-naranjaEnergy font-bold">{appointment.selectedTime}</strong>
                </div>
                <div>
                  <span className="text-humo block text-[11px]">Modalidad:</span>
                  <strong className="text-blancoPuro">Google Meet (20 min 1 a 1)</strong>
                </div>
                <div>
                  <span className="text-humo block text-[11px]">Confirmación:</span>
                  <strong className="text-emerald-400">✓ Sincronizado en Sistema</strong>
                </div>
              </div>

              {appointment.gcalUrl && (
                <div className="mt-4 pt-3 border-t border-white/10 text-center">
                  <a
                    href={appointment.gcalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs px-4 py-2 rounded-medium shadow-glowEnergy transition"
                  >
                    <span>📅 Ver / Añadir a mi Google Calendar</span>
                    <span>↗</span>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* RESUMEN DEL E-BOOK DESCARGADO */}
          {downloadedEbook && (
            <div className="bg-negroProfundo p-4 rounded-medium border border-white/10 max-w-xl mx-auto mb-8 flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded overflow-hidden bg-midnightPanel p-1 shrink-0 border border-white/10 flex items-center justify-center">
                <img src={downloadedEbook.img} alt={downloadedEbook.title} className="w-full h-full object-contain" />
              </div>
              <div className="text-xs">
                <span className="text-naranjaEnergy font-bold block text-[10px] uppercase">
                  ✓ Material Descargado
                </span>
                <strong className="text-blancoPuro block">{downloadedEbook.title}</strong>
                <span className="text-humo text-[11px]">{downloadedEbook.format} &bull; {downloadedEbook.pages}</span>
              </div>
            </div>
          )}

          {/* ACCIONES Y BOTONES */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/portafolio"
              className="w-full sm:w-auto px-8 py-3.5 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs sm:text-sm rounded-medium shadow-glowEnergy transition"
            >
              📦 Explorar Portafolio Completo
            </Link>
            <Link
              to="/ebooks"
              className="w-full sm:w-auto px-6 py-3.5 bg-negroProfundo hover:bg-midnightPanel text-blancoPuro border border-white/10 rounded-medium text-xs font-bold transition"
            >
              📚 Ver Más E-books Gratuitos
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-[11px] text-humo flex flex-wrap items-center justify-center gap-4">
            <span>📞 Dudas inmediatas: contacto@tsolutionsipidd.com</span>
            <span>&bull;</span>
            <span>“Tecnología instalada. Conocimiento transferido. Negocios escalados.”</span>
          </div>

        </div>

      </main>

    </div>
  );
}

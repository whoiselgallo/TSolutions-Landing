import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function AgendaPage() {
  const [searchParams] = useSearchParams();

  const clientName = searchParams.get("nombre") || "";
  const clientEmail = searchParams.get("email") || "";
  const clientPkg = searchParams.get("paquete") || "";

  const calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0136SdwB5GlQxFc0PD_JxhollDfXPPWRkDyOryHIGg62IKkS9EhL_kSLnFRNxcyGFbm3Gnuq78?gv=true";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                TSOLUTIONS <span className="text-naranjaEnergy text-xs font-sans font-bold px-1.5 py-0.5 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30">AGENDA</span>
              </div>
              <p className="text-[10px] text-humo tracking-widest hidden sm:block">
                SESIONES ESTRATÉGICAS 1 A 1 &bull; 20 MINUTOS
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link 
              to="/portafolio" 
              className="text-xs text-humo hover:text-blancoPuro font-semibold px-3 py-2 rounded-medium transition hidden sm:block"
            >
              📦 Ver Portafolio
            </Link>
            <Link 
              to="/" 
              className="text-xs bg-midnightPanel hover:bg-negroProfundo text-blancoPuro border border-white/10 px-4 py-2 rounded-medium font-bold transition"
            >
              ← Volver al Inicio
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO DE AGENDA ================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 text-center relative border-b border-blancoPuro/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-naranjaEnergy/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnightPanel border border-naranjaEnergy/40 text-naranjaEnergy text-xs font-semibold mb-4 shadow-glowEnergy">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Disponibilidad en Tiempo Real &bull; Google Calendar</span>
          </div>

          <h1 className="font-bruno text-3xl sm:text-5xl text-blancoPuro leading-tight mb-4">
            Selecciona tu <span className="text-naranjaEnergy">Día y Horario</span>
          </h1>

          {clientName && (
            <p className="text-emerald-400 text-sm font-semibold mb-2">
              ✓ Prospecto: {clientName} {clientPkg ? `— ${clientPkg}` : ""}
            </p>
          )}

          <p className="font-inter text-sm sm:text-base text-humo max-w-2xl mx-auto leading-relaxed mb-6">
            Aparta tu sesión estratégica 1 a 1 de 20 minutos con nuestro Estratega Tecnológico. Analizaremos tu diagnóstico, detectaremos fugas operativas y te presentaremos el plan de acción a la medida.
          </p>

          {/* BENEFICIOS DE LA SESIÓN */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-left mb-4 text-xs">
            <div className="bg-midnightPanel/80 p-3.5 rounded-medium border border-white/5 flex items-start gap-2.5">
              <span className="text-lg">🎯</span>
              <div>
                <strong className="text-blancoPuro block">Entrega de Diagnóstico</strong>
                <span className="text-humo text-[11px]">Revisión de métricas de madurez digital.</span>
              </div>
            </div>
            <div className="bg-midnightPanel/80 p-3.5 rounded-medium border border-white/5 flex items-start gap-2.5">
              <span className="text-lg">🛠️</span>
              <div>
                <strong className="text-blancoPuro block">Arquitectura a la Medida</strong>
                <span className="text-humo text-[11px]">Recomendación del paquete o solución ideal.</span>
              </div>
            </div>
            <div className="bg-midnightPanel/80 p-3.5 rounded-medium border border-white/5 flex items-start gap-2.5">
              <span className="text-lg">🚀</span>
              <div>
                <strong className="text-blancoPuro block">Cero Compromiso</strong>
                <span className="text-humo text-[11px]">Sesión 100% gratuita y sin letras chiquitas.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CALENDARIO INTERACTIVO EN VIVO ================= */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        
        <div className="bg-midnightPanel p-4 sm:p-8 rounded-large border border-naranjaEnergy/40 shadow-glowEnergy">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-2">
            <div>
              <h2 className="font-bruno text-lg sm:text-xl text-blancoPuro flex items-center gap-2">
                <span>🗓️ Agenda de Citas &bull; TSolutions IPIDD</span>
              </h2>
              <p className="text-xs text-humo mt-0.5">
                Selecciona la hora que mejor se ajuste a tu itinerario. Recibirás confirmación automática y enlace de Google Meet.
              </p>
            </div>
            <a
              href={calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-naranjaEnergy hover:underline font-bold"
            >
              Abrir agenda en ventana completa ↗
            </a>
          </div>

          {/* IFRAME GOOGLE CALENDAR */}
          <div className="w-full rounded-medium overflow-hidden border border-white/15 bg-white shadow-card relative min-h-[620px]">
            <iframe
              src={calendarUrl}
              style={{ border: 0 }}
              width="100%"
              height="650"
              frameBorder="0"
              title="Google Calendar Appointment Scheduling"
              className="w-full h-[620px] sm:h-[680px]"
            ></iframe>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-humo">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Confirmación inmediata con recordatorios a tu correo y WhatsApp</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/diagnostico" className="text-naranjaEnergy hover:underline font-semibold">
                📝 ¿No has llenado tu diagnóstico? Llénalo aquí
              </Link>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}

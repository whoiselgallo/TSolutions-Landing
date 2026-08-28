import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function DiagnosticProcessing() {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("nombre") || "Empresario";
  const email = searchParams.get("email") || "";
  const pkg = searchParams.get("paquete") || "Diagnóstico Estratégico";

  const [diagnosticData, setDiagnosticData] = useState(null);
  const [progress, setProgress] = useState(25);
  const [stage, setStage] = useState("Analizando infraestructura y presencia en Google Maps...");

  const calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0136SdwB5GlQxFc0PD_JxhollDfXPPWRkDyOryHIGg62IKkS9EhL_kSLnFRNxcyGFbm3Gnuq78?gv=true";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Load stored diagnostic from localStorage
    try {
      const stored = localStorage.getItem("tsolutions_latest_diagnostic");
      if (stored) {
        setDiagnosticData(JSON.parse(stored));
      }
    } catch (e) {}

    // Simulated multi-stage AI evaluation progression
    const timer1 = setTimeout(() => {
      setProgress(55);
      setStage("RUA Agent: Mapeando cuellos de botella en WhatsApp y logística...");
    }, 1200);

    const timer2 = setTimeout(() => {
      setProgress(85);
      setStage("Sincronizando con base de datos y notificando a contacto@tsolutionsipidd.com...");
    }, 2400);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStage("✓ Evaluación preliminar completada. Listo para la sesión 1 a 1.");
    }, 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
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
                TSOLUTIONS <span className="text-naranjaEnergy text-xs font-sans font-bold px-1.5 py-0.5 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30">RUA ENGINE</span>
              </div>
              <p className="text-[10px] text-humo tracking-widest hidden sm:block">
                EVALUACIÓN EN PROCESO &bull; SESIÓN 1 A 1
              </p>
            </div>
          </Link>

          <Link 
            to="/" 
            className="text-xs bg-midnightPanel hover:bg-negroProfundo text-blancoPuro border border-white/10 px-4 py-2 rounded-medium font-bold transition"
          >
            ← Inicio
          </Link>
        </div>
      </header>

      {/* ================= PROCESAMIENTO & AVISO AL CLIENTE ================= */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        
        {/* BANNER PRINCIPAL DE AVISO DE INFORMACIÓN */}
        <div className="bg-midnightPanel p-6 sm:p-10 rounded-large border border-naranjaEnergy/40 shadow-glowEnergy text-center relative overflow-hidden mb-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-naranjaEnergy/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-naranjaEnergy/20 border-2 border-naranjaEnergy text-naranjaEnergy flex items-center justify-center text-3xl mx-auto mb-4 shadow-glowEnergy animate-bounce">
            🧠
          </div>

          <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block mb-1">
            ESTADO DEL DIAGNÓSTICO EN TIEMPO REAL
          </span>

          <h1 className="font-bruno text-2xl sm:text-4xl text-blancoPuro mb-3">
            ¡Información Recibida con Éxito, <span className="text-naranjaEnergy">{name}</span>!
          </h1>

          <p className="text-humo text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-6">
            Tus respuestas han sido ingresadas en nuestra base de datos conectada a <strong>RUA (Real Utility Agent)</strong> y notificadas al equipo técnico en <strong>contacto@tsolutionsipidd.com</strong>.
          </p>

          {/* BARRA DE PROGRESO DE LA EVALUACIÓN */}
          <div className="max-w-xl mx-auto bg-negroProfundo p-4 rounded-medium border border-white/10 mb-6 text-left">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-blancoPuro font-semibold">{stage}</span>
              <span className="text-naranjaEnergy font-mono font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-midnightPanel rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-orange-600 via-naranjaEnergy to-emerald-400 transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* LO QUE ESTÁ SUCEDIENDO CON TU INFORMACIÓN */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-left text-xs mb-8">
            <div className="p-3.5 rounded-medium bg-negroProfundo/70 border border-white/5">
              <span className="text-naranjaEnergy font-bold block mb-1">1. Registro en BD RUA</span>
              <p className="text-humo text-[11px]">Tus métricas fueron almacenadas en el sistema para cruce de patrones y benchmarking.</p>
            </div>
            <div className="p-3.5 rounded-medium bg-negroProfundo/70 border border-white/5">
              <span className="text-naranjaEnergy font-bold block mb-1">2. Notificación Inmediata</span>
              <p className="text-humo text-[11px]">El expediente completo fue enviado a contacto@tsolutionsipidd.com para su revisión.</p>
            </div>
            <div className="p-3.5 rounded-medium bg-negroProfundo/70 border border-white/5">
              <span className="text-naranjaEnergy font-bold block mb-1">3. Sesión de Resultados</span>
              <p className="text-humo text-[11px]">Un Estratega Tecnológico te entregará el reporte de 20 minutos en vivo.</p>
            </div>
          </div>

          {/* BOTÓN CTA PRINCIPAL HACIA LA AGENDA */}
          <a
            href="#agenda-en-vivo"
            className="inline-flex items-center gap-2 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-sm sm:text-base px-8 py-4 rounded-medium shadow-glowEnergy hover:shadow-glowEnergyHover transition-all transform hover:-translate-y-0.5"
          >
            <span>📅 Agendar Cita para Entrega de Resultados (20 min)</span>
            <span>↓</span>
          </a>
        </div>

        {/* ================= SECCIÓN DE AGENDA EN VIVO ================= */}
        <section id="agenda-en-vivo" className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-naranjaEnergy/40 shadow-card">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-2">
            <div>
              <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
                PASO FINAL: APARTA TU LUGAR
              </span>
              <h2 className="font-bruno text-xl sm:text-2xl text-blancoPuro mt-1 flex items-center gap-2">
                <span>🗓️ Selección de Día y Horario</span>
                <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Google Calendar en Vivo
                </span>
              </h2>
              <p className="text-xs text-humo mt-1">
                Elige el horario de tu preferencia para tu sesión 1 a 1 de entrega de resultados y propuesta tecnológica.
              </p>
            </div>
            
            <Link
              to={`/agenda?nombre=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&paquete=${encodeURIComponent(pkg)}`}
              className="text-xs text-naranjaEnergy hover:underline font-bold whitespace-nowrap"
            >
              Ver en página dedicada de agenda →
            </Link>
          </div>

          {/* IFRAME DE GOOGLE CALENDAR EMBEBIDO */}
          <div className="w-full rounded-medium overflow-hidden border border-white/15 bg-white shadow-card relative min-h-[620px]">
            <iframe
              src={calendarUrl}
              style={{ border: 0 }}
              width="100%"
              height="650"
              frameBorder="0"
              title="Disponibilidad Google Calendar"
              className="w-full h-[620px] sm:h-[680px]"
            ></iframe>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-humo">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span> Confirmación inmediata a tu correo electrónico
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span> Enlace directo de Google Meet incluido
            </span>
            <Link to="/" className="text-naranjaEnergy hover:underline font-bold">
              Volver al inicio
            </Link>
          </div>

        </section>

      </main>

    </div>
  );
}

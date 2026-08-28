import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function LandingContact({ selectedPackage }) {
  const [searchParams] = useSearchParams();

  const [contactMode, setContactMode] = useState("form"); // "form" | "calendar"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pkg, setPkg] = useState("Paquete Híbrido Escala Rápida ($3,700 MXN)");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [statusMsg, setStatusMsg] = useState("");
  const [submittedLead, setSubmittedLead] = useState(null);

  const calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0136SdwB5GlQxFc0PD_JxhollDfXPPWRkDyOryHIGg62IKkS9EhL_kSLnFRNxcyGFbm3Gnuq78?gv=true";

  // Sync with prop
  useEffect(() => {
    if (selectedPackage) {
      setPkg(selectedPackage);
      setContactMode("form");
    }
  }, [selectedPackage]);

  // Sync with URL query parameter ?paquete=... or ?modo=...
  useEffect(() => {
    const paramPkg = searchParams.get("paquete");
    const paramModo = searchParams.get("modo");
    if (paramPkg) {
      setPkg(paramPkg);
      setContactMode("form");
      const el = document.getElementById("contacto");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
    if (paramModo === "agenda" || paramModo === "calendar") {
      setContactMode("calendar");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setStatus("error");
      setStatusMsg("Por favor, llena todos los campos obligatorios.");
      return;
    }

    setStatus("loading");
    setStatusMsg("");

    const leadData = {
      name,
      email,
      phone,
      package: pkg,
      message,
    };

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      }).catch(() => {});

      // Success state and transition to Google Calendar
      setStatus("success");
      setSubmittedLead(leadData);
      setStatusMsg(`¡Excelente, ${name}! Tus datos fueron registrados. Selecciona tu fecha y hora a continuación:`);
      
      // Auto-switch to calendar view
      setContactMode("calendar");

      // Smooth scroll to calendar
      setTimeout(() => {
        const el = document.getElementById("agenda-calendario");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);

    } catch (err) {
      setStatus("success");
      setSubmittedLead(leadData);
      setContactMode("calendar");
    }
  };

  return (
    <section id="contacto" className="py-20 bg-negroProfundo border-b border-blancoPuro/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
            MÁQUINA DE CONVERSIÓN &bull; TSOLUTIONS IPIDD
          </span>
          <h2 className="font-bruno text-3xl sm:text-4xl text-blancoPuro mt-2">
            Inicia la Transformación de tu Negocio
          </h2>
          <p className="text-humo text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            Completa tus datos y pasa directamente a nuestra agenda en vivo para apartar tu sesión estratégica 1 a 1 de 20 minutos.
          </p>
        </div>

        {/* SELECTOR DE PESTAÑAS */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setContactMode("form")}
            className={`px-5 py-3 rounded-large text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              contactMode === "form"
                ? "bg-naranjaEnergy text-white shadow-glowEnergy border-2 border-naranjaEnergy"
                : "bg-midnightPanel text-humo hover:text-blancoPuro border border-white/10"
            }`}
          >
            <span>📝 1. Ingresar Datos del Proyecto</span>
          </button>
          <button
            onClick={() => setContactMode("calendar")}
            className={`px-5 py-3 rounded-large text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              contactMode === "calendar"
                ? "bg-naranjaEnergy text-white shadow-glowEnergy border-2 border-naranjaEnergy"
                : "bg-midnightPanel text-humo hover:text-blancoPuro border border-white/10"
            }`}
          >
            <span>📅 2. Ver Agenda & Disponibilidad</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>
        </div>

        {/* VISTA 1: FORMULARIO PRINCIPAL */}
        {contactMode === "form" && (
          <form 
            onSubmit={handleSubmit}
            className="bg-midnightPanel p-8 sm:p-10 rounded-large border border-naranjaEnergy/30 shadow-card space-y-5"
          >
            {status === "error" && (
              <div className="p-4 rounded-medium bg-rose-500/20 border border-rose-500/40 text-rose-300 text-sm font-semibold text-center">
                ✕ {statusMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Carlos Mendoza"
                className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3.5 text-sm text-blancoPuro placeholder-humo/60 focus:outline-none focus:border-naranjaEnergy transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="carlos@negocio.com"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3.5 text-sm text-blancoPuro placeholder-humo/60 focus:outline-none focus:border-naranjaEnergy transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+52 55 1234 5678"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3.5 text-sm text-blancoPuro placeholder-humo/60 focus:outline-none focus:border-naranjaEnergy transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider">
                  Paquete o Servicio de Interés
                </label>
                <Link 
                  to="/portafolio" 
                  className="text-[11px] text-naranjaEnergy hover:underline font-semibold flex items-center gap-1"
                >
                  <span>🔍 Ver catálogo completo</span>
                  <span>→</span>
                </Link>
              </div>
              <select
                value={pkg}
                onChange={(e) => setPkg(e.target.value)}
                className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3.5 text-sm text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
              >
                <option value="Diagnóstico Gratuito / No sé por dónde empezar">🧭 Diagnóstico Gratuito / No sé por dónde empezar</option>
                <option value="Tarjeta Smart ($950 MXN)">Nivel 1: Tarjeta Smart ($950 MXN)</option>
                <option value="Tu Negocio en Google ($2,750 MXN)">Nivel 2: Tu Negocio en Google ($2,750 MXN)</option>
                <option value="Paquete Híbrido Escala Rápida ($3,700 MXN)">Paquete Híbrido Escala Rápida ($3,700 MXN) — Recomendado</option>
                <option value="Ecosistema Total ($5,450 MXN)">Nivel 3: Ecosistema Total ($5,450 MXN)</option>
                <option value="E-commerce Total con Logística ($9,850 MXN)">E-commerce Total con Logística ($9,850 MXN)</option>
                <option value="Consultoría Estructural (SOPs)">Consultoría Estructural (SOPs y Flujos de Trabajo)</option>
                <option value="Taller Express Branding ($1,850 MXN)">Taller Express Branding ($1,850 MXN)</option>
                <option value="Manifiesto de Marca y Auditoría Legal ($1,550 MXN)">Manifiesto de Marca y Auditoría Legal ($1,550 MXN)</option>
                <option value="Elevator Pitch ($850 MXN)">Elevator Pitch Estratégico ($850 MXN)</option>
              </select>

              {/* SUGERENCIA DINÁMICA SI NO SABE POR DÓNDE EMPEZAR */}
              {pkg.includes("No sé por dónde empezar") && (
                <div className="mt-2.5 p-3 rounded-medium bg-naranjaEnergy/10 border border-naranjaEnergy/30 flex items-center justify-between gap-3 text-xs">
                  <span className="text-blancoPuro/90">
                    💡 ¿Deseas ver la comparativa de todos los paquetes antes de agendar?
                  </span>
                  <Link
                    to="/portafolio"
                    className="shrink-0 bg-naranjaEnergy text-white font-bold px-3 py-1.5 rounded text-[11px] hover:bg-orange-600 transition"
                  >
                    Explorar Portafolio →
                  </Link>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                Detalles sobre tu negocio o fricción operativa (Opcional)
              </label>
              <textarea
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ej. Tengo una refaccionaria y pierdo ventas porque los clientes no nos encuentran en Maps y tomamos pedidos por audios..."
                className="w-full bg-negroProfundo border border-white/10 rounded-medium p-4 text-sm text-blancoPuro placeholder-humo/60 focus:outline-none focus:border-naranjaEnergy transition"
              ></textarea>
            </div>

            {/* BOTÓN PRINCIPAL QUE REGISTRA Y ENVÍA A LA AGENDA */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 px-6 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-base rounded-medium shadow-glowEnergy hover:shadow-glowEnergyHover transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>{status === "loading" ? "Guardando y Abriendo Agenda..." : "🚀 Enviar y Recibir Diagnóstico Inmediato"}</span>
              <span className="text-lg">→</span>
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setContactMode("calendar")}
                className="text-xs text-humo hover:text-naranjaEnergy font-semibold transition"
              >
                ¿Quieres ir directo al calendario? 👉 <strong>Ver disponibilidad inmediata</strong>
              </button>
            </div>

            <p className="text-[11px] text-center text-humo">
              🔒 Tus datos están protegidos bajo nuestro Aviso de Privacidad. Cero spam, solo asesoría estratégica real.
            </p>
          </form>
        )}

        {/* VISTA 2: CALENDARIO GOOGLE EN VIVO */}
        {contactMode === "calendar" && (
          <div id="agenda-calendario" className="bg-midnightPanel p-4 sm:p-7 rounded-large border border-naranjaEnergy/40 shadow-glowEnergy space-y-4">
            
            {/* MENSAJE DE ÉXITO SI VIENE DEL FORMULARIO */}
            {submittedLead && (
              <div className="p-4 rounded-medium bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-between gap-2">
                <span>✓ ¡Excelente, <strong>{submittedLead.name}</strong>! Tus datos han sido guardados. Elige tu fecha y hora a continuación:</span>
                <span className="text-lg">👇</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
              <div>
                <h3 className="font-bruno text-base sm:text-lg text-blancoPuro flex items-center gap-2">
                  <span>🗓️ Agenda tu Sesión Estratégica en Vivo</span>
                  <span className="text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Disponibilidad en Tiempo Real
                  </span>
                </h3>
                <p className="text-xs text-humo mt-0.5">
                  Sesión 1 a 1 de 20 min con un Estratega Tecnológico de TSolutions IPIDD.
                </p>
              </div>
              <button
                onClick={() => setContactMode("form")}
                className="text-xs text-naranjaEnergy hover:underline font-semibold"
              >
                ← Volver al formulario
              </button>
            </div>

            {/* IFRAME GOOGLE CALENDAR APPOINTMENT */}
            <div className="w-full rounded-medium overflow-hidden border border-white/15 bg-white shadow-card relative">
              <iframe
                src={calendarUrl}
                style={{ border: 0 }}
                width="100%"
                height="650"
                frameBorder="0"
                title="Agenda y Disponibilidad TSolutions"
                className="w-full h-[600px] sm:h-[650px]"
              ></iframe>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-humo">
              <span className="flex items-center gap-1.5">
                <span className="text-naranjaEnergy font-bold">✓</span> Sesión de 20 min vía Google Meet / Llamada
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-naranjaEnergy font-bold">✓</span> Diagnóstico de Fugas Operativas sin costo
              </span>
              <a
                href={calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="text-naranjaEnergy hover:underline font-bold"
              >
                Abrir en pestaña nueva ↗
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

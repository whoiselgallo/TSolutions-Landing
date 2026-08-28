import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// ---- Personalidad y Conocimiento Base de RUA ----
const RUA_SYSTEM = `Eres RUA, el agente inteligente oficial de TSolutions IPIDD. Tu nombre completo es "RUA - Real Utility Agent".

Tu misión es asesorar a dueños de negocios y emprendedores sobre las soluciones tecnológicas, paquetes comerciales, consultoría andragógica y diagnósticos de TSolutions IPIDD.

Catálogo Oficial de Soluciones TSolutions IPIDD:
- 📱 Nivel 1: Tarjeta Smart ($950 MXN) — Bio link móvil en zona de pulgar para ventas inmediatas por WhatsApp.
- 📍 Nivel 2: Tu Negocio en Google ($2,750 MXN) — Rescate geográfico en Google Maps, unificación de horarios y SEO Local.
- 🔥 Paquete Híbrido Escala Rápida ($3,700 MXN) — Fusión de Smart Web + Google Maps (El más recomendado para PYMES).
- 💻 Nivel 3: Ecosistema Total ($5,450 MXN) — Sitio web corporativo completo, correos empresariales y Middleware de IA backend.
- 🛍️ E-commerce Total con Logística ($9,850 MXN) — Tienda online completa con pasarelas de pago y despacho automático mediante APIs de Uber Direct, DiDi y DHL.
- 🏛️ Consultoría Estructural (SOPs): Documentación de flujos de trabajo y procesos operativos.
- 🎨 Brand Builder & Taller de Identidad ($1,850 MXN): Logotipo, manual de marca y narrativa comercial.
- 🎓 Constancia de Aprendizaje: Capacitación en 3 dominios (Cognitivo, Psicomotor y Afectivo) para erradicar el miedo al cambio.
- 🧭 Diagnóstico Gratuito: Auditoría de 2 minutos en /diagnostico.
- 📅 Agenda en Vivo: Sesión 1 a 1 de 20 min con un Estratega Tecnológico en /agenda.

Reglas:
- Habla en español con tono seguro, cálido, profesional y directo.
- Mantén respuestas ágiles (1 a 3 párrafos concisos).
- Guía al usuario a llenar su diagnóstico en /diagnostico o a seleccionar su horario en /agenda.`;

// ---- Base de Conocimiento Resiliente Integrada en RUA (Offline/Fallback Inteligente) ----
function generateRuaResponse(userText) {
  const text = userText.toLowerCase();

  // 1. Diagnóstico / Auditoría / No sé por dónde empezar
  if (text.includes("diagnostico") || text.includes("diagnóstico") || text.includes("no sé") || text.includes("no se") || text.includes("empezar") || text.includes("auditoria") || text.includes("auditoría")) {
    return "¡Excelente! La mejor forma de saber exactamente qué necesita tu negocio es nuestro **Diagnóstico de Madurez Digital (2 min)**. \n\nAl llenarlo, analizamos tus fugas en Google Maps, WhatsApp y logística, y te generamos tu reporte personalizado para revisarlo en una sesión 1 a 1 de 20 minutos. Puedes llenarlo en [/diagnostico](/diagnostico) o agendar directo en [/agenda](/agenda).";
  }

  // 2. Agenda / Cita / Horarios / Sesión
  if (text.includes("agenda") || text.includes("cita") || text.includes("horario") || text.includes("agendar") || text.includes("sesion") || text.includes("sesión") || text.includes("meet")) {
    return "¡Listo! Puedes ver la disponibilidad en tiempo real y apartar tu **Sesión Estratégica 1 a 1 de 20 minutos** directamente en nuestra agenda oficial de Google Calendar:\n\n👉 Entra a [/agenda](/agenda) para seleccionar el día y la hora que mejor te acomode.";
  }

  // 3. Precios / Paquetes / Costos
  if (text.includes("precio") || text.includes("costo") || text.includes("cuanto") || text.includes("cuánto") || text.includes("paquete") || text.includes("portafolio")) {
    return "Manejamos precios 100% transparentes sin letras chiquitas:\n\n" +
      "• **Tarjeta Smart ($950 MXN):** Mobile-first para captar ventas por WhatsApp.\n" +
      "• **Tu Negocio en Google ($2,750 MXN):** Optimización y rescate en Google Maps.\n" +
      "• **🔥 Paquete Híbrido Escala Rápida ($3,700 MXN):** Smart Web + Google Maps (El más pedido).\n" +
      "• **Ecosistema Total ($5,450 MXN):** Web corporativa completa + Middleware de IA.\n" +
      "• **E-commerce Logística ($9,850 MXN):** Tienda online con envíos Uber/DHL y pasarela.\n\n" +
      "Puedes revisar todos los detalles y complementos en [/portafolio](/portafolio).";
  }

  // 4. Google Maps / Local
  if (text.includes("maps") || text.includes("mapa") || text.includes("google") || text.includes("ubicacion") || text.includes("ubicación") || text.includes("local")) {
    return "El caos en Google Maps es una de las fugas de dinero más comunes en negocios físicos. Si los clientes ven horarios desactualizados o direcciones erróneas, terminan yéndose con la competencia.\n\nCon **Tu Negocio en Google ($2,750 MXN)** o el **Paquete Híbrido ($3,700 MXN)** hacemos el rescate geográfico, depuración de fotos y automatización directa a WhatsApp. ¿Te gustaría evaluar tu ubicación?";
  }

  // 5. E-commerce / Tienda / Envíos / Uber / DiDi
  if (text.includes("tienda") || text.includes("ecommerce") || text.includes("e-commerce") || text.includes("envio") || text.includes("envío") || text.includes("uber") || text.includes("didi") || text.includes("logistica") || text.includes("logística") || text.includes("dhl")) {
    return "Nuestro **E-commerce Total con Logística ($9,850 MXN)** no es solo un carrito de compras tradicional: se conecta nativamente con las APIs de Uber Direct y DiDi para entregas locales express, y con DHL/Estafeta para envíos nacionales. \n\nEl sistema cotiza y despacha automáticamente sin que tengas que triangular repartidores a mano.";
  }

  // 6. Pasarelas de Pago / Terminal / Mercado Pago
  if (text.includes("pago") || text.includes("pasarela") || text.includes("stripe") || text.includes("mercado pago") || text.includes("terminal") || text.includes("tarjeta")) {
    return "Integramos pasarelas de cobro seguras en línea (Stripe, Mercado Pago, Conekta o PayPal) por **$1,200 MXN**, y además **¡te incluimos una Terminal Point Mini de Mercado Pago de REGALO!** 🎁 para que cobres con tarjeta física directamente en tu mostrador o local.\n\nPuedes cotizar este complemento en [/portafolio](/portafolio) o agendar tu asesoría en [/agenda](/agenda).";
  }

  // 7. Capacitación / Constancia / Miedo al cambio
  if (text.includes("capacitacion") || text.includes("capacitación") || text.includes("curso") || text.includes("constancia") || text.includes("equipo") || text.includes("cambio") || text.includes("andragog")) {
    return "Ese es el **Diferenciador TSolutions IPIDD**: no dejamos software huérfano. Al entregar cualquier ecosistema, capacitamos a tu personal bajo principios andragógicos en los 3 dominios (Cognitivo, Psicomotor y Afectivo) y entregamos la **Constancia de Aprendizaje y Dominio Tecnológico** emitida por TSolutions para que tu equipo opere con total autonomía.";
  }

  // 7. Saludo / Qué es RUA
  if (text.includes("hola") || text.includes("buenos") || text.includes("buenas") || text.includes("que onda") || text.includes("quién eres") || text.includes("quien eres")) {
    return "¡Qué onda! Soy **RUA 🤖 (Real Utility Agent)**, el asistente de inteligencia artificial de TSolutions IPIDD. \n\nEstoy conectado con nuestra base de datos para ayudarte a cotizar soluciones digitales, resolver dudas técnicas o conectarte con el equipo en una sesión estratégica de 20 min en [/agenda](/agenda). ¿Qué tiene en mente tu negocio hoy?";
  }

  // Fallback general inteligente
  return "Entendido. En TSolutions IPIDD ayudamos a empresas a erradicar fugas operativas mediante software instalado y capacitación andragógica al equipo.\n\nPuedes explorar el catálogo completo en [/portafolio](/portafolio), realizar tu auditoría en [/diagnostico](/diagnostico) o apartar tu sesión 1 a 1 de 20 min en [/agenda](/agenda). ¿Deseas que te oriente sobre algún paquete específico?";
}

// ---- Sugerencias rápidas ----
const QUICK_SUGGESTIONS = [
  "¿Cuáles son los precios?",
  "Quiero llenar mi diagnóstico",
  "¿Cómo funciona la agenda?",
  "¿Qué incluye el Paquete Híbrido?",
  "E-commerce con envíos Uber",
];

// ---- Componente de mensaje ----
function Message({ msg }) {
  const isRua = msg.role === "assistant";
  
  // Renderizar enlaces markdown básicos tipo [texto](url)
  const renderFormattedText = (content) => {
    if (!content) return null;
    const parts = content.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, linkText, url] = linkMatch;
        return (
          <Link
            key={idx}
            to={url}
            className="text-naranjaEnergy font-bold underline hover:text-white transition inline-flex items-center gap-0.5 mx-1"
          >
            {linkText}
          </Link>
        );
      }
      const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
      if (boldMatch) {
        return <strong key={idx} className="text-white font-bold">{boldMatch[1]}</strong>;
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className={`flex gap-3 ${isRua ? "items-start" : "items-start flex-row-reverse"}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
        isRua
          ? "bg-naranjaEnergy text-negroProfundo shadow-glowEnergy"
          : "bg-white/10 text-white"
      }`}>
        {isRua ? "R" : "Tú"}
      </div>
      {/* Burbuja */}
      <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
        isRua
          ? "bg-midnightPanel border border-white/10 text-gray-200 rounded-tl-none"
          : "bg-naranjaEnergy/25 border border-naranjaEnergy/40 text-white rounded-tr-none"
      }`}>
        {renderFormattedText(msg.text)}
        {msg.loading && (
          <span className="inline-flex gap-1 ml-2 align-middle">
            <span className="w-1.5 h-1.5 bg-naranjaEnergy rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 bg-naranjaEnergy rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 bg-naranjaEnergy rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        )}
      </div>
    </div>
  );
}

export default function RuaAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "¡Qué onda! Soy RUA 🤖, el agente de inteligencia artificial de TSolutions IPIDD.\n\nPuedo orientarte sobre precios, ayudarte a llenar tu [Diagnóstico de Madurez Digital](/diagnostico) o apartar tu sesión 1 a 1 de 20 min en la [Agenda en Vivo](/agenda). ¿En qué puedo apoyarte hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enfocar input al abrir
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setPulse(false);
    }
  }, [open]);

  async function sendMessage(text) {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");

    const newHistory = [...messages, { role: "user", text: userText }];
    setMessages([...newHistory, { role: "assistant", text: "", loading: true }]);
    setLoading(true);

    try {
      // 1. Intento primario: API Gemini Backend
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userText,
          systemInstruction: RUA_SYSTEM,
          model: "gemini-2.0-flash",
          temperature: 0.7,
          maxOutputTokens: 512,
          history: messages
            .filter((m) => !m.loading)
            .map((m) => ({ role: m.role === "assistant" ? "model" : "user", text: m.text })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.text && !data.fallback) {
          setMessages([
            ...newHistory,
            { role: "assistant", text: data.text },
          ]);
          setLoading(false);
          return;
        }
      }

      // 2. Fallback Inteligente Nativo RUA (Garantiza 100% de disponibilidad sin caídas)
      const fallbackReply = generateRuaResponse(userText);
      setTimeout(() => {
        setMessages([
          ...newHistory,
          { role: "assistant", text: fallbackReply },
        ]);
        setLoading(false);
      }, 350);

    } catch (err) {
      // Fallback local instantáneo
      const fallbackReply = generateRuaResponse(userText);
      setMessages([
        ...newHistory,
        { role: "assistant", text: fallbackReply },
      ]);
      setLoading(false);
    }
  }

  return (
    <>
      {/* ---- Botón flotante ---- */}
      <button
        id="rua-agent-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir asistente RUA"
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 sm:w-16 sm:h-16 rounded-full
          bg-naranjaEnergy text-negroProfundo
          font-bruno text-lg sm:text-xl font-black
          flex items-center justify-center
          shadow-glowEnergy hover:shadow-glowEnergyHover
          hover:scale-110 active:scale-95
          transition-all duration-300
          ${pulse ? "animate-pulse" : ""}
        `}
      >
        {open ? "✕" : "🤖"}
        {!open && pulse && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-negroProfundo animate-ping" />
        )}
      </button>

      {/* ---- Ventana del chat ---- */}
      {open && (
        <div
          id="rua-agent-chat"
          className="
            fixed bottom-24 right-4 sm:right-6 z-50
            w-[340px] sm:w-[380px] max-w-[calc(100vw-2rem)]
            bg-negroProfundo border border-naranjaEnergy/40
            rounded-2xl shadow-card
            flex flex-col overflow-hidden
          "
          style={{ maxHeight: "min(560px, calc(100vh - 120px))" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-midnightPanel border-b border-white/5 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-naranjaEnergy flex items-center justify-center font-bruno text-negroProfundo font-black text-base shadow-glowEnergy">
              R
            </div>
            <div>
              <p className="font-bruno text-white text-xs sm:text-sm">RUA Agent &bull; IA Activa</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                Conectado a BD &bull; TSolutions IPIDD
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-white/40 hover:text-white transition-colors text-base leading-none p-1"
            >
              ✕
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 bg-negroProfundo/95">
            {messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Sugerencias rápidas */}
          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex gap-1.5 flex-wrap flex-shrink-0 bg-negroProfundo">
              {QUICK_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-[10px] px-2.5 py-1 rounded-full border border-naranjaEnergy/30 text-naranjaEnergy hover:bg-naranjaEnergy/15 transition font-inter"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2 p-3 bg-midnightPanel border-t border-white/5 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              placeholder="Pregúntale a RUA..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              disabled={loading}
              className="flex-1 bg-negroProfundo border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-gray-500 outline-none focus:border-naranjaEnergy transition"
              autoComplete="off"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-xl bg-naranjaEnergy text-negroProfundo flex items-center justify-center font-bold hover:shadow-glowEnergy disabled:opacity-40 transition-all flex-shrink-0 text-sm"
            >
              {loading ? (
                <span className="w-3.5 h-3.5 border-2 border-negroProfundo/30 border-t-negroProfundo rounded-full animate-spin" />
              ) : (
                "➤"
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

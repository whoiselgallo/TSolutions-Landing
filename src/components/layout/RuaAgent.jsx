import React, { useState, useRef, useEffect } from "react";

// ---- Personalidad de RUA ----
const RUA_SYSTEM = `Eres RUA, el agente inteligente oficial de TSolutions IPIDD. Tu nombre completo es "RUA - Real Utility Agent".

Tu misión es ayudar a los visitantes a entender los servicios de TSolutions IPIDD, resolver dudas y guiarlos hacia la solución correcta para su negocio.

TSolutions IPIDD ofrece:
- 🎨 Brand Builder: Creación de identidad de marca, logos, brandbook, manifiesto de marca, pitch estratégico e identidad de voz
- 🤖 IA Personalizada: Agentes de inteligencia artificial entrenados para cada negocio (licencia estándar y premium)
- 💻 Desarrollo Web: Landing pages, ecommerce, menús digitales, integración de pagos y logística
- 🎙️ Producción Audiovisual: Podcasts, videos de marca, shorts para redes sociales
- 👨‍💻 Consultoría 1-on-1: Sesiones estratégicas privadas con el equipo
- 🤝 Membresía Pro: Soporte técnico mensual prioritario
- 🎙️ La Cueva del Güero: Podcast con estilo urbano y filosofía de banqueta (www.lacuevadelguero.com)
- 🔧 Ferretería Smart: Solución digital para ferreterías (ferreteria.tsolutionsipidd.com)

El Host de La Cueva del Güero es "Jr". El equipo principal de TSolutions lo lidera Eduardo Gallardo.

Reglas de comportamiento:
- Habla en español, con tono directo, cálido y profesional
- Sé breve: máximo 3 párrafos por respuesta
- Si alguien quiere comprar algo, guíalos a /tienda
- Si quieren consultoría, guíalos a /consultoria
- Si preguntan por Brand Builder, menciona identidad.tsolutionsipidd.com
- Si no sabes algo específico de TSolutions, dilo honestamente y ofrece conectarlos con el equipo
- No inventes precios — diles que pueden verlos en la tienda
- Nunca salgas del rol de RUA`;

// ---- Sugerencias rápidas ----
const QUICK_SUGGESTIONS = [
  "¿Qué servicios ofrecen?",
  "Quiero una página web",
  "¿Cómo funciona la IA personalizada?",
  "¿Cuánto cuesta el Brand Builder?",
  "Quiero una consultoría",
];

// ---- Componente de mensaje ----
function Message({ msg }) {
  const isRua = msg.role === "assistant";
  return (
    <div className={`flex gap-3 ${isRua ? "items-start" : "items-start flex-row-reverse"}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
        isRua
          ? "bg-naranjaEnergy text-negroProfundo shadow-[0_0_10px_rgba(249,115,22,0.5)]"
          : "bg-white/10 text-white"
      }`}>
        {isRua ? "R" : "Tú"}
      </div>
      {/* Burbuja */}
      <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
        isRua
          ? "bg-midnightPanel border border-white/10 text-gray-200 rounded-tl-none"
          : "bg-naranjaEnergy/20 border border-naranjaEnergy/30 text-white rounded-tr-none"
      }`}>
        {msg.text}
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
      text: "¡Qué onda! Soy RUA 🤖, el agente de TSolutions IPIDD. ¿En qué puedo ayudarte hoy? Puedo orientarte sobre nuestros servicios, precios o conectarte con el equipo.",
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
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userText,
          systemInstruction: RUA_SYSTEM,
          model: "gemini-2.0-flash",
          temperature: 0.75,
          maxOutputTokens: 512,
          history: messages
            .filter((m) => !m.loading)
            .map((m) => ({ role: m.role === "assistant" ? "model" : "user", text: m.text })),
        }),
      });

      const data = await res.json();
      const reply = data.text || "Lo siento, no pude procesar tu mensaje. Intenta de nuevo.";

      setMessages([
        ...newHistory,
        { role: "assistant", text: reply },
      ]);
    } catch {
      setMessages([
        ...newHistory,
        { role: "assistant", text: "Hubo un error de conexión. Por favor intenta de nuevo en un momento." },
      ]);
    } finally {
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
          w-16 h-16 rounded-full
          bg-naranjaEnergy text-negroProfundo
          font-bruno text-xl font-black
          flex items-center justify-center
          shadow-[0_0_24px_rgba(249,115,22,0.6)]
          hover:shadow-[0_0_40px_rgba(249,115,22,0.9)]
          hover:scale-110 active:scale-95
          transition-all duration-300
          ${pulse ? "animate-pulse" : ""}
        `}
      >
        {open ? "✕" : "🤖"}
        {/* Indicador de nuevo mensaje */}
        {!open && pulse && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-aquaTurquesa rounded-full border-2 border-negroProfundo animate-ping" />
        )}
      </button>

      {/* ---- Ventana del chat ---- */}
      {open && (
        <div
          id="rua-agent-chat"
          className="
            fixed bottom-28 right-6 z-50
            w-[360px] max-w-[calc(100vw-3rem)]
            bg-negroProfundo border border-naranjaEnergy/30
            rounded-2xl shadow-[0_0_60px_rgba(249,115,22,0.2)]
            flex flex-col overflow-hidden
            animate-scaleIn
          "
          style={{ maxHeight: "min(540px, calc(100vh - 160px))" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-midnightPanel border-b border-white/5 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-naranjaEnergy flex items-center justify-center font-bruno text-negroProfundo font-black text-lg shadow-[0_0_12px_rgba(249,115,22,0.5)]">
              R
            </div>
            <div>
              <p className="font-bruno text-white text-sm">RUA Agent</p>
              <p className="text-[10px] text-aquaTurquesa flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-aquaTurquesa rounded-full inline-block animate-pulse" />
                En línea · TSolutions IPIDD
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-white/30 hover:text-white transition-colors text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Sugerencias rápidas (solo si hay 1 mensaje) */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex gap-2 flex-wrap flex-shrink-0">
              {QUICK_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-[10px] px-3 py-1.5 rounded-full border border-naranjaEnergy/30 text-naranjaEnergy hover:bg-naranjaEnergy/10 transition font-inter"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2 p-4 border-t border-white/5 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              placeholder="Escríbeme algo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              disabled={loading}
              className="flex-1 bg-midnightPanel border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-naranjaEnergy transition duration-200"
              autoComplete="off"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-naranjaEnergy text-negroProfundo flex items-center justify-center font-bold hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-negroProfundo/30 border-t-negroProfundo rounded-full animate-spin" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState } from "react";

export default function AvatarEngineControl() {
  const [model, setModel] = useState("gemini-2.5-flash");
  const [temperature, setTemperature] = useState(0.7);
  const [systemPrompt, setSystemPrompt] = useState(`Eres "RUA / El Güero Bot", el Estratega Tecnológico de TSolutions IPIDD.
Tu misión es diagnosticar fricciones operativas en PYMES y recomendar soluciones basadas en nuestro lema:
"Tecnología instalada. Conocimiento transferido. Negocios escalados."
Tono: Autoritario, empático, directo, técnico pero accesible, enfocado 100% en ROI.`);

  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hola, soy el agente de TSolutions IPIDD. ¿Qué fricción operativa o cuello de botella deseas resolver en tu negocio hoy?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = { role: "user", text: inputMessage };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    setTimeout(() => {
      let botReply = "Entiendo perfectamente el dolor. Cuando las ventas aumentan pero el orden operativo colapsa, la solución no es contratar más personal desordenado, sino instalar un Ecosistema Digital con transferencia andragógica al equipo. ¿Manejamos pedidos locales con Uber/DiDi o requieren un sitio corporativo con IA?";
      
      if (userMsg.text.toLowerCase().includes("precio") || userMsg.text.toLowerCase().includes("costo")) {
        botReply = "Nuestros paquetes van desde la Tarjeta Smart ($950 MXN) y Tu Negocio en Google ($2,750 MXN) hasta el Paquete Híbrido Escala Rápida ($3,700 MXN) y E-commerce Total con Logística Integrada ($9,850 MXN). ¿Te gustaría agendar una auditoría gratuita?";
      }

      setMessages((prev) => [...prev, { role: "assistant", text: botReply }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="p-6 rounded-large bg-midnightPanel border border-naranjaEnergy/30 shadow-card">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy text-xs font-bold mb-2">
          <span>🤖 Módulo de Inteligencia Artificial</span>
        </div>
        <h2 className="font-bruno text-2xl text-blancoPuro">
          Avatar Engine & Agente Conversacional
        </h2>
        <p className="text-humo text-xs sm:text-sm mt-1">
          Configuración de personalidad, prompt engineering y entorno de pruebas del asistente inteligente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* PANEL DE CONFIGURACIÓN DEL AGENTE */}
        <div className="lg:col-span-5 bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card space-y-4">
          <h3 className="font-bruno text-sm text-blancoPuro border-b border-white/10 pb-3">
            Ajustes del Modelo & Prompt
          </h3>

          <div>
            <label className="block text-[11px] font-bold text-humo uppercase mb-1">Modelo de IA</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-negroProfundo border border-white/10 rounded px-3 py-2 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
            >
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (Recomendado - Ultra Rápido)</option>
              <option value="gemini-2.5-pro">Gemini 2.5 Pro (Razonamiento Complejo)</option>
              <option value="gpt-4o-mini">GPT-4o Mini</option>
              <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-bold text-humo uppercase mb-1">
              <span>Temperatura / Creatividad</span>
              <span className="text-naranjaEnergy">{temperature}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-naranjaEnergy"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-humo uppercase mb-1">Prompt de Sistema (System Prompt)</label>
            <textarea
              rows="8"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full bg-negroProfundo border border-white/10 rounded p-3 text-xs font-mono text-blancoPuro focus:outline-none focus:border-naranjaEnergy leading-relaxed"
            />
          </div>

          <button
            onClick={() => alert("✓ Configuración del agente guardada correctamente.")}
            className="w-full py-2.5 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs rounded shadow-glowEnergy transition"
          >
            💾 Guardar Configuración
          </button>
        </div>

        {/* CHAT PLAYGROUND / SIMULADOR */}
        <div className="lg:col-span-7 bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card flex flex-col h-[560px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <h4 className="font-bruno text-xs text-blancoPuro">Simulador de Respuestas en Vivo</h4>
            </div>
            <button
              onClick={() => setMessages([{ role: "assistant", text: "Chat reiniciado. ¿En qué te ayudo hoy?" }])}
              className="text-[11px] text-humo hover:text-white"
            >
              Reiniciar
            </button>
          </div>

          {/* MENSAJES */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-large text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-naranjaEnergy text-white font-medium"
                      : "bg-negroProfundo border border-white/10 text-blancoPuro/90"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-humo mt-1 px-1">
                  {m.role === "user" ? "Tú" : "Agente TSolutions"}
                </span>
              </div>
            ))}
            {loading && (
              <div className="text-xs text-humo italic p-2">El agente está procesando la respuesta...</div>
            )}
          </div>

          {/* INPUT FORM */}
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-white/10">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe un mensaje de prueba al bot..."
              className="flex-1 bg-negroProfundo border border-white/10 rounded-medium px-4 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs rounded-medium shadow transition"
            >
              Enviar
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}

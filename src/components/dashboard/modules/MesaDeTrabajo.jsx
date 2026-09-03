import React, { useState, useEffect } from "react";

export default function MesaDeTrabajo() {
  // Form State
  const [formData, setFormData] = useState({
    nombre: "",
    ocupacion: "",
    signo: "",
    fecha: "",
    barrio: "",
    trayectoria: "",
    herida: "",
    incomodo: "",
    gustos: "",
    cantidadCueCards: 6
  });

  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Timer State for Live Recording / Production
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (totalSec) => {
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Preset de prueba rápida
  const cargarDemo = () => {
    setFormData({
      nombre: "Rodrigo 'El Gallo' Santos",
      ocupacion: "Estratega Tecnológico & Fundador TSolutions",
      signo: "Escorpio",
      fecha: "1994-11-12",
      barrio: "San Juan Ixtayopan, CDMX",
      trayectoria: "Más de 8 años construyendo ecosistemas digitales, automatizaciones de IA y transformando PYMES tradicionales en unidades de alta rentabilidad.",
      herida: "Agencias tradicionales que cobraban fortunas y entregaban código huérfano sin capacitar al cliente.",
      incomodo: "Cuando un cliente cree que tener solo WhatsApp es suficiente para operar su negocio a nivel nacional.",
      gustos: "Café de especialidad, microcontroladores, Inteligencia Artificial aplicada y UI/UX Dark Tech.",
      cantidadCueCards: 6
    });
  };

  // Generador de Escaleta y Cue Cards
  const handleGenerar = (e) => {
    e.preventDefault();
    if (!formData.nombre) {
      alert("Por favor ingresa al menos el nombre del invitado o tema del episodio.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const cueCards = [
        {
          num: 1,
          bloque: "BLOQUE 01: EL GANCHO & BIENVENIDA",
          tiempo: "00:00 - 05:00",
          titulo: `Presentación de ${formData.nombre}`,
          objetivo: "Captar la atención en los primeros 30 segundos y definir la promesa del episodio.",
          preguntas: [
            `¿Cómo pasaste de ${formData.barrio || "tus inicios"} a liderar en ${formData.ocupacion || "tu industria"}?`,
            "¿Cuál fue el momento exacto donde supiste que tu camino no era el tradicional?"
          ],
          notaConductor: "Mantener energía alta. Mencionar el lema de TSolutions y la promesa del episodio."
        },
        {
          num: 2,
          bloque: "BLOQUE 02: LA TRAYECTORIA & ANTECEDENTES",
          tiempo: "05:00 - 15:00",
          titulo: "Construcción del Saber Hacer",
          objetivo: "Exponer el camino recorrido y los errores de los que casi nadie habla.",
          preguntas: [
            `Respecto a tu trayectoria (${formData.trayectoria.slice(0, 60)}...): ¿qué fue lo más difícil de aprender?`,
            "¿Cuál fue tu primera gran victoria operativa?"
          ],
          notaConductor: "Hacer énfasis en cómo el método venció a la suerte."
        },
        {
          num: 3,
          bloque: "BLOQUE 03: EL PUNTO DE QUIEBRE / LA HERIDA",
          tiempo: "15:00 - 30:00",
          titulo: "La Fricción y el Despertar",
          objetivo: "Conectar emocionalmente con la audiencia a través del momento más vulnerable.",
          preguntas: [
            `Mencionaste que tu gran herida fue: "${formData.herida || "el caos inicial"}". ¿Cómo te transformó ese golpe?`,
            "¿En qué momento estuviste a punto de tirar la toalla y qué te detuvo?"
          ],
          notaConductor: "Bajar el ritmo de voz. Dejar pausas para que el invitado profundice."
        },
        {
          num: 4,
          bloque: "BLOQUE 04: EL MOMENTO INCÓMODO & DEBATE",
          tiempo: "30:00 - 45:00",
          titulo: "Verdades Sin Filtro",
          objetivo: "Generar fragmentos virales y debate de alto valor.",
          preguntas: [
            `¿Qué opinas de: "${formData.incomodo || "la resistencia al cambio en las empresas"}"?`,
            "Si tuvieras enfrente a alguien cometiendo ese mismo error hoy, ¿qué le dirías sin rodeos?"
          ],
          notaConductor: "Buscar frases contundentes para clips de TikTok / Reels."
        },
        {
          num: 5,
          bloque: "BLOQUE 05: FILOSOFÍA & GUSTOS PERSONALES",
          tiempo: "45:00 - 55:00",
          titulo: "El Lado Humano",
          objetivo: "Humanizar al invitado y conocer sus pasiones fuera del trabajo.",
          preguntas: [
            `Entre tus gustos están (${formData.gustos || "la tecnología y los proyectos"}). ¿Cómo balanceas la vida personal con la alta exigencia?`,
            `Siendo signo ${formData.signo || "determinado"}, ¿te identificas con esa personalidad en los negocios?`
          ],
          notaConductor: "Tono relajado y cómplice."
        },
        {
          num: 6,
          bloque: "BLOQUE 06: CIERRE & LLAMADO A LA ACCIÓN",
          tiempo: "55:00 - 60:00",
          titulo: "El Consejo Maestro & Despedida",
          objetivo: "Concluir con una lección memorable y despedida del show.",
          preguntas: [
            "¿Cuál es la lección que te gustaría que todo emprendedor se lleve de esta charla?",
            "¿Dónde pueden encontrarte y qué nuevos proyectos estás cocinando?"
          ],
          notaConductor: "Agradecer al invitado y cerrar con el lema: Tecnología instalada. Conocimiento transferido. Negocios escalados."
        }
      ];

      setResultado({
        invitado: formData.nombre,
        ocupacion: formData.ocupacion,
        fecha: formData.fecha || new Date().toISOString().split("T")[0],
        cueCards: cueCards.slice(0, formData.cantidadCueCards || 6),
        guionTexto: `=== ESCALETA MAESTRA DE PRODUCCIÓN ===
INVITADO: ${formData.nombre}
OCUPACIÓN: ${formData.ocupacion}
FECHA: ${formData.fecha || new Date().toLocaleDateString()}
ORIGEN: ${formData.barrio}

${cueCards.slice(0, formData.cantidadCueCards || 6).map(c => `[${c.bloque} (${c.tiempo})]
TITULO: ${c.titulo}
OBJETIVO: ${c.objetivo}
PREGUNTAS:
${c.preguntas.map(p => `  • ${p}`).join("\n")}
NOTA: ${c.notaConductor}
`).join("\n----------------------------------------\n")}
`
      });

      setLoading(false);
      setActiveCardIndex(0);
    }, 600);
  };

  const handleCopiar = () => {
    if (resultado?.guionTexto) {
      navigator.clipboard.writeText(resultado.guionTexto);
      alert("¡Escaleta copiada al portapapeles con éxito!");
    }
  };

  const handleDescargar = () => {
    if (!resultado?.guionTexto) return;
    const blob = new Blob([resultado.guionTexto], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Escaleta_${(formData.nombre || "Produccion").replace(/\s+/g, "_")}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleLimpiar = () => {
    setFormData({
      nombre: "",
      ocupacion: "",
      signo: "",
      fecha: "",
      barrio: "",
      trayectoria: "",
      herida: "",
      incomodo: "",
      gustos: "",
      cantidadCueCards: 6
    });
    setResultado(null);
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER DE MESA DE TRABAJO CON CRONÓMETRO */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 rounded-large bg-midnightPanel border border-naranjaEnergy/30 shadow-card">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy text-xs font-bold mb-2">
            <span>📋 Módulo de Producción en Vivo</span>
          </div>
          <h2 className="font-bruno text-2xl text-blancoPuro">
            Mesa de Trabajo & Escaleta Pro
          </h2>
          <p className="text-humo text-xs sm:text-sm mt-1">
            Generador de escaletas dinámicas, storytelling de invitados y tarjetas Cue Cards para conducción.
          </p>
        </div>

        {/* CRONÓMETRO DE MESA */}
        <div className="flex items-center gap-4 bg-negroProfundo p-4 rounded-medium border border-white/10 shadow-inner">
          <div className="text-center">
            <span className="text-[10px] text-humo uppercase font-bold block">Tiempo en Vivo</span>
            <span className="font-mono text-3xl font-extrabold text-naranjaEnergy tracking-widest">
              {formatTime(seconds)}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                timerRunning
                  ? "bg-amber-600 hover:bg-amber-500 text-white"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white"
              }`}
            >
              {timerRunning ? "⏸ Pausar" : "▶ Iniciar"}
            </button>
            <button
              onClick={() => {
                setTimerRunning(false);
                setSeconds(0);
              }}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-humo text-[11px] rounded transition"
            >
              ↺ Reiniciar
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO DE STORYTELLING */}
        <div className="lg:col-span-5 bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bruno text-base text-blancoPuro flex items-center gap-2">
              <span>👤</span> Ficha del Invitado / Episodio
            </h3>
            <button
              type="button"
              onClick={cargarDemo}
              className="text-xs text-naranjaEnergy hover:underline font-bold"
            >
              + Cargar Demo
            </button>
          </div>

          <form onSubmit={handleGenerar} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-humo uppercase tracking-wider mb-1">
                Nombre Completo / Personaje *
              </label>
              <input
                type="text"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Ej. Carlos Mendoza"
                className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-humo uppercase tracking-wider mb-1">
                  Ocupación / Rol
                </label>
                <input
                  type="text"
                  name="ocupacion"
                  value={formData.ocupacion}
                  onChange={handleInputChange}
                  placeholder="Ej. CEO / Desarrollador"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-humo uppercase tracking-wider mb-1">
                  Signo / Perfil
                </label>
                <input
                  type="text"
                  name="signo"
                  value={formData.signo}
                  onChange={handleInputChange}
                  placeholder="Ej. Escorpio / Estratega"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-humo uppercase tracking-wider mb-1">
                  Fecha de Grabación
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-humo uppercase tracking-wider mb-1">
                  Barrio / Ciudad Origen
                </label>
                <input
                  type="text"
                  name="barrio"
                  value={formData.barrio}
                  onChange={handleInputChange}
                  placeholder="Ej. Tláhuac / CDMX"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-humo uppercase tracking-wider mb-1">
                Trayectoria y Logros
              </label>
              <textarea
                rows="2"
                name="trayectoria"
                value={formData.trayectoria}
                onChange={handleInputChange}
                placeholder="Principales hitos profesionales o biografía..."
                className="w-full bg-negroProfundo border border-white/10 rounded-medium p-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-naranjaEnergy uppercase tracking-wider mb-1">
                💔 La Herida / El Gran Reto Superado
              </label>
              <textarea
                rows="2"
                name="herida"
                value={formData.herida}
                onChange={handleInputChange}
                placeholder="El fracaso, engaño o crisis que transformó su mentalidad..."
                className="w-full bg-negroProfundo border border-white/10 rounded-medium p-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                ⚡ Momento Incómodo / Tema Polémico
              </label>
              <textarea
                rows="2"
                name="incomodo"
                value={formData.incomodo}
                onChange={handleInputChange}
                placeholder="Debate sin filtro, mitos que odia o anécdota incómoda..."
                className="w-full bg-negroProfundo border border-white/10 rounded-medium p-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-humo uppercase tracking-wider mb-1">
                Gustos y Pasiones
              </label>
              <input
                type="text"
                name="gustos"
                value={formData.gustos}
                onChange={handleInputChange}
                placeholder="Ej. Café, libros, código, autos..."
                className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs rounded-medium shadow-glowEnergy transition"
              >
                {loading ? "Generando Escaleta..." : "🚀 Generar Escaleta Pro"}
              </button>
              <button
                type="button"
                onClick={handleLimpiar}
                className="py-3 px-4 bg-negroProfundo hover:bg-white/10 text-humo text-xs rounded-medium border border-white/10 transition"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>

        {/* COLUMNA DERECHA: RESULTADOS, ESCALETA Y CUE CARDS INTERACTIVAS */}
        <div className="lg:col-span-7 space-y-6">
          
          {resultado ? (
            <>
              {/* BARRA DE ACCIÓN SUPERIOR */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-large bg-midnightPanel border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-bruno text-sm text-blancoPuro">
                    Escaleta: <span className="text-naranjaEnergy">{resultado.invitado}</span>
                  </span>
                  <span className="text-xs text-humo">({resultado.cueCards.length} Bloques)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopiar}
                    className="px-3 py-1.5 bg-negroProfundo hover:bg-naranjaEnergy hover:text-white text-humo border border-white/10 rounded text-xs font-bold transition"
                  >
                    📋 Copiar Guion
                  </button>
                  <button
                    onClick={handleDescargar}
                    className="px-3 py-1.5 bg-naranjaEnergy hover:bg-orange-600 text-white rounded text-xs font-bold shadow-glowEnergy transition"
                  >
                    💾 Descargar .MD
                  </button>
                </div>
              </div>

              {/* VISUALIZADOR DE CUE CARDS ACTIVAS */}
              <div className="bg-midnightPanel p-6 rounded-large border border-naranjaEnergy/30 shadow-card">
                
                {/* SELECTOR DE BLOQUES */}
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {resultado.cueCards.map((card, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveCardIndex(idx)}
                        className={`px-3 py-1.5 rounded-medium text-xs font-bold whitespace-nowrap transition ${
                          activeCardIndex === idx
                            ? "bg-naranjaEnergy text-white shadow-glowEnergy"
                            : "bg-negroProfundo text-humo hover:text-white border border-white/5"
                        }`}
                      >
                        Card {card.num}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-naranjaEnergy font-mono font-bold">
                    {activeCardIndex + 1} / {resultado.cueCards.length}
                  </span>
                </div>

                {/* TARJETA CUE CARD MAESTRA */}
                {resultado.cueCards[activeCardIndex] && (
                  <div className="bg-negroProfundo p-6 rounded-large border-2 border-naranjaEnergy/50 shadow-glowEnergy relative">
                    <div className="flex items-center justify-between text-xs text-humo mb-3">
                      <span className="font-bold text-naranjaEnergy uppercase tracking-wider">
                        {resultado.cueCards[activeCardIndex].bloque}
                      </span>
                      <span className="font-mono bg-midnightPanel px-2.5 py-1 rounded border border-white/10">
                        ⏱ {resultado.cueCards[activeCardIndex].tiempo}
                      </span>
                    </div>

                    <h4 className="font-bruno text-lg text-blancoPuro mb-2">
                      {resultado.cueCards[activeCardIndex].titulo}
                    </h4>

                    <p className="text-xs text-humo mb-4 bg-midnightPanel/70 p-3 rounded-medium border border-white/5">
                      <strong>🎯 Objetivo del Bloque:</strong> {resultado.cueCards[activeCardIndex].objetivo}
                    </p>

                    <div className="space-y-3 mb-5">
                      <span className="text-xs font-bold text-blancoPuro uppercase tracking-wider block">
                        Preguntas Sugeridas al Invitado:
                      </span>
                      {resultado.cueCards[activeCardIndex].preguntas.map((p, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-blancoPuro/90 bg-midnightPanel/40 p-2.5 rounded border border-white/5">
                          <span className="text-naranjaEnergy font-bold">Q{i + 1}:</span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-medium bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                      <strong>💡 Nota para Conducción:</strong> {resultado.cueCards[activeCardIndex].notaConductor}
                    </div>

                    {/* NAVEGACIÓN ENTRE CARDS */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                      <button
                        disabled={activeCardIndex === 0}
                        onClick={() => setActiveCardIndex((prev) => Math.max(0, prev - 1))}
                        className="px-4 py-2 bg-midnightPanel hover:bg-white/10 disabled:opacity-30 text-xs font-bold text-blancoPuro rounded transition"
                      >
                        ← Anterior
                      </button>
                      <button
                        disabled={activeCardIndex === resultado.cueCards.length - 1}
                        onClick={() => setActiveCardIndex((prev) => Math.min(resultado.cueCards.length - 1, prev + 1))}
                        className="px-4 py-2 bg-naranjaEnergy hover:bg-orange-600 disabled:opacity-30 text-xs font-bold text-white rounded shadow transition"
                      >
                        Siguiente Cue Card →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-midnightPanel p-12 rounded-large border border-dashed border-white/10 text-center flex flex-col items-center justify-center min-h-[400px]">
              <span className="text-4xl mb-3">📋</span>
              <h3 className="font-bruno text-lg text-blancoPuro mb-2">
                Mesa de Trabajo en Espera
              </h3>
              <p className="text-xs text-humo max-w-sm mb-6 leading-relaxed">
                Completa la ficha del invitado a la izquierda o pulsa en <em>"Cargar Demo"</em> para generar la escaleta estructurada y las tarjetas Cue Cards en tiempo real.
              </p>
              <button
                type="button"
                onClick={cargarDemo}
                className="px-4 py-2 bg-naranjaEnergy/20 hover:bg-naranjaEnergy text-naranjaEnergy hover:text-white border border-naranjaEnergy/40 rounded-medium text-xs font-bold transition"
              >
                Cargar Ficha de Ejemplo
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

import React, { useState } from "react";

export default function BlogAIManager() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      titulo: "Por qué las agencias tradicionales entregan código huérfano",
      categoria: "Consultoría Estratégica",
      estado: "Publicado",
      fecha: "2026-08-20",
      vistas: 1240,
      resumen: "El modelo tradicional de entrega sin capacitación andragógica está destinado a fracasar en el 85% de las PYMES."
    },
    {
      id: 2,
      titulo: "Cómo integrar APIs de Uber Direct y DiDi en tu E-commerce",
      categoria: "Tecnología y Logística",
      estado: "Publicado",
      fecha: "2026-08-28",
      vistas: 980,
      resumen: "Automatización de despachos locales sin depender de triangulaciones por mensajes de texto o llamadas."
    },
    {
      id: 3,
      titulo: "El poder del SEO Local en Google Maps para comercios",
      categoria: "Marketing Local",
      estado: "Borrador",
      fecha: "2026-09-02",
      vistas: 0,
      resumen: "Evita que tus clientes lleguen a direcciones falsas o terminen comprando a tu competencia por falta de depuración."
    }
  ]);

  const [activeTab, setActiveTab] = useState("lista"); // "lista" | "nuevo"
  const [form, setForm] = useState({
    titulo: "",
    categoria: "Consultoría Estratégica",
    resumen: "",
    contenido: ""
  });
  const [generating, setGenerating] = useState(false);

  const handleGenerateWithAI = () => {
    if (!form.titulo) {
      alert("Por favor escribe al menos la idea o título para generar con IA.");
      return;
    }

    setGenerating(true);
    setTimeout(() => {
      setForm((prev) => ({
        ...prev,
        resumen: `Análisis estratégico sobre ${prev.titulo}, destacando la importancia de la tecnología instalada, la transferencia andragógica y los resultados medibles para PYMES.`,
        contenido: `## Introducción a ${prev.titulo}

En el panorama empresarial actual, las organizaciones no pueden darse el lujo de implementar herramientas aisladas que generen fricción en lugar de rentabilidad.

### 1. El Diagnóstico del Problema
Cuando una empresa carece de un ecosistema articulado, el personal recurre a procesos manuales no documentados, generando cuellos de botella críticos.

### 2. La Metodología de Solución
* **Tecnología Instalada:** Arquitectura Full-Stack e IA al servicio del negocio.
* **Conocimiento Transferido:** Capacitación continua del equipo para erradicar el miedo al cambio.
* **Negocios Escalados:** Crecimiento ordenado e independiente.

### Conclusión
La verdadera transformación digital no consiste en acumular software, sino en dominar los procesos clave.`
      }));
      setGenerating(false);
    }, 1000);
  };

  const handleGuardarPost = (e) => {
    e.preventDefault();
    if (!form.titulo) return;

    const newPost = {
      id: Date.now(),
      titulo: form.titulo,
      categoria: form.categoria,
      estado: "Publicado",
      fecha: new Date().toISOString().split("T")[0],
      vistas: 1,
      resumen: form.resumen
    };

    setPosts([newPost, ...posts]);
    setForm({ titulo: "", categoria: "Consultoría Estratégica", resumen: "", contenido: "" });
    setActiveTab("lista");
    alert("¡Artículo guardado y publicado exitosamente!");
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-large bg-midnightPanel border border-naranjaEnergy/30 shadow-card">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy text-xs font-bold mb-2">
            <span>✍️ Módulo de Redacción & SEO</span>
          </div>
          <h2 className="font-bruno text-2xl text-blancoPuro">
            Gestor de Blog & Contenido con IA
          </h2>
          <p className="text-humo text-xs sm:text-sm mt-1">
            Redacción asistida por Inteligencia Artificial, optimización para motores de búsqueda y publicación directa.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("lista")}
            className={`px-4 py-2 rounded-medium text-xs font-bold transition ${
              activeTab === "lista"
                ? "bg-naranjaEnergy text-white shadow-glowEnergy"
                : "bg-negroProfundo text-humo hover:text-white border border-white/10"
            }`}
          >
            📋 Lista de Artículos
          </button>
          <button
            onClick={() => setActiveTab("nuevo")}
            className={`px-4 py-2 rounded-medium text-xs font-bold transition ${
              activeTab === "nuevo"
                ? "bg-naranjaEnergy text-white shadow-glowEnergy"
                : "bg-negroProfundo text-humo hover:text-white border border-white/10"
            }`}
          >
            ✍️ Redactar con IA
          </button>
        </div>
      </div>

      {activeTab === "lista" ? (
        /* TAB 1: LISTA DE ARTÍCULOS */
        <div className="bg-midnightPanel rounded-large border border-white/10 overflow-hidden shadow-card">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <span className="font-bruno text-sm text-blancoPuro">Artículos Publicados ({posts.length})</span>
            <span className="text-xs text-naranjaEnergy font-bold">Blog Corporativo TSolutions</span>
          </div>

          <div className="divide-y divide-white/5">
            {posts.map((post) => (
              <div key={post.id} className="p-5 hover:bg-negroProfundo/50 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-naranjaEnergy/20 text-naranjaEnergy">
                      {post.categoria}
                    </span>
                    <span className="text-xs text-humo font-mono">{post.fecha}</span>
                  </div>
                  <h4 className="font-bruno text-sm text-blancoPuro">{post.titulo}</h4>
                  <p className="text-xs text-humo leading-relaxed">{post.resumen}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right text-xs">
                    <span className="text-naranjaEnergy font-bold">{post.vistas}</span>
                    <span className="text-humo block text-[10px]">Lecturas</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                    {post.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* TAB 2: REDACTOR ASISTIDO POR IA */
        <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <h3 className="font-bruno text-base text-blancoPuro flex items-center gap-2">
              <span>🤖</span> Redacción Asistida con Inteligencia Artificial
            </h3>
            <button
              type="button"
              onClick={handleGenerateWithAI}
              disabled={generating}
              className="px-4 py-2 bg-gradient-to-r from-naranjaEnergy to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bruno text-xs rounded-medium shadow-glowEnergy transition flex items-center gap-2"
            >
              <span>{generating ? "Generando Artículo..." : "⚡ Autogenerar con IA"}</span>
            </button>
          </div>

          <form onSubmit={handleGuardarPost} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-humo uppercase tracking-wider mb-2">
                  Título del Artículo *
                </label>
                <input
                  type="text"
                  required
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                  placeholder="Ej. Los 5 pilares para transformar tu PYME con Inteligencia Artificial"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-humo uppercase tracking-wider mb-2">
                  Categoría
                </label>
                <select
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
                >
                  <option value="Consultoría Estratégica">Consultoría Estratégica</option>
                  <option value="Tecnología y Logística">Tecnología y Logística</option>
                  <option value="Marketing Local">Marketing Local</option>
                  <option value="Capacitación Andragógica">Capacitación Andragógica</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-humo uppercase tracking-wider mb-2">
                Resumen Ejecutivo / Meta Descripción
              </label>
              <input
                type="text"
                value={form.resumen}
                onChange={(e) => setForm({ ...form, resumen: e.target.value })}
                placeholder="Breve sinopsis optimizada para motores de búsqueda..."
                className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-humo uppercase tracking-wider mb-2">
                Contenido del Artículo (Formato Markdown)
              </label>
              <textarea
                rows="10"
                value={form.contenido}
                onChange={(e) => setForm({ ...form, contenido: e.target.value })}
                placeholder="Escribe tu artículo o usa el botón superior para autogenerar con IA..."
                className="w-full bg-negroProfundo border border-white/10 rounded-medium p-4 text-xs font-mono text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition leading-relaxed"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab("lista")}
                className="px-5 py-3 bg-negroProfundo hover:bg-white/10 text-humo text-xs rounded-medium border border-white/10 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs rounded-medium shadow-glowEnergy transition"
              >
                💾 Guardar y Publicar
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

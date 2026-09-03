import React, { useState } from "react";

export default function HooksGenerator() {
  const [tema, setTema] = useState("");
  const [estilo, setEstilo] = useState("friccion");
  const [generated, setGenerated] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const [hooks, setHooks] = useState({
    tiktok: "Si tu equipo todavía usa notas de voz para confirmar envíos, estás perdiendo el 40% de tus ventas y ni siquiera te has dado cuenta.",
    instagram: "3 errores silenciosos que cometen las PYMES al contratar agencias de marketing (y por qué terminan con código huérfano que nadie sabe usar). 👇 Desliza para ver la solución.",
    youtube: "¿Por qué el 90% del software para negocios fracasa en los primeros 3 meses? La verdad sobre la resistencia al cambio y el método andragógico.",
    facebook: "Atención dueños de negocios: Tener solo una página en Facebook o un link en WhatsApp NO es un ecosistema digital. Esto es lo que necesitas para escalar de verdad este año.",
    spotify: "Episodio Especial: De triangulaciones manuales a despachos automáticos con APIs nativas. Cómo recuperar el control de tu operación.",
    shorts: "POV: La agencia te entrega un software de $50,000 MXN pero nadie de tu equipo sabe cómo cambiar los precios. ¡Evita el código huérfano!"
  });

  const handleGenerate = (e) => {
    e.preventDefault();
    const promptTopic = tema || "Automatización y rescate operativo de PYMES";
    
    setHooks({
      tiktok: `¿Por qué tu competencia vende el doble teniendo menos personal? El secreto no es la suerte, es cómo resolvieron: "${promptTopic}".`,
      instagram: `Guarda este post 📌: La fórmula exacta para implementar "${promptTopic}" sin perder clientes en el camino ni sufrir por resistencia de tu equipo.`,
      youtube: `Caso Real: Cómo transformamos "${promptTopic}" en una máquina de facturación predecible e independiente.`,
      facebook: `Comunidad empresarial: Si estás batallando con "${promptTopic}", lee esto antes de contratar otra agencia que solo te dejará código huérfano.`,
      spotify: `Masterclass en audio: Los 3 pasos clave para dominar "${promptTopic}" y capacitar a tu personal con éxito garantizado.`,
      shorts: `Lo que NUNCA te dicen sobre "${promptTopic}": 3 verdades incómodas que debes escuchar hoy mismo.`
    });
    setGenerated(true);
  };

  const copyToClipboard = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const platforms = [
    { key: "tiktok", name: "TikTok / Reels", icon: "🎵", color: "hover:border-pink-500", badge: "Alta Retención (0-3s)" },
    { key: "instagram", name: "Instagram Carousel", icon: "📸", color: "hover:border-purple-500", badge: "Conversión & Guardados" },
    { key: "youtube", name: "YouTube Long Format", icon: "▶️", color: "hover:border-red-500", badge: "Autoridad & SEO" },
    { key: "shorts", name: "YouTube Shorts", icon: "⚡", color: "hover:border-rose-500", badge: "Viralidad Rápida" },
    { key: "facebook", name: "Facebook Ad Copy", icon: "👥", color: "hover:border-blue-500", badge: "Tráfico Local B2B" },
    { key: "spotify", name: "Podcast / Spotify", icon: "🎙️", color: "hover:border-emerald-500", badge: "Audiencia de Nicho" },
  ];

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="p-6 rounded-large bg-midnightPanel border border-naranjaEnergy/30 shadow-card">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy text-xs font-bold mb-2">
          <span>🧲 Módulo de Copywriting & Marketing</span>
        </div>
        <h2 className="font-bruno text-2xl text-blancoPuro">
          Generador de Hooks Magnéticos
        </h2>
        <p className="text-humo text-xs sm:text-sm mt-1">
          Crea ganchos de alta retención psicológica adaptados a cada plataforma social y formato publicitario.
        </p>
      </div>

      {/* CONTROLES DE GENERACIÓN */}
      <div className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-6">
            <label className="block text-[11px] font-bold text-humo uppercase tracking-wider mb-2">
              Tema Central o Dolor del Cliente
            </label>
            <input
              type="text"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              placeholder="Ej. Pérdida de clientes por horarios falsos en Google Maps..."
              className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-[11px] font-bold text-humo uppercase tracking-wider mb-2">
              Ángulo Psicológico
            </label>
            <select
              value={estilo}
              onChange={(e) => setEstilo(e.target.value)}
              className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy transition"
            >
              <option value="friccion">Fricción Operativa & Pérdida</option>
              <option value="curiosidad">Curiosidad & Contraintuitivo</option>
              <option value="storytelling">Storytelling & Transformación</option>
              <option value="autoridad">Autoridad & Metodología</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full py-3 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs rounded-medium shadow-glowEnergy transition duration-200"
            >
              ⚡ Generar Hooks
            </button>
          </div>
        </form>
      </div>

      {/* GRID DE CARDS MAGNÉTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((p) => (
          <div
            key={p.key}
            className={`bg-midnightPanel p-6 rounded-large border border-white/10 ${p.color} transition-all duration-300 shadow-card flex flex-col justify-between group`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{p.icon}</span>
                  <h4 className="font-bruno text-sm text-blancoPuro">{p.name}</h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-negroProfundo text-naranjaEnergy border border-naranjaEnergy/20">
                  {p.badge}
                </span>
              </div>

              <div className="bg-negroProfundo/70 p-4 rounded-medium border border-white/5 text-xs text-blancoPuro/90 leading-relaxed min-h-[110px] mb-4">
                {hooks[p.key]}
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-humo">Formato listo para copiar</span>
              <button
                onClick={() => copyToClipboard(p.key, hooks[p.key])}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  copiedKey === p.key
                    ? "bg-emerald-600 text-white"
                    : "bg-negroProfundo hover:bg-naranjaEnergy hover:text-white text-humo border border-white/10"
                }`}
              >
                {copiedKey === p.key ? "✓ Copiado" : "📋 Copiar"}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

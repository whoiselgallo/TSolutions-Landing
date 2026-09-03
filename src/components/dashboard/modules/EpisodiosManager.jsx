import React, { useState } from "react";

export default function EpisodiosManager() {
  const [episodios, setEpisodios] = useState([
    {
      id: "EP-01",
      titulo: "Cómo Erradicar el Código Huérfano en PYMES",
      invitado: "Rodrigo 'El Gallo' Santos",
      fecha: "2026-08-15",
      estado: "Publicado",
      views: "14.2K",
      duracion: "58:32",
      youtubeUrl: "https://youtube.com/watch?v=demo1",
      thumbnail: "/assets/iconografia/Full-stack_tech_agency_icon_design_202608271207.jpeg"
    },
    {
      id: "EP-02",
      titulo: "De Tienda Física a Despachos Automáticos con APIs",
      invitado: "Ing. Mariana Morales",
      fecha: "2026-08-22",
      estado: "Publicado",
      views: "9.8K",
      duracion: "49:15",
      youtubeUrl: "https://youtube.com/watch?v=demo2",
      thumbnail: "/assets/iconografia/Delivery_truck_icon_design_2K_202608271205.jpeg"
    },
    {
      id: "EP-03",
      titulo: "El Mito de las Redes Sociales sin Ecosistema Web",
      invitado: "Lic. Carlos Mendoza",
      fecha: "2026-09-05",
      estado: "En Edición",
      views: "-",
      duracion: "1:02:10",
      youtubeUrl: "",
      thumbnail: "/assets/iconografia/arte conceptual.jpg"
    },
    {
      id: "EP-04",
      titulo: "Capacitación Andragógica: Venciendo el Miedo al Software",
      invitado: "Dra. Sofía Rangel",
      fecha: "2026-09-12",
      estado: "Programado",
      views: "-",
      duracion: "45:00",
      youtubeUrl: "",
      thumbnail: "/assets/iconografia/aprendizaje cognitivo.jpg"
    }
  ]);

  const [selectedEpisodio, setSelectedEpisodio] = useState(episodios[0]);
  const [syncing, setSyncing] = useState(false);

  const handleSyncYouTube = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert("✓ Canal de YouTube sincronizado con éxito. 4 episodios actualizados.");
    }, 1200);
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-large bg-midnightPanel border border-naranjaEnergy/30 shadow-card">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy text-xs font-bold mb-2">
            <span>🎙️ Módulo de Producción Audiovisual</span>
          </div>
          <h2 className="font-bruno text-2xl text-blancoPuro">
            Episodios y Fichas Técnicas
          </h2>
          <p className="text-humo text-xs sm:text-sm mt-1">
            Control de producciones, sincronización con canales de video y fichas de invitados.
          </p>
        </div>

        <button
          onClick={handleSyncYouTube}
          disabled={syncing}
          className="px-4 py-2.5 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs rounded-medium shadow-glowEnergy transition flex items-center justify-center gap-2"
        >
          <span>{syncing ? "Sincronizando..." : "🔄 Sincronizar YouTube"}</span>
        </button>
      </div>

      {/* SPLIT LAYOUT: LISTA & DETALLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LISTA DE EPISODIOS */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-humo">
              Producciones ({episodios.length})
            </span>
            <span className="text-xs text-naranjaEnergy font-bold">Últimas Grabaciones</span>
          </div>

          <div className="space-y-3">
            {episodios.map((ep) => (
              <div
                key={ep.id}
                onClick={() => setSelectedEpisodio(ep)}
                className={`p-4 rounded-large border transition-all cursor-pointer flex gap-4 items-center ${
                  selectedEpisodio.id === ep.id
                    ? "bg-midnightPanel border-naranjaEnergy shadow-glowEnergy"
                    : "bg-midnightPanel/70 border-white/5 hover:border-white/20"
                }`}
              >
                <div className="w-16 h-16 rounded-medium overflow-hidden shrink-0 border border-white/10 bg-negroProfundo">
                  <img
                    src={ep.thumbnail}
                    alt={ep.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[10px] text-naranjaEnergy font-bold">{ep.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      ep.estado === "Publicado"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : ep.estado === "En Edición"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {ep.estado}
                    </span>
                  </div>
                  <h4 className="font-bruno text-xs text-blancoPuro truncate mb-1">{ep.titulo}</h4>
                  <p className="text-[11px] text-humo truncate">{ep.invitado}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DETALLE DEL EPISODIO SELECCIONADO */}
        <div className="lg:col-span-7 bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-naranjaEnergy font-bold">{selectedEpisodio.id}</span>
              <h3 className="font-bruno text-lg text-blancoPuro mt-0.5">{selectedEpisodio.titulo}</h3>
            </div>
            <span className="text-xs bg-negroProfundo px-3 py-1 rounded text-humo border border-white/10">
              ⏱ {selectedEpisodio.duracion}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-negroProfundo/70 p-3.5 rounded-medium border border-white/5">
              <span className="text-[10px] text-humo uppercase font-bold block mb-1">Invitado Principal</span>
              <span className="text-xs font-bold text-blancoPuro">{selectedEpisodio.invitado}</span>
            </div>
            <div className="bg-negroProfundo/70 p-3.5 rounded-medium border border-white/5">
              <span className="text-[10px] text-humo uppercase font-bold block mb-1">Fecha Grabación</span>
              <span className="text-xs font-bold text-blancoPuro">{selectedEpisodio.fecha}</span>
            </div>
            <div className="bg-negroProfundo/70 p-3.5 rounded-medium border border-white/5">
              <span className="text-[10px] text-humo uppercase font-bold block mb-1">Impacto / Views</span>
              <span className="text-xs font-bold text-naranjaEnergy">{selectedEpisodio.views}</span>
            </div>
          </div>

          <div className="p-4 rounded-medium bg-negroProfundo border border-white/10 space-y-3">
            <h4 className="font-bruno text-xs text-blancoPuro">Ficha Técnica & Enlaces</h4>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={selectedEpisodio.youtubeUrl || "https://tsolutions.com.mx/producciones/" + selectedEpisodio.id.toLowerCase()}
                className="flex-1 bg-midnightPanel border border-white/10 rounded px-3 py-2 text-xs text-humo font-mono"
              />
              <button
                onClick={() => alert("Enlace copiado")}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-bold"
              >
                Copiar
              </button>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => alert("Abriendo ficha de edición")}
              className="flex-1 py-3 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs rounded-medium shadow-glowEnergy transition"
            >
              ✏️ Editar Ficha Técnica
            </button>
            <button
              onClick={() => alert("Descargando paquete de clips")}
              className="px-4 py-3 bg-negroProfundo hover:bg-white/10 text-humo border border-white/10 rounded-medium text-xs font-bold transition"
            >
              📥 Exportar Recursos
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

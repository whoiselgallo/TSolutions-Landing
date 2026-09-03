import React, { useState, useRef } from "react";
import videoBg from "../../../assets/videos/VIDTS.mp4";

export default function VideoClipEditor() {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(15);
  const [clipTitle, setClipTitle] = useState("Clip 01: El Momento Clave");
  const [clips, setClips] = useState([
    { id: 1, title: "Hook Inicial: Caos Operativo", start: 0, end: 12, platform: "TikTok / Shorts" },
    { id: 2, title: "La Solución: Ecosistema Digital", start: 24, end: 55, platform: "Instagram Reels" },
  ]);

  const formatSec = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 10);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSetStart = () => {
    setStartTime(currentTime);
  };

  const handleSetEnd = () => {
    setEndTime(currentTime);
  };

  const handleAddClip = () => {
    if (endTime <= startTime) {
      alert("El tiempo final debe ser mayor al tiempo inicial.");
      return;
    }

    const newClip = {
      id: Date.now(),
      title: clipTitle || `Clip ${clips.length + 1}`,
      start: startTime,
      end: endTime,
      platform: "Reels / TikTok"
    };

    setClips([...clips, newClip]);
    setClipTitle(`Clip ${clips.length + 2}: Momento Destacado`);
  };

  const handlePlayClip = (clip) => {
    if (videoRef.current) {
      videoRef.current.currentTime = clip.start;
      videoRef.current.play();
    }
  };

  const handleDeleteClip = (id) => {
    setClips(clips.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="p-6 rounded-large bg-midnightPanel border border-naranjaEnergy/30 shadow-card">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy text-xs font-bold mb-2">
          <span>🎬 Módulo de Post-Producción</span>
        </div>
        <h2 className="font-bruno text-2xl text-blancoPuro">
          Editor de Video & Clips para Redes
        </h2>
        <p className="text-humo text-xs sm:text-sm mt-1">
          Corte visual de segmentos, marcas de tiempo precisas y preparación de fragmentos virales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* REPRODUCTOR Y TIMELINE */}
        <div className="lg:col-span-7 bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card space-y-4">
          <div className="relative rounded-large overflow-hidden border border-white/10 bg-black aspect-video flex items-center justify-center">
            <video
              ref={videoRef}
              src={videoBg}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              controls
              className="w-full h-full object-contain"
            />
          </div>

          {/* TIMELINE CONTROLS */}
          <div className="bg-negroProfundo p-4 rounded-medium border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-naranjaEnergy font-bold">Tiempo Actual: {formatSec(currentTime)}</span>
              <span className="text-humo">Duración: {formatSec(duration)}</span>
            </div>

            {/* MARCADORES IN / OUT */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center justify-between bg-midnightPanel p-3 rounded border border-white/10">
                <div>
                  <span className="text-[10px] text-humo uppercase font-bold block">Punto Entrada [IN]</span>
                  <span className="font-mono text-xs text-emerald-400 font-bold">{formatSec(startTime)}</span>
                </div>
                <button
                  onClick={handleSetStart}
                  className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded text-xs font-bold transition"
                >
                  Fijar IN
                </button>
              </div>

              <div className="flex items-center justify-between bg-midnightPanel p-3 rounded border border-white/10">
                <div>
                  <span className="text-[10px] text-humo uppercase font-bold block">Punto Salida [OUT]</span>
                  <span className="font-mono text-xs text-rose-400 font-bold">{formatSec(endTime)}</span>
                </div>
                <button
                  onClick={handleSetEnd}
                  className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded text-xs font-bold transition"
                >
                  Fijar OUT
                </button>
              </div>
            </div>

            {/* FORMULARIO AGREGAR CLIP */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-humo uppercase mb-1">Nombre del Clip</label>
                <input
                  type="text"
                  value={clipTitle}
                  onChange={(e) => setClipTitle(e.target.value)}
                  className="w-full bg-midnightPanel border border-white/10 rounded px-3 py-2 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                />
              </div>
              <button
                onClick={handleAddClip}
                className="w-full sm:w-auto px-5 py-2 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs rounded shadow-glowEnergy transition"
              >
                + Guardar Segmento
              </button>
            </div>
          </div>
        </div>

        {/* LISTA DE CLIPS GUARDADOS */}
        <div className="lg:col-span-5 bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-bruno text-sm text-blancoPuro">Clips Listos para Redes ({clips.length})</h3>
            <span className="text-xs text-naranjaEnergy font-bold">TikTok / Reels</span>
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {clips.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-medium bg-negroProfundo border border-white/5 hover:border-naranjaEnergy/40 transition flex flex-col justify-between gap-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bruno text-xs text-blancoPuro">{c.title}</h4>
                    <span className="text-[10px] text-naranjaEnergy font-semibold">{c.platform}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteClip(c.id)}
                    className="text-humo hover:text-rose-400 text-xs p-1"
                    title="Eliminar clip"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-humo pt-2 border-t border-white/5 font-mono">
                  <span>⏱ {formatSec(c.start)} → {formatSec(c.end)}</span>
                  <span className="text-white font-bold">({Math.round(c.end - c.start)}s)</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handlePlayClip(c)}
                    className="flex-1 py-1.5 bg-midnightPanel hover:bg-naranjaEnergy hover:text-white text-xs font-bold text-blancoPuro rounded transition"
                  >
                    ▶ Previsualizar
                  </button>
                  <button
                    onClick={() => alert(`Exportando clip: "${c.title}" (${Math.round(c.end - c.start)}s)`)}
                    className="px-3 py-1.5 bg-naranjaEnergy/20 hover:bg-naranjaEnergy text-naranjaEnergy hover:text-white text-xs font-bold rounded transition"
                  >
                    Exportar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

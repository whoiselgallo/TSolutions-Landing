import { useState } from "react";
import {
  roadmapPhases,
  kanbanColumnsV2,
  kanbanColumnsV3,
} from "./data";

export default function Dashboard() {
  const [selectedVersion, setSelectedVersion] = useState("v2");

  const kanbanColumns =
    selectedVersion === "v2" ? kanbanColumnsV2 : kanbanColumnsV3;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-orange-400">
            TSolutions IPIDD · Design System
          </h1>
          <p className="text-sm text-slate-400">
            Roadmap & Kanban — V2 / V3
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedVersion("v2")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition
              ${
                selectedVersion === "v2"
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
          >
            Versión V2
          </button>
          <button
            onClick={() => setSelectedVersion("v3")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition
              ${
                selectedVersion === "v3"
                  ? "bg-orange-500 text-slate-950"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
          >
            Versión V3
          </button>
        </div>
      </header>

      {/* Grid principal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Roadmap visual */}
        <section className="xl:col-span-1 bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">
            Roadmap visual
          </h2>

          <div className="space-y-4">
            {roadmapPhases.map((phase) => (
              <div
                key={phase.id}
                className={`relative rounded-lg border border-slate-700 p-4`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${phase.color}`}
                    />
                    <h3 className="text-sm font-medium text-slate-100">
                      {phase.label}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400">
                    {phase.period} · {phase.status}
                  </span>
                </div>

                <ul className="mt-2 space-y-1 text-xs text-slate-300">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-cyan-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Kanban */}
        <section className="xl:col-span-2 bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-300">
              Tablero Kanban — {selectedVersion.toUpperCase()}
            </h2>
            <span className="text-xs text-slate-500">
              Click en V2 / V3 para cambiar contexto
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {kanbanColumns.map((col) => (
              <div
                key={col.id}
                className={`flex flex-col rounded-lg bg-slate-950/60 border ${col.color} p-3`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-slate-100 uppercase tracking-wide">
                    {col.title}
                  </h3>
                  <span className="text-[10px] text-slate-500">
                    {col.tasks.length} tareas
                  </span>
                </div>

                <div className="space-y-2">
                  {col.tasks.length === 0 && (
                    <div className="text-[11px] text-slate-500 italic">
                      Aún sin tareas en esta fase.
                    </div>
                  )}

                  {col.tasks.map((task, idx) => (
                    <article
                      key={idx}
                      className="rounded-md bg-slate-800/70 border border-slate-700 px-3 py-2 text-[11px] text-slate-200 hover:border-cyan-500 hover:bg-slate-800 transition"
                    >
                      {task}
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

import React from "react";
import { 
  DashboardLayout,
  AnalyticsChart,
  ProgressBar,
  StatusPanel,
  roadmapPhases,
  kanbanColumnsV2,
  kanbanColumnsV3
} from "./index";

export default function Dashboard() {
  return (
    <DashboardLayout>

      {/* ===================== HERO ===================== */}
      <section className="mb-10">
        <h1 className="text-3xl font-inter font-bold text-blancoPuro">
          Dashboard PRO — TSolutions IPIDD
        </h1>
        <p className="text-blancoPuro/70 mt-2">
          Roadmap, métricas y progreso del sistema corporativo.
        </p>
      </section>

      {/* ===================== ANALYTICS ===================== */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <AnalyticsChart />
        <StatusPanel tokens={roadmapPhases.length} interactivity={kanbanColumnsV2.length} />
        <ProgressBar progress={70} />
      </section>

      {/* ===================== ROADMAP ===================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-inter font-semibold text-blancoPuro mb-4">
          Roadmap — Evolución del Sistema
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmapPhases.map((phase) => (
            <div
              key={phase.id}
              className={`rounded-soft p-5 shadow-glowTurquesaSoft ${phase.color} text-negroProfundo`}
            >
              <h3 className="text-xl font-bold">{phase.label}</h3>
              <p className="opacity-80">{phase.period}</p>
              <p className="mt-1 font-semibold">{phase.status}</p>

              <ul className="mt-4 space-y-1">
                {phase.items.map((item, index) => (
                  <li key={index} className="text-sm">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== KANBAN V2 ===================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-inter font-semibold text-blancoPuro mb-4">
          Kanban — Versión V2
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {kanbanColumnsV2.map((col) => (
            <div
              key={col.id}
              className={`rounded-soft p-4 bg-negroProfundo border ${col.color}`}
            >
              <h3 className="text-lg font-bold text-blancoPuro mb-3">
                {col.title}
              </h3>

              <ul className="space-y-2">
                {col.tasks.map((task, index) => (
                  <li
                    key={index}
                    className="text-sm text-blancoPuro/80 bg-blancoPuro/10 p-2 rounded-soft"
                  >
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== KANBAN V3 ===================== */}
      <section className="mb-12">
        <h2 className="text-2xl font-inter font-semibold text-blancoPuro mb-4">
          Kanban — Versión V3
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {kanbanColumnsV3.map((col) => (
            <div
              key={col.id}
              className={`rounded-soft p-4 bg-negroProfundo border ${col.color}`}
            >
              <h3 className="text-lg font-bold text-blancoPuro mb-3">
                {col.title}
              </h3>

              <ul className="space-y-2">
                {col.tasks.length > 0 ? (
                  col.tasks.map((task, index) => (
                    <li
                      key={index}
                      className="text-sm text-blancoPuro/80 bg-blancoPuro/10 p-2 rounded-soft"
                    >
                      {task}
                    </li>
                  ))
                ) : (
                  <p className="text-blancoPuro/50 italic">Sin tareas</p>
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </DashboardLayout>
  );
}

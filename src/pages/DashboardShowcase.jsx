import React from "react";

// Componentes del dashboard
import {
  DashboardLayout,
  ProgressBar,
  AnalyticsChart,
  StatusPanel,
} from "../components/dashboard";

// Efecto de transición
import PageTransition from "../effects/transitions/PageTransition";

export default function DashboardShowcase() {
  const progress = 100;

  const data = [
    { name: "Buttons", design: 100, functional: 100 },
    { name: "Cards", design: 100, functional: 100 },
    { name: "Modals", design: 100, functional: 100 },
    { name: "Inputs", design: 100, functional: 100 },
    { name: "Selects", design: 100, functional: 100 },
    { name: "Sliders", design: 100, functional: 100 },
  ];

  return (
    <PageTransition type="fade" glow>
      <DashboardLayout>

        {/* ================= HEADER ================= */}
        <h1 className="text-4xl font-bruno text-aquaTurquesa mb-10">
          Dashboard Showcase
        </h1>

        {/* ================= PROGRESS ================= */}
        <section className="mb-16">
          <h2 className="text-2xl font-bruno mb-4">Progreso General</h2>
          <ProgressBar progress={progress} />
        </section>

        {/* ================= ANALYTICS ================= */}
        <section className="mb-16">
          <h2 className="text-2xl font-bruno mb-4">Componentes Completados</h2>
          <AnalyticsChart data={data} />
        </section>

        {/* ================= STATUS PANEL ================= */}
        <section>
          <h2 className="text-2xl font-bruno mb-4">Estado del Sistema</h2>
          <StatusPanel
            tokens="✔ Tokens completos"
            interactivity="✔ Interactividad activa"
            components="✔ Componentes optimizados"
          />
        </section>

      </DashboardLayout>
    </PageTransition>
  );
}

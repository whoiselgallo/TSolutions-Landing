import React from "react";

// Dashboard components
import {
  DashboardLayout,
  ProgressBar,
  AnalyticsChart,
  StatusPanel,
} from "../components/dashboard";

// Page transition
import PageTransition from "../effects/transitions/PageTransition";

// UI components (si los tienes en /ui)
import { Card } from "../components/ui";

export default function DashboardFullDemo() {
  const progress = 100;

  const componentsData = [
    { name: "Buttons", design: 100, functional: 100 },
    { name: "Cards", design: 100, functional: 100 },
    { name: "Modals", design: 100, functional: 100 },
    { name: "Inputs", design: 100, functional: 100 },
    { name: "Selects", design: 100, functional: 100 },
    { name: "Sliders", design: 100, functional: 100 },
    { name: "Tooltips", design: 100, functional: 100 },
    { name: "Tables", design: 100, functional: 100 },
  ];

  return (
    <PageTransition type="fade" glow>
      <DashboardLayout>

        {/* ================= HEADER ================= */}
        <h1 className="text-4xl font-bruno text-aquaTurquesa mb-10">
          Dashboard Full Demo
        </h1>

        {/* ================= GLOBAL PROGRESS ================= */}
        <section className="mb-16">
          <h2 className="text-2xl font-bruno mb-4">Progreso General del Sistema</h2>
          <ProgressBar progress={progress} />
        </section>

        {/* ================= METRIC CARDS ================= */}
        <section className="mb-16">
          <h2 className="text-2xl font-bruno mb-4">Métricas del Proyecto</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card glow>
              <h3 className="text-xl font-bruno mb-2">Componentes</h3>
              <p className="text-4xl font-bruno text-aquaTurquesa">100%</p>
            </Card>

            <Card glow>
              <h3 className="text-xl font-bruno mb-2">Tokens</h3>
              <p className="text-4xl font-bruno text-aquaTurquesa">100%</p>
            </Card>

            <Card glow>
              <h3 className="text-xl font-bruno mb-2">Interactividad</h3>
              <p className="text-4xl font-bruno text-aquaTurquesa">100%</p>
            </Card>
          </div>
        </section>

        {/* ================= ANALYTICS CHART ================= */}
        <section className="mb-16">
          <h2 className="text-2xl font-bruno mb-4">Componentes Completados</h2>
          <AnalyticsChart data={componentsData} />
        </section>

        {/* ================= STATUS PANEL ================= */}
        <section className="mb-16">
          <h2 className="text-2xl font-bruno mb-4">Estado del Sistema</h2>
          <StatusPanel
            tokens="✔ Tokens completos"
            interactivity="✔ Interactividad activa"
            components="✔ Componentes optimizados"
          />
        </section>

        {/* ================= ACTIVITY LOG ================= */}
        <section className="mb-16">
          <h2 className="text-2xl font-bruno mb-4">Actividad Reciente</h2>

          <div className="space-y-6">
            <Card>
              <p className="font-inter">✔ Se completó el módulo de Inputs</p>
            </Card>
            <Card>
              <p className="font-inter">✔ Se integró PageTransition en todas las vistas</p>
            </Card>
            <Card>
              <p className="font-inter">✔ Se finalizó el sistema de tokens corporativos</p>
            </Card>
          </div>
        </section>

        {/* ================= PERFORMANCE SECTION ================= */}
        <section className="mb-16">
          <h2 className="text-2xl font-bruno mb-4">Rendimiento del Sistema</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Card glow>
              <h3 className="text-xl font-bruno mb-2">Carga del Dashboard</h3>
              <p className="text-lg font-inter">0.4s</p>
            </Card>

            <Card glow>
              <h3 className="text-xl font-bruno mb-2">Consumo de Recursos</h3>
              <p className="text-lg font-inter">Muy bajo</p>
            </Card>
          </div>
        </section>

      </DashboardLayout>
    </PageTransition>
  );
}

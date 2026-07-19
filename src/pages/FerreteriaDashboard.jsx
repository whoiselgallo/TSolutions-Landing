import React from "react";
import { Link } from "react-router-dom";
import {
  DashboardLayout,
  ProgressBar,
  AnalyticsChart,
  StatusPanel,
} from "../components/dashboard";
import PageTransition from "../effects/transitions/PageTransition";
import { Card, Button } from "../components/ui";

export default function FerreteriaDashboard() {
  const progress = 85;

  const ferreteriaData = {
    labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
    datasets: [
      {
        label: "Venta de Herramientas",
        data: [120, 190, 230, 290],
        backgroundColor: "rgba(249, 115, 22, 0.7)", // naranjaEnergy
      },
      {
        label: "Materiales Pesados",
        data: [80, 150, 200, 250],
        backgroundColor: "rgba(0, 229, 255, 0.7)", // aquaTurquesa
      }
    ]
  };

  const ferreteriaOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#F0F0F8" } },
      title: { display: true, text: "Ventas Mensuales (Ferretería)", color: "#F0F0F8" }
    },
    scales: {
      y: { ticks: { color: "#888" }, grid: { color: "#333" } },
      x: { ticks: { color: "#888" }, grid: { color: "#333" } }
    }
  };

  return (
    <PageTransition type="fade" glow>
      <DashboardLayout>
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bruno text-naranjaEnergy">
            Ferretería Smart Dashboard
          </h1>
          <Link to="/ferreteria-smart">
            <Button variant="ghost" size="sm">
              Volver
            </Button>
          </Link>
        </div>

        {/* ================= GLOBAL PROGRESS ================= */}
        <section className="mb-16">
          <h2 className="text-2xl font-bruno mb-4 text-aquaTurquesa">Eficiencia de Inventario</h2>
          <ProgressBar progress={progress} />
        </section>

        {/* ================= METRIC CARDS ================= */}
        <section className="mb-16">
          <h2 className="text-2xl font-bruno mb-4">Métricas de Tienda</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card glow>
              <h3 className="text-xl font-bruno mb-2">Ventas del Día</h3>
              <p className="text-4xl font-bruno text-naranjaEnergy">$12,450</p>
              <p className="text-sm text-gray-400 mt-2">+15% vs ayer</p>
            </Card>

            <Card glow>
              <h3 className="text-xl font-bruno mb-2">Stock Crítico</h3>
              <p className="text-4xl font-bruno text-red-500">14 items</p>
              <p className="text-sm text-gray-400 mt-2">Requiere atención</p>
            </Card>

            <Card glow>
              <h3 className="text-xl font-bruno mb-2">Consultas FerreBot</h3>
              <p className="text-4xl font-bruno text-aquaTurquesa">342</p>
              <p className="text-sm text-gray-400 mt-2">Automatizadas hoy</p>
            </Card>
          </div>
        </section>

        {/* ================= ANALYTICS CHART ================= */}
        <section className="mb-16">
          <h2 className="text-2xl font-bruno mb-4">Análisis de Ventas</h2>
          <AnalyticsChart chartData={ferreteriaData} chartOptions={ferreteriaOptions} />
        </section>

        {/* ================= STATUS PANEL ================= */}
        <section className="mb-16">
          <h2 className="text-2xl font-bruno mb-4">Estado de Sistemas</h2>
          <StatusPanel
            tokens="✔ Punto de Venta (Online)"
            interactivity="✔ FerreBot IA (Activo)"
            components="✔ Sincronización de Bodega"
          />
        </section>

        {/* ================= ACTIVITY LOG ================= */}
        <section className="mb-16">
          <h2 className="text-2xl font-bruno mb-4">Alertas Recientes</h2>

          <div className="space-y-6">
            <Card>
              <p className="font-inter">⚠️ Stock bajo de <span className="text-naranjaEnergy font-bold">Cemento Cruz Azul 50kg</span> (Quedan 5 bultos)</p>
            </Card>
            <Card>
              <p className="font-inter">✔ Pedido #4052 completado exitosamente</p>
            </Card>
            <Card>
              <p className="font-inter">✔ FerreBot resolvió 45 cotizaciones en los últimos 30 min.</p>
            </Card>
          </div>
        </section>
      </DashboardLayout>
    </PageTransition>
  );
}

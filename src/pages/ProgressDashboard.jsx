import React from "react";

// Dashboard components
import {
  DashboardLayout,
  ProgressBar,
  AnalyticsChart,
  StatusPanel,
} from "../components/dashboard";

// Page transition effect
import PageTransition from "../effects/transitions/PageTransition";

export default function ProgressDashboard() {
  const progress = 100;

  const data = [
    { name: "Button", design: 100, functional: 100 },
    { name: "Card", design: 100, functional: 100 },
    { name: "Modal", design: 100, functional: 100 },
    { name: "Input", design: 100, functional: 100 },
    { name: "Select", design: 100, functional: 100 },
    { name: "Slider", design: 100, functional: 100 },
    { name: "Toggle", design: 100, functional: 100 },
    { name: "Chip", design: 100, functional: 100 },
    { name: "Badge", design: 100, functional: 100 },
    { name: "Avatar", design: 100, functional: 100 },
  ];

  return (
    <PageTransition type="fade" glow>
      <DashboardLayout>

        {/* ================= PROGRESS ================= */}
        <ProgressBar progress={progress} />

        {/* ================= ANALYTICS ================= */}
        <div className="mt-10">
          <AnalyticsChart data={data} />
        </div>

        {/* ================= STATUS PANEL ================= */}
        <div className="mt-10">
          <StatusPanel
            tokens="✔ Tokens completos"
            interactivity="✔ Interactividad activa"
            components="✔ Componentes optimizados"
          />
        </div>

      </DashboardLayout>
    </PageTransition>
  );
}

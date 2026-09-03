import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Layout
import MasterDashboardLayout from "../components/dashboard/MasterDashboardLayout.jsx";

// Submodules
import {
  ProgressBar,
  AnalyticsChart,
  StatusPanel,
} from "../components/dashboard";
import MesaDeTrabajo from "../components/dashboard/modules/MesaDeTrabajo.jsx";
import EpisodiosManager from "../components/dashboard/modules/EpisodiosManager.jsx";
import BlogAIManager from "../components/dashboard/modules/BlogAIManager.jsx";
import HooksGenerator from "../components/dashboard/modules/HooksGenerator.jsx";
import VideoClipEditor from "../components/dashboard/modules/VideoClipEditor.jsx";
import CanvaProEditor from "../components/dashboard/modules/CanvaProEditor.jsx";
import AvatarEngineControl from "../components/dashboard/modules/AvatarEngineControl.jsx";
import AdminSettings from "../components/dashboard/modules/AdminSettings.jsx";

export default function Dashboard({ defaultTab = "overview" }) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    // Check if route is /admin or hash is provided
    if (location.pathname.includes("/admin")) {
      setActiveTab("admin");
    } else if (location.pathname.includes("/mesa")) {
      setActiveTab("mesa");
    } else if (location.pathname.includes("/pro")) {
      setActiveTab("mesa");
    } else if (location.hash) {
      const hashTab = location.hash.replace("#", "");
      if (["overview", "mesa", "episodios", "blog", "hooks", "video", "canva", "avatar", "admin"].includes(hashTab)) {
        setActiveTab(hashTab);
      }
    }
  }, [location]);

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
    <MasterDashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      
      {/* VISTA 1: OVERVIEW & MÉTRICAS GENERALES */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-fadeIn">
          <div className="p-6 rounded-large bg-midnightPanel border border-naranjaEnergy/30 shadow-card">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy text-xs font-bold mb-2">
              <span>📊 Vista General del Ecosistema</span>
            </div>
            <h2 className="font-bruno text-2xl text-blancoPuro">
              Panel de Control Maestro TSolutions IPIDD
            </h2>
            <p className="text-humo text-xs sm:text-sm mt-1">
              Estado general de los módulos, tokens de diseño, rendimiento operativo e interactividad activa.
            </p>
          </div>

          <ProgressBar progress={progress} />

          <div className="mt-8">
            <AnalyticsChart data={data} />
          </div>

          <div className="mt-8">
            <StatusPanel
              tokens="✔ Tokens completos y paleta Naranja Energy"
              interactivity="✔ Mesa de Trabajo, Canva Pro y Video Editor activos"
              components="✔ 9 Módulos integrados y unificados"
            />
          </div>
        </div>
      )}

      {/* VISTA 2: MESA DE TRABAJO */}
      {activeTab === "mesa" && (
        <div className="animate-fadeIn">
          <MesaDeTrabajo />
        </div>
      )}

      {/* VISTA 3: EPISODIOS Y FICHAS */}
      {activeTab === "episodios" && (
        <div className="animate-fadeIn">
          <EpisodiosManager />
        </div>
      )}

      {/* VISTA 4: GESTOR DE BLOG CON IA */}
      {activeTab === "blog" && (
        <div className="animate-fadeIn">
          <BlogAIManager />
        </div>
      )}

      {/* VISTA 5: GENERADOR DE HOOKS MAGNÉTICOS */}
      {activeTab === "hooks" && (
        <div className="animate-fadeIn">
          <HooksGenerator />
        </div>
      )}

      {/* VISTA 6: EDITOR DE VIDEO CLIPS */}
      {activeTab === "video" && (
        <div className="animate-fadeIn">
          <VideoClipEditor />
        </div>
      )}

      {/* VISTA 7: EDITOR CANVA PRO */}
      {activeTab === "canva" && (
        <div className="animate-fadeIn">
          <CanvaProEditor />
        </div>
      )}

      {/* VISTA 8: AVATAR ENGINE IA */}
      {activeTab === "avatar" && (
        <div className="animate-fadeIn">
          <AvatarEngineControl />
        </div>
      )}

      {/* VISTA 9: PANEL ADMINISTRATIVO */}
      {activeTab === "admin" && (
        <div className="animate-fadeIn">
          <AdminSettings />
        </div>
      )}

    </MasterDashboardLayout>
  );
}

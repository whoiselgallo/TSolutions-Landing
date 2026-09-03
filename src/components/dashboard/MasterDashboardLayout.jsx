import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MasterDashboardLayout({ activeTab, onTabChange, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "overview", label: "Vista General", icon: "📊", badge: "Métricas" },
    { id: "mesa", label: "Mesa de Trabajo", icon: "📋", badge: "Escaleta Pro" },
    { id: "episodios", label: "Episodios & Fichas", icon: "🎙️", badge: "YouTube" },
    { id: "blog", label: "Gestor de Blog con IA", icon: "✍️", badge: "SEO" },
    { id: "hooks", label: "Hooks Magnéticos", icon: "🧲", badge: "Viral" },
    { id: "video", label: "Editor de Video Clips", icon: "🎬", badge: "Reels" },
    { id: "canva", label: "Editor Canva PRO", icon: "🎨", badge: "Portadas" },
    { id: "avatar", label: "Avatar Engine IA", icon: "🤖", badge: "Agente" },
    { id: "admin", label: "Panel Administrativo", icon: "⚙️", badge: "Leads" },
  ];

  const handleSelectTab = (id) => {
    onTabChange(id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-negroProfundo text-blancoPuro flex flex-col lg:flex-row antialiased">
      
      {/* SIDEBAR NAVEGACIÓN */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-midnightPanel border-r border-white/10 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* HEADER DEL SIDEBAR */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 border border-naranjaEnergy bg-negroProfundo flex items-center justify-center p-1 shadow-glowEnergy"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              >
                <img 
                  src="/assets/TSolutionslogo/logoTSVG.svg" 
                  onError={(e) => { e.target.src = "/assets/TSolutionslogo/logoWEBP.webp"; }}
                  alt="TSolutions Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <h1 className="font-bruno text-sm text-blancoPuro tracking-wider">
                  TSOLUTIONS <span className="text-naranjaEnergy">PRO</span>
                </h1>
                <p className="text-[10px] text-humo uppercase tracking-widest">Dashboard Maestro</p>
              </div>
            </div>

            {/* BOTÓN CERRAR EN MÓVIL */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-humo hover:text-white p-1"
            >
              ✕
            </button>
          </div>

          {/* LISTA DE MENÚ */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-190px)]">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-medium text-xs font-bold transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-naranjaEnergy text-white shadow-glowEnergy border-l-4 border-white"
                    : "text-humo hover:text-white hover:bg-negroProfundo/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                  activeTab === item.id ? "bg-black/30 text-white" : "bg-negroProfundo text-humo"
                }`}>
                  {item.badge}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* FOOTER DEL SIDEBAR */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-negroProfundo/40">
          <Link
            to="/"
            className="w-full py-2.5 px-3 bg-negroProfundo hover:bg-naranjaEnergy hover:text-white text-humo border border-white/10 rounded-medium text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <span>← Ir a la Landing Page</span>
          </Link>
          <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-humo">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Admin Activo</span>
            </span>
            <span className="font-mono text-[10px] text-naranjaEnergy">v2.4 Pro</span>
          </div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* BARRA SUPERIOR (HEADER) */}
        <header className="sticky top-0 z-40 bg-midnightPanel/90 backdrop-blur-md border-b border-white/10 py-3.5 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded bg-negroProfundo text-naranjaEnergy border border-white/10"
            >
              ☰
            </button>
            <div>
              <span className="text-[10px] uppercase font-bold text-naranjaEnergy tracking-widest block">
                Ecosistema de Gestión
              </span>
              <h2 className="font-bruno text-base sm:text-lg text-blancoPuro capitalize">
                {menuItems.find(m => m.id === activeTab)?.label || "Dashboard"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-negroProfundo border border-white/10 text-xs text-humo">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Servidor: En Línea</span>
            </div>
            <Link
              to="/"
              className="px-3.5 py-1.5 bg-naranjaEnergy/20 hover:bg-naranjaEnergy text-naranjaEnergy hover:text-white border border-naranjaEnergy/40 rounded-medium text-xs font-bold transition shadow-glowEnergy"
            >
              Ver Sitio Web
            </Link>
          </div>
        </header>

        {/* CONTENIDO DEL MÓDULO ACTIVO */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}

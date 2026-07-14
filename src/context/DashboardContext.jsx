import { createContext, useContext, useState, useMemo } from "react";
import { dashboardData } from "../data/dashboardData";

// Crear contexto
const DashboardContext = createContext();

// Proveedor del contexto
export function DashboardProvider({ children }) {
  const [components, setComponents] = useState(dashboardData.components);
  const [tokens, setTokens] = useState(dashboardData.tokens);
  const [interactivity, setInteractivity] = useState(dashboardData.interactivity);

  // Progreso total (memoizado)
  const progress = useMemo(() => {
    const completed = components.filter(
      c =>
        c.design === 100 &&
        c.visual === 100 &&
        c.functional === 100
    ).length;

    return Math.round((completed / components.length) * 100);
  }, [components]);

  // Valores expuestos globalmente
  const value = {
    components,
    tokens,
    interactivity,
    progress,
    setComponents,
    setTokens,
    setInteractivity,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

// Hook para consumir el contexto
export function useDashboard() {
  return useContext(DashboardContext);
}

// Exportación por defecto (para integrarlo con src/components/index.js)
export default DashboardContext;

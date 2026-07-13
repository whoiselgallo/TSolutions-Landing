// Roadmap y Kanban para V2 y V3

export const roadmapPhases = [
  {
    id: "v2",
    label: "Versión V2",
    period: "2026 Q3–Q4",
    status: "En progreso",
    color: "bg-cyan-500",
    items: [
      "Motion System (microinteracciones, hover/focus)",
      "Dark Mode System",
      "Dashboard PRO: Metrics & Logs",
      "Expansión de colecciones Figma (6 → 10)",
    ],
  },
  {
    id: "v3",
    label: "Versión V3",
    period: "2027 Q1–Q2",
    status: "Planificada",
    color: "bg-orange-500",
    items: [
      "Componentes complejos (DataGrid PRO, Stepper, Notifications)",
      "Theming avanzado multi-brand/multi-product",
      "Integración con IA (inputs inteligentes, motion adaptativo)",
    ],
  },
];

export const kanbanColumnsV2 = [
  {
    id: "backlog",
    title: "Backlog",
    color: "border-slate-700",
    tasks: [
      "Dark Mode — tokens invertidos",
      "Dark Mode — compatibilidad con componentes",
      "Dashboard PRO — módulo Logs",
      "Nuevas colecciones Figma (8–10)",
    ],
  },
  {
    id: "todo",
    title: "To Do",
    color: "border-cyan-500",
    tasks: [
      "Motion tokens faltantes",
      "Hover / Focus avanzados",
      "Microinteracciones globales",
      "Glow adaptativo para modo oscuro",
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    color: "border-yellow-500",
    tasks: [
      "Motion System (score actual 72)",
      "Animaciones corporativas (tsolutions-animations)",
    ],
  },
  {
    id: "review",
    title: "Review",
    color: "border-purple-500",
    tasks: [
      "Dashboard PRO — AnalyticsChart",
      "Dashboard PRO — StatusPanel",
      "Dashboard PRO — ProgressBar",
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "border-emerald-500",
    tasks: [
      "Tokens globales",
      "12 componentes UI base",
      "Figma Sync",
      "Integración React + Tailwind",
      "Dashboard PRO — Hero & Tokens",
    ],
  },
];

export const kanbanColumnsV3 = [
  {
    id: "backlog",
    title: "Backlog",
    color: "border-slate-700",
    tasks: [
      "DataGrid PRO",
      "Stepper",
      "Notifications System",
      "Formularios avanzados",
      "Multi-brand tokens",
      "Multi-product tokens",
    ],
  },
  {
    id: "todo",
    title: "To Do",
    color: "border-cyan-500",
    tasks: [
      "IA: Inputs inteligentes",
      "IA: Autocompletado contextual",
      "IA: Motion adaptativo",
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    color: "border-yellow-500",
    tasks: [
      "Arquitectura multi-producto",
      "Tokens escalables para Zoco MéXL y Güero Bot",
    ],
  },
  {
    id: "review",
    title: "Review",
    color: "border-purple-500",
    tasks: [
      "Prototipos IA en Figma",
      "Pruebas de rendimiento en DataGrid PRO",
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "border-emerald-500",
    tasks: [],
  },
];

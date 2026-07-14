// ============================================================
// 📊 Dashboard Data — TSolutions IPIDD
// Estructura optimizada para DashboardContext y Dashboard PRO
// ============================================================

export const dashboardData = {
  components: [
    { id: "button", name: "Button", category: "UI Base", design: 100, visual: 100, functional: 100 },
    { id: "card", name: "Card", category: "UI Base", design: 100, visual: 100, functional: 100 },
    { id: "input", name: "Input", category: "Form", design: 100, visual: 100, functional: 100 },
    { id: "select", name: "Select", category: "Form", design: 100, visual: 100, functional: 100 },
    { id: "toggle", name: "Toggle", category: "UI Base", design: 100, visual: 100, functional: 100 },
    { id: "slider", name: "Slider", category: "UI Base", design: 100, visual: 100, functional: 100 },
    { id: "badge", name: "Badge", category: "Display", design: 100, visual: 100, functional: 100 },
    { id: "chip", name: "Chip", category: "Display", design: 100, visual: 100, functional: 100 },
    { id: "modal", name: "Modal", category: "Feedback", design: 100, visual: 100, functional: 100 },
    { id: "tooltip", name: "Tooltip", category: "Feedback", design: 100, visual: 100, functional: 100 },
    { id: "avatar", name: "Avatar", category: "Display", design: 100, visual: 100, functional: 100 },
    { id: "table", name: "Table", category: "Display", design: 100, visual: 100, functional: 100 },
  ],

  tokens: {
    colors: true,
    shadows: true,
    radius: true,
    typography: true,
    spacing: true,       // agregado
    animations: true,    // agregado
  },

  interactivity: {
    props: true,
    animations: true,
    hover: true,
    focus: true,
    transitions: true,   // agregado
  }
};

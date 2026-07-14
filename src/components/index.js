// ============================================================
// 📦 TSolutions IPIDD — COMPONENTS ROOT EXPORT
// Unificación global de UI, Layout y Dashboard
// ============================================================

// ---------- UI Components ----------
export * from "./ui";
import * as UI from "./ui";

// ---------- Layout Components ----------
export * from "./layout";
import * as Layout from "./layout";

// ---------- Dashboard Components ----------
export * from "./dashboard";
import * as Dashboard from "./dashboard";

// ---------- Exportación agrupada ----------
const Components = {
  ...UI,
  ...Layout,
  ...Dashboard,
};

export default Components;

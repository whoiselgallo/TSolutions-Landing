import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home.jsx";
import LandingPreview from "./pages/LandingPreview.jsx";
import ComponentsPreview from "./pages/ComponentsPreview.jsx";
import EffectsPreview from "./pages/EffectsPreview.jsx";
import TokensPreview from "./pages/TokensPreview.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardShowcase from "./pages/DashboardShowcase.jsx";
import DashboardFullDemo from "./pages/DashboardFullDemo.jsx";
import DashboardPreview from "./pages/DashboardPreview.jsx";
import ProgressDashboard from "./pages/ProgressDashboard.jsx";
import FerreteriaSmart from "./pages/FerreteriaSmart.jsx";
import CuevaDelGuero from "./pages/CuevaDelGuero.jsx";
import BrandIdentity from "./pages/BrandIdentity.jsx";
import ConsultoriaNegocios from "./pages/ConsultoriaNegocios.jsx";

// Transition wrapper
import PageTransition from "./effects/transitions/PageTransition.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ===== HOME / LANDING ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<PageTransition type="fade"><LandingPreview /></PageTransition>} />
        
        {/* ===== PRODUCT MODULES ===== */}
        <Route path="/ferreteria-smart" element={<PageTransition type="fade"><FerreteriaSmart /></PageTransition>} />
        <Route path="/la-cueva-del-guero" element={<PageTransition type="fade"><CuevaDelGuero /></PageTransition>} />
        <Route path="/brand-builder" element={<PageTransition type="fade"><BrandIdentity /></PageTransition>} />
        <Route path="/consultoria" element={<PageTransition type="fade"><ConsultoriaNegocios /></PageTransition>} />

        {/* ===== UI PREVIEWS ===== */}
        <Route path="/components" element={<PageTransition type="slide" direction="up"><ComponentsPreview /></PageTransition>} />
        <Route path="/effects" element={<PageTransition type="slide" direction="up"><EffectsPreview /></PageTransition>} />
        <Route path="/tokens" element={<PageTransition type="fade"><TokensPreview /></PageTransition>} />

        {/* ===== DASHBOARD ===== */}
        <Route path="/dashboard" element={<PageTransition type="fade" glow><Dashboard /></PageTransition>} />
        <Route path="/dashboard/showcase" element={<PageTransition type="fade" glow><DashboardShowcase /></PageTransition>} />
        <Route path="/dashboard/full-demo" element={<PageTransition type="fade" glow><DashboardFullDemo /></PageTransition>} />
        <Route path="/dashboard/preview" element={<PageTransition type="fade" glow><DashboardPreview /></PageTransition>} />
        <Route path="/dashboard/progress" element={<PageTransition type="fade" glow><ProgressDashboard /></PageTransition>} />
      </Routes>
    </Router>
  );
}

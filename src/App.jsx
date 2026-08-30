import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home.jsx";
import LandingPreview from "./pages/LandingPreview.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";
import AgendaPage from "./pages/AgendaPage.jsx";
import DigitalDiagnostic from "./pages/DigitalDiagnostic.jsx";
import DiagnosticProcessing from "./pages/DiagnosticProcessing.jsx";
import DiagnosticResultsPage from "./pages/DiagnosticResultsPage.jsx";
import EbooksPage from "./pages/EbooksPage.jsx";
import ThankYouPage from "./pages/ThankYouPage.jsx";
import ComponentsPreview from "./pages/ComponentsPreview.jsx";
import EffectsPreview from "./pages/EffectsPreview.jsx";
import TokensPreview from "./pages/TokensPreview.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardShowcase from "./pages/DashboardShowcase.jsx";
import DashboardFullDemo from "./pages/DashboardFullDemo.jsx";
import DashboardPreview from "./pages/DashboardPreview.jsx";
import ProgressDashboard from "./pages/ProgressDashboard.jsx";
import FerreteriaSmart from "./pages/FerreteriaSmart.jsx";
import FerreteriaDashboard from "./pages/FerreteriaDashboard.jsx";
import CuevaDelGuero from "./pages/CuevaDelGuero.jsx";
import BrandIdentity from "./pages/BrandIdentity.jsx";
import ConsultoriaNegocios from "./pages/ConsultoriaNegocios.jsx";
import Store from "./pages/Store.jsx";
import AccessGate from "./pages/AccessGate.jsx";
import AgentEvaluationPage from "./pages/AgentEvaluationPage.jsx";
import KickoffAgendaPage from "./pages/KickoffAgendaPage.jsx";
import DashboardPro from "./pages/DashboardPro.jsx";
import ClientPortalPage from "./pages/ClientPortalPage.jsx";

// Transition wrapper
import PageTransition from "./effects/transitions/PageTransition.jsx";

// AI Context & Chat
import { AIProvider } from "./context/AIContext.jsx";
import { AIChatWidget } from "./components/ai";

export default function App() {
  return (
    <AIProvider>
      <Router>
        <Routes>
          {/* ===== HOME / LANDING ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<PageTransition type="fade"><LandingPreview /></PageTransition>} />
          <Route path="/portafolio" element={<PageTransition type="fade"><PortfolioPage /></PageTransition>} />
          <Route path="/agenda" element={<PageTransition type="fade"><AgendaPage /></PageTransition>} />
          <Route path="/diagnostico" element={<PageTransition type="fade"><DigitalDiagnostic /></PageTransition>} />
          <Route path="/diagnostico-procesando" element={<PageTransition type="fade"><DiagnosticProcessing /></PageTransition>} />
          <Route path="/diagnostico-resultados" element={<PageTransition type="fade"><DiagnosticResultsPage /></PageTransition>} />
          <Route path="/ebooks" element={<PageTransition type="fade"><EbooksPage /></PageTransition>} />
          <Route path="/gracias" element={<PageTransition type="fade"><ThankYouPage /></PageTransition>} />
          
          {/* ===== PRIVADAS: EVALUACIÓN, KICKOFF Y SEGUIMIENTO ===== */}
          <Route path="/evaluacion-sesion" element={<PageTransition type="fade"><AgentEvaluationPage /></PageTransition>} />
          <Route path="/kickoff-agenda" element={<PageTransition type="fade"><KickoffAgendaPage /></PageTransition>} />
          <Route path="/dashboard-pro" element={<PageTransition type="fade" glow><DashboardPro /></PageTransition>} />
          <Route path="/portal-cliente" element={<PageTransition type="fade"><ClientPortalPage /></PageTransition>} />

          {/* ===== PRODUCT MODULES ===== */}
          <Route path="/ferreteria-smart" element={<PageTransition type="fade"><FerreteriaSmart /></PageTransition>} />
          <Route path="/ferreteria-smart/demo" element={<PageTransition type="fade" glow><FerreteriaDashboard /></PageTransition>} />
          <Route path="/la-cueva-del-guero" element={<PageTransition type="fade"><CuevaDelGuero /></PageTransition>} />
          <Route path="/brand-builder" element={<PageTransition type="fade"><BrandIdentity /></PageTransition>} />
          <Route path="/consultoria" element={<PageTransition type="fade"><ConsultoriaNegocios /></PageTransition>} />
          <Route path="/tienda" element={<PageTransition type="fade"><Store /></PageTransition>} />
          <Route path="/acceso" element={<PageTransition type="fade"><AccessGate /></PageTransition>} />
          <Route path="/acceso/:codigo" element={<PageTransition type="fade"><AccessGate /></PageTransition>} />

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
        <AIChatWidget />
      </Router>
    </AIProvider>
  );
}


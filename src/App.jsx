import { BrowserRouter as Router, Routes } from "react-router-dom";
import { DashboardFullDemoRoutes } from "./routes/DashboardFullDemo.routes";

export default function App() {
  return (
    <Router>
      <Routes>
        {DashboardFullDemoRoutes}
      </Routes>
    </Router>
  );
}

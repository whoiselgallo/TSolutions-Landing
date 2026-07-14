import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { DashboardFullDemoRoutes } from "./Routes/DashboardFullDemo.Routes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {DashboardFullDemoRoutes}
      </Routes>
    </Router>
  );
}

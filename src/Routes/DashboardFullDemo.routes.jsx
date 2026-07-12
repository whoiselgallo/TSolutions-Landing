import React from "react";
import { Route } from "react-router-dom";

// Vista premium del dashboard
import DashboardFullDemo from "../pages/DashboardFullDemo";

// Efecto de transición
import PageTransition from "../effects/transitions/PageTransition";

export const DashboardFullDemoRoutes = (
  <Route
    path="/dashboard/full-demo"
    element={
      <PageTransition type="fade" glow>
        <DashboardFullDemo />
      </PageTransition>
    }
  />
);

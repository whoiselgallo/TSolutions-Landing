import React from "react";
import { Route } from "react-router-dom";

// Vistas del dashboard
import Dashboard from "../pages/Dashboard";
import DashboardShowcase from "../pages/DashboardShowcase";
import DashboardFullDemo from "../pages/DashboardFullDemo";

// Efecto de transición
import PageTransition from "../effects/transitions/PageTransition";

export const DashboardRoutes = (
  <>
    {/* ================= DASHBOARD PRINCIPAL ================= */}
    <Route
      path="/dashboard"
      element={
        <PageTransition type="fade" glow>
          <Dashboard />
        </PageTransition>
      }
    />

    {/* ================= DASHBOARD SHOWCASE ================= */}
    <Route
      path="/dashboard/showcase"
      element={
        <PageTransition type="fade" glow>
          <DashboardShowcase />
        </PageTransition>
      }
    />

    {/* ================= DASHBOARD FULL DEMO ================= */}
    <Route
      path="/dashboard/full-demo"
      element={
        <PageTransition type="fade" glow>
          <DashboardFullDemo />
        </PageTransition>
      }
    />
  </>
);

import React from "react";
import { useScrollReveal } from "../effects/Scrol/useScrollReveal";
import { ParticleField } from "../effects/background/ParticleField";
import { Grid3D } from "../effects/background/Grid3D";
import { NeonText } from "../effects/text/NeonText";
import { RippleButton } from "../effects/click/RippleButton";

export default function DashboardPreview() {
  const { ref, visible } = useScrollReveal();

  return (
    <div className="relative min-h-screen bg-negroProfundo text-blancoPuro">

      <ParticleField />
      <Grid3D />

      {/* NAVBAR */}
      <nav className="w-full p-6 bg-midnightPanel shadow-card flex justify-between items-center">
        <NeonText>TSolutions Dashboard</NeonText>
        <RippleButton className="btn-primary px-6 py-3">Salir</RippleButton>
      </nav>

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-midnightPanel shadow-card p-6 space-y-6">
        <h3 className="font-bruno text-aquaTurquesa text-xl">Menú</h3>
        <ul className="space-y-4">
          <li className="hover:text-aquaTurquesa cursor-pointer">Inicio</li>
          <li className="hover:text-aquaTurquesa cursor-pointer">Usuarios</li>
          <li className="hover:text-aquaTurquesa cursor-pointer">Reportes</li>
          <li className="hover:text-aquaTurquesa cursor-pointer">Configuración</li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 p-10 space-y-16">

        {/* HERO */}
        <section ref={ref} className={`transition duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
          <h1 className="text-4xl font-bruno text-aquaTurquesa">
            Bienvenido, Javier
          </h1>
          <p className="text-blancoPuro/70 mt-2">
            Este es tu Dashboard corporativo con el Design System V1.
          </p>
        </section>

        {/* CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="card h-40 flex items-center justify-center">
            Estado del sistema
          </div>
          <div className="card h-40 flex items-center justify-center">
            Usuarios activos
          </div>
          <div className="card h-40 flex items-center justify-center">
            Logs recientes
          </div>
        </section>

        {/* TABLE */}
        <section>
          <h2 className="text-2xl font-bruno text-aquaTurquesa mb-6">Actividad reciente</h2>
          <table className="w-full bg-midnightPanel rounded-medium shadow-card">
            <thead className="text-aquaTurquesa">
              <tr>
                <th className="p-4">Usuario</th>
                <th className="p-4">Acción</th>
                <th className="p-4">Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-aquaTurquesa/10">
                <td className="p-4">Javier</td>
                <td className="p-4">Login</td>
                <td className="p-4">Hoy</td>
              </tr>
              <tr className="hover:bg-aquaTurquesa/10">
                <td className="p-4">Eduardo</td>
                <td className="p-4">Actualizó tokens</td>
                <td className="p-4">Ayer</td>
              </tr>
            </tbody>
          </table>
        </section>

      </main>
    </div>
  );
}

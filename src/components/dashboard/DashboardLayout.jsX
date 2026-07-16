import { Link } from "react-router-dom";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-negroProfundo text-blancoPuro p-6 md:p-10 font-inter">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-aquaTurquesa/10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bruno text-aquaTurquesa">
            Dashboard PRO — Design System V1
          </h1>
          <p className="text-xs md:text-sm text-blancoPuro/60 mt-1">TSolutions IPIDD Enterprise Control</p>
        </div>
        <Link 
          to="/" 
          className="px-5 py-2.5 bg-negroProfundo border border-naranjaEnergy text-naranjaEnergy font-bruno rounded-soft hover:bg-naranjaEnergy hover:text-negroProfundo hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all duration-300 flex items-center gap-2 text-sm"
        >
          ← Volver al Inicio
        </Link>
      </div>
      {children}
    </div>
  );
}

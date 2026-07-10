export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-negroProfundo text-blancoPuro p-10 font-inter">
      <h1 className="text-3xl font-bruno mb-6 text-aquaTurquesa">
        Dashboard PRO — Design System V1
      </h1>
      {children}
    </div>
  );
}

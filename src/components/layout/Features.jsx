export default function Features() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-blancoPerla text-deepBlack">
      <div className="min-h-card shadow-elevation3 p-card-padding rounded-md bg-humo">
        <h3 className="font-montserrat text-xl text-naranjaEnergy mb-2">Automatización</h3>
        <p className="font-inter text-sm">Procesos inteligentes para optimizar tu flujo de trabajo.</p>
      </div>
      <div className="min-h-card shadow-elevation3 p-card-padding rounded-md bg-humo">
        <h3 className="font-montserrat text-xl text-aquaTurquesa mb-2">Integración</h3>
        <p className="font-inter text-sm">Conecta tus sistemas y APIs en una sola plataforma.</p>
      </div>
      <div className="min-h-card shadow-elevation3 p-card-padding rounded-md bg-humo">
        <h3 className="font-montserrat text-xl text-dorado mb-2">Escalabilidad</h3>
        <p className="font-inter text-sm">Infraestructura lista para crecer contigo.</p>
      </div>
    </section>
  );
}

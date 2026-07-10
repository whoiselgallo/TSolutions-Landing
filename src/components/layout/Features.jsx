export default function Features() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-[var(--color-blancoPerla)] text-[var(--color-deepBlack)]">
      
      <div className="min-h-[var(--min-card-height)] shadow-[var(--elevation-3)] p-[var(--card-padding)] rounded-md bg-[var(--color-humo)]">
        <h3 className="font-montserrat text-xl text-[var(--color-naranjaEnergy)] mb-2">Automatización</h3>
        <p className="font-inter text-sm">Procesos inteligentes para optimizar tu flujo de trabajo.</p>
      </div>

      <div className="min-h-[var(--min-card-height)] shadow-[var(--elevation-3)] p-[var(--card-padding)] rounded-md bg-[var(--color-humo)]">
        <h3 className="font-montserrat text-xl text-[var(--color-aquaTurquesa)] mb-2">Integración</h3>
        <p className="font-inter text-sm">Conecta tus sistemas y APIs en una sola plataforma.</p>
      </div>

      <div className="min-h-[var(--min-card-height)] shadow-[var(--elevation-3)] p-[var(--card-padding)] rounded-md bg-[var(--color-humo)]">
        <h3 className="font-montserrat text-xl text-[var(--color-dorado)] mb-2">Escalabilidad</h3>
        <p className="font-inter text-sm">Infraestructura lista para crecer contigo.</p>
      </div>

    </section>
  );
}

export default function Showcase() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-[var(--color-deepBlack)] text-[var(--color-blancoPerla)]">
      
      <div className="shadow-[var(--elevation-4)] p-6 rounded-md bg-[var(--color-humo)]">
        <h3 className="font-bruno text-[var(--color-aquaTurquesa)] text-2xl mb-2">Proyecto A</h3>
        <p className="font-inter text-sm">Integración de IA para atención al cliente.</p>
      </div>

      <div className="shadow-[var(--elevation-4)] p-6 rounded-md bg-[var(--color-humo)]">
        <h3 className="font-bruno text-[var(--color-naranjaEnergy)] text-2xl mb-2">Proyecto B</h3>
        <p className="font-inter text-sm">Automatización de procesos internos con bots.</p>
      </div>

    </section>
  );
}

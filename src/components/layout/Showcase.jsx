export default function Showcase() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-deepBlack text-blancoPerla">
      <div className="shadow-elevation4 p-6 rounded-md bg-humo">
        <h3 className="font-bruno text-aquaTurquesa text-2xl mb-2">Proyecto A</h3>
        <p className="font-inter text-sm">Integración de IA para atención al cliente.</p>
      </div>
      <div className="shadow-elevation4 p-6 rounded-md bg-humo">
        <h3 className="font-bruno text-naranjaEnergy text-2xl mb-2">Proyecto B</h3>
        <p className="font-inter text-sm">Automatización de procesos internos con bots.</p>
      </div>
    </section>
  );
}

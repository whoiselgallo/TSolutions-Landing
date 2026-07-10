export default function Contact() {
  return (
    <section className="min-h-dashboardSection bg-blancoPerla text-deepBlack flex flex-col justify-center items-center p-8">
      <h2 className="font-bruno text-4xl text-aquaTurquesa mb-4">Contáctanos</h2>
      <form className="flex flex-col gap-form-spacing w-full max-w-md">
        <label className="font-montserrat text-sm text-deepBlack">Nombre</label>
        <input type="text" className="min-h-input border border-humo rounded-md p-2" placeholder="Tu nombre" />
        <label className="font-montserrat text-sm text-deepBlack">Correo</label>
        <input type="email" className="min-h-input border border-humo rounded-md p-2" placeholder="Tu correo" />
        <button className="min-h-button bg-naranjaEnergy text-deepBlack font-bruno rounded-md mt-4">
          Enviar
        </button>
      </form>
    </section>
  );
}

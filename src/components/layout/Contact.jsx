export default function Contact() {
  return (
    <section className="min-h-dashboardSection bg-blancoPuro text-deepBlack flex flex-col justify-center items-center p-8">
      <h2 className="font-bruno text-4xl text-aquaTurquesa mb-4">
        Contáctanos
      </h2>

      <form className="flex flex-col gap-6 w-full max-w-md">
        {/* Nombre */}
        <label className="font-montserratSlim text-sm text-deepBlack">
          Nombre
        </label>
        <input
          type="text"
          className="min-h-input border border-humo rounded-soft p-2 bg-blancoPuro text-deepBlack"
          placeholder="Tu nombre"
        />

        {/* Correo */}
        <label className="font-montserratSlim text-sm text-deepBlack">
          Correo
        </label>
        <input
          type="email"
          className="min-h-input border border-humo rounded-soft p-2 bg-blancoPuro text-deepBlack"
          placeholder="Tu correo"
        />

        {/* Botón */}
        <button className="min-h-button bg-naranjaEnergy text-deepBlack font-bruno rounded-soft mt-4 shadow-card hover:shadow-turquesaHover transition">
          Enviar
        </button>
      </form>
    </section>
  );
}

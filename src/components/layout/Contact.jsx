export default function Contact() {
  return (
    <section className="min-h-[var(--min-dashboard-section-height)] bg-[var(--color-blancoPerla)] text-[var(--color-deepBlack)] flex flex-col justify-center items-center p-8">
      <h2 className="font-bruno text-4xl text-[var(--color-aquaTurquesa)] mb-4">Contáctanos</h2>

      <form className="flex flex-col gap-[var(--form-spacing)] w-full max-w-md">
        <label className="font-montserrat text-sm text-[var(--color-deepBlack)]">Nombre</label>
        <input
          type="text"
          className="min-h-[var(--min-input-height)] border border-[var(--color-humo)] rounded-md p-2"
          placeholder="Tu nombre"
        />

        <label className="font-montserrat text-sm text-[var(--color-deepBlack)]">Correo</label>
        <input
          type="email"
          className="min-h-[var(--min-input-height)] border border-[var(--color-humo)] rounded-md p-2"
          placeholder="Tu correo"
        />

        <button className="min-h-[var(--min-button-height)] bg-[var(--color-naranjaEnergy)] text-[var(--color-deepBlack)] font-bruno rounded-md mt-4">
          Enviar
        </button>
      </form>
    </section>
  );
}

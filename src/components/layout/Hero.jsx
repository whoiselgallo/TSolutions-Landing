export default function Hero() {
  return (
    <section className="w-full min-h-[60vh] bg-negroProfundo text-blancoPuro flex flex-col items-center justify-center px-6 py-16 text-center">

      <h1 className="font-bruno text-5xl text-aquaTurquesa tracking-wide mb-4">
        Innovación que impulsa tu crecimiento
      </h1>

      <p className="font-inter text-lg max-w-2xl opacity-80 leading-relaxed mb-8">
        Soluciones tecnológicas diseñadas para automatizar, integrar y escalar tu negocio con precisión y estilo corporativo.
      </p>

      <button className="btn btn-primary text-deepBlack font-bruno">
        Explorar soluciones
      </button>

    </section>
  );
}

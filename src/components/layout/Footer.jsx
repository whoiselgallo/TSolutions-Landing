export default function Footer() {
  return (
    <footer className="w-full bg-negroProfundo text-blancoPuro flex flex-col items-center justify-center py-6 border-t border-divider">
      <p className="font-inter text-sm opacity-75">
        © 2026 TSolutions IPIDD — Todos los derechos reservados.
      </p>

      <div className="flex gap-4 mt-2">
        <a href="#" className="text-aquaTurquesa hover:text-naranjaEnergy transition">
          LinkedIn
        </a>
        <a href="#" className="text-aquaTurquesa hover:text-naranjaEnergy transition">
          GitHub
        </a>
        <a href="#" className="text-aquaTurquesa hover:text-naranjaEnergy transition">
          Contacto
        </a>
      </div>
    </footer>
  );
}

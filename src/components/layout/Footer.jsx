export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-deepBlack)] text-[var(--color-blancoPerla)] flex flex-col items-center justify-center py-6 border-t border-[var(--divider-color)]">
      <p className="font-inter text-sm opacity-75">© 2026 TSolutions IPIDD — Todos los derechos reservados.</p>

      <div className="flex gap-4 mt-2">
        <a href="#" className="text-[var(--color-aquaTurquesa)] hover:text-[var(--color-naranjaEnergy)]">LinkedIn</a>
        <a href="#" className="text-[var(--color-aquaTurquesa)] hover:text-[var(--color-naranjaEnergy)]">GitHub</a>
        <a href="#" className="text-[var(--color-aquaTurquesa)] hover:text-[var(--color-naranjaEnergy)]">Contacto</a>
      </div>
    </footer>
  );
}

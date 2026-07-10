export default function Header() {
  return (
    <header className="w-full min-h-[var(--min-dashboard-section-height)] bg-[var(--color-deepBlack)] text-[var(--color-blancoPerla)] flex items-center justify-between px-6 py-4 shadow-[var(--elevation-2)]">
      <h1 className="font-bruno text-[var(--color-aquaTurquesa)] text-3xl">TSolutions IPIDD</h1>

      <nav className="flex gap-6 font-montserrat text-sm">
        <a href="#features" className="hover:text-[var(--color-naranjaEnergy)]">Features</a>
        <a href="#showcase" className="hover:text-[var(--color-aquaTurquesa)]">Showcase</a>
        <a href="#contact" className="hover:text-[var(--color-dorado)]">Contact</a>
      </nav>
    </header>
  );
}

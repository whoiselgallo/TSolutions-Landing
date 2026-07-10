export default function Header() {
  return (
    <header className="w-full min-h-dashboardSection bg-deepBlack text-blancoPerla flex items-center justify-between px-6 py-4 shadow-elevation2">
      <h1 className="font-bruno text-aquaTurquesa text-3xl">TSolutions IPIDD</h1>
      <nav className="flex gap-6 font-montserrat text-sm">
        <a href="#features" className="hover:text-naranjaEnergy">Features</a>
        <a href="#showcase" className="hover:text-aquaTurquesa">Showcase</a>
        <a href="#contact" className="hover:text-dorado">Contact</a>
      </nav>
    </header>
  );
}

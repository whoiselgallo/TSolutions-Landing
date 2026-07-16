import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { label: "Inicio", to: "/" },
  { label: "Landing", to: "/landing" },
  { label: "Componentes", to: "/components" },
  { label: "Efectos", to: "/effects" },
  { label: "Tokens", to: "/tokens" },
  { label: "Dashboard", to: "/dashboard" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `font-bruno text-xs tracking-wider transition-all duration-300 relative py-1 px-2 ${
      isActive 
        ? "text-naranjaEnergy font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-naranjaEnergy after:shadow-[0_0_8px_var(--color-naranjaEnergy)]" 
        : "text-blancoPuro hover:text-naranjaEnergy/80"
    }`;

  return (
    <header className="w-full sticky top-0 z-50 bg-negroProfundo/90 backdrop-blur-md border-b border-naranjaEnergy/10 text-blancoPuro px-6 py-4 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* ===== LOGO ===== */}
      <NavLink to="/" className="flex items-center gap-2 group">
        <span className="font-bruno text-blancoPuro text-2xl tracking-wide transition-colors group-hover:text-naranjaEnergy">TSolutions</span>
        <span className="text-naranjaEnergy font-bruno text-xs bg-naranjaEnergy/10 px-1.5 py-0.5 rounded border border-naranjaEnergy/25">IPIDD</span>
      </NavLink>

      {/* ===== NAV DESKTOP ===== */}
      <nav className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* ===== HAMBURGER MOBILE ===== */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-blancoPuro transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-blancoPuro transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-blancoPuro transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* ===== NAV MOBILE ===== */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-negroProfundo border-b border-naranjaEnergy/20 flex flex-col px-6 py-4 gap-4 md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

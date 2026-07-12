import React from "react";
import { RippleButton } from "../../effects/click/RippleButton";
import { NeonText } from "../../effects/text/NeonText";

export default function Navbar({
  title = "TSolutions IPIDD",
  onLogout,
  className = "",
}) {
  return (
    <nav
      className={`
        w-full bg-midnightPanel shadow-card flex justify-between items-center
        px-8 py-4 rounded-b-medium animate-fadeTurquesa
        ${className}
      `}
    >
      <NeonText>
        <h1 className="text-2xl font-bruno text-aquaTurquesa">
          {title}
        </h1>
      </NeonText>

      <RippleButton
        onClick={onLogout}
        className="px-6 py-3 bg-aquaTurquesa text-negroProfundo rounded-medium hover:shadow-turquesaHover"
      >
        Cerrar sesión
      </RippleButton>
    </nav>
  );
}
  
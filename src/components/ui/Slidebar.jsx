import React, { useState } from "react";
import { MagneticCard } from "../../effects/mouse/MagneticCard";

export default function Sidebar({
  items = [],
  collapsedDefault = false,
  className = "",
}) {
  const [collapsed, setCollapsed] = useState(collapsedDefault);

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-64"}
        h-screen bg-midnightPanel shadow-card p-6
        flex flex-col justify-between rounded-r-medium
        transition-all duration-300
        ${className}
      `}
    >
      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-aquaTurquesa mb-6 hover:text-blancoPuro transition"
      >
        {collapsed ? "▶" : "◀"}
      </button>

      {/* Items */}
      <nav className="space-y-4">
        {items.map((item, i) => (
          <MagneticCard key={i}>
            <div
              className="
                cursor-pointer text-blancoPuro hover:text-aquaTurquesa
                transition-colors duration-200
              "
            >
              {collapsed ? item.icon : item.label}
            </div>
          </MagneticCard>
        ))}
      </nav>

      {/* Footer */}
      <div className="text-xs text-blancoPuro/50 mt-auto">
        © TSolutions IPIDD
      </div>
    </aside>
  );
}

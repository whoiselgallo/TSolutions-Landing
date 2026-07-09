import { Card } from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";
import { Table } from "./components/ui/Table";

export function ProgressDashboard() {
  const components = [
    { name: "Button", design: "✔", visual: "✔", functional: "✔" },
    { name: "Card", design: "✔", visual: "✔", functional: "✔" },
    { name: "Input", design: "✔", visual: "✔", functional: "✔" },
    { name: "Select", design: "✔", visual: "✔", functional: "✔" },
    { name: "Toggle", design: "✔", visual: "✔", functional: "✔" },
    { name: "Slider", design: "✔", visual: "✔", functional: "✔" },
    { name: "Badge", design: "✔", visual: "✔", functional: "✔" },
    { name: "Chip", design: "✔", visual: "✔", functional: "✔" },
    { name: "Modal", design: "✔", visual: "✔", functional: "✔" },
    { name: "Tooltip", design: "✔", visual: "✔", functional: "✔" },
    { name: "Avatar", design: "✔", visual: "✔", functional: "✔" },
    { name: "Table", design: "✔", visual: "✔", functional: "✔" },
  ];

  const total = components.length;
  const completed = components.filter(c => c.design === "✔" && c.visual === "✔" && c.functional === "✔").length;
  const progress = Math.round((completed / total) * 100);

  return (
    <div className="p-10 space-y-10">

      {/* HEADER */}
      <Card title="Dashboard de Progreso — Design System V1">
        <p className="text-lg font-inter">
          Estado general del sistema de diseño de TSolutions IPIDD.
        </p>

        <div className="mt-4">
          <Badge variant="turquesa">Progreso total: {progress}%</Badge>
        </div>
      </Card>

      {/* PROGRESS BAR */}
      <div className="w-full bg-negroProfundo/20 rounded-large h-6 overflow-hidden shadow-turquesaSoft">
        <div
          className="bg-aquaTurquesa h-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* TABLE */}
      <Card title="Estado de los Componentes UI">
        <Table
          columns={["Componente", "Diseño", "Visual", "Funcional"]}
          data={components.reduce((acc, c) => {
            acc.push({
              Componente: c.name,
              Diseño: c.design,
              Visual: c.visual,
              Funcional: c.functional,
            });
            return acc;
          }, [])}
        />
      </Card>

      {/* DESIGN STATUS */}
      <Card title="Estado del Diseño">
        <ul className="space-y-2 font-inter">
          <li><Badge variant="turquesa">Tokens: ✔ Completos</Badge></li>
          <li><Badge variant="turquesa">Tipografías: ✔ Integradas</Badge></li>
          <li><Badge variant="turquesa">Colores: ✔ Aplicados</Badge></li>
          <li><Badge variant="turquesa">Sombras: ✔ Glow turquesa activo</Badge></li>
          <li><Badge variant="turquesa">Radios: ✔ Consistentes</Badge></li>
        </ul>
      </Card>

      {/* FUNCTIONAL STATUS */}
      <Card title="Estado Funcional">
        <ul className="space-y-2 font-inter">
          <li><Badge variant="turquesa">Interactividad: ✔</Badge></li>
          <li><Badge variant="turquesa">Props dinámicas: ✔</Badge></li>
          <li><Badge variant="turquesa">Modularidad: ✔</Badge></li>
          <li><Badge variant="turquesa">Compatibilidad: ✔</Badge></li>
        </ul>
      </Card>

    </div>
  );
}

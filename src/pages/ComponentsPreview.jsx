import React, { useState } from "react";
import { Link } from "react-router-dom";
import MagneticCard from "../effects/mouse/MagneticCard";

// Importación correcta desde /ui
import {
  Button,
  Card,
  Input,
  Select,
  Slider,
  Modal,
  Table,
  Tooltip,
  Toggle,
  Chip,
  Badge,
  Avatar,
} from "../components/ui";

export default function ComponentsPreview() {
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [toggleChecked, setToggleChecked] = useState(true);
  const [sliderValue, setSliderValue] = useState(50);
  const [selectValue, setSelectValue] = useState("dev");

  return (
    <div className="min-h-screen bg-negroProfundo text-blancoPuro p-6 md:p-10 space-y-10">
      
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-naranjaEnergy/20">
        <div>
          <h1 className="text-3xl font-bruno text-naranjaEnergy">🟧 Componentes</h1>
          <p className="text-sm text-blancoPuro/60 mt-1">Biblioteca de UI interactiva con acentos Naranja y Negro</p>
        </div>
        <Link 
          to="/" 
          className="px-5 py-2.5 bg-negroProfundo border border-naranjaEnergy text-naranjaEnergy font-bruno rounded-soft hover:bg-naranjaEnergy hover:text-negroProfundo hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all duration-300 flex items-center gap-2 text-sm"
        >
          ← Volver al Inicio
        </Link>
      </div>

      {/* ===== INTERACTIVE DASHBOARD GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* 1. Botones */}
        <MagneticCard>
          <div className="p-6 bg-midnightPanel border border-blancoPuro/5 hover:border-naranjaEnergy/40 hover:shadow-glowEnergy transition-all duration-300 rounded-medium flex flex-col justify-between h-full space-y-6">
            <div>
              <h3 className="font-bruno text-lg text-naranjaEnergy mb-4">🟧 Botones</h3>
              <div className="flex flex-col gap-4">
                <Button variant="primary">Botón Primario</Button>
                <Button variant="secondary">Botón Secundario</Button>
                <Button variant="ghost">Botón Ghost</Button>
              </div>
            </div>
            <p className="text-xs text-blancoPuro/40 font-inter">Variantes de botón con sombra naranja</p>
          </div>
        </MagneticCard>

        {/* 2. Cards */}
        <MagneticCard>
          <div className="p-6 bg-midnightPanel border border-blancoPuro/5 hover:border-naranjaEnergy/40 hover:shadow-glowEnergy transition-all duration-300 rounded-medium flex flex-col justify-between h-full space-y-6">
            <div>
              <h3 className="font-bruno text-lg text-naranjaEnergy mb-4">🧩 Cards</h3>
              <div className="space-y-4">
                <Card glow={false} padding="sm" className="text-center text-sm">
                  Card estándar (Sin brillo)
                </Card>
                <Card glow={true} padding="sm" className="text-center text-sm">
                  Card con Glow (Brillo Naranja)
                </Card>
              </div>
            </div>
            <p className="text-xs text-blancoPuro/40 font-inter">Cajas contenedoras con/sin elevación</p>
          </div>
        </MagneticCard>

        {/* 3. Inputs & Sliders */}
        <MagneticCard>
          <div className="p-6 bg-midnightPanel border border-blancoPuro/5 hover:border-naranjaEnergy/40 hover:shadow-glowEnergy transition-all duration-300 rounded-medium flex flex-col justify-between h-full space-y-6">
            <div>
              <h3 className="font-bruno text-lg text-naranjaEnergy mb-4">🎚️ Controles / Form</h3>
              <div className="space-y-6">
                <Input
                  label="Nombre de Usuario"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  glow
                />
                <Slider
                  label={`Volumen: ${sliderValue}%`}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(e.target.value)}
                  glow
                />
              </div>
            </div>
            <p className="text-xs text-blancoPuro/40 font-inter">Campos de formulario y controles reactivos</p>
          </div>
        </MagneticCard>

        {/* 4. Selection (Select / Toggle) */}
        <MagneticCard>
          <div className="p-6 bg-midnightPanel border border-blancoPuro/5 hover:border-naranjaEnergy/40 hover:shadow-glowEnergy transition-all duration-300 rounded-medium flex flex-col justify-between h-full space-y-6">
            <div>
              <h3 className="font-bruno text-lg text-naranjaEnergy mb-4">🔘 Selección</h3>
              <div className="space-y-6">
                <Select
                  label="Rol Corporativo"
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  options={[
                    { label: "Administrador", value: "admin" },
                    { label: "Desarrollador", value: "dev" },
                    { label: "Diseñador UI", value: "designer" },
                  ]}
                  glow
                />
                <Toggle
                  label="Modo Avanzado"
                  checked={toggleChecked}
                  onChange={setToggleChecked}
                />
              </div>
            </div>
            <p className="text-xs text-blancoPuro/40 font-inter">Selectores y interruptores booleanos</p>
          </div>
        </MagneticCard>

        {/* 5. Tooltip (INVERTIDO: ANTES DE LA TABLA) */}
        <MagneticCard>
          <div className="p-6 bg-midnightPanel border border-blancoPuro/5 hover:border-naranjaEnergy/40 hover:shadow-glowEnergy transition-all duration-300 rounded-medium flex flex-col justify-between h-full space-y-6">
            <div>
              <h3 className="font-bruno text-lg text-naranjaEnergy mb-4">💬 Tooltip</h3>
              <div className="py-6 text-center">
                <Tooltip text="Información relevante en naranja">
                  <Button variant="secondary" size="sm">Pasa el cursor aquí</Button>
                </Tooltip>
              </div>
            </div>
            <p className="text-xs text-blancoPuro/40 font-inter">Mensajes contextuales emergentes</p>
          </div>
        </MagneticCard>

        {/* 6. Badges & Chips */}
        <MagneticCard>
          <div className="p-6 bg-midnightPanel border border-blancoPuro/5 hover:border-naranjaEnergy/40 hover:shadow-glowEnergy transition-all duration-300 rounded-medium flex flex-col justify-between h-full space-y-6">
            <div>
              <h3 className="font-bruno text-lg text-naranjaEnergy mb-4">🏷️ Badges & Chips</h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="naranja">Active</Badge>
                  <Badge variant="blanco">Version 1.0</Badge>
                  <Badge variant="ghost">Pre-release</Badge>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Chip variant="naranja">React</Chip>
                  <Chip variant="default">Tailwind</Chip>
                  <Chip variant="ghost">Vite</Chip>
                </div>
                <div className="flex justify-center gap-3 items-center">
                  <Avatar size="sm" src="" fallback="TS" />
                  <Avatar size="md" src="" fallback="IP" />
                  <Avatar size="lg" src="" fallback="DD" />
                </div>
              </div>
            </div>
            <p className="text-xs text-blancoPuro/40 font-inter">Etiquetas, chips interactivos y avatares</p>
          </div>
        </MagneticCard>

        {/* 7. Tabla (INVERTIDO: DESPUÉS DEL TOOLTIP) */}
        <div className="md:col-span-2 lg:col-span-3">
          <MagneticCard>
            <div className="p-6 bg-midnightPanel border border-blancoPuro/5 hover:border-naranjaEnergy/40 hover:shadow-glowEnergy transition-all duration-300 rounded-medium flex flex-col justify-between h-full space-y-6">
              <div>
                <h3 className="font-bruno text-lg text-naranjaEnergy mb-4">📊 Tabla Corporativa</h3>
                <Table
                  columns={["Nombre", "Rol", "Estado", "Última Conexión"]}
                  data={[
                    ["Javier Gallo", "Administrador", "Activo", "Hace 2 minutos"],
                    ["Eduardo Félix", "Desarrollador", "Activo", "Ahora mismo"],
                    ["Adriana Ruiz", "Diseñadora UI", "Inactivo", "Hace 2 horas"],
                  ]}
                />
              </div>
              <p className="text-xs text-blancoPuro/40 font-inter">Visualización estructurada de registros</p>
            </div>
          </MagneticCard>
        </div>

        {/* 8. Modal Trigger */}
        <div className="md:col-span-2 lg:col-span-3">
          <MagneticCard>
            <div className="p-6 bg-midnightPanel border border-blancoPuro/5 hover:border-naranjaEnergy/40 hover:shadow-glowEnergy transition-all duration-300 rounded-medium flex flex-col justify-between h-full space-y-6 text-center">
              <div>
                <h3 className="font-bruno text-lg text-naranjaEnergy mb-4">🪟 Modal de Confirmación</h3>
                <div className="py-4">
                  <Button variant="primary" onClick={() => setOpenModal(true)}>
                    Abrir Ventana Modal
                  </Button>
                </div>
              </div>
              <p className="text-xs text-blancoPuro/40 font-inter">Pantallas superpuestas con desenfoque de fondo</p>
            </div>
          </MagneticCard>
        </div>

      </div>

      {/* ===== ACTUAL MODAL ===== */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Modal Corporativo V1"
      >
        <p className="font-inter text-sm text-blancoPuro/80 leading-relaxed">
          Esta ventana utiliza el desenfoque backdrop-blur y un sombreado naranja interactivo. Totalmente responsivo para dispositivos móviles.
        </p>
      </Modal>

    </div>
  );
}

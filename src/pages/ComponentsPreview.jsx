import React, { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";
import Slider from "../components/Slider";
import Modal from "../components/Modal";
import Table from "../components/Table";
import Tooltip from "../components/Tooltip";

export default function ComponentsPreview() {

  // Estado del modal
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="min-h-screen bg-negroProfundo text-blancoPuro p-10 space-y-16">

      {/* ================= BUTTONS ================= */}
      <section>
        <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">🟧 Botones</h2>
        <div className="flex flex-wrap gap-6">
          <Button variant="primary">Primario</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      {/* ================= CARDS ================= */}
      <section>
        <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">🧩 Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <Card>Card estándar</Card>
          <Card glow>Card con Glow</Card>
        </div>
      </section>

      {/* ================= INPUTS ================= */}
      <section>
        <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">🔤 Inputs</h2>
        <div className="space-y-6 w-64">
          <Input label="Correo" glow />
          <Input label="Usuario" />
        </div>
      </section>

      {/* ================= SELECT ================= */}
      <section>
        <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">⬇ Select</h2>
        <div className="w-64">
          <Select
            label="Rol"
            glow
            options={[
              { label: "Administrador", value: "admin" },
              { label: "Desarrollador", value: "dev" },
              { label: "Usuario", value: "user" },
            ]}
          />
        </div>
      </section>

      {/* ================= SLIDER ================= */}
      <section>
        <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">🎚 Slider</h2>
        <div className="w-64">
          <Slider label="Volumen" glow />
        </div>
      </section>

      {/* ================= MODAL ================= */}
      <section>
        <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">🪟 Modal</h2>

        <button
          className="btn-primary px-6 py-3"
          onClick={() => setOpenModal(true)}
        >
          Abrir Modal
        </button>

        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title="Modal Corporativo"
        >
          <p>Este es un modal con tokens y efectos futuristas.</p>
        </Modal>
      </section>

      {/* ================= TABLE ================= */}
      <section>
        <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">📊 Tabla</h2>
        <Table
          columns={["Nombre", "Rol", "Estado"]}
          data={[
            ["Javier", "Admin", "Activo"],
            ["Eduardo", "Dev", "Activo"],
          ]}
        />
      </section>

      {/* ================= TOOLTIP ================= */}
      <section>
        <h2 className="text-3xl font-bruno text-aquaTurquesa mb-6">💬 Tooltip</h2>
        <Tooltip text="Tooltip corporativo futurista">
          <button className="btn-secondary px-6 py-3">Hover aquí</button>
        </Tooltip>
      </section>

    </div>
  );
}

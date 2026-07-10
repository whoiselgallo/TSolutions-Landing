import { useState } from "react";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Features from "../components/layout/Features";
import Showcase from "../components/layout/Showcase";
import Contact from "../components/layout/Contact";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleAuth = () => {
    if (!email.includes("@")) {
      alert("Ingresa un correo válido.");
      return;
    }

    // Aquí puedes agregar validación real con backend si quieres
    navigate("/dashboard");
  };

  return (
<div className="w-full min-h-screen bg-[var(--color-deepBlack)] text-[var(--color-blancoPerla)]">
      <Header />

      <main className="w-full">
        <Hero />

        {/* Botón para ir al dashboard */}
        <div className="w-full flex justify-center mt-8">
          <button
            className="btn btn-primary"
            onClick={() => setAuthOpen(true)}
          >
            Ir al Dashboard
          </button>
        </div>

        <Features />
        <Showcase />
        <Contact />
      </main>

      <Footer />

      {/* Modal de autenticación */}
      {authOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="modal">
            <h3 className="font-bruno text-2xl mb-4">Autenticación requerida</h3>

            <input
              type="email"
              className="input w-full mb-4"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex gap-4">
              <button className="btn btn-primary" onClick={handleAuth}>
                Continuar
              </button>

              <button
              className="btn bg-[var(--color-humo)] text-[var(--color-deepBlack)]"
               onClick={() => setAuthOpen(false)}
               >
                Cancelar
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

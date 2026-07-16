import videoBg from "../../assets/videos/VIDTS.mp4";
import logoImg from "../../assets/logo-tsolutions.webp";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] bg-negroProfundo text-blancoPuro flex flex-col items-center justify-center px-6 py-16 text-center overflow-hidden">
      
      {/* ===== BACKGROUND VIDEO ===== */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen"
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* ===== CONTENT WRAPPER ===== */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
        
        {/* ===== LOGO WITH EFFECTS ===== */}
        <div className="relative flex flex-col items-center justify-center mb-8">
          {/* Hexágono naranja con pulso blanco */}
          <div 
            className="relative flex items-center justify-center w-32 h-32 border-2 border-naranjaEnergy shadow-glowBlancoPulse animate-glowPulse bg-negroProfundo/50 backdrop-blur-sm"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          >
            {/* Triángulo naranja decorativo */}
            <div 
              className="absolute inset-0 m-auto w-16 h-16 bg-naranjaEnergy opacity-20"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            ></div>
            
            {/* Logo webp */}
            <img 
              src={logoImg} 
              alt="TSolutions Logo" 
              className="relative z-10 w-20 h-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* ===== TEXT FRAME ===== */}
        <div className="bg-humo/10 backdrop-blur-md border border-humo/30 rounded-large p-8 md:p-12 shadow-card w-full">
          <h1 className="font-bruno text-4xl md:text-6xl text-aquaTurquesa tracking-wide mb-6 drop-shadow-md">
            Innovación que impulsa tu crecimiento
          </h1>

          <p className="font-inter text-lg md:text-xl text-blancoPuro opacity-90 leading-relaxed mb-8 max-w-2xl mx-auto">
            Soluciones tecnológicas diseñadas para automatizar, integrar y escalar tu negocio con precisión y estilo corporativo.
          </p>

          <button className="px-8 py-4 bg-aquaTurquesa text-negroProfundo font-bruno text-lg rounded-medium shadow-turquesaSoft hover:shadow-turquesaHover transition-all duration-300 transform hover:-translate-y-1">
            Explorar soluciones
          </button>
        </div>

      </div>

    </section>
  );
}

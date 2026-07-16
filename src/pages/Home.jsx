import React from "react";

// Layout components
import {
  Header,
  Hero,
  Features,
  Showcase,
  Contact,
  Footer,
} from "../components/layout";

// Page transition effect
import PageTransition from "../effects/transitions/PageTransition";

export default function Home() {
  return (
    <div className="bg-negroProfundo text-blancoPuro min-h-screen">
      <Header />

      <PageTransition type="slide" direction="up" speed="slow" glow>
        <Hero />
        <Features />
        <Showcase />
        <Contact />
      </PageTransition>

      <Footer />
    </div>
  );
}
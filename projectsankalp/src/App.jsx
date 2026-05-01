import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Tracks from "./components/sections/Tracks";
import Timeline from "./components/sections/Timeline";
import Prizes from "./components/sections/Prizes";
import FAQ from "./components/sections/FAQ";
import Sponsors from "./components/sections/Sponsors";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Tracks />
        <Prizes />
        <Timeline />
        <Sponsors />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

export default App;

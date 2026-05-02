import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Process from "./components/sections/Process";
import EventDetails from "./components/sections/EventDetails";
import Tracks from "./components/sections/Tracks";
import Team from "./components/sections/Team";
import Prizes from "./components/sections/Prizes";
import FAQ from "./components/sections/FAQ";
import Sponsors from "./components/sections/Sponsors";
import StagesPage from "./components/pages/StagesPage";

function App() {
  const [currentView, setCurrentView] = useState("landing"); // 'landing' or 'stages'

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

    // Scroll to top when view changes
    window.scrollTo(0, 0);

    return () => {
      lenis.destroy();
    };
  }, [currentView]);

  return (
    <div className="relative min-h-screen">
      <Navbar onNavigate={(view) => setCurrentView(view)} />
      
      <main>
        {currentView === "landing" ? (
          <>
            <Hero />
            <About />
            <Process />
            <EventDetails />
            <Tracks onKnowMore={() => setCurrentView("stages")} />
            <Team />
            <Prizes />
            <Sponsors />
            <FAQ />
            <Footer />
          </>
        ) : (
          <StagesPage onBack={() => setCurrentView("landing")} />
        )}
      </main>
    </div>
  );
}

export default App;

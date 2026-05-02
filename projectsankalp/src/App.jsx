import { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
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
import TracksPage from "./components/pages/TracksPage";

function App() {
  const [currentView, setCurrentView] = useState("landing"); // 'landing', 'stages', or 'tracks-page'

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

    // Force scroll to top on view change
    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    return () => {
      lenis.destroy();
    };
  }, [currentView]);

  return (
    <div className="relative min-h-screen bg-white">
      <Navbar onNavigate={(view) => setCurrentView(view)} />
      
      <main>
        <AnimatePresence mode="wait">
          {currentView === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <About />
              <Process />
              <EventDetails />
              <Tracks onKnowMore={() => setCurrentView("tracks-page")} />
              <Team />
              <Prizes />
              <Sponsors />
              <FAQ />
              <Footer />
            </motion.div>
          )}

          {currentView === "tracks-page" && (
            <motion.div
              key="tracks-page"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TracksPage onBack={() => setCurrentView("landing")} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;

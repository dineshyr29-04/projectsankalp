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
import { ArrowUp } from "lucide-react";
import TracksPage from "./components/pages/TracksPage";

// AUDIT FIX: Simple, premium Back to Top button
const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-10 right-10 z-[100] p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 group"
          aria-label="Back to top"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-slate-900 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
              <span className="text-white font-black uppercase tracking-[0.5em] text-[10px]">Project Sankalp</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar onNavigate={(view) => setCurrentView(view)} />
      <BackToTop />
      
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
              <Prizes />
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

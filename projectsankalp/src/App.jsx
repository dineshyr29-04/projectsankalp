import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Process from "./components/sections/Process";
import EventDetails from "./components/sections/EventDetails";
import Tracks from "./components/sections/Tracks";
import Prizes from "./components/sections/Prizes";
import FAQ from "./components/sections/FAQ";
import Sponsors from "./components/sections/Sponsors";
import { ArrowUp } from "lucide-react";
import TracksPage from "./components/pages/TracksPage";
import Loader from "./components/ui/loader-11";
import WinnersPage from "./components/pages/WinnersPage";
import TeamPage from "./components/pages/TeamPage";
import StagesPage from "./components/pages/StagesPage";

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
          <ArrowUp
            size={20}
            className="group-hover:-translate-y-1 transition-transform"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);

    // Check for winners slug
    if (window.location.pathname === "/winners") {
      setCurrentView("winners");
    }

    // Check for tracks slug
    if (window.location.pathname === "/tracks") {
      setCurrentView("tracks-page");
    }

    // Check for team slug (hidden)
    if (window.location.pathname === "/team") {
      setCurrentView("team");
    }

    // Check for stages slug (hidden)
    if (window.location.pathname === "/stages") {
      setCurrentView("stages");
    }

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
      <Analytics />
      <SpeedInsights />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="min-h-screen flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Loader />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Navbar
              currentView={currentView}
              onNavigate={(view) => setCurrentView(view)}
            />
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

                {currentView === "winners" && (
                  <motion.div
                    key="winners"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <WinnersPage />
                  </motion.div>
                )}

                {currentView === "team" && (
                  <motion.div
                    key="team"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <TeamPage />
                  </motion.div>
                )}

                {currentView === "stages" && (
                  <motion.div
                    key="stages"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <StagesPage onBack={() => setCurrentView("landing")} />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

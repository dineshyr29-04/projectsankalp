import { lazy, Suspense, useEffect, useState } from "react";
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
import Prizes from "./components/sections/Prizes";
import Domains from "./components/sections/Domains";
import FAQ from "./components/sections/FAQ";
import Sponsors from "./components/sections/Sponsors";
import { ArrowUp } from "lucide-react";
import Loader from "./components/ui/loader-11";

// Lazy Load Pages for Least Network Load
const TimerPage = lazy(() => import("./components/pages/TimerPage"));
const StagesPage = lazy(() => import("./components/pages/StagesPage"));
const TeamPage = lazy(() => import("./components/pages/TeamPage"));
const WinnersPage = lazy(() => import("./components/pages/WinnersPage"));
const PosterGeneratorPage = lazy(() =>
  import("./components/pages/PosterGeneratorPage")
);

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

  // ── ROUTING LOGIC ──
  const navigate = (view) => {
    const slug = view === "landing" ? "/" : `/${view}`;
    window.history.pushState({ view }, "", slug);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("landing");
    }
  };

  useEffect(() => {
    // Handle initial load slug
    const path = window.location.pathname.slice(1);
    const validViews = [
      "landing",
      "winners",
      "team",
      "stages",
      "timer",
      "generator",
    ];
    const normalizedPath = path.toLowerCase();
    const matchedView = validViews.find(
      (v) => v.toLowerCase() === normalizedPath,
    );

    if (matchedView) {
      setCurrentView(matchedView);
      window.history.replaceState(
        { view: matchedView },
        "",
        window.location.pathname +
          window.location.search +
          window.location.hash,
      );
    } else if (path === "") {
      setCurrentView("landing");
      window.history.replaceState({ view: "landing" }, "", "/");
    }

    // Handle browser back/forward buttons
    const handlePopState = (e) => {
      if (e.state && e.state.view) {
        setCurrentView(e.state.view);
      } else {
        const currentPath = window.location.pathname.slice(1).toLowerCase();
        const fallbackView =
          validViews.find((view) => view.toLowerCase() === currentPath) ||
          "landing";
        setCurrentView(fallbackView);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
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
      autoResize: true,
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Force scroll to top on view change
    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [currentView]);

  return (
    <div className="relative min-h-screen bg-white">
      <Analytics />
      <SpeedInsights />
      <div className="flex flex-col min-h-screen">
        <Navbar currentView={currentView} onNavigate={navigate} />
        <BackToTop />

        <main className="flex-grow">
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <Loader />
              </div>
            }
          >
            <AnimatePresence mode="wait">
              {currentView === "landing" && (
                <motion.div
                  key="landing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Hero onNavigate={navigate} />
                  <About />
                  <Process />
                  <EventDetails />
                  <Prizes />
                  <Domains />
                  <Sponsors />
                  <FAQ />

                  <Footer />
                </motion.div>
              )}

              {currentView === "timer" && (
                <motion.div
                  key="timer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TimerPage onBack={goBack} />
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
                  <WinnersPage onNavigate={navigate} onBack={goBack} />
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
                  <TeamPage onBack={goBack} />
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
                  <StagesPage onBack={goBack} />
                </motion.div>
              )}

              {currentView === "generator" && (
                <motion.div
                  key="generator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <PosterGeneratorPage onBack={goBack} />
                </motion.div>
              )}
            </AnimatePresence>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;

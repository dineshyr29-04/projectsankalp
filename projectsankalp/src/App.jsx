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
import Prizes from "./components/sections/Prizes";
import Domains from "./components/sections/Domains";
import FAQ from "./components/sections/FAQ";
import Sponsors from "./components/sections/Sponsors";
import { ArrowUp } from "lucide-react";
import TimerPage from "./components/pages/TimerPage";
import Loader from "./components/ui/loader-11";
import StagesPage from "./components/pages/StagesPage";
import SlotBookingPage from "./components/pages/SlotBookingPage";
import BookingStatusPage from "./components/pages/BookingStatusPage";
import PaymentVerificationPage from "./components/pages/PaymentVerificationPage";
import RegistrationCheckInPage from "./components/pages/RegistrationCheckInPage";
import TeamPage from "./components/pages/TeamPage"
import WinnersPage from "./components/pages/WinnersPage";
import { db } from "./lib/firebase";
import { startExportSync } from "./lib/exportSync";
import { collection, onSnapshot, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";

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

  useEffect(() => {
    // Handle initial load slug
    const path = window.location.pathname.slice(1);
    const validViews = ["landing", "winners", "team", "stages", "booking", "terminal", "timer", "payment", "registration"];
    const normalizedPath = path.toLowerCase();
    const matchedView = validViews.find(v => v.toLowerCase() === normalizedPath);

    if (matchedView) {
      setCurrentView(matchedView);
    } else if (path === "") {
      setCurrentView("landing");
    }

    // Handle browser back/forward buttons
    const handlePopState = (e) => {
      if (e.state && e.state.view) {
        setCurrentView(e.state.view);
      } else {
        setCurrentView("landing");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Global Booking State
  const [globalSlots, setGlobalSlots] = useState({
    women: Array.from({ length: 15 }, (_, i) => ({ id: i + 1, teamId: null })),
    health: Array.from({ length: 15 }, (_, i) => ({ id: i + 1, teamId: null })),
    climate: Array.from({ length: 15 }, (_, i) => ({ id: i + 1, teamId: null })),
  });

  // ── FIREBASE SYNC LOGIC ──
  useEffect(() => {
    // Only attempt sync if a valid Project ID is provided in .env
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    if (!db || !projectId || projectId === "your_project_id") return;
    const q = query(collection(db, "registrations"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const regs = snapshot.docs.map(doc => ({ ...doc.data(), _id: doc.id }));
      
      const freshSlots = {
        women: Array.from({ length: 15 }, (_, i) => ({ id: i + 1, teamId: null })),
        health: Array.from({ length: 15 }, (_, i) => ({ id: i + 1, teamId: null })),
        climate: Array.from({ length: 15 }, (_, i) => ({ id: i + 1, teamId: null })),
      };

      regs.forEach((reg) => {
        const sector = freshSlots[reg.selectedDomain];
        if (sector) {
          // Find the first empty slot for this domain in the local manifest
          const slot = sector.find(s => !s.teamId);
          if (slot) {
            slot.teamId = reg.teamId;
            slot.teamName = reg.teamName;
            slot.docId = reg._id;
            slot.transactionId = reg.transactionId;
            slot.imageUrl = reg.imageUrl;
            slot.checkedIn = reg.checkedIn || false; // Track attendance
          }
        }
      });

      setGlobalSlots(freshSlots);
    });

    // also start export sync (overwrites a fixed file in Storage)
    const stopExport = startExportSync();

    return () => {
      unsubscribe();
      if (typeof stopExport === 'function') stopExport();
    };
  }, []);

  const handleCheckIn = async (docId, status) => {
    try {
      await updateDoc(doc(db, "registrations", docId), {
        checkedIn: status,
        checkInTime: status ? serverTimestamp() : null
      });
    } catch (err) {
      console.error("Check-in failed:", err);
    }
  };

  const handleUpdatePayment = async (docId, updates) => {
    try {
      const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
      if (db && projectId && projectId !== "your_project_id" && docId) {
        await updateDoc(doc(db, "registrations", docId), {
          ...updates,
          lastUpdated: serverTimestamp()
        });
      }
    } catch (err) {
      console.error("Payment update failed:", err);
    }
  };

  const handleBookSlot = async (domainId, slotId, teamId) => {
    // 1. Update Firestore (Truth)
    try {
      const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
      if (db && projectId && projectId !== "your_project_id") {
        await addDoc(collection(db, "bookings"), {
          domainId,
          slotId,
          teamId,
          timestamp: new Date()
        });
      } else {
        // Fallback for local testing
        setGlobalSlots(prev => ({
          ...prev,
          [domainId]: prev[domainId].map(slot => 
            slot.id === slotId ? { ...slot, teamId } : slot
          )
        }));
      }
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  const handleDeleteBooking = async (domainId, slotId, docId) => {
    if (!window.confirm("Are you sure you want to delete this registration? This will free up a slot.")) {
      return;
    }

    try {
      const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
      if (db && projectId && projectId !== "your_project_id") {
        if (docId) {
          const docRef = doc(db, "registrations", docId);
          await deleteDoc(docRef);
        }
      }
    } catch (error) {
      console.error("Deletion failed:", error);
      alert("System Error: Could not remove registration.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);

    const path = window.location.pathname.slice(1).toLowerCase();
    if (path === "winners") setCurrentView("winners");
    else if (path === "timer") setCurrentView("timer");
    else if (path === "team") setCurrentView("team");
    else if (path === "stages") setCurrentView("stages");
    else if (path === "booking") setCurrentView("booking");
    else if (path === "terminal") setCurrentView("terminal");
    else if (path === "payment") setCurrentView("payment");
    else if (path === "registration") setCurrentView("registration");

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col min-h-screen"
          >
            <Navbar
              currentView={currentView}
              onNavigate={navigate}
            />
            <BackToTop />

            <main className="flex-grow">
              <AnimatePresence mode="wait">
                {currentView === "landing" && (
                  <motion.div
                    key="landing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Hero onBookingClick={() => navigate("booking")} />
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
                    <TimerPage onBack={() => navigate("landing")} />
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
                    <WinnersPage onNavigate={navigate} />
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
                    <StagesPage onBack={() => navigate("landing")} />
                  </motion.div>
                )}
                {currentView === "booking" && (
                  <motion.div
                    key="booking"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <SlotBookingPage 
                      onBack={() => navigate("landing")} 
                    />
                  </motion.div>
                )}

                {currentView === "terminal" && (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <BookingStatusPage 
                      slots={globalSlots}
                      onBack={() => navigate("landing")} 
                      onDelete={handleDeleteBooking}
                      onCheckIn={handleCheckIn}
                      onNavigate={navigate}
                    />
                  </motion.div>
                )}

                {currentView === "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <PaymentVerificationPage 
                      slots={globalSlots}
                      onBack={() => navigate("terminal")} 
                      onDelete={handleDeleteBooking}
                      onCheckIn={handleCheckIn}
                      onUpdate={handleUpdatePayment}
                    />
                  </motion.div>
                )}

                {currentView === "registration" && (
                  <motion.div
                    key="registration"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <RegistrationCheckInPage 
                      slots={globalSlots}
                      onBack={() => navigate("terminal")} 
                      onDelete={handleDeleteBooking}
                      onCheckIn={handleCheckIn}
                    />
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

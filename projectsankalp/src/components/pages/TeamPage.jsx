import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../core/Container";
import TeamShowcase from "../ui/TeamShowcase";

// --- TEAM DATA ---

const ADVISORY = [
  {
    id: "a1",
    name: "Dr. Ashwini S. Shetty",
    role: "Director, Directorate of Extension and Outreach Activities",
    image: "/team/ashwini.png",
    social: { linkedin: "#" },
  },
  {
    id: "a2",
    name: "Dr. K. S. Gangadhara Somayaji",
    role: "Vice Chancellor",
    image: "/team/vice_chancellor.png",
    social: { linkedin: "#" },
  },
  {
    id: "a3",
    name: "Dr. M. Vijayakumar",
    role: "Pro Chancellor, Director & CEO, Zulekha Yenepoya Institute of Oncology",
    image: "/team/pro_chancellor_zulekha.png",
    social: { linkedin: "#" },
  },
  {
    id: "a4",
    name: "Dr. R. G. D'Souza",
    role: "Dean, Faculty of Engineering & Technology",
    image: "/team/our_dean.png",
    social: { linkedin: "#" },
  },
  {
    id: "a5",
    name: "Dr. Aswini Dutt R",
    role: "Registrar",
    image: "/team/registrar.png",
    social: { linkedin: "#" },
  },
  {
    id: "a6",
    name: "Dr. Rekha P D",
    role: "Director, Research and Development Cell",
    image: "/team/director_r&d.png",
    social: { linkedin: "#" },
  },
  {
    id: "a7",
    name: "Dr. Prabhakara B. K.",
    role: "Professor and Head, Department of Computer Science and Engineering",
    image: "/team/our_hod.png",
    social: { linkedin: "#" },
  },
  {
    id: "a8",
    name: "Rajesh Karkera",
    role: "Director IT",
    image: "/team/director_it.png",
    social: { linkedin: "#" },
  },
  {
    id: "a9",
    name: "Soumya Kar",
    role: "Incubation Manager, Yenepoya Technology Incubator",
    image: "/team/manager_yti.png",
    social: { linkedin: "#" },
  },
  {
    id: "a10",
    name: "Asim Syed Sheeraz",
    role: "CEO, Yenepoya Technology Incubator",
    image: "/team/ceo_yti.png",
    social: { linkedin: "#" },
  },
  {
    id: "a11",
    name: "Dr. Parameshwar R Hegde",
    role: "Assistant Professor, Computer Science, YIASCM",
    image: "/team/param_sir_yiascm.png",
    social: { linkedin: "#" },
  },
  {
    id: "a12",
    name: "Dr. Sripathi Rao",
    role: "Pro Vice Chancellor",
    image: "/team/pro_vc.png",
    social: { linkedin: "#" },
  },
];

const STUDENT_CONVENERS = [
  {
    id: "s1",
    name: "Waseem",
    image: "/team/waseem.png",
    social: { github: "#" },
  },
  {
    id: "s2",
    name: "Radhesh Pai",
    image: "/team/radhesh.png",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "s3",
    name: "Anand",
    image: "/team/anand.png",
    social: { linkedin: "#" },
  },
  {
    id: "s4",
    name: "Jagadish Naik",
    image: "/team/jaggu.png",
    social: { linkedin: "#" },
  },
  {
    id: "s5",
    name: "Dhanush",
    image: "/team/dhanush.png",
    social: { github: "#" },
  },
  {
    id: "s6",
    name: "Rinu Manoj",
    image: "/team/rinu.png",
    social: { linkedin: "#" },
  },
  {
    id: "s7",
    name: "Srithan",
    image: "/team/srithan.png",
    social: { github: "#" },
  },
  {
    id: "s8",
    name: "Akash N. S. Bhat",
    image: "/team/akash.png",
    social: { github: "#" },
  },
  {
    id: "s9",
    name: "Archana",
    image: "/team/archana.png",
    social: { instagram: "#" },
  },
  {
    id: "s10",
    name: "Dinesh A.",
    image: "/team/dinesh.png",
    social: { linkedin: "#" },
  },
  {
    id: "s11",
    name: "Ashwin R",
    image: "/team/ashwin.png",
    social: { github: "#" },
  },
  {
    id: "s12",
    name: "Skandana",
    image: "/team/skandu.png",
    social: { instagram: "#" },
  },
];

const SECTIONS = [
  { title: "Advisory", data: ADVISORY },
  { title: "Main Students (Core Team)", data: STUDENT_CONVENERS },
];

export default function TeamPage({ onBack }) {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].title);
  const scrollContainerRef = useRef(null);

  const currentSection = SECTIONS.find((s) => s.title === activeSection);
  const activeData = currentSection?.data || [];

  // Perfect Toggle: Scroll active tab into view
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeButton =
        scrollContainerRef.current.querySelector(`[data-active="true"]`);
      if (activeButton) {
        const container = scrollContainerRef.current;
        const scrollLeft =
          activeButton.offsetLeft -
          container.offsetWidth / 2 +
          activeButton.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [activeSection]);

  const sectionColors = {
    Advisory: "from-slate-50 to-white",
    "Main Students (Core Team)": "from-emerald-50/50 to-white",
  };
  const currentBg = sectionColors[activeSection] || "from-slate-50 to-white";

  return (
    <div className="bg-white min-h-screen relative font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-32 transition-colors duration-1000 overflow-x-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-b ${currentBg} opacity-60 pointer-events-none transition-all duration-1000`}
      />

      {/* Hero Section */}
      <section className="relative pt-8 md:pt-12 pb-12 z-10 border-b border-slate-100">
        <Container>
          <div className="mb-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors"
            >
              <span>←</span>
              <span>[ BACK ]</span>
            </motion.button>
          </div>
          <div className="max-w-4xl px-2 sm:px-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6 md:mb-10"
            >
              <div className="w-8 h-1 bg-slate-900" />
              <span className="text-slate-900 font-black uppercase tracking-[0.5em] text-[10px]">
                The Collective
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[40px] sm:text-6xl md:text-8xl lg:text-[110px] font-serif font-black text-slate-900 leading-[0.9] tracking-tighter mb-8"
            >
              Meet the <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                Crew.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-base md:text-2xl max-w-2xl font-medium border-l-4 border-slate-100 pl-6"
            >
              The brilliant minds tracing our path. Explore the specialized
              nodes that form our collective intelligence.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Perfect Toggle Navigation */}
      <section className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-100 py-3 transition-all duration-500">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-3 overflow-x-auto px-6 hide-scrollbar w-full  mx-auto scroll-smooth snap-x justify-center"
        >
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.title;
            return (
              <button
                key={section.title}
                data-active={isActive}
                onClick={() => setActiveSection(section.title)}
                className={`relative px-5 py-2.5 rounded-full text-[11px] md:text-xs font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap snap-center ${isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-900"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePrimaryTab"
                    className="absolute inset-0 bg-slate-900 rounded-full -z-10 shadow-lg shadow-slate-900/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {section.title}
              </button>
            );
          })}
        </div>
      </section>

      {/* Team Content */}
      <section className="relative z-10 py-12 md:py-16 min-h-[600px]">
        <Container>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-10 md:gap-16 w-full mx-auto"
            >
              <div className="flex items-end justify-between border-b border-slate-200/60 pb-8 px-4 sm:px-0">
                <div className="flex flex-col gap-1">
                  <span className="text-blue-600 font-black text-[9px] uppercase tracking-[0.4em]">
                    Section
                  </span>
                  <h2 className="text-2xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
                    {activeSection}
                  </h2>
                </div>
                <span className="text-slate-100 font-serif text-5xl md:text-8xl italic font-black leading-none translate-y-3">
                  0{SECTIONS.findIndex((s) => s.title === activeSection) + 1}
                </span>
              </div>

              <TeamShowcase
                members={activeData}
                showRole={activeSection === "Advisory"}
              />
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      <footer className="relative z-10 py-20 border-t border-slate-100 bg-slate-50/30">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="w-12 h-1 bg-slate-200 rounded-full mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
              Project Sankalp Team _ 2026
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

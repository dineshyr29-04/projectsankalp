import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../core/Container";
import TeamShowcase from "../ui/TeamShowcase";

// --- TEAM DATA ---

const ADVISORY = [
  {
    id: "a1",
    name: "Dr. Radesh Pai",
    role: "Lead Advisor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#", github: "#" },
  },
  {
    id: "a2",
    name: "Prof. Dinesh K.",
    role: "Academic Mentor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "a3",
    name: "Dr. Arjun Mehta",
    role: "Industry Expert",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "a4",
    name: "Ms. Nina Patel",
    role: "Innovation Consultant",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "a5",
    name: "Dr. Suresh G.",
    role: "Research Head",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "a6",
    name: "Mrs. Kavita Singh",
    role: "Strategy Advisor",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "a7",
    name: "Dr. Anita Desai",
    role: "Community Outreach",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#", instagram: "#" },
  },
  {
    id: "a8",
    name: "Mr. Dhanush Shenoy",
    role: "Tech Advisor",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "a9",
    name: "Prof. Meera K.",
    role: "Student Relations",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    social: { instagram: "#" },
  },
  {
    id: "a10",
    name: "Dr. Akash Yadav",
    role: "Program Director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#", twitter: "#" },
  },
];

const STUDENT_CONVENERS = [
  {
    id: "s1",
    name: "Vicky",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "s2",
    name: "Aditya Sharma",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "s3",
    name: "Rohan Verma",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "s4",
    name: "Priya Iyer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "s5",
    name: "Sneha Reddy",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    social: { instagram: "#" },
  },
  {
    id: "s6",
    name: "Amit Patel",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "s7",
    name: "Neha Gupta",
    image: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#", github: "#" },
  },
  {
    id: "s8",
    name: "Aniket Deshmukh",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    social: { github: "#" },
  },
  {
    id: "s9",
    name: "Tanvi Joshi",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
    social: { instagram: "#" },
  },
  {
    id: "s10",
    name: "Kunal Shah",
    image: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=400&q=80",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "s11",
    name: "Pooja Nair",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "s12",
    name: "Varun Rao",
    image: "https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?auto=format&fit=crop&w=400&q=80",
    social: { github: "#" },
  },
  {
    id: "s13",
    name: "Divya Choudhary",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#", instagram: "#" },
  },
  {
    id: "s14",
    name: "Manish Mishra",
    image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "s15",
    name: "Shruti Sen",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
    social: { github: "#" },
  },
  {
    id: "s16",
    name: "Rahul Kapoor",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "s17",
    name: "Kavya Hegde",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    social: { instagram: "#", linkedin: "#" },
  },
  {
    id: "s18",
    name: "Sandeep Yadav",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "s19",
    name: "Riya Bansal",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#", github: "#" },
  },
  {
    id: "s20",
    name: "Vivek Menon",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    social: { github: "#" },
  },
  {
    id: "s21",
    name: "Swati Kulkarni",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "s22",
    name: "Akshay Saxena",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=400&q=80",
    social: { github: "#" },
  },
  {
    id: "s23",
    name: "Kiran Bhat",
    image: "https://images.unsplash.com/photo-1504257404165-0d530fb1941a?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "s24",
    name: "Harshita Sharma",
    image: "https://images.unsplash.com/photo-1509305717901-847f9e336215?auto=format&fit=crop&w=400&q=80",
    social: { instagram: "#" },
  },
  {
    id: "s25",
    name: "Saurabh Joshi",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "s26",
    name: "Prerna Roy",
    image: "https://images.unsplash.com/photo-1522307837370-cc113a36b784?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "s27",
    name: "Nikhil Gowda",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80",
    social: { github: "#" },
  },
  {
    id: "s28",
    name: "Aishwarya R.",
    image: "https://images.unsplash.com/photo-1534751516642-a131ffd10b7f?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "s29",
    name: "Tarun Singhal",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "s30",
    name: "Amrita Pai",
    image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=400&q=80",
    social: { linkedin: "#", instagram: "#" },
  },
];

const SECTIONS = [
  { title: "Advisory", data: ADVISORY },
  { title: "Student Conveners", data: STUDENT_CONVENERS },
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
    "Student Conveners": "from-emerald-50/50 to-white",
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
          className="flex items-center gap-3 overflow-x-auto px-6 hide-scrollbar w-full max-w-5xl mx-auto scroll-smooth snap-x justify-center"
        >
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.title;
            return (
              <button
                key={section.title}
                data-active={isActive}
                onClick={() => setActiveSection(section.title)}
                className={`relative px-5 py-2.5 rounded-full text-[11px] md:text-xs font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap snap-center ${
                  isActive
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
      <section className="relative z-10 py-12 md:py-24 min-h-[600px]">
        <Container>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-10 md:gap-16 w-full max-w-5xl mx-auto"
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

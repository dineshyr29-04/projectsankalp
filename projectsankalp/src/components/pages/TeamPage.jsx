import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLinkedinIn,
  FaTwitter,
  FaBehance,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import Container from "../core/Container";

// --- TEAM DATA ---

const ADVISORY = [
  {
    id: "a3",
    name: "Dr M Vijayakumar",
    role: "Pro Chancellor Director & CEO, Zulekha Yenepoya Institute of Oncology",
    image: "/team/advisory/pro_chancellor_zulekha.png",
  },
  {
    id: "a2",
    name: "Dr K S Gangadhara Somayaji",
    role: "Vice Chancellor",
    image: "/team/advisory/vice_chancellor.png",
  },
  {
    id: "a12",
    name: "Dr B H Sripathi Rao",
    role: "Pro Vice Chancellor",
    image: "/team/advisory/pro_vc.png",
  },
  {
    id: "a5",
    name: "Dr Aswini Dutt R",
    role: "Registrar",
    image: "/team/advisory/registrar.png",
  },
  {
    id: "a1",
    name: "Dr Ashwini S Shetty",
    role: "Director, Outreach Activities",
    image: "/team/advisory/ashwini.png",
  },
  {
    id: "a6",
    name: "Dr. Rekha P D",
    role: "Director, Research and Development cell",
    image: "/team/advisory/director_r&d.png",
  },
  {
    id: "a8",
    name: "Mr. Rajesh K Karkera",
    role: "Director, IT",
    image: "/team/advisory/director_it.png",
  },
  {
    id: "a10",
    name: "Asim Syed Sheeraz",
    role: "CEO, Yenepoya Technology Incubator",
    image: "/team/advisory/ceo_yti.png",
  },
  {
    id: "a4",
    name: "Dr. R. G. D'Souza",
    role: "Dean, Faculty of Engineering & Technology",
    image: "/team/advisory/our_dean.png",
  },
  {
    id: "a9",
    name: "Soumya Kar",
    role: "Incubation Manager, Yenepoya Technology Incubator",
    image: "/team/advisory/manager_yti.png",
  },
  {
    id: "a7",
    name: "Dr. Prabhakara B. K.",
    role: "Professor and Head, Department of Computer Science and Engineering",
    image: "/team/advisory/our_hod.png",
  },
  {
    id: "a11",
    name: "Dr. Parameshwar R Hegde",
    role: "Assistant Professor, Computer Science, YIASCM",
    image: "/team/advisory/param_sir_yiascm.png",
  },
];

const STUDENT_CONVENERS = [
  {
    id: "s1",
    name: "Radhesh Pai",
    image: "/team/core/radhesh.png",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "s2",
    name: "Waseem",
    image: "/team/core/waseem.png",
    social: { github: "#" },
  },
  {
    id: "s3",
    name: "Anand",
    image: "/team/core/anand.png",
    social: { linkedin: "#" },
  },
  {
    id: "s4",
    name: "Dinesh A.",
    image: "/team/core/dinesh.png",
    social: { linkedin: "#" },
  },
  {
    id: "s10",
    name: "Jagadish Naik",
    image: "/team/core/jaggu.png",
    social: { linkedin: "#" },
  },
  {
    id: "s5",
    name: "Dhanush",
    image: "/team/core/dhanush.png",
    social: { github: "#" },
  },
  {
    id: "s6",
    name: "Rinu Manoj",
    image: "/team/core/rinu.png",
    social: { linkedin: "#" },
  },
  {
    id: "s7",
    name: "Srithan",
    image: "/team/core/srithan.png",
    social: { github: "#" },
  },
  {
    id: "s8",
    name: "Akash N. S. Bhat",
    image: "/team/core/akash.png",
    social: { github: "#" },
  },
  {
    id: "s9",
    name: "Archana",
    image: "/team/core/archana.png",
    social: { instagram: "#" },
  },
  {
    id: "s11",
    name: "Ashwin R",
    image: "/team/core/ashwin.png",
    social: { github: "#" },
  },
  {
    id: "s12",
    name: "Skandana",
    image: "/team/core/skandu.png",
    social: { instagram: "#" },
  },
];

const SECTIONS = [
  { title: "Advisory Board", data: ADVISORY },
  { title: "Core Team Members", data: STUDENT_CONVENERS },
];

function SocialIcons({ member, light = false, size = 14 }) {
  const hasSocial =
    member.social?.twitter ||
    member.social?.linkedin ||
    member.social?.instagram ||
    member.social?.behance ||
    member.social?.github;
  if (!hasSocial) return null;

  const iconClass = `p-2 rounded-full transition-all duration-300 hover:scale-110 ${
    light
      ? "bg-white/10 text-white hover:bg-white/20"
      : "bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 border border-slate-300"
  }`;

  return (
    <div className="flex items-center gap-1.5">
      {member.social?.linkedin && (
        <a
          href={member.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="LinkedIn"
        >
          <FaLinkedinIn size={size} />
        </a>
      )}
      {member.social?.github && (
        <a
          href={member.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="GitHub"
        >
          <FaGithub size={size} />
        </a>
      )}
      {member.social?.instagram && (
        <a
          href={member.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="Instagram"
        >
          <FaInstagram size={size} />
        </a>
      )}
      {member.social?.twitter && (
        <a
          href={member.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="Twitter"
        >
          <FaTwitter size={size} />
        </a>
      )}
      {member.social?.behance && (
        <a
          href={member.social.behance}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="Behance"
        >
          <FaBehance size={size} />
        </a>
      )}
    </div>
  );
}

function LocalTeamShowcase({ members, showRole = true }) {
  if (!members || members.length === 0) return null;

  return (
    <div
      className="w-full mx-auto py-4 md:py-8 font-sans transition-all duration-500"
    >
      <div
        className={`grid gap-6 md:gap-8 px-4 sm:px-0 transition-all duration-500 ${
          showRole
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`group relative flex flex-col transition-all duration-500 hover:-translate-y-2 ${
              showRole
                ? "rounded-[2rem] bg-gradient-to-br from-slate-100/90 to-white/95 hover:from-white hover:to-blue-50/50 border border-slate-300 hover:border-blue-600 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-8px_rgba(37,99,235,0.25)] p-4"
                : "rounded-[2.25rem] bg-gradient-to-br from-slate-100/90 to-white/95 hover:from-white hover:to-emerald-50/50 border border-slate-300 hover:border-emerald-600 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-8px_rgba(5,150,105,0.25)] p-5"
            }`}
          >
            {/* Image Wrapper */}
            <div
              className={`relative aspect-[4/5] overflow-hidden bg-slate-200 shadow-inner mx-auto transition-all duration-300 w-full border border-slate-300/80 group-hover:border-slate-400 ${
                showRole ? "rounded-xl" : "rounded-2xl"
              }`}
            >
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Elegant hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Card Content */}
            <div className="mt-4 flex flex-col flex-grow transition-all duration-300 w-full px-1">
              <h3
                className={`text-slate-900 tracking-tight leading-tight transition-colors duration-300 ${
                  showRole
                    ? "text-lg font-bold group-hover:text-blue-600"
                    : "text-lg md:text-xl font-black group-hover:text-emerald-600"
                }`}
              >
                {member.name}
              </h3>

              {showRole && (
                <div className="w-full border-t border-slate-200 my-3" />
              )}

              {showRole && member.role && (
                <div className="flex items-start justify-between gap-4 w-full">
                  <p className="text-slate-700 text-xs md:text-[13px] font-semibold leading-relaxed">
                    {member.role}
                  </p>
                </div>
              )}

              {/* Divider / Social Icons container */}
              {!showRole && (
                <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between w-full">
                  <SocialIcons member={member} />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] select-none group-hover:text-emerald-600/30 transition-colors">
                    CONVENER
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

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
    "Advisory Board": "from-blue-50/90 via-slate-50/60 to-white",
    "Core Team Members": "from-emerald-50/80 via-emerald-50/30 to-white",
  };
  const currentBg = sectionColors[activeSection] || "from-slate-50 to-white";

  return (
    <div className="bg-slate-50 min-h-screen relative font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-32 transition-colors duration-1000 overflow-x-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-b ${currentBg} opacity-100 pointer-events-none transition-all duration-1000`}
      />

      {/* Hero Section */}
      <section className="relative pt-8 md:pt-12 pb-12 z-10 border-b border-slate-300/80">
        <Container>
          
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
              className="text-[40px] sm:text-6xl md:text-8xl lg:text-[100px] font-serif font-black text-slate-900 leading-[0.9] tracking-tighter mb-8"
            >
              Meet the <br />
              <span className="italic text-emerald-500 pr-5">Crew.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-700 text-base md:text-xl max-w-2xl font-medium border-l-4 border-slate-300 pl-6"
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
                className={`relative px-5 py-2.5 rounded-full text-[11px] md:text-xs font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap snap-center ${
                  isActive
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-900"
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
              <div className="flex items-end justify-between border-b border-slate-300 pb-8 px-4 sm:px-0">
                <div className="flex flex-col gap-1">
                  <span className={`font-black text-[9px] uppercase tracking-[0.4em] ${
                    activeSection === "Advisory Board" ? "text-blue-600" : "text-emerald-600"
                  }`}>
                    Section
                  </span>
                  <h2 className="text-2xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
                    {activeSection}
                  </h2>
                </div>
                <span className="text-slate-200 font-serif text-5xl md:text-8xl italic font-black leading-none translate-y-3">
                  0{SECTIONS.findIndex((s) => s.title === activeSection) + 1}
                </span>
              </div>

              <LocalTeamShowcase
                members={activeData}
                showRole={activeSection === "Advisory Board"}
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

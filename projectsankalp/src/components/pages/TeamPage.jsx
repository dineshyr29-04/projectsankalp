import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../core/Container";
import TeamShowcase from "../ui/TeamShowcase";

// --- TEAM DATA ---

const PATRONS = [
  { id: 'p1', name: 'Dr. Arthur Mitchell', role: 'Chief Patron', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', social: { linkedin: '#' } },
  { id: 'p2', name: 'Eleanor Vance', role: 'Patron', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', social: { twitter: '#' } },
];

const ADVISORY = [
  { id: 'a1', name: 'Prof. Robert Chang', role: 'Head of Advisory', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', social: { linkedin: '#' } },
  { id: 'a2', name: 'Dr. Sarah Jenkins', role: 'Advisory Board', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80', social: { twitter: '#' } },
  { id: 'a3', name: 'Dr. William Chen', role: 'Advisory Board', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', social: { linkedin: '#' } },
];

const ORG_SECRETARY = [
  { id: 'o1', name: 'Michael Sterling', role: 'Organizing Secretary', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', social: { linkedin: '#', twitter: '#' } },
];

const FACULTY = [
  { id: 'f1', name: 'Dr. Ashwini Shetty', role: 'Convener', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', social: { linkedin: '#' } },
  { id: 'f2', name: 'Mr. Rahul V.', role: 'Co-Convener', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', social: { linkedin: '#' } },
  { id: 'f3', name: 'Ms. Priya Rao', role: 'Co-Convener', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', social: { twitter: '#' } },
];

const STUDENT_CONVENERS = [
  { id: 's1', name: 'Radesh Pai', role: 'Student Convener', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80', social: { linkedin: '#', github: '#' } },
  { id: 's2', name: 'Dinesh', role: 'Student Convener', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', social: { twitter: '#', linkedin: '#', github: '#' } },
];

const HOSPITALITY = [
  { id: 'h1', name: 'Arjun Mehta', role: 'Hospitality Lead', image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80', social: { instagram: '#' } },
  { id: 'h2', name: 'Nina Patel', role: 'Hospitality Team', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', social: { instagram: '#' } },
];

const DISCIPLINARY = [
  { id: 'd1', name: 'Suresh G.', role: 'Disciplinary Head', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80', social: { linkedin: '#' } },
];

const REGISTRATION = [
  { id: 'r1', name: 'Kavita Singh', role: 'Registration Lead', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80', social: { instagram: '#' } },
];

const MEDIA = [
  { id: 'm1', name: 'Anita Desai', role: 'Media Lead', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80', social: { behance: '#', linkedin: '#' } },
  { id: 'm2', name: 'Meera K.', role: 'Media Team', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80', social: { instagram: '#' } },
];

const TECHNICAL = [
  { id: 't1', name: 'Dhanush Shenoy', role: 'Technical Lead', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=400&q=80', social: { linkedin: '#', github: '#' } },
];

const WEBSITE = [
  { id: 'w1', name: 'Vicky', role: 'Website Developer', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', social: { github: '#', linkedin: '#' } },
];

const SECTIONS = [
  { title: "Patron", type: "single", data: PATRONS },
  { title: "Advisory", type: "single", data: ADVISORY },
  { title: "Organizing Secretary", type: "single", data: ORG_SECRETARY },
  { title: "Faculty Conveners", type: "single", data: FACULTY },
  { 
    title: "Student Committees", 
    type: "grouped", 
    groups: [
      { title: "Student Conveners", data: STUDENT_CONVENERS },
      { title: "Technical", data: TECHNICAL },
      { title: "Website", data: WEBSITE },
      { title: "Registration", data: REGISTRATION },
      { title: "Media", data: MEDIA },
      { title: "Hospitality", data: HOSPITALITY },
      { title: "Disciplinary", data: DISCIPLINARY },
    ]
  },
];

export default function TeamPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].title);
  const [activeSubSection, setActiveSubSection] = useState("Student Conveners");

  const currentSection = SECTIONS.find(s => s.title === activeSection);
  const isGrouped = currentSection?.type === "grouped";
  
  // Determine which data to show
  let activeData = [];
  let displayTitle = activeSection;

  if (isGrouped) {
    const subGroup = currentSection.groups.find(g => g.title === activeSubSection) || currentSection.groups[0];
    activeData = subGroup.data;
    displayTitle = `${activeSection} — ${subGroup.title}`;
  } else {
    activeData = currentSection?.data || [];
  }

  // Dynamic background for active section
  const sectionColors = {
    "Patron": "from-slate-50 to-white",
    "Advisory": "from-emerald-50/50 to-white",
    "Organizing Secretary": "from-blue-50/50 to-white",
    "Faculty Conveners": "from-indigo-50/50 to-white",
    "Student Committees": "from-violet-50/50 to-white",
  };
  const currentBg = sectionColors[activeSection] || "from-slate-50 to-white";

  return (
    <div className="bg-white min-h-screen relative font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-32 transition-colors duration-1000">
      
      {/* Background Gradient Animation */}
      <div className={`absolute inset-0 bg-gradient-to-b ${currentBg} opacity-60 pointer-events-none transition-all duration-1000`} />

      {/* Hero Section */}
      <section className="relative pt-40 pb-16 z-10 border-b border-slate-100">
        <Container>
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-1 bg-slate-900" />
              <span className="text-slate-900 font-black uppercase tracking-[0.5em] text-[10px]">
                The Collective
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-serif font-black text-slate-900 leading-[0.85] tracking-tighter mb-10">
              Meet the <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Crew.</span>
            </h1>
            <p className="text-slate-500 text-xl md:text-2xl max-w-2xl font-medium border-l-4 border-slate-100 pl-8">
              The brilliant minds tracing our path. Explore the specialized
              nodes that form our collective intelligence.
            </p>
          </div>
        </Container>
      </section>

      {/* Primary Navigation Toggler */}
      <section className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4 transition-all duration-500">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar w-full max-w-5xl mx-auto">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.title;
              return (
                <button
                  key={section.title}
                  onClick={() => {
                    setActiveSection(section.title);
                    if (section.type === "grouped") {
                      setActiveSubSection(section.groups[0].title); // Reset sub-nav to first option
                    }
                  }}
                  className={`relative px-6 py-3 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap overflow-hidden ${
                    isActive
                      ? "text-white shadow-lg shadow-slate-900/20"
                      : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePrimaryTab"
                      className="absolute inset-0 bg-slate-900 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {section.title}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Secondary Navigation Toggler (Only for grouped sections) */}
      <AnimatePresence>
        {isGrouped && (
          <motion.section 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sticky top-[73px] sm:top-[77px] z-40 bg-slate-50/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-inner overflow-hidden"
          >
            <Container>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar w-full max-w-5xl mx-auto">
                {currentSection.groups.map((group) => {
                  const isActive = activeSubSection === group.title;
                  return (
                    <button
                      key={group.title}
                      onClick={() => setActiveSubSection(group.title)}
                      className={`relative px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap overflow-hidden border ${
                        isActive
                          ? "text-slate-900 border-slate-300 bg-white shadow-sm"
                          : "text-slate-400 border-transparent hover:text-slate-700 hover:bg-white/50"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeSecondaryTab"
                          className="absolute inset-0 border-2 border-slate-900 rounded-full pointer-events-none"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      {group.title}
                    </button>
                  );
                })}
              </div>
            </Container>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Dynamic Team Section */}
      <section className="relative z-10 py-12 md:py-20 min-h-[600px]">
        <Container>
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${activeSection}-${activeSubSection}`}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8 w-full max-w-5xl mx-auto"
            >
              {/* Section Header */}
              <div className="flex items-center gap-6 border-b border-slate-200/60 pb-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
                  {displayTitle}
                </h2>
                <span className="text-slate-300 font-serif text-3xl md:text-5xl italic font-black ml-auto">
                  0{SECTIONS.findIndex(s => s.title === activeSection) + 1}
                </span>
              </div>

              {/* Team Showcase Grid */}
              <TeamShowcase members={activeData} />
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      <div className="flex flex-col items-center gap-6 opacity-30 text-center mt-20 border-t border-slate-100 pt-10 relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">Project Sankalp Team _ 2026</p>
      </div>
    </div>
  );
}

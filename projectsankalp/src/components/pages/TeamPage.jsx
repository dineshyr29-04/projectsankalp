import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Search } from "lucide-react";
import Container from "../core/Container";

// --- TEAM DATA ---
const ALL_MEMBERS = [
  // --- WEB DEVELOPERS ---
  
  // --- VISIONARIES ---
  {
    id: "v1",
    name: "Dr. Ashwini Shetty",
    role: "Expedition Lead",
    category: "The Visionaries",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "v2",
    name: "Radesh Pai",
    role: "Overall Student Coordinator",
    category: "The Visionaries",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "v3",
    name: "Sarah Jenkins",
    role: "Co-Organizer",
    category: "The Visionaries",
    color: "from-blue-400 to-blue-600",
  },

  // --- NAVIGATORS ---
  {
    id: "n1",
    name: "Ms. Priya Rao",
    role: "Tech Lead",
    category: "The Navigators",
    color: "from-indigo-400 to-indigo-600",
  },
  {
    id: "n2",
    name: "Mr. Rahul V.",
    role: "Design Lead",
    category: "The Navigators",
    color: "from-indigo-400 to-indigo-600",
  },
  {
    id: "n3",
    name: "Anita Desai",
    role: "Data Head",
    category: "The Navigators",
    color: "from-indigo-400 to-indigo-600",
  },
{
    id: "dev1",
    name: "Dinesh",
    role: "Technical Lead",
    category: "The Builders",
    color: "from-emerald-400 to-teal-600",
  },
  {
    id: "dev2",
    name: "Dhanush Shenoy",
    role: "Web Developer",
    category: "The Builders",
    color: "from-emerald-400 to-teal-600",
  },
  
  // --- STORYTELLERS ---
  ...Array.from({ length: 4 }).map((_, i) => ({
    id: `s${i + 1}`,
    name: `Creative ${i + 1}`,
    role: ["UI Designer", "UX Researcher", "Copywriter", "Motion Gen"][i % 4],
    category: "The Storytellers",
    color: "from-purple-400 to-purple-600",
  })),

  // --- ENABLERS ---
  ...Array.from({ length: 4 }).map((_, i) => ({
    id: `e${i + 1}`,
    name: `Operator ${i + 1}`,
    role: ["Community Mgr", "Event Ops", "Logistics"][i % 3],
    category: "The Enablers",
    color: "from-amber-400 to-amber-600",
  })),
];

const CATEGORIES = [
  "All",
  "The Visionaries",
  "The Navigators",
  "The Builders",
  "The Storytellers",
  "The Enablers",
];

const getInitials = (name) => {
  // Remove titles so initials are based on actual names
  const cleanName = name.replace(/Dr\.\s*|Prof\.\s*|Ms\.\s*|Mr\.\s*/g, '');
  const words = cleanName.trim().split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return cleanName[0]?.toUpperCase() || "X";
};

const TeamCard = ({ member }) => {
  const initials = getInitials(member.name);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col items-center justify-center text-center overflow-hidden rounded-2xl p-8 backdrop-blur-xl bg-slate-900/40 border border-white/5 hover:border-white/10 hover:bg-slate-800/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
    >
      {/* Background animated glow on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${member.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`}
      />

      <div className="z-10 flex flex-col items-center">
        {/* Initials Avatar Box */}
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-950/50 shadow-inner mb-6 transition-transform duration-500 group-hover:scale-110">
          <span className="font-serif text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-200 to-slate-500 group-hover:from-white group-hover:to-slate-200 transition-all duration-300">
            {initials}
          </span>
        </div>
        
        {/* Details Box */}
        <div className="flex flex-col">
          <h3 className="font-serif text-xl font-bold text-slate-100 group-hover:text-white transition-colors duration-300 leading-tight">
            {member.name}
          </h3>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400/80 mt-2">
            {member.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function TeamPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMembers = ALL_MEMBERS.filter(
    (member) => activeCategory === "All" || member.category === activeCategory
  );

  return (
    <div className="bg-[#020817] min-h-screen relative overflow-hidden selection:bg-emerald-500/30 font-sans">
      {/* Premium Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#020817] to-[#020817]" />
        <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-emerald-500/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-16 z-10">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md mb-8"
            >
              <Target className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300 drop-shadow-sm">
                The Collective
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[90px] font-serif font-black text-white leading-[0.9] tracking-tight mb-8"
            >
              Meet the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600 italic font-light">
                Crew.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-400 text-lg max-w-2xl mx-auto font-medium"
            >
              The brilliant minds tracing our path. Explore the specialized
              nodes that form our collective intelligence.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Filter Navigation */}
      <section className="relative z-20 pb-10 sticky top-20 md:top-24 backdrop-blur-xl bg-[#020817]/80 border-b border-white/5 pt-4">
        <Container>
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 hide-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                  activeCategory === category
                    ? "text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-emerald-400 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Grid Layout */}
      <section className="relative z-10 py-16 pb-40">
        <Container>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              <Search className="w-10 h-10 mx-auto mb-4 opacity-50" />
              <p>No members found in this category.</p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

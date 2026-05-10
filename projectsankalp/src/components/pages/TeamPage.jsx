import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Code,
  PenTool,
  MessageSquare,
  Zap,
  Target,
  User,
  Map,
  Search,
} from "lucide-react";
import Container from "../core/Container";

// --- FLATTENED MOCK DATA FOR 30+ MEMBERS ---
const ALL_MEMBERS = [
  {
    id: "v1",
    name: "Dr. Akash Yadav",
    role: "Expedition Lead",
    title: "Lead Organizer",
    stats: { power: "Vision", exp: "15 yrs" },
    category: "The Visionaries",
    icon: Target,
    color: "from-emerald-400 to-emerald-600",
  },
  {
    id: "v2",
    name: "Prof. S. Kumar",
    role: "Chief Mentor",
    title: "Faculty Coordinator",
    stats: { power: "Guidance", exp: "20 yrs" },
    category: "The Visionaries",
    icon: Target,
    color: "from-emerald-400 to-emerald-600",
  },
  {
    id: "v3",
    name: "Sarah Jenkins",
    role: "Strategy Lead",
    title: "Co-Organizer",
    stats: { power: "Planning", exp: "8 yrs" },
    category: "The Visionaries",
    icon: Target,
    color: "from-emerald-400 to-emerald-600",
  },
  {
    id: "n1",
    name: "Ms. Priya Rao",
    role: "Chief Navigator",
    title: "Tech Lead",
    stats: { power: "Optimization", exp: "10 yrs" },
    category: "The Navigators",
    icon: Compass,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "n2",
    name: "Mr. Rahul V.",
    role: "Visual Scout",
    title: "Design Lead",
    stats: { power: "Aesthetics", exp: "7 yrs" },
    category: "The Navigators",
    icon: Compass,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "n3",
    name: "Anita Desai",
    role: "Data Cartographer",
    title: "Data Head",
    stats: { power: "Analytics", exp: "6 yrs" },
    category: "The Navigators",
    icon: Compass,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "n4",
    name: "James Wilson",
    role: "Security Warden",
    title: "Cyber Lead",
    stats: { power: "Firewalls", exp: "9 yrs" },
    category: "The Navigators",
    icon: Compass,
    color: "from-blue-400 to-blue-600",
  },
  ...Array.from({ length: 8 }).map((_, i) => ({
    id: `b${i + 1}`,
    name: `Engineer ${i + 1}`,
    role: ["Frontend Dev", "Backend Dev", "Fullstack"][i % 3],
    title: "Core Team",
    stats: { power: "Coding", exp: `${(i % 5) + 1} yrs` },
    category: "The Builders",
    icon: Code,
    color: "from-indigo-400 to-indigo-600",
  })),
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: `s${i + 1}`,
    name: `Creative ${i + 1}`,
    role: ["UI Designer", "UX Researcher", "Copywriter", "Motion Gen"][i % 4],
    title: "Design Team",
    stats: { power: "Pixels", exp: `${(i % 4) + 2} yrs` },
    category: "The Storytellers",
    icon: PenTool,
    color: "from-purple-400 to-purple-600",
  })),
  ...Array.from({ length: 4 }).map((_, i) => ({
    id: `e${i + 1}`,
    name: `Operator ${i + 1}`,
    role: ["Community Mgr", "Event Ops", "Logistics"][i % 3],
    title: "Ops Team",
    stats: { power: "Organization", exp: `${(i % 3) + 1} yrs` },
    category: "The Enablers",
    icon: Zap,
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

const TeamCard = ({ member }) => {
  const Icon = member.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-900/60 p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
    >
      {/* Background glow on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`}
      />

      {/* Top Section */}
      <div className="flex items-start justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-transform duration-500 group-hover:scale-110">
            <Icon className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-white transition-colors duration-300 group-hover:text-emerald-400">
              {member.name}
            </h3>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mt-1">
              {member.role}
            </p>
          </div>
        </div>
      </div>

      {/* Stats overlay revealed on hover (Law of Proximity / Aesthetic-Usability Effect) */}
      <div className="mt-8 pt-5 border-t border-white/10 relative z-10 flex items-center justify-between">
        <div>
          <span className="block text-[9px] uppercase tracking-[0.2em] text-slate-500 mb-1">
            Focus
          </span>
          <span className="block text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
            {member.stats.power}
          </span>
        </div>
        <div className="text-right">
          <span className="block text-[9px] uppercase tracking-[0.2em] text-slate-500 mb-1">
            Level
          </span>
          <span className="block text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
            {member.stats.exp}
          </span>
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
              30+ individuals tracing a singular path. Explore the specialized
              nodes that form our collective intelligence.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Filter Navigation (Hick's Law & Fitts's Law) */}
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

      {/* Grid Layout (Jakob's Law) */}
      <section className="relative z-10 py-16 pb-40">
        <Container>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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

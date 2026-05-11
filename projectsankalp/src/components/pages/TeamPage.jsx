import React, { useState } from "react";
import { motion } from "framer-motion";
import Container from "../core/Container";

// --- TEAM DATA ---
const ALL_MEMBERS = [
  // --- VISIONARIES ---
  {
    id: "v1",
    name: "Dr. Ashwini Shetty",
    role: "Expedition Lead",
    category: "The Visionaries",
  },
  {
    id: "v2",
    name: "Radesh Pai",
    role: "Overall Student Coordinator",
    category: "The Visionaries",
  },
  {
    id: "v3",
    name: "Sarah Jenkins",
    role: "Co-Organizer",
    category: "The Visionaries",
  },
  {
    id: "n1",
    name: "Ms. Priya Rao",
    role: "Tech Lead",
    category: "The Navigators",
  },
  {
    id: "n2",
    name: "Mr. Rahul V.",
    role: "Design Lead",
    category: "The Navigators",
  },
  {
    id: "n3",
    name: "Anita Desai",
    role: "Data Head",
    category: "The Navigators",
  },
  {
    id: "dev1",
    name: "Dinesh",
    role: "Technical Lead",
    category: "The Builders",
  },
  {
    id: "dev2",
    name: "Dhanush Shenoy",
    role: "Web Developer",
    category: "The Builders",
  },
  {
    id: "s1",
    name: "Arjun Mehta",
    role: "UI Designer",
    category: "The Storytellers",
  },
  {
    id: "s2",
    name: "Kavita Singh",
    role: "UX Researcher",
    category: "The Storytellers",
  },
  {
    id: "e1",
    name: "Suresh G.",
    role: "Community Manager",
    category: "The Enablers",
  },
  {
    id: "e2",
    name: "Meera K.",
    role: "Logistics Lead",
    category: "The Enablers",
  },
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
    <div className="flex flex-col items-center text-center p-10 bg-slate-50 rounded-[32px] border border-transparent transition-all">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white border border-slate-100 mb-8 shadow-sm">
        <span className="font-serif text-3xl font-black text-slate-900">
          {initials}
        </span>
      </div>
      <div className="space-y-2">
        <h3 className="font-serif text-2xl font-black text-slate-900 leading-tight">
          {member.name}
        </h3>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">
          {member.role}
        </p>
      </div>
    </div>
  );
};

export default function TeamPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMembers = ALL_MEMBERS.filter(
    (member) => activeCategory === "All" || member.category === activeCategory
  );

  return (
    <div className="bg-white min-h-screen relative font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-32">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 z-10 border-b border-slate-100">
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
              <span className="italic">Crew.</span>
            </h1>
            <p className="text-slate-500 text-xl md:text-2xl max-w-2xl font-medium border-l-4 border-slate-100 pl-8">
              The brilliant minds tracing our path. Explore the specialized
              nodes that form our collective intelligence.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter Navigation */}
      <section className="relative z-20 py-12 border-b border-slate-50">
        <Container>
          <div className="flex items-center gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all border-none cursor-pointer ${
                  activeCategory === category
                    ? "bg-slate-900 text-white shadow-xl"
                    : "bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Grid Layout */}
      <section className="relative z-10 py-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {filteredMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-32 text-slate-400">
              <p className="text-xl font-bold">No members found in this category.</p>
            </div>
          )}
        </Container>
      </section>

      <div className="flex flex-col items-center gap-6 opacity-30 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">Project Sankalp Team _ 2026</p>
      </div>
    </div>
  );
}

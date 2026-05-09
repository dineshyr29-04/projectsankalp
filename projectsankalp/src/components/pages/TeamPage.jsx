import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Compass, Code, PenTool, MessageSquare, Zap, Target, User, Map } from "lucide-react";
import Container from "../core/Container";

// --- FLATTENED MOCK DATA FOR 30+ MEMBERS ---
// Instead of categories, it's a single continuous array
const ALL_MEMBERS = [
  { id: "v1", name: "Dr. Akash Yadav", role: "Expedition Lead", title: "Lead Organizer", stats: { power: "Vision", exp: "15 yrs" }, category: "The Visionaries", icon: Target, color: "from-emerald-400 to-emerald-600" },
  { id: "v2", name: "Prof. S. Kumar", role: "Chief Mentor", title: "Faculty Coordinator", stats: { power: "Guidance", exp: "20 yrs" }, category: "The Visionaries", icon: Target, color: "from-emerald-400 to-emerald-600" },
  { id: "v3", name: "Sarah Jenkins", role: "Strategy Lead", title: "Co-Organizer", stats: { power: "Planning", exp: "8 yrs" }, category: "The Visionaries", icon: Target, color: "from-emerald-400 to-emerald-600" },
  { id: "n1", name: "Ms. Priya Rao", role: "Chief Navigator", title: "Tech Lead", stats: { power: "Optimization", exp: "10 yrs" }, category: "The Navigators", icon: Compass, color: "from-blue-400 to-blue-600" },
  { id: "n2", name: "Mr. Rahul V.", role: "Visual Scout", title: "Design Lead", stats: { power: "Aesthetics", exp: "7 yrs" }, category: "The Navigators", icon: Compass, color: "from-blue-400 to-blue-600" },
  { id: "n3", name: "Anita Desai", role: "Data Cartographer", title: "Data Head", stats: { power: "Analytics", exp: "6 yrs" }, category: "The Navigators", icon: Compass, color: "from-blue-400 to-blue-600" },
  { id: "n4", name: "James Wilson", role: "Security Warden", title: "Cyber Lead", stats: { power: "Firewalls", exp: "9 yrs" }, category: "The Navigators", icon: Compass, color: "from-blue-400 to-blue-600" },
  ...Array.from({ length: 8 }).map((_, i) => ({
    id: `b${i+1}`, name: `Engineer ${i+1}`, role: ["Frontend Dev", "Backend Dev", "Fullstack"][i % 3], title: "Core Team", stats: { power: "Coding", exp: `${(i%5)+1} yrs` }, category: "The Builders", icon: Code, color: "from-indigo-400 to-indigo-600"
  })),
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: `s${i+1}`, name: `Creative ${i+1}`, role: ["UI Designer", "UX Researcher", "Copywriter", "Motion Gen"][i % 4], title: "Design Team", stats: { power: "Pixels", exp: `${(i%4)+2} yrs` }, category: "The Storytellers", icon: PenTool, color: "from-purple-400 to-purple-600"
  })),
  ...Array.from({ length: 4 }).map((_, i) => ({
    id: `e${i+1}`, name: `Operator ${i+1}`, role: ["Community Mgr", "Event Ops", "Logistics"][i % 3], title: "Ops Team", stats: { power: "Organization", exp: `${(i%3)+1} yrs` }, category: "The Enablers", icon: Zap, color: "from-amber-400 to-amber-600"
  }))
];


// --- INDIVIDUAL NODE TIMELINE ITEM ---
const TimelineNode = ({ member, index, total, scrollYProgress }) => {
  const isLeft = index % 2 === 0;
  
  // Calculate SVG spline path
  // Center = 500, Left Node = 300, Right Node = 700
  const startX = index === 0 ? 500 : (isLeft ? 700 : 300);
  const endX = isLeft ? 300 : 700;
  
  // If it's the very last item, we draw the curve down to the node and stop. 
  // Wait, the path goes from top (0) to bottom (250). The node is at Y=250.
  // Actually, let's put the node at the BOTTOM of the SVG (Y=250).
  // Then the next SVG starts from the top (Y=0). This connects them perfectly!
  const rowHeight = 250;
  const d = `M ${startX} 0 C ${startX} ${rowHeight/2}, ${endX} ${rowHeight/2}, ${endX} ${rowHeight}`;

  // Calculate when this specific line should start drawing based on scroll
  const startTrigger = index / total;
  const endTrigger = (index + 1) / total;
  const lineDraw = useTransform(scrollYProgress, [startTrigger, endTrigger], [0, 1]);

  return (
    <div className="relative w-full h-[250px] group">
      
      {/* ── Desktop SVG Spline Segment ── */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 1000 250" preserveAspectRatio="none">
        <path d={d} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
        <motion.path 
          d={d} fill="none" stroke={`url(#glowGradient-${index})`} strokeWidth="4" 
          style={{ pathLength: lineDraw }}
        />
        <defs>
          <linearGradient id={`glowGradient-${index}`} x1="0" y1="0" x2="0" y2="250" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d399" />
            <stop offset="1" stopColor="#047857" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Mobile Vertical Line ── */}
      <div className="absolute top-0 left-[30px] w-[2px] h-full bg-white/5 md:hidden" />
      <motion.div 
        className="absolute top-0 left-[30px] w-[2px] h-full bg-emerald-500 origin-top md:hidden shadow-[0_0_10px_#10b981]" 
        style={{ scaleY: lineDraw }}
      />

      {/* ── The Avatar Node ── */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        className={`absolute bottom-0 -translate-y-1/2 -translate-x-1/2 z-20 left-[30px] ${isLeft ? 'md:left-[30%]' : 'md:left-[70%]'}`}
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-900 border-2 border-emerald-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] group-hover:border-emerald-400">
          <User className="w-8 h-8 md:w-10 md:h-10 text-emerald-100" />
        </div>
      </motion.div>

      {/* ── The Data Shard Card ── */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="absolute bottom-0 -translate-y-1/2 z-10 
                   left-[80px] right-4 md:right-auto md:left-auto md:w-[400px]"
      >
        {/* We use a wrapper to handle desktop alternating positions */}
        <div className={`
          w-full md:absolute md:-translate-y-1/2
          ${isLeft 
            ? 'md:left-[calc(30%+80px)]' 
            : 'md:right-[calc(30%+80px)]'
          }
        `}>
          
          <div 
            className={`relative bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 md:p-6 transition-all duration-500 group-hover:bg-slate-800/80 group-hover:border-emerald-500/50 ${isLeft ? 'text-left' : 'md:text-right text-left'}`}
            style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
          >
            {/* Category Tag */}
            <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5 mb-3 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
              <member.icon className="w-3 h-3 text-emerald-400" />
              <span className="text-[8px] uppercase tracking-widest text-slate-300">{member.category}</span>
            </div>

            <h4 className="text-xl md:text-2xl font-serif font-black text-white">{member.name}</h4>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-emerald-400 mt-1 font-bold">{member.role}</p>
            
            <div className={`mt-4 pt-3 border-t border-white/10 flex gap-6 ${isLeft ? 'justify-start' : 'md:justify-end justify-start'}`}>
              <div>
                <span className="block text-[8px] uppercase tracking-widest text-slate-500">Focus</span>
                <span className="block text-xs md:text-sm font-medium text-slate-200">{member.stats.power}</span>
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-widest text-slate-500">Level</span>
                <span className="block text-xs md:text-sm font-medium text-slate-200">{member.stats.exp}</span>
              </div>
            </div>
          </div>
          
          {/* Horizontal Connection Line (Desktop only) */}
          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-10 h-[2px] bg-emerald-500/30 group-hover:bg-emerald-400 transition-colors
            ${isLeft ? 'left-[-40px]' : 'right-[-40px]'}
          `} />

        </div>
      </motion.div>

    </div>
  );
};


// --- MAIN COMPONENT ---
export default function TeamPage() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  return (
    <div className="bg-slate-950 min-h-screen relative overflow-hidden selection:bg-emerald-500/30">
      
      {/* ── Deep Sea Image Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="/sea-bg.png" 
          alt="Deep Sea" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-[#0a4d3c]/80 to-[#021f15]/95 mix-blend-normal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] mix-blend-multiply" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/20 blur-[100px] mix-blend-overlay" />
      </div>

      {/* ── Hero Section ── */}
      <section className="relative pt-40 pb-20 z-10">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-200/20 bg-white/10 backdrop-blur-md mb-8 shadow-xl"
            >
              <Map className="w-4 h-4 text-emerald-800 md:text-emerald-300" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 md:text-white drop-shadow-sm">The Continuous Journey</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[90px] font-serif font-black text-slate-900 md:text-white leading-[0.9] tracking-tight mb-8"
            >
              Meet the <br/>
              <span className="text-emerald-700 md:text-emerald-400 italic font-light drop-shadow-md">Crew.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-800 md:text-emerald-50 text-lg max-w-2xl mx-auto font-medium"
            >
              30+ individuals tracing a singular path. As you dive deeper, each node reveals a critical piece of the expedition.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ── The Individual Node Timeline ── */}
      <div ref={containerRef} className="relative z-10 pb-40 w-full max-w-[1000px] mx-auto">
        <div className="flex flex-col w-full relative">
          
          {ALL_MEMBERS.map((member, index) => (
            <TimelineNode 
              key={member.id} 
              member={member} 
              index={index} 
              total={ALL_MEMBERS.length} 
              scrollYProgress={smoothScrollYProgress} 
            />
          ))}

          {/* Final Endpoint Node */}
          <div className="relative w-full h-[100px] flex items-end">
            <div className="absolute bottom-0 -translate-y-1/2 -translate-x-1/2 z-20 left-[30px] md:left-[30%] md:group-even:left-[70%]">
              <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_20px_#34d399] animate-pulse" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

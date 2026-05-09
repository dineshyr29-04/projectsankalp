import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Compass, Code, PenTool, MessageSquare, Zap, Target, ArrowRight, User, Map } from "lucide-react";
import Container from "../core/Container";

// --- MOCK DATA FOR 30+ MEMBERS ---
const TEAM_DATA = [
  {
    id: "cat-1",
    category: "The Visionaries",
    description: "Setting the direction and charting the course for the entire expedition.",
    icon: Target,
    color: "from-emerald-400 to-emerald-600",
    bgAccent: "bg-emerald-500/5",
    members: [
      { id: "v1", name: "Dr. Akash Yadav", role: "Expedition Lead", title: "Lead Organizer", stats: { power: "Vision", exp: "15 yrs", fuel: "Black Coffee" } },
      { id: "v2", name: "Prof. S. Kumar", role: "Chief Mentor", title: "Faculty Coordinator", stats: { power: "Guidance", exp: "20 yrs", fuel: "Tea" } },
      { id: "v3", name: "Sarah Jenkins", role: "Strategy Lead", title: "Co-Organizer", stats: { power: "Planning", exp: "8 yrs", fuel: "Matcha" } },
      { id: "v4", name: "David Chen", role: "Partnerships", title: "Sponsor Relations", stats: { power: "Networking", exp: "5 yrs", fuel: "Espresso" } },
    ]
  },
  {
    id: "cat-2",
    category: "The Navigators",
    description: "Technical heads guiding the architecture and ensuring safe passage.",
    icon: Compass,
    color: "from-blue-400 to-blue-600",
    bgAccent: "bg-blue-500/5",
    members: [
      { id: "n1", name: "Ms. Priya Rao", role: "Chief Navigator", title: "Tech Lead", stats: { power: "Optimization", exp: "10 yrs", fuel: "Red Bull" } },
      { id: "n2", name: "Mr. Rahul V.", role: "Visual Scout", title: "Design Lead", stats: { power: "Aesthetics", exp: "7 yrs", fuel: "Iced Latte" } },
      { id: "n3", name: "Anita Desai", role: "Data Cartographer", title: "Data Head", stats: { power: "Analytics", exp: "6 yrs", fuel: "Green Tea" } },
      { id: "n4", name: "James Wilson", role: "Security Warden", title: "Cyber Lead", stats: { power: "Firewalls", exp: "9 yrs", fuel: "Black Coffee" } },
      { id: "n5", name: "Elena Rodriguez", role: "Cloud Architect", title: "Infra Lead", stats: { power: "Scaling", exp: "8 yrs", fuel: "Cold Brew" } },
      { id: "n6", name: "Marcus Johnson", role: "AI Specialist", title: "ML Head", stats: { power: "Algorithms", exp: "5 yrs", fuel: "Monster" } },
    ]
  },
  {
    id: "cat-3",
    category: "The Builders",
    description: "The engineers turning blueprints into reality through code and logic.",
    icon: Code,
    color: "from-indigo-400 to-indigo-600",
    bgAccent: "bg-indigo-500/5",
    members: Array.from({ length: 12 }).map((_, i) => ({
      id: `b${i+1}`, 
      name: `Engineer ${i+1}`, 
      role: ["Frontend Dev", "Backend Dev", "Fullstack"][i % 3], 
      title: "Core Team", 
      stats: { power: "Coding", exp: `${(i%5)+1} yrs`, fuel: "Pizza" }
    }))
  },
  {
    id: "cat-4",
    category: "The Storytellers",
    description: "Crafting the narrative, UI, and marketing to connect with the world.",
    icon: PenTool,
    color: "from-purple-400 to-purple-600",
    bgAccent: "bg-purple-500/5",
    members: Array.from({ length: 8 }).map((_, i) => ({
      id: `s${i+1}`, 
      name: `Creative ${i+1}`, 
      role: ["UI Designer", "UX Researcher", "Copywriter", "Motion Gen"][i % 4], 
      title: "Design Team", 
      stats: { power: "Pixels", exp: `${(i%4)+2} yrs`, fuel: "Smoothie" }
    }))
  },
  {
    id: "cat-5",
    category: "The Enablers",
    description: "Operations, logistics, and community support keeping the journey smooth.",
    icon: Zap,
    color: "from-amber-400 to-amber-600",
    bgAccent: "bg-amber-500/5",
    members: Array.from({ length: 6 }).map((_, i) => ({
      id: `e${i+1}`, 
      name: `Operator ${i+1}`, 
      role: ["Community Mgr", "Event Ops", "Logistics"][i % 3], 
      title: "Ops Team", 
      stats: { power: "Organization", exp: `${(i%3)+1} yrs`, fuel: "Water" }
    }))
  }
];

// --- FLIP CARD COMPONENT ---
const MemberCard = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-[300px] perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-700 ease-out"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 backface-hidden bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 flex flex-col items-center justify-center overflow-hidden hover:border-slate-500/50 transition-colors">
          {/* Subtle gradient glow behind avatar */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full" />
          
          <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-600 mb-6 flex items-center justify-center relative z-10 overflow-hidden">
            <User className="text-slate-500 w-10 h-10" />
            {/* Image would go here: <img src={member.img} /> */}
          </div>
          
          <h4 className="text-lg font-serif font-bold text-slate-100 text-center relative z-10">{member.name}</h4>
          <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-400 mt-2 font-black relative z-10 text-center">{member.role}</p>
          <p className="text-xs text-slate-400 mt-1 relative z-10 text-center">{member.title}</p>
        </div>

        {/* BACK OF CARD (Traveler Stats) */}
        <div className="absolute inset-0 backface-hidden bg-emerald-900/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 flex flex-col rotate-y-180">
          <div className="flex items-center gap-2 mb-6 border-b border-emerald-500/20 pb-3">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold">Traveler ID</span>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Superpower</span>
              <span className="text-sm font-bold text-emerald-300">{member.stats.power}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Experience</span>
              <span className="text-sm font-bold text-slate-200">{member.stats.exp}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Primary Fuel</span>
              <span className="text-sm font-bold text-slate-200">{member.stats.fuel}</span>
            </div>
          </div>
          
          <div className="mt-auto pt-4 flex justify-end">
            <div className="text-[8px] tracking-[0.3em] uppercase text-emerald-500/50">Sankalp_Core</div>
          </div>
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

  // Calculate the path drawing based on scroll
  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  // Flatten members for the footer roster
  const allMembers = TEAM_DATA.flatMap(cat => cat.members);

  return (
    <div className="bg-slate-950 min-h-screen relative overflow-hidden selection:bg-emerald-500/30">
      
      {/* ── Subtle Deep Void Image Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#030712] overflow-hidden">
        
        {/* Subtle Background Image (Dark Earth/Network theme) */}
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" 
          alt="Deep Space Network" 
          className="absolute inset-0 w-full h-full object-cover opacity-[0.15]"
        />
        
        {/* Dark overlay to keep the image subtle and text readable */}
        <div className="absolute inset-0 bg-[#030712]/70" />

        {/* Deep Space Vignette (Darkens edges to create depth) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_100%)] z-10 opacity-90" />

        {/* Ambient Nebula Glows (maintains your brand colors in the void) */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] mix-blend-screen z-0" />
        
        {/* Static Star Dust overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] z-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      {/* ── Hero Section ── */}
      <section className="relative pt-40 pb-20 z-10">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 mb-8 backdrop-blur-md"
            >
              <Map className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">The Sankalp Trail</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[90px] font-serif font-black text-white leading-[0.9] tracking-tight mb-8"
            >
              Meet the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 italic font-light">Navigators.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-400 text-lg max-w-2xl mx-auto font-medium"
            >
              30+ dreamers, thinkers, and creators traveling together to build meaningful experiences for the world. Follow the path to discover the crew.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ── The Journey Trail ── */}
      <div ref={containerRef} className="relative z-10 pb-40">
        
        {/* The Central Animated SVG Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 z-0 hidden sm:block">
           <div className="absolute inset-0 bg-slate-800/50 w-full" />
           <motion.div 
             className="absolute top-0 w-full bg-gradient-to-b from-emerald-400 via-blue-500 to-purple-500 origin-top shadow-[0_0_15px_rgba(16,185,129,0.5)]"
             style={{ scaleY: pathLength, height: '100%' }}
           />
           {/* The 'Traveler' Dot */}
           <motion.div 
             className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] -left-[7px]"
             style={{ top: useTransform(pathLength, [0, 1], ["0%", "100%"]) }}
           />
        </div>

        {/* Categories / Waypoints */}
        <Container className="relative z-10">
          <div className="space-y-32 md:space-y-48">
            {TEAM_DATA.map((category, index) => {
              const isEven = index % 2 === 0;
              const Icon = category.icon;
              
              return (
                <div key={category.id} className="relative pt-10" id={category.id}>
                  
                  {/* Category Header */}
                  <div className={`flex flex-col md:flex-row gap-8 items-start md:items-center mb-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`flex-1 ${isEven ? 'md:text-right' : 'text-left'}`}>
                      <motion.div 
                        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 mb-6 ${isEven ? 'md:flex-row-reverse' : ''}`}
                      >
                        <Icon className={`w-4 h-4 text-slate-300`} />
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r ${category.color}`}>
                          Phase 0{index + 1}
                        </span>
                      </motion.div>
                      
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-4xl md:text-6xl font-serif font-black text-white mb-4"
                      >
                        {category.category}
                      </motion.h2>
                      
                      <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-slate-400 max-w-md text-lg"
                        style={{ marginLeft: isEven ? 'auto' : '0' }}
                      >
                        {category.description}
                      </motion.p>
                    </div>
                    
                    {/* The Connecting Node (Desktop only) */}
                    <div className="hidden md:flex w-24 h-24 items-center justify-center shrink-0 relative z-10">
                      <div className={`absolute inset-0 rounded-full blur-xl ${category.bgAccent} opacity-50`} />
                      <div className="w-6 h-6 rounded-full bg-slate-900 border-4 border-slate-700 z-10 relative" />
                    </div>

                    <div className="flex-1 hidden md:block" /> {/* Spacer for layout */}
                  </div>

                  {/* Member Grid */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}>
                    {category.members.map((member, mIdx) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: mIdx * 0.1, duration: 0.6 }}
                      >
                        <MemberCard member={member} />
                      </motion.div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* ── Bottom Roster Footer (Fixed/Sticky) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800/50 p-4 transform translate-y-0 transition-transform duration-500 hidden sm:block">
        <Container>
          <div className="flex items-center gap-6">
            <div className="shrink-0 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              The Crew <br/> <span className="text-emerald-400">{allMembers.length} Members</span>
            </div>
            
            {/* Horizontal Scroll Area */}
            <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 pb-2 pt-2">
              {allMembers.map((member) => (
                <button
                  key={`footer-${member.id}`}
                  onClick={() => {
                    // Logic to scroll to the category
                    // In a real app, we'd use refs to scroll exactly to the person.
                    window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
                  }}
                  className="w-10 h-10 shrink-0 rounded-full bg-slate-800 border border-slate-700 overflow-hidden hover:border-emerald-400 hover:scale-110 transition-all cursor-pointer group relative"
                  title={member.name}
                >
                  <User className="w-5 h-5 text-slate-500 mx-auto mt-2 group-hover:text-emerald-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </div>
  );
}

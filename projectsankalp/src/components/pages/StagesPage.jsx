import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Target,
  Users,
  Zap,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Heart,
  Globe,
  Activity,
  Leaf,
} from "lucide-react";
import Container from "../core/Container";
import { useEffect, useRef } from "react";

export default function StagesPage({ onBack }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Mission Challenges | Project Sankalp";
  }, []);

  const domainTracks = [
    {
      title: "Women's Entrepreneurship",
      subtitle: "Economic Empowerment",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      color: "blue",
      accent: "#2563eb",
      description: "Championing gender equality by building tools for financial independence and micro-business scaling. We aim to bridge the credit gap and provide digital ecosystems for growth.",
      features: ["Micro-Financing", "Skill Networks", "Leadership Tools"],
      problems: [
        "Decentralized marketplaces for rural artisans to scale global reach.",
        "AI-driven financial literacy platforms for women-led startups.",
        "P2P micro-lending systems with community-based trust scoring.",
      ],
    },
    {
      title: "Health & Sanitation",
      subtitle: "Community Wellbeing",
      icon: <Activity className="w-8 h-8 text-emerald-600" />,
      color: "emerald",
      accent: "#059669",
      description: "Developing innovative systems for preventive healthcare, clean water access, and waste management. Focus on tech that solves basic human needs at scale.",
      features: ["Telemedicine", "Waste Optimization", "Clean Water"],
      problems: [
        "Predictive analysis of water-borne diseases in urban settlements.",
        "Smart waste management systems for decentralized municipalities.",
        "Mobile-first diagnostic tools for rural maternal healthcare.",
      ],
    },
    {
      title: "Climate Action",
      subtitle: "Sustainability",
      icon: <Leaf className="w-8 h-8 text-teal-600" />,
      color: "teal",
      accent: "#0d9488",
      description: "Harnessing technology to combat climate change and promote green energy transitions. Building a circular economy and tracking environmental impact.",
      features: ["Renewable Energy", "Circular Economy", "Carbon Tracking"],
      problems: [
        "Real-time carbon footprint trackers for household consumption.",
        "Marketplaces for upcycled industrial waste and circular resources.",
        "Community-driven reforestation monitoring using satellite imagery.",
      ],
    },
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-32 overflow-hidden"
    >
      {/* ── Background Atmosphere ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]" 
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] mix-blend-multiply" />
      </div>

      <Container className="relative z-10 pt-32 md:pt-48 px-6 sm:px-10 lg:px-20 mx-auto">
        {/* Navigation */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          className="flex items-center gap-4 text-slate-400 hover:text-slate-900 transition-all mb-24 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center bg-white shadow-sm group-hover:shadow-md group-hover:border-slate-200 transition-all">
            <ArrowLeft size={18} />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">Return to</span>
            <span className="text-xs font-bold uppercase tracking-widest">Main Portal</span>
          </div>
        </motion.button>

        {/* Hero */}
        <div className="max-w-5xl mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-12 h-[2px] bg-emerald-500 rounded-full" />
            <span className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px]">
              Mission Objectives
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl md:text-[110px] font-serif font-black mb-10 leading-[0.85] tracking-tighter text-slate-900"
          >
            Global <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 italic">Challenges.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-3xl font-medium border-l-4 border-slate-100 pl-8"
          >
            A high-stakes arena for social innovation. We've identified three critical domains where technology can create the most profound impact. Choose your mission.
          </motion.p>
        </div>

        {/* ── UI LAW: Law of Common Region (Horizontal Layout) ── */}
        <div className="space-y-24 mb-40">
          {domainTracks.map((track, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              {/* Back Glow Decoration */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] blur-[100px] transition-opacity duration-1000 pointer-events-none"
                style={{ backgroundColor: track.accent }}
              />

              <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-20 bg-white border border-slate-100 rounded-[48px] p-8 md:p-12 lg:p-16 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 hover:border-slate-200">
                
                {/* Left Side: Domain Info */}
                <div className="lg:w-[450px] shrink-0 space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner group-hover:bg-${track.color}-50 group-hover:border-${track.color}-100 transition-colors duration-500`}>
                        {track.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-${track.color}-600 text-[10px] font-black uppercase tracking-[0.4em] block mb-1`}>
                          {track.subtitle}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 tracking-tight leading-none">
                          {track.title}
                        </h2>
                      </div>
                    </div>
                    
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {track.features.map((feat, i) => (
                      <span key={i} className="px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Vertical Divider (Desktop Only) */}
                <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-slate-100 to-transparent" />

                {/* Right Side: Problem Statements */}
                <div className="flex-1 space-y-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                      <Sparkles size={16} className="text-emerald-500" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">
                      Targeted Problem Statements
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {track.problems.map((prob, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ x: 10 }}
                        className="group/item flex gap-6 p-6 rounded-3xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm group-hover/item:border-emerald-200 transition-colors">
                          <ArrowUpRight size={16} className="text-slate-300 group-hover/item:text-emerald-500 transition-colors" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.2em]">PS-0{i+1}</p>
                          <p className="text-lg font-bold text-slate-700 leading-snug group-hover/item:text-slate-900 transition-colors">
                            {prob}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom Decor */}
                <div 
                  className="absolute bottom-0 left-0 w-full h-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left rounded-b-[48px]"
                  style={{ backgroundColor: track.accent }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[80px] bg-slate-900 p-16 md:p-32 text-center overflow-hidden group shadow-2xl"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
                Phase One Registration
              </span>
            </div>

            <h2 className="text-5xl md:text-8xl font-serif font-black leading-[0.9] text-white tracking-tighter">
              Commit to <br />
              <span className="italic text-emerald-400">Innovation.</span>
            </h2>

            <p className="text-white/50 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Your journey from ideation to impact starts with a single click. Join 500+ innovators building for a better tomorrow.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open("https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755", "_blank")}
              className="bg-white text-slate-900 px-16 py-6 rounded-full text-xs font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-emerald-400 transition-all cursor-pointer"
            >
              Start Your Mission
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

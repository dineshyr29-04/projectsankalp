import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Sparkles } from "lucide-react";

export default function Prizes() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  
  const podiumPrizes = [
    { ...siteConfig.prizes[1], accent: "from-blue-500/20 to-transparent", glow: "shadow-blue-500/10", delay: 0.2, height: "h-64" },
    { ...siteConfig.prizes[0], accent: "from-emerald-500/30 to-transparent", glow: "shadow-emerald-500/20", delay: 0, height: "h-80", featured: true },
    { ...siteConfig.prizes[2], accent: "from-slate-500/20 to-transparent", glow: "shadow-slate-500/10", delay: 0.4, height: "h-56" }
  ];

  return (
    <Section id="prizes" className="relative  py-32 md:py-48 overflow-hidden" ref={containerRef}>
      {/* Deep Space Background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-900/10 rounded-full blur-[200px] -mr-96 -mt-96 pointer-events-none"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent opacity-30" />

      <Container className="relative z-10 px-6 sm:px-14 lg:px-20 mx-auto">
        <header className="text-center mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-8 h-px bg-emerald-500/50" />
            <span className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[9px]">
              Mission Rewards
            </span>
            <div className="w-8 h-px bg-emerald-500/50" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-serif font-black text-white tracking-tighter leading-none"
          >
            Excellence Rewarded. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 italic">
              Future Funded.
            </span>
          </motion.h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end max-w-5xl mx-auto">
          {podiumPrizes.map((prize, index) => (
            <div key={index} className="relative group perspective-1000">
              {/* Floating Amount - Weightless Animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: prize.delay + 0.5,
                  duration: 1,
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                animate={{ y: [0, -15, 0] }}
                className="absolute -top-24 left-0 right-0 text-center z-30"
              >
                <span className="text-4xl md:text-6xl font-serif font-black text-white block tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  {prize.amount}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400/60 mt-2 block">
                  {prize.rank}
                </span>
              </motion.div>

              {/* Kinetic Grant Pillar */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: "auto", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: prize.delay, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className={`relative ${prize.height} w-full bg-slate-900/50 backdrop-blur-xl border-x border-t border-white/10 rounded-t-[40px] overflow-hidden group-hover:border-emerald-500/50 transition-colors duration-700`}>
                   {/* Internal Energy Beam */}
                   <div className={`absolute inset-0 bg-gradient-to-t ${prize.accent} opacity-50 group-hover:opacity-80 transition-opacity duration-700`} />
                   
                   {/* Laser Scan Line */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:animate-scan" />
                   
                   {/* Base Light */}
                   <div className={`absolute bottom-0 left-0 right-0 h-1 bg-white/20 blur-sm`} />
                </div>

                {/* Pillar Base */}
                <div className="h-4 bg-slate-950 rounded-b-xl border-x border-b border-white/5 shadow-2xl" />
                
                {/* Visual Glow */}
                <div className={`absolute -inset-10 bg-emerald-500/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10`} />
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-32 flex justify-center">
           <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
              ₹1,00,000+ Distributed in Research Grants
            </span>
          </motion.div>
        </div>
      </Container>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(300px); opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </Section>
  );
}

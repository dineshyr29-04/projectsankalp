import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";

export default function Prizes() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  
  const podiumPrizes = [
    { ...siteConfig.prizes[1], accent: "from-blue-500/10 to-transparent", glow: "shadow-blue-500/5", delay: 0.2, height: "h-64" },
    { ...siteConfig.prizes[0], accent: "from-emerald-500/20 to-transparent", glow: "shadow-emerald-500/10", delay: 0, height: "h-80", featured: true },
    { ...siteConfig.prizes[2], accent: "from-slate-400/10 to-transparent", glow: "shadow-slate-400/5", delay: 0.4, height: "h-56" }
  ];

  return (
    <Section id="prizes" className="relative bg-white py-32 md:py-48 overflow-hidden" ref={containerRef}>
      {/* Subtle Light Atmosphere */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-50/50 via-transparent to-transparent opacity-50" />

      <Container className="relative z-10 px-6 sm:px-14 lg:px-20 mx-auto">
        <header className="text-center mb-60">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="w-8 h-[1px] bg-slate-200" />
            <span className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[9px]">
              Mission Rewards
            </span>
            <div className="w-8 h-[1px] bg-slate-200" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif font-black text-slate-900 tracking-tighter leading-none"
          >
            Excellence Rewarded. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 italic">
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
                className="absolute -top-32 left-0 right-0 text-center z-30"
              >
                <span className="text-5xl md:text-4xl font-serif font-black text-slate-900 block tracking-tighter drop-shadow-sm">
                  {prize.amount}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mt-2 block">
                  {prize.rank}
                </span>
              </motion.div>

              {/* Kinetic Grant Pillar (Light Mode) */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: "auto", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: prize.delay, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className={`relative ${prize.height} w-full bg-white border border-slate-100 rounded-t-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden group-hover:border-emerald-400/50 transition-colors duration-700`}>
                   {/* Internal Energy Beam */}
                   <div className={`absolute inset-0 bg-gradient-to-t ${prize.accent} opacity-100 transition-opacity duration-700`} />
                   
                   {/* Laser Tracing Line */}
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:animate-scan" />
                   
                   {/* Subtle Accent Shadow */}
                   <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-50/50 to-transparent" />
                </div>

                {/* Pillar Base */}
                <div className="h-6 bg-slate-50 rounded-b-[20px] border border-t-0 border-slate-100 shadow-sm" />
                
                {/* Subtle Floor Shadow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-slate-200/20 blur-xl -z-10" />
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-40 flex justify-center">
           <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-full flex items-center gap-4 shadow-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              ₹1,00,000+ Total Research Grants
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

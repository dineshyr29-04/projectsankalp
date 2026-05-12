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
    { 
      ...siteConfig.prizes[1], 
      material: "Silver", 
      accent: "from-blue-200/50 to-transparent", 
      glow: "shadow-blue-200/20", 
      delay: 0.2, 
      scale: 0.9 
    },
    { 
      ...siteConfig.prizes[0], 
      material: "Gold", 
      accent: "from-amber-200/50 to-transparent", 
      glow: "shadow-amber-200/40", 
      delay: 0, 
      scale: 1.1,
      featured: true 
    },
    { 
      ...siteConfig.prizes[2], 
      material: "Bronze", 
      accent: "from-orange-200/40 to-transparent", 
      glow: "shadow-orange-200/20", 
      delay: 0.4, 
      scale: 0.85 
    }
  ];

  return (
    <Section id="prizes" className="relative bg-white py-32 md:py-48 overflow-hidden" ref={containerRef}>
      {/* Subtle Light Atmosphere */}
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
              The Gilded Rewards
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600 italic">
              Future Funded.
            </span>
          </motion.h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-12 items-center max-w-6xl mx-auto">
          {podiumPrizes.map((prize, index) => (
            <div key={index} className="relative group flex flex-col items-center">
              {/* Floating Amount Above Palm */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: prize.delay + 0.8,
                  duration: 1,
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                animate={{ y: [0, -20, 0] }}
                className="absolute -top-40 md:-top-48 left-0 right-0 text-center z-30 pointer-events-none"
              >
                <span className="text-4xl md:text-5xl font-serif font-black text-slate-900 block tracking-tighter">
                  {prize.amount}
                </span>
                <span className={`text-[10px] font-black uppercase tracking-[0.4em] mt-2 block ${
                  prize.material === 'Gold' ? 'text-amber-500' : 
                  prize.material === 'Silver' ? 'text-slate-400' : 'text-orange-700'
                }`}>
                  {prize.rank} • {prize.material} Edition
                </span>
              </motion.div>

              {/* 3D Hand Holder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 100 }}
                whileInView={{ opacity: 1, scale: prize.scale, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: prize.delay, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 cursor-pointer min-h-[300px] flex items-center justify-center"
              >
                <div className="relative w-64 md:w-80 aspect-square flex items-center justify-center">
                  {/* Subtle Aura Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${prize.accent} rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                  
                  {/* The Hand Image */}
                  <img 
                    src="/metallic_prize_hands.png" 
                    alt={`${prize.material} Hand Holder`}
                    className={`w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2`}
                    style={{
                      mixBlendMode: "multiply"
                    }}
                  />
                </div>
                
                {/* Hand Reflection Shadow */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-slate-200/20 blur-2xl -z-10 rounded-full" />
              </motion.div>

              {/* Description (Concise) */}
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: prize.delay + 1 }}
                className="mt-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 text-center max-w-[200px]"
              >
                {prize.description || "Mission Accomplishment Grant"}
              </motion.p>
            </div>
          ))}
        </div>

        <div className="mt-48 flex justify-center">
           <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-full flex items-center gap-4 shadow-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              ₹1,00,000+ Total Distributed via The Gilded Vault
            </span>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

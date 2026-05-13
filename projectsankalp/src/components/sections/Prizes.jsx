import { motion } from "framer-motion";
import { useRef } from "react";
import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";

// ── MINIMAL 3D CARD COMPONENT ──
const PrizeCard = ({ prize, index, isCenter }) => {
  // Color mappings
  const colors = {
    Gold: { base: "from-amber-200 to-yellow-600", border: "border-amber-200", glow: "hover:shadow-amber-500/20", text: "text-amber-500", bg: "from-amber-50/80" },
    Silver: { base: "from-slate-200 to-slate-500", border: "border-slate-200", glow: "hover:shadow-slate-400/20", text: "text-slate-500", bg: "from-slate-50/80" },
    Bronze: { base: "from-orange-200 to-amber-700", border: "border-orange-200", glow: "hover:shadow-orange-500/20", text: "text-orange-600", bg: "from-orange-50/80" }
  };
  const theme = colors[prize.material] || colors.Gold;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className={`relative w-full max-w-[340px] md:w-[320px] p-10 rounded-[2rem] bg-white border ${theme.border} shadow-xl ${theme.glow} transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden mx-auto ${isCenter ? 'md:-translate-y-4 md:hover:-translate-y-6 z-10' : 'z-0'}`}
    >
      {/* Decorative gradient blur in background */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${theme.base} opacity-[0.08] rounded-bl-full -z-10`} />
      
      {/* Subtle bottom gradient for depth */}
      <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t ${theme.bg} to-transparent -z-10`} />

      <div className="space-y-6">
        <span className={`inline-block px-4 py-1.5 rounded-full border ${theme.border} bg-white text-[10px] font-black uppercase tracking-[0.3em] ${theme.text} shadow-sm`}>
          {prize.rank}
        </span>
        <h3 className={`text-3xl font-serif font-black ${theme.text}`}>
          {prize.material}
        </h3>
      </div>

      <div className="mt-16 relative">
        <div className="text-5xl font-serif font-black text-slate-900 tracking-tighter tabular-nums">
          {prize.amount}
        </div>
      </div>
    </motion.div>
  );
};

export default function Prizes() {
  const containerRef = useRef(null);
  
  // Reorder so Gold (index 0) is physically in the middle of the array mapping, 
  // but logically let's map them as Silver, Gold, Bronze for UI layout
  const orderedPrizes = [
    { ...siteConfig.prizes[1], material: "Silver" },
    { ...siteConfig.prizes[0], material: "Gold" },
    { ...siteConfig.prizes[2], material: "Bronze" }
  ];

  return (
    <Section id="prizes" className="relative bg-slate-50 py-24 md:py-40 overflow-hidden" ref={containerRef}>
      
      {/* Background Ambience - Minimal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(59,130,246,0.02)_0%,transparent_70%)]" />
      </div>

      <Container className="relative z-10 px-4 sm:px-10 lg:px-20 mx-auto">
        <header className="text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 mb-6"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500"></span>
            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-600">Rewards</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500"></span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-slate-900 tracking-tighter leading-[0.9]"
          >
            The Future, <br className="hidden md:block" />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Engraved.</span>
          </motion.h2>
        </header>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 lg:gap-10 mx-auto">
          {orderedPrizes.map((prize, index) => (
            <PrizeCard 
              key={prize.rank} 
              prize={prize} 
              index={index} 
              isCenter={index === 1} 
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

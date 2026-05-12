import { motion, useScroll, useTransform } from "framer-motion";
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
  
  const editorialPrizes = [
    { 
      ...siteConfig.prizes[1], 
      material: "Silver", 
      image: "/prize-silver.png",
      layout: "md:col-start-1 md:row-start-2 md:-mt-32",
      delay: 0.2, 
      scale: 1.1,
      rankLabel: "Momentum Grant"
    },
    { 
      ...siteConfig.prizes[0], 
      material: "Gold", 
      image: "/prize-gold.png",
      layout: "md:col-start-2 md:row-start-1",
      delay: 0, 
      scale: 1.5,
      featured: true,
      rankLabel: "Grand Champion"
    },
    { 
      ...siteConfig.prizes[2], 
      material: "Bronze", 
      image: "/prize-bronze.png",
      layout: "md:col-start-3 md:row-start-2 md:mt-24",
      delay: 0.4, 
      scale: 0.95,
      rankLabel: "Perseverance Award"
    }
  ];

  return (
    <Section id="prizes" className="relative bg-[#FDFCFB] py-40 md:py-64 overflow-hidden" ref={containerRef}>
      {/* Editorial Canvas Detail */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(255,255,255,1)_0%,_rgba(253,252,251,1)_100%)]" />

      <Container className="relative z-10 px-6 sm:px-14 lg:px-20 mx-auto">
        <header className="text-center mb-64">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6 mb-12"
          >
            <span className="text-slate-400 font-black uppercase tracking-[0.6em] text-[10px]">
              The Innovation Fund
            </span>
            <div className="w-px h-16 bg-slate-200" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-[7rem] font-serif font-black text-slate-900 tracking-tighter leading-[0.85]"
          >
            Excellence <br /> 
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">
              Rewarded.
            </span>
          </motion.h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-y-32 md:gap-y-0 items-center max-w-7xl mx-auto">
          {editorialPrizes.map((prize, index) => (
            <div key={index} className={`relative group flex flex-col items-center ${prize.layout}`}>
              {/* Prize Value - Anchored to Hand Interaction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: prize.delay + 0.6,
                  duration: 1.2,
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                animate={{ y: [0, -10, 0] }}
                className="absolute -top-32 md:-top-40 left-0 right-0 text-center z-30 pointer-events-none px-4"
              >
                <span className="text-6xl md:text-8xl font-serif font-black text-slate-900 block tracking-tight">
                  {prize.amount}
                </span>
                <div className="flex flex-col items-center mt-4">
                  <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">
                    {prize.rankLabel}
                  </span>
                  <div className={`h-px w-8 mt-4 ${
                    prize.material === 'Gold' ? 'bg-amber-400' : 
                    prize.material === 'Silver' ? 'bg-slate-300' : 'bg-orange-300'
                  }`} />
                </div>
              </motion.div>

              {/* Editorial Hand Sculpture */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: prize.scale, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: prize.delay, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 cursor-pointer w-72 md:w-full max-w-[400px] aspect-square"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Soft Museum Lighting Reflection */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.8)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  <img 
                    src={prize.image} 
                    alt={`${prize.material} Award`}
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-1000 group-hover:scale-[1.02]"
                    style={{
                      mixBlendMode: "multiply"
                    }}
                  />
                </div>
                
                {/* Subtle Ground Shadow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-slate-900/[0.03] blur-3xl rounded-full" />
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-64 flex flex-col items-center">
           <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-px h-16 bg-slate-200" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              Invested in the Creators of Tomorrow
            </span>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

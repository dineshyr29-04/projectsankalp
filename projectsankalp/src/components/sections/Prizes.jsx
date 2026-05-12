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
  
  const artifactPrizes = [
    { 
      ...siteConfig.prizes[1], 
      material: "Silver", 
      image: "/artifact-silver.png",
      layout: "md:col-start-1 md:row-start-2 md:translate-y-32 z-10",
      delay: 0.2, 
      scale: 1.15,
      label: "EXCELLENCE UNIT",
      description: "Strategic Innovation Grant"
    },
    { 
      ...siteConfig.prizes[0], 
      material: "Gold", 
      image: "/artifact-gold.png",
      layout: "md:col-start-2 md:row-start-1 z-20",
      delay: 0, 
      scale: 1.6,
      label: "PRESTIGE CORE",
      description: "Grand Visionary Fund"
    },
    { 
      ...siteConfig.prizes[2], 
      material: "Bronze", 
      image: "/artifact-bronze.png",
      layout: "md:col-start-3 md:row-start-2 md:translate-y-48 z-10",
      delay: 0.4, 
      scale: 0.95,
      label: "FOUNDATION SLAB",
      description: "Impact Resilience Award"
    }
  ];

  return (
    <Section id="prizes" className="relative bg-[#F2F0ED] py-48 md:py-80 overflow-hidden" ref={containerRef}>
      {/* Museum Gallery Detail */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(255,255,255,1)_0%,_rgba(242,240,237,1)_100%)]" />

      <Container className="relative z-10 px-6 sm:px-14 lg:px-20 mx-auto">
        <header className="text-center mb-72">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8 mb-16"
          >
            <span className="text-slate-400 font-black uppercase tracking-[0.8em] text-[10px]">
              The Gilded Artifacts
            </span>
            <div className="w-px h-24 bg-slate-200" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-[8rem] font-serif font-black text-slate-900 tracking-tighter leading-[0.8]"
          >
            THE FUTURE <br /> 
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">
              ENGRAVED.
            </span>
          </motion.h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-y-48 md:gap-y-0 items-center max-w-7xl mx-auto">
          {artifactPrizes.map((prize, index) => (
            <div key={index} className={`relative group flex flex-col items-center ${prize.layout}`}>
              {/* Metadata Label - Minimal Editorial Style */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: prize.delay + 0.8 }}
                className="absolute -top-24 left-0 right-0 text-center pointer-events-none"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 block mb-2">
                  {prize.label}
                </span>
                <span className="text-xl font-serif italic text-slate-900">
                  {prize.rank}
                </span>
              </motion.div>

              {/* Monumental Artifact Sculpture */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 100 }}
                whileInView={{ opacity: 1, scale: prize.scale, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: prize.delay, duration: 2, ease: [0.22, 1, 0.36, 1] }}
                className="relative cursor-pointer w-full max-w-[450px] aspect-square"
              >
                <motion.div 
                  animate={{ 
                    y: [0, -15, 0],
                    rotateZ: [0, 1, 0, -1, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Internal Glow Effect for Gold */}
                  {prize.material === 'Gold' && (
                    <div className="absolute inset-0 bg-amber-200/20 blur-[120px] rounded-full animate-pulse" />
                  )}
                  
                  <img 
                    src={prize.image} 
                    alt={prize.label}
                    className="w-full h-full object-contain filter drop-shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-1000 group-hover:brightness-110"
                    style={{
                      mixBlendMode: "multiply"
                    }}
                  />
                </motion.div>
                
                {/* Volumetric Ground Shadow */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-slate-900/[0.04] blur-[50px] rounded-full -z-10" />
              </motion.div>

              {/* Functional Description */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: prize.delay + 1.2 }}
                className="mt-12 text-center"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                  {prize.description}
                </p>
                <div className={`h-[2px] w-12 mx-auto ${
                  prize.material === 'Gold' ? 'bg-amber-400' : 
                  prize.material === 'Silver' ? 'bg-slate-300' : 'bg-orange-300'
                }`} />
              </motion.div>
            </div>
          ))}
        </div>

        <footer className="mt-80 flex flex-col items-center">
           <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-10"
          >
            <div className="w-[1px] h-32 bg-gradient-to-b from-slate-200 to-transparent" />
            <div className="text-center space-y-4">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 block">
                Official Valuation Registry
              </span>
              <p className="text-slate-400 font-serif italic text-sm">
                "The artifacts of today are the architectures of tomorrow."
              </p>
            </div>
          </motion.div>
        </footer>
      </Container>
    </Section>
  );
}

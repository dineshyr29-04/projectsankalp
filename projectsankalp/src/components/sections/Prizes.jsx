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
      layout: "md:col-start-1 md:row-start-2 md:translate-y-6",
      delay: 0.2, 
      scale: 0.95
    },
    { 
      ...siteConfig.prizes[0], 
      material: "Gold", 
      image: "/artifact-gold.png",
      layout: "md:col-start-2 md:row-start-1",
      delay: 0, 
      scale: 1.2
    },
    { 
      ...siteConfig.prizes[2], 
      material: "Bronze", 
      image: "/artifact-bronze.png",
      layout: "md:col-start-3 md:row-start-2 md:translate-y-12",
      delay: 0.4, 
      scale: 0.8
    }
  ];

  return (
    <Section id="prizes" className="relative bg-[#F2F0ED] py-32 md:py-48 overflow-hidden" ref={containerRef}>
      {/* Museum Gallery Detail */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(255,255,255,1)_0%,_rgba(242,240,237,1)_100%)]" />

      <Container className="relative z-10 px-6 sm:px-14 lg:px-20 mx-auto">
        <header className="text-center mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6 mb-10"
          >
            <span className="text-slate-400 font-black uppercase tracking-[0.8em] text-[9px]">
              Gilded Vault
            </span>
            <div className="w-px h-16 bg-slate-200" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif font-black text-slate-900 tracking-tighter leading-tight"
          >
            The Future, <span className="italic text-slate-400">Engraved.</span>
          </motion.h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-y-24 md:gap-y-0 items-center max-w-4xl mx-auto">
          {artifactPrizes.map((prize, index) => (
            <div key={index} className={`relative group flex flex-col items-center ${prize.layout}`}>
              {/* Prize Rank - Tiny Editorial Style */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: prize.delay + 0.6 }}
                className="absolute -top-12 left-0 right-0 text-center pointer-events-none"
              >
                <span className="text-[10px] font-serif italic text-slate-400">
                  {prize.rank}
                </span>
              </motion.div>

              {/* Monumental Artifact Sculpture (The Bars) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: prize.scale, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: prize.delay, duration: 2, ease: [0.22, 1, 0.36, 1] }}
                className="relative cursor-pointer w-full max-w-[280px] aspect-square"
              >
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <img 
                    src={prize.image} 
                    alt={prize.rank}
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
                    style={{
                      mixBlendMode: "multiply"
                    }}
                  />
                </motion.div>
                
                {/* Subtle Ground Shadow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-slate-900/[0.03] blur-2xl rounded-full -z-10" />
              </motion.div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

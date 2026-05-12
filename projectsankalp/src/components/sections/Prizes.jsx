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
      yOffset: "translate-y-4 md:translate-y-12",
      delay: 0.2, 
      scale: 0.9
    },
    { 
      ...siteConfig.prizes[0], 
      material: "Gold", 
      image: "/artifact-gold.png",
      yOffset: "translate-y-0",
      delay: 0, 
      scale: 1.15
    },
    { 
      ...siteConfig.prizes[2], 
      material: "Bronze", 
      image: "/artifact-bronze.png",
      yOffset: "translate-y-8 md:translate-y-24",
      delay: 0.4, 
      scale: 0.8
    }
  ];

  return (
    <Section id="prizes" className="relative bg-[white] py-24 md:py-40 overflow-hidden" ref={containerRef}>
      {/* Museum Gallery Detail */}
      

      <Container className="relative z-10 px-4 sm:px-14 lg:px-20 mx-auto">
        <header className="text-center mb-60">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-serif font-black text-slate-900 tracking-tighter leading-tight"
          >
            The Future, <span className="italic text-green-400">Engraved.</span>
          </motion.h2>
        </header>

        <div className="flex flex-row justify-center items-end gap-2 md:gap-19 mx-auto">
          {artifactPrizes.map((prize, index) => (
            <div key={index} className={`relative flex flex-col items-center ${prize.yOffset} transition-transform duration-1000`}>
              {/* Prize Value & Rank - Top Group */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: prize.delay + 0.6 }}
                className="absolute -top-16 md:-top-24 left-0 right-0 text-center pointer-events-none"
              >
                <span className="text-[8px] md:text-[15px] font-serif italic text-slate-400 block mb-1">
                  {prize.rank}
                </span>
                <span className="text-sm md:text-2xl font-serif font-black text-slate-900 block tracking-tight">
                  {prize.amount}
                </span>
              </motion.div>

              {/* Monumental Artifact Sculpture (The Bars) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: prize.scale, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: prize.delay, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative cursor-pointer w-24 sm:w-32 md:w-64 aspect-square"
              >
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
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
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.04)]"
                    style={{
                      mixBlendMode: "multiply"
                    }}
                  />
                </motion.div>
                
                {/* Subtle Ground Shadow */}
                <div className="absolute -bottom-4 md:-bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-4 md:h-8 bg-slate-900/[0.03] blur-xl md:blur-2xl rounded-full -z-10" />
              </motion.div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

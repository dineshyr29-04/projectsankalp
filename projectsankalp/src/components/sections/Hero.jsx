import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yStats = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-white"
    >
      {/* Background Parallax Gradients */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 opacity-5 pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-full h-1/3 bg-orange-500 blur-[120px]" />
        <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white blur-[120px]" />
        <div className="absolute top-2/3 left-0 w-full h-1/3 bg-green-600 blur-[120px]" />
      </motion.div>

      <Container className="relative z-10 text-center">
        <motion.div
          style={{ y: yText, opacity, scale }}
          className="flex flex-col items-center"
        >
          {/* Main Title Layout */}
          <div className="relative mb-12">
            <h1 className="text-[70px] md:text-[140px] lg:text-[180px] leading-[0.85] font-serif font-black text-primary tracking-tighter uppercase">
              PROJECT
            </h1>
            <h1 className="text-[70px] md:text-[140px] lg:text-[180px] leading-[0.85] font-serif font-black text-primary tracking-tighter uppercase">
              SANKALP
            </h1>
          </div>

          <motion.div>
            <h2 className="text-sm md:text-xl font-bold text-text-secondary tracking-[0.4em] uppercase mb-16">
              CODE FOR CHANGE
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <button className="bg-primary text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                Apply Now
              </button>
              <button className="bg-white text-primary border-2 border-border px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-surface transition-all flex items-center gap-3">
                <span className="bg-[#3B82F6] p-1 rounded-full text-white text-[10px]">✈️</span> Join Telegram
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yStats, opacity }}
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 max-w-4xl mx-auto py-8 border-y border-border bg-white/50 backdrop-blur-sm"
        >
          {siteConfig.stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-black text-primary">{stat.value}</span>
              <span className="text-[10px] md:text-xs text-text-secondary uppercase tracking-[0.2em] font-bold">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

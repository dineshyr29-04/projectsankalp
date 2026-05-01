import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Calendar, ChevronRight, Zap } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent pt-32 pb-20"
    >
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] -mr-96 -mt-96 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] -ml-96 -mb-96" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-green-50/30 via-white to-blue-50/30 opacity-60" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          style={{ y: yText, opacity }}
          className="flex flex-col items-center"
        >
          {/* Main Hero Typography */}
          <div className="relative flex flex-col items-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-8xl md:text-[160px] lg:text-[220px] font-serif font-black text-primary leading-[0.75] tracking-tighter uppercase"
            >
              PROJECT
            </motion.h1>
            
            {/* Styled Space with Code for Change */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="my-4 md:my-0 flex items-center gap-4 group"
            >
              <div className="h-px w-12 md:w-24 bg-primary/20 group-hover:w-32 transition-all duration-700" />
              <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.6em] text-accent py-2 px-6 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm shadow-xl shadow-accent/5">
                Code for Change
              </span>
              <div className="h-px w-12 md:w-24 bg-primary/20 group-hover:w-32 transition-all duration-700" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-8xl md:text-[160px] lg:text-[220px] font-serif font-black tracking-tighter uppercase text-stroke leading-[0.75]"
            >
              SANKALP
            </motion.h1>
          </div>

          {/* Action & Details Box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-full max-w-4xl p-2 rounded-[40px] bg-white border border-border shadow-2xl shadow-black/5"
          >
            <div className="flex flex-col md:flex-row items-center gap-2">
              {/* Register Button Part */}
              <div className="w-full md:w-auto flex-1 p-6 md:p-8 flex flex-col items-center md:items-start text-center md:text-left gap-4 bg-surface rounded-[32px]">
                <span className="text-[10px] font-black uppercase tracking-widest text-accent flex items-center gap-2">
                  <Zap size={14} className="fill-accent" /> Registration Open
                </span>
                <h3 className="text-2xl font-serif font-black text-primary">Join the Revolution.</h3>
                <button className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20">
                  Register Now
                </button>
              </div>

              {/* Info Details Part */}
              <div className="w-full md:w-auto flex-1 p-6 md:p-10 grid grid-cols-2 gap-8">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-2">Hackathon Dates</span>
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-primary" />
                    <span className="text-sm font-bold text-primary">May 24-25, 2026</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-2">Total Rounds</span>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md border-2 border-primary flex items-center justify-center text-[10px] font-black">3</div>
                    <span className="text-sm font-bold text-primary">Qualifiers + Grand Finale</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

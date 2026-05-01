import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Calendar, ChevronRight, Zap, Award, Shield } from "lucide-react";

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
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent pt-20 pb-12"
    >
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-accent/20 rounded-full blur-[180px] -mr-96 -mt-96 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-blue-500/20 rounded-full blur-[180px] -ml-96 -mb-96" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-green-100/40 via-white to-blue-100/40 opacity-80" />
      </div>

      <Container className="relative z-10 text-center flex flex-col items-center">
        <motion.div
          style={{ y: yText, opacity }}
          className="flex flex-col items-center w-full"
        >
          {/* Logo Header - MASSIVE LOGOS, TIGHT BOX */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-6 mb-8 bg-white/60 backdrop-blur-xl px-6 py-3 rounded-[30px] border border-white/70 shadow-xl shadow-black/5"
          >
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-30 h-26 rounded-[20px] flex items-center justify-center">
                <img src="/nsslogo.png" alt="NSS Logo" className="w-full h-full object-contain transition-transform duration-500 hover:scale-105 hover:rotate-180" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-primary whitespace-nowrap">NSS Unit</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-10 bg-primary/20" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-text-secondary opacity-60 whitespace-nowrap">Presented By</span>
              <div className="w-px h-10 bg-primary/20" />
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-32 h-32 rounded-[20px] flex items-center justify-center">
                <img src="/ysetlogo.png" alt="YSET Logo" className="w-full h-full object-contain transition-transform duration-500 hover:scale-115" />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-primary whitespace-nowrap">Yenepoya </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-primary whitespace-nowrap">Deemed To Be University</span>
            </div>
          </motion.div>

          {/* Main Hero Typography - Smaller & Wider */}
          <div className="relative flex flex-col items-center max-w-[100vw]">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[100px] lg:text-[130px] font-serif font-black text-primary leading-[0.8] tracking-[0.15em] uppercase w-full"
            >
              PROJECT
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="my-3 md:my-4 flex items-center gap-4 group"
            >
              <div className="h-px w-16 md:w-32 bg-primary/20 group-hover:w-40 transition-all duration-700" />
              <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] text-accent py-2 px-6 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm shadow-xl shadow-accent/5 whitespace-nowrap">
                Code 4 Change
              </span>
              <div className="h-px w-16 md:w-32 bg-primary/20 group-hover:w-40 transition-all duration-700" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[100px] lg:text-[130px] font-serif font-black tracking-[0.15em] uppercase text-stroke leading-[0.8] w-full"
            >
              SANKALP
            </motion.h1>
          </div>

          {/* Action & Details Box - Margin Top 1rem (mt-4) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.02, 
              boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.1)",
              borderColor: "rgba(16, 185, 129, 0.2)" 
            }}
            transition={{ delay: 0.1, duration: 1 }}
            className="mt-[20px] w-full min-w-[20vw] md:w-[60vw] p-1 rounded-[30px] bg-white border border-border/50 shadow-2xl shadow-black/5 transition-colors duration-500"
          >
            <div className="flex items-center gap-1">
              <div className="flex-1 p-3 md:p-4 flex flex-col items-start gap-2 bg-surface rounded-[24px]">
                <span className="text-[12px] font-black uppercase tracking-widest text-accent flex items-center gap-1.5 whitespace-nowrap">
                  <Zap size={12} className="fill-accent" /> Registration Open
                </span>
                <h3 className="text-[12px] md:text-[14px] font-serif font-black text-primary leading-tight whitespace-nowrap">Join the Revolution.</h3>
                <button className="bg-primary text-white px-4 py-1.5 rounded-lg text-[12px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                  Register Now
                </button>
              </div>

              <div className="flex-1 p-3 md:p-4 flex items-center justify-around gap-2">
                <div className="text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-0.5 whitespace-nowrap">Dates</span>
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <Calendar size={8} className="text-primary" />
                    <span className="text-[12px] font-bold text-primary">May 24-25</span>
                  </div>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-0.5 whitespace-nowrap">Rounds</span>
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <div className="w-2.5 h-2.5 rounded-sm border border-primary flex items-center justify-center text-[6px] font-black">3</div>
                    <span className="text-[12px] font-bold text-primary">3 Rounds</span>
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

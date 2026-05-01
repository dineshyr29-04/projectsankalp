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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent pt-24 md:pt-32 pb-12"
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
          {/* Logo Header - Mobile Responsive */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8 bg-white/60 backdrop-blur-xl px-6 py-4 md:px-10 md:py-5 rounded-[30px] md:rounded-[40px] border border-white/70 shadow-xl shadow-black/5 w-fit"
          >
            {/* NSS Logo */}
            <div className="flex items-center md:flex-col gap-4 md:gap-2">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-[15px] md:rounded-[20px] flex items-center justify-center p-2 shadow-xl shadow-black/5 border border-border/50 transition-transform duration-500 hover:scale-105">
                <img src="/nsslogo.png" alt="NSS Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-[10px] md:text-[9px] font-black uppercase tracking-widest text-primary whitespace-nowrap">NSS Unit</span>
            </div>
            
            {/* Divider */}
            <div className="hidden md:flex flex-col items-center gap-2">
              <div className="w-px h-10 bg-primary/20" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-text-secondary opacity-60 whitespace-nowrap">Presented By</span>
              <div className="w-px h-10 bg-primary/20" />
            </div>
            <span className="md:hidden text-[8px] font-black uppercase tracking-[0.3em] text-text-secondary opacity-60">Presented By</span>

            {/* YSET Logo */}
            <div className="flex items-center md:flex-col gap-4 md:gap-2">
              <div className="flex flex-col md:items-center">
                <span className="text-[8px] md:hidden font-black uppercase tracking-widest text-primary leading-tight">Yenepoya Deemed To Be University</span>
                <span className="hidden md:block text-[8px] font-black uppercase tracking-widest text-primary whitespace-nowrap">Yenepoya </span>
                <span className="hidden md:block text-[9px] font-black uppercase tracking-widest text-primary whitespace-nowrap">Deemed To Be University</span>
              </div>
              <div className="w-16 h-16 md:w-28 md:h-28 bg-white rounded-[15px] md:rounded-[20px] flex items-center justify-center p-2 shadow-xl shadow-black/5 border border-border/50 transition-transform duration-500 hover:scale-105">
                <img src="/ysetlogo.png" alt="YSET Logo" className="w-full h-full object-contain" />
              </div>
            </div>
          </motion.div>

          {/* Main Hero Typography - Mobile Perfect */}
          <div className="relative flex flex-col items-center w-full max-w-full overflow-hidden">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-[90px] lg:text-[120px] font-serif font-black text-primary leading-[0.8] tracking-[0.1em] md:tracking-[0.15em] uppercase w-full"
            >
              PROJECT
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="my-4 md:my-6 flex items-center gap-3 md:gap-4 group"
            >
              <div className="h-px w-8 sm:w-16 md:w-32 bg-primary/20 group-hover:w-40 transition-all duration-700" />
              <span className="text-[9px] md:text-[12px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-accent py-1.5 px-4 md:py-2 md:px-6 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm shadow-xl shadow-accent/5 whitespace-nowrap">
                Code 4 Change
              </span>
              <div className="h-px w-8 sm:w-16 md:w-32 bg-primary/20 group-hover:w-40 transition-all duration-700" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-[90px] lg:text-[120px] font-serif font-black tracking-[0.1em] md:tracking-[0.15em] uppercase text-stroke leading-[0.8] w-full"
            >
              SANKALP
            </motion.h1>
          </div>

          {/* Action & Details Box - Mobile Perfect Width & Layout */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.01, 
              boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ delay: 0.1, duration: 1 }}
            className="mt-8 md:mt-12 w-full max-w-sm md:max-w-4xl p-1 rounded-[35px] bg-white border border-border/50 shadow-2xl shadow-black/5"
          >
            <div className="flex flex-col md:flex-row items-center gap-1">
              {/* Register Section */}
              <div className="w-full md:flex-1 p-5 md:p-6 flex flex-col items-center md:items-start text-center md:text-left gap-3 bg-surface rounded-[30px]">
                <span className="text-[10px] md:text-[12px] font-black uppercase tracking-widest text-accent flex items-center gap-2 whitespace-nowrap">
                  <Zap size={14} className="fill-accent" /> Registration Open
                </span>
                <h3 className="text-base md:text-xl font-serif font-black text-primary leading-tight">Join the Revolution.</h3>
                <button className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                  Register Now
                </button>
              </div>

              {/* Info Details Section */}
              <div className="w-full md:flex-1 p-5 md:p-8 flex items-center justify-around gap-4 md:gap-8">
                <div className="text-center md:text-left">
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1">Dates</span>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    <span className="text-xs md:text-sm font-bold text-primary">May 24-25, 2026</span>
                  </div>
                </div>
                <div className="w-px h-10 bg-border hidden md:block" />
                <div className="text-center md:text-left">
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1">Total Rounds</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-md border-2 border-primary flex items-center justify-center text-[10px] font-black">3</div>
                    <span className="text-xs md:text-sm font-bold text-primary">Qualifiers + Finale</span>
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

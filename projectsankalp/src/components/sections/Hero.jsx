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
      className="relative h-screen flex flex-col items-center justify-between overflow-hidden bg-transparent pt-32 pb-12"
    >
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-accent/20 rounded-full blur-[180px] -mr-96 -mt-96 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-blue-500/20 rounded-full blur-[180px] -ml-96 -mb-96" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-green-100/40 via-white to-blue-100/40 opacity-80" />
      </div>

      <div /> {/* Spacer */}

      <Container className="relative z-10 text-center">
        <motion.div
          style={{ y: yText, opacity }}
          className="flex flex-col items-center"
        >
          {/* Logo Header - SIGNIFICANTLY BIGGER LOGOS */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-10 mb-12 bg-white/50 backdrop-blur-xl px-12 py-6 rounded-[40px] border border-white/60 shadow-xl shadow-black/5"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center p-3 shadow-2xl shadow-black/10 border border-border/50 group hover:scale-110 transition-transform duration-500">
                <img src="/nsslogo.png" alt="NSS Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary whitespace-nowrap">NSS Unit</span>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-px h-12 bg-primary/20" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-text-secondary opacity-60 whitespace-nowrap rotate-90 md:rotate-0">Presented By</span>
              <div className="w-px h-12 bg-primary/20" />
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center p-3 shadow-2xl shadow-black/10 border border-border/50 group hover:scale-110 transition-transform duration-500">
                <img src="/ysetlogo.png" alt="YSET Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary whitespace-nowrap">YSET</span>
            </div>
          </motion.div>

          {/* Main Hero Typography */}
          <div className="relative flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[140px] lg:text-[180px] font-serif font-black text-primary leading-[0.7] tracking-tighter uppercase"
            >
              PROJECT
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="my-4 md:my-6 flex items-center gap-4 group"
            >
              <div className="h-px w-12 md:w-24 bg-primary/20 group-hover:w-32 transition-all duration-700" />
              <span className="text-[10px] md:text-[14px] font-black uppercase tracking-[0.5em] text-accent py-2 px-6 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm shadow-xl shadow-accent/5 whitespace-nowrap">
                Code 4 Change
              </span>
              <div className="h-px w-12 md:w-24 bg-primary/20 group-hover:w-32 transition-all duration-700" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[140px] lg:text-[180px] font-serif font-black tracking-tighter uppercase text-stroke leading-[0.7]"
            >
              SANKALP
            </motion.h1>
          </div>
        </motion.div>
      </Container>

      {/* Action & Details Box - Even More Compact */}
      <Container className="relative z-10 w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.02, 
            boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.1)",
            borderColor: "rgba(16, 185, 129, 0.2)" 
          }}
          transition={{ delay: 0.1, duration: 1 }}
          className="w-full max-w-xl p-1 rounded-[35px] bg-white border border-border/50 shadow-2xl shadow-black/5 transition-colors duration-500 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-1">
            <div className="w-full md:w-auto flex-1 p-4 md:p-5 flex flex-col items-center md:items-start text-center md:text-left gap-2 bg-surface rounded-[30px]">
              <span className="text-[8px] font-black uppercase tracking-widest text-accent flex items-center gap-2 whitespace-nowrap">
                <Zap size={10} className="fill-accent" /> Registration Open
              </span>
              <h3 className="text-sm md:text-base font-serif font-black text-primary leading-tight whitespace-nowrap">Join the Revolution.</h3>
              <button className="w-full md:w-auto bg-primary text-white px-5 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/10">
                Register Now
              </button>
            </div>

            <div className="w-full md:w-auto flex-1 p-4 md:p-5 flex items-center justify-around gap-2">
              <div className="text-center">
                <span className="text-[7px] font-black uppercase tracking-widest text-text-secondary block mb-1 whitespace-nowrap">Dates</span>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <Calendar size={10} className="text-primary" />
                  <span className="text-[9px] font-bold text-primary">May 24-25, 2026</span>
                </div>
              </div>
              <div className="w-px h-6 bg-border" />
              <div className="text-center">
                <span className="text-[7px] font-black uppercase tracking-widest text-text-secondary block mb-1 whitespace-nowrap">Rounds</span>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <div className="w-3 h-3 rounded-sm border border-primary flex items-center justify-center text-[7px] font-black">3</div>
                  <span className="text-[9px] font-bold text-primary">Qualifiers + Finale</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

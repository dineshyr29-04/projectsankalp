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
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent pt-16 md:pt-24 pb-8"
    >
      {/* Continuous Environmental Flow - Layered Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Layer 1: Base Tonal Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/30 via-white to-blue-50/30 opacity-60" />
        
        {/* Layer 2: Deep Atmospheric Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-accent/20 rounded-full blur-[150px] animate-pulse duration-[10s]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[800px] bg-blue-600/15 rounded-full blur-[150px]" />
        
        {/* Layer 3: Floating Engineered Shards */}
        <div className="absolute top-1/4 left-10 w-64 h-64 border border-accent/10 rounded-full flex items-center justify-center opacity-20 rotate-12">
          <div className="w-48 h-48 border border-accent/5 rounded-full" />
        </div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 border border-blue-500/10 rounded-full flex items-center justify-center opacity-20 -rotate-12">
          <div className="w-72 h-72 border border-blue-500/5 rounded-full" />
        </div>
        
        {/* Layer 4: Viewport Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_70%)] opacity-80" />
      </div>

      <Container className="relative z-10 text-center flex flex-col items-center h-full justify-center">
        <motion.div
          style={{ y: yText, opacity }}
          className="flex flex-col items-center w-full"
        >
          {/* Logo Header - Compact Mobile Responsive Row */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-row items-center gap-3 md:gap-8 mb-4 md:mb-6 bg-white/60 backdrop-blur-xl px-4 py-1.5 md:py-2.5 rounded-[15px] md:rounded-[25px] border border-white/70 shadow-xl shadow-black/5 w-fit max-w-[95vw]"
          >
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-14 h-12 md:w-28 md:h-24 flex items-center justify-center">
                <img src="/nsslogo.png" alt="NSS Logo" className="w-full h-full object-contain transition-transform duration-500 hover:scale-105 hover:[transform:rotateY(180deg)]" />
              </div>
              <span className="text-[6px] md:text-[8px] font-black uppercase tracking-widest text-primary whitespace-nowrap">NSS Unit</span>
            </div>
            
            <div className="flex flex-col items-center gap-1 md:gap-2">
              <div className="w-px h-4 md:h-8 bg-primary/20" />
              <span className="text-[5px] md:text-[7px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-text-secondary opacity-60 whitespace-nowrap">Presented By</span>
              <div className="w-px h-4 md:h-8 bg-primary/20" />
            </div>

            <div className="flex flex-col items-center gap-0.5">
              <div className="w-16 h-16 md:w-30 md:h-30 flex items-center justify-center">
                <img src="/ysetlogo.png" alt="YSET Logo" className="w-full h-full object-contain transition-transform duration-500 hover:scale-115" />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[5px] md:text-[7px] font-black uppercase tracking-widest text-primary whitespace-nowrap leading-none">Yenepoya </span>
                <span className="text-[6px] md:text-[8px] font-black uppercase tracking-widest text-primary whitespace-nowrap leading-none mt-0.5">University</span>
              </div>
            </div>
          </motion.div>

          {/* Main Hero Typography - Viewport Scaled */}
          <div className="relative flex flex-col items-center max-w-[100vw]">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-[80px] lg:text-[110px] font-serif font-black text-primary leading-[0.8] tracking-[0.1em] md:tracking-[0.15em] uppercase w-full"
            >
              PROJECT
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="my-2 md:my-3 flex items-center gap-4 group"
            >
              <div className="h-px w-12 md:w-24 bg-primary/20" />
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-accent py-1 px-4 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm whitespace-nowrap">
                Code 4 Change
              </span>
              <div className="h-px w-12 md:w-24 bg-primary/20" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-[80px] lg:text-[110px] font-serif font-black tracking-[0.15em] uppercase text-stroke leading-[0.8] w-full"
            >
              SANKALP
            </motion.h1>
          </div>

          {/* Action & Details Box - Ultra Compact */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.01, 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
            }}
            transition={{ delay: 0.1, duration: 1 }}
            className="mt-6 md:mt-10 w-[92vw] md:w-[70vw] lg:w-[60vw] p-1.5 rounded-[35px] bg-white/70 backdrop-blur-3xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden group"
          >
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-1 relative z-10">
              {/* Left Side: Registration CTA */}
              <div className="flex-1 p-5 md:p-8 flex flex-col items-center text-center gap-3 md:gap-4 bg-surface/80 rounded-[30px] border border-white/50">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-accent flex items-center gap-2 whitespace-nowrap bg-accent/5 px-4 py-1 rounded-full border border-accent/10"
                >
                  <Zap size={12} className="fill-accent animate-pulse" /> Registration Open
                </motion.span>
                <h3 className="text-sm md:text-xl font-serif font-black text-primary leading-tight">Join the Revolution.</h3>
                <button className="bg-primary text-white px-8 py-2.5 md:py-3 rounded-2xl text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] hover:bg-primary/95 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300">
                  Register Now
                </button>
              </div>

              {/* Right Side: Key Details */}
              <div className="flex-1 p-5 md:p-8 flex items-center justify-around gap-6 md:gap-8">
                <div className="flex flex-col items-center gap-2 group/item">
                  <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] text-text-secondary opacity-60 block group-hover/item:text-primary transition-colors">Dates</span>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/50 border border-border/50 shadow-sm group-hover/item:border-primary/20 transition-all">
                    <Calendar size={14} className="text-primary" />
                    <span className="text-[11px] md:text-[13px] font-bold text-primary tracking-wide">May 24-25</span>
                  </div>
                </div>
                
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent opacity-50" />
                
                <div className="flex flex-col items-center gap-2 group/item">
                  <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] text-text-secondary opacity-60 block group-hover/item:text-primary transition-colors">Rounds</span>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/50 border border-border/50 shadow-sm group-hover/item:border-primary/20 transition-all">
                    <div className="w-5 h-5 rounded-lg bg-primary text-white flex items-center justify-center text-[10px] font-black shadow-md shadow-primary/20">3</div>
                    <span className="text-[11px] md:text-[13px] font-bold text-primary tracking-wide">3 Rounds</span>
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

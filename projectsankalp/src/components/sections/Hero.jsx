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
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-accent/20 rounded-full blur-[180px] -mr-96 -mt-96 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-blue-500/20 rounded-full blur-[180px] -ml-96 -mb-96" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-green-100/40 via-white to-blue-100/40 opacity-80" />
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
                <img src="/nsslogo.png" alt="NSS Logo" className="w-full h-full object-contain transition-transform duration-500 hover:scale-105" />
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
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)"
            }}
            transition={{ delay: 0.1, duration: 1 }}
            className="mt-4 md:mt-6 w-full min-w-[20vw] md:w-[60vw] p-1 rounded-[25px] bg-white border border-border/50 shadow-2xl shadow-black/5"
          >
            <div className="flex items-center gap-1">
              <div className="flex-1 p-2.5 md:p-4 flex flex-col items-start gap-1.5 md:gap-2 bg-surface rounded-[20px]">
                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-accent flex items-center gap-1 whitespace-nowrap">
                  <Zap size={10} className="fill-accent" /> Registration Open
                </span>
                <h3 className="text-[10px] md:text-[13px] font-serif font-black text-primary leading-tight whitespace-nowrap">Join the Revolution.</h3>
                <button className="bg-primary text-white px-3 md:px-4 py-1 md:py-1.5 rounded-lg text-[9px] md:text-[11px] font-black uppercase tracking-widest">
                  Register Now
                </button>
              </div>

              <div className="flex-1 p-2.5 md:p-4 flex items-center justify-around gap-2">
                <div className="text-center">
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-0.5 whitespace-nowrap">Dates</span>
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <Calendar size={8} className="text-primary" />
                    <span className="text-[10px] md:text-[11px] font-bold text-primary">May 24-25</span>
                  </div>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="text-center">
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-0.5 whitespace-nowrap">Rounds</span>
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <div className="w-2.5 h-2.5 rounded-sm border border-primary flex items-center justify-center text-[5px] font-black">3</div>
                    <span className="text-[10px] md:text-[11px] font-bold text-primary">3 Rounds</span>
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

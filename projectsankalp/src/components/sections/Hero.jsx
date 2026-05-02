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

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const sponsors = [
    { name: "Yenepoya University", logo: "/ysetlogo.png" },
    { name: "NSS Unit", logo: "/nsslogo.png" }
  ];

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col bg-white overflow-hidden pt-5"
    >
      {/* ── Rich Background System ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Base gradient: light green → white → light blue */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_160%_100%_at_50%_-20%,rgba(16,185,129,0.08)_0%,rgba(255,255,255,1)_60%,rgba(37,99,235,0.05)_100%)]" />

        {/* Subtle grid / mesh lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,185,129,1) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Large emerald orb — top-left */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.26, 0.18] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[15%] w-[700px] h-[700px] rounded-full bg-emerald-400/20 blur-[130px]"
        />

        {/* Large blue orb — bottom-right */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-[20%] -right-[15%] w-[750px] h-[750px] rounded-full bg-blue-400/15 blur-[150px]"
        />

        {/* Small accent orb — center-right */}
        <motion.div
          animate={{ y: [-20, 20, -20], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] right-[8%] w-[280px] h-[280px] rounded-full bg-emerald-300/20 blur-[80px]"
        />

        {/* Diagonal gradient streak — premium editorial touch */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,185,129,0.04)_0%,transparent_40%,rgba(37,99,235,0.04)_100%)]" />

        {/* Decorative corner arc — top right */}
        <svg
          className="absolute top-0 right-0 w-[420px] h-[420px] opacity-[0.06] text-emerald-600"
          viewBox="0 0 420 420"
          fill="none"
        >
          <circle cx="420" cy="0" r="200" stroke="currentColor" strokeWidth="1" />
          <circle cx="420" cy="0" r="300" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="420" cy="0" r="380" stroke="currentColor" strokeWidth="0.3" />
        </svg>

        {/* Decorative corner arc — bottom left */}
        <svg
          className="absolute bottom-0 left-0 w-[320px] h-[320px] opacity-[0.05] text-blue-600"
          viewBox="0 0 320 320"
          fill="none"
        >
          <circle cx="0" cy="320" r="160" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="320" r="260" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      {/* Main Content - Centered with Navbar Offset */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 pt-28 pb-12">
        <Container className="w-full px-4 sm:px-10 lg:px-20 mx-auto flex flex-col items-center justify-center gap-8 md:gap-12">
          {/* Main Content Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center space-y-6 md:space-y-8 w-full text-center"
          >
            {/* AUDIT FIX: Clear primary date & prize pool info */}
           

            {/* Heading - Wide & Impactful */}
            <div className="flex flex-col items-center w-full">
              <h1 className="text-5xl sm:text-8xl md:text-[90px] lg:text-[130px] sm:mt-[100px] font-serif font-black text-slate-900 leading-[0.8] tracking-[0.1em] uppercase">
                PROJECT
              </h1>
              
              {/* Pill Badge - Centered between heading words */}
              <div className="flex items-center justify-center gap-4 my-4 md:my-6">
                <span className="h-px w-10 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></span>
                <span className="text-[10px] md:text-[14px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Code 4 Change
                </span>
                <span className="h-px w-10 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-[90px] lg:text-[130px] font-serif font-black text-slate-900 leading-[0.8] tracking-[0.15em] uppercase italic">
                SANKALP
              </h1>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full md:w-auto px-6 md:px-0 mt-3 sm:mt-[120px]">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open("https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755", "_blank")}
                className="w-full md:w-auto bg-slate-900 text-white px-14 py-5 rounded-full text-[11px] md:text-[12px] font-black uppercase tracking-[0.4em] shadow-xl shadow-slate-900/10 transition-all duration-300 focus-visible:ring-4 focus-visible:ring-emerald-500/50"
              >
                Register Now
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02, y: -2, backgroundColor: "rgba(15, 23, 42, 0.03)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto border border-slate-200 text-slate-900 px-14 py-5 rounded-full text-[11px] md:text-[12px] font-black uppercase tracking-[0.4em] transition-all duration-300 focus-visible:ring-4 focus-visible:ring-slate-900/10"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Sponsors Row - AUDIT FIX: No Grayscale */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300">Presented By</span>
            
            <div className="flex items-center gap-14 md:gap-24 px-10 md:px-20 py-6 md:py-10 bg-white/40 backdrop-blur-md border border-slate-100 rounded-full shadow-lg shadow-slate-900/[0.02]">
              {sponsors.map((sponsor) => (
                <motion.div
                  key={sponsor.name}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-3 transition-all duration-500 cursor-pointer"
                >
                  <div className="h-[40px] sm:h-[80px] md:h-[80px]">
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name} 
                      className="h-full w-auto object-contain transition-opacity"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}

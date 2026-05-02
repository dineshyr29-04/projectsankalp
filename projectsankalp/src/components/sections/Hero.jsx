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
      {/* ── Cinematic Introduction Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-white">
        {/* Base Layer: Soft Fluid Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05)_0%,rgba(255,255,255,1)_70%,rgba(37,99,235,0.03)_100%)]" />

        {/* Layer 1: Shifting Light Beams */}
        <motion.div 
          animate={{ 
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] opacity-[0.03] pointer-events-none"
          style={{
            background: "repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(16,185,129,0.5) 100px, rgba(16,185,129,0.5) 200px)"
          }}
        />

        {/* Layer 2: Floating Bokeh Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.2 + 0.1,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: ["-10%", "110%"],
                x: [Math.random() * 100 + "%", (Math.random() * 100 - 10) + "%"],
              }}
              transition={{ 
                duration: Math.random() * 20 + 20, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * -20
              }}
              className="absolute w-24 h-24 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-[40px]"
            />
          ))}
        </div>

        {/* Layer 3: Main Atmospheric Orbs */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[800px] h-[800px] rounded-full bg-emerald-400/10 blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[10%] -right-[10%] w-[900px] h-[900px] rounded-full bg-blue-400/10 blur-[180px]"
        />

        {/* Layer 4: Grain / Noise Overlay (The "Film" Feel) */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        {/* Layer 5: Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.4)_100%)] pointer-events-none" />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-full h-full border-[1px] border-slate-900/[0.02] pointer-events-none m-8 rounded-[40px]" />
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

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
      ref={containerRef}
      className="relative min-h-screen flex flex-col bg-white overflow-hidden pt-5"
    >
      {/* Premium Background System */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/5 via-white to-blue-50/5" />
        
        {/* Soft Animated Glow Blobs */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.2, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-emerald-200/10 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[-10%] w-[700px] h-[700px] bg-blue-200/10 rounded-full blur-[160px]" 
        />
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
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-full px-5 py-2 mb-2 shadow-sm"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
                May 25th, 2026 • ₹1,00,000+ Prize Pool
              </span>
            </motion.div>

            {/* Heading - Wide & Impactful */}
            <div className="flex flex-col items-center w-full">
              <h1 className="text-5xl sm:text-6xl md:text-[90px] lg:text-[110px] font-serif font-black text-slate-900 leading-[0.8] tracking-[0.1em] uppercase">
                PROJECT
              </h1>
              
              {/* Pill Badge - Centered between heading words */}
              <div className="flex items-center justify-center gap-4 my-4 md:my-6">
                <span className="h-px w-10 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></span>
                <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Code 4 Change
                </span>
                <span className="h-px w-10 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-[90px] lg:text-[110px] font-serif font-black text-slate-900 leading-[0.8] tracking-[0.15em] uppercase italic">
                SANKALP
              </h1>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full md:w-auto px-6 md:px-0">
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
                  <div className="h-[40px] sm:h-[50px] md:h-[80px]">
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

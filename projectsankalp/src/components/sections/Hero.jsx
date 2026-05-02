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
      className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden py-12 md:py-20"
    >
      {/* Premium Background System */}
      <div className="absolute inset-0 z-0">
        {/* Extremely Subtle Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/10 via-white to-blue-50/10 opacity-70" />
        
        {/* Soft Animated Glow Blobs */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] left-[-10%] w-[600px] h-[600px] bg-emerald-200/10 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[5%] right-[-10%] w-[700px] h-[700px] bg-blue-200/10 rounded-full blur-[160px]" 
        />
      </div>

      <Container className="relative z-10 w-full px-4 sm:px-6 py-4 max-w-6xl mx-auto flex flex-col items-center justify-center gap-10 md:gap-16">
        {/* Main Content Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center space-y-6 md:space-y-10 w-full text-center"
        >
          {/* Heading - Centered Tagline Strategy */}
          <div className="flex flex-col items-center">
            <h1 className="text-5xl sm:text-6xl md:text-[90px] lg:text-[110px] font-serif font-black text-slate-900 leading-[0.8] tracking-wider uppercase">
              PROJECT
            </h1>
            
            {/* Pill Badge - Centered between heading words */}
            <div className="my-5 md:my-8 bg-white/40 backdrop-blur-md border border-slate-200/50 rounded-full px-8 py-3 shadow-sm inline-block">
              <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] text-slate-500">
                Code 4 Change
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-[90px] lg:text-[110px] font-serif font-black text-slate-900 leading-[0.8] tracking-wider uppercase italic">
              SANKALP
            </h1>
          </div>

          {/* CTA Group - Optimized for Flow */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full md:w-auto px-6 md:px-0">
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open("https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755", "_blank")}
              className="w-full md:w-auto bg-slate-900 text-white px-14 py-5 rounded-full text-[11px] md:text-[12px] font-black uppercase tracking-[0.4em] shadow-xl shadow-slate-900/10 transition-all duration-300"
            >
              Register Now
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, y: -2, backgroundColor: "rgba(15, 23, 42, 0.03)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto border border-slate-200 text-slate-900 px-14 py-5 rounded-full text-[11px] md:text-[12px] font-black uppercase tracking-[0.4em] transition-all duration-300"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Sponsors Row - Refined Glass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="w-full flex flex-col items-center gap-8"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Presented By</span>
          
          <div className="flex items-center gap-16 md:gap-32 px-12 md:px-24 py-8 md:py-12 bg-white/40 backdrop-blur-md border border-slate-100 rounded-full shadow-lg shadow-slate-900/[0.02]">
            {sponsors.map((sponsor) => (
              <motion.div
                key={sponsor.name}
                whileHover={{ scale: 1.1 }}
                className="h-[45px] sm:h-[60px] md:h-[90px] transition-all duration-500 cursor-pointer"
              >
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="h-full w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

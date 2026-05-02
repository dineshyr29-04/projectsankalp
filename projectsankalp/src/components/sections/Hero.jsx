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

  const sponsors = [
    { name: "Yenepoya University", logo: "/ysetlogo.png" },
    { name: "NSS Unit", logo: "/nsslogo.png" },
    
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] md:h-screen flex flex-col items-center justify-center overflow-hidden bg-white pt-32 pb-16"
    >
      {/* Premium Atmospheric Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Soft Tonal Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white to-blue-50/40" />
        
        {/* Animated Glow Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-blue-400/10 rounded-full blur-[150px]" 
        />
        
        {/* Subtle Mesh Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <Container className="relative z-10 text-center flex flex-col items-center gap-12">
        {/* Main Content */}
        <motion.div
          style={{ y: yText, opacity }}
          className="flex flex-col items-center space-y-8 md:space-y-12"
        >
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 group"
          >
            <div className="h-[1px] w-8 md:w-12 bg-primary/20" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-accent">
              Code 4 Change
            </span>
            <div className="h-[1px] w-8 md:w-12 bg-primary/20" />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2"
          >
            <h1 className="text-6xl md:text-[100px] lg:text-[140px] font-serif font-black text-primary leading-[0.85] tracking-tight">
              PROJECT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-primary to-blue-500 italic">SANKALP.</span>
            </h1>
          </motion.div>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button 
              onClick={() => window.open("https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755", "_blank")}
              className="bg-primary text-white px-10 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.3em] hover:bg-primary/95 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
            >
              Register Now
            </button>
            <button 
              className="px-10 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.3em] text-primary/60 hover:text-primary transition-all group flex items-center gap-2"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>

        {/* Sponsors Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="w-full max-w-5xl"
        >
          <div className="flex flex-col items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/30">Presented By</span>
            
            <div className="w-full p-6 md:p-10 bg-white/40 backdrop-blur-md border border-white/50 rounded-[32px] md:rounded-full shadow-xl shadow-black/5 flex items-center justify-center gap-12 md:gap-24">
              {sponsors.map((sponsor) => (
                <motion.div
                  key={sponsor.name}
                  whileHover={{ scale: 1.1 }}
                  className="h-10 md:h-16 w-auto transition-all duration-500 cursor-pointer"
                >
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name} 
                    className="h-full w-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

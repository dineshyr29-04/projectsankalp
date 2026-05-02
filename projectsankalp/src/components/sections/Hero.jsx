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
      className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden pt-24 md:pt-32 pb-12"
    >
      {/* Background System - Very soft green-white-blue */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 via-white to-blue-50/20" />
        
        {/* Glow Blobs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-emerald-300/10 rounded-full blur-[100px]" 
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-blue-300/10 rounded-full blur-[120px]" 
        />
      </div>

      <Container className="relative z-10 w-full px-5 py-10 max-w-md md:max-w-4xl mx-auto flex flex-col items-center gap-12 md:gap-20">
        {/* Main Content Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center space-y-8 md:space-y-12 w-full text-center"
        >
          {/* Pill Badge */}
          <div className="bg-white/50 backdrop-blur-md border border-white/40 rounded-full px-6 py-2 shadow-sm inline-block">
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-primary/70">
              Code 4 Change
            </span>
          </div>

          {/* Heading - Split Two Lines */}
          <div className="space-y-1 md:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-serif font-black text-primary leading-[0.8] tracking-wider uppercase">
              PROJECT
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-serif font-black text-primary leading-[0.8] tracking-wider uppercase italic">
              SANKALP
            </h1>
          </div>

          {/* CTA Group */}
          <div className="flex flex-col md:flex-row items-center gap-5 w-full md:w-auto px-4 md:px-0">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={() => window.open("https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755", "_blank")}
              className="w-full md:w-auto bg-black text-white px-12 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-black/10 transition-all"
            >
              Register Now
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-auto border border-primary/20 text-primary px-12 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.4em] transition-all"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Sponsors - Centered Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="w-full flex flex-col items-center gap-6"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/30">Presented By</span>
          
          <div className="flex items-center gap-12 md:gap-24 px-10 md:px-16 py-6 md:py-8 bg-white/40 backdrop-blur-md border border-white/50 rounded-full shadow-lg shadow-black/[0.02]">
            {sponsors.map((sponsor) => (
              <motion.div
                key={sponsor.name}
                whileHover={{ scale: 1.2 }}
                className="h-[50px] sm:h-[60px] md:h-[80px] transition-all duration-500 cursor-pointer"
              >
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="h-full w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

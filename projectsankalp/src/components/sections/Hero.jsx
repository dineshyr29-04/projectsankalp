import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const sparks = Array(6).fill(null);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent pt-32 md:pt-40"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Green Gradient Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -ml-48 -mb-48" />
        
        {/* Subtle Radial Glow behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px]" />

        {/* Bottom Grid Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] grid-pattern opacity-[0.03]" />

        {/* Spark Icons */}
        {sparks.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-accent rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          style={{ y: yText, opacity, scale }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="px-5 py-2 rounded-full bg-accent/10 text-accent text-[11px] font-black uppercase tracking-[0.4em] mb-12 border border-accent/20"
          >
            2026 Hackathon Edition
          </motion.span>

          {/* Headline - Redesigned with layered modern style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mb-10"
          >
            <h1 className="text-7xl md:text-[140px] lg:text-[180px] leading-[0.8] font-serif font-black text-primary tracking-tighter uppercase">
              PROJECT
            </h1>
            <h1 className="text-7xl md:text-[140px] lg:text-[180px] leading-[0.8] font-serif font-black tracking-tighter uppercase text-stroke mt-2">
              SANKALP
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[11px] md:text-[13px] text-text-secondary uppercase tracking-[0.8em] font-black mb-12 opacity-80"
          >
            CODE FOR CHANGE
          </motion.p>

          {/* Supporting Line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-sm md:text-lg text-text-secondary max-w-2xl mx-auto mb-16 leading-relaxed font-medium"
          >
            Building the next generation of solutions for a sustainable world.
          </motion.p>

          {/* Primary CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-accent/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <button className="relative bg-primary text-white px-14 py-6 rounded-full text-[13px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/30">
              Register Now
            </button>
          </motion.div>
        </motion.div>
      </Container>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary">Scroll Down</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}

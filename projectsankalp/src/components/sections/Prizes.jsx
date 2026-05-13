import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";

// --- PURE CSS CONFETTI ---
const Confetti = ({ active }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (active) {
      const colors = ['#FBBF24', '#FCD34D', '#FFFBEB', '#F59E0B', '#F43F5E', '#60A5FA'];
      const newParticles = Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 100, // -50vw to 50vw spread
        y: -50 - Math.random() * 50, // shoots up 50-100vh
        rotation: Math.random() * 720,
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: Math.random() * 0.6 + 0.4,
        duration: Math.random() * 1 + 1.5,
        delay: Math.random() * 0.1
      }));
      setParticles(newParticles);
      
      const timer = setTimeout(() => setParticles([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!active && particles.length === 0) return null;

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: p.scale }}
          animate={{ 
            x: `${p.x}vw`, 
            y: `${p.y}vh`, 
            rotate: p.rotation,
            opacity: [1, 1, 0] 
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
          className="absolute w-3 h-3 rounded-sm shadow-sm"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
};

// --- LUXURY PRIZE CARD ---
const PrizeCard = ({ prize, index, isCenter, onTopPrizeClick }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const multiplier = 15; // Max rotation angle
    setTilt({
      x: -(y / (rect.height / 2)) * multiplier,
      y: (x / (rect.width / 2)) * multiplier
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  // Luxury dark theme mapping
  const themes = {
    Gold: { 
      accent: "text-amber-300", 
      border: "border-amber-400/30", 
      bg: "bg-amber-500/10",
      halo: "shadow-[0_0_60px_rgba(251,191,36,0.15)]",
      icon: "🏆",
      subtitle: "The Ultimate Champion"
    },
    Silver: { 
      accent: "text-slate-300", 
      border: "border-slate-400/30", 
      bg: "bg-slate-400/10",
      halo: "shadow-[0_0_40px_rgba(148,163,184,0.1)]",
      icon: "🥈",
      subtitle: "First Runner-Up"
    },
    Bronze: { 
      accent: "text-rose-300", 
      border: "border-rose-400/30", 
      bg: "bg-rose-500/10",
      halo: "shadow-[0_0_40px_rgba(251,113,133,0.1)]",
      icon: "🥉",
      subtitle: "Second Runner-Up"
    }
  };

  const t = themes[prize.material] || themes.Gold;
  
  const handleClick = () => {
    if (prize.material === "Gold" && onTopPrizeClick) {
      onTopPrizeClick();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`relative w-full max-w-[340px] md:w-[320px] mx-auto cursor-pointer perspective-1000 flex-shrink-0 ${isCenter ? 'z-20 md:-mt-12' : 'z-10'}`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          y: isCenter && !isHovered ? [0, -10, 0] : 0,
        }}
        transition={{
          rotateX: { type: "spring", stiffness: 300, damping: 30, mass: 0.5 },
          rotateY: { type: "spring", stiffness: 300, damping: 30, mass: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className={`w-full p-8 md:p-10 rounded-[2rem] backdrop-blur-xl border ${t.border} ${t.bg} ${t.halo} flex flex-col items-center text-center relative overflow-hidden`}
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)`
        }}
      >
        {/* Subtle inner reflection */}
        <div className="absolute inset-0 rounded-[2rem] border-[1px] border-white/10 pointer-events-none mix-blend-overlay" />
        
        {/* Glare effect on hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 pointer-events-none transition-opacity duration-300 rounded-[2rem]"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        <div className="text-6xl mb-6 transform -translate-y-2 drop-shadow-2xl">
          {t.icon}
        </div>

        <div className="space-y-2 mb-8">
          <span className={`inline-block px-4 py-1.5 rounded-full border ${t.border} bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/80`}>
            {prize.rank}
          </span>
          <h3 className={`text-3xl font-serif font-black ${t.accent} pt-4`}>
            {prize.material}
          </h3>
          <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest pt-2">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-auto relative w-full pt-8 border-t border-white/10">
          {/* Glowing text effect */}
          <div className="text-4xl md:text-5xl font-serif font-black text-white tracking-tighter" style={{ textShadow: '0 4px 20px rgba(255,255,255,0.2)' }}>
            {prize.amount}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Prizes() {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleTopPrizeClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Matches particle timeout
  };

  // Logically sort prizes: Silver, Gold, Bronze
  const orderedPrizes = [
    { ...siteConfig.prizes[1], material: "Silver" },
    { ...siteConfig.prizes[0], material: "Gold" },
    { ...siteConfig.prizes[2], material: "Bronze" }
  ];

  return (
    <Section id="prizes" className="relative bg-[#0B1021] py-24 md:py-40 overflow-hidden text-white">
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
      
      <Confetti active={showConfetti} />
      
      {/* Dark Luxury Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Gold glow top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[120px] rounded-full" />
        {/* Blue/Navy glow bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[600px] bg-blue-900/10 blur-[150px]" />
      </div>

      <Container className="relative z-10 px-4 sm:px-10 lg:px-20 mx-auto flex flex-col items-center">
        <header className="text-center mb-24 md:mb-32 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50"></span>
            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-amber-400">Glory Awaits</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50"></span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-black tracking-tighter leading-[1.1]"
          >
            Claim Your <br className="hidden md:block" />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">Legacy.</span>
          </motion.h2>
        </header>

        {/* Prize Cards Row */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-10 md:gap-6 lg:gap-10 mx-auto w-full max-w-5xl">
          {orderedPrizes.map((prize, index) => (
            <PrizeCard 
              key={prize.rank} 
              prize={prize} 
              index={index} 
              isCenter={index === 1} 
              onTopPrizeClick={index === 1 ? handleTopPrizeClick : undefined}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24"
        >
          <button className="relative group overflow-hidden rounded-full p-[2px]">
            <span className="absolute inset-0 bg-gradient-to-r from-amber-300 via-amber-600 to-amber-300 opacity-70 group-hover:opacity-100 animate-[spin_3s_linear_infinite]" />
            <div className="relative px-10 py-4 bg-[#0B1021] rounded-full backdrop-blur-md transition-all duration-300 group-hover:bg-[#0B1021]/80 overflow-hidden">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
                Join Now — Win Big
              </span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            </div>
          </button>
        </motion.div>
      </Container>
    </Section>
  );
}

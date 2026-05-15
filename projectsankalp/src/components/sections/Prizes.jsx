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
      const colors = [
        "#FBBF24",
        "#FCD34D",
        "#3B82F6",
        "#10B981",
        "#F43F5E",
        "#8B5CF6",
      ];
      const newParticles = Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 100, // -50vw to 50vw spread
        y: -50 - Math.random() * 50, // shoots up 50-100vh
        rotation: Math.random() * 720,
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: Math.random() * 0.6 + 0.4,
        duration: Math.random() * 1 + 1.5,
        delay: Math.random() * 0.1,
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
            opacity: [1, 1, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
          className="absolute w-3 h-3 rounded-sm shadow-sm"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
};

// --- LUXURY PRIZE CARD (HEIGHT TIERS) ---
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
      y: (x / (rect.width / 2)) * multiplier,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  // Height and theme mapping
  const themes = {
    Gold: {
      accent: "text-amber-600",
      border: "border-amber-300",
      bg: "bg-gradient-to-br from-amber-50 to-white",
      halo: "shadow-[0_20px_60px_-15px_rgba(251,191,36,0.4)]",
      subtitle: "The Ultimate Champion",
      height: "md:h-[480px] h-[320px]",
    },
    Silver: {
      accent: "text-slate-500",
      border: "border-slate-300",
      bg: "bg-gradient-to-br from-slate-100 to-white",
      halo: "shadow-[0_20px_50px_-15px_rgba(148,163,184,0.3)]",
      subtitle: "First Runner-Up",
      height: "md:h-[420px] h-[280px]",
    },
    Bronze: {
      accent: "text-orange-600",
      border: "border-orange-300",
      bg: "bg-gradient-to-br from-orange-50 to-white",
      halo: "shadow-[0_20px_50px_-15px_rgba(249,115,22,0.3)]",
      subtitle: "Second Runner-Up",
      height: "md:h-[360px] h-[240px]",
    },
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
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`relative w-[110px] sm:w-[160px] md:w-[280px] lg:w-[320px] mx-auto cursor-pointer perspective-1000 flex-shrink-0 ${isCenter ? "z-20 md:-mt-12" : "z-10"}`}
      style={{
        transformStyle: "preserve-3d",
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
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className={`w-full ${t.height} p-3 sm:p-5 md:p-10 rounded-2xl md:rounded-[2rem] border ${t.border} ${t.bg} ${t.halo} flex flex-col items-center text-center relative overflow-hidden transition-all duration-500`}
      >
        {/* Subtle inner reflection */}
        <div className="absolute inset-0 rounded-2xl md:rounded-[2rem] border-[1px] border-white pointer-events-none" />

        {/* Glare effect on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/60 to-white/0 opacity-0 pointer-events-none transition-opacity duration-300 rounded-2xl md:rounded-[2rem]"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        <div className="space-y-1 md:space-y-2 mb-4 md:mb-12 mt-2 md:mt-4">
          <span
            className={`inline-block px-2 md:px-4 py-0.5 md:py-1.5 rounded-full border ${t.border} bg-white/80 text-[7px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-slate-700 shadow-sm`}
          >
            {prize.rank}
          </span>
          <h3
            className={`text-sm sm:text-lg md:text-4xl font-serif font-black ${t.accent} pt-1 md:pt-6`}
          >
            {prize.material}
          </h3>
          <p className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-auto relative w-full pt-2 md:pt-8 border-t border-slate-200/50">
          <div className="text-xs sm:text-base md:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tighter">
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
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Logically sort prizes: Silver, Gold, Bronze
  const orderedPrizes = [
    { ...siteConfig.prizes[1], material: "Silver" },
    { ...siteConfig.prizes[0], material: "Gold" },
    { ...siteConfig.prizes[2], material: "Bronze" },
  ];

  return (
    <Section
      id="prizes"
      className="relative bg-slate-50 py-16 md:py-40 overflow-hidden"
    >
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

      <Confetti active={showConfetti} />

      {/* Light Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(59,130,246,0.02)_0%,transparent_70%)]" />
      </div>

      <Container className="relative z-10 px-2 sm:px-10 lg:px-20 mx-auto flex flex-col items-center">
        <header className="text-center mb-12 md:mb-32 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 mb-4 md:mb-8"
          >
            <span className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-blue-500"></span>
            <span className="text-[9px] md:text-[12px] font-black uppercase tracking-[0.4em] text-blue-600">
              Rewards
            </span>
            <span className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-blue-500"></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl lg:text-8xl font-serif font-black tracking-tighter leading-[1.1] text-slate-900"
          >
            Claim Your <br className="hidden md:block" />
            <span className="italic text-blue-600 pr-5">Legacy.</span>
          </motion.h2>
        </header>

        {/* Prize Cards Row - Compact and horizontal on all screens */}
        <div className="flex flex-row justify-center items-end gap-2 sm:gap-6 lg:gap-10 mx-auto w-full max-w-5xl">
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
          className="mt-16 md:mt-24"
        >
          <button
            onClick={() =>
              window.open(
                "https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755",
                "_blank",
                "noopener,noreferrer",
              )
            }
            className="relative group overflow-hidden rounded-full p-[2px] cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square animate-[spin_3s_linear_infinite] bg-gradient-to-r from-blue-300 via-blue-600 to-blue-300 opacity-70 group-hover:opacity-100" />
            <div className="relative h-full w-full px-6 md:px-10 py-3 md:py-4 bg-white rounded-full transition-colors duration-300 group-hover:bg-blue-600 overflow-hidden shadow-lg flex items-center justify-center">
              <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-blue-600 transition-colors duration-300 group-hover:text-white">
                Join Now — Win Big
              </span>
            </div>
          </button>
        </motion.div>
      </Container>
    </Section>
  );
}

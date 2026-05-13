import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Section from "../core/Section";
import { siteConfig } from "../../config/site";

// ─────────────────────────────────────────────────────────
// ASCENSION CHAMBER: Ultra-Premium Spatial Prize System
// ─────────────────────────────────────────────────────────

// Monolithic 3D Prize Object
const PrizeMonolith = ({ prize, tier, index, scrollProgress }) => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(false);

  // Tier configurations with spatial and material properties
  const tiers = {
    first: {
      height: "h-[500px] md:h-[600px]",
      scale: 1,
      material: "Gold",
      color: "from-yellow-100 via-amber-300 to-yellow-500",
      metallic: "rgba(212, 175, 55, 0.4)",
      glow: "shadow-[0_0_120px_rgba(251,191,36,0.25)]",
      rotation: 2,
      depth: "origin-center",
      iconic: "✦",
      rank: "FIRST ASCENSION",
    },
    second: {
      height: "h-[420px] md:h-[520px]",
      scale: 0.92,
      material: "Silver",
      color: "from-zinc-50 via-slate-200 to-slate-300",
      metallic: "rgba(148, 163, 184, 0.3)",
      glow: "shadow-[0_0_100px_rgba(203,213,225,0.2)]",
      rotation: -1,
      depth: "origin-center",
      iconic: "◆",
      rank: "SECOND RISE",
    },
    third: {
      height: "h-[360px] md:h-[440px]",
      scale: 0.85,
      material: "Bronze",
      color: "from-orange-100 via-amber-200 to-orange-400",
      metallic: "rgba(186, 85, 59, 0.35)",
      glow: "shadow-[0_0_80px_rgba(217,119,6,0.2)]",
      rotation: 1.5,
      depth: "origin-center",
      iconic: "◇",
      rank: "THIRD FOUNDATION",
    },
  };

  const config = tiers[tier];

  // Parallax effect on scroll
  const parallaxOffset = scrollProgress * (tier === "first" ? -40 : tier === "second" ? -20 : -10);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: false, margin: "-20%" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-sm mx-auto py-16 md:py-20 px-4"
      style={{
        perspective: "1200px",
      }}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* MONOLITH OBJECT: Brutalist Metal Form */}
        <motion.div
          className={`relative w-32 md:w-40 ${config.height} rounded-sm overflow-hidden group`}
          style={{
            background: `linear-gradient(135deg, ${config.color})`,
            rotateY: mousePosition.x,
            rotateX: mousePosition.y,
            rotateZ: config.rotation,
            perspective: "1000px",
          }}
          transition={{
            rotateX: { type: "spring", stiffness: 200, damping: 20 },
            rotateY: { type: "spring", stiffness: 200, damping: 20 },
          }}
        >
          {/* Multi-layer material depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent opacity-40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent opacity-30 pointer-events-none" />

          {/* Edge highlight for metallic edge */}
          <div className="absolute inset-0 border-l-2 border-t-2 border-white/40 rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 border-r-2 border-b-2 border-black/30 rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Inner engraved surface */}
          <div className="absolute inset-4 border-[1px] border-white/20 rounded-[2px] pointer-events-none" />

          {/* Volumetric glow interior */}
          <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" />

          {/* Subtle shadow base */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/30 blur-lg rounded-full" />

          {/* Centered iconic symbol */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={isInView ? { opacity: [0.6, 0.9, 0.6] } : {}}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-3xl md:text-4xl text-white/80 font-light"
            >
              {config.iconic}
            </motion.div>
          </div>
        </motion.div>

        {/* ATMOSPHERIC GLOW HALO */}
        <motion.div
          className={`absolute -inset-12 md:-inset-16 pointer-events-none blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          style={{
            background: `radial-gradient(circle, ${config.metallic}, transparent)`,
            mixBlendMode: "screen",
          }}
        />

        {/* ENGRAVED TYPE LABEL: Monumental amount */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
          animate={isInView ? { y: [0, -4, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
        >
          <div className="text-xs md:text-sm uppercase font-light letter-tracking-[0.15em] text-white/50 mb-3">
            {config.rank}
          </div>
          <div className="text-4xl md:text-5xl font-serif font-thin text-white tracking-tighter mb-1" style={{ fontVariantNumeric: "lining-nums tabular-nums" }}>
            {prize.amount}
          </div>
          <div className="h-px w-12 mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent mt-4" />
        </motion.div>

        {/* MATERIAL NAME: Minimal metadata */}
        <div className="mt-6 text-[11px] md:text-xs uppercase tracking-widest text-white/40 font-medium">
          {config.material}
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────

export default function Prizes() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll position for parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const prizes = [
    { ...siteConfig.prizes[0], index: 0 },
    { ...siteConfig.prizes[1], index: 1 },
    { ...siteConfig.prizes[2], index: 2 },
  ];

  return (
    <Section
      id="prizes"
      ref={containerRef}
      className="relative bg-white overflow-hidden text-slate-900"
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        
        @keyframes drift {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(8px); }
        }

        .bg-radial-gradient {
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, transparent 70%);
        }
      `}</style>

      {/* ATMOSPHERIC ENVIRONMENTAL LIGHTING */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top warm glow */}
        <motion.div
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 md:w-[600px] h-96 bg-amber-300/10 blur-[150px] rounded-full"
        />
        {/* Bottom cool glow */}
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-40 right-0 w-96 md:w-[600px] h-96 bg-slate-300/8 blur-[150px] rounded-full"
        />
        {/* Left accent */}
        <motion.div
          animate={{ opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
          className="absolute top-1/3 -left-32 w-64 md:w-96 h-64 bg-slate-400/5 blur-[120px] rounded-full"
        />
      </div>

      {/* ASCENSION CHAMBER HEADER */}
      <div className="relative z-10 pt-16 md:pt-24 px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-slate-500 font-light">
            The Ascension Chamber
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-thin text-slate-900 leading-tight tracking-tight">
            Gateways into the
            <br />
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 italic font-extralight"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Future
            </motion.span>
          </h2>
          <p className="text-sm md:text-base text-slate-600 font-light max-w-2xl mx-auto mt-8 leading-relaxed">
            Not prizes. Monuments to innovation. Spatial objects floating in achievement.
          </p>
        </motion.div>
      </div>

      {/* HORIZONTAL MONOLITH CHAMBER - Desktop & Mobile */}
      <div className="relative z-20 py-8 md:py-16 px-4 md:px-8">
        {/* Desktop: Horizontal Row */}
        <div className="hidden md:flex justify-center items-end gap-6 lg:gap-12 flex-wrap">
          {/* First Place - Tallest, most majestic */}
          <PrizeMonolith prize={prizes[0]} tier="first" index={0} scrollProgress={scrollProgress} />

          {/* Second Place - Supporting height */}
          <PrizeMonolith prize={prizes[1]} tier="second" index={1} scrollProgress={scrollProgress} />

          {/* Third Place - Foundation anchor */}
          <PrizeMonolith prize={prizes[2]} tier="third" index={2} scrollProgress={scrollProgress} />
        </div>

        {/* Mobile: Horizontal Scroll Carousel */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-6 min-w-max">
            {/* First Place */}
            <div className="flex-shrink-0 w-72">
              <PrizeMonolith prize={prizes[0]} tier="first" index={0} scrollProgress={scrollProgress} />
            </div>

            {/* Second Place */}
            <div className="flex-shrink-0 w-72">
              <PrizeMonolith prize={prizes[1]} tier="second" index={1} scrollProgress={scrollProgress} />
            </div>

            {/* Third Place */}
            <div className="flex-shrink-0 w-72">
              <PrizeMonolith prize={prizes[2]} tier="third" index={2} scrollProgress={scrollProgress} />
            </div>
          </div>
        </div>
      </div>

      {/* PREMIUM FOOTER CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 pb-20 md:pb-28 pt-12 md:pt-16 text-center"
      >
        <button className="group relative inline-block">
          {/* Outer glow halo */}
          <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -inset-1" />

          {/* Button body */}
          <div className="relative px-8 md:px-12 py-3 md:py-4 rounded-full border border-slate-300 bg-slate-50 backdrop-blur-md transition-all duration-500 group-hover:bg-slate-100 group-hover:border-slate-400">
            <span className="text-xs md:text-sm uppercase tracking-[0.2em] font-light text-slate-700 group-hover:text-slate-900 transition-colors">
              Begin Your Ascension
            </span>
          </div>
        </button>

        {/* Subtle metadata */}
        <div className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 mt-8 font-light">
          For builders. For creators. For the future.
        </div>
      </motion.div>

      {/* BOTTOM AMBIENT FADE */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-5" />
    </Section>
  );
}

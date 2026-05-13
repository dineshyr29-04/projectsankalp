import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";

// ── LIQUID GLASS FILTER ──
const GlassFilter = () => (
  <svg className="hidden">
    <defs>
      <filter id="prize-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="1" result="turbulence" />
        <feGaussianBlur in="turbulence" stdDeviation="3" result="blurredNoise" />
        <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="15" xChannelSelector="R" yChannelSelector="B" result="displaced" />
        <feGaussianBlur in="displaced" stdDeviation="1" result="finalBlur" />
        <feComposite in="finalBlur" in2="finalBlur" operator="over" />
      </filter>
    </defs>
  </svg>
);

// ── COUNT UP ANIMATION ──
const CountUpAmount = ({ amountStr, inView }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(amountStr.replace(/[^0-9]/g, ""));
  const prefix = amountStr.replace(/[0-9,].*/, "");

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }
    
    let start = 0;
    const duration = 1500; // ms
    const increment = numericValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, numericValue]);

  return (
    <span className="tabular-nums">
      {prefix}{count.toLocaleString("en-IN")}
    </span>
  );
};

// ── 3D GLASS CARD COMPONENT ──
const PrizeCard = ({ prize, index, isCenter }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-10%" });
  
  // 3D Magnetic Hover State
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);
  
  // Glare effect
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [100, -100]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [100, -100]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Color mappings
  const colors = {
    Gold: { base: "from-amber-200 to-yellow-600", border: "border-yellow-400/30", glow: "shadow-yellow-500/20", text: "text-amber-500" },
    Silver: { base: "from-slate-200 to-slate-500", border: "border-slate-300/30", glow: "shadow-slate-400/20", text: "text-slate-500" },
    Bronze: { base: "from-orange-200 to-amber-700", border: "border-orange-400/30", glow: "shadow-orange-500/20", text: "text-orange-600" }
  };
  const theme = colors[prize.material] || colors.Gold;

  // Deck deal animation parameters
  const getInitialX = () => {
    if (index === 0) return 100; // Right card comes from center
    if (index === 2) return -100; // Left card comes from center
    return 0; // Center card stays center
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: getInitialX(), y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, x: 0, y: isCenter ? 0 : 20, scale: isCenter ? 1.15 : 0.9 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ type: "spring", bounce: 0.4, duration: 1.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, zIndex: isCenter ? 10 : 5 }}
      className={`relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] cursor-pointer group perspective-1000 mx-auto md:mx-0 flex-shrink-0`}
    >
      {/* Dynamic Ground Shadow */}
      <motion.div 
        className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-8 blur-2xl rounded-full transition-opacity duration-500 ${theme.glow} opacity-0 group-hover:opacity-100`}
      />

      {/* Glass Body - Perfect Sphere */}
      <div className={`relative w-full h-full rounded-full overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-3xl group-hover:${theme.glow} border ${theme.border} bg-white/10 backdrop-blur-xl isolate`}>
        
        {/* SVG Liquid Distortion */}
        <div 
          className="absolute inset-0 -z-10 mix-blend-overlay opacity-50"
          style={{ backdropFilter: 'url("#prize-glass")' }}
        />

        {/* Diagonal Light Sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 group-hover:animate-sweep pointer-events-none" />

        {/* Mouse Tracking Glare - Circular */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-full"
          style={{ x: glareX, y: glareY }}
        />

        {/* Spherical Inner Shadow for 3D Volume */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_-20px_40px_rgba(0,0,0,0.05),inset_0_10px_20px_rgba(255,255,255,0.8)] pointer-events-none" />

        {/* Content - Centered for Orb */}
        <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center gap-4">
          <div className="space-y-2 mt-4">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/40 bg-white/30 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.3em] text-slate-800 shadow-sm">
              {prize.rank}
            </span>
            <h3 className={`text-xl md:text-2xl font-serif font-black ${theme.text} italic pt-1`}>
              {prize.material}
            </h3>
          </div>

          <div className="text-center relative">
            {/* Ambient inner glow behind number */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-24 blur-3xl opacity-30 bg-gradient-to-r ${theme.base} -z-10`} />
            
            <motion.div 
              className="text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tighter"
              style={{ translateZ: 50 }} // Creates depth effect
            >
              <CountUpAmount amountStr={prize.amount} inView={isInView} />
            </motion.div>
          </div>
        </div>
        
        {/* Intricate Border Highlight */}
        <div className="absolute inset-0 rounded-full border-[3px] border-white/20 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom right, black, transparent)' }} />
      </div>
    </motion.div>
  );
};

export default function Prizes() {
  const containerRef = useRef(null);
  
  // Reorder so Gold (index 0) is physically in the middle of the array mapping, 
  // but logically let's map them as Silver, Gold, Bronze for UI layout
  const orderedPrizes = [
    { ...siteConfig.prizes[1], material: "Silver" },
    { ...siteConfig.prizes[0], material: "Gold" },
    { ...siteConfig.prizes[2], material: "Bronze" }
  ];

  return (
    <Section id="prizes" className="relative bg-slate-50 py-24 md:py-40 overflow-hidden" ref={containerRef}>
      <GlassFilter />
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(59,130,246,0.03)_0%,transparent_70%)]" />
      </div>

      <Container className="relative z-10 px-4 sm:px-10 lg:px-20 mx-auto">
        <header className="text-center mb-24 md:mb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 mb-6"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500"></span>
            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-600">Rewards</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500"></span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-slate-900 tracking-tighter leading-[0.9]"
          >
            The Future, <br className="hidden md:block" />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Engraved.</span>
          </motion.h2>
        </header>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 md:gap-4 lg:gap-8 mx-auto perspective-1000">
          {orderedPrizes.map((prize, index) => (
            <PrizeCard 
              key={prize.rank} 
              prize={prize} 
              index={index} 
              isCenter={index === 1} 
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

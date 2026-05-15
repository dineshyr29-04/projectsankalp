import { useState, useEffect, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ChevronLeft } from "lucide-react";
import Container from "../core/Container";

// ── LIQUID GLASS FILTER ──
const GlassFilter = () => (
  <svg className="hidden">
    <defs>
      <filter id="timer-glass-distortion" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
        <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
        <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="50" xChannelSelector="R" yChannelSelector="B" result="displaced" />
        <feGaussianBlur in="displaced" stdDeviation="2" result="finalBlur" />
        <feComposite in="finalBlur" in2="finalBlur" operator="over" />
      </filter>
    </defs>
  </svg>
);

// ── ROLLING DIGIT ──
const RollingDigit = memo(({ digit }) => {
  const prevDigit = useRef(digit);
  const hasChanged = prevDigit.current !== digit;

  useEffect(() => {
    prevDigit.current = digit;
  }, [digit]);

  return (
    <div className="relative h-[20vh] w-[10vw] min-w-[80px] overflow-hidden flex justify-center items-center mx-1">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={hasChanged ? { y: "100%", opacity: 0 } : false}
          animate={{ y: "0%", opacity: 1 }}
          exit={hasChanged ? { y: "-100%", opacity: 0 } : false}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute text-[15vw] font-serif font-black leading-none text-white tabular-nums tracking-[-0.05em]"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
});

const TimeUnit = ({ value, label }) => {
  const digits = value.toString().padStart(2, "0").split("");
  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {digits.map((d, i) => (
          <RollingDigit key={i} digit={d} />
        ))}
      </div>
      <span className="mt-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
        {label}
      </span>
    </div>
  );
};

export default function TimerPage({ onBack }) {
  const [isActive, setIsActive] = useState(false);
  const [targetDate, setTargetDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleStart = () => {
    const twentyFourHours = Date.now() + 24 * 60 * 60 * 1000;
    setTargetDate(twentyFourHours);
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTargetDate(null);
    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  };

  useEffect(() => {
    if (!isActive || !targetDate) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setIsActive(false);
        setTargetDate(null);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, targetDate]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex flex-col">
      <GlassFilter />

      {/* Header Info */}
      <div className="relative z-20 p-8 flex justify-between items-start">
        <button 
          onClick={onBack}
          className="group flex items-center gap-4 text-white/40 hover:text-white transition-all"
        >
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ChevronLeft size={20} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Abort Mission</span>
        </button>

        <div className="text-right">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 block mb-2">System Status</span>
          <span className="text-2xl font-serif font-black italic tracking-tighter uppercase">
            {isActive ? "Mission Active" : "System Standby"}
          </span>
        </div>
      </div>

      {/* Main Timer Display */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex items-center justify-center gap-4 md:gap-8 lg:gap-12"
          style={{ filter: 'url("#timer-glass-distortion")' }}
        >
          <TimeUnit value={timeLeft.days} label="Days" />
          <div className="h-[10vh] w-px bg-white/10 mt-[-4vh]" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <div className="h-[10vh] w-px bg-white/10 mt-[-4vh]" />
          <TimeUnit value={timeLeft.minutes} label="Min" />
          <div className="h-[10vh] w-px bg-white/10 mt-[-4vh]" />
          <TimeUnit value={timeLeft.seconds} label="Sec" />
        </motion.div>

        {/* Controls */}
        <div className="mt-20 flex flex-col items-center gap-8">
          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.button
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={handleStart}
                className="group relative px-20 py-8 bg-white text-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <div className="relative z-10 flex items-center gap-4">
                  <Play size={24} fill="black" />
                  <span className="text-sm font-black uppercase tracking-[0.5em]">Start Mission</span>
                </div>
                <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.button>
            ) : (
              <motion.button
                key="reset"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={handleReset}
                className="group flex items-center gap-4 text-white/40 hover:text-white transition-all"
              >
                <RotateCcw size={20} className="group-hover:rotate-180 transition-all duration-700" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Reset Console</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      </div>
    </div>
  );
}

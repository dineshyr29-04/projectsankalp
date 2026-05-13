import { useState, useEffect, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

// ── LIQUID GLASS FILTER ──
const GlassFilter = () => (
  <svg className="hidden">
    <defs>
      <filter id="hero-glass-liquid" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
        <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
        <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="30" xChannelSelector="R" yChannelSelector="B" result="displaced" />
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
    <div className="relative h-14 w-8 md:h-16 md:w-10 overflow-hidden flex justify-center items-center bg-white/10 rounded-xl border border-white/20 mx-[2px] shadow-sm">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={hasChanged ? { y: "100%", opacity: 0 } : false}
          animate={{ y: "0%", opacity: 1 }}
          exit={hasChanged ? { y: "-100%", opacity: 0 } : false}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute text-3xl md:text-5xl font-serif font-black text-slate-900 tabular-nums"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
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
      <span className="mt-4 text-[9px] font-black uppercase tracking-[0.4em] text-slate-500/80">
        {label}
      </span>
    </div>
  );
};

export default function HeroTimer() {
  const [targetDate, setTargetDate] = useState(new Date("2026-05-15T23:59:59+05:30"));
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, "settings", "timer"), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.targetTimestamp) setTargetDate(data.targetTimestamp.toDate());
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      } else {
        setTimeLeft({
          days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"),
          hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
          minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
          seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0"),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <GlassFilter />
      
      {/* Liquid Glass Background Pill */}
      <div 
        className="absolute inset-0 z-0 rounded-[48px] shadow-[0_10px_40px_rgba(0,0,0,0.04),inset_2px_2px_2px_rgba(255,255,255,0.5),inset_-2px_-2px_2px_rgba(0,0,0,0.05)]"
        style={{ 
          backdropFilter: 'url("#hero-glass-liquid")',
          background: 'rgba(255,255,255,0.15)'
        }}
      />
      
      <div className="relative z-10 px-8 md:px-16 py-6 md:py-8 flex items-center justify-center gap-6 md:gap-14">
        <TimeUnit value={timeLeft.days} label="Days" />
        <div className="h-10 w-px bg-slate-900/10 hidden md:block" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <div className="h-10 w-px bg-slate-900/10 hidden md:block" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <div className="h-10 w-px bg-slate-900/10 hidden md:block" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </motion.div>
  );
}

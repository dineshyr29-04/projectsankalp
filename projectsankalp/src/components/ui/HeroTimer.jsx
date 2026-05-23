import { useState, useEffect, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

// ── LIQUID GLASS FILTER ──
const GlassFilter = () => (
  <svg className="hidden">
    <defs>
      <filter
        id="hero-glass-liquid"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.05 0.05"
          numOctaves="1"
          seed="1"
          result="turbulence"
        />
        <feGaussianBlur
          in="turbulence"
          stdDeviation="2"
          result="blurredNoise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="blurredNoise"
          scale="30"
          xChannelSelector="R"
          yChannelSelector="B"
          result="displaced"
        />
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

  const isZero = String(digit) === "0";

  return (
    <div className="relative h-10 w-6 sm:h-12 sm:w-7 md:h-16 md:w-10 overflow-hidden flex justify-center items-center mx-1 md:mx-[2px]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={hasChanged ? { y: "100%", opacity: 0 } : false}
          animate={{ y: "0%", opacity: 1 }}
          exit={hasChanged ? { y: "-100%", opacity: 0 } : false}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute text-xl sm:text-2xl md:text-5xl font-serif font-black transition-all duration-300 ${
            isZero ? "text-slate-500/40 opacity-40 scale-90" : "text-slate-900"
          }`}
          style={isZero ? { transformOrigin: "center" } : undefined}
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
      <span className="mt-3 md:mt-4 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-slate-500/80">
        {label}
      </span>
    </div>
  );
};

const TARGET_DATE = new Date("2026-05-25T00:00:00+05:30");

export default function HeroTimer() {
  const [dbState, setDbState] = useState({
    isActive: false,
    isPaused: false,
    targetDate: null,
    remainingTime: 0,
  });
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Listen to Firestore settings/timer document
  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, "settings", "timer"), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setDbState({
          isActive: data.isActive ?? false,
          isPaused: data.isPaused ?? false,
          targetDate: data.targetDate ?? null,
          remainingTime: data.remainingTime ?? 0,
        });
      } else {
        setDbState({
          isActive: false,
          isPaused: false,
          targetDate: null,
          remainingTime: 0,
        });
      }
    });
    return () => unsub();
  }, []);

  // Update timer display reactively based on dbState
  useEffect(() => {
    const formatTime = (ms) => {
      if (ms <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00" };
      return {
        days: String(Math.floor(ms / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
        minutes: String(Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
        seconds: String(Math.floor((ms % (1000 * 60)) / 1000)).padStart(2, "0"),
      };
    };

    // If not active in Firebase, fall back to TARGET_DATE (default event countdown)
    if (!dbState.isActive) {
      const updateDefaultTimer = () => {
        const now = Date.now();
        const distance = TARGET_DATE.getTime() - now;
        setTimeLeft(formatTime(distance));
      };
      updateDefaultTimer();
      const interval = setInterval(updateDefaultTimer, 1000);
      return () => clearInterval(interval);
    }

    // If active but paused, show frozen remaining time
    if (dbState.isPaused) {
      setTimeLeft(formatTime(dbState.remainingTime));
      return;
    }

    // If active and running, count down to dbState.targetDate
    const updateActiveTimer = () => {
      const now = Date.now();
      const distance = dbState.targetDate - now;
      if (distance <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      } else {
        setTimeLeft(formatTime(distance));
      }
    };
    updateActiveTimer();
    const interval = setInterval(updateActiveTimer, 1000);
    return () => clearInterval(interval);
  }, [dbState]);

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
        className="absolute inset-0 z-0 rounded-2xl sm:rounded-3xl md:rounded-[48px] shadow-[0_10px_40px_rgba(0,0,0,0.04),inset_2px_2px_2px_rgba(255,255,255,0.5),inset_-2px_-2px_2px_rgba(0,0,0,0.05)]"
        style={{
          backdropFilter: 'url("#hero-glass-liquid")',
          background: "rgba(255,255,255,0.15)",
        }}
      />

      <div className="relative z-10 px-4 sm:px-8 md:px-16 py-4 sm:py-6 md:py-8 flex items-center justify-center gap-2 sm:gap-3 md:gap-14">
        <TimeUnit value={timeLeft.days} label="Days" />
        <div className="h-6 sm:h-7 md:h-10 w-px bg-slate-900/10" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <div className="h-6 sm:h-7 md:h-10 w-px bg-slate-900/10" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <div className="h-6 sm:h-7 md:h-10 w-px bg-slate-900/10" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </motion.div>
  );
}

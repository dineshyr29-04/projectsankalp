import { useState, useEffect, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, ChevronLeft } from "lucide-react";
import Container from "../core/Container";
import { db } from "../../lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

// ── LIQUID GLASS FILTER ──
const GlassFilter = () => (
  <svg className="hidden">
    <defs>
      <filter
        id="timer-glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
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
          scale="50"
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

  return (
    <div className="relative h-[20vh] w-[10vw] min-w-[80px] overflow-hidden flex justify-center items-center mx-1 py-10">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={hasChanged ? { y: "100%", opacity: 0 } : false}
          animate={{ y: "0%", opacity: 1 }}
          exit={hasChanged ? { y: "-100%", opacity: 0 } : false}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute text-[13vw] font-mono font-black leading-none text-white tabular-nums tracking-[-0.05em]"
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
      <span className="mt-4 text-[10px] font-mono font-black uppercase tracking-[0.6em] text-white/30">
        {label}
      </span>
    </div>
  );
};

export default function TimerPage({ onBack }) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [targetDate, setTargetDate] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Listen to Firestore settings/timer document
  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, "settings", "timer"), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setIsActive(data.isActive ?? false);
        setIsPaused(data.isPaused ?? false);
        setTargetDate(data.targetDate ?? null);
        setRemainingTime(data.remainingTime ?? 0);
      } else {
        setIsActive(false);
        setIsPaused(false);
        setTargetDate(null);
        setRemainingTime(0);
      }
    });
    return () => unsub();
  }, []);

  const handleStart = async () => {
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const target = Date.now() + twentyFourHours;
    try {
      await setDoc(doc(db, "settings", "timer"), {
        isActive: true,
        isPaused: false,
        targetDate: target,
        remainingTime: twentyFourHours,
      });
    } catch (error) {
      console.error("Failed to start timer in Firebase:", error);
    }
  };

  const handlePause = async () => {
    if (!targetDate) return;
    const distance = targetDate - Date.now();
    try {
      await setDoc(doc(db, "settings", "timer"), {
        isActive: true,
        isPaused: true,
        targetDate: targetDate,
        remainingTime: distance > 0 ? distance : 0,
      });
    } catch (error) {
      console.error("Failed to pause timer in Firebase:", error);
    }
  };

  const handleResume = async () => {
    const target = Date.now() + remainingTime;
    try {
      await setDoc(doc(db, "settings", "timer"), {
        isActive: true,
        isPaused: false,
        targetDate: target,
        remainingTime: remainingTime,
      });
    } catch (error) {
      console.error("Failed to resume timer in Firebase:", error);
    }
  };

  const handleReset = async () => {
    try {
      await setDoc(doc(db, "settings", "timer"), {
        isActive: false,
        isPaused: false,
        targetDate: null,
        remainingTime: 0,
      });
    } catch (error) {
      console.error("Failed to reset timer in Firebase:", error);
    }
  };

  // Manage countdown ticking and display formatting reactively
  useEffect(() => {
    const formatTime = (ms) => {
      if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(ms / (1000 * 60 * 60 * 24)),
        hours: Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((ms % (1000 * 60)) / 1000),
      };
    };

    if (!isActive || !targetDate) {
      setIsExpired(false);
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    if (isPaused) {
      setIsExpired(remainingTime <= 0);
      setTimeLeft(formatTime(remainingTime));
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsExpired(false);
        setTimeLeft(formatTime(distance));
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [isActive, targetDate, isPaused, remainingTime]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex flex-col">
      {/* Header Info */}
      <div className="relative z-20 p-8 flex justify-between items-start">
        <button
          onClick={onBack}
          className="group flex items-center gap-4 text-white/40 hover:text-white transition-all cursor-pointer"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Back</span>
        </button>
      </div>

      {/* Secret Reset Button in Top Right Corner */}
      {isActive && (
        <button
          onClick={handleReset}
          className="fixed top-0 right-0 w-24 h-24 opacity-0 cursor-pointer focus:outline-none z-50"
          title="Secret Reset"
        />
      )}

      {/* Main Timer Display */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-10">
        {isExpired ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center gap-6"
          >
            <span className="text-[6vw] font-mono font-black uppercase tracking-widest text-emerald-500 animate-pulse">
              Precious Time Finished
            </span>
            <span className="text-[2vw] font-sans font-black uppercase tracking-[0.4em] text-white/55">
              Ready for Presentation
            </span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex items-center justify-center gap-4 md:gap-8 lg:gap-10"
          >
            <TimeUnit value={timeLeft.days} label="Days" />
            <div className="h-[9vh] w-px bg-white/10 " />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <div className="h-[9vh] w-px bg-white/10" />
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <div className="h-[9vh] w-px bg-white/10" />
            <TimeUnit value={timeLeft.seconds} label="Sec" />
          </motion.div>
        )}
      </div>

      {/* Secret Controls in Bottom Right Corner */}
      <div className="fixed bottom-0 right-0 w-24 h-24 z-50">
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.button
              key="start-secret"
              onClick={handleStart}
              className="w-full h-full opacity-0 cursor-pointer focus:outline-none"
              title="Secret Start"
            />
          ) : isExpired ? (
            null
          ) : isPaused ? (
            <motion.button
              key="resume-secret"
              onClick={handleResume}
              className="w-full h-full opacity-0 cursor-pointer focus:outline-none"
              title="Secret Resume"
            />
          ) : (
            <motion.button
              key="pause-secret"
              onClick={handlePause}
              className="w-full h-full opacity-0 cursor-pointer focus:outline-none"
              title="Secret Stop"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      </div>
    </div>
  );
}

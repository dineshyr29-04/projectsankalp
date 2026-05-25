import { useState, useEffect, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
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

export default function TimerPage() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [targetDate, setTargetDate] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [launchCountdown, setLaunchCountdown] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const launchIntervalRef = useRef(null);

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

  useEffect(() => {
    return () => {
      if (launchIntervalRef.current) {
        clearInterval(launchIntervalRef.current);
      }
    };
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

  const handleLaunchStart = () => {
    if (isActive || launchCountdown !== null) return;

    const sequence = [3, 2, 1];
    let index = 0;

    setLaunchCountdown(sequence[index]);

    launchIntervalRef.current = setInterval(() => {
      index += 1;

      if (index < sequence.length) {
        setLaunchCountdown(sequence[index]);
        return;
      }

      clearInterval(launchIntervalRef.current);
      launchIntervalRef.current = null;
      setLaunchCountdown(null);
      handleStart();
    }, 1000);
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
      <GlassFilter />

      {/* Header Controls */}
      <div className="relative z-20 p-8 flex justify-end items-start">
        {isActive && (
          <div className="ml-auto text-right">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleReset}
              className="group flex items-center justify-end gap-4 text-white/20 hover:text-white transition-all"
            >
              <RotateCcw className="group-hover:rotate-180 transition-all duration-700" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                Full Reset Console
              </span>
            </motion.button>
          </div>
        )}
      </div>

      {isActive && !isPaused && (
        <motion.button
          key="secret-stop"
          onClick={handlePause}
          className="fixed bottom-0 right-0 w-24 h-24 opacity-0 cursor-pointer focus:outline-none z-50"
          title="Secret Stop"
        />
      )}

      {/* Main Timer Display */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-10">
        <div className="flex flex-col items-center justify-center gap-10">
          {launchCountdown !== null ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={launchCountdown}
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.2, y: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-[40vh] items-center justify-center"
              >
                <span className="text-[24vw] leading-none font-black font-mono text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.12)]">
                  {launchCountdown}
                </span>
              </motion.div>
            </AnimatePresence>
          ) : isExpired ? (
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

          {!isActive && launchCountdown === null ? (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLaunchStart}
              className="group relative px-15 py-6 bg-white text-black rounded-full overflow-hidden transition-all shadow-[0_20px_60px_rgba(255,255,255,0.08)]"
            >
              <div className="relative z-10 flex items-center gap-4">
                <Play size={24} fill="black" />
                <span className="text-sm font-black uppercase tracking-[0.5em]">
                  Start
                </span>
              </div>
              <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
          ) : null}
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

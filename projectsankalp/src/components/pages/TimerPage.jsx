import { useState, useEffect, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Play, Pause, RotateCcw } from "lucide-react";
import { db } from "../../lib/firebase";
import { doc, onSnapshot, setDoc, Timestamp } from "firebase/firestore";

// ─────────────────────────────────────────────
// LIQUID GLASS FILTER
// ─────────────────────────────────────────────
const GlassFilter = () => (
  <svg className="hidden">
    <defs>
      <filter
        id="timer-glass-distortion"
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

// ─────────────────────────────────────────────
// ROLLING DIGIT (LARGE)
// ─────────────────────────────────────────────
const RollingDigit = memo(({ digit }) => {
  const prevDigit = useRef(digit);
  const hasChanged = prevDigit.current !== digit;

  useEffect(() => {
    prevDigit.current = digit;
  }, [digit]);

  return (
    <div className="relative h-[25vh] w-[15vw] min-w-[120px] overflow-hidden flex justify-center items-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={hasChanged ? { y: "100%", opacity: 0 } : false}
          animate={{ y: "0%", opacity: 1 }}
          exit={hasChanged ? { y: "-100%", opacity: 0 } : false}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute text-[22vw] font-serif font-black leading-none text-white tabular-nums tracking-[-0.05em]"
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
      <div className="flex gap-2">
        {digits.map((d, i) => (
          <RollingDigit key={i} digit={d} />
        ))}
      </div>
      <span className="mt-8 text-[12px] font-black uppercase tracking-[0.8em] text-white/20">
        {label}
      </span>
    </div>
  );
};

export default function TimerPage() {
  const [targetDate, setTargetDate] = useState(
    new Date("2026-05-25T00:00:00+05:30"),
  );
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showControls, setShowControls] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // ── FIREBASE SYNC (DISABLED TO PREVENT OVERRIDE) ──
  /*
  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, "settings", "timer"), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.targetTimestamp) {
          setTargetDate(data.targetTimestamp.toDate());
        }
      }
    });
    return () => unsub();
  }, []);
  */

  // ── TIMER LOGIC ──
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, isPaused]);

  const updateRemoteTimer = async (newDate) => {
    if (!db) return;
    try {
      await setDoc(doc(db, "settings", "timer"), {
        targetTimestamp: Timestamp.fromDate(newDate),
      });
    } catch (e) {
      console.error("Error updating timer:", e);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black selection:bg-white/10 flex flex-col items-center justify-center overflow-hidden">
      <GlassFilter />

      {/* ── Immersive Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backdropFilter: 'url("#timer-glass-distortion")',
            background: "radial-gradient(circle at center, #111 0%, #000 100%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03),transparent_70%)]" />
      </div>

      {/* ── Main Display ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
            <span className="text-white/20 font-black uppercase tracking-[1em] text-[10px]">
              Hacking in Progress
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
            {timeLeft.days > 0 && (
              <TimeUnit value={timeLeft.days} label="Days" />
            )}
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>

          <div className="mt-16">
            <h1 className="text-white/10 font-serif italic text-6xl md:text-8xl lg:text-[10vw] tracking-tighter select-none">
              Project Sankalp.
            </h1>
          </div>
        </motion.div>
      </div>

      {/* ── Secret Controls ── */}
      <div
        className="absolute bottom-8 right-8 z-50 group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-3 mr-4"
            >
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-2xl backdrop-blur-xl"
              >
                {isPaused ? (
                  <Play size={20} fill="currentColor" />
                ) : (
                  <Pause size={20} fill="currentColor" />
                )}
              </button>
              <button
                onClick={() =>
                  updateRemoteTimer(new Date("2026-05-15T23:59:59+05:30"))
                }
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-2xl backdrop-blur-xl"
              >
                <RotateCcw size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-white transition-all cursor-pointer backdrop-blur-xl">
          <Settings
            size={20}
            className={showControls ? "rotate-90 transition-transform" : ""}
          />
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

// ─────────────────────────────────────────────
// GLASS FILTER COMPONENT
// This creates the liquid distortion effect
// ─────────────────────────────────────────────
const GlassFilter = () => (
  <svg style={{ display: "none" }}>
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="20"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

// ─────────────────────────────────────────────
// SINGLE DIGIT
// ─────────────────────────────────────────────
const RollingDigit = memo(({ digit }) => {
  const prevDigit = useRef(digit);
  const hasChanged = prevDigit.current !== digit;

  useEffect(() => {
    prevDigit.current = digit;
  }, [digit]);

  return (
    <div
      className="
        relative
        h-12
        w-7
        overflow-hidden
        rounded-xl
        border border-black/[0.04]
        bg-white/20
        backdrop-blur-sm
        flex items-center justify-center
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={digit}
          initial={hasChanged ? { y: "100%", opacity: 0 } : false}
          animate={{ y: "0%", opacity: 1 }}
          exit={hasChanged ? { y: "-100%", opacity: 0 } : false}
          transition={{
            duration: hasChanged ? 0.38 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            text-[30px]
            font-black
            tracking-[-0.06em]
            text-black/80
            tabular-nums
          "
          style={{
            fontFeatureSettings: '"tnum"',
          }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
    </div>
  );
});

// ─────────────────────────────────────────────
// TIME UNIT
// ─────────────────────────────────────────────
const TimeUnit = memo(({ value, label }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[8px] font-semibold uppercase tracking-[0.28em] text-black/35">
        {label}
      </span>
      <div className="flex items-center gap-[2px]">
        {value.split("").map((digit, idx) => (
          <RollingDigit key={`${label}-${idx}`} digit={digit} />
        ))}
      </div>
    </div>
  );
});

export default function FloatingTimer() {
  const [targetDate, setTargetDate] = useState(new Date("2026-05-15T23:59:59+05:30"));
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, "settings", "timer"), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.targetTimestamp) {
          setTargetDate(data.targetTimestamp.toDate());
        }
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) return null;

  return (
    <>
      <GlassFilter />
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed right-6 top-1/2 z-[120] hidden -translate-y-1/2 lg:block"
      >
        {/* LIQUID GLASS POD */}
        <div
          className="relative overflow-hidden rounded-[34px] p-[2px]"
          style={{
            boxShadow: "0 6px 6px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Glass Distortion Layer */}
          <div
            className="absolute inset-0 z-0 overflow-hidden rounded-[34px]"
            style={{
              backdropFilter: "blur(4px)",
              filter: "url(#glass-distortion)",
              background: "rgba(255, 255, 255, 0.15)",
              isolation: "isolate",
            }}
          />
          
          {/* Secondary Shine Layer */}
          <div
            className="absolute inset-0 z-10 rounded-[34px]"
            style={{ background: "rgba(255, 255, 255, 0.1)" }}
          />

          {/* Internal Border Highlight */}
          <div
            className="absolute inset-0 z-20 rounded-[34px] overflow-hidden"
            style={{
              boxShadow: "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.4), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.1)",
            }}
          />

          {/* Content Container */}
          <div className="relative z-30 flex flex-col items-center px-4 py-7 bg-white/10 backdrop-blur-sm rounded-[34px]">
            {/* noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-[34px] overflow-hidden">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, black 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>

            {/* live indicator */}
            <div className="mb-8 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-emerald-500"
                />
                <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-black/40">
                  Live
                </span>
              </div>
              <div className="h-px w-8 bg-black/[0.06]" />
            </div>

            {/* timer stack */}
            <div className="flex flex-col gap-7">
              <TimeUnit value={timeLeft.days} label="Days" />
              <TimeUnit value={timeLeft.hours} label="Hrs" />
              <TimeUnit value={timeLeft.minutes} label="Min" />
              <TimeUnit value={timeLeft.seconds} label="Sec" />
            </div>

            {/* bottom label */}
            <div className="mt-8 flex flex-col items-center border-t border-black/[0.04] pt-5 w-full">
              <p className="text-center text-[8px] font-medium uppercase leading-relaxed tracking-[0.22em] text-black/40">
                Registration<br />Active
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
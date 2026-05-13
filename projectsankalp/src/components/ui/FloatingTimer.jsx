import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function FloatingTimer() {
  const [targetDate, setTargetDate] = useState(
    new Date("2026-05-15T23:59:59+05:30")
  );

  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [mounted, setMounted] = useState(false);

  // ─────────────────────────────────────────────
  // FIREBASE SYNC
  // ─────────────────────────────────────────────
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

  // ─────────────────────────────────────────────
  // TIMER
  // ─────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);

        setTimeLeft({
          hours: "00",
          minutes: "00",
          seconds: "00",
        });

        return;
      }

      const totalHours = Math.floor(distance / (1000 * 60 * 60));

      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );

      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: String(totalHours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        fixed
        right-6
        top-1/2
        z-[120]
        hidden
        -translate-y-1/2
        lg:block
      "
    >
      {/* OUTER SYSTEM */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-white/10
          bg-zinc-950/80
          backdrop-blur-xl
        "
        style={{
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.18)",
        }}
      >
        {/* subtle noise */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />
        </div>

        {/* top signal line */}
        <div className="absolute left-0 top-0 h-full w-[2px] bg-white/10">
          <motion.div
            animate={{
              y: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              left-0
              top-0
              h-16
              w-full
              bg-white/40
            "
          />
        </div>

        {/* content */}
        <div className="relative flex flex-col items-center px-5 py-6">

          {/* label */}
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-3 flex items-center gap-2">
              <motion.div
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="h-2 w-2 rounded-full bg-emerald-400"
              />

              <span
                className="
                  text-[10px]
                  font-medium
                  tracking-[0.22em]
                  text-zinc-500
                "
              >
                LIVE
              </span>
            </div>

            <div className="h-px w-10 bg-white/10" />
          </div>

          {/* TIMER */}
          <div className="space-y-5">

            {/* HOURS */}
            <div className="flex flex-col items-center">
              <span
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.18em]
                  text-zinc-500
                  mb-2
                "
              >
                Hours
              </span>

              <motion.span
                key={timeLeft.hours}
                initial={{ opacity: 0.5, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="
                  text-5xl
                  leading-none
                  font-semibold
                  tracking-[-0.08em]
                  text-white
                  tabular-nums
                "
                style={{
                  fontFeatureSettings: '"tnum"',
                }}
              >
                {timeLeft.hours}
              </motion.span>
            </div>

            <div className="h-px w-full bg-white/5" />

            {/* MINUTES */}
            <div className="flex flex-col items-center">
              <span
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.18em]
                  text-zinc-500
                  mb-2
                "
              >
                Minutes
              </span>

              <motion.span
                key={timeLeft.minutes}
                initial={{ opacity: 0.5, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="
                  text-5xl
                  leading-none
                  font-semibold
                  tracking-[-0.08em]
                  text-white
                  tabular-nums
                "
                style={{
                  fontFeatureSettings: '"tnum"',
                }}
              >
                {timeLeft.minutes}
              </motion.span>
            </div>

            <div className="h-px w-full bg-white/5" />

            {/* SECONDS */}
            <div className="flex flex-col items-center">
              <span
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.18em]
                  text-zinc-500
                  mb-2
                "
              >
                Seconds
              </span>

              <motion.span
                key={timeLeft.seconds}
                initial={{ opacity: 0.5, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="
                  text-5xl
                  leading-none
                  font-semibold
                  tracking-[-0.08em]
                  text-white
                  tabular-nums
                "
                style={{
                  fontFeatureSettings: '"tnum"',
                }}
              >
                {timeLeft.seconds}
              </motion.span>
            </div>
          </div>

          {/* bottom meta */}
          <div className="mt-8 border-t border-white/5 pt-5 text-center">
            <p
              className="
                text-[10px]
                leading-relaxed
                tracking-[0.16em]
                text-zinc-500
              "
            >
              REGISTRATION
              <br />
              WINDOW ACTIVE
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
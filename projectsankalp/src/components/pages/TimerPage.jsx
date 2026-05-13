import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Zap, Timer as TimerIcon, Trophy } from "lucide-react";
import Container from "../core/Container";
import { db } from "../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function TimerPage({ onBack }) {
  // Aiming for 25th May 2026, 11:00 AM IST (End of Hacking)
  const [targetDate, setTargetDate] = useState(new Date("2026-05-25T11:00:00+05:30"));
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLive, setIsLive] = useState(false);

  // ── FIREBASE SYNC ──
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

  // ── COUNTDOWN LOGIC ──
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsLive(false);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
        setIsLive(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label, index }) => (
    <motion.div
      variants={fadeUp}
      custom={index + 2}
      className="flex flex-col items-center group"
    >
      <div className="relative">
        <div className="absolute -inset-4 bg-slate-50 rounded-[32px] scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
        <div className="relative text-7xl md:text-9xl font-serif font-black tracking-tighter text-slate-900 tabular-nums">
          {value.toString().padStart(2, "0")}
        </div>
      </div>
      <span className="mt-4 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 group-hover:text-emerald-500 transition-colors">
        {label}
      </span>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden selection:bg-emerald-100">
      {/* ── Atmospheric Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} 
        />
      </div>

      <Container className="relative z-10 px-6 sm:px-10 lg:px-20 pt-32 pb-32 min-h-screen flex flex-col">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <div className="space-y-8">
            <motion.button
              onClick={onBack}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center bg-slate-50 group-hover:border-slate-300 group-hover:bg-slate-100 transition-all">
                <ArrowLeft size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Exit Timer</span>
            </motion.button>

            <div className="space-y-4">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="flex items-center gap-3"
              >
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                <span className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px]">
                  {isLive ? 'Live Countdown' : 'Countdown Ended'}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-6xl md:text-8xl font-serif font-black leading-none tracking-tighter"
              >
                The Final <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 italic">Sankalp.</span>
              </motion.h1>
            </div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100"
          >
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <TimerIcon className="text-emerald-500" size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Target Event</p>
              <p className="text-sm font-bold text-slate-900">Grand Finale 2026</p>
            </div>
          </motion.div>
        </div>

        {/* ── Main Timer ── */}
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24">
            <TimeUnit value={timeLeft.days} label="Days" index={0} />
            <TimeUnit value={timeLeft.hours} label="Hours" index={1} />
            <TimeUnit value={timeLeft.minutes} label="Minutes" index={2} />
            <TimeUnit value={timeLeft.seconds} label="Seconds" index={3} />
          </div>
        </div>

        {/* ── Footer Info ── */}
        <div className="mt-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, label: "Efficiency", value: "Real-time Sync" },
            { icon: Clock, label: "Precision", value: "Multi-Device" },
            { icon: Trophy, label: "Goal", value: "Project Finish" }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i + 6}
              className="group p-8 rounded-[32px] border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-500"
            >
              <item.icon className="text-slate-300 group-hover:text-emerald-500 transition-colors mb-6" size={20} />
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">{item.label}</p>
              <p className="text-lg font-bold text-slate-900">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

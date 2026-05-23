import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "../core/Container";
import Grainient from "../Grainient";
import HeroTimer from "../ui/HeroTimer";

export default function Hero({ onNavigate }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const sponsors = [
    { name: "Ministry of Youth Affairs and Sports", logo: "/MYAA.png" },
    { name: "Yenepoya University", logo: "/ysetlogo.png" },
    { name: "NSS Unit", logo: "/nsslogo.png" },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col bg-white overflow-hidden pt-20 sm:pt-24 md:pt-12 lg:pt-5"
    >
      {/* ── Grainient Animated Background ── */}
      <div className="absolute inset-0 z-0">
        <Grainient
          color1="#84CC16"
          color2="#ffffff"
          color3="#3B82F6"
          timeSpeed={1.35}
          colorBalance={-0.41}
          warpStrength={1.0}
          warpFrequency={5.0}
          warpSpeed={3.0}
          warpAmplitude={50.0}
          blendAngle={-115}
          blendSoftness={0.38}
          rotationAmount={0}
          noiseScale={2.0}
          grainAmount={0}
          grainScale={0.2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1.05}
          saturation={1.0}
          centerX={-0.14}
          centerY={0.0}
          zoom={0.65}
        />
      </div>
      {/* Main Content - Centered with Navbar Offset */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-12 md:py-20">
        <Container className="w-full px-4 sm:px-10 lg:px-20 mx-auto flex flex-col items-center justify-center gap-12 md:gap-16">
          {/* Main Content Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center w-full text-center"
          >
            {/* Announcement Banner */}
            <div className="mb-6 sm:mb-8 md:mb-10 inline-flex items-center gap-2 sm:gap-3 px-5 py-2 sm:py-2.5 rounded-full bg-slate-900/5 border border-slate-900/10 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-slate-900">
                Round One Results Are Out
              </span>
            </div>

            {/* Heading Group */}
            <div className="flex flex-col items-center w-full gap-4 sm:gap-6 md:gap-12">
              <div className="flex flex-col items-center">
                <h1 className="text-5xl sm:text-7xl md:text-[90px] lg:text-[140px] font-serif font-black text-slate-900 leading-[0.8] md:leading-[0.75] tracking-[0.05em] md:tracking-[0.1em] uppercase italic">
                  PROJECT
                </h1>

                {/* Pill Badge - Centered between heading words */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 my-4 sm:my-5 md:my-8">
                  <span className="h-px w-6 sm:w-8 md:w-10 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></span>
                  <span className="text-[8px] sm:text-[10px] md:text-[14px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                    Code4Change
                  </span>
                  <span className="h-px w-6 sm:w-8 md:w-10 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-[90px] lg:text-[140px] font-serif font-black text-slate-900 leading-[0.8] md:leading-[0.75] tracking-[0.1em] md:tracking-[0.15em] uppercase italic">
                  SANKALP
                </h1>
              </div>

              {/* HERO TIMER - Focal point under title */}
              <div className="scale-100 origin-center">
                <HeroTimer />
              </div>
            </div>

            {/* CTA Group - Logical action unit */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-6 w-full md:w-auto px-6 md:px-0 mt-12 md:mt-16">
              <motion.button
                whileHover={{
                  boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate?.("winners")}
                className="w-full md:w-auto bg-slate-900 text-white px-10 md:px-14 py-5 rounded-full text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-lg shadow-slate-900/10 hover:-translate-y-[2px] hover:shadow-[0_12px_30px_rgba(16,185,129,0.25)] hover:bg-slate-800 transition-all duration-300"
              >
                Round One Results
              </motion.button>

              <motion.button
                whileHover={{
                  y: -5,
                  scale: 1.025,
                }}
                whileTap={{ scale: 0.985 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 18,
                }}
                onClick={() => onNavigate?.("stages")}
                className="group relative isolate overflow-hidden w-full md:w-auto rounded-full px-10 md:px-14 py-5 backdrop-blur-3xl border border-emerald-900 bg-[linear-gradient(135deg,rgba(103, 250, 59, 0.92),rgba(35, 143, 250, 0.88),rgba(34, 227, 137, 0.82))] shadow-[0_12px_50px_rgba(0,0,0,0.12)] transition-all duration-700 ease-out hover:border-emerald-500/30 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(248,250,252,0.95),rgba(236,253,245,0.92))] hover:shadow-[0_30px_90px_rgba(16,185,129,0.16)] active:scale-[0.985]"
              >
                
                <span className="relative z-10 flex items-center justify-center gap-3 text-[11px] md:text-[12px] font-black uppercase tracking-[0.32em] md:tracking-[0.42em] text-slate-900 transition-all duration-500 group-hover:text-emerald-700">
                  Problem Statements

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </motion.button>

              <motion.button
                whileHover={{
                  y: -5,
                  scale: 1.025,
                }}
                whileTap={{ scale: 0.985 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 18,
                }}
                onClick={() => onNavigate?.("team")}
                className="group relative isolate overflow-hidden w-full md:w-auto rounded-full px-10 md:px-14 py-5 backdrop-blur-3xl border border-white/[0.06] bg-[linear-gradient(135deg,rgba(3,3,3,0.92),rgba(8,8,8,0.88),rgba(15,15,15,0.84))] shadow-[0_12px_50px_rgba(0,0,0,0.45)] transition-all duration-700 ease-out hover:border-emerald-400/25 hover:bg-[linear-gradient(135deg,rgba(0,0,0,0.96),rgba(6,6,6,0.92),rgba(12,12,12,0.9))] hover:shadow-[0_30px_90px_rgba(16,185,129,0.18)] active:scale-[0.985]"
              >
                {/* AMBIENT AURORA */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_34%)] scale-90 group-hover:scale-110" />

                {/* TOP GLASS REFLECTION */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent pointer-events-none" />

                {/* LIQUID SHINE */}
                <div className="absolute inset-y-0 -left-[45%] w-[30%] rotate-12 bg-white/[0.12] blur-2xl translate-x-[-180%] group-hover:translate-x-[450%] transition-transform duration-[1600ms] ease-out" />

                {/* INNER STROKE */}
                <div className="absolute inset-[1px] rounded-full border border-white/[0.04] pointer-events-none" />

                {/* BOTTOM EMERALD LIGHT */}
                <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* CONTENT */}
                <span className="relative z-10 flex items-center justify-center gap-3 text-[11px] md:text-[12px] font-black uppercase tracking-[0.32em] md:tracking-[0.42em] text-white/85 transition-all duration-500 group-hover:text-emerald-300">
                  Meet the Team

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Sponsors Row - AUDIT FIX: No Grayscale */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-full flex flex-col items-center gap-6 md:gap-6"
          >
            <span className="text-[10px] md:text-[10px] font-black uppercase tracking-[0.5em] md:tracking-[0.6em] text-slate-800">
              Presented By
            </span>

            <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-16 md:gap-20 px-12 md:px-20 py-8 md:py-8 bg-white/40 backdrop-blur-2xl border border-slate-100 rounded-[40px] md:rounded-full shadow-xl shadow-slate-900/[0.03]">
              {sponsors.map((sponsor) => (
                <motion.div
                  key={sponsor.name}
                  whileHover={{ y: -5 }}
                  className="flex items-center justify-center"
                >
                  <div className="h-[50px] sm:h-[70px] md:h-[100px] flex items-center justify-center">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </div>

      {/* ── Smooth Color Transition to Next Section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-transparent to-slate-50 z-5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/30 to-transparent z-5 pointer-events-none" />
    </section>
  );
}

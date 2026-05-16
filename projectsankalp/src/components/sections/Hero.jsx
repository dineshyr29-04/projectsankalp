import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "../core/Container";
import Grainient from "../Grainient";
import HeroTimer from "../ui/HeroTimer";

export default function Hero({ onBookingClick }) {
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
                className="w-full md:w-auto bg-slate-900 text-white px-10 md:px-14 py-5 md:py-5 rounded-full text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-lg shadow-slate-900/10 hover:-translate-y-[2px] hover:shadow-[0_12px_30px_rgba(16,185,129,0.25)] hover:bg-slate-800 transition-all duration-300"
              >
                Register Closed
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

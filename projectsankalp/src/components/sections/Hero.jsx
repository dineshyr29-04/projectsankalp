import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "../core/Container";
import Grainient from "../Grainient";
import { siteConfig } from "../../config/site";
import { Calendar, ChevronRight, Zap, Award, Shield } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const sponsors = [
    { name: "Yenepoya University", logo: "/ysetlogo.png" },
    { name: "NSS Unit", logo: "/nsslogo.png" },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col bg-white overflow-hidden pt-5"
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
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 pt-28 pb-12">
        <Container className="w-full px-4 sm:px-10 lg:px-20 mx-auto flex flex-col items-center justify-center gap-8 md:gap-12">
          {/* Main Content Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center space-y-6 md:space-y-8 w-full text-center"
          >
            {/* AUDIT FIX: Clear primary date & prize pool info */}

            {/* Heading - Wide & Impactful */}
            <div className="flex flex-col items-center w-full mt-[70px] md:mt-[0px]">
              <h1 className="mt-10 text-6xl italic font-light sm:text-8xl md:text-[90px] lg:text-[130px] sm:mt-[100px] font-serif font-black text-slate-900 leading-[0.8] tracking-[0.1em] uppercase">
                PROJECT
              </h1>

              {/* Pill Badge - Centered between heading words */}
              <div className="flex items-center justify-center gap-4 my-4 md:my-6">
                <span className="h-px w-10 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></span>
                <span className="text-[11px] font-normal italic md:text-[14px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Code4Change
                </span>
                <span className="h-px w-10 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></span>
              </div>
              <h1 className="text-5xl font-light italic sm:text-6xl md:text-[90px] lg:text-[130px] font-serif font-black text-slate-900 leading-[0.8] tracking-[0.15em] uppercase italic">
                SANKALP
              </h1>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full md:w-auto px-6 md:px-0 mt-3 sm:mt-[120px] mt-[100px]">
              <motion.button
                whileHover={{
                  boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  window.open(
                    "https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755",
                    "_blank",
                  )
                }
                className="md:w-auto bg-slate-900 text-white px-14 py-5 rounded-full text-[11px] md:text-[12px] font-black uppercase tracking-[0.4em] shadow-lg shadow-slate-900/10 hover:-translate-y-[2px] hover:shadow-[0_12px_30px_rgba(16,185,129,0.25)] hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-emerald-500/50 transition-all duration-300"
              >
                Register Now
              </motion.button>
              <motion.button
                whileHover={{
                  backgroundColor: "rgba(15, 23, 42, 0.1)",
                  boxShadow: "0 15px 35px rgba(15, 23, 42, 0.2)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileTap={{ scale: 0.98 }}
                className="md:w-auto border-2 border-slate-900 text-slate-900 px-14 py-5 rounded-full text-[11px] md:text-[12px] font-black uppercase tracking-[0.4em] focus-visible:ring-4 focus-visible:ring-slate-900/10 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Sponsors Row - AUDIT FIX: No Grayscale */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-800">
              Presented By
            </span>

            <div className="flex items-center gap-14 md:gap-24 px-5 md:px-16 py-5 md:py-5 bg-white/40 backdrop-blur-md border border-slate-100 rounded-full shadow-lg shadow-slate-900/[0.02]">
              {sponsors.map((sponsor) => (
                <motion.div
                  key={sponsor.name}
                  className="flex flex-col items-center gap-3 transition-all duration-500 cursor-pointer"
                >
                  <div className="h-[85px] sm:h-[100px] md:h-[110px]">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="h-full w-auto object-contain transition-opacity hover:rotate-[3.5deg] hover:ease-in-out transition-transform duration-500 ease"
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

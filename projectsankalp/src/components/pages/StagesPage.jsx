import React, { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, ShieldCheck, Activity, Target } from "lucide-react";
import Container from "../core/Container";
import Footer from "../layout/Footer";
import { useOutsideClick } from "../../hooks/use-outside-click";

export default function StagesPage({ onBack }) {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const closeBtnRef = useRef(null);
  const id = useId();

  const DOMAINS = [
    {
      id: "01",
      title: "Women's Entrepreneurship",
      color: "text-blue-600",
      accent: "bg-blue-600",
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      description:
        "Championing gender equality by building tools for financial independence and micro-business scaling.",
      problems: [
        {
          id: "Problem Statement 01",
          text: "Decentralized marketplaces for rural artisans to scale global reach.",
        },
        {
          id: "Problem Statement 02",
          text: "AI-driven financial literacy platforms for women-led startups.",
        },
        {
          id: "Problem Statement 03",
          text: "P2P micro-lending systems with community-based trust scoring.",
        },
      ],
    },
    {
      id: "02",
      title: "Health & Sanitation",
      color: "text-emerald-600",
      accent: "bg-emerald-600",
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      description:
        "Developing innovative systems for preventive healthcare, clean water access, and waste management.",
      problems: [
        {
          id: "Problem Statement 01",
          text: "Predictive analysis of water-borne diseases in urban settlements.",
        },
        {
          id: "Problem Statement 02",
          text: "Smart waste management systems for decentralized municipalities.",
        },
        {
          id: "Problem Statement 03",
          text: "Mobile-first diagnostic tools for rural maternal healthcare.",
        },
      ],
    },
    {
      id: "03",
      title: "Climate Action",
      color: "text-teal-600",
      accent: "bg-teal-600",
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074&auto=format&fit=crop",
      description:
        "Harnessing technology to combat climate change and promote green energy transitions.",
      problems: [
        {
          id: "Problem Statement 01",
          text: "Real-time carbon footprint trackers for household consumption.",
        },
        {
          id: "Problem Statement 02",
          text: "Marketplaces for upcycled industrial waste and circular resources.",
        },
        {
          id: "Problem Statement 03",
          text: "Community-driven reforestation monitoring using satellite imagery.",
        },
      ],
    },
  ];

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") setActive(null);
    }
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useEffect(() => {
    if (active) {
      setTimeout(() => closeBtnRef.current?.focus(), 60);
    }
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="min-h-screen bg-white text-slate-950 font-sans overflow-x-hidden relative">
      {/* Dynamic Dotted Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none z-0" />

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            data-lenis-prevent
            className="fixed inset-0 z-[100] overflow-y-auto flex flex-col items-center p-6 md:p-12 custom-scrollbar"
          >
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActive(null)}
              className="absolute inset-0 z-10 bg-slate-900/50 backdrop-blur-lg"
            />

            {/* Premium Floating Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 z-30 bg-white/95 backdrop-blur-md text-slate-900 rounded-full p-3 shadow-lg border border-slate-100 cursor-pointer hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 group focus-ring"
              aria-label="Close"
              ref={closeBtnRef}
            >
              <X
                size={18}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </motion.button>

            {/* Seamless Expanding Modal Card Container */}
            <motion.div
              ref={ref}
              layoutId={`card-${active.title}-${id}`}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 32,
              }}
              style={{ willChange: "transform, opacity" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`title-${active.title}-${id}`}
              className="w-full max-w-4xl h-fit min-h-fit flex flex-col bg-white rounded-[32px] shadow-[0_40px_140px_-36px_rgba(0,0,0,0.14)] border border-slate-100 z-20 relative mb-20 overflow-hidden"
            >
              {/* Header Image */}
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="relative h-48 md:h-64 w-full flex-shrink-0 overflow-hidden"
              >
                <motion.img
                  layoutId={`img-${active.title}-${id}`}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                {/* Heading details nested inside image overlay, fading in dynamically without stretching */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="absolute bottom-8 left-8 right-8"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400 mb-2 block">
                    Mission Sector
                  </span>
                  <h3
                    id={`title-${active.title}-${id}`}
                    className="text-3xl md:text-5xl font-black text-white font-serif italic tracking-tight leading-none"
                  >
                    {active.title}
                  </h3>
                </motion.div>
              </motion.div>

              {/* Detail Content Section (Staggered Fade-in on Enter, Immediate Fade-out on Exit) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.15 }}
                className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar"
              >
                <div className="mb-10">
                  <p className="text-slate-600 font-medium leading-relaxed text-lg italic max-w-2xl">
                    {active.description}
                  </p>
                </div>

                <div className="space-y-8 pb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 whitespace-nowrap">
                      Problem Manifest
                    </span>
                    <div className="h-px w-full bg-slate-100" />
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {active.problems.map((ps, idx) => (
                      <motion.div
                        key={ps.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.2 + idx * 0.08,
                          ease: "easeOut",
                        }}
                        className={`p-8 rounded-[24px] bg-slate-50 border border-slate-100 group flex flex-col justify-between transition-all duration-300 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] ${
                          active.id === "01"
                            ? "hover:border-blue-500/30"
                            : active.id === "02"
                              ? "hover:border-emerald-500/30"
                              : "hover:border-teal-500/30"
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <span
                              className={`inline-block text-[9px] font-black uppercase tracking-widest ${active.color} opacity-60`}
                            >
                              Problem Statement 0{idx + 1}
                            </span>
                            {active.id === "01" ? (
                              <Target
                                size={16}
                                className="text-blue-500 opacity-60 group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : active.id === "02" ? (
                              <Activity
                                size={16}
                                className="text-emerald-500 opacity-60 group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <ShieldCheck
                                size={16}
                                className="text-teal-500 opacity-60 group-hover:scale-110 transition-transform duration-300"
                              />
                            )}
                          </div>
                          <p className="text-sm font-bold text-slate-700 leading-relaxed mb-8">
                            {ps.text}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-400 pt-4 border-t border-slate-100/50 mt-auto">
                          Status: Active{" "}
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Container className="relative z-10 pt-32 px-6 mx-auto pb-40">
        <header className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px] bg-emerald-50 px-4 py-2 rounded-full">
              Mission Directives
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl md:text-8xl font-black tracking-tighter text-slate-950 leading-[0.9]"
          >
            Operational <br />
            <span className="text-emerald-600 pr-10">Domains</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-500 mt-10 text-xl font-medium max-w-xl italic leading-relaxed"
          >
            Three critical sectors. Nine profound challenges. One goal:
            Technology for global human impact.
          </motion.p>

          <div className="mt-12 flex items-center gap-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="w-14 h-14 bg-white border border-slate-200 text-slate-950 rounded-2xl flex items-center justify-center shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer focus-ring"
              aria-label="Go back"
            >
              <ChevronRight size={24} className="rotate-180" />
            </motion.button>
            <div className="h-px w-20 bg-slate-100" />
          </div>
        </header>

        {/* Domain Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
          {DOMAINS.map((domain) => (
            <motion.div
              layoutId={`card-${domain.title}-${id}`}
              key={`card-${domain.title}-${id}`}
              onClick={() => setActive(domain)}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
              }}
              className="relative group cursor-pointer bg-white rounded-[28px] border border-slate-100 overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1.5"
            >
              <div>
                <motion.div
                  layoutId={`image-${domain.title}-${id}`}
                  className="h-48 md:h-56 overflow-hidden relative"
                >
                  <motion.img
                    layoutId={`img-${domain.title}-${id}`}
                    src={domain.src}
                    alt={domain.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/5 transition-colors" />
                  <div
                    className={`absolute top-8 left-8 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest ${domain.color} border border-white shadow-xl`}
                  >
                    Sector {domain.id}
                  </div>
                </motion.div>

                <div className="p-8">
                  <h3 className="text-2xl font-black text-slate-950 mb-4 tracking-tight font-serif italic">
                    {domain.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                    {domain.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-8 pt-0 mt-auto">
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Sector {domain.id}
                  </span>
                  <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 group-hover:translate-x-1.5 transition-transform duration-300">
                    Problem Statements <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA - Light Theme */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[48px] border border-slate-100 bg-slate-50 px-8 py-20 md:px-24 md:py-28 mt-40 shadow-sm z-10"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-16">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="mb-10 flex items-center justify-center lg:justify-start gap-4">
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                  Final Protocol
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <h2 className="text-5xl lg:text-7xl font-black leading-[0.92] tracking-tighter text-slate-950 font-serif italic">
                Build what <br />
                <span className="text-emerald-600">matters.</span>
              </h2>
              <p className="mt-10 text-xl leading-relaxed text-slate-500 italic max-w-xl">
                Collaborate with ambitious builders, solve meaningful
                challenges, and transform ideas into products with measurable
                impact.
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-10">
              <div className="flex items-center gap-12">
                <div className="text-center">
                  <p className="text-4xl font-black tracking-tighter text-slate-950 font-serif">
                    500+
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
                    Pioneers
                  </p>
                </div>
                <div className="h-12 w-px bg-slate-200" />
                <div className="text-center">
                  <p className="text-4xl font-black tracking-tighter text-slate-950 font-serif">
                    24H
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
                    Sprint
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
      <Footer />
    </div>
  );
}

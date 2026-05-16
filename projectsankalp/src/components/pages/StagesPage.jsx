import React, { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronRight, X, ShieldCheck, Activity, Target, Info } from "lucide-react";
import Container from "../core/Container";
import Footer from "../layout/Footer";
import { useOutsideClick } from "../../hooks/use-outside-click";

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-slate-950"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export default function StagesPage({ onBack }) {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
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
      tags: [],
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
      tags: [],
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
      tags: [],
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
      if (event.key === "Escape") setActive(false);
    }
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="min-h-screen bg-white text-slate-950 font-sans overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence>
        {active && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-[100] overflow-y-auto flex flex-col items-center p-6 md:p-12 custom-scrollbar"
          >
            {/* Real Backdrop - clickable to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 bg-slate-950/20 backdrop-blur-md z-0"
            />

            {/* Close button - Fixed to top right of screen */}
            <motion.button
              key={`button-${active.title}-${id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed top-8 right-8 flex items-center justify-center bg-slate-950 rounded-full h-14 w-14 shadow-2xl z-[130] hover:scale-110 active:scale-95 transition-all text-white"
              onClick={() => setActive(null)}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ willChange: "transform, opacity" }}
              className="w-full max-w-4xl h-fit min-h-fit flex flex-col bg-white rounded-[40px] shadow-[0_32px_128px_-32px_rgba(0,0,0,0.1)] border border-slate-100 z-10 relative mb-20 overflow-hidden"
            >
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="relative h-[400px] w-full flex-shrink-0 overflow-hidden"
              >
                <motion.img
                  layoutId={`img-${active.title}-${id}`}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] font-black uppercase tracking-[0.5em] text-emerald-400 mb-3 block"
                  >
                    Mission Sector
                  </motion.span>
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className="text-4xl md:text-5xl font-black text-white font-serif italic tracking-tight leading-none"
                  >
                    {active.title}
                  </motion.h3>
                </div>
              </motion.div>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
                  <div className="flex-1">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-slate-600 font-medium leading-relaxed text-lg italic"
                    >
                      {active.description}
                    </motion.p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {active.tags.map(tag => (
                        <span key={tag} className="px-4 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  
                </div>

                <div className="space-y-10 pb-10">
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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + idx * 0.1 }}
                        className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between"
                      >
                        <div>
                          <span className={`inline-block text-[9px] font-black uppercase tracking-widest ${active.color} mb-6 opacity-60`}>
                            Problem Statement 0{idx + 1}
                          </span>
                          <p className="text-sm font-bold text-slate-700 leading-relaxed mb-8">
                            {ps.text}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-400">
                          Status: Active <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Container className="relative z-10 pt-32 px-6 mx-auto pb-40">
        <header className="mb-28 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <span className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px] bg-emerald-50 px-4 py-2 rounded-full">
              Mission Directives
            </span>
          </motion.div>
          <h1 className="font-serif text-6xl md:text-8xl font-black tracking-tighter text-slate-950 leading-[0.9]">
            Operational <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 italic pr-10">
              Domains
            </span>
          </h1>
          <p className="text-slate-500 mt-10 text-xl font-medium max-w-xl italic leading-relaxed">
            Three critical sectors. Nine profound challenges. One goal:
            Technology for global human impact.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-14 h-14 bg-white border border-slate-200 text-slate-950 rounded-2xl flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all active:scale-95"
            >
              <ChevronRight size={24} className="rotate-180" />
            </button>
            <div className="h-px w-20 bg-slate-100" />
            
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {DOMAINS.map((domain) => (
            <motion.div
              layoutId={`card-${domain.title}-${id}`}
              key={`card-${domain.title}-${id}`}
              onClick={() => setActive(domain)}
              className="relative group cursor-pointer bg-white rounded-[48px] border border-slate-100 overflow-hidden transition-all hover:shadow-[0_32px_128px_-32px_rgba(0,0,0,0.12)]"
            >
              <motion.div
                layoutId={`image-${domain.title}-${id}`}
                className="h-72 overflow-hidden relative"
              >
                <motion.img
                  layoutId={`img-${domain.title}-${id}`}
                  src={domain.src}
                  alt={domain.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.2] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/5 transition-colors" />
                <div className={`absolute top-8 left-8 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest ${domain.color} border border-white shadow-xl`}>
                  Sector {domain.id}
                </div>
              </motion.div>

              <div className="p-10">
                <motion.h3
                  layoutId={`title-${domain.title}-${id}`}
                  className="text-2xl font-black text-slate-950 mb-4 tracking-tight font-serif italic"
                >
                  {domain.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${domain.description}-${id}`}
                  className="text-slate-500 text-sm font-medium mb-10 line-clamp-2 leading-relaxed"
                >
                  {domain.description}
                </motion.p>

                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                  <div className="flex gap-2">
                    {domain.tags.slice(0, 1).map((tag) => (
                      <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    layoutId={`button-${domain.title}-${id}`}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 group-hover:translate-x-2 transition-transform"
                  >
                    Problem Statement <ChevronRight size={14} />
                  </motion.button>
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
          className="relative overflow-hidden rounded-[48px] border border-slate-100 bg-slate-50 px-8 py-20 md:px-24 md:py-28 mt-40 shadow-sm"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-16">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="mb-10 flex items-center justify-center lg:justify-start gap-4">
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Final Protocol</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <h2 className="text-5xl lg:text-7xl font-black leading-[0.92] tracking-tighter text-slate-950 font-serif italic">
                Build what <br />
                <span className="text-emerald-600">matters.</span>
              </h2>
              <p className="mt-10 text-xl leading-relaxed text-slate-500 italic max-w-xl">
                Collaborate with ambitious builders, solve meaningful challenges, and transform ideas into products with measurable impact.
              </p>
            </div>
            
            <div className="flex flex-col items-center lg:items-end gap-10">
              <div className="flex items-center gap-12">
                <div className="text-center">
                  <p className="text-4xl font-black tracking-tighter text-slate-950 font-serif">500+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Pioneers</p>
                </div>
                <div className="h-12 w-px bg-slate-200" />
                <div className="text-center">
                  <p className="text-4xl font-black tracking-tighter text-slate-950 font-serif">24H</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Sprint</p>
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

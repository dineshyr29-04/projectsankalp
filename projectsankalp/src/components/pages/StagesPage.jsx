import React, { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  ChevronRight,
  ShieldCheck,
  X
} from "lucide-react";
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
      className="h-4 w-4 text-black"
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
      src: "https://images.unsplash.com/photo-1573163231162-717dfc3e0c1f?q=80&w=2069&auto=format&fit=crop",
      description: "Championing gender equality by building tools for financial independence and micro-business scaling.",
      tags: ["Micro-Financing", "Skill Networks"],
      problems: [
        { id: "Problem Statement 01", text: "Decentralized marketplaces for rural artisans to scale global reach." },
        { id: "Problem Statement 02", text: "AI-driven financial literacy platforms for women-led startups." },
        { id: "Problem Statement 03", text: "P2P micro-lending systems with community-based trust scoring." }
      ]
    },
    {
      id: "02",
      title: "Health & Sanitation",
      color: "text-emerald-600",
      accent: "bg-emerald-600",
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      description: "Developing innovative systems for preventive healthcare, clean water access, and waste management.",
      tags: ["Telemedicine", "Waste Optimization"],
      problems: [
        { id: "Problem Statement 01", text: "Predictive analysis of water-borne diseases in urban settlements." },
        { id: "Problem Statement 02", text: "Smart waste management systems for decentralized municipalities." },
        { id: "Problem Statement 03", text: "Mobile-first diagnostic tools for rural maternal healthcare." }
      ]
    },
    {
      id: "03",
      title: "Climate Action",
      color: "text-teal-600",
      accent: "bg-teal-600",
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074&auto=format&fit=crop",
      description: "Harnessing technology to combat climate change and promote green energy transitions.",
      tags: ["Renewable Energy", "Circular Economy"],
      problems: [
        { id: "Problem Statement 01", text: "Real-time carbon footprint trackers for household consumption." },
        { id: "Problem Statement 02", text: "Marketplaces for upcycled industrial waste and circular resources." },
        { id: "Problem Statement 03", text: "Community-driven reforestation monitoring using satellite imagery." }
      ]
    }
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-50 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm h-full w-full z-[60]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex absolute top-6 right-6 items-center justify-center bg-white rounded-full h-10 w-10 shadow-xl border border-slate-200 z-[110]"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-100"
            >
              <motion.div layoutId={`image-${active.title}-${id}`} className="relative h-80 w-full flex-shrink-0">
                <img
                  src={active.src}
                  alt={active.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8">
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2 block">Mission Sector</span>
                   <motion.h3 layoutId={`title-${active.title}-${id}`} className="text-3xl font-black text-white font-serif italic tracking-tight">{active.title}</motion.h3>
                </div>
              </motion.div>

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="flex justify-between items-start mb-8">
                  <div className="max-w-[70%]">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-slate-500 font-medium leading-relaxed"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => window.open("https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755", "_blank")}
                    className="px-6 py-3 text-[10px] rounded-full font-black uppercase tracking-widest bg-slate-900 text-white hover:bg-emerald-600 transition-colors shadow-lg"
                  >
                    Solve Now
                  </motion.button>
                </div>

                <div className="space-y-6 pb-10">
                   <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">Problem Statements</span>
                      <div className="h-px w-full bg-slate-100" />
                   </div>
                   
                   <div className="grid gap-4">
                      {active.problems.map((ps) => (
                        <motion.div 
                          key={ps.id} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-6 rounded-3xl bg-slate-50 border border-slate-100 group transition-all hover:border-emerald-200 hover:bg-emerald-50/30"
                        >
                          <div className="flex gap-4">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${active.color} mt-1 opacity-40 group-hover:opacity-100`}>{ps.id}</span>
                            <p className="text-sm font-bold text-slate-700 group-hover:text-slate-900 leading-relaxed">{ps.text}</p>
                          </div>
                        </motion.div>
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <Container className="relative z-10 pt-32 px-6 mx-auto">
        <header className="mb-28 max-w-4xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <span className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px]">Mission Directives</span>
          </motion.div>
          <h1 className="font-serif text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 italic">Sankalp</span> <br /> Domains.
          </h1>
          <p className="text-slate-500 mt-10 text-xl font-medium max-w-xl italic leading-relaxed">
            Three critical sectors. Nine profound challenges. One goal: Technology for global human impact.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-40">
          {DOMAINS.map((domain) => (
            <motion.div
              layoutId={`card-${domain.title}-${id}`}
              key={`card-${domain.title}-${id}`}
              onClick={() => setActive(domain)}
              className="relative group cursor-pointer bg-white rounded-[40px] border border-slate-200 overflow-hidden transition-all hover:border-emerald-400/40 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <motion.div layoutId={`image-${domain.title}-${id}`} className="h-64 overflow-hidden relative">
                <img src={domain.src} alt={domain.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className={`absolute top-6 left-6 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest ${domain.color} border border-white`}>
                  Sector {domain.id}
                </div>
              </motion.div>

              <div className="p-10">
                <motion.h3 layoutId={`title-${domain.title}-${id}`} className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                  {domain.title}
                </motion.h3>
                <motion.p layoutId={`description-${domain.description}-${id}`} className="text-slate-500 text-sm font-medium mb-10 line-clamp-2 leading-relaxed">
                  {domain.description}
                </motion.p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex gap-1">
                    {domain.tags.map(tag => (
                      <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    layoutId={`button-${domain.title}-${id}`}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 group-hover:translate-x-2 transition-transform"
                  >
                    View Problems <ChevronRight size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-white px-8 py-16 md:px-20 md:py-24 transition-colors duration-300 hover:border-zinc-300 xl:mb-32 pb-32">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
          <div className="relative z-10 flex flex-col gap-20 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-10 flex items-center gap-4">
                <span className="text-[11px] font-medium tracking-wide text-zinc-400">Final Step</span>
                <span className="h-[3px] w-[3px] rounded-full bg-zinc-300" />
                <span className="text-[11px] text-zinc-400">Applications Open</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-semibold leading-[0.92] tracking-[-0.055em] text-zinc-950">
                Build work that <span className="block text-emerald-400">actually matters.</span>
              </h2>
              <p className="mt-10 max-w-[36ch] text-[18px] leading-8 text-zinc-600">
                Collaborate with ambitious builders, solve meaningful challenges, and transform ideas into products with measurable impact.
              </p>
            </div>
            <div className="flex flex-col items-start gap-8 lg:items-end">
              <div className="flex items-center gap-10">
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-zinc-950">500+</p>
                  <p className="mt-1 text-[12px] text-zinc-400">Participants</p>
                </div>
                <div className="h-10 w-px bg-zinc-200" />
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-zinc-950">48h</p>
                  <p className="mt-1 text-[12px] text-zinc-400">Innovation Sprint</p>
                </div>
              </div>
              <button
                onClick={() => window.open("https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755", "_blank")}
                className="group inline-flex items-center gap-4 rounded-full border border-zinc-300 bg-zinc-950 px-8 py-4 text-[12px] font-medium tracking-wide text-white transition-all hover:bg-zinc-900 active:scale-[0.98]"
              >
                Start Your Mission
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </Container>
      <Footer/>
    </div>
  );
}

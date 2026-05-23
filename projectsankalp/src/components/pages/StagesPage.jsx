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
          id: "W1",
          title: "Artisan Women’s Market Exclusion Across 15+ Craft Districts",
          paragraph:
            "Thousands of women artisans across rural craft districts in India continue to face severe barriers in accessing larger markets. Despite possessing valuable traditional skills, many lack digital storefronts, direct customer access, logistics support, branding assistance, and fair pricing mechanisms. Middlemen often dominate the supply chain, resulting in reduced income and limited growth opportunities for women-led artisan businesses.",
          bullets: [
            "Enable women artisans to directly access regional, national, or global markets.",
            "Provide digital cataloguing and product showcasing platforms.",
            "Improve supply-chain visibility and order management.",
            "Support local language accessibility and low-digital-literacy users.",
            "Create sustainable economic opportunities for underserved artisan communities.",
          ],
        },
        {
          id: "W2",
          title: "Digital Payment Dropout Among Rural Women SHGs",
          paragraph:
            "Many rural women self-help groups (SHGs) begin adopting digital payment systems but discontinue usage due to lack of trust, poor digital literacy, inconsistent internet connectivity, language barriers, and concerns regarding fraud or transaction failures. This leads to continued dependence on cash-based systems and limited financial inclusion.",
          bullets: [
            "Simplify digital payment adoption for rural women.",
            "Improve trust and transparency in transactions.",
            "Support offline or low-connectivity environments.",
            "Offer multilingual and highly intuitive user interfaces.",
            "Educate users about digital financial safety and fraud prevention.",
            "Encourage long-term digital financial participation among SHGs.",
          ],
        },
        {
          id: "W3",
          title: "Missing Vocational Certification Pathways for Women in Unorganised Trades",
          paragraph:
            "Millions of women working in unorganised sectors such as tailoring, handicrafts, food preparation, beauty services, domestic work, and small-scale manufacturing possess practical skills but lack recognised certifications. Without formal validation of their expertise, they face limited employment opportunities, low income potential, and restricted access to financial assistance or entrepreneurship schemes.",
          bullets: [
            "Digitally assess and validate vocational skills.",
            "Provide accessible certification pathways.",
            "Connect women with training, employment, or government schemes.",
            "Maintain easy accessibility for rural and low-literacy users.",
            "Support multilingual learning and skill documentation.",
          ],
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
          id: "H1",
          title: "3.5 Crore Undiagnosed Diabetic and Hypertensive Adults in Rural India",
          paragraph:
            "A significant portion of India’s rural population suffers from undiagnosed diabetes and hypertension due to inadequate health screening infrastructure, low awareness, delayed medical intervention, and limited access to healthcare professionals. Early detection remains a major challenge in remote communities.",
          bullets: [
            "Enable early screening and risk identification.",
            "Assist community health workers in rural outreach programs.",
            "Support multilingual communication and awareness.",
            "Function effectively in low-resource environments.",
            "Improve tracking, follow-up, and preventive healthcare management.",
          ],
        },
        {
          id: "H2",
          title: "Menstrual Health Infrastructure Failure in Tribal Schools",
          paragraph:
            "Lack of menstrual hygiene awareness, inadequate sanitation facilities, social stigma, and poor access to menstrual products continue to contribute to school dropout rates among adolescent girls in tribal and rural regions. Many schools lack proper infrastructure and support systems for menstrual health management.",
          bullets: [
            "Improve menstrual health awareness and education.",
            "Support access to menstrual hygiene resources.",
            "Enable anonymous or stigma-free assistance systems.",
            "Assist schools in monitoring sanitation and infrastructure gaps.",
            "Promote continued education and wellbeing for adolescent girls.",
          ],
        },
        {
          id: "H3",
          title: "Mental Health Access Deficit",
          paragraph:
            "Mental health support remains inaccessible for a large section of the Indian population due to shortage of professionals, social stigma, lack of awareness, language barriers, and inadequate rural healthcare infrastructure. Early emotional support and intervention mechanisms are critically lacking.",
          bullets: [
            "Improve accessibility to mental health support services.",
            "Provide multilingual emotional wellness assistance.",
            "Enable anonymous and stigma-free interactions.",
            "Support community outreach and awareness programs.",
            "Assist in early identification of mental health concerns.",
          ],
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
          id: "E1",
          title: "Groundwater Depletion Emergency",
          paragraph:
            "India is facing a severe groundwater crisis due to excessive extraction, poor water management practices, climate variability, and lack of community-level monitoring systems. Several cities and districts are projected to experience critical water shortages in the coming years.",
          bullets: [
            "Monitor groundwater usage and availability.",
            "Encourage water conservation practices.",
            "Provide predictive analytics or alert systems.",
            "Support community participation in water management.",
            "Offer accessible insights for rural and urban stakeholders.",
          ],
        },
        {
          id: "E2",
          title: "Unmanaged Rural Plastic Waste",
          paragraph:
            "Rural regions in India generate significant amounts of plastic waste, but waste collection and recycling infrastructure remain highly inadequate. Poor waste segregation practices and lack of awareness contribute to environmental pollution and health risks.",
          bullets: [
            "Improve waste segregation and collection efficiency.",
            "Encourage community participation in recycling initiatives.",
            "Track waste generation and disposal patterns.",
            "Support local governance and waste management agencies.",
            "Promote sustainable and scalable rural waste management practices.",
          ],
        },
        {
          id: "E3",
          title: "Rural Air Quality Blindspot",
          paragraph:
            "Large rural populations in India are exposed to poor air quality caused by biomass burning, industrial pollution, crop residue burning, and household smoke. However, most rural areas lack affordable air-quality monitoring infrastructure and public awareness systems.",
          bullets: [
            "Enable low-cost air quality monitoring.",
            "Provide real-time environmental insights to communities.",
            "Generate alerts and awareness regarding harmful pollution levels.",
            "Support data-driven environmental decision-making.",
            "Work effectively in rural and low-connectivity regions.",
          ],
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
            data-lenis-prevent
            className="fixed inset-0 z-[100] overflow-y-auto flex flex-col items-center p-6 md:p-12 custom-scrollbar"
          >
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              onClick={() => setActive(null)}
              className="fixed inset-0 z-10 bg-slate-900/50 backdrop-blur-lg"
            />

            {/* Premium Floating Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.25 } }}
              transition={{ duration: 0.3 }}
              onClick={() => setActive(null)}
              className="fixed top-6 right-6 md:top-8 md:right-8 z-30 bg-white/95 backdrop-blur-md text-slate-900 rounded-full p-3 shadow-lg border border-slate-100 cursor-pointer hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 group focus-ring"
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
                stiffness: 150,
                damping: 24,
              }}
              style={{ willChange: "transform, opacity" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`title-${active.title}-${id}`}
              className="w-full max-w-7xl xl:max-w-[88rem] h-fit min-h-fit flex flex-col bg-white rounded-[32px] shadow-[0_40px_140px_-36px_rgba(0,0,0,0.14)] border border-slate-100 z-20 relative mb-20 overflow-hidden"
            >
              {/* Header Image */}
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="relative h-56 md:h-72 w-full flex-shrink-0 overflow-hidden"
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
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
                  transition={{ delay: 0.25, duration: 0.4 }}
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
                exit={{ opacity: 0, y: 15, transition: { duration: 0.25 } }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar"
              >
                <div className="mb-10">
                  <p className="text-slate-600 font-medium leading-relaxed text-lg italic max-w-2xl">
                    {active.description}
                  </p>
                </div>

                <div className="space-y-8 pb-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 whitespace-nowrap">
                        Problem Manifest
                      </span>
                      <div className="h-px w-full bg-slate-100" />
                    </div>
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
                              className={`inline-block text-[15px] font-black uppercase tracking-widest ${active.color} opacity-60`}
                            >
                              {ps.id.toLowerCase().replace(/(\D)(\d+)/, "$1-$2")}
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
                          <h4 className="text-md font-bold text-slate-800 leading-snug mb-3">
                            {ps.title}
                          </h4>
                          <p className="text-[10px] mt-[10px] font-semibold uppercase tracking-[0.35em] text-slate-900 pb-3">Exact Problem</p>
                          <p className="text-sm text-slate-700 leading-relaxed mb-4">
                            {ps.paragraph}
                          </p>
                          <p className="text-[10px] mt-[50px] font-semibold uppercase tracking-[0.35em]    text-slate-900">
                          We are expecting
                          </p>
                          <ul className="list-disc ml-5 mt-2 space-y-2 text-sm text-slate-700">
                            {ps.bullets.map((b, bi) => (
                              <li key={bi} className="leading-relaxed">
                                {b}
                              </li>
                            ))}
                          </ul>
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
        </header>

        {/* Domain Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
          {DOMAINS.map((domain) => (
            <motion.div
              layoutId={`card-${domain.title}-${id}`}
              key={`card-${domain.title}-${id}`}
              onClick={() => setActive(domain)}
              whileHover="hover"
              variants={{
                hover: {
                  y: -6,
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.06)",
                },
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 24,
              }}
              className="relative group cursor-pointer bg-white rounded-[28px] border border-slate-100 overflow-hidden flex flex-col justify-between h-full"
            >
              <div>
                <motion.div
                  layoutId={`image-${domain.title}-${id}`}
                  className="h-56 md:h-64 overflow-hidden relative"
                >
                  <motion.img
                    layoutId={`img-${domain.title}-${id}`}
                    src={domain.src}
                    alt={domain.title}
                    variants={{
                      hover: {
                        scale: 1.05,
                      },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/5 transition-colors duration-300" />
                  <div
                    className={`absolute top-8 left-8 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest ${domain.color} border border-white shadow-xl`}
                  >
                    Track {domain.id}
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

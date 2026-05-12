
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import Container from "../core/Container";
import { useEffect } from "react";
import Footer from "../layout/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function StagesPage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Mission Challenges | Project Sankalp";
  }, []);

  const domains = [
    {
      id: "01",
      title: "Women's Entrepreneurship",
      color: "text-blue-600",
      accent: "bg-blue-600",
      accentLight: "bg-blue-50/50",
      borderColor: "border-blue-100",
      description: "Championing gender equality by building tools for financial independence and micro-business scaling. We aim to bridge the credit gap and provide digital ecosystems for growth.",
      tags: ["Micro-Financing", "Skill Networks", "Leadership Tools"],
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
      accentLight: "bg-emerald-50/50",
      borderColor: "border-emerald-100",
      description: "Developing innovative systems for preventive healthcare, clean water access, and waste management. Focus on tech that solves basic human needs at scale.",
      tags: ["Telemedicine", "Waste Optimization", "Clean Water"],
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
      accentLight: "bg-teal-50/50",
      borderColor: "border-teal-100",
      description: "Harnessing technology to combat climate change and promote green energy transitions. Building a circular economy and tracking environmental impact.",
      tags: ["Renewable Energy", "Circular Economy", "Carbon Tracking"],
      problems: [
        { id: "Problem Statement-01", text: "Real-time carbon footprint trackers for household consumption." },
        { id: "Problem Statement-02", text: "Marketplaces for upcycled industrial waste and circular resources." },
        { id: "Problem Statement-03", text: "Community-driven reforestation monitoring using satellite imagery." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* ── Background Atmosphere ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-emerald-500/10 blur-[160px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -right-40 w-[800px] h-[800px] bg-blue-500/10 blur-[160px] rounded-full"
        />
        {/* Subtle SVG Grain */}
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container className="relative z-10 pt-32 md:pt-48 px-6 sm:px-14 lg:px-2 mx-auto ">
        {/* Navigation */}
        

        {/* Hero */}
        <header className="mb-28 max-w-4xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[1px] bg-emerald-500" />
              <span className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px]">
                Mission Objectives
              </span>
            </div>
            <h1 className="font-serif text-6xl md:text-[88px] font-black tracking-tight text-slate-900 mb-8 leading-[0.9]">
              Global <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 italic">
                Challenges.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl font-medium leading-relaxed border-l-2 border-slate-200 pl-6">
              We’ve identified three critical domains where technology can create the most profound impact. Choose your mission and solve the problem statements listed below.
            </p>
          </motion.div>
        </header>

        {/* Domain Challenges */}
        <main className="space-y-24 sm:space-y-32 md:space-y-40">
          {domains.map((domain, idx) => (
            <motion.section
              key={domain.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={idx}
              className={`
                relative overflow-hidden rounded-[32px]
                border border-slate-200 bg-white/70 backdrop-blur-sm
                px-6 py-12
                sm:px-8 sm:py-16
                md:px-16 md:py-20
                lg:px-24 lg:py-25
                xl:px-20 xl:py-25
                transition-all duration-500
                hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50
              `}
            >
              <div className={`
                flex flex-col gap-16
                sm:gap-20
                md:gap-24
                lg:gap-28
                xl:gap-36
                md:flex-row
                ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}
              `}>
                {/* LEFT SIDE */}
                <div className="flex-1 min-w-0">
                  {/* meta */}
                  <div className="mb-10 flex items-center gap-4">
                    <div className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest`}>
                      Mission {domain.id}
                    </div>
                    <span className="h-px w-8 bg-slate-200" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest line-clamp-1">
                      {domain.tags.join(" · ")}
                    </span>
                  </div>

                  {/* title */}
                  <h2 className="
                    text-4xl
                    sm:text-5xl
                    md:text-6xl
                    font-serif
                    font-black
                    leading-[0.95]
                    tracking-tight
                    text-slate-900
                  ">
                    {domain.title}
                  </h2>

                  {/* description */}
                  <p className="
                    mt-10
                    text-base
                    sm:text-lg
                    leading-relaxed
                    text-slate-500
                    font-medium
                    max-w-md
                  ">
                    {domain.description}
                  </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex-[1.2] min-w-0 md:flex-[1.4] relative">
                  {/* Visual Separator - Vertical on Desktop, Horizontal on Mobile */}
                  <div className={`
                    absolute 
                    -top-8 -left-12 bottom-0 w-px bg-slate-200 hidden md:block
                    ${idx % 2 === 1 ? "left-auto -right-12" : ""}
                  `} />
                  <div className="h-px w-full bg-slate-100 border-t border-dashed border-slate-200 md:hidden mb-16" />

                  {/* section label */}
                  <div className="mb-10 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                      Problem Statements
                    </span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      {domain.problems.length} items
                    </span>
                  </div>

                  {/* problems */}
                  <ul className="space-y-0">
                    {domain.problems.map((ps) => (
                      <li
                        key={ps.id}
                        className="
                          group/item
                          flex items-start gap-6
                          border-b border-slate-100
                          py-8
                          last:border-b-0
                          last:pb-0
                        "
                      >
                        {/* id */}
                        <span className={`
                          min-w-[56px]
                          pt-1
                          font-black
                          text-[10px]
                          tracking-[0.2em]
                          ${domain.color}
                          flex-shrink-0
                        `}>
                          {ps.id}
                        </span>

                        {/* content */}
                        <div className="flex-1 min-w-0">
                          <p className="
                            text-base
                            sm:text-lg
                            leading-relaxed
                            text-slate-700
                            transition-colors duration-200
                            group-hover/item:text-slate-900
                            font-medium
                          ">
                            {ps.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          ))}
        </main>
      </Container>
      <div className="px-6">

        <motion.footer
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-48"
        >
          <div
            className="
              relative overflow-hidden
              rounded-[32px]
              border border-zinc-200
              bg-white
              px-8 py-16
              md:px-20 md:py-24
              xl:px-20 xl:py-20
              transition-colors duration-300
              hover:border-zinc-300
              xl:mx-28 xl:my-28
            "
            style={{
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
            }}
          >
            {/* subtle top border accent */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />

            {/* background texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
              <div className="absolute -top-24 right-0 h-[320px] w-[320px] rounded-full border border-zinc-400" />
              <div className="absolute bottom-0 left-[-120px] h-[240px] w-[240px] rounded-full border border-zinc-400" />
            </div>

            <div className="relative z-10 flex flex-col gap-20 xl:flex-row xl:items-end xl:justify-between">
              
              {/* LEFT CONTENT */}
              <div className="max-w-3xl">
                
                {/* label */}
                <div className="mb-10 flex items-center gap-4">
                  <span className="text-[11px] font-medium tracking-wide text-zinc-400">
                    Final Step
                  </span>

                  <span className="h-[3px] w-[3px] rounded-full bg-zinc-300" />

                  <span className="text-[11px] text-zinc-400">
                    Applications Open
                  </span>
                </div>

                {/* heading */}
                <h2
                  className="
                    max-w-[11ch]
                    text-5xl
                    font-semibold
                    leading-[0.92]
                    tracking-[-0.055em]
                    text-zinc-950
                    md:text-7xl
                  "
                >
                  Build work that
                  <span className="block text-emerald-400">
                    actually matters.
                  </span>
                </h2>

                {/* description */}
                <p
                  className="
                    mt-10
                    max-w-[36ch]
                    text-[17px]
                    leading-8
                    text-zinc-600
                    md:text-[18px]
                  "
                >
                  Collaborate with ambitious builders, solve meaningful
                  challenges, and transform ideas into products with
                  measurable impact.
                </p>
              </div>

              {/* RIGHT CTA */}
              <div className="flex flex-col items-start gap-8 xl:items-end">
                
                {/* stats */}
                <div className="flex items-center gap-10">
                  <div>
                    <p className="text-3xl font-semibold tracking-tight text-zinc-950">
                      500+
                    </p>
                    <p className="mt-1 text-[12px] text-zinc-400">
                      Participants
                    </p>
                  </div>

                  <div className="h-10 w-px bg-zinc-200" />

                  <div>
                    <p className="text-3xl font-semibold tracking-tight text-zinc-950">
                      48h
                    </p>
                    <p className="mt-1 text-[12px] text-zinc-400">
                      Innovation Sprint
                    </p>
                  </div>
                </div>

                {/* button */}
                <button
                  onClick={() =>
                    window.open(
                      "https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755",
                      "_blank"
                    )
                  }
                  className="
                    group
                    inline-flex items-center gap-4
                    rounded-full
                    border border-zinc-300
                    bg-zinc-950
                    px-8 py-4
                    text-[12px]
                    font-medium
                    tracking-wide
                    text-white
                    transition-all duration-200
                    hover:bg-zinc-900
                    hover:border-zinc-950
                    active:scale-[0.98]
                  "
                >
                  Start Your Mission

                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
      <Footer />
    </div>
  );
}

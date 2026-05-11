import { motion } from "framer-motion";
import Container from "../core/Container";
import { useEffect } from "react";

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
      borderColor: "border-blue-100",
      description: "Championing gender equality by building tools for financial independence and micro-business scaling. We aim to bridge the credit gap and provide digital ecosystems for growth.",
      tags: ["Micro-Financing", "Skill Networks", "Leadership Tools"],
      problems: [
        { id: "PS-01", text: "Decentralized marketplaces for rural artisans to scale global reach." },
        { id: "PS-02", text: "AI-driven financial literacy platforms for women-led startups." },
        { id: "PS-03", text: "P2P micro-lending systems with community-based trust scoring." }
      ]
    },
    {
      id: "02",
      title: "Health & Sanitation",
      color: "text-emerald-600",
      accent: "bg-emerald-600",
      borderColor: "border-emerald-100",
      description: "Developing innovative systems for preventive healthcare, clean water access, and waste management. Focus on tech that solves basic human needs at scale.",
      tags: ["Telemedicine", "Waste Optimization", "Clean Water"],
      problems: [
        { id: "PS-01", text: "Predictive analysis of water-borne diseases in urban settlements." },
        { id: "PS-02", text: "Smart waste management systems for decentralized municipalities." },
        { id: "PS-03", text: "Mobile-first diagnostic tools for rural maternal healthcare." }
      ]
    },
    {
      id: "03",
      title: "Climate Action",
      color: "text-teal-600",
      accent: "bg-teal-600",
      borderColor: "border-teal-100",
      description: "Harnessing technology to combat climate change and promote green energy transitions. Building a circular economy and tracking environmental impact.",
      tags: ["Renewable Energy", "Circular Economy", "Carbon Tracking"],
      problems: [
        { id: "PS-01", text: "Real-time carbon footprint trackers for household consumption." },
        { id: "PS-02", text: "Marketplaces for upcycled industrial waste and circular resources." },
        { id: "PS-03", text: "Community-driven reforestation monitoring using satellite imagery." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-blue-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-40 overflow-x-hidden">
      {/* Animated Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] animate-pulse" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-emerald-200/40 via-blue-200/30 to-white rounded-full blur-3xl opacity-60 animate-float" />
        <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-100/40 via-emerald-100/30 to-white rounded-full blur-2xl opacity-40 animate-float" style={{animationDelay: '1.5s'}} />
      </div>

      <Container className="relative z-10 pt-32 md:pt-48 px-6 sm:px-10 lg:px-20 mx-auto max-w-[1400px]">
        {/* Navigation */}
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all mb-24 group cursor-pointer border-none bg-transparent p-0"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">← Back to Hub</span>
        </button>

        {/* Hero */}
        <div className="max-w-5xl mb-48">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-1 bg-slate-900" />
              <span className="text-slate-900 font-black uppercase tracking-[0.5em] text-[10px]">
                Mission Objectives
              </span>
            </div>

            <h1 className="text-6xl md:text-[120px] font-serif font-black mb-12 leading-[0.8] tracking-tighter text-slate-900 drop-shadow-xl">
              Global <br />
              <span className="italic text-emerald-500">Challenges.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-4xl font-medium border-l-8 border-emerald-400 pl-10 bg-white/60 backdrop-blur-sm rounded-2xl py-6">
              We've identified three critical domains where technology can create the most profound impact. Choose your mission and solve the problem statements listed below.
            </p>
          </motion.div>
        </div>

        {/* Domain Challenges - With Proper Partitions */}
        <div className="space-y-40">
          {domains.map((domain, idx) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
              className={`relative border-2 ${domain.borderColor} glass-effect rounded-[60px] overflow-hidden p-12 md:p-20 lg:p-24 shadow-xl backdrop-blur-md`}
            >
              {/* Domain Header Row */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
                <div className="max-w-4xl">
                  <div className="flex items-center gap-4 mb-8">
                    <span className={`${domain.color} text-[12px] font-black uppercase tracking-[0.6em]`}>
                      Mission {domain.id}
                    </span>
                    <div className={`h-px w-12 ${domain.accent} opacity-20`} />
                  </div>
                  <h2 className="text-5xl md:text-8xl font-serif font-black text-slate-900 tracking-tighter mb-6 leading-none">
                    {domain.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {domain.tags.map((tag) => (
                      <span key={tag} className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold shadow-sm border border-emerald-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-slate-600 mb-2 font-medium">
                    {domain.description}
                  </p>
                </div>
              </div>

              {/* Problem Statements Arena */}
              <div className="bg-white/80 rounded-[48px] p-12 md:p-16 border border-slate-100 shadow-inner backdrop-blur-md">
                <div className="flex items-center gap-8 mb-16">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.8em] text-slate-900 shrink-0">
                    Targeted Problem Statements
                  </h3>
                  <div className={`h-[2px] flex-1 ${domain.accent} opacity-10`} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {domain.problems.map((ps) => (
                    <motion.div
                      key={ps.id}
                      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(16,185,129,0.12)' }}
                      className="group relative flex flex-col justify-between bg-white/90 rounded-3xl p-8 border border-slate-100 shadow hover:shadow-lg transition-all duration-200"
                    >
                      <div>
                        <div className="mb-8">
                          <span className={`${domain.color} text-[10px] font-black tracking-[0.4em] uppercase border-b-2 ${domain.borderColor} pb-2`}>
                            {ps.id}
                          </span>
                        </div>
                        <p className="text-2xl md:text-3xl font-black text-slate-900 leading-[1.1] tracking-tight">
                          {ps.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div
          className="mt-64 relative rounded-[80px] bg-slate-900 p-20 md:p-40 text-center overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative z-10 max-w-4xl mx-auto space-y-16">
            <h2 className="text-6xl md:text-[130px] font-serif font-black leading-[0.8] text-white tracking-tighter drop-shadow-xl">
              Commit to <br />
              <span className="italic text-emerald-400 text-[0.8em]">Innovation.</span>
            </h2>

            <p className="text-white/40 font-medium text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
              Your journey from ideation to impact starts with a single click. Join 500+ innovators building for a better tomorrow.
            </p>

            <motion.button
              whileHover={{ scale: 1.07, backgroundColor: '#34d399', color: '#fff' }}
              onClick={() => window.open("https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755", "_blank")}
              className="bg-white text-slate-900 px-20 py-8 rounded-full text-xs font-black uppercase tracking-[0.5em] hover:bg-emerald-400 transition-all cursor-pointer border-none shadow-lg"
            >
              Start Your Mission
            </motion.button>
          </div>
        </motion.div>

        <div className="mt-32 flex flex-col items-center gap-6 opacity-20 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.5em]">Project Sankalp _ 2026</p>
        </div>
      </Container>
    </div>
  );
}

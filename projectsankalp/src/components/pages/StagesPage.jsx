import { motion } from "framer-motion";
import {
  ArrowLeft,
  Target,
  Users,
  Zap,
  Sparkles,
} from "lucide-react";
import Container from "../core/Container";
import { useEffect } from "react";

export default function StagesPage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Problem Statements | Project Sankalp";
  }, []);

  const domainTracks = [
    {
      title: "Women's Entrepreneurship",
      subtitle: "Economic Empowerment",
      icon: <Users className="w-6 h-6 text-blue-600" />,
      color: "blue",
      description: "Championing gender equality by building tools for financial independence and micro-business scaling.",
      problems: [
        "Decentralized marketplaces for rural artisans to scale global reach.",
        "AI-driven financial literacy platforms for women-led startups.",
        "P2P micro-lending systems with community-based trust scoring.",
      ],
    },
    {
      title: "Health & Sanitation",
      subtitle: "Community Wellbeing",
      icon: <Target className="w-6 h-6 text-emerald-600" />,
      color: "emerald",
      description: "Developing innovative systems for preventive healthcare, clean water access, and waste management.",
      problems: [
        "Predictive analysis of water-borne diseases in urban settlements.",
        "Smart waste management systems for decentralized municipalities.",
        "Mobile-first diagnostic tools for rural maternal healthcare.",
      ],
    },
    {
      title: "Climate Action",
      subtitle: "Sustainability",
      icon: <Zap className="w-6 h-6 text-teal-600" />,
      color: "teal",
      description: "Harnessing technology to combat climate change and promote green energy transitions.",
      problems: [
        "Real-time carbon footprint trackers for household consumption.",
        "Marketplaces for upcycled industrial waste and circular resources.",
        "Community-driven reforestation monitoring using satellite imagery.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-24">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-emerald-500/5 rounded-full blur-[150px] -mr-500" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px] -ml-400" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      <Container className="relative z-10 pt-32 md:pt-40 px-6 sm:px-10 lg:px-20 mx-auto">
        {/* Back Button */}
        <motion.a
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-colors mb-12 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center bg-slate-50 group-hover:border-slate-300 group-hover:bg-slate-100 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Back to Hub
          </span>
        </motion.a>

        {/* Header */}
        <div className="max-w-4xl mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-emerald-500" />
            <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[11px]">
              Problem Domains
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-serif font-black mb-8 leading-[0.9] tracking-tight text-slate-900"
          >
            Mission <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 italic">Challenges.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl font-medium border-l-2 border-slate-100 pl-6"
          >
            Select a domain and dive into real-world challenges. We're looking for solutions that are scalable, sustainable, and built for real impact.
          </motion.p>
        </div>

        {/* Domain Challenges Grid */}
        <div className="space-y-12 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {domainTracks.map((track, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white border border-slate-100 rounded-[32px] p-8 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3 rounded-2xl bg-${track.color}-50 border border-${track.color}-100`}>
                    {track.icon}
                  </div>
                  <div>
                    <span className={`text-${track.color}-600 text-[9px] font-black uppercase tracking-[0.2em] block mb-1`}>
                      {track.subtitle}
                    </span>
                    <h3 className="text-xl font-serif font-black text-slate-900 leading-tight">
                      {track.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
                  {track.description}
                </p>

                <div className="space-y-4 mt-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={12} className="text-emerald-500" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      Problem Statements
                    </p>
                  </div>
                  {track.problems.map((prob, i) => (
                    <div key={i} className="flex gap-3 items-start group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-2 shrink-0 group-hover/item:bg-emerald-500 transition-colors" />
                      <p className="text-[13px] font-bold text-slate-600 leading-relaxed group-hover/item:text-slate-900 transition-colors">
                        {prob}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Subtle highlight */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${track.color}-500/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700`} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 md:p-24 rounded-[60px] bg-slate-50 border border-slate-200 text-center relative overflow-hidden group hover:border-emerald-200 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif font-black leading-tight text-slate-900">
              Ready to <span className="text-emerald-600 italic">Build</span> the Future?
            </h2>
            <p className="text-slate-500 font-medium text-lg">
              Pick your challenge and start your journey. Registration is open until May 15th.
            </p>
            <a
              className="inline-block bg-emerald-600 text-white px-12 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.4em] hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/20 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755",
                  "_blank",
                )
              }
            >
              Register on Unstop
            </a>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

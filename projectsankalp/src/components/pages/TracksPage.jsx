import { motion } from "framer-motion";
import { ArrowLeft, Users, Heart, Sprout, CheckCircle2, ChevronRight, Zap, Globe, Sparkles } from "lucide-react";
import Container from "../core/Container";
import { useEffect } from "react";

export default function TracksPage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tracks = [
    {
      id: "Track_01",
      title: "Women’s Entrepreneurship",
      subtitle: "Economic Empowerment",
      description: "Championing gender equality by building tools for financial independence. This track focuses on creating digital ecosystems that empower women to launch, manage, and scale their businesses effectively.",
      accent: "#3B82F6", // Blue
      focus: [
        { title: "Micro-Financing", desc: "Build transparent lending platforms for female entrepreneurs." },
        { title: "Skill Networks", desc: "Connect mentors with aspiring leaders across the globe." }
      ],
      impact: "Projected to bridge the $1.7 trillion gender credit gap."
    },
    {
      id: "Track_02",
      title: "Health & Sanitation",
      subtitle: "Community Wellbeing",
      description: "Developing innovative systems for preventive healthcare and clean water. This track invites you to solve the most pressing challenges in public health through technology and data.",
      accent: "#14B8A6", // Teal
      focus: [
        { title: "Rural Telemedicine", desc: "Bridging the gap between specialists and rural patients." },
        { title: "Sanitation Monitoring", desc: "IoT solutions for clean water and waste management." }
      ],
      impact: "Targeting improved access for 100M+ underserved individuals."
    },
    {
      id: "Track_03",
      title: "Climate Action",
      subtitle: "Environmental Sustainability",
      description: "Harnessing technology to combat climate change and promote green energy. Build the tools that will help us transition to a sustainable, circular economy.",
      accent: "#10b981", // Emerald
      focus: [
        { title: "Carbon Tracking", desc: "Precision tools for measuring and reducing footprints." },
        { title: "Circular Economy", desc: "Marketplaces for waste-to-resource transformation." }
      ],
      impact: "Aimed at accelerating global Net-Zero targets by 2050."
    }
  ];

  const registerUrl = "https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755";

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30 pb-24 overflow-hidden">
      {/* Premium Dark Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#3B82F6]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#10B981]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(20, 184, 165, 0.19)_0%,transparent_70%)]" />
      </div>

      <Container className="relative z-10 pt-32 md:pt-40">
        {/* Back Navigation */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 text-white/40 hover:text-white transition-colors mb-20 group"
        >
          <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-xl">
            <ArrowLeft size={20} />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.4em]">Back to the Web</span>
        </motion.button>

        {/* Header */}
        <div className="max-w-4xl mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-[#14B8A6]" />
            <span className="text-[#14B8A6] font-black uppercase tracking-[0.5em] text-[11px]">Mission Hub</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-7xl font-serif font-black mb-10 leading-[0.85] tracking-tight text-white"
          >
            Track <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#14B8A6] to-[#10B981] italic">Explanation </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 leading-relaxed max-w-3xl font-medium"
          >
            A technical breakdown of our focus areas. Each track is built for maximum real-world integration.
          </motion.p>
        </div>

        {/* Hardcoded Stable Cards */}
        <div className="grid grid-cols-1 gap-12 mb-40">
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0f172a]/80 backdrop-blur-3xl p-8 md:p-16 shadow-2xl"
            >
              <div className="flex flex-col lg:flex-row gap-16 lg:items-start relative z-10">
                {/* Left Identity Section */}
                <div className="lg:w-1/3 space-y-12">
                  <div className="space-y-2">
                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 block">
                      {track.id}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-black text-white leading-[1.1] tracking-tight">
                      {track.title}
                    </h2>
                  </div>

                  <div 
                    className="inline-block px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/10"
                    style={{ color: track.accent, backgroundColor: `${track.accent}10` }}
                  >
                    {track.subtitle}
                  </div>
                </div>

                {/* Right Content Section */}
                <div className="lg:w-2/3 space-y-12">
                  <p className="text-lg text-white/60 font-medium leading-relaxed max-w-2xl">
                    {track.description}
                  </p>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {track.focus.map((item, i) => (
                      <div key={i} className="p-8 rounded-[24px] bg-white/5 border border-white/5 group/item transition-colors hover:border-white/10">
                        <h4 className="text-[14px] font-black uppercase tracking-[0.2em] text-white/90 mb-4 flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: track.accent }} />
                          {item.title}
                        </h4>
                        <p className="text-[14px] text-white/40 leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Highlight Box */}
                  <div 
                    className="p-10 rounded-[24px] border border-white/10 bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles size={16} style={{ color: track.accent }} />
                      <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-white/40">Success Metric</h4>
                    </div>
                    <p className="text-2xl font-serif font-black italic text-white/90">
                      "{track.impact}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[48px] overflow-hidden border border-white/10 bg-[#0f172a] p-12 md:p-24 text-center space-y-12 shadow-2xl"
        >
          <div className="relative z-10 max-w-2xl mx-auto space-y-10">
            <h2 className="text-5xl md:text-8xl font-serif font-black leading-none tracking-tight text-white">
              Ready to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#10B981] italic">Apply?</span>
            </h2>
            
            <p className="text-white/40 text-xl md:text-2xl font-medium">
              Join the movement and build the future today.
            </p>

            <button 
              onClick={() => window.open(registerUrl, "_blank")}
              className="bg-white text-[#020617] px-16 py-6 rounded-full text-[14px] font-black uppercase tracking-[0.5em] hover:scale-105 active:scale-95 transition-all shadow-2xl mx-auto block"
            >
              Register Now
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

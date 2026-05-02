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
      icon: <Users size={32} />,
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
      icon: <Heart size={32} />,
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
      icon: <Sprout size={32} />,
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
      {/* Premium Dark Background with Layered Glows */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#3B82F6]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#10B981]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(20, 184, 165, 0.19)_0%,transparent_70%)]" />
        
        {/* Subtle Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <Container className="relative z-10 pt-32 md:pt-40">
        {/* Back Navigation */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 text-white/40 hover:text-white transition-colors mb-20 group"
        >
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all bg-white/5 backdrop-blur-xl">
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
            <span className="text-[#14B8A6] font-black uppercase tracking-[0.5em] text-[11px]">System Protocols</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-serif font-black mb-10 leading-[0.85] tracking-tight text-white md:mr-32 "
          >
            Track
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#14B8A6] to-[#10B981] italic">Explanation</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 leading-relaxed max-w-3xl font-medium"
          >
            Select a core domain to begin your synthesis. Every directive is optimized for high-velocity social impact and technical scalability.
          </motion.p>
        </div>

        {/* Premium Glassmorphism Tracks */}
        <div className="grid grid-cols-1 gap-12 mb-40">
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.01 }}
              className="group relative"
            >
              {/* Layered Gradient Glow - Behind Card */}
              <div 
                className="absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-[60px] -z-10"
                style={{ backgroundColor: track.accent }}
              />

              <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-3xl p-8 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] group-hover:border-white/20">
                {/* Inner Gradient Flash */}
                <div 
                  className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 blur-[100px] -mr-64 -mt-64"
                  style={{ backgroundColor: track.accent }}
                />

                <div className="flex flex-col lg:flex-row gap-16 lg:items-start relative z-10">
                  {/* Left Identity Section */}
                  <div className="lg:w-1/3 space-y-8">
                    <div className="space-y-6">
                      <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 block">
                        {track.id}
                      </span>
                      <div 
                        className="w-20 h-20 rounded-[28px] flex items-center justify-center border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 bg-white/5 backdrop-blur-md"
                      >
                        <div style={{ color: track.accent }}>
                          {track.icon}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-5xl font-serif font-black text-white leading-[1.1] tracking-tight">
                        {track.title}
                      </h2>
                      <div 
                        className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/5"
                        style={{ color: track.accent, backgroundColor: `${track.accent}10` }}
                      >
                        {track.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Right Content Section */}
                  <div className="lg:w-2/3 space-y-12">
                    <p className="text-xl text-white/60 font-medium leading-relaxed max-w-2xl">
                      {track.description}
                    </p>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {track.focus.map((item, i) => (
                        <div key={i} className="p-8 rounded-[32px] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all duration-300 group/item">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                              <Zap size={14} style={{ color: track.accent }} />
                            </div>
                            <h4 className="text-[14px] font-black uppercase tracking-[0.2em] text-white/90">{item.title}</h4>
                          </div>
                          <p className="text-[14px] text-white/40 leading-relaxed font-medium">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Highlight Box */}
                    <motion.div 
                      whileHover={{ x: 10 }}
                      className="p-10 rounded-[32px] flex flex-col md:flex-row md:items-center justify-between gap-8 border border-white/10 relative overflow-hidden group/impact"
                    >
                      <div className="absolute inset-0 opacity-10" style={{ background: `linear-gradient(135deg, ${track.accent}, transparent)` }} />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <Sparkles size={16} style={{ color: track.accent }} />
                          <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-white/40">Success Metric</h4>
                        </div>
                        <p className="text-2xl font-serif font-black italic text-white/90">
                          "{track.impact}"
                        </p>
                      </div>
                      <div className="relative z-10">
                        <div 
                          className="w-14 h-14 rounded-full flex items-center justify-center border border-white/20 transition-all duration-500 group-hover/impact:bg-white group-hover/impact:text-black"
                          style={{ color: track.accent }}
                        >
                          <ChevronRight size={24} />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global CTA - Final Protocol */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[60px] overflow-hidden border border-white/10 bg-[#020617] group/final"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/20 via-[#14B8A6]/10 to-transparent opacity-50" />
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#3B82F6]/20 rounded-full blur-[150px] -mr-500 -mt-500" />
          
          <div className="relative z-10 p-12 md:p-24 text-center space-y-12">
            <div className="flex items-center justify-center gap-4">
              <Globe size={24} className="text-[#10B981] animate-pulse" />
              <span className="text-[12px] font-black uppercase tracking-[0.6em] text-white/40">Transmission Ready</span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-serif font-black leading-none tracking-tight text-white">
              Launch Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#10B981] italic">Sankalp.</span>
            </h2>
            
            <p className="text-white/40 text-xl md:text-2xl font-medium max-w-2xl mx-auto">
              The protocol is active. Join the ranks of 500+ global innovators building the future.
            </p>

            <button 
              onClick={() => window.open(registerUrl, "_blank")}
              className="group/btn flex items-center justify-center gap-6 bg-white text-[#020617] px-16 py-6 rounded-full text-[14px] font-black uppercase tracking-[0.5em] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.15)] mx-auto overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-4">
                Execute Registration <ChevronRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-emerald-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

import { motion } from "framer-motion";
import { ArrowLeft, Users, Heart, Sprout, CheckCircle2, ChevronRight, Zap, Globe, Sparkles } from "lucide-react";
import Container from "../core/Container";

export default function TracksPage({ onBack }) {
  const tracks = [
    {
      id: "TRACK 01",
      title: "Women’s Entrepreneurship",
      subtitle: "Economic Empowerment",
      description: "Championing gender equality by building tools for financial independence. This track focuses on creating digital ecosystems that empower women to launch, manage, and scale their businesses effectively.",
      icon: <Users size={32} className="text-blue-600" />,
      color: "blue",
      focus: [
        { title: "Micro-Financing", desc: "Build transparent lending platforms for female entrepreneurs." },
        { title: "Skill Networks", desc: "Connect mentors with aspiring leaders across the globe." },
        { title: "AI Advisors", desc: "Smart assistants for business planning and financial tracking." }
      ],
      impact: "Projected to bridge the $1.7 trillion gender credit gap."
    },
    {
      id: "TRACK 02",
      title: "Health & Sanitation",
      subtitle: "Community Wellbeing",
      description: "Developing innovative systems for preventive healthcare and clean water. This track invites you to solve the most pressing challenges in public health through technology and data.",
      icon: <Heart size={32} className="text-emerald-600" />,
      color: "emerald",
      focus: [
        { title: "Rural Telemedicine", desc: "Bridging the gap between specialists and rural patients." },
        { title: "Sanitation Monitoring", desc: "IoT solutions for clean water and waste management." },
        { title: "Wellness Data", desc: "Predictive modeling for community health outbreaks." }
      ],
      impact: "Targeting improved access for 100M+ underserved individuals."
    },
    {
      id: "TRACK 03",
      title: "Climate Action",
      subtitle: "Environmental Sustainability",
      description: "Harnessing technology to combat climate change and promote green energy. Build the tools that will help us transition to a sustainable, circular economy.",
      icon: <Sprout size={32} className="text-green-600" />,
      color: "green",
      focus: [
        { title: "Carbon Tracking", desc: "Precision tools for measuring and reducing footprints." },
        { title: "Circular Economy", desc: "Marketplaces for waste-to-resource transformation." },
        { title: "Green Energy", desc: "Software for optimizing renewable energy distribution." }
      ],
      impact: "Aimed at accelerating global Net-Zero targets by 2050."
    }
  ];

  const registerUrl = "https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 selection:bg-blue-200/30 pb-24">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-500/5 rounded-full blur-[180px] -mr-500 -mt-500" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] -ml-400 -mb-400" />
      </div>

      <Container className="relative z-10 pt-32 md:pt-40">
        {/* Back Navigation */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 text-primary/40 hover:text-primary transition-colors mb-16 group"
        >
          <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center group-hover:border-primary/20 transition-all bg-white/80 shadow-sm backdrop-blur-md">
            <ArrowLeft size={20} />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.4em]">Back to Mission Hub</span>
        </motion.button>

        {/* Header */}
        <div className="max-w-3xl mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-blue-600" />
            <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[11px]">Mission Tracks</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-serif font-black mb-8 leading-[0.9] tracking-tight text-primary"
          >
            Choose Your <br />
            <span className="text-blue-600 italic">Impact.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl font-medium"
          >
            Three critical domains. Infinite possibilities. Select the track that resonates with your vision and build a solution that truly matters.
          </motion.p>
        </div>

        {/* Tracks Detailed Grid */}
        <div className="grid grid-cols-1 gap-8 md:gap-12 mb-32">
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative overflow-hidden rounded-[40px] border border-white bg-white/70 backdrop-blur-xl p-8 md:p-12 shadow-2xl shadow-black/5 hover:shadow-blue-500/10 transition-all duration-500"
            >
              {/* Card Accent Gradient */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-${track.color}-500/5 blur-[80px] -mr-32 -mt-32 transition-colors group-hover:bg-${track.color}-500/10`} />

              <div className="flex flex-col lg:flex-row gap-12 lg:items-center relative z-10">
                {/* Left: Identity */}
                <div className="lg:w-1/3 space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/30 block">
                    {track.id}
                  </span>
                  <div className="w-16 h-16 rounded-[24px] bg-white shadow-inner flex items-center justify-center border border-primary/5">
                    {track.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-serif font-black text-primary leading-tight">
                      {track.title}
                    </h2>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mt-2 block">
                      {track.subtitle}
                    </span>
                  </div>
                </div>

                {/* Right: Detailed Content */}
                <div className="lg:w-2/3 space-y-10">
                  <p className="text-lg text-text-secondary font-medium leading-relaxed">
                    {track.description}
                  </p>

                  {/* Focus Points Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {track.focus.map((item, i) => (
                      <div key={i} className="p-6 rounded-[24px] bg-white/50 border border-white shadow-sm hover:bg-white transition-colors group/item">
                        <div className="flex items-center gap-3 mb-3">
                          <Zap size={14} className="text-blue-600" />
                          <h4 className="text-[13px] font-black uppercase tracking-widest text-primary">{item.title}</h4>
                        </div>
                        <p className="text-[12px] text-text-secondary leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                    
                    {/* Impact Box */}
                    <div className="p-6 rounded-[24px] bg-primary text-white shadow-xl shadow-primary/20 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <Sparkles size={14} className="text-emerald-400" />
                        <h4 className="text-[13px] font-black uppercase tracking-widest text-white/70">Potential Impact</h4>
                      </div>
                      <p className="text-[14px] font-bold leading-snug italic">
                        "{track.impact}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 md:p-24 rounded-[60px] bg-primary text-white relative overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-blue-900 opacity-90" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] -mr-400" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-10">
            <div className="flex items-center justify-center gap-3">
              <Globe size={20} className="text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60">Final Call for Innovators</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-black leading-tight tracking-tight">
              Ready to Submit Your <br />
              <span className="text-emerald-400 italic">Sankalp?</span>
            </h2>
            
            <p className="text-white/60 text-lg font-medium">
              Don't let your ideas remain just thoughts. Join 500+ builders and turn your vision into a high-impact reality.
            </p>

            <button 
              onClick={() => window.open(registerUrl, "_blank")}
              className="group/final flex items-center justify-center gap-4 bg-white text-primary px-12 py-5 rounded-full text-[13px] font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10 mx-auto"
            >
              Register on Unstop <ChevronRight size={16} className="group-hover/final:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

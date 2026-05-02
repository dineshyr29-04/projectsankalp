import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, ArrowUpRight } from "lucide-react";
import Container from "../core/Container";
import { useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function TracksPage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tracks = [
    {
      id: "Track 01",
      title: "Women's Entrepreneurship",
      subtitle: "Economic Empowerment",
      description:
        "Championing gender equality by building tools for financial independence. Create digital ecosystems that empower women to launch, manage, and scale their businesses effectively.",
      accent: "#3B82F6",
      accentLight: "rgba(59,130,246,0.08)",
      accentBorder: "rgba(59,130,246,0.15)",
      focus: [
        {
          title: "Micro-Financing",
          desc: "Build transparent lending platforms for female entrepreneurs.",
        },
        {
          title: "Skill Networks",
          desc: "Connect mentors with aspiring leaders across the globe.",
        },
      ],
      impact: "Projected to bridge the $1.7 trillion gender credit gap.",
    },
    {
      id: "Track 02",
      title: "Health & Sanitation",
      subtitle: "Community Wellbeing",
      description:
        "Developing innovative systems for preventive healthcare and clean water. Solve the most pressing challenges in public health through technology and data.",
      accent: "#14B8A6",
      accentLight: "rgba(20,184,166,0.08)",
      accentBorder: "rgba(20,184,166,0.15)",
      focus: [
        {
          title: "Rural Telemedicine",
          desc: "Bridging the gap between specialists and rural patients.",
        },
        {
          title: "Sanitation Monitoring",
          desc: "IoT solutions for clean water and waste management.",
        },
      ],
      impact: "Targeting improved access for 100M+ underserved individuals.",
    },
    {
      id: "Track 03",
      title: "Climate Action",
      subtitle: "Environmental Sustainability",
      description:
        "Harnessing technology to combat climate change and promote green energy. Build tools that help transition to a sustainable, circular economy.",
      accent: "#10B981",
      accentLight: "rgba(16,185,129,0.08)",
      accentBorder: "rgba(16,185,129,0.15)",
      focus: [
        {
          title: "Carbon Tracking",
          desc: "Precision tools for measuring and reducing footprints.",
        },
        {
          title: "Circular Economy",
          desc: "Marketplaces for waste-to-resource transformation.",
        },
      ],
      impact: "Aimed at accelerating global Net-Zero targets by 2050.",
    },
  ];

  const registerUrl =
    "https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755";

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* ── Background Atmosphere ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-emerald-500/10 blur-[140px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-blue-500/10 blur-[140px] rounded-full"
        />
        {/* Grain - Much smoother */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container className="relative z-10 px-6 sm:px-10 lg:px-20 pt-32 pb-32">
        {/* ── Back Button ── */}
        <motion.button
          onClick={onBack}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-colors group mb-16"
        >
          <div className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center bg-slate-50 group-hover:border-slate-300 group-hover:bg-slate-100 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.4em]">
            Back to Website
          </span>
        </motion.button>

        {/* ── Hero Header ── */}
        <div className="mb-24 max-w-5xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-10 h-[1px] bg-emerald-500" />
            <span className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px]">
              Problem Tracks
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-6xl sm:text-7xl md:text-[88px] font-serif font-black leading-[0.88] tracking-tight text-slate-900 mb-8"
          >
            Build For <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 italic">
              Real Impact.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl border-l-2 border-slate-200 pl-6"
          >
            Three carefully chosen challenge areas, each addressing a critical societal need.
            Choose your track and build technology that matters.
          </motion.p>
        </div>

        {/* ── Track Cards ── */}
        <div className="space-y-8 mb-24">
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={index}
              className="relative group rounded-[28px] overflow-hidden border border-slate-100 bg-white transition-all duration-500 hover:border-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-900/[0.03]"
            >
              {/* Accent Left Bar */}
              <div
                className="absolute left-0 top-0 w-[3px] h-full rounded-l-full transition-all duration-500"
                style={{ backgroundColor: track.accent }}
              />

              {/* Card Hover Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(800px circle at 0% 50%, ${track.accentLight}, transparent)`,
                }}
              />

              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                  {/* Left Column */}
                  <div className="lg:w-[340px] flex-shrink-0 space-y-8">
                    {/* Track ID */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: track.accent }}
                      />
                      <span
                        className="text-[10px] font-black uppercase tracking-[0.5em]"
                        style={{ color: track.accent }}
                      >
                        {track.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-900 leading-tight">
                      {track.title}
                    </h2>

                    {/* Subtitle Badge */}
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border"
                      style={{
                        color: track.accent,
                        backgroundColor: track.accentLight,
                        borderColor: track.accentBorder,
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: track.accent }}
                      />
                      {track.subtitle}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex-1 space-y-10">
                    {/* Description */}
                    <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                      {track.description}
                    </p>

                    {/* Focus Areas */}
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 mb-5">
                        Focus Areas
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {track.focus.map((item, i) => (
                          <div
                            key={i}
                            className="p-6 rounded-2xl border transition-all duration-300 group/item hover:scale-[1.02]"
                            style={{
                              backgroundColor: track.accentLight,
                              borderColor: track.accentBorder,
                            }}
                          >
                            <h4
                              className="text-[13px] font-black uppercase tracking-[0.15em] mb-3"
                              style={{ color: track.accent }}
                            >
                              {item.title}
                            </h4>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact Quote */}
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                      <Sparkles
                        size={16}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: track.accent }}
                      />
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">
                          Impact Target
                        </p>
                        <p className="text-slate-800 text-sm font-semibold italic leading-relaxed">
                          "{track.impact}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA Section ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative rounded-[36px] overflow-hidden border border-slate-100 p-12 md:p-20 text-center bg-slate-50"
        >
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="w-8 h-[1px] bg-slate-200" />
              <span className="text-slate-400 font-black uppercase tracking-[0.5em] text-[10px]">
                Apply Now
              </span>
              <div className="w-8 h-[1px] bg-slate-200" />
            </div>

            <h2 className="text-5xl md:text-7xl font-serif font-black leading-none tracking-tight text-slate-900">
              Ready to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 italic">
                Build?
              </span>
            </h2>

            <p className="text-slate-500 text-lg font-medium">
              Join the movement. Build technology that changes lives.
            </p>

            <button
              onClick={() => window.open(registerUrl, "_blank")}
              className="inline-flex items-center gap-3 bg-emerald-600 text-white px-12 py-5 rounded-full text-[12px] font-black uppercase tracking-[0.4em] hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/25 mx-auto"
            >
              Register on Unstop
              <ArrowUpRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Back to top button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex justify-center"
        >
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.3em] text-[10px] font-black group"
          >
            Scroll to Top
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <ArrowUpRight size={12} className="-rotate-45" />
            </div>
          </button>
        </motion.div>
      </Container>
    </div>
  );
}

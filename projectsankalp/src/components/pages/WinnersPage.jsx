import { motion } from "framer-motion";
import {
  Award,
  GraduationCap,
  MapPin,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import Container from "../core/Container";
import Footer from "../layout/Footer";
import { useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.8,
      ease: [0.21, 1.11, 0.81, 0.99],
    },
  }),
};

const winnersData = [
  {
    id: "cc-001",
    teamName: "Neural Nexus",
    college: "IIT Bombay",
    state: "Maharashtra",
  },
  {
    id: "cc-002",
    teamName: "Eco Warriors",
    college: "BIT Mesra",
    state: "Jharkhand",
  },
  {
    id: "cc-003",
    teamName: "Code Crusaders",
    college: "NIT Trichy",
    state: "Tamil Nadu",
  },
  {
    id: "cc-004",
    teamName: "Cyber Sentinels",
    college: "DTU Delhi",
    state: "Delhi",
  },
  {
    id: "cc-005",
    teamName: "Aqua Guard",
    college: "IIT Madras",
    state: "Tamil Nadu",
  },
  {
    id: "cc-006",
    teamName: "Green Tech",
    college: "BITS Pilani",
    state: "Rajasthan",
  },
  {
    id: "cc-007",
    teamName: "Health Hero",
    college: "AIIMS Delhi",
    state: "Delhi",
  },
  {
    id: "cc-008",
    teamName: "Sky High",
    college: "IISc Bangalore",
    state: "Karnataka",
  },
  {
    id: "cc-009",
    teamName: "Pixel Pioneers",
    college: "NID Ahmedabad",
    state: "Gujarat",
  },
  {
    id: "cc-010",
    teamName: "Data Divas",
    college: "IIT Kanpur",
    state: "Uttar Pradesh",
  },
  {
    id: "cc-011",
    teamName: "Solar Spark",
    college: "IIT Roorkee",
    state: "Uttarakhand",
  },
  {
    id: "cc-012",
    teamName: "Bio Bloom",
    college: "IIT Guwahati",
    state: "Assam",
  },
  {
    id: "cc-013",
    teamName: "Aero Dynamics",
    college: "MIT Manipal",
    state: "Karnataka",
  },
  {
    id: "cc-014",
    teamName: "Swift Solve",
    college: "VIT Vellore",
    state: "Tamil Nadu",
  },
  {
    id: "cc-015",
    teamName: "Terra Form",
    college: "IIT Kharagpur",
    state: "West Bengal",
  },
  {
    id: "cc-016",
    teamName: "Nova Knights",
    college: "NIT Surathkal",
    state: "Karnataka",
  },
  {
    id: "cc-017",
    teamName: "Spark Squad",
    college: "IIT Hyderabad",
    state: "Telangana",
  },
  {
    id: "cc-018",
    teamName: "Wind Walkers",
    college: "NIT Warangal",
    state: "Telangana",
  },
  {
    id: "cc-019",
    teamName: "Leaf Logic",
    college: "BHU Varanasi",
    state: "Uttar Pradesh",
  },
  {
    id: "cc-020",
    teamName: "Pulse Patrol",
    college: "JIPMER Puducherry",
    state: "Puducherry",
  },
  {
    id: "cc-021",
    teamName: "Ocean Optic",
    college: "IIT Gandhinagar",
    state: "Gujarat",
  },
  {
    id: "cc-022",
    teamName: "Cloud Cast",
    college: "IIIT Hyderabad",
    state: "Telangana",
  },
  {
    id: "cc-023",
    teamName: "Mind Meld",
    college: "IIT Indore",
    state: "Madhya Pradesh",
  },
  {
    id: "cc-024",
    teamName: "Iron Intel",
    college: "NIT Rourkela",
    state: "Odisha",
  },
  {
    id: "cc-025",
    teamName: "Sun Stryke",
    college: "IIT Bhubaneswar",
    state: "Odisha",
  },
  {
    id: "cc-026",
    teamName: "Moon Mission",
    college: "PEC Chandigarh",
    state: "Chandigarh",
  },
  {
    id: "cc-027",
    teamName: "Fire Fly",
    college: "VJTI Mumbai",
    state: "Maharashtra",
  },
  {
    id: "cc-028",
    teamName: "Grit Group",
    college: "COEP Pune",
    state: "Maharashtra",
  },
  {
    id: "cc-029",
    teamName: "Zenith Zone",
    college: "SRM University",
    state: "Tamil Nadu",
  },
  {
    id: "cc-030",
    teamName: "Peak Perform",
    college: "Amity University",
    state: "Uttar Pradesh",
  },
];

export default function WinnersPage({ onNavigate, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Winners | Project Sankalp";
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/*  Background Elements  */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] -left-[5%] w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full"
        />
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <main className="relative z-10">
        {/*  Hero Section  */}
        <section className="pb-20 md:pb-32 md:pt-10">
          <Container>
            <div className="mb-12">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors"
              >
                <span>←</span>
                <span>[ BACK ]</span>
              </motion.button>
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 mb-8"
              >
                <Trophy size={14} className="animate-bounce" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Hall of Fame
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-5xl md:text-8xl font-serif font-black tracking-tight text-slate-900 mb-8 leading-[0.95]"
              >
                The Champions of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-500 italic">
                  Sankalp 2024.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
              >
                Celebrating the brightest minds who rose to the challenge and
                built solutions for a better tomorrow. Meet our top 30
                finalists.
              </motion.p>
            </div>
          </Container>
        </section>

        {/* ── Winners Grid ── */}
        <section className="pb-32">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {winnersData.map((team, index) => (
                <motion.div
                  key={team.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={index % 6}
                  onClick={() => onNavigate?.("booking")}
                  className="group relative cursor-pointer"
                >
                  <div className="absolute -inset-2 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative h-full bg-white border border-slate-100 p-8 rounded-[28px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                    {/* ID Badge */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-400 tracking-widest uppercase">
                        {team.id}
                      </div>
                    </div>

                    {/* Team Info */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Users
                          size={18}
                          className="text-emerald-500 mt-1 flex-shrink-0"
                        />
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {team.teamName}
                        </h3>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-50">
                        <div className="flex items-center gap-2 text-slate-500">
                          <GraduationCap size={14} className="flex-shrink-0" />
                          <span className="text-sm font-medium line-clamp-1">
                            {team.college}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <MapPin size={14} className="flex-shrink-0" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">
                            {team.state}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Corner Decoration */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 opacity-50" />
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Congratulations Message ── */}
        <section className="pb-40">
          <Container>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[48px] overflow-hidden bg-slate-900 p-12 md:p-24 text-center"
            >
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-emerald-500/20 to-transparent pointer-events-none" />
              <Sparkles
                className="absolute top-10 left-10 text-emerald-500/20 animate-pulse"
                size={40}
              />
              <Sparkles
                className="absolute bottom-10 right-10 text-blue-500/20 animate-pulse"
                size={32}
              />

              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Trophy className="text-emerald-400" size={32} />
                  </div>
                </div>

                <h2 className="text-4xl md:text-6xl font-serif font-black text-white leading-tight">
                  Heartiest <br />
                  <span className="italic text-emerald-400">
                    Congratulations!
                  </span>
                </h2>

                <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                  To all the winners and participants, your dedication and
                  innovation have set a new benchmark. Project Sankalp is proud
                  to be part of your journey. Keep building, keep inspiring, and
                  keep making an impact.
                </p>

                <div className="pt-8 flex flex-wrap justify-center gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-white">30</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                      Finalists
                    </span>
                  </div>
                  <div className="w-[1px] h-12 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-white">500+</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                      Submissions
                    </span>
                  </div>
                  <div className="w-[1px] h-12 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-white">15+</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                      States
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        <Footer />
      </main>
    </div>
  );
}

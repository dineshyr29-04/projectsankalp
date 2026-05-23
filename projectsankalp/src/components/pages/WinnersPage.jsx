import { motion } from "framer-motion";
import { GraduationCap, Sparkles, Trophy } from "lucide-react";
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
    teamName: "Team Nexus",
    college: "Pimpri Chinchwad College of Engineering, Pune",
  },
  {
    id: "cc-002",
    teamName: "Ashwamedam",
    college:
      "Yenepoya Institute of Arts, Science, Commerce and Management, Mangalore",
  },
  {
    id: "cc-003",
    teamName: "LogicLoop",
    college: "Srinivas Institute of Technology (SIT), Mangalore",
  },
  {
    id: "cc-004",
    teamName: "Trifecta",
    college: "KLE Technological University (KLE Tech), Hubli",
  },
  {
    id: "cc-005",
    teamName: "Evocare",
    college: "St. Joseph Engineering College, Vamanjoor",
  },
  {
    id: "cc-006",
    teamName: "WHITE CELL RANGERS",
    college: "Canara Engineering College, Bantwal",
  },
  {
    id: "cc-007",
    teamName: "The Faaah Coders",
    college:
      "Yenepoya Institute of Arts, Science, Commerce and Management, Mangalore",
  },
  {
    id: "cc-008",
    teamName: "Brain.exe",
    college: "Dr. DY Patil Institute of Technology",
  },
  {
    id: "cc-009",
    teamName: "Pikachu",
    college: "St Joseph Engineering College, Mangaluru",
  },
  {
    id: "cc-010",
    teamName: "Trojan",
    college:
      "Yenepoya Institute of Arts, Science, Commerce and Management, Mangalore",
  },
  {
    id: "cc-011",
    teamName: "Algniters",
    college:
      "Yenepoya Institute of Arts, Science, Commerce and Management, Mangalore",
  },
  {
    id: "cc-012",
    teamName: "ByteForge",
    college: "Maharaja Institute of Technology (MIT), Mysore",
  },
  {
    id: "cc-013",
    teamName: "Vision-X",
    college: "PES University (PESU), Bengaluru",
  },
  {
    id: "cc-014",
    teamName: "Nothing",
    college: "Canara Engineering College, Bantwal",
  },
  {
    id: "cc-015",
    teamName: "Merge Conflict",
    college: "KLE Technological University (KLE Tech), Hubli",
  },
  {
    id: "cc-016",
    teamName: "Downhill Decoders",
    college: "St Joseph Engineering College, Vamanjoor",
  },
  {
    id: "cc-017",
    teamName: "CODEX",
    college: "St. Joseph Engineering College, Vamanjoor",
  },
  {
    id: "cc-018",
    teamName: "codex",
    college:
      "Mangalore Institute of Technology & Engineering (MITE), Mangaluru",
  },
  {
    id: "cc-019",
    teamName: "ctrl Freaks",
    college: "Chennai Institute of Technology",
  },
  {
    id: "cc-020",
    teamName: "FuelNow",
    college: "St. Joseph Engineering College, Vamanjoor",
  },
  {
    id: "cc-021",
    teamName: "Carbon",
    college:
      "Yenepoya Institute of Arts, Science, Commerce and Management, Mangalore",
  },
  {
    id: "cc-022",
    teamName: "Mosambi Juice",
    college: "BMS Institute of Technology",
  },
  {
    id: "cc-023",
    teamName: "wildwest",
    college: "A. J. Institute of Engineering and Technology",
  },
  {
    id: "cc-024",
    teamName: "RehabTech",
    college: "Yenepoya University (YU)",
  },
  {
    id: "cc-025",
    teamName: "Run Time Terror",
    college: "Yenepoya Institute Of Technology (YIT), Moodabidri",
  },
  {
    id: "cc-026",
    teamName: "Unify",
    college: "Bearys Institute Of Technology",
  },
  {
    id: "cc-027",
    teamName: "ASDIQA",
    college: "Yenepoya University (YU)",
  },
  {
    id: "cc-028",
    teamName: "DID-HE WARRIORS",
    college: "St. Joseph Engineering College, Vamanjoor",
  },
  {
    id: "cc-029",
    teamName: "VOIDX",
    college: "Canara Engineering College, Bantwal",
  },
  {
    id: "cc-030",
    teamName: "ConvrgCore",
    college: "Maharaja Institute of Technology (MIT), Mysore",
  },
  {
    id: "cc-031",
    teamName: "Algarythm",
    college: "Bearys Institute Of Technology",
  },
  {
    id: "cc-032",
    teamName: "Victory Coders",
    college: "Sahyadri College of Engineering & Management (SCEM), Mangaluru",
  },
  {
    id: "cc-033",
    teamName: "Kaizen Koders",
    college: "BMS Institute of Technology and Management (BMSITM), Bangalore",
  },
  {
    id: "cc-034",
    teamName: "Clarix",
    college: "Marwadi University (MU), Gujarat",
  },
  {
    id: "cc-035",
    teamName: "stratosix",
    college: "Yenepoya University, Bangalore",
  },
  {
    id: "cc-036",
    teamName: "Argus",
    college: "REVA University (RU), Bangalore",
  },
  {
    id: "cc-037",
    teamName: "MED_CONNECT",
    college:
      "Mangalore Institute of Techology & Engineering (MITE), Mangaluru, Karnataka",
  },
  {
    id: "cc-038",
    teamName: "The Floating Coders",
    college: "Vishwakarma Institute of Technology, Pune, Maharashtra",
  },
  {
    id: "cc-039",
    teamName: "InnovAid",
    college: "St Joseph Engineering College, Vamanjoor",
  },
  {
    id: "cc-040",
    teamName: "Team Elevate",
    college: "Srinivas Institute of Technology (SIT), Mangalore",
  },
];

export default function WinnersPage({ onBack }) {
  useEffect(() => {
    document.documentElement.style.fontFamily =
      "'Georgia', 'Garamond', 'Baskerville', serif";
    return () => {
      document.documentElement.style.fontFamily = "";
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Winners | Project Sankalp";
  }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Elements */}
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
        {/* Hero Section */}
        <section className="pb-20 md:pb-32 md:pt-10">
          <Container>
            <div className="mb-12 pb-5">
              <button
                className="group flex items-center gap-3 text-[10px] font-black tracking-[0.4em] uppercase border-b-2 border-white pb-1 hover:border-emerald-500 transition-colors"
              >

              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={1}
              >
                <h1
                  className="text-6xl md:text-7xl font-black tracking-tighter uppercase mb-6 text-white italic"
                  style={{
                    fontFamily:
                      "'Segoe UI', 'Roboto', 'Inter', system-ui, sans-serif",
                  }}
                >
                  The <br />
                  <span className="text-emerald-500">Selected Teams</span>
                </h1>
                <p className="text-white/40 text-sm md:text-base font-medium max-w-md leading-relaxed uppercase tracking-wider">
                  Celebrating the architects of change. These teams represent
                  the pinnacle of innovation and social impact across our core
                  mission domains.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={2}
                className="flex flex-row md:flex-row gap-8 lg:justify-end"
              >
                <div className="flex flex-col">
                  <span className="text-3xl md:text-5xl font-black text-white italic font-serif">
                    {winnersData.length}
                  </span>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">
                    Elite Teams
                  </span>
                </div>
                <div className="w-[1px] h-12 bg-white/10 hidden md:block" />
                <div className="flex flex-col">
                  <span className="text-3xl md:text-5xl font-black text-white italic font-serif">
                    ₹1L+
                  </span>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">
                    Prize Pool
                  </span>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* Winners Grid */}
        <section className="pb-24 md:pb-32">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-7">
              {winnersData.map((team, i) => (
                <motion.div
                  key={team.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i % 6}
                  className="h-full"
                >
                  <div className="relative h-full min-h-[100px] bg-white/5 border border-white/10 rounded-[24px] p-4 sm:p-5 md:p-6 hover:bg-white/10 transition-all duration-500 group overflow-hidden">
                    {/* Card Decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 md:w-28 md:h-28 bg-emerald-500/5 blur-2xl rounded-full group-hover:bg-emerald-500/10 transition-colors" />

                    <div className="space-y-2 md:space-y-3">
                      <h3
                        className="text-lg sm:text-xl md:text-xl font-black tracking-tight text-white uppercase leading-tight"
                        style={{
                          fontFamily:
                            "'Segoe UI', 'Roboto', 'Inter', system-ui, sans-serif",
                        }}
                      >
                        {team.teamName}
                      </h3>

                        {team.college && (
                          <div className="space-y-1">
                            <div className="flex items-start gap-2 text-white/50">
                              <GraduationCap
                                size={12}
                                className="shrink-0 mt-0.5"
                              />
                              <span className="text-[8px] sm:text-[11px] font-semibold uppercase tracking-wider leading-tight line-clamp-2">
                                {team.college}
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Congratulations Message */}
        <section className="pb-40">
          <Container>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[48px] overflow-hidden bg-white/5 p-12 md:p-20 text-center border border-white/10"
            >
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
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

                <h2 className="text-4xl md:text-4xl font-serif font-black text-white leading-tight">
                  Heartiest <br />
                  <span className="italic text-emerald-400">
                    Congratulations!
                  </span>
                </h2>

                <p className="text-white/40 text-lg md:text-xl leading-relaxed">
                  To all the Selected participants, your dedication and
                  innovation have set a new benchmark. Project Sankalp is proud
                  to be part of your journey. Keep building, keep inspiring, and
                  keep making an impact.
                </p>

                <div className="pt-8 flex flex-wrap justify-center gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-white">
                      {winnersData.length}
                    </span>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                      Selected
                    </span>
                  </div>
                  <div className="w-[1px] h-12 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-white">500+</span>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                      Submissions
                    </span>
                  </div>
                  <div className="w-[1px] h-12 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-white">15+</span>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                      States
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

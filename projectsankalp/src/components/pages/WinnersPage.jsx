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
    teamName: "Mind Meld",
    college: "Jadavpur University",
    state: "West Bengal",
  },
  {
    id: "cc-014",
    teamName: "Future Flow",
    college: "NIT Rourkela",
    state: "Odisha",
  },
  {
    id: "cc-015",
    teamName: "Life Line",
    college: "CMC Vellore",
    state: "Tamil Nadu",
  },
  {
    id: "cc-016",
    teamName: "Ocean Optic",
    college: "Andhra University",
    state: "Andhra Pradesh",
  },
  {
    id: "cc-017",
    teamName: "Wind Walker",
    college: "Anna University",
    state: "Tamil Nadu",
  },
  {
    id: "cc-018",
    teamName: "Sun Stream",
    college: "MNIT Jaipur",
    state: "Rajasthan",
  },
  {
    id: "cc-019",
    teamName: "Earth Echo",
    college: "VNIT Nagpur",
    state: "Maharashtra",
  },
  {
    id: "cc-020",
    teamName: "Cloud Core",
    college: "IIIT Hyderabad",
    state: "Telangana",
  },
  {
    id: "cc-021",
    teamName: "Astro Aim",
    college: "IIST Thiruvananthapuram",
    state: "Kerala",
  },
  {
    id: "cc-022",
    teamName: "Pulse Point",
    college: "KMC Manipal",
    state: "Karnataka",
  },
  {
    id: "cc-023",
    teamName: "Leaf Logic",
    college: "TNAU Coimbatore",
    state: "Tamil Nadu",
  },
  {
    id: "cc-024",
    teamName: "Glow Grid",
    college: "SVNIT Surat",
    state: "Gujarat",
  },
  {
    id: "cc-025",
    teamName: "Pure Path",
    college: "ISM Dhanbad",
    state: "Jharkhand",
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
            <div className="mb-12">
              <button
                onClick={onBack}
                className="group flex items-center gap-3 text-[10px] font-black tracking-[0.4em] uppercase border-b-2 border-white pb-1 hover:border-emerald-500 transition-colors"
              >
                <span className="text-lg transition-transform group-hover:-translate-x-1">
                  ←
                </span>
                <span>[ RETURN ]</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={1}
              >
                <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
                  Hall of Fame // 2024
                </span>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 text-white italic font-serif">
                  The <br />
                  <span className="text-emerald-500">Winners.</span>
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
                className="flex flex-col md:flex-row gap-8 lg:justify-end"
              >
                <div className="flex flex-col">
                  <span className="text-3xl md:text-5xl font-black text-white italic font-serif">
                    30
                  </span>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">
                    Elite Teams
                  </span>
                </div>
                <div className="w-[1px] h-12 bg-white/10 hidden md:block" />
                <div className="flex flex-col">
                  <span className="text-3xl md:text-5xl font-black text-white italic font-serif">
                    $10K+
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
        <section className="pb-32">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {winnersData.map((team, i) => (
                <motion.div
                  key={team.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i % 6}
                >
                  <div className="relative bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 hover:bg-white/10 transition-all duration-500 group overflow-hidden">
                    {/* Card Decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full group-hover:bg-emerald-500/10 transition-colors" />

                    <div className="flex items-start justify-between mb-8">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                        <Trophy
                          size={24}
                          className="text-emerald-500 group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-emerald-500/50 transition-colors">
                        ID: {team.id}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase italic font-serif leading-none">
                        {team.teamName}
                      </h3>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/40">
                          <GraduationCap size={14} className="shrink-0" />
                          <span className="text-[10px] font-bold uppercase tracking-wider truncate">
                            {team.college}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-white/40">
                          <MapPin size={14} className="shrink-0" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            {team.state}
                          </span>
                        </div>
                      </div>
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
              className="relative rounded-[48px] overflow-hidden bg-white/5 p-12 md:p-24 text-center border border-white/10"
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

                <h2 className="text-4xl md:text-6xl font-serif font-black text-white leading-tight">
                  Heartiest <br />
                  <span className="italic text-emerald-400">
                    Congratulations!
                  </span>
                </h2>

                <p className="text-white/40 text-lg md:text-xl leading-relaxed">
                  To all the winners and participants, your dedication and
                  innovation have set a new benchmark. Project Sankalp is proud
                  to be part of your journey. Keep building, keep inspiring, and
                  keep making an impact.
                </p>

                <div className="pt-8 flex flex-wrap justify-center gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-white">30</span>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                      Finalists
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

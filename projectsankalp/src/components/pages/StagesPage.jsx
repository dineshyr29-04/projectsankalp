import { motion } from "framer-motion";
import {
  ArrowLeft,
  Rocket,
  Zap,
  Award,
  CheckCircle,
  Target,
  Users,
} from "lucide-react";
import Container from "../core/Container";
import { useEffect } from "react";

export default function StagesPage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stages = [
    {
      id: "01",
      title: "The Spark",
      subtitle: "Online Submission Phase",
      icon: <Rocket className="w-8 h-8 text-emerald-600" />,
      description:
        "This is where your journey begins. Submit a 3-minute video pitch explaining your solution's core value proposition and how it addresses one of our problem tracks.",
      details: [
        "Focus on 'The Why' behind your project",
        "Clear problem-solution fit demonstration",
        "Initial prototype or architecture diagram",
        "High-impact presentation and storytelling",
      ],
      gradient: "from-blue-600/10 to-emerald-600/10",
    },
    {
      id: "02",
      title: "The Filter",
      subtitle: "Expert Evaluation Round",
      icon: <Zap className="w-8 h-8 text-emerald-600" />,
      description:
        "Our panel of industry experts and academics rigorously vet every submission. We're looking for scalability, technical depth, and sustainable impact.",
      details: [
        "Technical feasibility and code quality",
        "Potential for real-world implementation",
        "Market readiness and sustainability",
        "Team capability and domain expertise",
      ],
      gradient: "from-emerald-600/10 to-teal-600/10",
    },
    {
      id: "03",
      title: "The Forge",
      subtitle: "24-Hour Grand Finale",
      icon: <Award className="w-8 h-8 text-emerald-600" />,
      description:
        "The ultimate test of endurance and innovation. The top 30 teams gather at our campus for a 24-hour non-stop build phase ending in a live jury demo.",
      details: [
        "Rapid prototyping and iteration",
        "Live technical demonstrations",
        "Q&A session with the Grand Jury",
        "Networking with social entrepreneurs",
      ],
      gradient: "from-teal-600/10 to-blue-600/10",
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
        <div className="max-w-3xl mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-emerald-500" />
            <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[11px]">
              The Roadmap
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-serif font-black mb-8 leading-[0.9] tracking-tight text-slate-900"
          >
            Mission <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 italic">Architecture.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl font-medium border-l-2 border-slate-100 pl-6"
          >
            A rigorous three-phase selection process designed to transform raw
            ideas into scalable social impact reality. Understand every step of
            your journey.
          </motion.p>
        </div>

        {/* Stages List */}
        <div className="space-y-32 md:space-y-48">
          {stages.map((stage, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-24 items-center`}
            >
              {/* Content */}
              <div className="flex-1 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-4"
                >
                  <span className="text-[60px] md:text-[100px] font-serif font-black text-slate-100 leading-none block -mb-8 md:-mb-12">
                    {stage.id}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
                      {stage.icon}
                    </div>
                    <div>
                      <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] block mb-1">
                        {stage.subtitle}
                      </span>
                      <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900">
                        {stage.title}
                      </h2>
                    </div>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-slate-600 leading-relaxed font-medium border-l-2 border-slate-100 pl-6"
                >
                  {stage.description}
                </motion.p>

                <motion.ul
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {stage.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all"
                    >
                      <CheckCircle
                        size={14}
                        className="text-emerald-500 mt-0.5 shrink-0"
                      />
                      <span className="text-[12px] font-bold text-slate-700">
                        {detail}
                      </span>
                    </li>
                  ))}
                </motion.ul>
              </div>

              {/* Visual Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`flex-1 relative aspect-square md:aspect-video w-full max-w-[500px]`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stage.gradient} blur-[80px] rounded-full opacity-60`}
                />
                <div className="relative w-full h-full rounded-[40px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden flex items-center justify-center p-12 transition-transform duration-700 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                  <div className="relative z-10 text-center space-y-6">
                    <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto shadow-inner">
                      {index === 0 ? (
                        <Users size={40} className="text-emerald-600" />
                      ) : index === 1 ? (
                        <Target size={40} className="text-emerald-600" />
                      ) : (
                        <Award size={40} className="text-emerald-600" />
                      )}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                      Phase_Verification_0{index + 1}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-48 p-12 md:p-24 rounded-[60px] bg-slate-50 border border-slate-200 text-center relative overflow-hidden group hover:border-emerald-200 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif font-black leading-tight text-slate-900">
              Ready to <span className="text-emerald-600 italic">Transform</span>{" "}
              Society?
            </h2>
            <p className="text-slate-500 font-medium text-lg">
              Registration closes soon. Secure your team's spot in the most
              impactful hackathon of the year.
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
              Register Now
            </a>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

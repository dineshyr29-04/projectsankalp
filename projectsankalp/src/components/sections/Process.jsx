import { motion } from "framer-motion";
import Section from "../core/Section";
import Container from "../core/Container";
import { Video, ClipboardCheck, MapPin, ArrowRight } from "lucide-react";

export default function Process() {
  const steps = [
    {
      round: "ROUND 1",
      title: "Online Submission",
      description:
        "Submit a high-impact video pitch and project core idea via our portal. Should be no longer than 3 minutes.",
      icon: Video,
      status: "Online",
      date: "1st May - 15th May 2026",
    },
    {
      round: "EVALUATION",
      title: "Top 40 teams",
      description:
        "Expert screening phase where feasibility and innovation are rigorously evaluated.",
      icon: ClipboardCheck,
      status: "Internal",
      date: "Results on 17th May 2026",
    },
    {
      round: "ROUND 3",
      title: "The Grand Finale",
      description:
        "Top 40 teams compete in a 24-hour offline sprint at the physical venue.",
      icon: MapPin,
      status: "Offline",
      date: "25th May 2026",
    },
  ];

  return (
    <Section
      id="process"
      className="relative bg-emerald-50/20 flex items-center py-16 md:py-24 overflow-hidden"
    >
      {/* Premium Atmospheric Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Horizontal Guides */}
        <div className="absolute top-[10%] left-0 w-full h-[1px] bg-emerald-100/50" />
        <div className="absolute bottom-[10%] left-0 w-full h-[1px] bg-emerald-100/50" />
      </div>

      <Container className="w-full px-4 sm:px-10 lg:px-20 mx-auto">
        {/* Header - Refined Slate-900 */}
        <div className="text-left mb-20 md:mb-24 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-slate-800" />
            <span className="text-slate-800 font-black uppercase tracking-[0.4em] text-[10px]">
              The Workflow
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-8xl font-serif font-black mb-10 text-slate-900 tracking-tight leading-[0.9]">
            How Project Sankalp <br />
            <span className="text-[blue] italic ">Moves.</span>
          </h2>

          <p className="text-slate-600 text-lg font-medium border-l border-slate-100 pl-8 max-w-2xl">
            A structured three-phase journey from thousands of global ideas to
            the final top 40 champions.
          </p>
        </div>

        {/* Process Grid - Normalized Geometry */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative p-10 rounded-2xl bg-white border border-slate-300 transition-all duration-700 ease-out shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_0_0_rgba(139,92,246,0)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.15),inset_0_0_20px_rgba(139,92,246,0.05)] hover:border-emerald-400 hover:-translate-y-2 hover:scale-[1.02] w-full h-full flex flex-col"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-12">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-black tracking-[0.2em] text-slate-500">
                      {step.round}
                    </span>
                  </div>

                  <div className="text-slate-800 group-hover:text-emerald-500 transition-colors duration-500">
                    <step.icon size={22} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Card Body */}
                <div className="space-y-6 flex-grow">
                  <h3 className="text-2xl font-serif font-black text-slate-900 leading-tight">
                    {step.title}
                  </h3>

                  <div className="w-8 h-[1px] bg-slate-100 group-hover:w-16 group-hover:bg-emerald-500 transition-all duration-700" />

                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col gap-3 w-full">
                    <div className="text-xs font-semibold text-emerald-600 tracking-wide group-hover:text-emerald-500 transition-colors">
                      {step.date}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-300 transition-all duration-500">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${index === 2 ? "bg-slate-900" : "bg-emerald-500"} animate-pulse`}
                        />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-900">
                          {step.status}
                        </span>
                      </div>

                      {index !== 2 && (
                        <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight size={16} className="text-emerald-500" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

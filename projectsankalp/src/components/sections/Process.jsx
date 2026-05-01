import { motion } from "framer-motion";
import Section from "../core/Section";
import Container from "../core/Container";
import { Video, ClipboardCheck, MapPin, ArrowRight } from "lucide-react";

export default function Process() {
  const steps = [
    {
      round: "ROUND 1",
      title: "Online Submission",
      description: "Submit a high-impact video pitch and project core idea via our portal.",
      icon: Video,
      status: "Online",
      tag: "Submission"
    },
    {
      round: "ROUND 2",
      title: "Selection Round",
      description: "Expert screening phase where feasibility and innovation are rigorously evaluated.",
      icon: ClipboardCheck,
      status: "Internal",
      tag: "Screening"
    },
    {
      round: "ROUND 3",
      title: "The Grand Finale",
      description: "Top 30 teams compete in a 24-hour offline sprint at the physical venue.",
      icon: MapPin,
      status: "Offline",
      tag: "Compete"
    }
  ];

  return (
    <Section id="process" className="bg-transparent min-h-screen flex items-center py-24 md:py-32 overflow-hidden">
      <Container>
        {/* Header - Engineered Look */}
        <div className="text-left mb-20 md:mb-24 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-[1px] bg-accent" />
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px]">The Workflow</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-serif font-black mb-8 text-primary tracking-tight leading-none">
            How Project Sankalp <br /> 
            <span className="text-accent italic">Moves.</span>
          </h2>
          
          <p className="text-text-secondary text-lg font-medium border-l-2 border-border pl-6 max-w-2xl">
            A structured three-phase journey from thousands of global ideas to the final top 30 champions.
          </p>
        </div>

        {/* Process Grid - Strict & Structured */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border bg-border">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`group relative p-8 md:p-12 transition-all duration-500 bg-white ${
                index === 1 ? "md:bg-surface/50" : ""
              } ${
                index === 2 ? "md:border-t-4 md:border-t-accent" : ""
              }`}
            >
              {/* Internal Hover Frame */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/10 transition-colors pointer-events-none" />

              {/* Card Header */}
              <div className="flex justify-between items-start mb-12">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black tracking-[0.2em] text-text-secondary">
                    {step.round}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent/20 group-hover:bg-accent transition-colors" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-primary">
                      {step.tag}
                    </span>
                  </div>
                </div>
                
                <div className="text-primary/20 group-hover:text-accent transition-colors duration-500">
                  <step.icon size={24} strokeWidth={1.5} />
                </div>
              </div>

              {/* Card Body - Left Aligned & Bold */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-serif font-black text-primary leading-tight group-hover:translate-x-1 transition-transform">
                  {step.title}
                </h3>
                
                <div className="w-8 h-[2px] bg-border group-hover:w-16 group-hover:bg-accent transition-all duration-700" />
                
                <p className="text-sm md:text-base text-text-secondary leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              {/* Card Footer - Status Badge */}
              <div className="mt-12 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-surface border border-border">
                  <div className={`w-1.5 h-1.5 rounded-full ${index === 2 ? 'bg-primary' : 'bg-accent'} animate-pulse`} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary">
                    {step.status}
                  </span>
                </div>
                
                <motion.div 
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ x: 5 }}
                >
                  <ArrowRight size={16} className="text-accent" />
                </motion.div>
              </div>
              
              {/* Intentional asymmetrical detail */}
              {index === 0 && (
                <div className="absolute bottom-4 right-4 text-[8px] font-black text-primary/5 uppercase tracking-[0.5em] select-none">
                  PHASE_01
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

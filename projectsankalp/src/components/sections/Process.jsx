import { motion } from "framer-motion";
import Section from "../core/Section";
import Container from "../core/Container";
import { Video, Filter, Users, Trophy, MapPin, Globe } from "lucide-react";

export default function Process() {
  const steps = [
    {
      title: "Online Submission",
      subtitle: "Round 1: Video Pitch",
      description: "Submit a high-impact video explaining your innovation and core idea. Showcase your vision and the problem you're solving.",
      icon: Video,
      status: "Online",
      color: "bg-blue-500",
      accent: "text-blue-500",
      bg: "bg-blue-50/50"
    },
    {
      title: "Selection Round",
      subtitle: "Round 2: Expert Screening",
      description: "Our panel of industry experts will evaluate all submissions based on feasibility, innovation, and impact. Only the best move forward.",
      icon: Filter,
      status: "Internal",
      color: "bg-accent",
      accent: "text-accent",
      bg: "bg-accent/5"
    },
    {
      title: "The Grand Finale",
      subtitle: "Round 3: Offline Hack",
      description: "The Top 30 selected teams will descend upon the physical venue for a 24-hour intense building sprint and final pitching.",
      icon: Users,
      status: "Offline",
      color: "bg-primary",
      accent: "text-primary",
      bg: "bg-surface"
    }
  ];

  return (
    <Section id="process" className="bg-transparent min-h-screen flex items-center py-32 overflow-hidden">
      <Container>
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block"
          >
            The Workflow
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-serif font-black mb-8 text-primary tracking-tight">
            How Project Sankalp <br /> 
            <span className="text-accent">Moves.</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg font-medium">
            From thousands of registrations to the top 30 teams. Here is the path to the championship.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 1 }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="group w-full p-1.5 rounded-[50px] bg-white border border-border/50 hover:border-accent hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                <div className={`p-8 md:p-12 rounded-[40px] ${step.bg} transition-colors duration-500 h-full flex flex-col items-center text-center`}>
                  
                  {/* Icon Badge */}
                  <div className={`w-16 h-16 rounded-[24px] ${step.color} text-white flex items-center justify-center mb-8 shadow-xl shadow-black/10 group-hover:scale-110 transition-transform duration-500`}>
                    <step.icon size={28} />
                  </div>

                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${step.accent} mb-4`}>
                    {step.subtitle}
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-serif font-black mb-6 text-primary">
                    {step.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mb-8 opacity-80">
                    {step.description}
                  </p>

                  {/* Status Indicator */}
                  <div className="mt-auto flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm">
                      {step.status === "Online" ? <Globe size={12} className="text-blue-500" /> : 
                       step.status === "Offline" ? <MapPin size={12} className="text-primary" /> : 
                       <Filter size={12} className="text-accent" />}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        {step.status}
                      </span>
                    </div>
                    {step.status === "Offline" && (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white shadow-lg shadow-primary/20">
                        <Trophy size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          Top 30 Teams
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Step Number */}
              <div className="mt-8 w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-[10px] font-black text-primary shadow-sm">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

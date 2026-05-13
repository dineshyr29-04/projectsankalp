import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Section from "../core/Section";
import Container from "../core/Container";
import { Clock, Zap, Target } from "lucide-react";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const features = [
    {
      title: "24 Hours",
      description:
        "A high-intensity sprint to turn your wildest ideas into reality.",
      icon: Clock,
    },
    {
      title: "Innovation",
      description:
        "Push the boundaries of technology with creative problem solving.",
      icon: Zap,
    },
    {
      title: "Real-world Impact",
      description: "Build solutions that matter and can change lives globally.",
      icon: Target,
    },
  ];

  return (
    <Section
      id="about"
      className="relative py-16 lg:py-0 overflow-hidden bg-slate-50/50 min-h-screen flex items-center justify-center"
      ref={containerRef}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Tonal Blobs */}
        <div className="absolute top-1/4 -right-24 w-[600px] h-[600px] bg-white rounded-full blur-[140px]" />
        <div className="absolute bottom-0 -left-24 w-[500px] h-[500px] bg-white rounded-full blur-[120px]" />
      </div>

      <Container className="relative z-10 w-full px-4 sm:px-10 lg:px-20 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-12 h-[1px] bg-slate-800" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 font-black uppercase tracking-[0.4em] text-[10px]">
                Our Mission
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-black mb-6 md:mb-8 leading-[1.1] tracking-tight text-slate-900">
              Build the Future <br />
              <span className="text-[#22C55E] italic  ">With Purpose.</span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-[#484848] leading-relaxed mb-8 md:mb-10 max-w-xl font-medium border-l border-slate-100 pl-6 md:pl-8">
              Project Sankalp is a premier 24-hour hackathon designed to empower
              the next generation of innovators to solve critical real-world
              problems.
            </p>
          </motion.div>

          <div className="grid gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative p-6 md:p-8 rounded-2xl bg-white border border-slate-300 transition-all duration-700 ease-out shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_0_0_rgba(139,92,246,0)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.15),inset_0_0_20px_rgba(139,92,246,0.05)] hover:border-emerald-400 hover:-translate-y-2 hover:scale-[1.02] flex flex-col sm:flex-row gap-4 md:gap-6 items-start"
              >
                <div className="p-3 md:p-4 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-all shadow-sm">
                  <feature.icon size={22} className="text-slate-900" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-slate-900 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Section from "../core/Section";
import Container from "../core/Container";
import { Clock, Zap, Target } from "lucide-react";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const features = [
    {
      title: "24 Hours",
      description: "A high-intensity sprint to turn your wildest ideas into reality.",
      icon: Clock,
    },
    {
      title: "Innovation",
      description: "Push the boundaries of technology with creative problem solving.",
      icon: Zap,
    },
    {
      title: "Real-world Impact",
      description: "Build solutions that matter and can change lives globally.",
      icon: Target,
    }
  ];

  return (
    <Section id="about" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-white" ref={containerRef}>
      {/* Space Filling - Technical Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Tech Grid */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
        
        {/* Floating Circular Accents */}
        <div className="absolute top-1/4 -right-24 w-96 h-96 border border-blue-500/10 rounded-full animate-spin-slow" />
        <div className="absolute bottom-0 -left-24 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[100px]" />
        
        {/* Vertical Alignment Line */}
        <div className="absolute left-[10%] top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Mission</span>
            <h2 className="text-5xl md:text-6xl font-serif font-black mb-8 leading-[1.1] text-primary">
              Build the Future <br /> 
              <span className="text-accent">With Purpose.</span>
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-12 max-w-xl">
              Project Sankalp is a premier 24-hour hackathon designed to empower the next generation of innovators to solve critical real-world problems.
            </p>
          </motion.div>

          <div className="grid gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="p-6 md:p-8 rounded-[30px] md:rounded-[40px] bg-surface border border-border/50 flex flex-col sm:flex-row gap-6 md:gap-8 items-start hover:shadow-2xl hover:shadow-black/5 transition-all group"
              >
                <div className="p-4 rounded-[20px] bg-white border border-border group-hover:border-accent transition-colors shadow-sm">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary">{feature.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
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

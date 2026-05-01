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
    <Section id="about" className="bg-white overflow-hidden" ref={containerRef}>
      <Container className="relative">
        {/* Parallax Background Element */}
        <motion.div 
          style={{ y: y2 }}
          className="absolute -right-20 top-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" 
        />
        <motion.div 
          style={{ y: y1 }}
          className="absolute -left-20 bottom-0 w-64 h-64 bg-green/5 rounded-full blur-3xl -z-10" 
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Our Mission</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black mb-8 tracking-tight text-primary uppercase">
              Fueling Innovation <br /> 
              <span className="text-green">For a Sustainable Future</span>
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl font-medium">
              We bring together the brightest minds to tackle the world's most pressing energy and climate challenges through collaboration and engineering.
            </p>
          </motion.div>

          <div className="grid gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="p-8 rounded-3xl bg-surface border border-border flex gap-6 items-start hover:border-accent transition-all group"
              >
                <div className="p-3 rounded-2xl bg-white border border-border group-hover:border-accent transition-colors">
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

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Users, Heart, Sprout, Globe, Shield, Zap } from "lucide-react";

const icons = {
  Users,
  Heart,
  Sprout,
  Globe,
  Shield,
  Zap
};

export default function Tracks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <Section id="tracks" className="bg-transparent py-32 relative overflow-hidden" ref={containerRef}>
      <Container>
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block"
          >
            Mission Domains
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-serif font-black mb-8 text-primary">
            Explore the <br /> 
            <span className="text-accent">Problem Tracks.</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Choose a challenge that resonates with your passion. We are building for real impact across three critical pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {siteConfig.tracks.map((track, index) => {
            const Icon = icons[track.icon] || Globe;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="group relative"
              >
                {/* Decorative Background Blob */}
                <div className={`absolute inset-0 bg-accent/5 rounded-[50px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`} />
                
                <div className="h-full p-1 rounded-[55px] bg-white border border-border/50 hover:border-accent/30 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 flex flex-col">
                  <div className="p-8 md:p-12 flex flex-col items-center text-center h-full bg-surface/30 rounded-[50px] group-hover:bg-white transition-colors duration-500">
                    {/* Icon Badge */}
                    <div className="mb-10 p-5 rounded-[24px] bg-white border border-border text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm">
                      <Icon size={36} />
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4 block">
                      {track.subtitle}
                    </span>
                    
                    <h3 className="text-2xl md:text-3xl font-serif font-black mb-6 text-primary leading-tight">
                      {track.title}
                    </h3>
                    
                    <p className="text-sm md:text-base text-text-secondary leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                      {track.description}
                    </p>
                    
                    <div className="mt-auto pt-10">
                      <div className="w-12 h-px bg-border group-hover:w-24 group-hover:bg-accent transition-all duration-700" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

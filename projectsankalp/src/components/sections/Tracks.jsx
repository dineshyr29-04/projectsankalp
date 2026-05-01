import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Wallet, HeartPulse, GraduationCap, Leaf } from "lucide-react";

const icons = {
  Wallet,
  HeartPulse,
  GraduationCap,
  Leaf
};

export default function Tracks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <Section id="tracks" className="bg-surface py-32 relative overflow-hidden" ref={containerRef}>
      <Container>
        <div className="text-center mb-24">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Explore Opportunities</span>
          <h2 className="text-5xl md:text-6xl font-serif font-black mb-6 text-primary">Hackathon Tracks</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Choose your domain and build solutions that redefine the industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteConfig.tracks.map((track, index) => {
            const Icon = icons[track.icon];
            return (
              <motion.div 
                key={index}
                style={{ y: index % 2 === 0 ? y : 0 }}
                className="p-8 rounded-3xl bg-white border border-border flex flex-col items-center text-center hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="mb-6 p-4 rounded-full bg-surface border border-border text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary uppercase tracking-tight">{track.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {track.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

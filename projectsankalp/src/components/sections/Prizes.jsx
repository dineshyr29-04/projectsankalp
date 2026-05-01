import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Trophy, Award, Medal } from "lucide-react";

export default function Prizes() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const icons = [Trophy, Award, Medal];

  return (
    <Section id="prizes" className="relative bg-gradient-to-br from-white via-green-50/30 to-white py-32 overflow-hidden" ref={containerRef}>
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] -mr-48 -mt-48" 
      />
      
      <Container>
        <div className="text-center mb-24">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Grand Rewards</span>
          <h2 className="text-5xl md:text-6xl font-serif font-black mb-6 text-primary">Recognition & Prizes</h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-medium">
            Excellence deserves extraordinary rewards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {siteConfig.prizes.map((prize, index) => {
            const Icon = icons[index];
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`p-8 rounded-3xl bg-white flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl ${
                  index === 0 ? "border-primary md:scale-105" : ""
                }`}
              >
                <h3 className="text-xl font-bold mb-2 text-primary uppercase">{prize.rank}</h3>
                <span className="text-3xl font-black text-accent mb-4 block">{prize.amount}</span>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {prize.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 rounded-3xl bg-surface border border-border text-center"
        >
          <p className="text-text-secondary italic font-medium">
            + Exclusive swag kits, API credits, and certificates for all successful finishers.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}

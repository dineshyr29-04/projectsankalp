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
    <Section id="prizes" className="relative bg-white py-32 overflow-hidden" ref={containerRef}>
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] -mr-400 -mt-400" 
      />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[120px] -ml-300 -mb-300" />
      
      <Container>
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-blue-600" />
            <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px]">Grand Rewards</span>
            <div className="w-8 h-[1px] bg-blue-600" />
          </div>
          <h2 className="text-5xl md:text-8xl font-serif font-black mb-8 text-primary tracking-tight leading-[0.85]">
            Recognition & <br />
            <span className="text-blue-600 italic">Prizes.</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-medium border-t border-blue-500/10 pt-6">
            Excellence deserves extraordinary rewards. We've curated a prize pool that fuels your next big step.
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
      </Container>
    </Section>
  );
}

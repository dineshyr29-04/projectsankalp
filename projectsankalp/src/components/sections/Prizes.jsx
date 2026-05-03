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
    <Section id="prizes" className="relative bg-slate-50/50 py-24 md:py-32 overflow-hidden" ref={containerRef}>
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[150px] -mr-400 -mt-400 opacity-50" 
      />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] -ml-300 -mb-300 opacity-50" />
      
      <Container className="w-full px-4 sm:px-10 lg:px-20 mx-auto">
        <div className="text-center mb-20 md:mb-24">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-slate-100" />
            <span className="text-[#2563EB] font-black uppercase tracking-[0.4em] text-[10px]">Grand Rewards</span>
            <div className="w-12 h-[1px] bg-slate-100" />
          </div>
          <h2 className="text-5xl md:text-8xl font-serif font-black mb-10 text-slate-900 tracking-tight leading-[1.1]">
            Recognition & <br />
            <span className="text-[#2563EB] font-bold italic mt-[16px]" >Prizes.</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto font-medium border-t border-slate-50 pt-8 leading-relaxed">
            Excellence deserves extraordinary rewards. Compete for a massive prize pool that fuels <strong>your next big step.</strong>
          </p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 inline-flex items-center gap-3 bg-[#2563EB]/5 border border-[#2563EB]/10 rounded-full px-6 py-3 shadow-sm"
          >
            <div className="w-2 h-2 bg-[#2563EB] rounded-full animate-pulse" />
            <span className="text-[11px] md:text-[13px] font-black uppercase tracking-[0.1em] text-[#2563EB]">
              ₹1,00,000+ Total Prize Pool
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {siteConfig.prizes.map((prize, index) => {
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`p-10 rounded-2xl bg-white border flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/[0.03] hover:-translate-y-1 ${
                  index === 0 ? "border-slate-900 shadow-xl shadow-slate-900/5 md:scale-105 z-10" : "border-slate-100"
                }`}
              >
                <h3 className="text-xs font-black mb-4 text-slate-400 uppercase tracking-[0.3em]">{prize.rank}</h3>
                <span className="text-4xl md:text-5xl font-serif font-black text-slate-900 mb-6 block tracking-tight">{prize.amount}</span>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
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

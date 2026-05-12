import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Sparkles } from "lucide-react";

export default function Prizes() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  
  // Reorder prizes for podium: 2nd, 1st, 3rd
  const podiumPrizes = [
    { ...siteConfig.prizes[1], color: "text-slate-400", bg: "bg-slate-50", border: "border-slate-200", glow: "shadow-slate-200/20" },
    { ...siteConfig.prizes[0], color: "text-amber-500", bg: "bg-amber-50/50", border: "border-amber-200", glow: "shadow-amber-500/20", featured: true },
    { ...siteConfig.prizes[2], color: "text-orange-700", bg: "bg-orange-50/50", border: "border-orange-200", glow: "shadow-orange-700/20" }
  ];

  return (
    <Section id="prizes" className="relative bg-white py-32 md:py-48 overflow-hidden" ref={containerRef}>
      {/* Background Decorative Elements */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none"
      />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-50/30 rounded-full blur-[120px] -ml-72 -mb-72 pointer-events-none" />

      <Container className="relative z-10 px-6 sm:px-14 lg:px-20 mx-auto">
        <header className="text-center mb-24 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-10 h-px bg-slate-200" />
            <span className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[9px]">
              Rewards of Innovation
            </span>
            <div className="w-10 h-px bg-slate-200" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-slate-900 tracking-tight leading-[0.95] mb-6"
          >
            Excellence recognized. <br />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ delay: 0.25, duration: 6, repeat: Infinity, ease: "linear" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 italic"
              style={{ backgroundSize: "200% 200%" }}
            >
              Impact rewarded.
            </motion.span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mb-8 h-px w-36 bg-gradient-to-r from-transparent via-slate-300 to-transparent"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 bg-slate-900 text-white rounded-full px-6 py-3 shadow-2xl"
          >
            <Sparkles className="text-amber-400 animate-pulse" size={16} />
            <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.25em]">
              ₹1,00,000+ Total Prize Pool
            </span>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-6xl mx-auto">
          {podiumPrizes.map((prize, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.8, 
                  type: "spring", 
                  damping: 20 
                }}
                className={`
                  group relative flex flex-col items-center text-center p-12 md:p-16 rounded-[40px] 
                  border bg-white transition-all duration-500
                  ${prize.featured 
                    ? "md:pb-24 md:pt-20 border-amber-200 shadow-2xl shadow-amber-500/10 z-20 md:-translate-y-8" 
                    : "border-slate-100 shadow-xl shadow-slate-200/20 z-10"
                  }
                  hover:scale-[1.02] active:scale-[0.98]
                `}
              >
                {/* Float animation for 1st Prize */}
                {prize.featured && (
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 bg-amber-500 text-white text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full shadow-lg shadow-amber-500/30"
                  >
                    Grand Champion
                  </motion.div>
                )}

                <h3 className="text-[12px] font-black mb-6 text-slate-400 uppercase tracking-[0.4em]">
                  {prize.rank}
                </h3>

                <div className="space-y-6 mb-10">
                  <span className="text-5xl md:text-6xl font-serif font-black text-slate-900 block tracking-tight leading-none">
                    {prize.amount}
                  </span>
                  <div className={`h-1 w-16 mx-auto rounded-full ${prize.featured ? "bg-amber-500" : "bg-slate-200"}`} />
                </div>

                {/* Decorative background glow on hover */}
                <div className={`absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl -z-10 ${prize.glow}`} />
              </motion.div>
            );
          })}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20 text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]"
        >
          + Special Track Prizes & Goodies for all Finalists
        </motion.p>
      </Container>
    </Section>
  );
}

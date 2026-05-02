import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Section id="faq" className="relative bg-white py-24 md:py-32 overflow-hidden border-t border-border">
      {/* Unique Atmospheric Element */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] -mr-400 animate-pulse" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-400/5 rounded-full blur-[120px] -ml-300" />
      
      <Container>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-emerald-500" />
            <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-[10px]">Help Center</span>
            <div className="w-8 h-[1px] bg-emerald-500" />
          </div>
          <h2 className="text-5xl md:text-8xl font-serif font-black mb-8 text-primary tracking-tight leading-[0.85]">
            Common <br />
            <span className="text-emerald-500 italic">Questions.</span>
          </h2>
          <p className="text-text-secondary font-medium border-t border-emerald-500/10 pt-6 max-w-lg mx-auto">Everything you need to know before you start your mission.</p>
        </div>

        <div className="max-w-3xl mx-auto grid gap-4">
          {siteConfig.faq.map((item, index) => (
            <div 
              key={index} 
              className="rounded-3xl border border-border bg-white overflow-hidden transition-all duration-300 hover:border-accent"
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center hover:bg-surface transition-colors"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-bold text-primary">{item.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Plus size={20} className="text-primary" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-text-secondary text-sm leading-relaxed border-t border-border/50">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

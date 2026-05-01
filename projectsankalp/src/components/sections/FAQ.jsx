import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Section id="faq" className="bg-transparent">
      <Container>
        <div className="text-center mb-16">
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Help</span>
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 text-primary">Common Questions</h2>
          <p className="text-text-secondary font-medium">Everything you need to know before you start.</p>
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

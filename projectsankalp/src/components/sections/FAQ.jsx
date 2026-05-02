import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Section id="faq" className="relative bg-emerald-50/10 py-24 md:py-32 overflow-hidden border-t border-slate-50">
      {/* Premium Atmospheric Accents */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[150px] -mr-400" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] -ml-300" />
      
      <Container className="w-full px-4 sm:px-10 lg:px-20 mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-slate-500" />
            <span className="text-[#16A34A] font-black uppercase tracking-[0.4em] text-[10px]">Help Center</span>
            <div className="w-12 h-[1px] bg-slate-100" />
          </div>
          <h2 className="text-5xl md:text-8xl font-serif font-black mb-10 text-slate-900 tracking-tight leading-[0.9]">
            Common <br />
            <span className="text-[#16A34A] font-bold italic">Questions.</span>
          </h2>
          <p className="text-slate-600 font-medium border-t border-slate-50 pt-8 max-w-lg mx-auto leading-relaxed">Everything you need to know before you start your mission.</p>
        </div>

        <div className="max-w-3xl mx-auto grid gap-4">
          {siteConfig.faq.map((item, index) => (
            <div 
              key={index} 
              className="rounded-2xl border border-slate-100 bg-white overflow-hidden transition-all duration-300 hover:border-emerald-500/20 hover:shadow-xl hover:shadow-slate-900/[0.02]"
            >
              <button
                className="w-full p-8 text-left flex justify-between items-center hover:bg-slate-50/50 transition-colors"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-bold text-slate-900 tracking-tight">{item.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-1 rounded-full bg-slate-50 border border-slate-100"
                >
                  <Plus size={18} className="text-slate-900" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="p-8 pt-0 text-slate-500 text-sm leading-relaxed font-medium border-t border-slate-50/50">
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

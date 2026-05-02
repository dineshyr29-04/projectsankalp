import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Users, Heart, Sprout, Globe, CheckCircle2, ChevronRight } from "lucide-react";

const icons = {
  Users,
  Heart,
  Sprout
};

export default function Tracks({ onKnowMore }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Section id="tracks" className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Premium Atmospheric Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Subtle Base Gradient */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-50/20 rounded-full blur-[140px] -ml-200 -mt-200" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[120px] -mr-200 -mb-200" />
      </div>
      
      <Container className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-left mb-20 md:mb-24 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-slate-200" />
            <span className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px]">The Challenge</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-8xl font-serif font-black mb-10 text-slate-900 tracking-tight leading-[0.9]">
            Problem <br /> 
            <span className="text-slate-400 italic">Tracks.</span>
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-10 border-l border-slate-100 pl-8">
            <p className="text-slate-600 text-lg font-medium max-w-sm leading-relaxed">
              Choose a mission that matters. Each track is designed for high impact and real-world scalability.
            </p>
            <button 
              onClick={() => onKnowMore?.()}
              className="group/btn flex items-center gap-4 bg-emerald-500 text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.3em] hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/10"
            >
              Know More <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Structured Card Grid - Premium Geometry */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative">
          {siteConfig.tracks.map((track, index) => {
            const isCenter = index === 1;

            return (
              <motion.div 
                key={index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                animate={{ 
                  opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.6 : 1,
                  y: hoveredIndex === index ? -8 : 0,
                }}
                className="relative group"
              >
                <div className={`h-full p-10 rounded-2xl bg-white border transition-all duration-500 ${
                  isCenter ? 'border-emerald-500/10 shadow-2xl shadow-emerald-900/[0.03]' : 'border-slate-100 shadow-sm shadow-slate-900/[0.01]'
                } group-hover:border-emerald-500/20 group-hover:shadow-2xl group-hover:shadow-emerald-900/[0.05]`}>
                  
                  {/* Track Meta */}
                  <div className="flex justify-between items-start mb-12">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 group-hover:text-emerald-500 transition-colors">
                      {track.id}
                    </span>
                  </div>

                  {/* Track Content */}
                  <div className="space-y-8">
                    <h3 className="text-2xl font-serif font-black text-slate-900 leading-tight tracking-tight">
                      {track.title}
                    </h3>
                    
                    <p className="text-sm text-slate-500 leading-relaxed font-medium min-h-[48px]">
                      {track.description}
                    </p>

                    <div className="w-full h-[1px] bg-slate-50 group-hover:bg-emerald-500/10 transition-colors" />

                    {/* Focus List */}
                    <div className="space-y-4">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Core Focus</span>
                      <ul className="space-y-3">
                        {track.focus.map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-600">
                            <CheckCircle2 size={12} className="text-emerald-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Alignment Indicator */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <div className="w-[1px] h-6 bg-emerald-500/20" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
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

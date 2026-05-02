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
      
      <Container className="relative z-10 w-full px-4 sm:px-10 lg:px-20 mx-auto">
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
            <span className="text-emerald-600 italic">Tracks.</span>
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
              transition={{ delay: index * 0.1, duration: 0.8 }}
              animate={{
                opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.5 : 1,
                y: hoveredIndex === index ? -6 : 0,
              }}
              className="relative group"
            >
              {/* Glow Border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 
                bg-gradient-to-r from-emerald-400/20 via-transparent to-blue-400/20 blur-xl " />

              {/* Card */}
              <div className="relative h-full p-10 rounded-3xl bg-white/80 backdrop-blur-md border border-white/60 
                  shadow-[inset_0_4px_6px_rgba(0,0,0,0.12),inset_0_-1px_3px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.08)]
                group-hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)] 
                transition-all duration-500">

                {/* Top Meta */}
                <div className="flex justify-between items-center mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-700">
                    {track.id}
                  </span>

                  <span className="text-[10px] text-emerald-500 font-semibold opacity-0 group-hover:opacity-100 transition">
                    Explore →
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif font-black text-slate-900 leading-tight mb-4">
                  {track.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed font-medium mb-8">
                  {track.description}
                </p>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" />

                {/* Focus */}
                <div className="space-y-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">
                    Core Focus
                  </span>

                  <ul className="space-y-2">
                    {track.focus.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-[12px] text-slate-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
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

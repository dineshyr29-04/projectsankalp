import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Users, Heart, Sprout, Globe, CheckCircle2 } from "lucide-react";

const icons = {
  Users,
  Heart,
  Sprout
};

export default function Tracks() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Section id="tracks" className="relative bg-gradient-to-br from-white via-blue-50/40 to-white py-32 overflow-hidden">
      {/* Space Filling - Mission Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Blueprint Grid - More Pronounced */}
        <div className="absolute inset-0 opacity-[0.06]" 
             style={{ backgroundImage: "radial-gradient(#2563eb 1.5px, transparent 1.5px)", backgroundSize: "60px 60px" }} />
        
        {/* Mission Coordinates Metadata */}
        <div className="absolute top-12 left-12 text-[8px] font-black text-blue-500/10 tracking-[0.5em] uppercase vertical-text">
          SANKALP_MISSION_COORD_47.8N_12.2E
        </div>
        <div className="absolute bottom-12 right-12 text-[8px] font-black text-blue-500/10 tracking-[0.5em] uppercase">
          DATA_STREAM_ACTIVE_V8.0
        </div>
      </div>
      
      <Container className="relative z-10">
        <div className="text-left mb-24 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-[1px] bg-accent" />
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px]">The Challenge</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-serif font-black mb-8 text-primary tracking-tight">
            Problem <br /> 
            <span className="text-accent italic">Tracks.</span>
          </h2>
          <p className="text-text-secondary text-lg font-medium border-l-2 border-border pl-6">
            Choose a mission that matters. Each track is designed for high impact and real-world scalability.
          </p>
        </div>

        {/* 3-Column Structured Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-0 md:gap-0 relative">
          
          {/* Background Connector Line (Desktop) */}
          <div className="hidden md:block absolute bottom-[10%] left-0 w-full h-[1px] bg-border/50 -z-10" />

          {siteConfig.tracks.map((track, index) => {
            const Icon = icons[track.icon] || Globe;
            const isCenter = index === 1;
            const isRight = index === 2;
            const isLeft = index === 0;

            return (
              <motion.div 
                key={index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                animate={{ 
                  opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.6 : 1,
                  scale: isCenter ? 1.05 : 1,
                  zIndex: isCenter ? 20 : 10
                }}
                className={`relative flex flex-col ${isCenter ? 'md:-mx-4' : ''} group`}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`h-full p-8 md:p-10 bg-white border border-border transition-all duration-500 rounded-lg shadow-sm ${
                    isCenter ? 'bg-accent/[0.02] border-accent/20 shadow-xl shadow-black/5' : ''
                  } ${
                    isRight ? 'border-r-accent/30' : ''
                  } group-hover:border-accent group-hover:shadow-xl group-hover:shadow-accent/5`}
                >
                  {/* Track Meta */}
                  <div className="flex justify-between items-start mb-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary/50 group-hover:text-accent transition-colors">
                      {track.id}
                    </span>
                  </div>

                  {/* Track Content */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-serif font-black text-primary leading-tight">
                      {track.title}
                    </h3>
                    
                    <p className="text-sm text-text-secondary leading-relaxed font-medium min-h-[48px]">
                      {track.description}
                    </p>

                    <div className="w-full h-[1px] bg-border group-hover:bg-accent/30 transition-colors" />

                    {/* Focus List */}
                    <div className="space-y-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary">Core Focus</span>
                      <ul className="space-y-2">
                        {track.focus.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-primary/70">
                            <CheckCircle2 size={12} className="text-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Dot Alignment Indicator */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-[1px] h-4 bg-accent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

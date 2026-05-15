import React, { useId } from "react";
import { motion } from "framer-motion";
import Container from "../core/Container";

export default function Domains() {
  const id = useId();

  const DOMAINS = [
    {
      id: "01",
      title: "Women's Entrepreneurship",
      color: "text-blue-600",
      accent: "bg-blue-600",
      src: "image-women.png",
      description:
        "Championing gender equality by building tools for financial independence and micro-business scaling.",
      tags: ["Micro-Financing", "Skill Networks"],
    },
    {
      id: "02",
      title: "Health & Sanitation",
      color: "text-emerald-600",
      accent: "bg-emerald-600",
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      description:
        "Developing innovative systems for preventive healthcare, clean water access, and waste management.",
      tags: ["Telemedicine", "Waste Optimization"],
    },
    {
      id: "03",
      title: "Climate Action",
      color: "text-teal-600",
      accent: "bg-teal-600",
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074&auto=format&fit=crop",
      description:
        "Harnessing technology to combat climate change and promote green energy transitions.",
      tags: ["Renewable Energy", "Circular Economy"],
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-slate-50">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-50 blur-[120px] rounded-full" />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-4xl"
        >
          <div className="mb-8">
            <span className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px]">
              Mission Directives
            </span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9] font-thin">
            The <span className="text-emerald-600 italic pr-5">Sankalp</span>{" "}
            <br /> Domains.
          </h2>
          <p className="text-slate-500 mt-6 text-lg font-medium max-w-2xl leading-relaxed">
            Three critical sectors. Nine profound challenges. One goal:
            Technology for global human impact.
          </p>
        </motion.div>

        {/* Domain Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {DOMAINS.map((domain, index) => (
            <motion.div
              key={`card-${domain.title}-${id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group bg-white rounded-[40px] border border-slate-200 overflow-hidden transition-all hover:border-emerald-400/40 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              {/* Image Container */}
              <div className="h-64 overflow-hidden relative">
                <motion.img
                  src={domain.src}
                  alt={domain.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div
                  className={`absolute top-6 left-6 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest ${domain.color} border border-white`}
                >
                  Sector {domain.id}
                </div>
              </div>

              {/* Content */}
              <div className="p-10">
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                  {domain.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium mb-10 line-clamp-2 leading-relaxed">
                  {domain.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex gap-1 flex-wrap">
                    {domain.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

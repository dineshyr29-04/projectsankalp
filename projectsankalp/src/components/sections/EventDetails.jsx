import { motion } from "framer-motion";
import Section from "../core/Section";
import Container from "../core/Container";
import { MapPin, Laptop, ShieldCheck, Briefcase, ChevronRight } from "lucide-react";

export default function EventDetails() {
  const essentials = [
    { icon: <Laptop size={16} />, text: "Laptop and charger" },
    { icon: <ShieldCheck size={16} />, text: "Government ID & College ID" },
    { icon: <Briefcase size={16} />, text: "Personal essentials" },
  ];

  return (
    <Section id="venue" className="relative bg-white py-24 md:py-32 overflow-hidden border-t border-slate-50">
      {/* Premium Atmospheric Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-50 rounded-full blur-[140px] -mr-400" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-[120px] -ml-300" />
      
      <Container className="w-full px-4 sm:px-10 lg:px-20 mx-auto">
        <div className="flex flex-col gap-20 md:gap-24">
          
          {/* Top: Header & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-slate-800" />
                <span className="text-slate-800 font-black uppercase tracking-[0.4em] text-[10px]">Grand Finale Stage</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-serif font-black text-slate-900 leading-[0.9] tracking-tight">
                Where Innovation <br />
                <span className="text-[#16A34A] font-bold italic">Takes Center Stage.</span>
              </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed font-medium max-w-xl border-l border-slate-100 pl-8"
            >
              The final phase of Project Sankalp is a high-stakes, 24-hour sprint where the most promising social-impact solutions are brought to life. Hosted at the state-of-the-art facilities of Yenepoya University, the top teams will build the future of social entrepreneurship. <br />
              <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.1em] mt-8 block bg-emerald-500/5 py-2 px-4 rounded-full border border-emerald-500/10 w-fit">Click the venue image below for exact location on Google Maps.</span>
            </motion.p>
          </div>

          {/* Center: Large Landscape Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative group cursor-pointer"
            onClick={() => window.open("https://maps.app.goo.gl/MvM7bL1oeYJvH4Qx7", "_blank")}
          >
            <div className="absolute -inset-4 bg-slate-100/50 rounded-[40px] blur-3xl group-hover:bg-slate-200/50 transition-colors duration-700" />
            <div className="relative aspect-[4/5] sm:aspect-video md:aspect-[21/8] overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200 shadow-2xl shadow-slate-900/5">
              <img 
                src="/event.png" 
                alt="Yendurance Zone Venue" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                      <MapPin size={18} className="text-white" />
                    </div>
                    <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] text-[#fffdf5]">Event Venue</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl sm:text-3xl md:text-5xl font-serif font-black text-white leading-tight tracking-tight">
                      Yendurance Zone
                    </h4>
                    <p className="text-sm sm:text-base font-bold text-white/100 max-w-lg uppercase tracking-widest">
                      Yenepoya University, Mangalore, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 text-white/90 bg-white/5 backdrop-blur-lg px-4 py-6 rounded-2xl border border-white/10 w-fit">
                  <div className="text-center">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] block mb-2 opacity-50">Capacity</span>
                    <span className="text-xl md:text-3xl font-serif font-bold">30 Teams</span>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] block mb-2 opacity-50">Duration</span>
                    <span className="text-xl md:text-3xl font-serif font-bold">24 Hours</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom: Logistics / Bring With You */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {essentials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-6 p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-900/[0.03] hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-slate-50 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600 block mb-2">Bring With You</span>
                  <p className="text-m font-bold text-slate-900 tracking-tight">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </Section>
  );
}

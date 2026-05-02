import { motion } from "framer-motion";
import Section from "../core/Section";
import Container from "../core/Container";
import { MapPin, Laptop, ShieldCheck, Briefcase, ChevronRight } from "lucide-react";

export default function EventDetails() {
  const essentials = [
    { icon: <Laptop size={16} />, text: "Laptop, charger, extension cord" },
    { icon: <ShieldCheck size={16} />, text: "Government ID & College ID" },
    { icon: <Briefcase size={16} />, text: "Personal essentials" },
  ];

  return (
    <Section id="event-details" className="relative bg-gradient-to-b from-white via-blue-50/20 to-green-50/20 py-24 md:py-32 overflow-hidden border-t border-border">
      {/* Unique Atmospheric Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-[100px] -mr-40" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] -ml-40" />
      
      <Container>
        <div className="flex flex-col gap-16 md:gap-24">
          
          {/* Top: Header & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-[1px] bg-accent" />
                <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px]">Grand Finale Stage</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-serif font-black text-primary leading-tight">
                Where Innovation <br />
                <span className="text-accent italic">Takes Center Stage.</span>
              </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-lg text-text-secondary leading-relaxed font-medium max-w-xl"
            >
              The final phase of Project Sankalp is a high-stakes, 24-hour sprint where the most promising social-impact solutions are brought to life. Hosted at the state-of-the-art facilities of Yenepoya University, the top teams will build the future of social entrepreneurship. <br />
              <span className="text-accent font-black text-xs uppercase tracking-widest mt-4 block">Click the venue image below for exact location on Google Maps.</span>
            </motion.p>
          </div>

          {/* Center: Large Landscape Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative group cursor-pointer"
            onClick={() => window.open("https://maps.app.goo.gl/MvM7bL1oeYJvH4Qx7", "_blank")}
          >
            <div className="absolute -inset-4 bg-accent/5 rounded-[40px] blur-3xl group-hover:bg-accent/10 transition-colors duration-700" />
            <div className="relative aspect-[21/9] md:aspect-[21/8] overflow-hidden rounded-[30px] md:rounded-[40px] border border-border shadow-2xl">
              <img 
                src="/event.png" 
                alt="Yendurance Zone Venue" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/20 backdrop-blur-md rounded-lg border border-accent/30">
                      <MapPin size={18} className="text-accent fill-accent/20" />
                    </div>
                    <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-white">Event Venue</span>
                  </div>
                  <h4 className="text-xl md:text-3xl font-serif font-black text-white max-w-2xl">
                    Yendurance Zone | Yenepoya (Deemed to be University), Deralakatte
                  </h4>
                  <h4 className="text-xl md:text-2xl font-serif font-black text-white max-w-2xl">
                    Mangalore, Karnataka, India 
                  </h4>
                </div>
                
                <div className="flex items-center gap-6 text-white/80">
                  <div className="text-center">
                    <span className="text-[9px] font-black uppercase tracking-widest block mb-1">Capacity</span>
                    <span className="text-xl font-serif font-bold">30 Teams</span>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div className="text-center">
                    <span className="text-[9px] font-black uppercase tracking-widest block mb-1">Duration</span>
                    <span className="text-xl font-serif font-bold">24 Hours</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom: Logistics / Bring With You */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {essentials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex items-center gap-4 p-6 rounded-[24px] bg-white border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-surface text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary block mb-1">Bring With You</span>
                  <p className="text-[13px] font-bold text-primary">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </Section>
  );
}

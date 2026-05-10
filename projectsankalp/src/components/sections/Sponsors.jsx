import Section from "../core/Section";
import Container from "../core/Container";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

export default function Sponsors() {
  const sponsors = [
    { 
      name: "NSS Unit", 
      logo: "/nsslogo.png",
      description: "Service through leadership and social impact."
    },
    { 
      name: "Yenepoya University", 
      logo: "/ysetlogo.png",
      description: "Center for academic excellence and innovation."
    },
    {
      name: "IIC",
      logo: "/IIC.png",
      description: "Institution's Innovation Council"
    },
    {
      name: "Yentech",
      logo: "/yentech.png",
      description: "Prestigious Technical Club of YSET"
    },
    {
      name: "Ministry of Youth Affairs and Sports",
      logo: "/MYAA.png",
      description: "Empowering the next generation of innovators."
    }
  ];

  return (
    <Section id="sponsors" className="relative bg-white py-24 md:py-32 overflow-hidden border-t border-slate-50">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-50 rounded-full blur-[120px] opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-50 rounded-full blur-[120px] opacity-50" />
      </div>
      
      <Container>
        <div className="flex flex-col items-center text-center mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Strategic Partners</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-serif font-black text-slate-900 tracking-tighter leading-[1.1] mb-8"
          >
            Supported <br />
            <span className="text-slate-400 italic">By Pioneers.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-slate-600 text-lg font-medium border-l border-slate-100 pl-8"
          >
            A collective of visionary institutions and organizations committed to fostering grassroots innovation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
          {sponsors.map((sponsor, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white border border-slate-300 rounded-3xl p-8 transition-all duration-700 ease-out shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_0_0_rgba(139,92,246,0)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.15),inset_0_0_20px_rgba(139,92,246,0.05)] hover:border-emerald-400 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
            >
              {/* Subtle accent line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-slate-100 to-transparent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              
              <div className="flex flex-col h-full items-center text-center">
                <div className="h-24 w-full flex items-center justify-center mb-10 relative">
                  {/* Logo Glow */}
                  <div className="absolute inset-0 bg-slate-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="max-h-full max-w-[160px] object-contain relative z-10 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="mt-auto space-y-3">
                  <h3 className="text-xl font-serif font-black text-slate-900 tracking-tight leading-tight">
                    {sponsor.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-[0.2em] leading-relaxed">
                    {sponsor.description}
                  </p>
                </div>

                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight size={20} className="text-slate-300" />
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Become a Partner CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="sm:col-span-2 lg:col-span-1 group relative p-8 rounded-3xl border border-slate-300 bg-white transition-all duration-700 ease-out shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_0_0_rgba(139,92,246,0)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.15),inset_0_0_20px_rgba(139,92,246,0.05)] hover:border-emerald-400 hover:-translate-y-2 hover:scale-[1.02] flex flex-col justify-center items-center text-center gap-8"
          >
            <div className="space-y-3">
              <h3 className="text-2xl font-serif font-black text-slate-900 leading-tight">Partner with us.</h3>
              <p className="text-sm text-slate-500 font-medium max-w-[200px] mx-auto">Showcase your brand to the next generation of innovators.</p>
            </div>
            
            <motion.a
              href="mailto:sankalp@yenepoya.edu.in"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-slate-900/10 hover:bg-emerald-600 transition-all duration-500"
            >
              <Mail size={14} />
              Enquire Now
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}


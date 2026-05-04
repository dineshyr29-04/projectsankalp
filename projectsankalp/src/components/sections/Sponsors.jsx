import Section from "../core/Section";
import Container from "../core/Container";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

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
      name:"IIC",
      logo:"/IIC.png",
      description: "YenTech,IIC"
    },
    {
      name:"Yentech",
      logo:"yentech.png",
      description:"Prestigious Technical Club of YSET"
    },
    {
      name:"Ministry of Youth Affairs and Sports",
      logo:"MYAA.png",
      description:"Empowering the next generation of innovators and showcasing those talents."
    }
  ];

  return (
    <Section id="sponsors" className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(15,23,42,0.03)_0%,transparent_50%)]" />
      
      <Container>
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="h-px w-8 bg-slate-900/20" />
            <span className="text-slate-500 font-black uppercase tracking-[0.4em] text-[10px]">Strategic Partners</span>
            <span className="h-px w-8 bg-slate-900/20" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-black text-slate-900 uppercase tracking-tight mb-6"
          >
            Supported <span className="italic font-light">By</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-slate-500 font-medium leading-relaxed"
          >
            Industry leaders and institutional pioneers driving the future of sustainable innovation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="group relative p-12 rounded-[40px] bg-white/30 backdrop-blur-xl border border-white/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_8px_30px_rgba(0,0,0,0.06)] hover:bg-white/40 hover:border-white/60 hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),0_20px_60px_rgba(16,185,129,0.12)] transition-all duration-500"
            >
              <div className="flex flex-col items-center text-center gap-8">
                <div className="h-24 md:h-32 flex items-center justify-center p-4">
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="max-h-full w-auto object-contain transition-all duration-700 group-hover:scale-110 drop-shadow-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  
                  <h3 className="text-xl italic text-slate-900 mt-4">{sponsor.name}</h3>
                  <p className="text-sm text-slate-500 font-medium">{sponsor.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Become a Sponsor Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 group relative p-12 rounded-[40px] border-2 border-dashed border-slate-200 hover:border-slate-900 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8 mt-4"
          >
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-serif font-black text-slate-900 uppercase tracking-wide mb-2">Partner with us</h3>
              <p className="text-slate-500 font-medium max-w-md">Empower the next generation of innovators and showcase your brand to 500+ participants.</p>
            </div>
            
            <motion.a
              href="mailto:sankalp@yenepoya.edu.in"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[11px] shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all"
            >
              <Mail size={16} />
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </Container>
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </Section>
  );
}

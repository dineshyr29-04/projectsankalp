import { motion } from "framer-motion";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-white">
      {/* Background Flag-like gradient effect */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-orange-500 blur-[120px]" />
        <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white blur-[120px]" />
        <div className="absolute top-2/3 left-0 w-full h-1/3 bg-green-600 blur-[120px]" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Main Title Layout */}
          <div className="relative mb-12">
            <h1 className="text-[70px] md:text-[140px] lg:text-[180px] leading-[0.85] font-serif font-black text-primary tracking-tighter uppercase">
              PROJECT
            </h1>
            <h1 className="text-[70px] md:text-[140px] lg:text-[180px] leading-[0.85] font-serif font-black text-primary tracking-tighter uppercase">
              SANKALP
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="text-sm md:text-xl font-bold text-text-secondary tracking-[0.4em] uppercase mb-16">
              CODE FOR CHANGE
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <button className="bg-primary text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                Apply Now
              </button>
              <button className="bg-white text-primary border-2 border-border px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-surface transition-all flex items-center gap-3">
                <span className="bg-[#3B82F6] p-1 rounded-full text-white text-[10px]">✈️</span> Join Telegram
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 max-w-4xl mx-auto py-8 border-y border-border">
              {siteConfig.stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-black text-primary">{stat.value}</span>
                  <span className="text-[10px] md:text-xs text-text-secondary uppercase tracking-[0.2em] font-bold">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-30">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

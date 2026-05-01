import { motion } from "framer-motion";
import Button from "../core/Button";
import Container from "../core/Container";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden bg-white">
      {/* Background Flag-like gradient effect */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-orange-500 blur-[150px]" />
        <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white blur-[150px]" />
        <div className="absolute top-2/3 left-0 w-full h-1/3 bg-green-600 blur-[150px]" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Main Title Layout from Image */}
          <div className="relative mb-8">
            <h1 className="text-[80px] md:text-[150px] lg:text-[200px] leading-[0.8] font-serif font-black text-[#2D3436] tracking-tighter uppercase">
              ENERGY
            </h1>
            
            <div className="flex items-center justify-center gap-4 md:gap-12">
              <h1 className="text-[80px] md:text-[150px] lg:text-[200px] leading-[0.8] font-serif font-black text-[#2D3436] tracking-tighter uppercase">
                O
              </h1>
              
              {/* Logo Circle in middle */}
              <div className="w-16 h-16 md:w-32 md:h-32 rounded-full border-2 border-primary overflow-hidden bg-white shadow-xl flex items-center justify-center">
                <img 
                  src="https://via.placeholder.com/150x150/FFFFFF/000000?text=LOGO" 
                  alt="Logo"
                  className="w-4/5 h-4/5 object-contain"
                />
              </div>
              
              <h1 className="text-[80px] md:text-[150px] lg:text-[200px] leading-[0.8] font-serif font-black text-[#2D3436] tracking-tighter uppercase relative">
                <span className="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 text-orange-500">-</span>
                THON
              </h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="text-sm md:text-xl font-bold text-text-primary tracking-[0.2em] uppercase mb-12">
              INDO-RUSSIA CLIMATE & ENERGY HACKATHON
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-primary text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-primary/20">
                Apply Now
              </button>
              <button className="bg-white text-primary border-2 border-border px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-surface transition-all flex items-center gap-3">
                <span className="bg-[#3B82F6] p-1 rounded-full text-white">✈️</span> Join Telegram
              </button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
      
      {/* Scroll indicator from image */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-20">
        <div className="w-12 h-12 rounded-2xl bg-surface border border-border" />
      </div>
    </section>
  );
}

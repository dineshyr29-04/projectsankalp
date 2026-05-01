import { motion } from "framer-motion";
import Button from "../core/Button";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-radial opacity-50" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-4"
            style={{ 
              background: "linear-gradient(to bottom, #E6E9F2 0%, #9AA4B2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            PROJECT <br className="md:hidden" /> SANKALP
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-2xl text-text-secondary uppercase tracking-[0.3em] font-medium mb-12"
          >
            {siteConfig.subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button variant="primary" className="w-full sm:w-auto">
              Register Now
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto">
              Learn More
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto p-8 rounded-3xl glass-effect border-white/5"
          >
            {siteConfig.stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-black text-primary">{stat.value}</span>
                <span className="text-xs md:text-sm text-text-secondary uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-border rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

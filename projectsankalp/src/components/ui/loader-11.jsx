import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-8 w-64 h-64">
      <div className="relative flex items-center justify-center w-20 h-20">
        {/* Soft Ambient Glow */}
        <motion.div 
          animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[-50%] bg-emerald-400/20 rounded-full blur-2xl" 
        />

        {/* Sleek Spinning Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-[3px] border-slate-100 border-t-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        />

        {/* Inner Pulsing Core */}
        <motion.div
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)] z-10"
        />
      </div>
      
      {/* Minimalist Loading Text */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-slate-400 font-bold tracking-[0.3em] text-[11px] uppercase z-10"
      >
        Loading
      </motion.div>
    </div>
  );
};

export default Loader;

import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "../../config/navigation";
import { useNavbar } from "../../hooks/useNavbar";
import { cn } from "../../utils/helpers";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { isScrolled, isVisible } = useNavbar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-white text-[10px] md:text-xs py-2 px-4 flex justify-center items-center gap-4 overflow-hidden whitespace-nowrap uppercase tracking-widest font-bold">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
          QUALIFIER ROUND 1 IS LIVE
        </span>
        <span className="opacity-50">|</span>
        <span>SUBMIT BY 21ST MARCH, 11:59 PM IST</span>
        <span className="opacity-50 hidden md:inline">|</span>
        <span className="hidden md:inline">SUBMISSION LINK WILL BE SHARED SOON</span>
      </div>

      <nav className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md border-b border-border py-2" : "bg-transparent py-4"
      )}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo/Language Toggle placeholder style from image */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-xs font-bold uppercase cursor-pointer hover:bg-surface transition-colors">
              <span className="opacity-50">🌐</span> EN <ChevronRight size={12} className="rotate-90 opacity-50" />
            </div>
          </div>

          {/* Desktop Nav Links - Centered Pill */}
          <div className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-surface border border-border">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary hover:bg-white rounded-full transition-all"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-4">
            <a href="#login" className="hidden md:block text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors">
              Log In
            </a>
            <a 
              href="#register" 
              className="bg-primary text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
            >
              Apply Now <ChevronRight size={14} className="-rotate-45" />
            </a>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden text-text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-border p-6 flex flex-col gap-4 lg:hidden"
            >
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-bold uppercase tracking-widest text-text-secondary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

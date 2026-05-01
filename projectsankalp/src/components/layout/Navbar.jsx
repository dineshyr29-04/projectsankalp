import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "../../config/navigation";
import { useNavbar } from "../../hooks/useNavbar";
import { cn } from "../../utils/helpers";
import { Menu, X, ChevronRight, Globe } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { isScrolled, isVisible } = useNavbar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [lang, setLang] = useState("EN");

  const languages = ["EN", "HI", "RU"];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-white text-[10px] md:text-xs py-2 px-4 flex justify-center items-center gap-4 overflow-hidden whitespace-nowrap uppercase tracking-[0.2em] font-bold">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
          QUALIFIER ROUND 1 IS LIVE
        </span>
        <span className="opacity-30">/</span>
        <span>SUBMIT BY 21ST MARCH, 11:59 PM IST</span>
        <span className="opacity-30 hidden md:inline">/</span>
        <span className="hidden md:inline">SUBMISSION LINK WILL BE SHARED SOON</span>
      </div>

      <nav className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md border-b border-border py-2 shadow-sm" : "bg-white py-4"
      )}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Language Toggle */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-[11px] font-black uppercase tracking-widest hover:bg-surface transition-all group"
            >
              <Globe size={14} className="text-primary group-hover:rotate-12 transition-transform" />
              {lang}
              <ChevronRight size={12} className={cn("transition-transform duration-300", isLangOpen ? "-rotate-90" : "rotate-90")} />
            </button>
            
            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 bg-white border border-border rounded-2xl p-2 shadow-2xl min-w-[100px] z-[60]"
                >
                  {languages.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-colors",
                        lang === l ? "bg-primary text-white" : "hover:bg-surface text-text-secondary"
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-surface border border-border">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-5 py-2 text-[11px] font-black uppercase tracking-widest text-text-secondary hover:text-text-primary hover:bg-white rounded-full transition-all"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-4">
            <a href="#login" className="hidden md:block text-[11px] font-black uppercase tracking-[0.2em] text-text-secondary hover:text-text-primary transition-colors">
              Log In
            </a>
            <a 
              href="#register" 
              className="bg-primary text-white px-7 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/10"
            >
              Apply Now <ChevronRight size={14} className="-rotate-45" />
            </a>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden text-text-primary p-2"
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border bg-white overflow-hidden"
            >
              <div className="p-6 flex flex-col gap-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-black uppercase tracking-widest text-text-secondary hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

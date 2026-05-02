import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "../../config/navigation";
import { useNavbar } from "../../hooks/useNavbar";
import { cn } from "../../utils/helpers";
import { Menu, X, ChevronRight, Globe } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { isScrolled } = useNavbar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [lang, setLang] = useState("EN");

  const languages = ["EN", "HI", "RU"];

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex flex-col items-center">
      {/* Announcement Bar - Slimmer */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full bg-primary text-white text-[9px] md:text-[10px] py-1.5 px-4 flex justify-center items-center gap-4 overflow-hidden whitespace-nowrap uppercase tracking-[0.2em] font-bold"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse" />
              QUALIFIER ROUND 1 IS LIVE
            </span>
            <span className="opacity-30">/</span>
            <span>SUBMIT BY 15th MAY, 11:59 PM IST</span>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="w-full flex justify-center pointer-events-auto">
        <motion.div 
          initial={false}
          animate={{
            width: isScrolled ? "90%" : "100%",
            maxWidth: isScrolled ? "1200px" : "100%",
            marginTop: isScrolled ? "16px" : "0px",
            borderRadius: isScrolled ? "50px" : "0px",
            paddingLeft: isScrolled ? "20px" : "40px",
            paddingRight: isScrolled ? "20px" : "40px",
            paddingTop: isScrolled ? "12px" : "16px",
            paddingBottom: isScrolled ? "12px" : "16px",
            backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(24px)",
            boxShadow: isScrolled 
              ? "0 20px 40px -10px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)" 
              : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            borderBottomWidth: isScrolled ? "1px" : "1px",
            borderColor: isScrolled ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.05)",
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 20,
            mass: 1
          }}
          className="flex items-center justify-between border-solid relative z-50 overflow-hidden group"
        >
          {/* Logo */}
          <div className="flex items-center gap-4">
            <a href="#" className="block hover:opacity-80 transition-opacity">
              <img src="/nsslogo.png" alt="Logo" className={cn(
                "transition-all duration-500 object-contain",
                isScrolled ? "w-10 h-10 md:w-12 md:h-12" : "w-10 h-10 md:w-20 md:h-12"
              )} />
            </a>
            
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={cn(
                  "flex items-center gap-2 rounded-full border border-border text-[9px] font-black uppercase tracking-widest hover:bg-surface transition-all group/lang",
                  isScrolled ? "px-3 py-1.5" : "px-3 py-1.5"
                )}
              >
                <Globe size={isScrolled ? 11 : 12} className="text-primary group-hover/lang:rotate-12 transition-transform" />
                {lang}
                <ChevronRight size={10} className={cn("transition-transform duration-300", isLangOpen ? "-rotate-90" : "rotate-90")} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-3 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl p-2 shadow-2xl min-w-[120px] z-[60]"
                  >
                    {languages.map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLang(l);
                          setIsLangOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                          lang === l ? "bg-primary text-white" : "hover:bg-primary/5 text-text-secondary"
                        )}
                      >
                        {l}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Nav Links */}
          <div className={cn(
            "hidden lg:flex items-center gap-1 rounded-full border border-border/40 bg-surface/30 backdrop-blur-sm transition-all duration-500",
            isScrolled ? "p-0.5" : "p-1"
          )}>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "font-black uppercase tracking-widest transition-all rounded-full relative group/link overflow-hidden",
                  isScrolled 
                    ? "px-4 py-1.5 text-[10px] text-text-secondary hover:text-primary" 
                    : "px-4 py-2 text-[10px] text-black hover:text-primary"
                )}
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 bg-primary/5 scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            ))}
          </div>

          {/* Action */}
          <div className="flex items-center gap-4">
            <a
              href="#register"
              className={cn(
                "bg-primary text-white rounded-full font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20",
                isScrolled ? "px-5 py-2.5 text-[9px]" : "px-7 py-3.5 text-[10px]"
              )}
            >
              Apply Now <ChevronRight size={isScrolled ? 11 : 12} className="-rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              className="lg:hidden text-text-primary p-2 hover:bg-surface rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </nav>
    </div>
  );
}

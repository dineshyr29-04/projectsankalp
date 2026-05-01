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
      <AnimatePresence>
        {!isScrolled && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary text-white text-[10px] md:text-xs py-2 px-4 flex justify-center items-center gap-4 overflow-hidden whitespace-nowrap uppercase tracking-[0.2em] font-bold"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
              QUALIFIER ROUND 1 IS LIVE
            </span>
            <span className="opacity-30">/</span>
            <span>SUBMIT BY 21ST MARCH, 11:59 PM IST</span>
            <span className="opacity-30 hidden md:inline">/</span>
            <span className="hidden md:inline">SUBMISSION LINK WILL BE SHARED SOON</span>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={cn(
        "fixed left-0 right-0 z-50 flex justify-center transition-all duration-500",
        isScrolled ? "top-4" : "top-0",
        !isVisible && "-translate-y-32"
      )}>
        <motion.div 
          layout
          initial={false}
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            isScrolled 
              ? "max-w-4xl w-[90%] px-6 py-2 rounded-full glass-effect shadow-2xl border-white/20" 
              : "w-full max-w-7xl px-4 md:px-8 py-4 bg-white/50 backdrop-blur-sm border-b border-border/50"
          )}
        >
          {/* Language Toggle */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={cn(
                "flex items-center gap-2 rounded-full border border-border text-[11px] font-black uppercase tracking-widest hover:bg-surface transition-all group",
                isScrolled ? "px-3 py-1.5" : "px-4 py-2"
              )}
            >
              <Globe size={isScrolled ? 12 : 14} className="text-primary group-hover:rotate-12 transition-transform" />
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
          <div className={cn(
            "hidden lg:flex items-center gap-1 rounded-full border border-border",
            isScrolled ? "p-1 bg-surface/50" : "p-1.5 bg-surface"
          )}>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "font-black uppercase tracking-widest transition-all rounded-full",
                  isScrolled 
                    ? "px-4 py-1.5 text-[9px] text-text-secondary hover:text-text-primary hover:bg-white/50" 
                    : "px-5 py-2 text-[11px] text-text-secondary hover:text-text-primary hover:bg-white"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-4">
            <a href="#login" className={cn(
              "hidden md:block font-black uppercase tracking-[0.2em] text-text-secondary hover:text-text-primary transition-colors",
              isScrolled ? "text-[9px]" : "text-[11px]"
            )}>
              Log In
            </a>
            <a
              href="#register"
              className={cn(
                "bg-primary text-white rounded-full font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/10",
                isScrolled ? "px-5 py-2 text-[9px]" : "px-7 py-3 text-[11px]"
              )}
            >
              Apply <span className="hidden sm:inline">Now</span> <ChevronRight size={isScrolled ? 12 : 14} className="-rotate-45" />
            </a>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden text-text-primary p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden w-[90%] max-w-4xl mt-2 rounded-3xl border border-border bg-white shadow-2xl overflow-hidden"
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

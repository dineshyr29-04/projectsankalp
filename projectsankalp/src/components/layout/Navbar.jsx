import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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

  // Advanced Scroll-Linked Transitions
  const { scrollY } = useScroll();
  
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "92%"]);
  const navMaxWidth = useTransform(scrollY, [0, 100], ["100%", "1200px"]);
  const navTop = useTransform(scrollY, [0, 100], ["0px", "24px"]);
  const navRadius = useTransform(scrollY, [0, 100], ["0px", "60px"]);
  const navBg = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.6)"]);
  const navBorderColor = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0.05)", "rgba(255, 255, 255, 0.4)"]);
  const navShadow = useTransform(
    scrollY, 
    [0, 100], 
    ["0 1px 2px 0 rgba(0, 0, 0, 0.05)", "0 25px 50px -12px rgba(0, 0, 0, 0.2)"]
  );

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex flex-col items-center pointer-events-none">
      {/* Announcement Bar - Slimmer */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div 
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            className="w-full bg-primary text-white text-[9px] md:text-[10px] py-2 px-4 flex justify-center items-center gap-4 overflow-hidden whitespace-nowrap uppercase tracking-[0.2em] font-bold pointer-events-auto"
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

      <nav className="w-full flex justify-center mt-0 px-0">
        <motion.div 
          style={{
            width: navWidth,
            maxWidth: navMaxWidth,
            marginTop: navTop,
            borderRadius: navRadius,
            backgroundColor: navBg,
            borderColor: navBorderColor,
            boxShadow: navShadow,
          }}
          className="flex items-center justify-between border-solid border backdrop-blur-2xl pointer-events-auto overflow-hidden relative group"
        >
          {/* Reflective Edge Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Padding mapped to scroll */}
          <motion.div 
            className="flex items-center justify-between w-full h-full px-6 md:px-10 py-4 md:py-5"
            style={{
              paddingTop: useTransform(scrollY, [0, 100], ["16px", "12px"]),
              paddingBottom: useTransform(scrollY, [0, 100], ["16px", "12px"]),
              paddingLeft: useTransform(scrollY, [0, 100], ["32px", "24px"]),
              paddingRight: useTransform(scrollY, [0, 100], ["32px", "24px"]),
            }}
          >
            {/* Logo */}
            <div className="flex items-center gap-4">
              <a href="#" className="block hover:opacity-80 transition-opacity">
                <img src="/nsslogo.png" alt="Logo" className={cn(
                  "transition-all duration-700 object-contain",
                  isScrolled ? "w-10 h-10 md:w-12 md:h-12" : "w-10 h-10 md:w-20 md:h-14"
                )} />
              </a>
              
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border border-border/50 text-[9px] font-black uppercase tracking-widest hover:bg-white/50 transition-all group/lang",
                    isScrolled ? "px-3 py-1.5" : "px-4 py-2"
                  )}
                >
                  <Globe size={12} className="text-primary group-hover/lang:rotate-12 transition-transform" />
                  {lang}
                  <ChevronRight size={10} className={cn("transition-transform duration-300", isLangOpen ? "-rotate-90" : "rotate-90")} />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 mt-3 bg-white/80 backdrop-blur-3xl border border-white/50 rounded-3xl p-2 shadow-2xl min-w-[140px] z-[60] overflow-hidden"
                    >
                      {languages.map((l) => (
                        <button
                          key={l}
                          onClick={() => {
                            setLang(l);
                            setIsLangOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-5 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all",
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
              "hidden lg:flex items-center gap-1 rounded-full border border-white/30 bg-white/20 backdrop-blur-md transition-all duration-700",
              isScrolled ? "p-0.5" : "p-1"
            )}>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "font-black uppercase tracking-widest transition-all rounded-full relative group/link overflow-hidden",
                    isScrolled 
                      ? "px-5 py-2 text-[10px] text-text-secondary hover:text-primary" 
                      : "px-6 py-2.5 text-[10px] text-black hover:text-primary"
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left duration-500" />
                </a>
              ))}
            </div>

            {/* Action */}
            <div className="flex items-center gap-4">
              <a
                href="#register"
                className={cn(
                  "bg-primary text-white rounded-full font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-primary/95 hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300",
                  isScrolled ? "px-6 py-3 text-[9px]" : "px-8 py-4 text-[10px]"
                )}
              >
                Apply Now <ChevronRight size={12} className="-rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                className="lg:hidden text-text-primary p-2 hover:bg-white/50 rounded-full transition-colors pointer-events-auto"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </nav>
    </div>
  );
}

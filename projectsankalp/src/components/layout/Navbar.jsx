import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
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

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const languages = ["EN", "HI", "RU"];

  // Progressive Transforms based on scroll (0-150px for more headroom)
  const navWidth = useTransform(smoothScrollY, [0, 100], ["96%", "90%"]);
  const navMaxWidth = useTransform(smoothScrollY, [0, 100], ["1400px", "1100px"]);
  const navMarginTop = useTransform(smoothScrollY, [0, 100], [10, 20]);
  const navBorderRadius = useTransform(smoothScrollY, [0, 100], [24, 80]);
  const navPaddingX = useTransform(smoothScrollY, [0, 100], [32, 24]);
  const navPaddingY = useTransform(smoothScrollY, [0, 100], [14, 10]);
  const navBg = useTransform(smoothScrollY, [0, 100], ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.5)"]);
  const navBorderColor = useTransform(smoothScrollY, [0, 100], ["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.4)"]);
  const navShadow = useTransform(smoothScrollY, [0, 100], [
    "0 10px 30px -10px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
    "0 25px 50px -15px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.6)"
  ]);
  const logoScale = useTransform(smoothScrollY, [0, 100], [1, 0.85]);
  const logoWidth = useTransform(smoothScrollY, [0, 100], [120, 90]);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex flex-col items-center pointer-events-none">
      {/* Announcement Bar */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div 
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            className="w-full bg-primary text-white text-[9px] md:text-[10px] py-2 px-4 flex justify-center items-center gap-4 overflow-hidden whitespace-nowrap uppercase tracking-[0.3em] font-black pointer-events-auto"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
              QUALIFIER ROUND 1 IS LIVE
            </span>
            <span className="opacity-30">/</span>
            <span>SUBMIT BY 15th MAY, 11:59 PM IST</span>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="w-full flex justify-center py-0">
        <motion.div 
          style={{
            width: navWidth,
            maxWidth: navMaxWidth,
            marginTop: navMarginTop,
            borderRadius: navBorderRadius,
            paddingLeft: navPaddingX,
            paddingRight: navPaddingX,
            paddingTop: navPaddingY,
            paddingBottom: navPaddingY,
            backgroundColor: navBg,
            boxShadow: navShadow,
            borderColor: navBorderColor,
            backdropFilter: "blur(30px)",
          }}
          className="flex items-center justify-between border border-solid pointer-events-auto relative z-50 overflow-hidden group/nav"
        >
          {/* Left: Logo */}
          <div className="flex items-center">
            <a href="#" className="block hover:opacity-80 transition-opacity">
              <motion.img 
                src="/nsslogo.png" 
                alt="Logo" 
                style={{ scale: logoScale, width: logoWidth }}
                className="h-10 md:h-12 object-contain origin-left transition-all duration-300 drop-shadow-sm" 
              />
            </a>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden lg:flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/50 p-1 rounded-full shadow-inner">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-black uppercase tracking-widest transition-all rounded-full relative group/link overflow-hidden px-5 py-2 text-[10px] text-primary/80 hover:text-primary"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left duration-500 ease-out" />
              </a>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Language Switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 rounded-full border border-primary/10 bg-white/40 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:border-primary/30 transition-all px-4 py-2 group/lang"
              >
                <Globe size={14} className="text-primary group-hover/lang:rotate-12 transition-transform" />
                {lang}
                <ChevronRight size={10} className={cn("transition-transform duration-300", isLangOpen ? "-rotate-90" : "rotate-90")} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-3 bg-white/95 backdrop-blur-2xl border border-white/50 rounded-[24px] p-2 shadow-2xl min-w-[140px] z-[60]"
                  >
                    {languages.map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLang(l);
                          setIsLangOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                          lang === l ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-primary/5 text-text-secondary"
                        )}
                      >
                        {l}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#register"
              className={cn(
                "bg-primary text-white rounded-full font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-primary/95 hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-primary/20 px-8 py-3.5 text-[10px]",
                isScrolled && "px-6 py-3 text-[9px]"
              )}
            >
              Apply Now <ChevronRight size={12} className="-rotate-45 group-hover/nav:translate-x-0.5 group-hover/nav:-translate-y-0.5 transition-transform" />
            </a>

            <button
              className="lg:hidden text-primary p-2.5 hover:bg-white rounded-full transition-colors shadow-sm bg-white/50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.div>
      </nav>
    </div>
  );
}

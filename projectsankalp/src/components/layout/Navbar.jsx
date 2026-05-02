import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { navigation } from "../../config/navigation";
import { useNavbar } from "../../hooks/useNavbar";
import { cn } from "../../utils/helpers";
import { Menu, X, ChevronRight, Globe, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar({ onNavigate, currentView }) {
  const { isScrolled } = useNavbar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isLanding = currentView === "landing";

  // Direct scroll without spring for snappy response
  const { scrollY } = useScroll();
  
  // Snappy spring physics: high stiffness, low damping for responsive feel
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 200,
    damping: 15,
    restDelta: 0.001
  });

  // Progressive Transforms based on scroll (0-80px for faster response)
  const navWidth = useTransform(smoothScrollY, [0, 80], ["96%", "90%"]);
  const navMaxWidth = useTransform(smoothScrollY, [0, 80], ["2200px", "1000px"]);
  const navMarginTop = useTransform(smoothScrollY, [0, 80], [10, 20]);
  const navBorderRadius = useTransform(smoothScrollY, [0, 80], [24, 80]);
  const navPaddingX = useTransform(smoothScrollY, [0, 80], [32, 24]);
  const navPaddingY = useTransform(smoothScrollY, [0, 80], [14, 10]);
  const navBg = useTransform(smoothScrollY, [0, 80], ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.5)"]);
  const navBorderColor = useTransform(smoothScrollY, [0, 80], ["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.4)"]);
  const navShadow = useTransform(smoothScrollY, [0, 80], [
    "0 10px 30px -10px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
    "0 25px 50px -15px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.6)"
  ]);
  const logoScale = useTransform(smoothScrollY, [0, 80], [1, 0.85]);
  const logoWidth = useTransform(smoothScrollY, [0, 80], [120, 90]);

  useEffect(() => {
    const sections = navigation.map(item => item.href.replace("#", ""));
    let ticking = false;
    
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      
      requestAnimationFrame(() => {
        // Find the current section based on scroll position
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        let currentSection = sections[0];
        
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const { offsetTop } = el;
            if (scrollPosition >= offsetTop) {
              currentSection = id;
            }
          }
        }
        
        setActiveSection(currentSection);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onNavigate]);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex flex-col items-center pointer-events-none">
      {/* Announcement Bar - Always Fixed */}
      <div 
        className="w-full bg-primary text-white text-[9px] md:text-[10px] py-2 px-4 flex justify-center items-center gap-4 overflow-hidden whitespace-nowrap uppercase tracking-[0.3em] font-black pointer-events-auto shadow-[inset_0_4px_6px_rgba(0,0,0,0.12),inset_0_-1px_3px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.08)]"
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
          QUALIFIER ROUND 1 IS LIVE
        </span>
        <span className="opacity-30">/</span>
        <span>SUBMIT BY 15th MAY, 11:59 PM IST</span>
      </div>

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
          className="flex items-center justify-between border border-solid pointer-events-auto relative z-50 overflow-hidden group/nav "
        >
          {/* Left: Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate?.("landing")}
              className="block hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            >
              <motion.img 
                src="/nsslogo.png" 
                alt="Logo" 
                style={{ scale: logoScale, width: logoWidth }}
                className="h-10 md:h-12 object-contain origin-left transition-all duration-300 drop-shadow-sm" 
              />
            </button>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden lg:flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/50 p-1 rounded-full shadow-[inset_0_4px_6px_rgba(0,0,0,0.12),inset_0_-1px_3px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.08)] ">
            {isLanding ? (
              navigation.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href === "#stages") {
                        e.preventDefault();
                        onNavigate?.("stages");
                      } else if (item.href.startsWith("#")) {
                        onNavigate?.("landing");
                      }
                    }}
                    className={cn(
                      "font-black uppercase tracking-widest transition-all rounded-full relative group/link overflow-hidden px-5 py-2 text-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isActive ? "text-white" : "text-primary/80 hover:text-primary"
                    )}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className={cn(
                      "absolute inset-0 transition-transform origin-left duration-500 ease-out",
                      isActive ? "bg-primary scale-x-100" : "bg-primary/10 scale-x-0 group-hover/link:scale-x-100"
                    )} />
                  </a>
                );
              })
            ) : (
              <button
                onClick={() => onNavigate?.("landing")}
                className="flex items-center gap-2 px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-white transition-all rounded-full"
              >
                <ArrowLeft size={14} className="mr-1" />
                Back to Website
              </button>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href="https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755"
              className={cn(
                "bg-primary text-white rounded-full font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-primary/95 hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-primary/20 px-6 py-2.5 text-[8px] md:px-8 md:py-3.5 md:text-[10px]",
                isScrolled && "px-4 py-2 text-[8px] md:px-6 md:py-3 md:text-[9px]"
              )}
              target="_blank"
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

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-[90%] mt-4 bg-white/90 backdrop-blur-2xl border border-white/50 rounded-[32px] overflow-hidden lg:hidden pointer-events-auto shadow-2xl"
          >
            <div className="p-8 flex flex-col gap-6">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    if (item.href === "#stages") {
                      e.preventDefault();
                      onNavigate?.("stages");
                    } else if (item.href.startsWith("#")) {
                      onNavigate?.("landing");
                    }
                  }}
                  className="text-xl font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors flex items-center justify-between group"
                >
                  {item.name}
                  <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
              <div className="h-px bg-primary/10 my-2" />
              <a
                href="https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755"
                target="_blank"
                className="bg-primary text-white text-center py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20"
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

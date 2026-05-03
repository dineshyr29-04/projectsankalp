import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { navigation } from "../../config/navigation";
import { useNavbar } from "../../hooks/useNavbar";
import { cn } from "../../utils/helpers";
import { Menu, X, ChevronRight, Globe, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar({ onNavigate, currentView }) {
  const { isScrolled } = useNavbar();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isLanding = currentView === "landing";

  // Direct scroll without spring for snappy response
  const { scrollY } = useScroll();
  
  // Smooth, gentle spring physics: balanced for responsive yet smooth transitions
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 120, // Slightly softer for more "premium" feel
    damping: 30,
    restDelta: 0.001
  });

  // Progressive Transforms based on scroll
  const navWidth = useTransform(smoothScrollY, [0, 150], isMobile ? ["94%", "90%"] : ["96%", "90%"]);
  const navMaxWidth = useTransform(smoothScrollY, [0, 150], isMobile ? ["600px", "500px"] : ["2200px", "1000px"]);
  const navMarginTop = useTransform(smoothScrollY, [0, 150], isMobile ? [4, 8] : [10, 20]);
  const navBorderRadius = useTransform(smoothScrollY, [0, 150], isMobile ? [20, 40] : [24, 80]);
  const navPaddingX = useTransform(smoothScrollY, [0, 150], isMobile ? [16, 12] : [32, 24]);
  const navPaddingY = useTransform(smoothScrollY, [0, 150], isMobile ? [10, 8] : [14, 10]);
  const navBg = useTransform(smoothScrollY, [0, 150], ["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 0.7)"]);
  const navBorderColor = useTransform(smoothScrollY, [0, 150], ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.5)"]);
  const navShadow = useTransform(smoothScrollY, [0, 150], [
    "0 10px 30px -10px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
    "0 20px 40px -15px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.6)"
  ]);
  const logoScale = useTransform(smoothScrollY, [0, 150], isMobile ? [0.9, 0.8] : [1, 0.85]);
  const logoWidth = useTransform(smoothScrollY, [0, 150], isMobile ? [100, 80] : [120, 90]);

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
        className="w-full bg-primary text-white text-[8px] md:text-[10px] py-1.5 md:py-2 px-4 flex justify-center items-center gap-3 md:gap-4 overflow-hidden whitespace-nowrap uppercase tracking-[0.2em] md:tracking-[0.3em] font-black pointer-events-auto shadow-[inset_0_4px_6px_rgba(0,0,0,0.12),inset_0_-1px_3px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.08)]"
      >
        <span className="flex items-center gap-1.5 md:gap-2">
          <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
          QUALIFIER ROUND 1 IS LIVE
        </span>
        <span className="opacity-30">/</span>
        <span className="hidden xs:inline">SUBMIT BY 15th MAY, 11:59 PM IST</span>
        <span className="xs:hidden">SUBMIT BY 15th MAY</span>
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
            backdropFilter: "blur(40px)", // Increased blur for better readability
          }}
          className="flex items-center justify-between border border-solid pointer-events-auto relative z-50 overflow-visible group/nav transition-colors duration-500"
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
                className="h-8 md:h-12 object-contain origin-left transition-all duration-500 drop-shadow-sm" 
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
              <motion.button
                onClick={() => onNavigate?.("landing")}
                whileHover={{ backgroundColor: "var(--color-primary)", color: "white" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center gap-2 px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-transparent rounded-full"
              >
                <ArrowLeft size={14} className="mr-1" />
                Back to Website
              </motion.button>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <motion.a
              href="https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "bg-primary text-white rounded-full font-black uppercase tracking-[0.1em] md:tracking-[0.2em] flex items-center gap-1.5 md:gap-2 hover:bg-primary/95 active:scale-95 shadow-lg shadow-primary/20 px-4 py-2 text-[7px] md:px-8 md:py-3.5 md:text-[10px]",
                isScrolled && "px-3 py-1.5 text-[7px] md:px-6 md:py-3 md:text-[9px]"
              )}
              target="_blank"
            >
              Apply Now <ChevronRight size={10} className="-rotate-45 md:size-12" />
            </motion.a>

            <button
              className="lg:hidden text-primary p-2 hover:bg-white rounded-full transition-all shadow-sm bg-white/50 active:scale-90"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-[92%] mt-2 bg-white/95 backdrop-blur-2xl border border-white/50 rounded-[24px] overflow-hidden lg:hidden pointer-events-auto shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-4">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    if (item.href === "#stages") {
                      e.preventDefault();
                      onNavigate?.("stages");
                    } else if (item.href.startsWith("#")) {
                      onNavigate?.("landing");
                    }
                  }}
                  className="text-sm font-black uppercase tracking-widest text-primary/70 hover:text-primary transition-colors flex items-center justify-between group py-2"
                >
                  {item.name}
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
                </motion.a>
              ))}
              <div className="h-px bg-primary/5 my-1" />
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                href="https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755"
                target="_blank"
                className="bg-primary text-white text-center py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
              >
                Apply Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  );
}

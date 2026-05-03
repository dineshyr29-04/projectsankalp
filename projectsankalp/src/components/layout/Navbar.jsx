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
  
  // High-performance spring: calibrated for "liquid" fluid motion
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 80, // Lower stiffness for calmer, more fluid motion
    damping: 30,   // Balanced damping to prevent bounce
    mass: 1,
    restDelta: 0.001
  });

  // Premium Easing Curve
  const fluidEasing = [0.16, 1, 0.3, 1];

  // Progressive Transforms based on scroll (Gradual, not binary)
  const navWidth = useTransform(smoothScrollY, [0, 150], isMobile ? ["94%", "90%"] : ["96%", "90%"]);
  const navMaxWidth = useTransform(smoothScrollY, [0, 150], isMobile ? ["600px", "500px"] : ["2200px", "1000px"]);
  const navMarginTop = useTransform(smoothScrollY, [0, 150], isMobile ? [4, 8] : [10, 20]);
  const navBorderRadius = useTransform(smoothScrollY, [0, 150], isMobile ? [20, 40] : [24, 80]);
  const navPaddingX = useTransform(smoothScrollY, [0, 150], isMobile ? [16, 12] : [32, 24]);
  const navPaddingY = useTransform(smoothScrollY, [0, 150], isMobile ? [10, 8] : [14, 10]);
  const navBg = useTransform(smoothScrollY, [0, 150], ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.75)"]);
  const navBorderColor = useTransform(smoothScrollY, [0, 150], ["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 0.4)"]);
  const navShadow = useTransform(smoothScrollY, [0, 150], [
    "0 10px 30px -10px rgba(0, 0, 0, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.6)",
    "0 20px 40px -15px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.7)"
  ]);
  const logoScale = useTransform(smoothScrollY, [0, 150], isMobile ? [0.85, 0.8] : [1, 0.85]);
  const logoWidth = useTransform(smoothScrollY, [0, 150], isMobile ? [90, 80] : [120, 90]);

  // CTA Button Transforms (Fluid instead of binary)
  const buttonPx = useTransform(smoothScrollY, [0, 150], isMobile ? [16, 12] : [32, 24]);
  const buttonPy = useTransform(smoothScrollY, [0, 150], isMobile ? [8, 6] : [14, 12]);
  const buttonFontSize = useTransform(smoothScrollY, [0, 150], isMobile ? [7, 7] : [10, 9]);
  const buttonGap = useTransform(smoothScrollY, [0, 150], [6, 4]);

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
        className="w-full bg-primary text-white text-[8px] md:text-[10px] py-1.5 md:py-2 px-4 flex justify-center items-center gap-3 md:gap-4 overflow-hidden whitespace-nowrap uppercase tracking-[0.2em] md:tracking-[0.3em] font-black pointer-events-auto shadow-[inset_0_4px_6px_rgba(0,0,0,0.1),inset_0_-1px_2px_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.05)]"
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
            backdropFilter: "blur(40px)",
          }}
          className="flex items-center justify-between border border-solid pointer-events-auto relative z-50 overflow-visible group/nav"
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
                className="h-8 md:h-12 object-contain origin-left drop-shadow-sm will-change-transform" 
              />
            </button>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden lg:flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/50 p-1 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
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
                transition={{ duration: 0.35, ease: fluidEasing }}
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
              style={{
                paddingLeft: buttonPx,
                paddingRight: buttonPx,
                paddingTop: buttonPy,
                paddingBottom: buttonPy,
                fontSize: buttonFontSize,
                gap: buttonGap
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-white rounded-full font-black uppercase tracking-[0.15em] flex items-center shadow-lg shadow-primary/20 will-change-[padding,font-size]"
              target="_blank"
            >
              Apply Now <ChevronRight size={10} className="-rotate-45" />
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
            transition={{ duration: 0.45, ease: fluidEasing }}
            className="w-[92%] mt-2 bg-white/95 backdrop-blur-2xl border border-white/50 rounded-[24px] overflow-hidden lg:hidden pointer-events-auto shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-4">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.4, ease: fluidEasing }}
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
                transition={{ delay: 0.25, duration: 0.4, ease: fluidEasing }}
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


import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleMenu } from "../ui/CircleMenu";
import { 
  Home, 
  User, 
  MapPin, 
  Zap, 
  Trophy, 
  HelpCircle,
  Brain,
  Menu,
  X
} from "lucide-react";

export default function Navbar({ onNavigate, currentView }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isLanding = currentView === "landing";

  const menuItems = [
    { name: "Home", href: "#hero", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Venue", href: "#venue", icon: MapPin },
    { name: "Tracks", href: "#tracks", icon: Zap },
    { name: "Prizes", href: "#prizes", icon: Trophy },
    { name: "Domains", href: "#domains", icon: Brain },
    { name: "FAQ", href: "#faq", icon: HelpCircle },
  ];

  // CircleMenu expects icon as a rendered element
  const circleMenuItems = menuItems.map(item => ({
    ...item,
    label: item.name,
    icon: <item.icon size={18} />
  }));

  const handleItemClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (!isLanding) {
      onNavigate?.("landing");
      return;
    }

    if (href.startsWith("#")) {
      const sectionId = href.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="fixed top-6 left-6 md:top-8 md:left-8 z-[100] pointer-events-none">
      
      {/* ── DESKTOP: VERTICAL DRAWER RAIL ── */}
      <div className="hidden md:flex flex-col items-center pointer-events-auto gap-4">
        {!isLanding ? (
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate?.("landing")}
            className="flex"
          >
          </motion.button>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {/* Drawer Trigger */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center w-14 h-14 rounded-2xl shadow-xl transition-all duration-500 border ${
                isOpen 
                  ? "bg-emerald-500 border-emerald-400 text-white" 
                  : "bg-white/90 backdrop-blur-xl border-slate-100 text-slate-900"
              }`}
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {isOpen ? <X size={22} strokeWidth={3} /> : <Menu size={22} strokeWidth={3} />}
              </motion.div>
            </motion.button>

            {/* The Individual Drawer Items */}
            <AnimatePresence>
              {isOpen && (
                <div className="flex flex-col items-center gap-3">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, y: -20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.05,
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      whileHover={{ scale: 1.1, backgroundColor: "#0f172a", color: "#fff" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleItemClick(e, item.href)}
                      className="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-100 text-slate-400 shadow-xl transition-all duration-300"
                    >
                      <item.icon size={20} />
                      
                      {/* Tooltip Label */}
                      <div className="absolute left-16 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all -translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
                        {item.name}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ── MOBILE: CIRCULAR MENU ── */}
      <div className="md:hidden pointer-events-auto">
        {!isLanding ? (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => onNavigate?.("landing")}
            className="flex items-center justify-center bg-transparent text-white w-12 h-12 rounded-xl shadow-xl"
          >
          </motion.button>
        ) : (
          <CircleMenu 
            items={circleMenuItems} 
            onItemClick={handleItemClick}
          />
        )}
      </div>
    </div>
  );
}

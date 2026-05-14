
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
  ArrowLeft,
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
      
      {/* ── DESKTOP: PERMANENT MAGNETIC COMMAND RAIL ── */}
      <div className="hidden md:flex flex-col items-center pointer-events-auto gap-6 py-8 px-3 bg-white/40 backdrop-blur-3xl rounded-[40px] border border-white/50 shadow-[0_20px_80px_rgba(0,0,0,0.05)]">
        {!isLanding ? (
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1, backgroundColor: "#0f172a", color: "#fff" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate?.("landing")}
            className="flex items-center justify-center bg-white/80 text-slate-900 w-12 h-12 rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </motion.button>
        ) : (
          <div className="flex flex-col items-center gap-5">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ 
                  scale: 1.15,
                  y: -2,
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)"
                }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleItemClick(e, item.href)}
                className="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-white/80 text-slate-400 border border-slate-100/50 transition-all duration-300 shadow-sm"
              >
                <item.icon size={18} strokeWidth={2.2} />
                
                {/* Premium Tooltip */}
                <div className="absolute left-16 px-4 py-2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.25em] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all -translate-x-3 group-hover:translate-x-0 whitespace-nowrap shadow-2xl z-50">
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                  {item.name}
                </div>

                {/* Vertical Accent */}
                <div className="absolute -left-3 w-1 h-0 group-hover:h-5 bg-slate-900 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100" />
              </motion.button>
            ))}
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
            className="flex items-center justify-center bg-slate-900 text-white w-12 h-12 rounded-xl shadow-xl"
          >
            <ArrowLeft size={18} />
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

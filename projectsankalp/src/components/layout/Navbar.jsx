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
  X,
  Users,
} from "lucide-react";

const NavIcon = ({ icon: Icon, active = false, className = "" }) => (
  <span
    className={`inline-flex items-center justify-center rounded-lg border transition-all duration-300 ${className} ${
      active
        ? "bg-slate-900 text-white border-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.22)]"
        : "bg-white/80 text-slate-500 border-slate-200 shadow-sm group-hover:border-emerald-200 group-hover:text-emerald-700"
    }`}
  >
    <Icon size={18} strokeWidth={2.3} />
  </span>
);

export default function Navbar({ onNavigate, currentView }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isLanding = currentView === "landing";

  const menuItems = [
    { name: "About", href: "#about", icon: User },
    { name: "Venue", href: "#venue", icon: MapPin },
    { name: "Tracks", href: "#tracks", icon: Zap },
    { name: "Prizes", href: "#prizes", icon: Trophy },
    { name: "Domains", href: "#domains", icon: Brain },
    { name: "FAQ", href: "#faq", icon: HelpCircle },
    { name: "Team", href: "team", icon: Users },
  ];

  const circleMenuItems = menuItems.map((item) => ({
    ...item,
    label: item.name,
    icon: <NavIcon icon={item.icon} className="h-10 w-10" />,
  }));

  const scrollToSection = (sectionId) => {
    window.setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 180);
  };

  const handleItemClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === "team") {
      onNavigate?.("team");
      return;
    }

    if (!isLanding) {
      onNavigate?.("landing");
      if (href.startsWith("#")) {
        scrollToSection(href.replace("#", ""));
      }
      return;
    }

    if (href.startsWith("#")) {
      const element = document.getElementById(href.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="fixed top-6 left-6 md:top-8 md:left-8 z-[100] pointer-events-none">
      <div className="hidden md:flex flex-col items-center pointer-events-auto gap-4">
        {!isLanding ? (
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.08, ease: "easeOut" }}
            onClick={() => onNavigate?.("landing")}
            className="group relative flex items-center justify-center w-14 h-14 rounded-xl bg-white/90 backdrop-blur-xl border border-slate-100 text-slate-900 shadow-xl transition-all duration-150 overflow-hidden"
            aria-label="Go to home"
          >
            <span className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-slate-50/70 to-sky-50/0 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
            <NavIcon icon={Home} className="relative z-10 h-9 w-9" />
            <div className="absolute left-16 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 -translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
              Home
            </div>
          </motion.button>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.08, ease: "easeOut" }}
              className={`flex items-center justify-center w-14 h-14 rounded-xl shadow-xl transition-all duration-500 border ${
                isOpen
                  ? "bg-emerald-500 border-emerald-400 text-white"
                  : "bg-white/90 backdrop-blur-xl border-slate-100 text-slate-900"
              }`}
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              >
                {isOpen ? (
                  <X size={22} strokeWidth={2.5} />
                ) : (
                  <Menu size={22} strokeWidth={2.5} />
                )}
              </motion.div>
            </motion.button>

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
                        duration: 0.24,
                        delay: index * 0.035,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ scale: 1.14, y: -2, transition: { duration: 0.08, ease: "easeOut" } }}
                      whileTap={{ scale: 0.94, transition: { duration: 0.08, ease: "easeOut" } }}
                      onClick={(e) => handleItemClick(e, item.href)}
                      className="group relative flex items-center justify-center w-12 h-12 rounded-lg bg-white/90 backdrop-blur-xl border border-slate-100 text-slate-400 shadow-xl transition-all duration-150 overflow-hidden"
                      aria-label={item.name}
                    >
                      <span className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-slate-50/70 to-sky-50/0 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                      <NavIcon icon={item.icon} className="relative z-10 h-9 w-9" />
                      <div className="absolute left-16 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 -translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
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

      <div className="md:hidden pointer-events-auto">
        {!isLanding ? (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.08, ease: "easeOut" }}
            onClick={() => onNavigate?.("landing")}
            className="group relative flex items-center justify-center bg-white/90 backdrop-blur-xl border border-slate-100 text-slate-900 w-12 h-12 rounded-xl shadow-xl overflow-hidden"
            aria-label="Go to home"
          >
            <span className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-slate-50/70 to-sky-50/0 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
            <NavIcon icon={Home} className="relative z-10 h-8 w-8" />
            <div className="absolute left-14 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 -translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
              Home
            </div>
          </motion.button>
        ) : (
          <CircleMenu items={circleMenuItems} onItemClick={handleItemClick} />
        )}
      </div>
    </div>
  );
}

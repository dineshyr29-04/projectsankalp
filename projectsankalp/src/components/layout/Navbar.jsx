
import React from "react";
import { motion } from "framer-motion";
import { navigation } from "../../config/navigation";
import { CircleMenu } from "../ui/CircleMenu";
import { 
  Home, 
  User, 
  MapPin, 
  Zap, 
  Trophy, 
  HelpCircle,
  ArrowLeft,
  Clock
} from "lucide-react";

export default function Navbar({ onNavigate, currentView }) {
  const isLanding = currentView === "landing";

  // Map icons to navigation items
  const menuItems = navigation.map((item) => {
    let Icon = HelpCircle;
    switch (item.name.toLowerCase()) {
      case "home": Icon = Home; break;
      case "about": Icon = User; break;
      case "venue": Icon = MapPin; break;
      case "prizes": Icon = Trophy; break;
      case "faq": Icon = HelpCircle; break;
      case "booking": Icon = Clock; break;
    }
    return {
      ...item,
      label: item.name,
      icon: <Icon size={18} />,
    };
  });

  const handleItemClick = (e, href) => {
    if (!isLanding) {
      e.preventDefault();
      onNavigate?.("landing");
      return;
    }

    if (href === "/booking") {
      e.preventDefault();
      onNavigate?.("booking");
      return;
    }

    if (href.startsWith("#")) {
      e.preventDefault();
      const sectionId = href.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="fixed top-8 left-8 z-[100] flex flex-col gap-4 pointer-events-none">
      {/* ── Minimalist Vertical Dropdown Navbar ── */}
      <div className="pointer-events-auto">
        {!isLanding ? (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => onNavigate?.("landing")}
            className="flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl hover:bg-slate-800 transition-all active:scale-95 group mb-4"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Hub</span>
          </motion.button>
        ) : (
          <CircleMenu 
            items={menuItems} 
            onItemClick={handleItemClick}
          />
        )}
      </div>
    </div>
  );
}

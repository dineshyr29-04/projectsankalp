import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "../../config/navigation";
import { useNavbar } from "../../hooks/useNavbar";
import { cn } from "../../utils/helpers";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { isScrolled, isVisible } = useNavbar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={cn(
      "fixed top-6 left-0 right-0 z-50 flex justify-center px-6 transition-all duration-500",
      !isVisible && "-top-24"
    )}>
      <div className={cn(
        "flex items-center gap-8 px-6 py-3 rounded-full transition-all duration-300",
        "glass-effect shadow-lg",
        isScrolled ? "scale-95" : "scale-100"
      )}>
        <a href="#" className="text-lg font-bold text-primary tracking-tighter">
          PS<span className="text-accent">.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block h-4 w-[1px] bg-border" />

        <a 
          href="#register" 
          className="hidden md:block text-sm font-semibold text-accent hover:text-white transition-colors"
        >
          Register
        </a>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-6 right-6 p-6 rounded-2xl glass-effect md:hidden flex flex-col gap-6"
          >
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-lg font-medium text-text-secondary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#register" 
              className="text-lg font-bold text-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

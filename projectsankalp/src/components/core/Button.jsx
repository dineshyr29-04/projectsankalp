import { motion } from "framer-motion";
import { cn } from "../../utils/helpers";

export default function Button({ 
  children, 
  className, 
  variant = "primary", 
  onClick,
  ...props 
}) {
  const variants = {
    primary: "bg-primary-gradient text-white border-transparent",
    secondary: "bg-surface border-border text-text-primary hover:bg-border/50",
    outline: "bg-transparent border-primary/50 text-primary hover:bg-primary/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "px-8 py-3 rounded-full font-semibold transition-all duration-300 border flex items-center justify-center gap-2 text-sm md:text-base",
        variants[variant],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

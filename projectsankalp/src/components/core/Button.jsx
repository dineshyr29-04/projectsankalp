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
    primary: "bg-primary text-white border-primary hover:bg-primary/90",
    secondary: "bg-white border-border text-primary hover:bg-surface",
    outline: "bg-transparent border-primary text-primary hover:bg-primary/5",
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

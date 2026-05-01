import { motion } from "framer-motion";
import { cn } from "../../utils/helpers";

export default function Section({ 
  children, 
  className, 
  id,
  animate = true 
}) {
  return (
    <motion.section
      id={id}
      initial={animate ? { opacity: 0, y: 20 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : false}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn("py-20 md:py-32", className)}
    >
      {children}
    </motion.section>
  );
}

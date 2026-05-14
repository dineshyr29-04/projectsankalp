import { cn } from "../../utils/helpers";

export default function Container({ children, className, full = false }) {
  return (
    <div className={cn(
      "mx-auto px-4 sm:px-8 lg:px-12", 
      full ? "max-w-none w-full" : "max-w-[1800px]",
      className
    )}>
      {children}
    </div>
  );
}

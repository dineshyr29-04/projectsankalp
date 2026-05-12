
'use client';

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from "../../utils/helpers";

const CONSTANTS = {
  itemSize: 48,
  spacing: 70, // Slightly tighter spacing for vertical list
  openStagger: 0.1,
  closeStagger: 0.1
};

const STYLES = {
  trigger: {
    container:
      'rounded-full flex items-center bg-slate-900 text-white justify-center cursor-pointer outline-none ring-0 hover:brightness-125 transition-all duration-100 z-50 shadow-lg shadow-slate-900/20 active:scale-95',
    active: 'bg-emerald-600'
  },
  item: {
    container:
      'rounded-full flex items-center justify-center absolute bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer shadow-sm active:scale-90 transition-transform outline-none',
    label: 'text-[10px] font-black uppercase tracking-widest text-slate-900 absolute left-full ml-4 whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-100 transition-all shadow-sm pointer-events-none'
  }
};

// Calculate position based on layout
const getPoint = (i, n, spacing, isMobile) => {
  if (isMobile) {
    // Creative Radial Arc for mobile (Quarter circle)
    // Offset the angle slightly to make it look more dynamic
    const totalItems = n;
    // Increased radius even further to accommodate the massive 64px mobile icons
    const radius = spacing * 4.2; 
    // Standard 90-degree arc for a clean corner expansion
    const angle = (i / (totalItems - 1)) * (Math.PI / 2);
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    };
  }
  // Standard vertical dropdown for desktop
  return { x: 0, y: (i + 1) * spacing };
};

const MenuItem = ({ icon, label, href, index, totalItems, isOpen, onClick, isMobile }) => {
  const { x, y } = getPoint(index, totalItems, CONSTANTS.spacing, isMobile);
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{
        x: isOpen ? x : 0,
        y: isOpen ? y : 0,
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.5,
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.1 }
      }}
      transition={{
        delay: isOpen ? index * CONSTANTS.openStagger : (totalItems - index) * CONSTANTS.closeStagger,
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      className="absolute group"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <button 
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick(e, href);
        }}
        className={cn(STYLES.item.container, isMobile ? "w-16 h-16" : "w-12 h-12")}
      >
        <div className={isMobile ? "scale-150" : "scale-100"}>
          {icon}
        </div>
      </button>
    </motion.div>
  );
};

const MenuTrigger = ({
  setIsOpen,
  isOpen,
  itemsLength,
  closeAnimationCallback,
  openIcon,
  closeIcon
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const animate = useAnimationControls();
  const shakeAnimation = useAnimationControls();

  const scaleTransition = Array.from({ length: Math.min(itemsLength, 4) })
    .map((_, index) => 1 + (index + 1) * 0.1);

  const closeAnimation = async () => {
    setIsAnimating(true);
    shakeAnimation.start({
      translateX: [0, 2, -2, 0, 2, -2, 0],
      transition: {
        duration: 0.1,
        ease: 'linear',
      }
    });

    for (let i = 0; i < scaleTransition.length; i++) {
      await animate.start({
        scale: scaleTransition[i],
        transition: {
          duration: 0.05,
          ease: 'linear'
        }
      });
    }

    shakeAnimation.stop();
    await animate.start({
      scale: 1,
      transition: {
        duration: 0.2,
        type: 'spring'
      }
    });
    setIsAnimating(false);
  };

  const handleToggle = async () => {
    if (isAnimating) return;

    if (isOpen) {
      setIsOpen(false);
      closeAnimationCallback();
      await closeAnimation();
    } else {
      setIsAnimating(true);
      setIsOpen(true);
      // Wait for items to finish staggered animation before allowing another click
      setTimeout(() => setIsAnimating(false), (itemsLength * CONSTANTS.openStagger + 0.5) * 1000);
    }
  };

  return (
    <motion.div animate={shakeAnimation} className="z-50">
      <motion.button
        animate={animate}
        className={cn(
          STYLES.trigger.container, 
          "w-12 h-12 md:w-14 md:h-14", 
          isOpen && STYLES.trigger.active,
          isAnimating && "cursor-wait opacity-80"
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleToggle();
        }}
      >
        <AnimatePresence mode="popLayout">
          {isOpen ? (
            <motion.span
              key="menu-close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              {closeIcon}
            </motion.span>
          ) : (
            <motion.span
              key="menu-open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
            >
              {openIcon}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

const CircleMenu = ({
  items,
  openIcon = <Menu size={20} />,
  closeIcon = <X size={20} />,
  onItemClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const animate = useAnimationControls();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Close menu on click outside and lock scroll on mobile
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.circle-menu-container')) {
        setIsOpen(false);
        closeAnimationCallback();
      }
    };

    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  const closeAnimationCallback = async () => {
    await animate.start({
      x: -10,
      transition: { duration: 0.1 }
    });
    await animate.start({
      x: 0,
      transition: { duration: 0.2, type: 'spring' }
    });
  };

  return (
    <div className="relative flex items-center circle-menu-container">
      {/* Backdrop blur for mobile when menu is open */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-white/40 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      <MenuTrigger
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        itemsLength={items.length}
        closeAnimationCallback={closeAnimationCallback}
        openIcon={openIcon}
        closeIcon={closeIcon}
      />
      <motion.div
        animate={animate}
        className={cn(
          'absolute top-0 left-0 flex items-center z-50',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        {items.map((item, index) => {
          return (
            <MenuItem
              key={`menu-item-${index}`}
              icon={item.icon}
              label={item.name || item.label}
              href={item.href}
              index={index}
              totalItems={items.length}
              isOpen={isOpen}
              isMobile={isMobile}
              onClick={(e, href) => {
                setIsOpen(false);
                closeAnimationCallback();
                onItemClick?.(e, href);
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export { CircleMenu };

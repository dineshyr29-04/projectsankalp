
'use client';

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from "../../utils/helpers";

const CONSTANTS = {
  itemSize: 48,
  spacing: 72, // Increased spacing for a "neaty" look
  openStagger: 0.05,
  closeStagger: 0.03
};

const STYLES = {
  trigger: {
    container:
      'rounded-full flex items-center bg-slate-900 text-white justify-center cursor-pointer outline-none ring-0 hover:brightness-125 transition-all duration-100 z-50 shadow-lg shadow-slate-900/20 active:scale-95',
    active: 'bg-emerald-600'
  },
  item: {
    container:
      'rounded-full flex items-center justify-center absolute bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer shadow-sm active:scale-90 transition-transform',
    label: 'text-[10px] font-black uppercase tracking-widest text-slate-900 absolute left-full ml-4 whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none'
  }
};

// Modified to return vertical position
const pointOnLine = (i, n, spacing) => {
  return { x: 0, y: (i + 1) * spacing };
};

const MenuItem = ({ icon, label, href, index, totalItems, isOpen, onClick }) => {
  const { x, y } = pointOnLine(index, totalItems, CONSTANTS.spacing);
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
      <a 
        href={href} 
        onClick={(e) => onClick(e, href)}
        className={cn(STYLES.item.container, "w-11 h-11 md:w-12 md:h-12")}
      >
        {icon}
        <p className={STYLES.item.label}>{label}</p>
      </a>
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
  const animate = useAnimationControls();
  const shakeAnimation = useAnimationControls();

  const scaleTransition = Array.from({ length: Math.min(itemsLength, 4) })
    .map((_, index) => 1 + (index + 1) * 0.1);

  const closeAnimation = async () => {
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
    animate.start({
      scale: 1,
      transition: {
        duration: 0.2,
        type: 'spring'
      }
    });
  };

  return (
    <motion.div animate={shakeAnimation} className="z-50">
      <motion.button
        animate={animate}
        className={cn(STYLES.trigger.container, "w-12 h-12 md:w-14 md:h-14", isOpen && STYLES.trigger.active)}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
            closeAnimationCallback();
            closeAnimation();
          } else {
            setIsOpen(true);
          }
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
  const animate = useAnimationControls();

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
    <div className="relative flex items-center">
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
        className={cn('absolute inset-0 z-0 flex flex-col items-center justify-center')}
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
              onClick={(e, href) => {
                setIsOpen(false);
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

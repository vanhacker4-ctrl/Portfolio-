import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const SCROLL_EASE = [0.16, 1, 0.3, 1];

/**
 * Reusable viewport scroll-reveal wrapper combining smooth fade-up,
 * blur-to-focus resolution, and staggered delay timing.
 * Clears filter/transform upon completion so fixed descendants aren't trapped.
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  y = 26,
  blur = 8,
  scale = 0.98,
  amount = 0.1,
  once = true,
}) {
  const prefersReduced = useReducedMotion();
  const [settled, setSettled] = useState(false);

  const initial = prefersReduced
    ? { opacity: 0 }
    : {
        opacity: 0,
        y,
        scale,
        filter: `blur(${blur}px)`,
      };

  const target = prefersReduced
    ? { opacity: 1 }
    : {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      };

  return (
    <motion.div
      initial={initial}
      whileInView={target}
      viewport={{ once, amount }}
      transition={{
        duration: prefersReduced ? 0.25 : duration,
        delay,
        ease: SCROLL_EASE,
      }}
      onAnimationComplete={() => {
        if (once) setSettled(true);
      }}
      style={settled ? { filter: 'none', transform: 'none' } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Subtle hairline divider that draws across horizontally upon entering view.
 */
export function ScrollDivider({
  className = 'h-[1px] bg-white/[0.08]',
  delay = 0.08,
  duration = 0.9,
  once = true,
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { scaleX: 0, opacity: 0.4 }}
      whileInView={prefersReduced ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration: prefersReduced ? 0.2 : duration,
        delay,
        ease: SCROLL_EASE,
      }}
      className={`origin-left ${className}`}
    />
  );
}

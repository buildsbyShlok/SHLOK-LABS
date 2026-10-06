'use client';

import { Variants, useAnimation, useInView, useReducedMotion as framerUseReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', damping: 20, stiffness: 100 }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const slideInLeft: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const slideInRight: Variants = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const scaleIn: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } }
};

export const heroArtwork: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { type: 'spring', damping: 15, stiffness: 80, duration: 0.8 }
  }
};

export const cardHover = {
  rest: { y: 0, borderColor: 'var(--border)' },
  hover: { 
    y: -2, 
    borderColor: 'var(--border-hover)',
    transition: { type: 'spring' as const, stiffness: 300 }
  }
};

export function useScrollReveal(once = true) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  return { ref, controls };
}

export function useReducedMotion() {
  return framerUseReducedMotion();
}

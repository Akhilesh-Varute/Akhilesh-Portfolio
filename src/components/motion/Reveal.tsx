import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

const EASE = [0.25, 0.4, 0.25, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/** Fades + slides content in when it scrolls into view. */
export const Reveal = ({ children, delay = 0, y = 28, className, once = true }: RevealProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

/** Container that staggers its <StaggerItem> children into view. */
export const Stagger = ({ children, className }: StaggerProps) => (
  <motion.div
    className={className}
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-60px' }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }: StaggerProps) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduceMotion ? undefined : staggerItem}
    >
      {children}
    </motion.div>
  );
};

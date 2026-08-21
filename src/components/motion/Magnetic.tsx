import { type MouseEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

// Cursor-following "magnetic" pull, shared by every clickable button/link
// site-wide — a small, cheap motion touch that reads as intentional rather
// than a generic hover scale. Originally lived only on Hero's CTAs; pulled
// out here so Contact's buttons, the nav's Contact link, and the theme
// toggle can all share the exact same hover feel instead of drifting apart.
const useMagneticSpring = () => {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    reduceMotion,
    style: reduceMotion ? undefined : { x: springX, y: springY },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    whileHover: reduceMotion ? undefined : { scale: 1.03 },
    whileTap: reduceMotion ? undefined : { scale: 0.97 },
  };
};

export const MagneticLink = ({
  href,
  className,
  children,
  download,
  target,
  rel,
  'aria-label': ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  download?: boolean;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}) => {
  const magnetic = useMagneticSpring();
  return (
    <motion.a href={href} download={download} target={target} rel={rel} aria-label={ariaLabel} className={className} {...magnetic}>
      {children}
    </motion.a>
  );
};

export const MagneticButton = ({
  onClick,
  className,
  children,
  type = 'button',
  'aria-label': ariaLabel,
}: {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  type?: 'button' | 'submit';
  'aria-label'?: string;
}) => {
  const magnetic = useMagneticSpring();
  return (
    <motion.button type={type} onClick={onClick} aria-label={ariaLabel} className={className} {...magnetic}>
      {children}
    </motion.button>
  );
};

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * A soft teal spotlight that trails the pointer across the page.
 * Desktop / fine-pointer only; disabled for reduced motion.
 */
const CursorGlow = () => {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const x = useSpring(mouseX, { stiffness: 120, damping: 25, restDelta: 0.5 });
  const y = useSpring(mouseY, { stiffness: 120, damping: 25, restDelta: 0.5 });

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [reduceMotion, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
      style={{
        x,
        y,
        willChange: 'transform',
        background:
          'radial-gradient(circle, hsl(172 66% 50% / 0.06) 0%, hsl(199 89% 48% / 0.03) 40%, transparent 70%)',
      }}
      aria-hidden="true"
    />
  );
};

export default CursorGlow;

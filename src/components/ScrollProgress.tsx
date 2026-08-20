import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/** Thin accent progress bar pinned to the top edge. */
const ScrollProgress = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-primary"
      style={{
        scaleX: reduceMotion ? 1 : scaleX,
        opacity: reduceMotion ? 0 : 1,
      }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;

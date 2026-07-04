import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Fixed full-page backdrop: grid pattern + two aurora blobs that drift
 * at different speeds as the page scrolls (parallax depth).
 */
const AuroraBackground = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const blobOneY = useTransform(smooth, [0, 1], ['0vh', '55vh']);
  const blobOneX = useTransform(smooth, [0, 1], ['0vw', '-12vw']);
  const blobTwoY = useTransform(smooth, [0, 1], ['0vh', '-45vh']);
  const blobTwoX = useTransform(smooth, [0, 1], ['0vw', '15vw']);
  const gridY = useTransform(smooth, [0, 1], ['0%', '-12%']);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute inset-0 grid-pattern"
        style={reduceMotion ? undefined : { y: gridY, willChange: 'transform' }}
      />

      {/* soft-edged radial gradients — no filter:blur, which is brutal at this size */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full opacity-[0.14]"
        style={{
          background: 'radial-gradient(circle, hsl(172 66% 50%) 0%, hsl(172 66% 50% / 0.4) 30%, transparent 65%)',
          willChange: 'transform',
          ...(reduceMotion ? {} : { y: blobOneY, x: blobOneX }),
        }}
      />

      <motion.div
        className="absolute top-[45%] -right-[15%] w-[50vw] h-[50vw] rounded-full opacity-[0.11]"
        style={{
          background: 'radial-gradient(circle, hsl(199 89% 48%) 0%, hsl(199 89% 48% / 0.4) 30%, transparent 65%)',
          willChange: 'transform',
          ...(reduceMotion ? {} : { y: blobTwoY, x: blobTwoX }),
        }}
      />
    </div>
  );
};

export default AuroraBackground;

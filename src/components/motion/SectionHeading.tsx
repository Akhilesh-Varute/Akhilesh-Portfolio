import { motion } from 'framer-motion';

const EASE = [0.25, 0.4, 0.25, 1] as const;

interface SectionHeadingProps {
  number: string;
  title: string;
  kicker?: string;
}

/**
 * Editorial section heading: huge outlined ghost number behind,
 * mono kicker line, display-type title, self-drawing divider.
 */
const SectionHeading = ({ number, title, kicker }: SectionHeadingProps) => (
  <div className="relative mb-16">
    <motion.span
      className="absolute -top-14 -left-2 font-display font-bold text-[7rem] md:text-[9rem] leading-none text-stroke select-none pointer-events-none"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE }}
      aria-hidden="true"
    >
      {number}
    </motion.span>

    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
    >
      {kicker && (
        <p className="font-mono text-primary text-xs tracking-[0.3em] uppercase mb-3">
          {'//'} {kicker}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground flex items-center gap-6">
        {title}
        <motion.span
          className="h-px bg-gradient-to-r from-primary/60 to-transparent flex-1 max-w-xs origin-left hidden sm:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        />
      </h2>
    </motion.div>
  </div>
);

export default SectionHeading;

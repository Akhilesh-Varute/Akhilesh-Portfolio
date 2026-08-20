import { motion } from 'framer-motion';

const EASE = [0.25, 0.4, 0.25, 1] as const;

interface SectionHeadingProps {
  number: string;
  title: string;
  kicker?: string;
  align?: 'left' | 'center';
}

/**
 * Editorial section heading: huge outlined ghost number behind,
 * mono kicker line, serif display title, self-drawing divider.
 * Uses currentColor-based tokens so it recolors automatically inside
 * a .theme-dark scope (hero / contact bookends) without extra props.
 */
const SectionHeading = ({ number, title, kicker, align = 'left' }: SectionHeadingProps) => (
  <div className={`relative mb-14 ${align === 'center' ? 'text-center' : ''}`}>
    <motion.span
      className={`absolute font-display text-[6rem] md:text-[8rem] leading-none select-none pointer-events-none text-stroke ${
        align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'
      }`}
      style={{
        top: '-3.75rem',
        maskImage: 'linear-gradient(to bottom, black 30%, transparent 88%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 88%)',
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: EASE }}
      aria-hidden="true"
    >
      {number}
    </motion.span>

    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
    >
      {kicker && <p className="eyebrow mb-3">{kicker}</p>}
      <h2
        className={`text-3xl md:text-5xl font-medium font-display text-foreground flex items-center gap-6 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        {title}
        <motion.span
          className="h-px bg-border flex-1 max-w-xs origin-left hidden sm:block"
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

import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDown, Check, Copy } from 'lucide-react';
import HeroBuildScene from '@/components/workspace/HeroBuildScene';

const EMAIL = 'akhileshvarute23@gmail.com';

const EASE = [0.25, 0.4, 0.25, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Word-by-word reveal: each word clips in from below on its own stagger
// step, instead of the whole headline fading in as one block.
const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};

const word = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.55, ease: EASE } },
};

const Words = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pb-[0.1em]">
          <motion.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// Cursor-following "magnetic" pull on the CTA buttons — a small, cheap
// motion touch that reads as intentional rather than a generic hover scale.
const MagneticLink = ({
  href,
  className,
  children,
  download,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  download?: boolean;
}) => {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      download={download}
      className={className}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  // Scroll-linked parallax: the headline block drifts up and fades as the
  // hero scrolls out of view, instead of just sitting static.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Binary show/hide (not just a fade) so the cue actually leaves the DOM
  // once you've moved away from Hero, instead of lingering as an invisible
  // fixed-position element that could still catch clicks.
  const [showScrollCue, setShowScrollCue] = useState(true);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setShowScrollCue(v < 0.1));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] md:min-h-[calc(100svh-80px)] flex items-center dot-grid overflow-hidden"
    >
      <HeroBuildScene />

      <motion.div
        className="wrap py-16 md:py-20 relative z-10"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity, willChange: 'transform, opacity' }}
      >
        <div className="flex flex-col items-start">
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-border mb-6"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            <span className="font-mono text-[11px] text-muted-foreground tracking-wide">
              Available for Cloud &amp; AI Engineering roles
            </span>
          </motion.div>

          <motion.p variants={item} initial="hidden" animate="show" className="eyebrow mb-5">
            Akhilesh Varute · Pune, India
          </motion.p>
        </div>

        <motion.div
          className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-start"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={wordContainer}
            initial="hidden"
            animate="show"
            className="font-display font-bold text-4xl md:text-6xl leading-[1.08]"
          >
            <Words text="I build cloud systems that run themselves," />{' '}
            <Words text="and AI that only does what it's validated to do." className="text-muted-foreground" />
          </motion.h1>

          <motion.div variants={item}>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Event-driven architecture, deterministic AI guardrails, production from day one.
              2+ years shipping cloud platforms teams actually run on. AWS Certified Developer.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <MagneticLink href="#work" className="btn-primary">
                View selected work ↗
              </MagneticLink>
              <MagneticLink href="#about" className="btn-outline">
                About me ↗
              </MagneticLink>
              <MagneticLink href="/Akhilesh_Varute_Resume.pdf" download className="btn-ghost">
                Download Resume
              </MagneticLink>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" className="mt-3">
          <button
            type="button"
            onClick={copyEmail}
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : EMAIL}
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showScrollCue && (
          <motion.a
            href="#about"
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden md:flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Scroll down"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.span>
          </motion.a>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;

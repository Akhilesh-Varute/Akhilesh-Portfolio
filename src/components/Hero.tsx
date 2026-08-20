import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Check, Copy } from 'lucide-react';

const EMAIL = 'akhileshvarute231@gmail.com';

const EASE = [0.25, 0.4, 0.25, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
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
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

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
      className="relative min-h-[100svh] flex items-center dot-grid overflow-hidden"
    >
      <motion.div
        className="wrap py-16 md:py-20"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity, willChange: 'transform, opacity' }}
      >
        <motion.div
          className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-start"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1 variants={item} className="font-display font-bold text-4xl md:text-6xl leading-[1.08]">
            I build cloud systems that run themselves,{' '}
            <span className="text-muted-foreground">and AI that only does what it's validated to do.</span>
          </motion.h1>

          <motion.div variants={item}>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Event-driven architecture, deterministic AI guardrails, production from day one.
              2+ years shipping cloud platforms teams actually run on. AWS Certified Developer.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <motion.a
                href="#work"
                className="btn-primary"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              >
                View selected work ↗
              </motion.a>
              <motion.a
                href="#about"
                className="btn-outline"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              >
                About me ↗
              </motion.a>
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

      <motion.a
        href="#about"
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden md:flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        style={reduceMotion ? undefined : { opacity: hintOpacity }}
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
    </section>
  );
};

export default Hero;

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowDown, Check, Copy } from 'lucide-react';

const EASE = [0.25, 0.4, 0.25, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const EMAIL = 'akhileshvarute231@gmail.com';

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

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
      ref={ref}
      className="theme-dark relative min-h-[100svh] flex items-center px-6 pt-32 pb-24 overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true">
        <div className="absolute -top-1/3 right-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity, willChange: 'transform, opacity' }}
        >
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-border mb-8"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="font-mono text-[11px] text-muted-foreground tracking-wide">
                Available for Cloud &amp; AI Engineering roles
              </span>
            </motion.div>

            <motion.p variants={item} className="eyebrow mb-5">
              Akhilesh Varute · Pune, India
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display italic font-medium text-foreground leading-[0.95] text-[16vw] sm:text-[10vw] lg:text-[7.2rem] tracking-tight"
            >
              Software
              <br />
              Developer
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 font-display text-2xl md:text-3xl text-muted-foreground max-w-2xl"
            >
              Cloud Solutions — AWS Certified.
            </motion.p>

            <motion.p variants={item} className="mt-6 max-w-xl text-muted-foreground text-base md:text-lg leading-relaxed">
              I specialize in cloud-native backend systems, serverless event-driven
              architecture, and deterministic tooling for GenAI agent workflows.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-4 mt-10">
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="/Akhilesh_Varute_Resume.pdf"
                download
                className="btn-outline"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                Download Resume
              </motion.a>
              <motion.button
                type="button"
                onClick={copyEmail}
                className="btn-ghost"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy Email'}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#highlights"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
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

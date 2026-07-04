import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import HeroTerminal from '@/components/HeroTerminal';

const EASE = [0.25, 0.4, 0.25, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stats = [
  { value: '2+', label: 'years shipping production' },
  { value: '2', label: 'platforms built from scratch' },
  { value: '8+', label: 'AWS services orchestrated' },
  { value: '3', label: 'engineer team led' },
];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Parallax exit — content drifts up slower than the page and fades as you scroll away
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const terminalY = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center px-6 pt-28 pb-20 overflow-hidden"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
          {/* Left — headline */}
          <motion.div
            style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity, willChange: 'transform, opacity' }}
          >
            <motion.div className="space-y-7" variants={container} initial="hidden" animate="show">
              <motion.div
                variants={item}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-primary/20"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="font-mono text-xs text-muted-foreground tracking-wide">
                  Open to new opportunities
                </span>
              </motion.div>

              <motion.p variants={item} className="font-mono text-primary text-sm tracking-widest uppercase">
                Akhilesh Varute · Software Engineer · Pune, IN
              </motion.p>

              <motion.h1
                variants={item}
                className="text-[2.75rem] leading-[1.05] sm:text-6xl xl:text-7xl font-bold font-display text-foreground"
              >
                I build AI that
                <br />
                speaks fluent <span className="text-gradient">AWS</span>.
              </motion.h1>

              <motion.p variants={item} className="max-w-xl text-muted-foreground text-lg leading-relaxed">
                Primary engineer on{' '}
                <a
                  href="https://aicloudinsights.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary link-hover"
                >
                  aicloudinsights.ai
                </a>{' '}
                — a live multi-tenant SaaS where enterprises query their entire cloud in plain
                English, powered by Amazon Bedrock function calling. I own the architecture and
                lead a 3-engineer team at{' '}
                <a
                  href="https://gpuoncloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary link-hover"
                >
                  GPUonCLOUD
                </a>
                .
              </motion.p>

              <motion.p variants={item} className="font-mono text-xs text-muted-foreground">
                <span className="text-primary">AWS Certified Developer – Associate</span> · Node.js
                · TypeScript · Bedrock · Kubernetes
              </motion.p>

              <motion.div variants={item} className="flex flex-wrap items-center gap-4 pt-2">
                <motion.a
                  href="#projects"
                  className="btn-primary"
                  whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  See My Work
                </motion.a>
                <motion.a
                  href="https://cal.com/akhilesh-varute/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  Book a 15-min Call
                </motion.a>
              </motion.div>

              {/* stats */}
              <motion.dl
                variants={item}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border/60 max-w-xl"
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display font-bold text-2xl md:text-3xl text-foreground">
                      {stat.value}
                    </dd>
                    <dd className="text-muted-foreground text-xs mt-1 leading-snug">{stat.label}</dd>
                  </div>
                ))}
              </motion.dl>
            </motion.div>
          </motion.div>

          {/* Right — the product, live */}
          <motion.div
            className="relative"
            style={reduceMotion ? undefined : { y: terminalY, willChange: 'transform' }}
            initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          >
            {/* glow behind the terminal */}
            <div
              className="absolute -inset-8 rounded-[2rem] opacity-40 blur-3xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, hsl(172 66% 50% / 0.25), transparent 70%)',
              }}
              aria-hidden="true"
            />
            <HeroTerminal />
            <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground/70">
              ↳ I built this end-to-end — Bedrock function calling in production
            </p>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        style={reduceMotion ? undefined : { opacity: hintOpacity }}
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </motion.a>
    </section>
  );
};

export default Hero;

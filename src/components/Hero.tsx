import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Check, Copy } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { splitChars } from '@/lib/split-text';
import { useReducedMotionGsap } from '@/hooks/use-reduced-motion-gsap';

const EASE = [0.25, 0.4, 0.25, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 1.05 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const EMAIL = 'akhileshvarute231@gmail.com';
const LINE_ONE = 'Software';
const LINE_TWO = 'Developer';

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const reduceMotionGsap = useReducedMotionGsap();
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Kinetic split-text: characters assemble on load, then the headline
  // reacts to scroll velocity with a subtle skew while scrolling.
  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    const ctx = gsap.context(() => {
      const chars = headline.querySelectorAll<HTMLSpanElement>('[data-char]');

      if (reduceMotionGsap) {
        gsap.set(chars, { yPercent: 0, opacity: 1, rotate: 0 });
        return;
      }

      gsap.set(chars, { yPercent: 120, opacity: 0, rotate: 6 });
      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.022,
        delay: 0.15,
      });

      // Scroll-velocity skew: the headline leans into the scroll direction
      // and eases back to neutral when scrolling stops.
      const skewSetter = gsap.quickTo(headline, 'skewX', { duration: 0.5, ease: 'power3' });
      const clamp = gsap.utils.clamp(-8, 8);

      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          skewSetter(clamp(self.getVelocity() / -260));
        },
        onLeave: () => skewSetter(0),
        onLeaveBack: () => skewSetter(0),
      });
    }, headline);

    return () => ctx.revert();
  }, [reduceMotionGsap]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const renderLine = (text: string) => (
    <span className="block overflow-hidden py-1">
      {splitChars(text).map((token) => (
        <span
          key={token.key}
          data-char
          className="inline-block will-change-transform"
          style={{ whiteSpace: token.char === ' ' ? 'pre' : undefined }}
        >
          {token.char}
        </span>
      ))}
    </span>
  );

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
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-border mb-8">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="font-mono text-[11px] text-muted-foreground tracking-wide">
                Available for Cloud &amp; AI Engineering roles
              </span>
            </div>

            <p className="eyebrow mb-5">Akhilesh Varute · Pune, India</p>
          </motion.div>

          <h1
            ref={headlineRef}
            className="font-display italic font-medium text-foreground leading-[0.95] text-[16vw] sm:text-[10vw] lg:text-[7.2rem] tracking-tight"
          >
            {renderLine(LINE_ONE)}
            {renderLine(LINE_TWO)}
          </h1>

          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p variants={item} className="mt-6 font-display text-2xl md:text-3xl text-muted-foreground max-w-2xl">
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

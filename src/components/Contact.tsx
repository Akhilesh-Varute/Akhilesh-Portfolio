import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Copy, Github, Linkedin } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

const EMAIL = 'akhileshvarute231@gmail.com';

const links = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/akhileshvarute', icon: Linkedin },
  { name: 'GitHub', href: 'https://github.com/Akhilesh-Varute', icon: Github },
];

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ['3%', '-5%']);

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
    <section id="contact" ref={ref} className="theme-dark relative py-32 md:py-44 px-6 overflow-hidden bg-background">
      <motion.span
        className="absolute top-8 left-0 right-0 text-center font-display italic font-medium text-[15vw] leading-none text-stroke select-none pointer-events-none whitespace-nowrap"
        style={reduceMotion ? undefined : { x: ghostX, willChange: 'transform' }}
        aria-hidden="true"
      >
        Let's talk
      </motion.span>

      <div className="container max-w-2xl mx-auto text-center relative pt-[9vw]">
        <Reveal>
          <p className="eyebrow mb-4">06 · What's next</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground mb-6">
            Get in <span className="italic text-primary">touch</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto leading-relaxed">
            I'm open to conversations about Cloud &amp; AI Engineering roles — or anything
            at the intersection of cloud infrastructure and GenAI tooling.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href={`mailto:${EMAIL}`}
              className="btn-primary"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              {EMAIL}
            </motion.a>
            <motion.button
              type="button"
              onClick={copyEmail}
              className="btn-outline"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </motion.button>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="font-mono text-sm text-muted-foreground mt-6">+91-9511977521</p>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="flex justify-center gap-6 mt-12">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;

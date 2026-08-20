import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Check, Copy, Github, Linkedin } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import Marquee from '@/components/build-log/Marquee';

const EMAIL = 'akhileshvarute231@gmail.com';

const links = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/akhileshvarute', icon: Linkedin },
  { name: 'GitHub', href: 'https://github.com/Akhilesh-Varute', icon: Github },
];

const Contact = () => {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

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
    <section id="contact" className="py-20">
      <Marquee text="Let's talk —" />

      <div className="offset-col-wide mt-14">
        <Reveal>
          <p className="eyebrow mb-4">About / Contact</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display italic text-4xl md:text-6xl mb-6">Get in touch</h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="font-mono text-sm text-muted-foreground max-w-lg leading-relaxed mb-10">
            I'm open to conversations about Cloud &amp; AI Engineering roles — or anything
            at the intersection of cloud infrastructure and GenAI tooling.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-4">
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
          <div className="flex gap-6 mt-10">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
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

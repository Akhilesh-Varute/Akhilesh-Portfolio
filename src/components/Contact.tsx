import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Linkedin, Github, CalendarClock, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Giant ghost word slides sideways as the section scrolls through
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const ghostX = useTransform(scrollYProgress, [0, 1], ['4%', '-6%']);

  const links = [
    { name: 'Email', href: 'mailto:akhileshvarute23@gmail.com', icon: Mail },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/akhileshvarute', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/Akhilesh-Varute', icon: Github },
  ];

  return (
    <section id="contact" ref={ref} className="relative py-36 px-6 overflow-hidden">
      {/* ghost word */}
      <motion.span
        className="absolute top-10 left-0 right-0 text-center font-display font-bold text-[16vw] leading-none text-stroke select-none pointer-events-none whitespace-nowrap"
        style={reduceMotion ? undefined : { x: ghostX, willChange: 'transform' }}
        aria-hidden="true"
      >
        LET'S TALK
      </motion.span>

      <div className="container max-w-2xl mx-auto text-center relative pt-[10vw]">
        <Reveal>
          <p className="font-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">
            {'//'} 05 · What's next?
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold font-display text-foreground mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto leading-relaxed">
            I'm interested in problems at the intersection of cloud infrastructure and AI.
            If you're building something in that space — or have a role that fits — my inbox
            is open and my calendar is easier.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href="https://cal.com/akhilesh-varute/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <CalendarClock className="w-4 h-4" />
              Book a 15-min Call
            </motion.a>
            <motion.a
              href="mailto:akhileshvarute23@gmail.com"
              className="btn-outline"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <Mail className="w-4 h-4" />
              akhileshvarute23@gmail.com
            </motion.a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex justify-center gap-6 mt-16">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 p-3 text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                aria-label={link.name}
              >
                <link.icon className="w-6 h-6" />
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;

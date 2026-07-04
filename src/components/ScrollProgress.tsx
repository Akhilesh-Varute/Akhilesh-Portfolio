import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Top', href: '#' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

const RAIL_HEIGHT = 208; // px — h-52

/**
 * Scroll companions: a gradient progress bar pinned to the top edge,
 * and a right-hand rail where a glowing orb travels with scroll,
 * flanked by section waypoint dots.
 */
const ScrollProgress = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const orbY = useSpring(useTransform(scrollYProgress, [0, 1], [0, RAIL_HEIGHT]), {
    stiffness: 80,
    damping: 22,
  });

  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
        style={{
          scaleX: reduceMotion ? 1 : scaleX,
          background: 'var(--gradient-primary)',
          opacity: reduceMotion ? 0 : 1,
        }}
        aria-hidden="true"
      />

      {/* Right rail: traveling orb + section waypoints */}
      <div className="fixed right-7 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4">
        <div className="relative w-px bg-border" style={{ height: RAIL_HEIGHT }}>
          {/* waypoint dots along the rail */}
          {SECTIONS.map((section, i) => (
            <a
              key={section.id}
              href={section.href}
              aria-label={`Go to ${section.label}`}
              className="group absolute -translate-x-1/2 -translate-y-1/2 left-1/2 p-2 cursor-pointer"
              style={{ top: `${(i / (SECTIONS.length - 1)) * 100}%` }}
            >
              <span
                className={`block w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  active === section.id ? 'bg-primary' : 'bg-muted-foreground/40 group-hover:bg-primary/70'
                }`}
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 font-mono text-[10px] tracking-widest uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {section.label}
              </span>
            </a>
          ))}

          {/* the orb that travels with scroll */}
          {!reduceMotion && (
            <motion.span
              className="absolute w-3 h-3 rounded-full bg-primary pointer-events-none"
              style={{
                // manual centering — framer's y transform would clobber Tailwind translate utilities
                left: '50%',
                top: 0,
                marginLeft: '-6px',
                marginTop: '-6px',
                y: orbY,
                boxShadow: '0 0 12px 2px hsl(172 66% 50% / 0.8), 0 0 32px 8px hsl(172 66% 50% / 0.3)',
              }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ScrollProgress;

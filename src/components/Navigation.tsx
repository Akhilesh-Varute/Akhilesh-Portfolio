import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { animate, scrambleText } from 'animejs';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/workspace/ThemeToggle';
import { MagneticLink } from '@/components/motion/Magnetic';

const navItems = [
  { label: 'Welcome', href: '#hero' },
  { label: 'Work', href: '#work' },
  { label: 'AI', href: '#ai' },
  { label: 'Profile', href: '#about' },
];

const scrambleOnHover = (e: MouseEvent<HTMLAnchorElement>) => {
  animate(e.currentTarget, {
    text: scrambleText({ chars: 'lowercase', from: 'left' }),
    duration: 500,
  });
};

const LOGO_TEXT = 'akhilesh';
const MAGNIFY_RADIUS = 46;
const MAGNIFY_MAX_SCALE = 1.55;

// macOS-dock-style magnify: letters nearest the cursor scale up, falling
// off smoothly with distance, instead of a plain uniform hover scale — a
// distinct effect for the wordmark so it doesn't read the same as the
// scramble-text nav links next to it.
const NavLogo = () => {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const handleMove = (e: PointerEvent) => {
      letterRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const dist = Math.abs(e.clientX - center);
        const falloff = Math.max(0, 1 - dist / MAGNIFY_RADIUS);
        const scale = 1 + falloff * (MAGNIFY_MAX_SCALE - 1);
        animate(el, { scale, duration: 180, ease: 'outQuad' });
      });
    };

    const handleLeave = () => {
      letterRefs.current.forEach((el) => {
        if (el) animate(el, { scale: 1, duration: 250, ease: 'outQuad' });
      });
    };

    const container = letterRefs.current[0]?.closest('a');
    container?.addEventListener('pointermove', handleMove);
    container?.addEventListener('pointerleave', handleLeave);
    return () => {
      container?.removeEventListener('pointermove', handleMove);
      container?.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  return (
    <a href="#hero" className="font-display font-bold text-xl tracking-tight flex">
      {LOGO_TEXT.split('').map((char, i) => (
        <span
          key={i}
          ref={(el) => (letterRefs.current[i] = el)}
          className="inline-block origin-bottom"
        >
          {char}
        </span>
      ))}
    </a>
  );
};

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background border-b border-border"
      initial={reduceMotion ? false : { y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <nav className="wrap flex items-center justify-between py-4">
        <NavLogo />

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onMouseEnter={reduceMotion ? undefined : scrambleOnHover}
                className="font-mono text-sm hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <MagneticLink href="#contact" className="btn-primary">
            Contact
          </MagneticLink>
        </div>

        <button
          className="md:hidden p-2 cursor-pointer"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="wrap py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-mono text-sm"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <ThemeToggle />
                <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary">
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;

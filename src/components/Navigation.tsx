import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4' : 'py-6'
      }`}
      initial={reduceMotion ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <nav className="container max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="font-mono text-primary font-medium text-lg hover:opacity-80 transition-opacity"
        >
          AV<span className="text-muted-foreground">·</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <a
                href={item.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors link-hover"
              >
                <span className="font-mono text-primary text-xs mr-1">0{index + 1}.</span>
                {item.label}
              </a>
            </motion.li>
          ))}
          <motion.li
            className="flex items-center gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + navItems.length * 0.08, duration: 0.5 }}
          >
            <a
              href="/Akhilesh_Varute_Resume.pdf"
              download
              className="px-4 py-2 border border-primary text-primary text-sm font-mono rounded hover:bg-primary/10 transition-colors cursor-pointer"
            >
              Resume
            </a>
          </motion.li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground p-2 cursor-pointer"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden glass border-t border-border/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <ul className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="font-mono text-primary text-xs mr-2">0{index + 1}.</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/Akhilesh_Varute_Resume.pdf"
                  download
                  onClick={() => setMenuOpen(false)}
                  className="inline-block px-4 py-2 border border-primary text-primary text-sm font-mono rounded hover:bg-primary/10 transition-colors"
                >
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > window.innerHeight * 0.7);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const light = !isScrolled && !menuOpen;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 py-5 px-6 transition-colors duration-300"
      initial={reduceMotion ? false : { y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <nav
        className={`mx-auto max-w-6xl flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
          isScrolled || menuOpen
            ? 'bg-background/90 backdrop-blur-sm border border-border shadow-sm'
            : 'bg-transparent border border-transparent'
        }`}
      >
        <a
          href="#hero"
          className={`font-display italic text-lg tracking-tight transition-colors ${
            light ? 'text-[hsl(42_28%_93%)]' : 'text-foreground'
          }`}
        >
          Akhilesh<span className="text-primary">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`text-sm link-hover transition-colors ${
                  light ? 'text-[hsl(42_20%_80%)] hover:text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <span className="font-mono text-primary text-[10px] mr-1.5">0{index + 1}</span>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/Akhilesh_Varute_Resume.pdf"
              download
              className={`px-4 py-1.5 border rounded-full text-sm font-mono transition-colors cursor-pointer ${
                light
                  ? 'border-[hsl(42_20%_80%)/0.4] text-[hsl(42_28%_93%)] hover:border-primary hover:text-primary'
                  : 'border-border text-foreground hover:border-primary hover:text-primary'
              }`}
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          className={`md:hidden p-2 cursor-pointer transition-colors ${light ? 'text-[hsl(42_28%_93%)]' : 'text-foreground'}`}
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
            className="md:hidden mx-auto max-w-6xl mt-2 bg-background border border-border rounded-2xl overflow-hidden"
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
                    className="block py-1 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="font-mono text-primary text-xs mr-2">0{index + 1}</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/Akhilesh_Varute_Resume.pdf"
                  download
                  onClick={() => setMenuOpen(false)}
                  className="inline-block px-4 py-2 border border-border rounded-full text-sm font-mono hover:border-primary hover:text-primary transition-colors"
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

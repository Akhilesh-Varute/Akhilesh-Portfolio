import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const groups = [
  {
    label: 'Build',
    items: [
      { label: 'Selected work', href: '#work' },
      { label: 'How I build', href: '#work' },
    ],
  },
  {
    label: 'About',
    items: [
      { label: 'Bio', href: '#about' },
      { label: 'Now', href: '#now' },
      { label: 'Experience', href: '#experience' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

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
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
      initial={reduceMotion ? false : { y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <nav className="offset-col-wide flex items-center justify-between py-4">
        <a href="#hero" className="font-display italic text-2xl">
          Akhilesh<span className="text-primary">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {groups.map((group) => (
            <li key={group.label} className="group relative">
              <span className="font-mono text-sm text-foreground cursor-default">{group.label}</span>
              <div className="absolute left-0 top-full pt-3 hidden group-hover:block">
                <ul className="bg-background border border-border rounded-sm py-2 min-w-[10rem] shadow-sm">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="block px-4 py-1.5 font-mono text-xs text-muted-foreground hover:text-primary whitespace-nowrap"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          <li>
            <a
              href="/Akhilesh_Varute_Resume.pdf"
              download
              className="px-4 py-1.5 border border-border font-mono text-xs hover:border-primary hover:text-primary transition-colors cursor-pointer"
            >
              Resume
            </a>
          </li>
        </ul>

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
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="offset-col-wide py-6 space-y-6">
              {groups.map((group) => (
                <div key={group.label}>
                  <p className="eyebrow mb-2">{group.label}</p>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="block font-mono text-sm text-muted-foreground hover:text-primary"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <a
                href="/Akhilesh_Varute_Resume.pdf"
                download
                onClick={() => setMenuOpen(false)}
                className="inline-block px-4 py-2 border border-border font-mono text-xs hover:border-primary hover:text-primary transition-colors"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;

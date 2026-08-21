import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { MagneticButton } from '@/components/motion/Magnetic';

const STORAGE_KEY = 'workspace-theme';

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <MagneticButton
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-colors duration-200 cursor-pointer"
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </MagneticButton>
  );
};

export default ThemeToggle;

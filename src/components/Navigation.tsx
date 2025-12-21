import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'py-6'
        }`}
    >
      <nav className="container max-w-5xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="font-mono text-primary font-medium text-lg hover:opacity-80 transition-opacity"
        >
          AV
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors link-hover"
              >
                <span className="font-mono text-primary text-xs mr-1">0{index + 1}.</span>
                {item.label}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-3">
            <a
              href="/Akhilesh_Varute_Resume.pdf"
              download
              className="px-4 py-2 border border-primary text-primary text-sm font-mono rounded hover:bg-primary/10 transition-colors"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button className="md:hidden text-foreground p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Navigation;

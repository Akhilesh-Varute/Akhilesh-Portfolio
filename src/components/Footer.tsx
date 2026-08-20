import { Github, Linkedin, Mail } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

const Footer = () => (
  <footer className="rule py-10">
    <div className="wrap">
      <Reveal y={12}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <a href="#hero" className="font-display font-bold text-lg">
            akhilesh
          </a>

          <p className="font-mono text-xs text-muted-foreground text-center">
            Pune, Maharashtra, India · Product engineering · Cloud · AI
            <span className="mx-2 text-border">|</span>
            <a href="https://akhileshvarute.me" className="link-hover hover:text-primary">
              akhileshvarute.me
            </a>
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Akhilesh-Varute"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/akhileshvarute"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:akhileshvarute231@gmail.com"
              aria-label="Email"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Reveal>
      <p className="font-mono text-[11px] text-muted-foreground text-center mt-6">
        © 2026 Akhilesh Varute — all rights reserved
      </p>
    </div>
  </footer>
);

export default Footer;

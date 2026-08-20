import { Github, Linkedin, Mail } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

const Footer = () => {
  return (
    <footer className="py-8 rule">
      <div className="offset-col-wide">
        <Reveal y={12}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <a href="#hero" className="font-display italic text-foreground text-base">
              Akhilesh<span className="text-primary">.</span>
            </a>

            <p className="font-mono text-xs text-muted-foreground text-center">
              Akhilesh Varute — Pune, Maharashtra, India
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
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/akhileshvarute"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:akhileshvarute231@gmail.com"
                aria-label="Email"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;

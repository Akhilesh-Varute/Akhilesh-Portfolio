import { Github, Linkedin, Mail } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

const Footer = () => {
  return (
    <footer className="py-10 px-6 border-t border-border/60">
      <div className="container max-w-6xl mx-auto">
        <Reveal y={12}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <a href="#" className="font-mono text-primary font-medium text-lg">
              AV<span className="text-muted-foreground">·</span>
            </a>

            <p className="font-mono text-xs text-muted-foreground text-center">
              Designed & built by <span className="text-primary">Akhilesh Varute</span> — React ·
              TypeScript · Tailwind · Framer Motion
              <span className="mx-2 text-border">|</span>
              <a href="https://akhileshvarute.me" className="link-hover text-muted-foreground hover:text-primary">
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
                href="mailto:akhileshvarute23@gmail.com"
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

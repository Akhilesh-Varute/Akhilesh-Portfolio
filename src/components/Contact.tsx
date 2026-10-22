import { useState } from 'react';
import { Check, Copy, Github, Linkedin } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { MagneticLink, MagneticButton } from '@/components/motion/Magnetic';

const EMAIL = 'akhileshvarute23@gmail.com';

const links = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/akhileshvarute', icon: Linkedin },
  { name: 'GitHub', href: 'https://github.com/Akhilesh-Varute', icon: Github },
];

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="wrap">
        <div className="panel">
          <div className="panel-topbar justify-between">
            <span>Contact</span>
            <span className="text-primary">Response within 24 hours</span>
          </div>
          <div className="p-8 md:p-12">
            <Reveal>
              <h2 className="font-display font-bold text-4xl md:text-6xl mb-4">
                Let's get in <span className="text-muted-foreground">touch!</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-mono text-sm text-muted-foreground max-w-lg mb-8 leading-relaxed">
                Looking for AI/LLM and backend engineering roles at product companies in Pune or
                remote across India. Happy to talk, even if you just want to compare notes on LLM tool calling.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-4">
                <MagneticLink href={`mailto:${EMAIL}`} className="btn-primary">
                  {EMAIL}
                </MagneticLink>
                <MagneticButton onClick={copyEmail} className="btn-outline">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="flex gap-5 mt-8">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={link.name}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

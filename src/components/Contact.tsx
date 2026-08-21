import { useState } from 'react';
import { Check, Copy, Github, Linkedin } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

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
                Open to conversations about Cloud &amp; AI Engineering roles — or anything at the
                intersection of cloud infrastructure and GenAI tooling.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-4">
                <a href={`mailto:${EMAIL}`} className="btn-primary">
                  {EMAIL}
                </a>
                <button type="button" onClick={copyEmail} className="btn-outline">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="font-mono text-sm text-muted-foreground mt-6">+91-9511977521</p>
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

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import DioramaStrip from '@/components/workspace/DioramaStrip';

const EMAIL = 'akhileshvarute231@gmail.com';

const Hero = () => {
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
    <section id="hero">
      <div className="wrap py-16 md:py-20">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-start">
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-[1.08]">
            I build cloud backends, event-driven systems,{' '}
            <span className="text-muted-foreground">and AI-powered guardrails</span>
          </h1>

          <div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              2+ years designing the systems, guardrails, and cloud platforms behind products
              teams actually run in production. AWS Certified Developer.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <a href="#work" className="btn-primary">
                View selected work ↗
              </a>
              <a href="#about" className="btn-outline">
                About me ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <button
            type="button"
            onClick={copyEmail}
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : EMAIL}
          </button>
        </div>
      </div>

      <DioramaStrip index="04" title="AI Cloud Insights" subtitle="Cloud & AI Architecture" />
    </section>
  );
};

export default Hero;

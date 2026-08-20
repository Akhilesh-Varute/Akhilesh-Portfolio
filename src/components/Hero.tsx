import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import Marquee from '@/components/build-log/Marquee';
import StatusLine from '@/components/build-log/StatusLine';

const EMAIL = 'akhileshvarute231@gmail.com';

const Hero = () => {
  const reduceMotion = useReducedMotion();
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
    <section id="hero" className="pt-14 pb-16">
      <motion.div
        className="offset-col-wide"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <StatusLine />

        <p className="font-mono text-base md:text-lg leading-relaxed max-w-2xl mt-8 text-foreground/90">
          I'm Akhilesh — a Software Developer specializing in Cloud Solutions, based in Pune.
          I build cloud-native backends, serverless event-driven systems on AWS, and
          deterministic guardrails for GenAI agent workflows. AWS Certified Developer.
        </p>

        <div className="flex flex-wrap items-center gap-5 mt-8">
          <a href="#work" className="btn-primary">
            See the work
          </a>
          <a href="/Akhilesh_Varute_Resume.pdf" download className="btn-outline">
            Resume
          </a>
          <button type="button" onClick={copyEmail} className="btn-ghost">
            {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>
      </motion.div>

      <div className="mt-14">
        <Marquee text="Software Developer — Cloud Solutions —" />
      </div>
    </section>
  );
};

export default Hero;

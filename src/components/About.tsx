import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

const meta = [
  { label: 'Based in', value: 'Pune, Maharashtra, India' },
  { label: 'Currently at', value: 'ASCP GPUonCLOUD' },
  { label: 'Certified', value: 'AWS Certified Developer – Associate' },
];

const About = () => (
  <section id="about" className="py-20 rule">
    <div className="offset-col-wide">
      <p className="eyebrow mb-6">About</p>

      <div className="grid md:grid-cols-[1.3fr_1fr] gap-16">
        <Reveal>
          <p className="font-display text-2xl md:text-3xl leading-[1.5] text-foreground">
            I am a Software Developer specializing in Cloud Solutions with expertise in
            building scalable, production-grade cloud backends and GenAI platform
            automation — architecting event-driven microservices on AWS, enforcing
            deterministic guardrails for LLM agent workflows, and automating
            infrastructure provisioning with Infrastructure as Code.
          </p>
        </Reveal>

        <Stagger className="space-y-5">
          {meta.map((row) => (
            <StaggerItem key={row.label}>
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-1">
                {row.label}
              </p>
              <p className="font-mono text-sm text-foreground">{row.value}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Reveal delay={0.1} className="mt-14 pt-10 border-t border-border">
        <p id="now" className="eyebrow mb-4 scroll-mt-24">
          Now
        </p>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-xl">
          Currently building AI Cloud Insights at ASCP GPUonCLOUD — a multi-tenant GenAI
          platform unifying AWS, Azure, and GCP monitoring. Currently maintaining
          Agentic-Gate, a schema-validation guardrail engine for LLM tool calls, published
          to npm and PyPI.
        </p>
      </Reveal>
    </div>
  </section>
);

export default About;

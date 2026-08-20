import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

const meta = [
  { label: 'Based in', value: 'Pune, Maharashtra, India' },
  { label: 'Currently at', value: 'ASCP GPUonCLOUD' },
  { label: 'Certified', value: 'AWS Certified Developer – Associate' },
];

const About = () => (
  <section id="about" className="py-20 rule">
    <div className="wrap">
      <p className="eyebrow mb-4">Profile</p>
      <h2 className="font-display font-bold text-4xl md:text-6xl mb-10">
        Not just prompting. <span className="text-muted-foreground">Systems thinking.</span>
      </h2>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-10">
        <Reveal>
          <p className="font-mono text-base md:text-lg leading-relaxed text-foreground/90">
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
              <div className="border border-border p-4">
                <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground mb-1">
                  {row.label}
                </p>
                <p className="font-mono text-sm">{row.value}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  </section>
);

export default About;

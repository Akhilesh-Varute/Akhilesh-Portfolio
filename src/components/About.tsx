import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import SectionHeading from '@/components/motion/SectionHeading';

const meta = [
  { label: 'Based in', value: 'Pune, Maharashtra, India' },
  { label: 'Focus', value: 'Cloud backends & GenAI tooling' },
  { label: 'Currently at', value: 'ASCP GPUonCLOUD' },
  { label: 'Site', value: 'akhileshvarute.me', href: 'https://akhileshvarute.me' },
];

const About = () => {
  return (
    <section id="about" className="py-28 md:py-36 px-6">
      <div className="container max-w-6xl mx-auto">
        <SectionHeading number="01" title="About" kicker="Who I am" />

        <div className="grid md:grid-cols-[1fr_0.7fr] gap-16 items-start">
          <Reveal>
            <p className="font-display text-2xl md:text-[2.05rem] leading-[1.4] text-foreground">
              <span className="float-left font-display italic text-[4.2rem] leading-[0.8] pr-3 pt-1 text-primary">
                I
              </span>
              am a Software Developer specializing in Cloud Solutions with expertise in
              building scalable, production-grade cloud backends and GenAI platform
              automation. My focus is on architecting event-driven microservices on AWS,
              enforcing deterministic guardrails for LLM agent workflows, and automating
              infrastructure provisioning using Infrastructure as Code.
            </p>
          </Reveal>

          <Stagger className="md:mt-2 md:pl-12 md:border-l border-border space-y-6">
            {meta.map((row) => (
              <StaggerItem key={row.label}>
                <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-muted-foreground mb-1.5">
                  {row.label}
                </p>
                {row.href ? (
                  <a href={row.href} className="font-display text-lg text-primary link-hover">
                    {row.value}
                  </a>
                ) : (
                  <p className="font-display text-lg text-foreground">{row.value}</p>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
};

export default About;

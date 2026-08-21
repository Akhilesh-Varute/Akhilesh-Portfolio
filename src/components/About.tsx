import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

const meta = [
  { label: 'Based in', value: 'Pune, Maharashtra, India' },
  { label: 'Currently', value: 'Software Developer (Cloud Solutions), ASCP GPUonCLOUD' },
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
            Most people learning cloud and AI right now optimize for speed — ship the demo,
            ship the prompt, move on. I optimize for what happens after: who's on call when
            it breaks, what happens when a model hallucinates a tool call, whether the
            infrastructure still holds up once someone other than me is touching it.
            That's the lens everything here gets built through — not a stack of buzzwords,
            a way of deciding what actually counts as production-ready.
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

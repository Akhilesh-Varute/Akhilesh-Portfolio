import { Stagger, StaggerItem } from '@/components/motion/Reveal';

const highlights = [
  { label: 'Certification', value: 'AWS Certified Developer – Associate' },
  { label: 'Open Source', value: 'Creator of Agentic-Gate (npm & PyPI)' },
  { label: 'Cost Impact', value: '40% AWS Cost Overhead Reduction' },
];

const Highlights = () => (
  <section id="highlights" className="border-y border-border py-14 px-6">
    <Stagger className="container max-w-6xl mx-auto grid sm:grid-cols-3 gap-10">
      {highlights.map((h, i) => (
        <StaggerItem key={h.label}>
          <div className="flex items-start gap-4">
            <span className="font-mono text-xs text-primary mt-1">0{i + 1}</span>
            <div>
              <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-muted-foreground mb-1.5">
                {h.label}
              </p>
              <p className="font-display text-lg text-foreground leading-snug">{h.value}</p>
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  </section>
);

export default Highlights;

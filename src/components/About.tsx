import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

const meta = [
  { label: 'Based in', value: 'Pune, Maharashtra, India' },
  { label: 'Currently', value: 'Software Developer, Expert Cloud Consulting (ASCP GPUonCLOUD Pvt Ltd)' },
  { label: 'Certified', value: 'AWS Certified Developer – Associate' },
];

const About = () => (
  <section id="about" className="py-20 rule">
    <div className="wrap">
      <p className="eyebrow mb-4">Profile</p>
      <h2 className="font-display font-bold text-4xl md:text-6xl mb-10">
        What I care about, <span className="text-muted-foreground">in short.</span>
      </h2>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-10">
        <Reveal>
          <p className="font-mono text-base md:text-lg leading-relaxed text-foreground/90">
            I build backends around LLMs, and most of my time goes into the parts that have
            to keep working when nobody is watching. What happens when a model calls a tool
            with bad arguments? Who finds out when something breaks? Does it still hold up
            once other people start changing it? I built AI Cloud Insights from scratch and
            then led a few developers through its launch. I wrote agentic-gate because I
            kept seeing LLM tool calls reach real systems with no checks in between.
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

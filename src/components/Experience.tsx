import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

const experience = {
  role: 'Software Developer (Cloud Solutions)',
  company: 'ASCP GPUonCLOUD',
  location: 'Pune, Maharashtra, India',
  period: 'Nov 2024 — Present',
  highlights: [
    'Architected GenAI-powered platform (AI Cloud Insights) using AWS Bedrock to automate infrastructure health monitoring.',
    'Engineered multi-tenant microservices backends with Node.js, Python, AWS Lambda, and EventBridge.',
    'Built AWS CloudFormation templates to automate client environment provisioning timelines.',
    'Containerized core microservices using Docker and deployed on Amazon ECS Fargate.',
  ],
};

const Experience = () => (
  <section id="experience" className="py-20 rule">
    <div className="wrap">
      <p className="eyebrow mb-4">Profile / Experience</p>
      <h2 className="font-display font-bold text-4xl md:text-6xl mb-12">Where I've worked</h2>

      <div className="panel">
        <div className="panel-topbar justify-between">
          <span>Role / Company</span>
          <span className="text-primary">ACTIVE</span>
        </div>
        <div className="p-6 md:p-8">
          <Reveal>
            <h3 className="font-display font-bold text-xl">
              {experience.role} <span className="text-muted-foreground">@ {experience.company}</span>
            </h3>
            <p className="font-mono text-xs text-muted-foreground mt-1.5">
              {experience.period} · {experience.location}
            </p>
          </Reveal>

          <Stagger className="space-y-3 mt-6">
            {experience.highlights.map((point, i) => (
              <StaggerItem key={i}>
                <span className="flex gap-3 font-mono text-sm text-foreground/85 leading-relaxed">
                  <span className="text-primary">→</span>
                  {point}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </div>
  </section>
);

export default Experience;

import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import DeployPipelineScene from '@/components/workspace/DeployPipelineScene';

const experience = {
  role: 'Software Developer',
  company: 'Expert Cloud Consulting (ASCP GPUonCLOUD Pvt Ltd)',
  location: 'Pune, Maharashtra, India',
  period: 'Jun 2024 to Present',
  highlights: [
    'Built and launched AI Cloud Insights, a GenAI platform on AWS Bedrock that automates AWS infrastructure monitoring and cost management. Sole engineer from day one; onboarded and led 3 developers ahead of public launch.',
    'Ship to production about 13 times a week with a 3.6-minute median deploy time through CI/CD (160+ merged PRs).',
    'Built GenAI bots (SecurityBot, CostBot, Activity Assistant) that use LLM function calling to invoke cloud APIs and answer natural-language queries.',
    'Engineered multi-tenant microservices in Node.js and Python, with serverless event-driven flows on AWS Lambda and EventBridge.',
    'Containerized a service with Docker and deployed it on Amazon ECS with AWS Fargate; wrote CloudFormation templates that shortened client environment provisioning.',
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
        <div className="p-6 md:p-8 grid lg:grid-cols-[1fr_380px] gap-8">
          <div>
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

          <div className="hidden lg:block">
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground mb-3">
              How a feature ships, live
            </p>
            <DeployPipelineScene />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Experience;

import { Reveal } from '@/components/motion/Reveal';

const categories = [
  {
    title: 'Cloud & Infrastructure',
    items: [
      'AWS Bedrock', 'AWS Lambda', 'Amazon ECS Fargate', 'AWS S3', 'CloudFront',
      'Amazon EC2', 'AWS IAM', 'Security Hub', 'CloudFormation', 'Docker',
      'Kubernetes', 'CI/CD (GitHub Actions)', 'Infrastructure as Code (IaC)',
    ],
  },
  {
    title: 'Backend & AI/LLM',
    items: [
      'Python', 'TypeScript', 'Node.js', 'Fastify', 'LangChain', 'Pydantic', 'Zod',
      'REST APIs', 'Microservices Architecture', 'Event-Driven Systems',
    ],
  },
  {
    title: 'Databases & Tooling',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Linux', 'Git', 'n8n', 'Postman', 'Automated Workflows'],
  },
];

const Skills = () => (
  <section id="skills" className="py-20 rule">
    <div className="offset-col-wide">
      <p className="eyebrow mb-2">About / Skills</p>
      <h2 className="font-display italic text-4xl md:text-5xl mb-12">What I work with</h2>

      <div className="grid md:grid-cols-3 gap-x-10 gap-y-10">
        {categories.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 0.1}>
            <div>
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <h3 className="font-mono text-sm text-foreground mt-2 mb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="font-mono text-sm text-muted-foreground leading-relaxed border-b border-border/60 py-1.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;

import { Reveal } from '@/components/motion/Reveal';
import SectionHeading from '@/components/motion/SectionHeading';

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
  <section id="skills" className="py-28 md:py-36 px-6">
    <div className="container max-w-6xl mx-auto">
      <SectionHeading number="04" title="Skills" kicker="What I work with" />

      <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 rule pt-12">
        {categories.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 0.1}>
            <div>
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <h3 className="font-display text-xl text-foreground mt-2 mb-5">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="text-muted-foreground text-sm leading-relaxed border-b border-border/60 py-1.5">
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

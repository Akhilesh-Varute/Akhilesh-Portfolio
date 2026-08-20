import { Reveal } from '@/components/motion/Reveal';
import SequenceDiagramScene from '@/components/workspace/SequenceDiagramScene';

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
    <div className="wrap">
      <p className="eyebrow mb-4">Profile / Skills</p>
      <h2 className="font-display font-bold text-4xl md:text-6xl mb-10">What I work with</h2>

      <Reveal className="mb-14">
        <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground mb-3">
          Node · Python, live
        </p>
        <SequenceDiagramScene />
      </Reveal>

      <div className="grid md:grid-cols-3">
        {categories.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 0.1} className="border border-border -ml-px -mt-px">
            <div className="p-6">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <h3 className="font-display font-bold text-lg mt-2 mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="font-mono text-[11px] text-muted-foreground border border-border px-2 py-1">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;

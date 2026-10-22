import { Reveal } from '@/components/motion/Reveal';
import SequenceDiagramScene from '@/components/workspace/SequenceDiagramScene';

const categories = [
  {
    title: 'AI & LLM',
    items: [
      'AWS Bedrock', 'LLM function calling', 'Tool-call validation', 'Zod', 'Pydantic',
      'LangChain', 'Claude Code', 'GitHub Copilot',
    ],
  },
  {
    title: 'Backend',
    items: [
      'Python', 'TypeScript', 'Node.js', 'FastAPI', 'REST APIs', 'Microservices',
      'Event-driven systems', 'DynamoDB', 'MongoDB', 'Redis', 'Next.js',
    ],
  },
  {
    title: 'Cloud & delivery',
    items: [
      'AWS Lambda', 'EventBridge', 'API Gateway', 'ECS Fargate', 'IAM and STS',
      'CloudFormation', 'Docker', 'GitHub Actions CI/CD', 'Linux', 'Git',
    ],
  },
];

const Skills = () => (
  <section id="skills" className="py-20 rule">
    <div className="wrap">
      <p className="eyebrow mb-4">Profile / Skills</p>
      <h2 className="font-display font-bold text-4xl md:text-6xl mb-10">What I work with</h2>

      <Reveal className="mb-14">
        <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground mb-3">
          How agentic-gate handles a tool call · illustrative
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

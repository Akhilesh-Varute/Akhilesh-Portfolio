import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  Award,
  Bot,
  Cloud,
  Container,
  LayoutTemplate,
  Server,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import SectionHeading from '@/components/motion/SectionHeading';

interface Cell {
  title: string;
  icon: LucideIcon;
  skills: string[];
  span: string;
  featured?: boolean;
}

const cells: Cell[] = [
  {
    title: 'Cloud & AI',
    icon: Cloud,
    skills: ['AWS Bedrock', 'Lambda', 'API Gateway', 'STS', 'CloudWatch', 'Cost Explorer', 'Security Hub', 'GuardDuty', 'S3', 'EC2'],
    span: 'md:col-span-3',
  },
  {
    title: 'Backend',
    icon: Server,
    skills: ['Node.js', 'TypeScript', 'Express.js', 'Fastify', 'REST APIs', 'Microservices', 'WebSockets'],
    span: 'md:col-span-3',
  },
  {
    title: 'Infrastructure',
    icon: Container,
    skills: ['Docker', 'Kubernetes', 'Crossplane', 'CI/CD', 'CodePipeline', 'GitHub Actions'],
    span: 'md:col-span-2',
  },
  {
    title: 'AI / GenAI',
    icon: Sparkles,
    skills: ['Amazon Bedrock', 'LLMs', 'Function calling / Tool use', 'Prompt Engineering', 'NLP'],
    span: 'md:col-span-2',
  },
  {
    title: 'Auth & Data',
    icon: ShieldCheck,
    skills: ['JWT', 'RBAC', 'Multi-tenant architecture', 'MongoDB', 'Redis'],
    span: 'md:col-span-2',
  },
  {
    title: 'AI Dev Tools',
    icon: Bot,
    skills: ['Claude Code', 'GitHub Copilot', 'Claude (Anthropic)'],
    span: 'md:col-span-4',
    featured: true,
  },
  {
    title: 'Frontend',
    icon: LayoutTemplate,
    skills: ['React.js', 'JavaScript'],
    span: 'md:col-span-2',
  },
];

const Skills = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Two chip ribbons drift in opposite directions, driven purely by scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const ribbonLeft = useTransform(scrollYProgress, [0, 1], ['2%', '-14%']);
  const ribbonRight = useTransform(scrollYProgress, [0, 1], ['-14%', '2%']);

  const ribbonOne = ['Bedrock', 'Lambda', 'STS', 'CloudWatch', 'Cost Explorer', 'Security Hub', 'GuardDuty', 'S3', 'EC2', 'API Gateway', 'CodePipeline', 'Docker', 'Kubernetes', 'Crossplane'];
  const ribbonTwo = ['Node.js', 'TypeScript', 'Express.js', 'Fastify', 'MongoDB', 'Redis', 'React.js', 'WebSockets', 'JWT', 'RBAC', 'GitHub Actions', 'Claude Code', 'Prompt Engineering', 'LLMs'];

  return (
    <section id="skills" ref={ref} className="py-32 px-6 bg-secondary/30 overflow-hidden">
      <div className="container max-w-6xl mx-auto">
        <SectionHeading number="04" title="Technical Arsenal" kicker="what I work with" />
      </div>

      {/* Scroll-driven chip ribbons — full bleed */}
      <div className="space-y-4 mb-16 -mx-6" aria-hidden="true">
        <motion.div
          className="flex gap-3 whitespace-nowrap w-max"
          style={reduceMotion ? undefined : { x: ribbonLeft, willChange: 'transform' }}
        >
          {ribbonOne.map((skill) => (
            <span key={skill} className="chip font-mono text-xs md:text-sm">
              {skill}
            </span>
          ))}
        </motion.div>
        <motion.div
          className="flex gap-3 whitespace-nowrap w-max"
          style={reduceMotion ? undefined : { x: ribbonRight, willChange: 'transform' }}
        >
          {ribbonTwo.map((skill) => (
            <span key={skill} className="chip font-mono text-xs md:text-sm">
              {skill}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container max-w-6xl mx-auto">
        {/* Bento grid */}
        <Stagger className="grid md:grid-cols-6 gap-4 mb-6">
          {cells.map((cell) => (
            <StaggerItem key={cell.title} className={cell.span}>
              <motion.div
                className={`h-full p-6 rounded-2xl transition-colors duration-300 ${
                  cell.featured
                    ? 'glass-card border-glow'
                    : 'glass-card hover:border-primary/40'
                }`}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <cell.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground">
                    {cell.title}
                  </h3>
                  {cell.featured && (
                    <span className="ml-auto font-mono text-[10px] tracking-widest text-primary border border-primary/30 bg-primary/10 rounded-full px-2.5 py-1">
                      DAILY DRIVER
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cell.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs text-muted-foreground bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1.5 hover:text-primary hover:border-primary/30 transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Certification banner */}
        <Reveal delay={0.1}>
          <motion.div
            className="p-6 rounded-2xl glass-card border-glow flex flex-wrap items-center gap-5 group"
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Award className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <h4 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
                AWS Certified Developer – Associate
              </h4>
              <p className="text-muted-foreground text-sm mt-0.5">
                Amazon Web Services · DVA-C02
              </p>
            </div>
            <span className="font-mono text-xs text-primary border border-primary/30 bg-primary/10 rounded-full px-4 py-2">
              VERIFIED
            </span>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;

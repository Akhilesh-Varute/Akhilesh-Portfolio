import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
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

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.8', 'end 0.5'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" className="py-20 rule">
      <div className="offset-col-wide">
        <p className="eyebrow mb-2">About / Experience</p>
        <h2 className="font-display italic text-4xl md:text-5xl mb-12">Where I've worked</h2>

        <div ref={timelineRef} className="relative pl-7">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-px bg-primary origin-top"
            style={{ scaleY: reduceMotion ? 1 : lineScale }}
          />
          <motion.div
            className="absolute top-0 w-2 h-2 bg-primary rounded-full"
            style={{ left: '-4px' }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
          />

          <Reveal>
            <h3 className="font-mono text-base text-foreground">
              {experience.role} <span className="text-primary">@ {experience.company}</span>
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
                  <span>{point}</span>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
};

export default Experience;

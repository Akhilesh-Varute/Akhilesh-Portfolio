import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import SectionHeading from '@/components/motion/SectionHeading';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotionGsap } from '@/hooks/use-reduced-motion-gsap';

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
  const lineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionGsap();

  useEffect(() => {
    const timeline = timelineRef.current;
    const line = lineRef.current;
    if (!timeline || !line) return;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(line, { scaleY: 1 });
        return;
      }
      gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });
      gsap.to(line, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 80%',
          end: 'bottom 55%',
          scrub: 0.6,
        },
      });
    }, timeline);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section id="experience" className="py-28 md:py-36 px-6 bg-secondary/40">
      <div className="container max-w-6xl mx-auto">
        <SectionHeading number="03" title="Experience" kicker="Where I've worked" />

        <div ref={timelineRef} className="relative pl-8 md:pl-10">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
          <div ref={lineRef} className="absolute left-0 top-0 bottom-0 w-px bg-primary" />
          <motion.div
            className="absolute top-0 w-2.5 h-2.5 bg-primary rounded-full"
            style={{ left: '-4.5px' }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
          />

          <Reveal>
            <h3 className="text-2xl font-display text-foreground">
              {experience.role} <span className="text-primary italic">@ {experience.company}</span>
            </h3>
            <p className="font-mono text-sm text-muted-foreground mt-1.5">
              {experience.period} · {experience.location}
            </p>
          </Reveal>

          <Stagger className="space-y-3.5 mt-6">
            {experience.highlights.map((point, i) => (
              <StaggerItem key={i}>
                <span className="flex gap-3 text-foreground/85 leading-relaxed">
                  <span className="text-primary mt-1.5">—</span>
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

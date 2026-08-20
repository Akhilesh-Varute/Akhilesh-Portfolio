import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotionGsap } from '@/hooks/use-reduced-motion-gsap';

interface Stat {
  target: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { target: 40, suffix: '%', label: 'Assessment overhead reduced at ASCP GPUonCLOUD' },
  { target: 3, suffix: '', label: 'Cloud providers unified — AWS, Azure, GCP' },
  { target: 100, suffix: '%', label: 'Test coverage on Agentic-Gate through v1.4.0' },
];

const StatCounters = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduceMotion = useReducedMotionGsap();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const el = valueRefs.current[i];
        if (!el) return;

        if (reduceMotion) {
          el.textContent = `${stat.target}${stat.suffix}`;
          return;
        }

        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.target,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 0.6,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.val)}${stat.suffix}`;
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section id="highlights" ref={sectionRef} className="border-y border-border py-16 px-6">
      <div className="container max-w-6xl mx-auto grid sm:grid-cols-3 gap-10">
        {stats.map((stat, i) => (
          <div key={stat.label}>
            <p className="font-display italic text-6xl md:text-7xl text-primary leading-none">
              <span ref={(el) => (valueRefs.current[i] = el)}>0{stat.suffix}</span>
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-4 leading-relaxed max-w-[16rem]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatCounters;

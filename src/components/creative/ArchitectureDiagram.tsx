import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotionGsap } from '@/hooks/use-reduced-motion-gsap';

const nodes = [
  { id: 'client', label: 'Client Request', x: 70, y: 150 },
  { id: 'gateway', label: 'API Gateway', x: 305, y: 60 },
  { id: 'lambda', label: 'AWS Lambda', x: 540, y: 150 },
  { id: 'bridge', label: 'EventBridge', x: 775, y: 60 },
  { id: 'bedrock', label: 'Bedrock / ECS', x: 930, y: 150 },
];

const paths = [
  { id: 'p1', from: 0, to: 1 },
  { id: 'p2', from: 1, to: 2 },
  { id: 'p3', from: 2, to: 3 },
  { id: 'p4', from: 3, to: 4 },
];

const pathD = (from: (typeof nodes)[number], to: (typeof nodes)[number]) => {
  const midX = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} Q ${midX} ${from.y} ${midX} ${(from.y + to.y) / 2} T ${to.x} ${to.y}`;
};

const ArchitectureDiagram = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const reduceMotion = useReducedMotionGsap();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const svg = svgRef.current;
    if (!wrapper || !svg) return;

    const ctx = gsap.context(() => {
      const nodeEls = gsap.utils.toArray<SVGGElement>('[data-node]', svg);
      const pathEls = gsap.utils.toArray<SVGPathElement>('[data-path]', svg);
      const lengths = pathEls.map((p) => p.getTotalLength());

      pathEls.forEach((p, i) => {
        gsap.set(p, { strokeDasharray: lengths[i], strokeDashoffset: reduceMotion ? 0 : lengths[i] });
      });
      gsap.set(nodeEls, { opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.7, transformOrigin: 'center' });
      gsap.set(nodeEls[0], { opacity: 1, scale: 1 });

      if (reduceMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      pathEls.forEach((p, i) => {
        tl.to(p, { strokeDashoffset: 0, duration: 1, ease: 'none' }, i)
          .to(nodeEls[i + 1], { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, i + 0.6);
      });
    }, wrapper);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section id="architecture" className="bg-secondary/40 border-y border-border">
      <div ref={wrapperRef} className="relative" style={{ height: '260vh' }}>
        <div className="sticky top-0 h-screen flex flex-col justify-center px-6 overflow-hidden">
          <div className="container max-w-6xl mx-auto w-full">
            <p className="eyebrow mb-3">How I build</p>
            <h2 className="text-3xl md:text-5xl font-medium font-display text-foreground mb-14">
              Event-driven, by design
            </h2>

            <svg ref={svgRef} viewBox="0 0 1000 220" className="w-full h-auto" aria-hidden="true">
              {paths.map((p) => (
                <path
                  key={p.id}
                  data-path
                  d={pathD(nodes[p.from], nodes[p.to])}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              ))}
              {nodes.map((n) => (
                <g key={n.id} data-node transform={`translate(${n.x}, ${n.y})`}>
                  <circle r={26} fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <circle r={5} fill="hsl(var(--primary))" />
                </g>
              ))}
            </svg>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-8">
              {nodes.map((n) => (
                <p key={n.id} className="font-mono text-xs text-muted-foreground text-center">
                  {n.label}
                </p>
              ))}
            </div>

            <p className="text-muted-foreground text-sm max-w-lg mt-10 mx-auto text-center">
              Requests land in API Gateway, run through Lambda, fan out via EventBridge, and
              resolve against Bedrock or ECS — the same shape I used to build AI Cloud Insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDiagram;

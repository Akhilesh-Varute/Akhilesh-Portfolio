interface MarqueeProps {
  text: string;
  className?: string;
}

/**
 * Edge-to-edge band of oversized repeated text, scrolling via a pure-CSS
 * loop (src/index.css .animate-marquee) — no JS/rAF needed, and it's
 * automatically frozen under prefers-reduced-motion by the global media
 * query that zeroes animation-duration.
 */
const Marquee = ({ text, className = '' }: MarqueeProps) => {
  const item = (key: string) => (
    <span key={key} className="font-display italic pr-10 shrink-0">
      {text}
    </span>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap border-y border-border py-4 ${className}`} aria-hidden="true">
      <div className="flex w-max animate-marquee text-[9vw] leading-none text-foreground/90">
        {item('a')}
        {item('b')}
        {item('c')}
        {item('d')}
      </div>
    </div>
  );
};

export default Marquee;

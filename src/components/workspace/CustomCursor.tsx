import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

// Site-wide interactive cursor: a small dot that tracks the pointer 1:1
// and a trailing ring that eases toward it (the classic anime.js
// mouse-follow idiom — re-calling animate() on every pointermove lets
// each new tween smoothly retarget from wherever the ring currently is).
// The ring grows and inverts over anything interactive.
const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!canHover || reduceMotion || !dot || !ring) return;

    document.documentElement.classList.add('custom-cursor-active');

    let hovering = false;

    const handleMove = (e: PointerEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      animate(ring, {
        translateX: e.clientX,
        translateY: e.clientY,
        duration: 500,
        ease: 'out(3)',
      });
    };

    const handleOver = (e: PointerEvent) => {
      const isHoverable = (e.target as Element | null)?.closest?.(HOVER_SELECTOR);
      if (isHoverable && !hovering) {
        hovering = true;
        animate(ring, { scale: 2.4, duration: 350, ease: 'outQuad' });
      } else if (!isHoverable && hovering) {
        hovering = false;
        animate(ring, { scale: 1, duration: 350, ease: 'outQuad' });
      }
    };

    const handleLeaveWindow = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const handleEnterWindow = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerover', handleOver);
    document.documentElement.addEventListener('mouseleave', handleLeaveWindow);
    document.documentElement.addEventListener('mouseenter', handleEnterWindow);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerover', handleOver);
      document.documentElement.removeEventListener('mouseleave', handleLeaveWindow);
      document.documentElement.removeEventListener('mouseenter', handleEnterWindow);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-primary pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring fixed top-0 left-0 w-8 h-8 rounded-full border border-foreground pointer-events-none z-[998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
};

export default CustomCursor;

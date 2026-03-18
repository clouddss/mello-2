import { useEffect, useRef, useCallback } from 'react';

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

/**
 * Attaches IntersectionObserver to all [data-reveal] elements within a container.
 * Adds `.is-visible` when the element enters the viewport.
 * Supports stagger via `data-reveal-delay` (ms) and direction via `data-reveal` value.
 */
export function useScrollReveal(options: RevealOptions = {}) {
  const containerRef = useRef<HTMLElement>(null);

  const setup = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay;
            if (delay) {
              el.style.transitionDelay = `${delay}ms`;
            }
            el.classList.add('is-visible');
            if (options.once !== false) {
              observer.unobserve(el);
            }
          } else if (options.once === false) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -60px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  useEffect(() => {
    // Small delay to ensure DOM is painted
    const raf = requestAnimationFrame(() => {
      setup();
    });
    return () => cancelAnimationFrame(raf);
  }, [setup]);

  return containerRef;
}

/**
 * Parallax hook — applies translateY based on scroll position.
 * Attach to a container; all [data-parallax] children get the effect.
 * data-parallax="0.1" means element moves at 10% of scroll speed.
 */
export function useParallax() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-parallax]');
    if (!elements.length) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        elements.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || '0.1');
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const viewCenter = window.innerHeight / 2;
          const offset = (center - viewCenter) * speed;
          el.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

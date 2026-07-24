import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ComponentType } from "react";

interface LazySectionProps {
  loader: () => Promise<{ default: ComponentType<unknown> }>;
  minHeight?: number;
  rootMargin?: string;
  id?: string;
  className?: string;
}

/**
 * ponytail: Loads a heavy below-the-fold section only when it nears the viewport.
 * One IntersectionObserver per section, disconnects after first reveal.
 * Keeps the above-the-fold paint path free of offscreen component code.
 */
const LazySection = ({
  loader,
  minHeight = 400,
  rootMargin = "300px 0px",
  id,
  className,
}: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const LazyComp = useMemo(() => lazy(loader), [loader]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (!visible) {
    return (
      <div
        ref={ref}
        id={id}
        className={className}
        style={{ minHeight }}
        aria-hidden="true"
      />
    );
  }

  return (
    <Suspense fallback={<SectionSkeleton minHeight={minHeight} />}>
      <LazyComp />
    </Suspense>
  );
};

const SectionSkeleton = ({ minHeight }: { minHeight: number }) => (
  <div
    className="section-padding flex items-center justify-center"
    style={{ minHeight }}
  >
    <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

export default LazySection;
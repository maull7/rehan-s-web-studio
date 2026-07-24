import { useEffect, useRef } from "react";

// ponytail: custom cursor is always on for fine-pointer devices. dot + ring only, no trail.
// No toggle — localStorage dependency removed.
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);
  const pointerRef = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    const style = document.createElement("style");
    style.textContent = "@media (pointer: fine){*{cursor:none!important}}";
    document.head.appendChild(style);

    // Initial off-screen position so the cursor doesn't flash at (0,0).
    const initialTransform = "translate3d(-9999px, -9999px, 0) translate(-50%, -50%)";
    if (dotRef.current) dotRef.current.style.transform = initialTransform;
    if (ringRef.current) ringRef.current.style.transform = initialTransform;

    const raf = () => {
      const { x, y } = posRef.current;
      const transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (dotRef.current) dotRef.current.style.transform = transform;
      if (ringRef.current) ringRef.current.style.transform = transform;
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    const isClickable = (target: Element): boolean => {
      return !!(
        target instanceof Element &&
        target.closest("a,button,[role='button'],label,input,select,textarea,summary,[data-cursor='pointer']")
      );
    };

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        dotRef.current?.style.setProperty("opacity", "1");
        ringRef.current?.style.setProperty("opacity", "1");
      }
      const pointer = isClickable(e.target as Element);
      if (pointer !== pointerRef.current) {
        pointerRef.current = pointer;
        ringRef.current?.classList.toggle("cursor-pointer", pointer);
      }
    };

    const onLeave = () => {
      visibleRef.current = false;
      dotRef.current?.style.setProperty("opacity", "0");
      ringRef.current?.style.setProperty("opacity", "0");
    };
    const onEnter = () => {
      visibleRef.current = true;
      dotRef.current?.style.setProperty("opacity", "1");
      ringRef.current?.style.setProperty("opacity", "1");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      style.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2 h-2 rounded-full bg-primary will-change-transform"
        style={{ opacity: 0, transition: "opacity 200ms" }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-8 h-8 rounded-full border-2 border-primary/50 transition-[width,height,background-color,border-color,opacity] duration-300 ease-out will-change-transform"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <style>{`
        .cursor-pointer {
          width: 3rem !important;
          height: 3rem !important;
          border-color: hsl(var(--primary)) !important;
          background: hsl(var(--primary) / 0.1);
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
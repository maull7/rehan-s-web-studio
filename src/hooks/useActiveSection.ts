import { useState, useEffect, useCallback, useRef } from "react";

// ponytail: rAF-throttled + offset-cached scroll tracking.
export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const offsetsRef = useRef<Map<string, number>>(new Map());

  const handleScroll = useCallback(() => {
    setActiveSection(() => {
      const scrollPosition = window.scrollY + 100;
      let active = sectionIds[0] || "";
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        let offset = offsetsRef.current.get(id);
        if (offset === undefined) {
          const el = document.getElementById(id);
          offset = el ? el.offsetTop : 0;
          if (el) offsetsRef.current.set(id, offset);
        }
        if (offset <= scrollPosition) {
          active = id;
          break;
        }
      }
      return active;
    });
  }, [sectionIds]);

  useEffect(() => {
    const offsets = offsetsRef.current;
    handleScroll();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
    };
    const onResize = () => offsets.clear();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [handleScroll]);

  return activeSection;
};

export default useActiveSection;
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import useScrollReveal from "@/hooks/useScrollReveal";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "zoom" | "fade";
  delay?: number;
  duration?: number;
}

const ScrollReveal = ({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 600,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const animationStyles = {
    "fade-up": {
      initial: "opacity-0 translate-y-10",
      visible: "opacity-100 translate-y-0",
    },
    "fade-left": {
      initial: "opacity-0 -translate-x-10",
      visible: "opacity-100 translate-x-0",
    },
    "fade-right": {
      initial: "opacity-0 translate-x-10",
      visible: "opacity-100 translate-x-0",
    },
    zoom: {
      initial: "opacity-0 scale-95",
      visible: "opacity-100 scale-100",
    },
    fade: {
      initial: "opacity-0",
      visible: "opacity-100",
    },
  };

  const { initial, visible } = animationStyles[animation];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "transition-all ease-out",
        isVisible ? visible : initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;

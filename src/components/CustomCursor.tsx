import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  const updateCursor = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);

    // Add trail point
    setTrail((prev) => {
      const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
      return newTrail.slice(-8); // Keep only last 8 points
    });

    // Check if hovering over clickable element
    const target = e.target as HTMLElement;
    const isClickable =
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      !!target.closest("button") ||
      !!target.closest("a") ||
      !!target.closest("[role='button']") ||
      window.getComputedStyle(target).cursor === "pointer";
    
    setIsPointer(isClickable);
  }, []);

  useEffect(() => {
    // Check if device has touch capability (mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mousedown", () => setIsClicking(true));
    window.addEventListener("mouseup", () => setIsClicking(false));
    window.addEventListener("mouseleave", () => setIsVisible(false));
    window.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mousedown", () => setIsClicking(true));
      window.removeEventListener("mouseup", () => setIsClicking(false));
      window.removeEventListener("mouseleave", () => setIsVisible(false));
      window.removeEventListener("mouseenter", () => setIsVisible(true));
    };
  }, [updateCursor]);

  // Fade out old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.slice(1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Trail effect */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9998] rounded-full bg-primary/30"
          style={{
            left: point.x,
            top: point.y,
            width: 4 + index * 0.5,
            height: 4 + index * 0.5,
            transform: "translate(-50%, -50%)",
            opacity: (index + 1) / trail.length * 0.5,
          }}
        />
      ))}

      {/* Main cursor dot */}
      <div
        className={cn(
          "fixed pointer-events-none z-[9999] rounded-full transition-transform duration-75",
          isVisible ? "opacity-100" : "opacity-0",
          isClicking ? "scale-75" : "scale-100"
        )}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Inner dot */}
        <div
          className={cn(
            "rounded-full bg-primary transition-all duration-200",
            isPointer ? "w-3 h-3" : "w-2 h-2"
          )}
        />
      </div>

      {/* Outer ring */}
      <div
        className={cn(
          "fixed pointer-events-none z-[9998] rounded-full border-2 transition-all duration-300 ease-out",
          isVisible ? "opacity-100" : "opacity-0",
          isPointer
            ? "w-12 h-12 border-primary bg-primary/10"
            : "w-8 h-8 border-primary/50",
          isClicking ? "scale-90" : "scale-100"
        )}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Glow effect when hovering interactive elements */}
      {isPointer && (
        <div
          className="fixed pointer-events-none z-[9997] w-20 h-20 rounded-full bg-primary/20 blur-xl transition-opacity duration-300"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;

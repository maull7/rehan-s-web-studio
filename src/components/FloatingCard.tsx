import { useState, useRef, useEffect } from "react";
import { Briefcase, GripVertical, X, Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingCard = () => {
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const dragOffset = useRef({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;
      
      // Keep within viewport bounds
      const maxX = window.innerWidth - (cardRef.current?.offsetWidth || 200);
      const maxY = window.innerHeight - (cardRef.current?.offsetHeight || 100);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      
      const touch = e.touches[0];
      const newX = touch.clientX - dragOffset.current.x;
      const newY = touch.clientY - dragOffset.current.y;
      
      const maxX = window.innerWidth - (cardRef.current?.offsetWidth || 200);
      const maxY = window.innerHeight - (cardRef.current?.offsetHeight || 100);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!cardRef.current) return;
    
    const touch = e.touches[0];
    dragOffset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
    setIsDragging(true);
  };

  if (!isVisible) return null;

  return (
    <div
      ref={cardRef}
      className={cn(
        "fixed z-[60] glass-card shadow-2xl transition-all duration-200 select-none",
        isDragging ? "cursor-grabbing scale-105" : "cursor-grab",
        isMinimized ? "w-auto" : "w-64"
      )}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {/* Header - Drag Handle */}
      <div
        className="flex items-center justify-between gap-2 p-3 border-b border-border/30 bg-primary/5"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">ID Card</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded hover:bg-primary/10 transition-colors"
          >
            {isMinimized ? (
              <Maximize2 className="h-3 w-3 text-muted-foreground" />
            ) : (
              <Minimize2 className="h-3 w-3 text-muted-foreground" />
            )}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded hover:bg-destructive/10 transition-colors"
          >
            <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="p-4">
          {/* Photo */}
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                alt="Rehan Maulana"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <h3 className="text-center font-bold text-foreground mb-1">
            Rehan Maulana
          </h3>

          {/* Role */}
          <div className="flex items-center justify-center gap-1 mb-3">
            <Briefcase className="h-3 w-3 text-primary" />
            <span className="text-xs text-primary font-medium">Web Developer</span>
          </div>

          {/* Status */}
          <div className="flex items-center justify-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              Available for Work
            </span>
          </div>

          {/* Skills Mini */}
          <div className="mt-3 flex flex-wrap justify-center gap-1">
            {["React", "Node.js", "TypeScript"].map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-[10px] bg-secondary text-secondary-foreground rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingCard;

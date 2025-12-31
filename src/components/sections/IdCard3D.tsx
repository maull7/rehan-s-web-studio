import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Code2, Globe, Layers, GripVertical } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const techIcons = [
  { name: "HTML", color: "#E34F26" },
  { name: "PHP", color: "#1572B6" },
  { name: "JS", color: "#F7DF1E" },
  { name: "React", color: "#61DAFB" },
];

// Sparkle Trail Type
interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  hue: number;
}

// Floating Particle Component
const FloatingParticle = ({ delay, duration, size, initialX, initialY }: {
  delay: number;
  duration: number;
  size: number;
  initialX: number;
  initialY: number;
}) => {
  return (
    <div
      className="absolute rounded-full bg-gradient-to-br from-primary/60 to-purple-500/60 blur-[1px]"
      style={{
        width: size,
        height: size,
        left: `${initialX}%`,
        top: `${initialY}%`,
        animation: `floatParticle ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

// Sparkle Component
const SparkleTrail = ({ sparkle }: { sparkle: Sparkle }) => {
  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: sparkle.x,
        top: sparkle.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Main glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: sparkle.size,
          height: sparkle.size,
          background: `radial-gradient(circle, hsl(${sparkle.hue}, 80%, 60%) 0%, transparent 70%)`,
          opacity: sparkle.opacity,
          filter: "blur(1px)",
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Inner bright core */}
      <div
        className="absolute rounded-full"
        style={{
          width: sparkle.size * 0.4,
          height: sparkle.size * 0.4,
          background: `radial-gradient(circle, white 0%, hsl(${sparkle.hue}, 90%, 80%) 50%, transparent 100%)`,
          opacity: sparkle.opacity,
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Star rays */}
      <svg
        className="absolute"
        style={{
          width: sparkle.size * 1.5,
          height: sparkle.size * 1.5,
          opacity: sparkle.opacity * 0.8,
          transform: "translate(-50%, -50%)",
        }}
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id={`sparkleGrad-${sparkle.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={`hsl(${sparkle.hue}, 80%, 70%)`} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {/* Horizontal ray */}
        <line x1="10" y1="50" x2="90" y2="50" stroke={`url(#sparkleGrad-${sparkle.id})`} strokeWidth="2" />
        {/* Vertical ray */}
        <line x1="50" y1="10" x2="50" y2="90" stroke={`url(#sparkleGrad-${sparkle.id})`} strokeWidth="2" />
        {/* Diagonal rays */}
        <line x1="20" y1="20" x2="80" y2="80" stroke={`url(#sparkleGrad-${sparkle.id})`} strokeWidth="1" opacity="0.6" />
        <line x1="80" y1="20" x2="20" y2="80" stroke={`url(#sparkleGrad-${sparkle.id})`} strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  );
};

const IdCard3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [swingAngle, setSwingAngle] = useState(0);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const sparkleIdRef = useRef(0);

  // Generate background particles once
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 4 + Math.random() * 8,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
    }));
  }, []);

  // Create sparkle at position
  const createSparkle = useCallback((x: number, y: number) => {
    const newSparkle: Sparkle = {
      id: sparkleIdRef.current++,
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      size: 15 + Math.random() * 25,
      opacity: 0.8 + Math.random() * 0.2,
      hue: 190 + Math.random() * 80, // Cyan to purple range
    };
    setSparkles((prev) => [...prev.slice(-15), newSparkle]); // Keep max 16 sparkles
  }, []);

  // Fade out sparkles
  useEffect(() => {
    if (sparkles.length === 0) return;

    const fadeInterval = setInterval(() => {
      setSparkles((prev) =>
        prev
          .map((s) => ({ ...s, opacity: s.opacity - 0.08, size: s.size * 0.95 }))
          .filter((s) => s.opacity > 0)
      );
    }, 50);

    return () => clearInterval(fadeInterval);
  }, [sparkles.length]);

  // Physics-based swing animation
  useEffect(() => {
    if (isDragging) return;

    const friction = 0.98;
    const spring = 0.02;

    const animate = () => {
      setRotation((prev) => {
        const newVelX = (velocity.x - prev.x * spring) * friction;
        const newVelY = (velocity.y - prev.y * spring) * friction;

        setVelocity({ x: newVelX, y: newVelY });

        return {
          x: prev.x + newVelX,
          y: prev.y + newVelY,
        };
      });

      // Gentle idle swing
      setSwingAngle((prev) => prev + 0.02);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isDragging, velocity]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    setRotation((prev) => ({
      x: Math.max(-30, Math.min(30, prev.x + deltaY * 0.5)),
      y: Math.max(-45, Math.min(45, prev.y + deltaX * 0.5)),
    }));

    setVelocity({
      x: deltaY * 0.3,
      y: deltaX * 0.3,
    });

    // Create sparkle trail
    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
      createSparkle(e.clientX, e.clientY);
    }

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMousePos.current.x;
    const deltaY = touch.clientY - lastMousePos.current.y;

    setRotation((prev) => ({
      x: Math.max(-30, Math.min(30, prev.x + deltaY * 0.5)),
      y: Math.max(-45, Math.min(45, prev.y + deltaX * 0.5)),
    }));

    setVelocity({
      x: deltaY * 0.3,
      y: deltaX * 0.3,
    });

    // Create sparkle trail for touch
    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
      createSparkle(touch.clientX, touch.clientY);
    }

    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Calculate idle swing when not dragging
  const idleSwing = isDragging ? 0 : Math.sin(swingAngle) * 3;

  return (
    <section id="idcard" className="section-padding relative overflow-hidden">
      {/* Sparkle Trails */}
      {sparkles.map((sparkle) => (
        <SparkleTrail key={sparkle.id} sparkle={sparkle} />
      ))}

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <FloatingParticle
            key={particle.id}
            delay={particle.delay}
            duration={particle.duration}
            size={particle.size}
            initialX={particle.initialX}
            initialY={particle.initialY}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              Identity
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              Digital <span className="gradient-text">Card</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Drag the card to swing it around!
            </p>
          </div>
        </ScrollReveal>

        {/* Hanging Card Container */}
        <div
          ref={containerRef}
          className="relative flex flex-col items-center justify-start min-h-[750px] cursor-grab active:cursor-grabbing select-none"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ perspective: "1200px" }}
        >
          {/* Lanyard/String Holder */}
          <div className="relative">
            {/* Top Hook */}
            <div className="relative z-20 flex flex-col items-center">
              {/* Hook Base */}
              <div className="w-16 h-8 bg-gradient-to-b from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-700 rounded-t-full shadow-lg" />
              
              {/* Hook Ring */}
              <div className="w-10 h-10 border-4 border-zinc-500 dark:border-zinc-600 rounded-full -mt-2 bg-transparent" />
            </div>

            {/* Lanyard String - LONGER */}
            <svg
              className="absolute top-14 left-1/2 -translate-x-1/2 z-10"
              width="160"
              height="160"
              viewBox="0 0 160 160"
              style={{
                transform: `translateX(-50%) rotateY(${rotation.y * 0.3 + idleSwing}deg)`,
              }}
            >
              <defs>
                <linearGradient id="lanyardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="50%" stopColor="hsl(262, 83%, 58%)" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
              </defs>
              {/* Left string - longer curve */}
              <path
                d={`M 50 0 Q ${35 + rotation.y * 0.3} 80, 65 155`}
                stroke="url(#lanyardGradient)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Right string - longer curve */}
              <path
                d={`M 110 0 Q ${125 + rotation.y * 0.3} 80, 95 155`}
                stroke="url(#lanyardGradient)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* Card Clip - positioned lower */}
            <div
              className="absolute top-[165px] left-1/2 -translate-x-1/2 z-30 w-24 h-8 bg-gradient-to-b from-zinc-300 to-zinc-400 dark:from-zinc-600 dark:to-zinc-700 rounded-md shadow-md flex items-center justify-center"
              style={{
                transform: `translateX(-50%) rotateY(${rotation.y + idleSwing}deg) rotateX(${rotation.x}deg)`,
                transformOrigin: "center top",
              }}
            >
              {/* Clip details */}
              <div className="w-16 h-1 bg-zinc-500/50 rounded-full" />
            </div>
          </div>

          {/* 3D Card */}
          <div
            ref={cardRef}
            className={cn(
              "relative mt-[140px] transition-shadow duration-300",
              isDragging ? "shadow-2xl" : "shadow-xl"
            )}
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotation.y + idleSwing}deg) rotateX(${rotation.x}deg)`,
              transformOrigin: "center top",
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* Card Glow */}
            <div
              className={cn(
                "absolute -inset-2 rounded-3xl blur-xl transition-opacity duration-300",
                "bg-gradient-to-br from-primary/50 via-purple-500/50 to-cyan-500/50",
                isDragging ? "opacity-60" : "opacity-30"
              )}
              style={{ transform: "translateZ(-20px)" }}
            />

            {/* Main Card */}
            <div
              className={cn(
                "relative w-[300px] md:w-[340px] h-[440px] md:h-[480px] rounded-2xl",
                "bg-gradient-to-br from-card via-card to-card/90",
                "backdrop-blur-xl border-2 border-white/20 dark:border-white/10",
                "overflow-hidden"
              )}
              style={{
                transformStyle: "preserve-3d",
                boxShadow: isDragging
                  ? "0 50px 100px -20px rgba(0,0,0,0.4), 0 30px 60px -30px rgba(14,165,233,0.3)"
                  : "0 25px 50px -12px rgba(0,0,0,0.25)",
              }}
            >
              {/* Card Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)),transparent_70%)]" />
              </div>

              {/* Top Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-primary via-primary/90 to-purple-600" />

              {/* Drag Handle Indicator */}
              <div 
                className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-white/60"
                style={{ transform: "translateZ(10px)" }}
              >
                <GripVertical className="h-4 w-4" />
                <span className="text-[10px] font-medium">DRAG TO SWING</span>
                <GripVertical className="h-4 w-4" />
              </div>

              {/* Card Content */}
              <div 
                className="relative h-full flex flex-col items-center pt-12 px-6 pb-6"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Profile Photo */}
                <div
                  className="relative mb-4"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-purple-500 opacity-80 blur-sm" />
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src="/hero-rehan.webp"
                      alt="Rehan Maulana"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Online Status */}
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                  </div>
                </div>

                {/* Name */}
                <h3
                  className="text-xl md:text-2xl font-bold text-foreground mb-1 text-center"
                  style={{ transform: "translateZ(30px)" }}
                >
                  Rehan Maulana
                </h3>

                {/* Role Badge */}
                <div
                  className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-3"
                  style={{ transform: "translateZ(25px)" }}
                >
                  <Code2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Web Developer</span>
                </div>

                {/* ID */}
                <div
                  className="font-mono text-xs text-muted-foreground mb-4"
                  style={{ transform: "translateZ(20px)" }}
                >
                 GITHUB : MAULL7
                </div>

                {/* Divider */}
                <div 
                  className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4"
                  style={{ transform: "translateZ(15px)" }}
                />

                {/* Tech Stack */}
                <div
                  className="flex items-center gap-2 mb-4"
                  style={{ transform: "translateZ(35px)" }}
                >
                  {techIcons.map((tech) => (
                    <div
                      key={tech.name}
                      className="w-10 h-10 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      title={tech.name}
                    >
                      <span className="text-xs font-bold" style={{ color: tech.color }}>
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stats Row */}
                <div
                  className="flex items-center justify-center gap-4 text-center mb-4"
                  style={{ transform: "translateZ(25px)" }}
                >
                  <div className="px-3">
                    <p className="text-lg font-bold text-foreground">2+</p>
                    <p className="text-[9px] text-muted-foreground uppercase">Years</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="px-3">
                    <p className="text-lg font-bold text-foreground">20+</p>
                    <p className="text-[9px] text-muted-foreground uppercase">Projects</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="px-3">
                    <p className="text-lg font-bold text-foreground">100%</p>
                    <p className="text-[9px] text-muted-foreground uppercase">Passion</p>
                  </div>
                </div>

                {/* Bottom Info */}
                <div 
                  className="mt-auto flex items-center justify-between w-full text-[10px] text-muted-foreground"
                  style={{ transform: "translateZ(15px)" }}
                >
                  <div className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    <span>Indonesia</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Layers className="h-3 w-3" />
                    <span>Full Stack</span>
                  </div>
                </div>

                {/* QR Code Placeholder */}
              
              </div>

              {/* Shine Effect */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  transform: `translateX(${rotation.y * 2}px)`,
                }}
              />
            </div>

            {/* Card Back Shadow */}
            <div
              className="absolute inset-0 rounded-2xl bg-black/20"
              style={{ transform: "translateZ(-5px)" }}
            />
          </div>
        </div>

        {/* Instructions */}
        <ScrollReveal delay={200}>
          <div className="flex justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
            
              <span>Click & drag to swing</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              
              <span>Release to see physics</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default IdCard3D;

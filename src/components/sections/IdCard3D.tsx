import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { Code2, Globe, Layers, GripVertical } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import MascotImage from "@/components/MascotImage";

const techIcons = [
  { name: "HTML", color: "#E34F26" },
  { name: "PHP", color: "#1572B6" },
  { name: "JS", color: "#F7DF1E" },
  { name: "React", color: "#61DAFB" },
];

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  hue: number;
}

const FloatingParticle = memo(
  ({ delay, duration, size, initialX, initialY }: {
    delay: number;
    duration: number;
    size: number;
    initialX: number;
    initialY: number;
  }) => (
    <div
      className="absolute rounded-full bg-gradient-to-br from-primary/60 to-cyan-400/60 blur-[1px]"
      style={{
        width: size,
        height: size,
        left: `${initialX}%`,
        top: `${initialY}%`,
        animation: `floatParticle ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  )
);
FloatingParticle.displayName = "FloatingParticle";

const SparkleTrail = memo(({ sparkle }: { sparkle: Sparkle }) => (
  <div
    className="fixed pointer-events-none z-50"
    style={{ left: sparkle.x, top: sparkle.y, transform: "translate(-50%, -50%)" }}
  >
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
      <line x1="10" y1="50" x2="90" y2="50" stroke={`url(#sparkleGrad-${sparkle.id})`} strokeWidth="2" />
      <line x1="50" y1="10" x2="50" y2="90" stroke={`url(#sparkleGrad-${sparkle.id})`} strokeWidth="2" />
      <line x1="20" y1="20" x2="80" y2="80" stroke={`url(#sparkleGrad-${sparkle.id})`} strokeWidth="1" opacity="0.6" />
      <line x1="80" y1="20" x2="20" y2="80" stroke={`url(#sparkleGrad-${sparkle.id})`} strokeWidth="1" opacity="0.6" />
    </svg>
  </div>
));
SparkleTrail.displayName = "SparkleTrail";

const IdCard3D = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const lanyardRef = useRef<SVGSVGElement>(null);
  const leftPathRef = useRef<SVGPathElement>(null);
  const rightPathRef = useRef<SVGPathElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  // ponytail: physics state lives in refs and is written to the DOM imperatively.
  // This avoids re-rendering the whole subtree on every animation frame.
  const rotRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const swingRef = useRef(0);
  const draggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const sparkleIdRef = useRef(0);

  const [isDragging, setIsDragging] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        size: 4 + Math.random() * 8,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
      })),
    []
  );

  const createSparkle = useCallback((x: number, y: number) => {
    const newSparkle: Sparkle = {
      id: sparkleIdRef.current++,
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      size: 15 + Math.random() * 25,
      opacity: 0.8 + Math.random() * 0.2,
      hue: 190 + Math.random() * 80,
    };
    setSparkles((prev) => [...prev.slice(-15), newSparkle]);
  }, []);

  // Single rAF loop, writes transforms straight to the DOM. No per-frame React renders.
  useEffect(() => {
    const friction = 0.98;
    const spring = 0.02;

    const applyTransforms = (rx: number, ry: number, swing: number) => {
      const idleSwing = Math.sin(swing) * 3;
      if (cardRef.current) {
        cardRef.current.style.transform = `rotateY(${ry + idleSwing}deg) rotateX(${rx}deg)`;
      }
      if (clipRef.current) {
        clipRef.current.style.transform = `translateX(-50%) rotateY(${ry + idleSwing}deg) rotateX(${rx}deg)`;
      }
      if (lanyardRef.current) {
        lanyardRef.current.style.transform = `translateX(-50%) rotateY(${ry * 0.3 + idleSwing}deg)`;
      }
      if (leftPathRef.current) {
        leftPathRef.current.setAttribute(
          "d",
          `M 50 0 Q ${35 + ry * 0.3} 80, 65 155`
        );
      }
      if (rightPathRef.current) {
        rightPathRef.current.setAttribute(
          "d",
          `M 110 0 Q ${125 + ry * 0.3} 80, 95 155`
        );
      }
      if (shineRef.current) {
        shineRef.current.style.transform = `translateX(${ry * 2}px)`;
      }
    };

    const animate = () => {
      const r = rotRef.current;
      const v = velRef.current;

      if (!draggingRef.current) {
        const newVelX = (v.x - r.x * spring) * friction;
        const newVelY = (v.y - r.y * spring) * friction;
        v.x = newVelX;
        v.y = newVelY;
        r.x += newVelX;
        r.y += newVelY;
      }

      swingRef.current += 0.02;
      applyTransforms(r.x, r.y, swingRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Fade sparkles out (only while any exist).
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

  const updateDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (!draggingRef.current) {
        lastPosRef.current = { x: clientX, y: clientY };
        return;
      }
      const deltaX = clientX - lastPosRef.current.x;
      const deltaY = clientY - lastPosRef.current.y;
      const r = rotRef.current;
      r.x = Math.max(-30, Math.min(30, r.x + deltaY * 0.5));
      r.y = Math.max(-45, Math.min(45, r.y + deltaX * 0.5));
      velRef.current = { x: deltaY * 0.3, y: deltaX * 0.3 };

      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        createSparkle(clientX, clientY);
      }
      lastPosRef.current = { x: clientX, y: clientY };
    },
    [createSparkle]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    draggingRef.current = true;
    setIsDragging(true);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => updateDrag(e.clientX, e.clientY),
    [updateDrag]
  );

  const handleMouseUp = useCallback(() => {
    draggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    draggingRef.current = true;
    setIsDragging(true);
    const touch = e.touches[0];
    lastPosRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      updateDrag(touch.clientX, touch.clientY);
    },
    [updateDrag]
  );

  const handleTouchEnd = useCallback(() => {
    draggingRef.current = false;
    setIsDragging(false);
  }, []);

  return (
    <section id="idcard" className="section-padding relative overflow-hidden">
      {sparkles.map((sparkle) => (
        <SparkleTrail key={sparkle.id} sparkle={sparkle} />
      ))}

      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[80px]" />
      </div>

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
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              Identity
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              Digital <span className="gradient-text">Card</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Drag the card to swing it around!
            </p>
          </div>
        </ScrollReveal>

        <div
          className="relative flex flex-col items-center justify-start min-h-[750px] cursor-grab active:cursor-grabbing select-none"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ perspective: "1200px", touchAction: "none" }}
        >
          <div className="relative">
            <div className="relative z-20 flex flex-col items-center">
              <div className="w-16 h-8 bg-gradient-to-b from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-700 rounded-t-full shadow-lg" />
              <div className="w-10 h-10 border-4 border-zinc-500 dark:border-zinc-600 rounded-full -mt-2 bg-transparent" />
            </div>

            <svg
              ref={lanyardRef}
              className="absolute top-14 left-1/2 -translate-x-1/2 z-10"
              width="160"
              height="160"
              viewBox="0 0 160 160"
            >
              <defs>
                <linearGradient id="lanyardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="50%" stopColor="hsl(187 92% 50%)" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
              </defs>
              <path
                ref={leftPathRef}
                d="M 50 0 Q 35 80, 65 155"
                stroke="url(#lanyardGradient)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                ref={rightPathRef}
                d="M 110 0 Q 125 80, 95 155"
                stroke="url(#lanyardGradient)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            <div
              ref={clipRef}
              className="absolute top-[165px] left-1/2 -translate-x-1/2 z-30 w-24 h-8 bg-gradient-to-b from-zinc-300 to-zinc-400 dark:from-zinc-600 dark:to-zinc-700 rounded-md shadow-md flex items-center justify-center"
              style={{ transformOrigin: "center top" }}
            >
              <div className="w-16 h-1 bg-zinc-500/50 rounded-full" />
            </div>
          </div>

          <div
            ref={cardRef}
            className={cn(
              "relative mt-[140px] transition-shadow duration-300",
              isDragging ? "shadow-2xl" : "shadow-xl"
            )}
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateY(0deg) rotateX(0deg)",
              transformOrigin: "center top",
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div
              className={cn(
                "absolute -inset-2 rounded-3xl blur-xl transition-opacity duration-300",
                "bg-gradient-to-br from-primary/50 via-cyan-400/50 to-teal-500/50",
                isDragging ? "opacity-60" : "opacity-30"
              )}
              style={{ transform: "translateZ(-20px)" }}
            />

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
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)),transparent_70%)]" />
              </div>

              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-primary via-primary/90 to-cyan-500" />

              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-white/60"
                style={{ transform: "translateZ(10px)" }}
              >
                <GripVertical className="h-4 w-4" />
                <span className="text-[10px] font-medium">DRAG TO SWING</span>
                <GripVertical className="h-4 w-4" />
              </div>

              <div
                className="relative h-full flex flex-col items-center pt-12 px-6 pb-6"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="relative mb-4"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-cyan-400 opacity-80 blur-sm" />
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <MascotImage alt="Rehan clay mascot profile" className="h-full w-full" />
                  </div>
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                  </div>
                </div>

                <h3
                  className="text-xl md:text-2xl font-bold text-foreground mb-1 text-center"
                  style={{ transform: "translateZ(30px)" }}
                >
                  Rehan Maulana
                </h3>

                <div
                  className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-3"
                  style={{ transform: "translateZ(25px)" }}
                >
                  <Code2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Web Developer</span>
                </div>

                <div
                  className="font-mono text-xs text-muted-foreground mb-4"
                  style={{ transform: "translateZ(20px)" }}
                >
                  GITHUB : MAULL7
                </div>

                <div
                  className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4"
                  style={{ transform: "translateZ(15px)" }}
                />

                <div
                  className="flex items-center justify-center gap-3 mb-5"
                  style={{ transform: "translateZ(35px)" }}
                >
                  {techIcons.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl bg-secondary/60 border border-border/40 shadow-md hover:scale-110 transition-transform"
                      title={tech.name}
                    >
                      <span className="text-[11px] font-bold leading-none" style={{ color: tech.color }}>
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>

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
              </div>

              <div
                ref={shineRef}
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ transform: "translateX(0px)" }}
              />
            </div>

            <div
              className="absolute inset-0 rounded-2xl bg-black/20"
              style={{ transform: "translateZ(-5px)" }}
            />
          </div>
        </div>

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

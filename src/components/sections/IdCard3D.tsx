import { useState, useRef, useEffect } from "react";
import { Code2, Globe, Layers, GripVertical } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const techIcons = [
  { name: "HTML", color: "#E34F26" },
  { name: "CSS", color: "#1572B6" },
  { name: "JS", color: "#F7DF1E" },
  { name: "React", color: "#61DAFB" },
];

const IdCard3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [swingAngle, setSwingAngle] = useState(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

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

    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Calculate idle swing when not dragging
  const idleSwing = isDragging ? 0 : Math.sin(swingAngle) * 3;

  return (
    <section id="idcard" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              Identity
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              Digital <span className="gradient-text">ID Card</span>
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
          className="relative flex flex-col items-center justify-start min-h-[600px] cursor-grab active:cursor-grabbing select-none"
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

            {/* Lanyard String */}
            <svg
              className="absolute top-14 left-1/2 -translate-x-1/2 z-10"
              width="120"
              height="80"
              viewBox="0 0 120 80"
              style={{
                transform: `translateX(-50%) rotateY(${rotation.y * 0.3 + idleSwing}deg)`,
              }}
            >
              <defs>
                <linearGradient id="lanyardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(262, 83%, 58%)" />
                </linearGradient>
              </defs>
              {/* Left string */}
              <path
                d={`M 35 0 Q ${30 + rotation.y * 0.2} 40, 45 75`}
                stroke="url(#lanyardGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              {/* Right string */}
              <path
                d={`M 85 0 Q ${90 + rotation.y * 0.2} 40, 75 75`}
                stroke="url(#lanyardGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* Card Clip */}
            <div
              className="absolute top-[85px] left-1/2 -translate-x-1/2 z-30 w-20 h-6 bg-gradient-to-b from-zinc-300 to-zinc-400 dark:from-zinc-600 dark:to-zinc-700 rounded-sm shadow-md"
              style={{
                transform: `translateX(-50%) rotateY(${rotation.y + idleSwing}deg) rotateX(${rotation.x}deg)`,
                transformOrigin: "center top",
              }}
            />
          </div>

          {/* 3D Card */}
          <div
            ref={cardRef}
            className={cn(
              "relative mt-[60px] transition-shadow duration-300",
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
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
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
                  ID: DEV-2024-RM001
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
                    <p className="text-lg font-bold text-foreground">3+</p>
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
                <div 
                  className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-lg p-1 shadow-lg"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <div className="w-full h-full bg-[repeating-conic-gradient(#000_0%_25%,#fff_0%_50%)] bg-[length:25%_25%] rounded" />
                </div>
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
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                👆
              </span>
              <span>Click & drag to swing</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                ✨
              </span>
              <span>Release to see physics</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default IdCard3D;

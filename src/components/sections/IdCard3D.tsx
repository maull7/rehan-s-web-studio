import { useState, useRef, useEffect } from "react";
import { Code2, Palette, Globe, Layers } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const techIcons = [
  { name: "HTML", color: "#E34F26" },
  { name: "CSS", color: "#1572B6" },
  { name: "JS", color: "#F7DF1E" },
  { name: "React", color: "#61DAFB" },
];

const IdCard3D = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [autoRotate, setAutoRotate] = useState({ x: 0, y: 0 });

  // Auto-rotate animation
  useEffect(() => {
    if (isHovering) return;

    let animationId: number;
    let angle = 0;

    const animate = () => {
      angle += 0.5;
      setAutoRotate({
        x: Math.sin(angle * 0.02) * 10,
        y: Math.cos(angle * 0.01) * 15,
      });
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isHovering]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -15;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 15;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  const currentRotation = isHovering ? rotation : autoRotate;

  return (
    <section id="idcard" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-[80px] animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              Identity
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              Digital <span className="gradient-text">ID Card</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Interactive 3D card showcasing my identity as a developer
            </p>
          </div>
        </ScrollReveal>

        {/* 3D Card Container */}
        <div className="flex justify-center items-center min-h-[400px]" style={{ perspective: "1000px" }}>
          <div
            ref={cardRef}
            className={cn(
              "relative cursor-pointer transition-all duration-300 ease-out",
              "animate-float"
            )}
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg)`,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Card Glow Effect */}
            <div
              className={cn(
                "absolute -inset-1 rounded-3xl opacity-50 blur-xl transition-opacity duration-500",
                "bg-gradient-to-r from-primary via-purple-500 to-cyan-500",
                isHovering ? "opacity-80" : "opacity-40"
              )}
              style={{ transform: "translateZ(-10px)" }}
            />

            {/* Main Card */}
            <div
              className={cn(
                "relative w-[320px] md:w-[380px] h-[480px] md:h-[520px] rounded-3xl",
                "bg-gradient-to-br from-card/90 via-card/80 to-card/70",
                "backdrop-blur-xl border border-white/20 dark:border-white/10",
                "shadow-2xl transition-all duration-300",
                isHovering && "shadow-[0_30px_60px_-15px_rgba(14,165,233,0.4)]"
              )}
              style={{ 
                transformStyle: "preserve-3d",
                transform: "translateZ(30px)" 
              }}
            >
              {/* Card Inner Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />

              {/* Holographic Strip */}
              <div 
                className="absolute top-8 left-0 right-0 h-12 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                style={{ transform: "translateZ(5px)" }}
              />

              {/* Card Content */}
              <div 
                className="relative h-full flex flex-col items-center justify-center p-8"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Profile Photo */}
                <div
                  className="relative mb-6"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary to-purple-500 opacity-70 blur-md animate-pulse" />
                  <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                      alt="Rehan Maulana"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Status Badge */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 rounded-full flex items-center gap-1 shadow-lg">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-[10px] text-white font-bold">ACTIVE</span>
                  </div>
                </div>

                {/* Name */}
                <h3
                  className="text-2xl md:text-3xl font-bold text-foreground mb-1 text-center"
                  style={{ transform: "translateZ(40px)" }}
                >
                  Rehan Maulana
                </h3>

                {/* Role */}
                <div
                  className="flex items-center gap-2 mb-3"
                  style={{ transform: "translateZ(35px)" }}
                >
                  <Code2 className="h-4 w-4 text-primary" />
                  <span className="text-primary font-semibold">Web Developer</span>
                </div>

                {/* ID Number */}
                <div
                  className="px-4 py-1.5 bg-muted/50 rounded-full mb-6"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <span className="text-xs font-mono text-muted-foreground">
                    ID: DEV-2024-0127
                  </span>
                </div>

                {/* Divider */}
                <div 
                  className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6"
                  style={{ transform: "translateZ(25px)" }}
                />

                {/* Tech Stack Icons */}
                <div
                  className="flex items-center gap-3 mb-6"
                  style={{ transform: "translateZ(45px)" }}
                >
                  {techIcons.map((tech, index) => (
                    <div
                      key={tech.name}
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        "bg-white/10 dark:bg-white/5 backdrop-blur-sm",
                        "border border-white/20 shadow-lg",
                        "transition-all duration-300 hover:scale-110 hover:-translate-y-1",
                        "group cursor-pointer"
                      )}
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                      }}
                      title={tech.name}
                    >
                      <span 
                        className="text-sm font-bold group-hover:scale-110 transition-transform"
                        style={{ color: tech.color }}
                      >
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div
                  className="flex items-center gap-6 text-center"
                  style={{ transform: "translateZ(35px)" }}
                >
                  <div>
                    <p className="text-2xl font-bold text-foreground">3+</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Years</p>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">20+</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Projects</p>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">100%</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Passion</p>
                  </div>
                </div>

                {/* Bottom Decoration */}
                <div 
                  className="absolute bottom-6 left-8 right-8 flex items-center justify-between"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">Indonesia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">Full Stack</span>
                  </div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/30 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/30 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
              </div>
            </div>

            {/* Card Reflection */}
            <div
              className="absolute top-full left-4 right-4 h-20 rounded-b-3xl opacity-20 blur-sm"
              style={{
                background: "linear-gradient(to bottom, hsl(var(--primary) / 0.3), transparent)",
                transform: "rotateX(180deg) translateZ(-10px)",
              }}
            />
          </div>
        </div>

        {/* Interaction Hint */}
        <ScrollReveal delay={300}>
          <p className="text-center text-sm text-muted-foreground mt-8">
            <span className="inline-flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Move your mouse over the card to interact
            </span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default IdCard3D;

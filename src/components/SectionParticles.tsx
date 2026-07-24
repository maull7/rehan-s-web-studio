import { useMemo } from "react";

interface ParticleProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
}

const SectionParticles = ({
  count = 20,
  colors = ["primary", "cyan-400"],
  minSize = 3,
  maxSize = 8
}: ParticleProps) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: minSize + Math.random() * (maxSize - minSize),
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [count, colors, minSize, maxSize]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full blur-[1px]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `floatParticle ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            background:
              particle.color === "primary"
                ? "hsl(var(--primary) / 0.5)"
                : "hsl(187 92% 50% / 0.5)",
          }}
        />
      ))}
    </div>
  );
};

export default SectionParticles;
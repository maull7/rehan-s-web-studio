import { Code2, Palette, Rocket, Users, Sparkles, Zap } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionParticles from "@/components/SectionParticles";
import { useState } from "react";

const techStack = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#E34F26" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "#1572B6" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178C6" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#FFFFFF" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", color: "#FFFFFF" },
];

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and well-documented code",
  },
  {
    icon: Palette,
    title: "Modern Design",
    description: "Creating visually appealing and user-friendly interfaces",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Building fast, optimized, and responsive applications",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively in teams with agile methodologies",
  },
];

const About = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section id="about" className="section-padding bg-card/30 relative overflow-hidden">
      {/* Floating Particles */}
      <SectionParticles count={25} />

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              Who I <span className="gradient-text">Am</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <ScrollReveal animation="fade-left" delay={100}>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hi! I'm <span className="text-foreground font-semibold">Rehan Maulana</span>, 
                a passionate Web Developer based in Indonesia. I specialize in building 
                modern web applications using cutting-edge technologies like React, Next.js, 
                and Node.js.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a strong foundation in both frontend and backend development, I create 
                seamless digital experiences that are not only visually stunning but also 
                highly performant and user-friendly.
              </p>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {highlights.map((item, index) => (
                  <ScrollReveal key={item.title} animation="zoom" delay={200 + index * 100}>
                    <div className="group glass-card p-4 hover-lift h-full relative overflow-hidden">
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-purple-500/0 group-hover:from-primary/10 group-hover:to-purple-500/10 transition-all duration-500" />
                      <item.icon className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tech Stack - Enhanced */}
          <ScrollReveal animation="fade-right" delay={200}>
            <div className="glass-card p-8 relative overflow-hidden">
              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-primary via-purple-500 to-cyan-500 opacity-50">
                <div className="absolute inset-0 rounded-2xl bg-card" />
              </div>

              {/* Sparkle decorations */}
              <div className="absolute top-4 right-4 text-primary/30 animate-pulse">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="absolute bottom-4 left-4 text-purple-500/30 animate-pulse" style={{ animationDelay: "1s" }}>
                <Zap className="h-5 w-5" />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2 text-center flex items-center justify-center gap-2">
                  <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    Tech Stack
                  </span>
                </h3>
                <p className="text-xs text-muted-foreground text-center mb-6">
                  Technologies I work with
                </p>

                <div className="grid grid-cols-5 gap-3">
                  {techStack.map((tech, index) => (
                    <ScrollReveal key={tech.name} animation="zoom" delay={300 + index * 50}>
                      <div 
                        className="group relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all cursor-pointer"
                        onMouseEnter={() => setHoveredTech(tech.name)}
                        onMouseLeave={() => setHoveredTech(null)}
                        style={{
                          background: hoveredTech === tech.name 
                            ? `${tech.color}15` 
                            : "transparent",
                          boxShadow: hoveredTech === tech.name 
                            ? `0 0 20px ${tech.color}30, inset 0 0 20px ${tech.color}10` 
                            : "none",
                        }}
                      >
                        {/* Glow ring on hover */}
                        <div 
                          className="absolute inset-0 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                          style={{
                            border: `1px solid ${tech.color}50`,
                          }}
                        />
                        
                        {/* Icon container with pulse effect */}
                        <div className="relative">
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-10 h-10 group-hover:scale-125 transition-all duration-300 dark:invert-0"
                            loading="lazy"
                          />
                          {/* Floating sparkle on hover */}
                          {hoveredTech === tech.name && (
                            <div 
                              className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping"
                              style={{ background: tech.color }}
                            />
                          )}
                        </div>
                        
                        <span 
                          className="text-[10px] text-center transition-all duration-300 font-medium"
                          style={{
                            color: hoveredTech === tech.name ? tech.color : undefined,
                          }}
                        >
                          {tech.name}
                        </span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Animated tech orbit decoration */}
                <div className="mt-6 flex justify-center">
                  <div className="relative w-32 h-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    </div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-[orbitLeft_3s_ease-in-out_infinite]" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full animate-[orbitRight_3s_ease-in-out_infinite]" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;

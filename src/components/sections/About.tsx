import { Code2, Palette, Rocket, Users } from "lucide-react";

const techStack = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
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
  return (
    <section id="about" className="section-padding bg-card/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            Who I <span className="gradient-text">Am</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
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
              highly performant and user-friendly. I believe in writing clean, maintainable 
              code and staying up-to-date with the latest industry trends.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing 
              to open-source projects, or learning new skills to enhance my development toolkit.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="glass-card p-4 hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Tech Stack
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-primary/10 transition-all cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-10 h-10 group-hover:scale-110 transition-transform dark:invert-0"
                    loading="lazy"
                  />
                  <span className="text-[10px] text-muted-foreground text-center group-hover:text-foreground transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

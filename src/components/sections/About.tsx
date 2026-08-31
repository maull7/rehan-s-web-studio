import { Code2, Palette, Rocket, Users, Sparkles, Award, GraduationCap, ExternalLink, Calendar } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import MascotImage from "@/components/MascotImage";
import ClayIcon, { type ClayIconName } from "@/components/ClayIcon";

const techStack = [
  { name: "HTML5", icon: "code" as ClayIconName, color: "#E34F26" }, { name: "CSS3", icon: "sparkle" as ClayIconName, color: "#1572B6" },
  { name: "JavaScript", icon: "code" as ClayIconName, color: "#F7DF1E" }, { name: "TypeScript", icon: "code" as ClayIconName, color: "#3178C6" },
  { name: "React", icon: "sparkle" as ClayIconName, color: "#61DAFB" }, { name: "Next.js", icon: "terminal" as ClayIconName, color: "#FFFFFF" },
  { name: "Node.js", icon: "rocket" as ClayIconName, color: "#339933" }, { name: "Tailwind", icon: "toolbox" as ClayIconName, color: "#06B6D4" },
  { name: "Git", icon: "copy" as ClayIconName, color: "#F05032" }, { name: "GitHub", icon: "code" as ClayIconName, color: "#FFFFFF" },
  { name: "Laravel", icon: "folder" as ClayIconName, color: "#F05032" }, { name: "PHP", icon: "code" as ClayIconName, color: "#06B6D4" },
  { name: "Svelte", icon: "sparkle" as ClayIconName, color: "#F05032" },
];

const highlights = [
  { icon: Code2, title: "Clean Code", description: "Writing maintainable, scalable, and well-documented code" },
  { icon: Palette, title: "Modern Design", description: "Creating visually appealing and user-friendly interfaces" },
  { icon: Rocket, title: "Performance", description: "Building fast, optimized, and responsive applications" },
  { icon: Users, title: "Collaboration", description: "Working effectively in teams with agile methodologies" },
];

const education = [
  {
    id: 1,
    degree: "Sekolah Dasar (SD)",
    institution: "SDN 1 Wanaherang",
    period: "2014 - 2020",
    description: "Mempelajari dasar-dasar pendidikan umum seperti membaca, menulis, berhitung, serta pengenalan teknologi.",
  },
  {
    id: 2,
    degree: "Sekolah Menengah Pertama (SMP)",
    institution: "SMPN 1 Gunung Putri",
    period: "2020 - 2023",
    description: "Mengembangkan pengetahuan akademik dan mulai mengenal dasar-dasar teknologi informasi.",
  },
  {
    id: 3,
    degree: "Sekolah Menengah Kejuruan (SMK)",
    institution: "SMKS Madya Depok",
    period: "2023 - 2026",
    description: "Fokus pada Rekayasa Perangkat Lunak, pengembangan web, dan pemrograman dasar hingga menengah.",
  },
];

const certifications = [
  {
    id: 1,
    title: "Web Developer Intern",
    issuer: "Intern",
    date: "2025",
    credentialUrl: "/sertif-rehan.pdf",
    skills: ["Svelte", "Next", "Laravel", "Database", "Project"],
  },
];

const About = () => {
  const { t } = useLanguage();
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section id="about" className="section-padding relative overflow-hidden bg-purple-50/80 dark:bg-card/30">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              {t('about.subtitle')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              {t('about.title')} <span className="gradient-text">{t('about.highlight')}</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-20 grid items-center gap-8 rounded-[2rem] border border-purple-200/70 bg-white/55 p-6 shadow-xl shadow-purple-900/5 dark:border-border dark:bg-card/60 md:grid-cols-[220px_1fr] md:p-8">
            <MascotImage alt="Rehan clay mascot with a coffee cup" className="mx-auto h-48 w-48" />
            <div>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{t("about.newBio")}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[["15+", "about.statProjects"], ["3+", "about.statYears"], ["10+", "about.statTech"], ["999+", "about.statCoffee"]].map(([value, label]) => <div key={label} className="rounded-2xl bg-secondary/70 p-4"><strong className="block text-2xl font-black text-primary">{value}</strong><span className="text-xs font-medium text-muted-foreground">{t(label)}</span></div>)}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bio + Tech Stack */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Bio + Highlights */}
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

              <div className="grid grid-cols-2 gap-4 pt-4">
                {highlights.map((item, index) => (
                  <ScrollReveal key={item.title} animation="zoom" delay={200 + index * 100}>
                    <div className="group glass-card p-4 hover-lift h-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-cyan-400/0 group-hover:from-primary/10 group-hover:to-cyan-400/10 transition-all duration-500" />
                      <ClayIcon name={(["code", "sparkle", "rocket", "toolbox"] as const)[index]} tone={(["purple", "pink", "blue", "green"] as const)[index]} className="mb-2 h-12 w-12 transition-transform group-hover:scale-110" />
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tech Stack Card — rapi */}
          <ScrollReveal animation="fade-right" delay={200}>
            <div className="glass-card p-6 md:p-10 relative overflow-hidden">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-1">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                    {t('about.techStack')}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground">Technologies I work with</p>
              </div>

              {/* Grid — setiap icon dalam container rapi */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="group flex flex-col items-center gap-2 px-3 py-3 rounded-xl transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                    style={{
                      background: hoveredTech === tech.name ? `${tech.color}15` : "transparent",
                    }}
                  >
                    {/* Icon container */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: hoveredTech === tech.name
                          ? `${tech.color}22`
                          : "hsl(var(--muted) / 0.45)",
                        boxShadow: hoveredTech === tech.name
                          ? `0 0 18px ${tech.color}35`
                          : "none",
                      }}
                    >
                      <ClayIcon name={tech.icon} tone={hoveredTech === tech.name ? "pink" : "purple"} className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span
                      className="text-[11px] text-center font-medium transition-colors duration-300"
                      style={{ color: hoveredTech === tech.name ? tech.color : undefined }}
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Education + Certifications (2 col) */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Education */}
          <div>
            <ScrollReveal animation="fade-right">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                {t('certifications.education')}
              </h3>
            </ScrollReveal>

            <div className="space-y-3">
              {education.map((edu, index) => (
                <ScrollReveal key={edu.id} animation="fade-right" delay={100 + index * 100}>
                  <div className="glass-card p-5 hover-lift group">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {edu.degree}
                        </h4>
                        <p className="text-sm text-primary font-medium">{edu.institution}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{edu.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Certifications — rapikan card */}
          <div>
            <ScrollReveal animation="fade-left">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-400/10">
                  <Award className="h-6 w-6 text-cyan-400" />
                </div>
                {t('certifications.certificates')}
              </h3>
            </ScrollReveal>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <ScrollReveal key={cert.id} animation="fade-left" delay={100 + index * 100}>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="glass-card p-5 hover-lift group relative overflow-hidden">
                      {/* Subtle top accent bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-400 opacity-60" />

                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Award className="h-6 w-6 text-cyan-400" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                              {cert.title}
                            </h4>
                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1.5">
                            <span className="font-medium text-primary/80">{cert.issuer}</span>
                            <span className="text-muted-foreground/50">•</span>
                            <span>{cert.date}</span>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {cert.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 text-[10px] font-medium bg-secondary text-secondary-foreground rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

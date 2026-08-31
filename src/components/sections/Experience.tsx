import { Calendar, MapPin, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import MascotImage from "@/components/MascotImage";
import ClayIcon from "@/components/ClayIcon";

const experiences = [
  {
    id: 1,
    position: "Web Developer Intern",
    company: "PT Bonet Utama",
    location: "Indonesia",
    duration: "4 Months",
    period: "2024",
    description:
      "Contributed to the development of internal web applications and gained hands-on experience with modern web technologies.",
    responsibilities: [
      "Assisted in developing and maintaining internal company websites",
      "Integrated RESTful APIs for dynamic data fetching",
      "Collaborated with the development team using Git for version control",
      "Participated in code reviews and team meetings",
    ],
    technologies: ["Next", "Tailwind CSS", "REST API", "Git", "Svelte", "Laravel"],
  },
];

const Experience = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              {t('experience.subtitle')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              {t('experience.title')} <span className="gradient-text">{t('experience.highlight')}</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.id} animation="fade-right" delay={index * 150}>
              <div className="relative pl-12">
                {/* Timeline line + dot */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/30" />

                {/* Card */}
                <div className="glass-card relative p-6 md:p-8 hover-lift group">
                  <MascotImage alt="Rehan clay mascot" className="absolute right-5 top-5 h-16 w-16 opacity-80" />
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-primary font-semibold">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full self-start">
                      <ClayIcon name="toolbox" tone="purple" className="h-5 w-5" />
                      <span className="text-xs font-medium text-primary">Intern</span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.duration} • {exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

                  {/* Responsibilities */}
                  <div className="space-y-2.5 mb-5">
                    {exp.responsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{resp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

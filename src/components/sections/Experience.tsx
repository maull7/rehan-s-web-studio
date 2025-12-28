import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionParticles from "@/components/SectionParticles";

const experiences = [
  {
    id: 1,
    position: "Web Developer Intern",
    company: "PT Bonet",
    location: "Indonesia",
    duration: "4 Months",
    period: "2024",
    description:
      "Contributed to the development of internal web applications and gained hands-on experience with modern web technologies.",
    responsibilities: [
      "Assisted in developing and maintaining internal company websites",
      "Implemented responsive UI components based on Figma designs",
      "Integrated RESTful APIs for dynamic data fetching",
      "Collaborated with the development team using Git for version control",
      "Participated in code reviews and team meetings",
    ],
    technologies: ["React", "Tailwind CSS", "REST API", "Git", "Figma"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Floating Particles */}
      <SectionParticles count={20} />

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              Experience
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              Work <span className="gradient-text">History</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.id} animation="fade-up" delay={index * 150}>
              <div className="relative pl-8 md:pl-0">
                {/* Timeline Line */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary to-purple-500" />

                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />

                {/* Content Card */}
                <div
                  className={`md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div className="glass-card p-6 md:p-8 hover-lift">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {exp.position}
                        </h3>
                        <p className="text-primary font-semibold">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full">
                        <Briefcase className="h-3 w-3 text-primary" />
                        <span className="text-xs font-medium text-primary">
                          Intern
                        </span>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{exp.duration} • {exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                    {/* Responsibilities */}
                    <div className="space-y-2 mb-4">
                      {exp.responsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {resp}
                          </span>
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
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

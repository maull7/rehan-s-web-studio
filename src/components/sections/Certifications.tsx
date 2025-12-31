import { Award, GraduationCap, ExternalLink, Calendar } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionParticles from "@/components/SectionParticles";
import { useLanguage } from "@/contexts/LanguageContext";

const certifications = [
  {
    id: 1,
    title: "Web Developer Intern",
    issuer: "Intern",
    date: "2025",
    credentialUrl: "/sertif-rehan.pdf",
    image: "/sertif-rehan.pdf",
    skills: ["Svelte", "Next", "Laravel","Database","Project"],
  }
];
const education = [
  {
    id: 1,
    degree: "Sekolah Dasar (SD)",
    institution: "SDN 1 Wanaherang",
    period: "2014 - 2020",
    description: "Mempelajari dasar-dasar pendidikan umum seperti membaca, menulis, berhitung, serta pengenalan teknologi.",
    gpa: null,
  },
  {
    id: 2,
    degree: "Sekolah Menengah Pertama (SMP)",
    institution: "SMPN 1 Gunung Putri",
    period: "2020 - 2023",
    description: "Mengembangkan pengetahuan akademik dan mulai mengenal dasar-dasar teknologi informasi.",
    gpa: null,
  },
  {
    id: 3,
    degree: "Sekolah Menengah Kejuruan (SMK)",
    institution: "SMKS Madya Depok",
    period: "2023 - 2026",
    description: "Fokus pada Rekayasa Perangkat Lunak, pengembangan web, dan pemrograman dasar hingga menengah.",
    gpa: null,
  },
];


const Certifications = () => {
  const { t } = useLanguage();

  return (
    <section id="certifications" className="section-padding relative overflow-hidden">
      {/* Floating Particles */}
      <SectionParticles count={20} />

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              {t('certifications.subtitle')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              {t('certifications.title')} <span className="gradient-text">{t('certifications.highlight')}</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <ScrollReveal animation="fade-left">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                {t('certifications.education')}
              </h3>
            </ScrollReveal>

            {education.map((edu, index) => (
              <ScrollReveal key={edu.id} animation="fade-left" delay={100 + index * 100}>
                <div className="glass-card p-6 hover-lift group mb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-primary font-medium">{edu.institution}</p>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {edu.gpa ?? ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{edu.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{edu.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <ScrollReveal animation="fade-right">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Award className="h-6 w-6 text-yellow-500" />
                </div>
                {t('certifications.certificates')}
              </h3>
            </ScrollReveal>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <ScrollReveal key={cert.id} animation="fade-right" delay={100 + index * 100}>
                  <div className="glass-card p-4 hover-lift group cursor-pointer">
                    <div className="flex items-start gap-4">
                      {/* Certificate Icon/Image */}
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                          <Award className="h-7 w-7 text-yellow-500" />
                        </div>
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-xl bg-yellow-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {cert.title}
                          </h4>
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span className="font-medium text-primary/80">{cert.issuer}</span>
                          <span>•</span>
                          <span>{cert.date}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
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
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;

import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import SectionParticles from "@/components/SectionParticles";
export const projects = [
  {
    id: "cat-sebasa",
    title: "Cat Sebasa",
    shortDescription:
      "A web-based learning platform for students with structured materials and practice exercises.",
    fullDescription:
      "Cat Sebasa is an educational web platform designed for students to access learning materials and practice exercises online. The system helps schools manage digital learning content efficiently and allows students to learn independently through structured modules.",
    problem:
      "Schools often struggle to provide centralized and accessible learning materials for students outside the classroom.",
    solution:
      "Developed a web-based learning platform where students can access materials, exercises, and learning resources anytime. The system is simple, structured, and easy to use for both students and teachers.",
    thumbnail:
      "/cat-sebasa.png",
    screenshots: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    liveUrl: "https://cat-sebasa.id",
    githubUrl: "https://github.com/maull7",
    featured: true,
  },
  {
    id: "silapa-app",
    title: "Silapa App",
    shortDescription:
      "A document submission and approval system from application to fund disbursement.",
    fullDescription:
      "Silapa App is a web application designed to manage document submissions, verification, and approval processes until fund disbursement. The system improves transparency and efficiency in administrative workflows.",
    problem:
      "Manual document submission processes are slow, error-prone, and difficult to track.",
    solution:
      "Built a digital workflow system that allows users to submit documents online, track approval status, and ensure a transparent process until completion.",
    thumbnail:
      "/silapa.png",
    screenshots: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    liveUrl: "https://silapa.id",
    githubUrl: "https://github.com/maull7/silapa",
    featured: true,
  },
  {
    id: "sipedu-app",
    title: "Sipedu Education",
    shortDescription:
      "An education management system for inputting grades and generating certificates.",
    fullDescription:
      "Sipedu is an education system used to manage student grades, process academic data, and generate official certificates automatically based on stored results.",
    problem:
      "Manual grade processing and certificate creation are time-consuming and prone to errors.",
    solution:
      "Developed a system that allows teachers to input grades digitally and automatically generate structured certificates.",
    thumbnail:
      "/sipedu.png",
    screenshots: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    liveUrl: "https://sipedu-sebasa.id",
    githubUrl: "https://github.com/maull7/sipedu-app",
    featured: false,
  },
  // {
  //   id: "cbt-app",
  //   title: "CBT Madani",
  //   shortDescription:
  //     "A computer-based testing (CBT) system for school examinations.",
  //   fullDescription:
  //     "CBT Madani is a web-based examination system used by SMK Madani to conduct online exams. It supports multiple exam types, time limits, and automatic scoring.",
  //   problem:
  //     "Traditional paper-based exams require more time, cost, and manual correction.",
  //   solution:
  //     "Built a CBT system that allows schools to conduct exams digitally with automatic grading and real-time monitoring.",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
  //   screenshots: [
  //     "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
  //   ],
  //   technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Tailwind CSS"],
  //   liveUrl: null,
  //   githubUrl: "https://github.com/maull7/cbt-app",
  //   featured: false,
  // },
  {
    id: "absen-bimba",
    title: "Absensi Bimba",
    shortDescription:
      "An employee attendance system using barcode scanning.",
    fullDescription:
      "Absensi Bimba is an attendance system for Bimba employees that uses barcode scanning to record check-in and check-out times accurately.",
    problem:
      "Manual attendance systems are inefficient and vulnerable to manipulation.",
    solution:
      "Developed a barcode-based attendance system to ensure fast, accurate, and secure employee attendance tracking.",
    thumbnail:
      "/absen-karyawan.png",
    screenshots: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
    ],
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    liveUrl: "https://absenbimba-kahuripan.site",
    githubUrl: null,
    featured: false,
  },
  // {
  //   id: "kass-app",
  //   title: "Kass Application",
  //   shortDescription:
  //     "A class cash management application with penalty tracking.",
  //   fullDescription:
  //     "Kass Application is a class cash management system used to record payments, expenses, and fines for late contributions.",
  //   problem:
  //     "Class cash records are often managed manually and can lead to data inconsistencies.",
  //   solution:
  //     "Built a simple and structured cash management system to track payments, expenses, and penalties transparently.",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
  //   screenshots: [
  //     "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
  //   ],
  //   technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
  //   liveUrl: null,
  //   githubUrl: "https://github.com/maull7/kass",
  //   featured: false,
  // },
  {
    id: "gallery-react",
    title: "Gallery React",
    shortDescription:
      "An image gallery application consuming public APIs.",
    fullDescription:
      "Gallery React is a frontend application that displays image collections fetched from an external API with a responsive and modern UI.",
    problem:
      "Users need a simple and fast way to browse image collections from external sources.",
    solution:
      "Developed a React-based gallery app that consumes APIs and displays images dynamically.",
    thumbnail:
      "/gallery.png",
    screenshots: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
    ],
    technologies: ["React", "API", "Tailwind CSS"],
    liveUrl: "https://galery-react-one.vercel.app/",
    githubUrl: "https://github.com/maull7/galery-react",
    featured: false,
  },
  // {
  //   id: "blogs-react",
  //   title: "Blogs React",
  //   shortDescription:
  //     "A full-stack blog application with admin panel.",
  //   fullDescription:
  //     "Blogs React is a full-stack blogging platform built using React for the frontend and Express.js for the backend. It includes an admin panel for managing posts and content.",
  //   problem:
  //     "Managing blog content manually without an admin system is inefficient.",
  //   solution:
  //     "Built a blog system with authentication, admin dashboard, and REST API for content management.",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
  //   screenshots: [
  //     "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
  //   ],
  //   technologies: ["React", "Express JS", "MySQL", "API", "Tailwind CSS"],
  //   liveUrl: null,
  //   githubUrl: "https://github.com/maull7/blogs-react",
  //   featured: false,
  // },
];


const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-card/30 relative overflow-hidden">
      {/* Floating Particles */}
      <SectionParticles count={25} />

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              Projects
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              Featured <span className="gradient-text">Work</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Here are some of the projects I've worked on. Each project represents
              a unique challenge and learning experience.
            </p>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} animation="zoom" delay={index * 100}>
              <div className="group glass-card overflow-hidden hover-lift h-full">
                {/* Thumbnail */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-background/90 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-background/90 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full group/btn hover:bg-primary hover:text-primary-foreground"
                    asChild
                  >
                    <Link to={`/project/${project.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

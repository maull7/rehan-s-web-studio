import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import SectionParticles from "@/components/SectionParticles";

export const projects = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    shortDescription:
      "A full-featured e-commerce platform with cart, checkout, and payment integration.",
    fullDescription:
      "A comprehensive e-commerce solution built from scratch, featuring a modern UI, shopping cart functionality, secure checkout process, and integrated payment gateway. The platform includes admin dashboard for inventory management and order tracking.",
    problem:
      "Small businesses often struggle with expensive e-commerce solutions that don't fit their specific needs. They need a customizable, cost-effective platform that can scale with their growth.",
    solution:
      "Built a modular e-commerce platform using React and Node.js that allows businesses to easily customize their storefront, manage inventory, and process payments securely. The system is designed to be scalable and easy to maintain.",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/maull7",
    featured: true,
  },
  {
    id: "task-management",
    title: "Task Management App",
    shortDescription:
      "A collaborative task management tool with real-time updates and team features.",
    fullDescription:
      "A powerful task management application designed for teams, featuring real-time collaboration, task assignments, progress tracking, and team communication tools. Built with modern web technologies for optimal performance.",
    problem:
      "Remote teams often face challenges in coordinating tasks and maintaining visibility on project progress. Existing tools are often complex and overwhelming.",
    solution:
      "Created an intuitive task management system with real-time updates, drag-and-drop functionality, and clear visual indicators for task status. The app focuses on simplicity while providing powerful features for team collaboration.",
    thumbnail:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop",
    ],
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.io"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/maull7",
    featured: true,
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio",
    shortDescription:
      "A modern, responsive portfolio website showcasing projects and skills.",
    fullDescription:
      "A beautifully designed portfolio website featuring smooth animations, dark/light mode, and responsive design. Built to showcase projects, skills, and professional experience in an engaging way.",
    problem:
      "Developers need a professional online presence to showcase their work and attract potential employers or clients.",
    solution:
      "Designed and developed a modern portfolio website with attention to detail, featuring glassmorphism effects, smooth animations, and optimal performance. The site is fully responsive and accessible.",
    thumbnail:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/maull7",
    featured: false,
  },
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

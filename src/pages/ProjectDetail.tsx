import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/components/sections/Projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          {/* Back Button */}
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          {/* Project Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up">
            <span className="gradient-text">{project.title}</span>
          </h1>

          {/* Short Description */}
          <p className="text-xl text-muted-foreground max-w-3xl animate-fade-up delay-100">
            {project.shortDescription}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8 animate-fade-up delay-200">
            <Button size="lg" className="rounded-full hover-glow" asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-primary/50"
              asChild
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                View Code
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Screenshot */}
              <div className="glass-card overflow-hidden">
                <img
                  src={project.screenshots[0]}
                  alt={`${project.title} screenshot`}
                  className="w-full h-auto"
                />
              </div>

              {/* Full Description */}
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-4">About This Project</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Problem & Solution */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-3 text-red-400">
                    The Problem
                  </h3>
                  <p className="text-muted-foreground">{project.problem}</p>
                </div>
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-3 text-green-400">
                    The Solution
                  </h3>
                  <p className="text-muted-foreground">{project.solution}</p>
                </div>
              </div>

              {/* Additional Screenshots */}
              {project.screenshots.length > 1 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">More Screenshots</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.screenshots.slice(1).map((screenshot, index) => (
                      <div
                        key={index}
                        className="glass-card overflow-hidden hover-lift"
                      >
                        <img
                          src={screenshot}
                          alt={`${project.title} screenshot ${index + 2}`}
                          className="w-full h-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Responsive design for all devices
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Modern and clean UI/UX
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Optimized performance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Clean and maintainable code
                    </span>
                  </li>
                </ul>
              </div>

              {/* Links */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold mb-4">Project Links</h3>
                <div className="space-y-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    <Github className="h-5 w-5 text-primary" />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;

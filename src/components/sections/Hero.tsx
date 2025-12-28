import { ArrowDown, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTypingAnimation from "@/hooks/useTypingAnimation";

const taglines = [
  "Building modern, scalable web experiences",
  "Crafting beautiful user interfaces",
  "Turning ideas into digital reality",
  "Creating seamless digital solutions",
];

const Hero = () => {
  const { displayText, isComplete } = useTypingAnimation({
    texts: taglines,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 2500,
  });

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-bg"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-up">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Available for work</span>
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-up delay-100">
              <span className="gradient-text">Rehan Maulana</span>
            </h1>

            {/* Role */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-6 animate-fade-up delay-200">
              Web Developer
            </h2>

            {/* Typing Tagline */}
            <div className="h-16 md:h-12 mb-8 animate-fade-up delay-300">
              <p className="text-lg md:text-xl text-muted-foreground">
                {displayText}
                <span
                  className={`inline-block w-0.5 h-6 ml-1 bg-primary ${
                    isComplete ? "animate-pulse" : "animate-[blink_0.7s_infinite]"
                  }`}
                />
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up delay-400">
              <Button
                size="lg"
                className="group rounded-full px-8 bg-primary hover:bg-primary/90 hover-glow"
                asChild
              >
                <a href="#projects">
                  View Projects
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-primary/50 hover:bg-primary/10"
                asChild
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-up">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse-glow" />
              
              {/* Image Container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 glass-card p-2">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Rehan Maulana - Web Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 glass-card rounded-2xl flex items-center justify-center animate-float">
                <span className="text-3xl">💻</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 glass-card rounded-2xl flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                <span className="text-2xl">⚡</span>
              </div>
              <div className="absolute top-1/2 -right-8 w-14 h-14 glass-card rounded-2xl flex items-center justify-center animate-float" style={{ animationDelay: "2s" }}>
                <span className="text-xl">🚀</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs">Scroll Down</span>
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

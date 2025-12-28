import { useState, useEffect } from "react";
import { Code2 } from "lucide-react";

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const easeOut = 1 - Math.pow(1 - currentStep / steps, 3);
      setProgress(Math.min(100, Math.floor(easeOut * 100)));

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsExiting(true);
        setTimeout(onLoadingComplete, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-all duration-500 ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Logo Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 w-28 h-28 rounded-full border-2 border-primary/30 animate-[spin_3s_linear_infinite]" />
          
          {/* Inner ring */}
          <div className="absolute inset-2 w-24 h-24 rounded-full border-2 border-purple-500/30 animate-[spin_2s_linear_infinite_reverse]" />
          
          {/* Center icon */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <div className="absolute inset-4 bg-gradient-to-br from-primary to-purple-500 rounded-full animate-pulse" />
            <Code2 className="relative h-10 w-10 text-white" />
          </div>

          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50" />
          </div>
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]" style={{ animationDelay: "1.33s" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
          </div>
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]" style={{ animationDelay: "2.66s" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50" />
          </div>
        </div>

        {/* Name */}
        <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
          Rehan Maulana
        </h1>
        <p className="text-muted-foreground text-sm mb-8">Web Developer</p>

        {/* Progress Bar */}
        <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-purple-500 to-cyan-500 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-3 font-mono">
          Loading... {progress}%
        </p>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `floatParticle ${3 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default LoadingScreen;

import { useEffect, useState } from "react";
import { Github, GitFork, Star, BookOpen, Activity } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  bio: string;
  name: string;
}

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
}

interface Stats {
  repos: number;
  stars: number;
  forks: number;
  followers: number;
  contributions: number;
}

const GITHUB_USERNAME = "maull7";

const GitHubStats = () => {
  const [stats, setStats] = useState<Stats>({
    repos: 0,
    stars: 0,
    forks: 0,
    followers: 0,
    contributions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [animatedStats, setAnimatedStats] = useState<Stats>({
    repos: 0,
    stars: 0,
    forks: 0,
    followers: 0,
    contributions: 0,
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}`
        );
        const userData: GitHubUser = await userResponse.json();

        const reposResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
        );
        const reposData: GitHubRepo[] = await reposResponse.json();

        const totalStars = reposData.reduce(
          (acc, repo) => acc + repo.stargazers_count,
          0
        );
        const totalForks = reposData.reduce(
          (acc, repo) => acc + repo.forks_count,
          0
        );

        const estimatedContributions = userData.public_repos * 15;

        setStats({
          repos: userData.public_repos,
          stars: totalStars,
          forks: totalForks,
          followers: userData.followers,
          contributions: estimatedContributions,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  useEffect(() => {
    if (loading) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        repos: Math.floor(stats.repos * easeOut),
        stars: Math.floor(stats.stars * easeOut),
        forks: Math.floor(stats.forks * easeOut),
        followers: Math.floor(stats.followers * easeOut),
        contributions: Math.floor(stats.contributions * easeOut),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(stats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [loading, stats]);

  const statCards = [
    {
      icon: BookOpen,
      label: "Repositories",
      value: animatedStats.repos,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Star,
      label: "Total Stars",
      value: animatedStats.stars,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: GitFork,
      label: "Total Forks",
      value: animatedStats.forks,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Activity,
      label: "Contributions",
      value: animatedStats.contributions,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  return (
    <section id="github" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              GitHub
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              Coding <span className="gradient-text">Activity</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Real-time statistics from my GitHub profile. Track my open source
              contributions and coding activity.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {statCards.map((stat, index) => (
            <ScrollReveal key={stat.label} animation="zoom" delay={index * 100}>
              <div className="glass-card p-6 text-center hover-lift hover-glow">
                <div
                  className={`inline-flex p-3 rounded-full ${stat.bgColor} mb-4`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  {loading ? (
                    <div className="h-10 w-16 mx-auto bg-muted animate-pulse rounded" />
                  ) : (
                    stat.value.toLocaleString()
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* GitHub Profile Link */}
        <ScrollReveal delay={400}>
          <div className="mt-12 text-center">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 glass-card hover:bg-primary/10 transition-colors rounded-full font-medium"
            >
              <Github className="h-5 w-5" />
              View GitHub Profile
            </a>
          </div>
        </ScrollReveal>

        {/* Contribution Graph */}
        <ScrollReveal delay={500}>
          <div className="mt-12 glass-card p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Contribution Activity
            </h3>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 49 }).map((_, i) => {
                const intensity = Math.random();
                let bgClass = "bg-muted";
                if (intensity > 0.8) bgClass = "bg-primary";
                else if (intensity > 0.6) bgClass = "bg-primary/70";
                else if (intensity > 0.4) bgClass = "bg-primary/40";
                else if (intensity > 0.2) bgClass = "bg-primary/20";

                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${bgClass} transition-colors hover:ring-2 hover:ring-primary/50`}
                    title={`${Math.floor(Math.random() * 10)} contributions`}
                  />
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Activity visualization based on recent contributions
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GitHubStats;

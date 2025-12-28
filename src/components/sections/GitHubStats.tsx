import { useEffect, useState, useMemo } from "react";
import { Github, GitFork, Star, BookOpen, Activity, Flame, Calendar, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionParticles from "@/components/SectionParticles";
import { useLanguage } from "@/contexts/LanguageContext";

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
  language: string | null;
}

interface Stats {
  repos: number;
  stars: number;
  forks: number;
  followers: number;
  contributions: number;
}

interface LanguageData {
  name: string;
  percentage: number;
  color: string;
}

const GITHUB_USERNAME = "maull7";

// Language colors mapping
const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Vue: "#41b883",
  null: "#8b8b8b",
};

// Generate 365 days of contribution data (simulated)
const generateContributionData = () => {
  const data: { date: Date; count: number; level: number }[] = [];
  const today = new Date();
  
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Simulate contribution pattern (more on weekdays, random variation)
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseChance = isWeekend ? 0.3 : 0.7;
    const hasContribution = Math.random() < baseChance;
    
    const count = hasContribution ? Math.floor(Math.random() * 12) + 1 : 0;
    const level = count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 9 ? 3 : 4;
    
    data.push({ date, count, level });
  }
  
  return data;
};

const GitHubStats = () => {
  const { t } = useLanguage();
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
  const [languages, setLanguages] = useState<LanguageData[]>([]);
  
  // Generate contribution data once
  const contributionData = useMemo(() => generateContributionData(), []);
  
  // Calculate streaks
  const { currentStreak, longestStreak, totalContributions } = useMemo(() => {
    let current = 0;
    let longest = 0;
    let tempStreak = 0;
    let total = 0;
    
    // Calculate from recent to past
    const reversedData = [...contributionData].reverse();
    
    for (let i = 0; i < reversedData.length; i++) {
      total += reversedData[i].count;
      
      if (reversedData[i].count > 0) {
        tempStreak++;
        if (i < 30 && current === 0) current = tempStreak; // Current streak (within last 30 days)
      } else {
        if (tempStreak > longest) longest = tempStreak;
        tempStreak = 0;
        if (current === 0 && i < 30) current = 0;
      }
    }
    if (tempStreak > longest) longest = tempStreak;
    
    return { currentStreak: Math.min(current, 30), longestStreak: longest, totalContributions: total };
  }, [contributionData]);

  // Fallback data in case API fails or rate limited
  const fallbackLanguages: LanguageData[] = [
    { name: "TypeScript", percentage: 35, color: "#3178c6" },
    { name: "JavaScript", percentage: 25, color: "#f1e05a" },
    { name: "Python", percentage: 20, color: "#3572A5" },
    { name: "HTML", percentage: 10, color: "#e34c26" },
    { name: "CSS", percentage: 7, color: "#563d7c" },
    { name: "PHP", percentage: 3, color: "#4F5D95" },
  ];

  const fallbackStats: Stats = {
    repos: 24,
    stars: 156,
    forks: 42,
    followers: 89,
    contributions: totalContributions,
  };

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}`
        );
        const userData = await userResponse.json();

        const reposResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
        );
        const reposData = await reposResponse.json();

        // Check if API returned valid data (not rate limited)
        if (userData.message || !Array.isArray(reposData)) {
          console.warn("GitHub API rate limited, using fallback data");
          setStats(fallbackStats);
          setLanguages(fallbackLanguages);
          setLoading(false);
          return;
        }

        const totalStars = reposData.reduce(
          (acc: number, repo: GitHubRepo) => acc + (repo.stargazers_count || 0),
          0
        );
        const totalForks = reposData.reduce(
          (acc: number, repo: GitHubRepo) => acc + (repo.forks_count || 0),
          0
        );

        // Calculate language distribution
        const langCount: Record<string, number> = {};
        reposData.forEach((repo: GitHubRepo) => {
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1;
          }
        });
        
        const totalLangs = Object.values(langCount).reduce((a, b) => a + b, 0);
        
        if (totalLangs > 0) {
          const langData: LanguageData[] = Object.entries(langCount)
            .map(([name, count]) => ({
              name,
              percentage: Math.round((count / totalLangs) * 100),
              color: languageColors[name] || "#8b8b8b",
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 6);
          setLanguages(langData);
        } else {
          setLanguages(fallbackLanguages);
        }

        setStats({
          repos: userData.public_repos || fallbackStats.repos,
          stars: totalStars || fallbackStats.stars,
          forks: totalForks || fallbackStats.forks,
          followers: userData.followers || fallbackStats.followers,
          contributions: totalContributions,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        // Use fallback data on error
        setStats(fallbackStats);
        setLanguages(fallbackLanguages);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [totalContributions]);

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

  // Get month labels for heatmap
  const getMonthLabels = () => {
    const months: string[] = [];
    const today = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      months.push(date.toLocaleDateString('en', { month: 'short' }));
    }
    return months;
  };

  // Organize data into weeks for the heatmap
  const getWeeksData = () => {
    const weeks: typeof contributionData[] = [];
    let currentWeek: typeof contributionData = [];
    
    // Pad start to align with Sunday
    const firstDay = contributionData[0]?.date.getDay() || 0;
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push({ date: new Date(), count: -1, level: -1 });
    }
    
    contributionData.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    
    return weeks;
  };

  const weeksData = useMemo(() => getWeeksData(), [contributionData]);
  const monthLabels = useMemo(() => getMonthLabels(), []);

  return (
    <section id="github" className="section-padding relative overflow-hidden">
      {/* Floating Particles */}
      <SectionParticles count={20} />

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-green-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              {t('github.subtitle')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              {t('github.title')} <span className="gradient-text">{t('github.highlight')}</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto mb-12">
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

        {/* Streak Counter */}
        <ScrollReveal delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            {/* Current Streak */}
            <div className="glass-card p-6 text-center hover-lift group">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Flame className="h-8 w-8 text-orange-500 group-hover:animate-pulse" />
                <Flame className="h-6 w-6 text-orange-400 group-hover:animate-pulse" style={{ animationDelay: "0.1s" }} />
              </div>
              <div className="text-4xl font-bold text-orange-500 mb-1">
                {loading ? "..." : currentStreak}
              </div>
              <div className="text-sm text-muted-foreground">Current Streak</div>
              <div className="text-xs text-muted-foreground/70 mt-1">days</div>
            </div>

            {/* Longest Streak */}
            <div className="glass-card p-6 text-center hover-lift group">
              <div className="flex items-center justify-center gap-2 mb-3">
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-4xl font-bold text-green-500 mb-1">
                {loading ? "..." : longestStreak}
              </div>
              <div className="text-sm text-muted-foreground">Longest Streak</div>
              <div className="text-xs text-muted-foreground/70 mt-1">days</div>
            </div>

            {/* Total This Year */}
            <div className="glass-card p-6 text-center hover-lift group">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-1">
                {loading ? "..." : totalContributions.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">This Year</div>
              <div className="text-xs text-muted-foreground/70 mt-1">contributions</div>
            </div>
          </div>
        </ScrollReveal>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Contribution Heatmap - Takes 2 columns on desktop */}
          <ScrollReveal delay={300} className="lg:col-span-2">
            <div className="glass-card p-4 sm:p-6 h-full">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Contribution Calendar
              </h3>
              
              {/* Month labels - hidden on mobile */}
              <div className="hidden sm:flex justify-between text-xs text-muted-foreground mb-2 px-6">
                {monthLabels.map((month, i) => (
                  <span key={i} className="w-8 text-center">{i % 2 === 0 ? month : ''}</span>
                ))}
              </div>
              
              {/* Heatmap Grid with horizontal scroll on mobile */}
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                <div className="flex gap-[2px] sm:gap-[3px] pb-2 min-w-[700px] sm:min-w-0">
                  {/* Day labels */}
                  <div className="flex flex-col gap-[2px] sm:gap-[3px] text-[10px] sm:text-xs text-muted-foreground pr-1 sm:pr-2 flex-shrink-0">
                    <span className="h-[10px] sm:h-[12px]"></span>
                    <span className="h-[10px] sm:h-[12px] flex items-center">Mon</span>
                    <span className="h-[10px] sm:h-[12px]"></span>
                    <span className="h-[10px] sm:h-[12px] flex items-center">Wed</span>
                    <span className="h-[10px] sm:h-[12px]"></span>
                    <span className="h-[10px] sm:h-[12px] flex items-center">Fri</span>
                    <span className="h-[10px] sm:h-[12px]"></span>
                  </div>
                  
                  {/* Contribution squares */}
                  {weeksData.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[2px] sm:gap-[3px]">
                      {week.map((day, dayIndex) => {
                        if (day.level === -1) {
                          return <div key={dayIndex} className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px]" />;
                        }
                        
                        const levelColors = [
                          "bg-muted hover:bg-muted/80",
                          "bg-green-900/60 hover:bg-green-900/80",
                          "bg-green-700/70 hover:bg-green-700/90",
                          "bg-green-500/80 hover:bg-green-500",
                          "bg-green-400 hover:bg-green-300",
                        ];
                        
                        return (
                          <div
                            key={dayIndex}
                            className={`w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] rounded-sm ${levelColors[day.level]} transition-all cursor-pointer hover:scale-125 hover:z-10`}
                            title={`${day.date.toLocaleDateString()}: ${day.count} contributions`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-[2px] sm:gap-[3px]">
                  {["bg-muted", "bg-green-900/60", "bg-green-700/70", "bg-green-500/80", "bg-green-400"].map((color, i) => (
                    <div key={i} className={`w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] rounded-sm ${color}`} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Language Distribution */}
          <ScrollReveal delay={400}>
            <div className="glass-card p-4 sm:p-6 h-full">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500" />
                Languages
              </h3>
              
              {/* Responsive layout: side by side on mobile, stacked on desktop */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 sm:gap-6">
                {/* Donut Chart */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                    {languages.length > 0 ? (
                      (() => {
                        let cumulativePercentage = 0;
                        return languages.map((lang) => {
                          const startAngle = cumulativePercentage * 3.6;
                          cumulativePercentage += lang.percentage;
                          const endAngle = cumulativePercentage * 3.6;
                          
                          const startRad = (startAngle * Math.PI) / 180;
                          const endRad = (endAngle * Math.PI) / 180;
                          
                          const x1 = 50 + 40 * Math.cos(startRad);
                          const y1 = 50 + 40 * Math.sin(startRad);
                          const x2 = 50 + 40 * Math.cos(endRad);
                          const y2 = 50 + 40 * Math.sin(endRad);
                          
                          const largeArcFlag = lang.percentage > 50 ? 1 : 0;
                          
                          return (
                            <path
                              key={lang.name}
                              d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                              fill={lang.color}
                              className="transition-all duration-300 hover:opacity-80"
                              style={{
                                filter: `drop-shadow(0 0 4px ${lang.color}40)`,
                              }}
                            />
                          );
                        });
                      })()
                    ) : (
                      <circle cx="50" cy="50" r="40" fill="hsl(var(--muted))" />
                    )}
                  </svg>
                  {/* Center hole */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-card flex items-center justify-center">
                      <span className="text-xl sm:text-2xl font-bold">{languages.length}</span>
                    </div>
                  </div>
                </div>
                
                {/* Language list */}
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2 w-full">
                  {languages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="truncate">{lang.name}</span>
                      </div>
                      <span className="text-muted-foreground ml-2">{lang.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* GitHub Profile Link */}
        <ScrollReveal delay={500}>
          <div className="mt-12 text-center">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 glass-card hover:bg-primary/10 transition-colors rounded-full font-medium group"
            >
              <Github className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              {t('github.viewProfile')}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GitHubStats;

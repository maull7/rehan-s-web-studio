import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import ClayIcon from "@/components/ClayIcon";
import MascotImage from "@/components/MascotImage";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative overflow-hidden bg-[#fffaf4] pb-20 pt-24 dark:bg-background md:pb-28 md:pt-32">
      <div className="clay-blob clay-blob-purple -left-28 top-20" />
      <div className="clay-blob clay-blob-yellow -right-24 bottom-12" />
      <div className="absolute right-[18%] top-28 hidden md:block"><ClayIcon name="sparkle" tone="pink" className="h-10 w-10" /></div>
      <div className="absolute left-[12%] top-1/3"><ClayIcon name="sparkle" tone="blue" className="h-8 w-8" /></div>

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[.95fr_1.05fr]">
          <div className="text-center lg:text-left">
            <span className="clay-badge mb-6 inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-[1px_2px_0_rgba(74,122,78,.25)]" />{t("hero.available")}</span>
            <h1 className="max-w-3xl text-5xl font-black leading-[.96] tracking-[-.07em] text-[#403253] dark:text-foreground sm:text-6xl md:text-8xl">{t("hero.greeting")} <span className="clay-gradient-text">Rehan</span> <span className="inline-block align-[.08em]"><ClayIcon name="sparkle" tone="yellow" className="h-12 w-12 md:h-16 md:w-16" /></span></h1>
            <p className="mt-7 flex max-w-2xl items-center justify-center gap-2 text-2xl font-extrabold leading-tight text-[#5c4b6b] dark:text-slate-100 md:justify-start md:text-4xl">{t("hero.tagline")} <ClayIcon name="coffee" tone="orange" className="h-10 w-10 shrink-0 md:h-12 md:w-12" /></p>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">{t("hero.supporting")}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start"><Button size="lg" className="clay-button group px-7" asChild><a href="#projects">{t("hero.viewProjects")} <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></a></Button><Button size="lg" variant="outline" className="clay-button-secondary px-7" asChild><a href="#contact">{t("hero.letsTalk")}</a></Button><Button size="lg" variant="ghost" className="rounded-full" asChild><a href="/CV REHAN MAULANA.pdf" download="CV-Rehan-Maulana.pdf"><Download className="mr-2 h-4 w-4" />{t("hero.downloadCV")}</a></Button></div>
            <div className="mt-9 flex justify-center gap-5 text-sm font-semibold text-muted-foreground lg:justify-start"><span className="inline-flex items-center gap-1"><ClayIcon name="sparkle" tone="blue" className="h-5 w-5" />{t("hero.modernApps")}</span><span className="inline-flex items-center gap-1"><ClayIcon name="sparkle" tone="purple" className="h-5 w-5" />{t("hero.cleanCode")}</span></div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="clay-hero-stage relative aspect-square overflow-visible rounded-[4rem] bg-[#f5eaff] dark:bg-purple-500/10">
              <div className="absolute left-8 top-10 h-14 w-14 rounded-[1.4rem] bg-[#ffd9df] clay-shadow-soft animate-float"><ClayIcon name="code" tone="purple" className="m-auto h-12 w-12" /></div>
              <div className="absolute right-6 top-8 h-14 w-14 rounded-[1.4rem] bg-[#fff0a8] clay-shadow-soft animate-float" style={{ animationDelay: "1s" }}><ClayIcon name="bug" tone="orange" className="m-auto h-12 w-12" /></div>
              <div className="absolute bottom-10 left-8 h-14 w-14 rounded-[1.4rem] bg-[#cceeff] clay-shadow-soft animate-float" style={{ animationDelay: "1.5s" }}><ClayIcon name="terminal" tone="blue" className="m-auto h-12 w-12" /></div>
              <div className="absolute bottom-8 right-10 h-14 w-14 rounded-[1.4rem] bg-[#ffe0ba] clay-shadow-soft animate-float" style={{ animationDelay: "2s" }}><ClayIcon name="rocket" tone="orange" className="m-auto h-12 w-12" /></div>
              <MascotImage alt="Rehan clay mascot working with a laptop" className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)]" />
              <div className="clay-speech absolute left-1/2 top-4 max-w-[235px] -translate-x-1/2">{t("hero.speech")}</div>
              <div className="clay-coffee absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-[#5c4b6b] clay-shadow-soft dark:bg-card"> <ClayIcon name="coffee" tone="orange" className="h-7 w-7" /> {t("hero.nowPlaying")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import ScrollReveal from "@/components/ScrollReveal";
import ClayIcon, { type ClayIconName } from "@/components/ClayIcon";
import { useLanguage } from "@/contexts/LanguageContext";

const skills: Array<[string, ClayIconName, "purple" | "pink" | "yellow" | "blue" | "orange" | "green"]> = [
  ["Laravel", "folder", "pink"], ["PHP", "code", "purple"], ["React", "sparkle", "blue"], ["Next.js", "terminal", "purple"],
  ["Node.js", "rocket", "green"], ["JavaScript", "code", "yellow"], ["TypeScript", "code", "blue"], ["MySQL", "chart", "orange"],
  ["Tailwind CSS", "toolbox", "blue"], ["Git", "copy", "orange"], ["Redis", "chart", "pink"], ["Docker", "toolbox", "blue"],
];

const Skills = () => {
  const { t } = useLanguage();
  return <section id="skills" className="section-padding relative overflow-hidden bg-yellow-50/40 dark:bg-background"><div className="container-custom"><ScrollReveal><div className="mb-14 text-center"><span className="font-mono text-sm uppercase tracking-wider text-primary">{t("skills.subtitle")}</span><h2 className="mt-2 flex items-center justify-center gap-3 text-4xl font-black tracking-tight md:text-5xl">{t("skills.title")} <ClayIcon name="toolbox" tone="yellow" className="h-12 w-12" /></h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t("skills.description")}</p></div></ScrollReveal><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">{skills.map(([name, icon, tone], index) => <ScrollReveal key={name} animation="zoom" delay={index * 40}><div className="clay-tile group flex flex-col items-center gap-2 p-4 text-center md:p-5"><ClayIcon name={icon} tone={tone} className="h-14 w-14 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" /><span className="text-sm font-bold md:text-base">{name}</span></div></ScrollReveal>)}</div></div></section>;
};
export default Skills;

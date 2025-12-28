import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-secondary/50 backdrop-blur-sm">
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "px-3 py-1 text-xs font-medium rounded-full transition-all duration-200",
          language === "en"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("id")}
        className={cn(
          "px-3 py-1 text-xs font-medium rounded-full transition-all duration-200",
          language === "id"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        ID
      </button>
    </div>
  );
};

export default LanguageSwitcher;

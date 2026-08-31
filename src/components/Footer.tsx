import { Github, Linkedin, Mail, Heart } from "lucide-react";
import MascotImage from "@/components/MascotImage";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t("footer.designed")}</span>
            <span className="hidden sm:inline">Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 hidden sm:inline" />
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{t("footer.thanks")}</span>
            <MascotImage alt="Rehan clay mascot waving goodbye" className="h-14 w-14" />
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/maull7"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/rehanmaulana"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:rehan@example.com"
              className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

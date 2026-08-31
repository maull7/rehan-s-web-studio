import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import useActiveSection from "@/hooks/useActiveSection";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#home", id: "home", key: "nav.home" },
  { name: "About", href: "#about", id: "about", key: "nav.about" },
  { name: "ID Card", href: "#idcard", id: "idcard", key: "nav.idcard" },
  { name: "Skills", href: "#skills", id: "skills", key: "nav.skills" },
  { name: "Projects", href: "#projects", id: "projects", key: "nav.projects" },
  { name: "Experience", href: "#experience", id: "experience", key: "nav.experience" },
  { name: "Contact", href: "#contact", id: "contact", key: "nav.contact" },
];

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const activeSection = useActiveSection(navLinks.map((link) => link.id));

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "clay-nav mx-3 mt-3 py-3 sm:mx-6" : "bg-[#fffaf4]/95 py-4 dark:bg-background/95"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
        >
          RM.
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                "px-3 py-2 text-xs font-medium rounded-full transition-all duration-300",
                activeSection === link.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
              )}
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        {/* Language Switcher & Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-primary/10"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button className="hidden rounded-full bg-primary px-4 text-xs font-bold shadow-md shadow-primary/20 sm:inline-flex" asChild>
            <a href="#contact">{t("nav.letsTalk")} <span className="ml-1">→</span></a>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass mt-2 mx-4 rounded-2xl p-4 animate-fade-up">
          {/* Mobile Language Switcher */}
          <div className="flex justify-center mb-4 sm:hidden">
            <LanguageSwitcher />
          </div>
          
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                "block py-3 px-4 text-sm font-medium rounded-xl transition-all",
                activeSection === link.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
              )}
            >
              {t(link.key)}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

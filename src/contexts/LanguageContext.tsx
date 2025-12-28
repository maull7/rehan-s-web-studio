import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Language = "en" | "id";

interface Translations {
  [key: string]: {
    en: string;
    id: string;
  };
}

const translations: Translations = {
  // Navbar
  "nav.home": { en: "Home", id: "Beranda" },
  "nav.about": { en: "About", id: "Tentang" },
  "nav.idcard": { en: "ID Card", id: "Kartu ID" },
  "nav.certifications": { en: "Certifications", id: "Sertifikasi" },
  "nav.experience": { en: "Experience", id: "Pengalaman" },
  "nav.projects": { en: "Projects", id: "Proyek" },
  "nav.github": { en: "GitHub", id: "GitHub" },
  "nav.contact": { en: "Contact", id: "Kontak" },

  // Hero
  "hero.available": { en: "Available for work", id: "Tersedia untuk kerja" },
  "hero.viewProjects": { en: "View Projects", id: "Lihat Proyek" },
  "hero.contactMe": { en: "Contact Me", id: "Hubungi Saya" },
  "hero.downloadCV": { en: "Download CV", id: "Unduh CV" },
  "hero.scrollDown": { en: "Scroll Down", id: "Scroll ke Bawah" },

  // About
  "about.subtitle": { en: "About Me", id: "Tentang Saya" },
  "about.title": { en: "Who I", id: "Siapa" },
  "about.highlight": { en: "Am", id: "Saya" },
  "about.bio1": { 
    en: "Hi! I'm Rehan Maulana, a passionate Web Developer based in Indonesia.",
    id: "Hai! Saya Rehan Maulana, Web Developer yang berbasis di Indonesia." 
  },
  "about.techStack": { en: "Tech Stack", id: "Teknologi" },

  // Certifications
  "certifications.subtitle": { en: "Credentials", id: "Kredensial" },
  "certifications.title": { en: "Education &", id: "Pendidikan &" },
  "certifications.highlight": { en: "Certifications", id: "Sertifikasi" },
  "certifications.education": { en: "Education", id: "Pendidikan" },
  "certifications.certificates": { en: "Certificates", id: "Sertifikat" },

  // Experience
  "experience.subtitle": { en: "Experience", id: "Pengalaman" },
  "experience.title": { en: "Work", id: "Riwayat" },
  "experience.highlight": { en: "History", id: "Kerja" },

  // Projects
  "projects.subtitle": { en: "Projects", id: "Proyek" },
  "projects.title": { en: "Featured", id: "Karya" },
  "projects.highlight": { en: "Work", id: "Unggulan" },
  "projects.description": { 
    en: "Here are some of the projects I've worked on.",
    id: "Berikut beberapa proyek yang telah saya kerjakan." 
  },
  "projects.viewDetails": { en: "View Details", id: "Lihat Detail" },

  // GitHub
  "github.subtitle": { en: "GitHub", id: "GitHub" },
  "github.title": { en: "Coding", id: "Aktivitas" },
  "github.highlight": { en: "Activity", id: "Coding" },
  "github.viewProfile": { en: "View GitHub Profile", id: "Lihat Profil GitHub" },

  // Contact
  "contact.subtitle": { en: "Contact", id: "Kontak" },
  "contact.title": { en: "Get In", id: "Hubungi" },
  "contact.highlight": { en: "Touch", id: "Saya" },
  "contact.description": { 
    en: "Have a project in mind? Feel free to reach out.",
    id: "Punya proyek? Jangan ragu untuk menghubungi." 
  },
  "contact.info": { en: "Contact Information", id: "Informasi Kontak" },
  "contact.followMe": { en: "Follow Me", id: "Ikuti Saya" },
  "contact.sendMessage": { en: "Send a Message", id: "Kirim Pesan" },
  "contact.yourName": { en: "Your Name", id: "Nama Anda" },
  "contact.yourEmail": { en: "Your Email", id: "Email Anda" },
  "contact.subject": { en: "Subject", id: "Subjek" },
  "contact.message": { en: "Message", id: "Pesan" },
  "contact.send": { en: "Send Message", id: "Kirim Pesan" },
  "contact.sending": { en: "Sending...", id: "Mengirim..." },

  // Footer
  "footer.rights": { en: "All rights reserved.", id: "Hak cipta dilindungi." },

  // ID Card
  "idcard.subtitle": { en: "Identity", id: "Identitas" },
  "idcard.title": { en: "Digital", id: "Kartu ID" },
  "idcard.highlight": { en: "ID Card", id: "Digital" },
  "idcard.drag": { en: "Drag the card to swing it around!", id: "Geser kartu untuk mengayunkannya!" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  }, []);

  const t = useCallback((key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

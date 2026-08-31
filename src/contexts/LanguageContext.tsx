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
  "nav.skills": { en: "Skills", id: "Keahlian" },
  "nav.idcard": { en: "ID Card", id: "Kartu ID" },
  "nav.certifications": { en: "Certifications", id: "Sertifikasi" },
  "nav.experience": { en: "Experience", id: "Pengalaman" },
  "nav.projects": { en: "Projects", id: "Proyek" },
  "nav.github": { en: "GitHub", id: "GitHub" },
  "nav.contact": { en: "Contact", id: "Kontak" },
  "nav.letsTalk": { en: "Let's Talk", id: "Ayo Ngobrol" },

  // Hero
  "hero.available": { en: "Available for work", id: "Tersedia untuk kerja" },
  "hero.viewProjects": { en: "View Projects", id: "Lihat Proyek" },
  "hero.contactMe": { en: "Contact Me", id: "Hubungi Saya" },
  "hero.downloadCV": { en: "Download CV", id: "Unduh CV" },
  "hero.scrollDown": { en: "Scroll Down", id: "Scroll ke Bawah" },
  "hero.greeting": { en: "Hi, I'm", id: "Hai, saya" },
  "hero.tagline": { en: "Fullstack Developer who turns coffee into code.", id: "Fullstack Developer yang mengubah kopi menjadi kode." },
  "hero.supporting": { en: "I build modern, scalable web applications with clean interfaces and a little bit of chaos.", id: "Saya membangun aplikasi web modern dan scalable dengan interface yang rapi dan sedikit kekacauan." },
  "hero.letsTalk": { en: "Let's Talk", id: "Ayo Ngobrol" },
  "hero.modernApps": { en: "Modern apps", id: "Aplikasi modern" },
  "hero.cleanCode": { en: "Clean code", id: "Kode rapi" },
  "hero.speech": { en: "Don't worry, it works on my machine. 😎", id: "Tenang, di mesin saya bisa kok. 😎" },
  "hero.goal": { en: "Ship 10 projects this year!", id: "Rilis 10 proyek tahun ini!" },
  "hero.nowPlaying": { en: "Now playing", id: "Sedang diputar" },

  // About
  "about.subtitle": { en: "About Me", id: "Tentang Saya" },
  "about.title": { en: "Who I", id: "Siapa" },
  "about.highlight": { en: "Am", id: "Saya" },
  "about.bio1": { 
    en: "Hi! I'm Rehan Maulana, a passionate Web Developer based in Indonesia.",
    id: "Hai! Saya Rehan Maulana, Web Developer yang berbasis di Indonesia." 
  },
  "about.techStack": { en: "Tech Stack", id: "Teknologi" },
  "about.newBio": { en: "I'm a fullstack developer focused on building web applications, APIs, dashboards, and AI-powered products.", id: "Saya adalah fullstack developer yang fokus membangun aplikasi web, API, dashboard, dan produk berbasis AI." },
  "about.statProjects": { en: "Projects", id: "Proyek" },
  "about.statYears": { en: "Years Coding", id: "Tahun Coding" },
  "about.statTech": { en: "Technologies", id: "Teknologi" },
  "about.statCoffee": { en: "Cups of Coffee", id: "Cangkir Kopi" },

  // Skills
  "skills.subtitle": { en: "My toolbox", id: "Peralatan saya" },
  "skills.title": { en: "My Developer Toolbox", id: "Developer Toolbox Saya" },
  "skills.description": { en: "A carefully assembled inventory for turning ambitious ideas into reliable digital products.", id: "Koleksi teknologi untuk mengubah ide ambisius menjadi produk digital yang andal." },

  // Developer life
  "life.subtitle": { en: "Behind the scenes", id: "Di balik layar" },
  "life.title": { en: "Developer Life", id: "Kehidupan Developer" },
  "life.description": { en: "The highly scientific process behind every feature that somehow makes it to production.", id: "Proses yang sangat ilmiah di balik setiap fitur yang entah bagaimana berhasil masuk production." },
  "life.mascotReaction": { en: "It works. I have no idea why.", id: "Berhasil. Saya juga tidak tahu kenapa." },
  "life.step.coffee": { en: "Drink coffee", id: "Minum kopi" },
  "life.step.code": { en: "Write code", id: "Menulis kode" },
  "life.step.bug": { en: "Find a bug", id: "Menemukan bug" },
  "life.step.google": { en: "Google the bug", id: "Cari bug di Google" },
  "life.step.stackoverflow": { en: "Open StackOverflow", id: "Buka StackOverflow" },
  "life.step.copy": { en: "Copy the solution", id: "Salin solusinya" },
  "life.step.anotherBug": { en: "Create another bug", id: "Buat bug baru" },
  "life.step.repeat": { en: "Repeat", id: "Ulangi" },

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
  "projects.featured": { en: "Featured Project", id: "Proyek Unggulan" },
  "projects.exploreCaseStudy": { en: "Explore Case Study", id: "Lihat Studi Kasus" },
  "projects.liveDemo": { en: "Live Demo", id: "Demo Langsung" },
  "projects.sourceCode": { en: "Source Code", id: "Source Code" },
  "projects.filterLabel": { en: "Filter projects by category", id: "Filter proyek berdasarkan kategori" },
  "projects.filter.all": { en: "All", id: "Semua" },
  "projects.filter.education": { en: "Education", id: "Pendidikan" },
  "projects.filter.business": { en: "Business", id: "Bisnis" },
  "projects.filter.frontend": { en: "Frontend", id: "Frontend" },
  "projects.category.education": { en: "Education", id: "Pendidikan" },
  "projects.category.business": { en: "Business", id: "Bisnis" },
  "projects.category.frontend": { en: "Frontend", id: "Frontend" },
  "projects.empty": { en: "No projects found in this category yet.", id: "Belum ada proyek pada kategori ini." },
  "projects.aboutProject": { en: "About This Project", id: "Tentang Proyek Ini" },
  "projects.problem": { en: "The Problem", id: "Masalah" },
  "projects.solution": { en: "The Solution", id: "Solusi" },
  "projects.moreScreenshots": { en: "More Screenshots", id: "Screenshot Lainnya" },
  "projects.techStack": { en: "Tech Stack", id: "Teknologi" },
  "projects.keyFeatures": { en: "Key Features", id: "Fitur Utama" },
  "projects.projectLinks": { en: "Project Links", id: "Tautan Proyek" },
  "projects.previousProject": { en: "Previous Project", id: "Proyek Sebelumnya" },
  "projects.nextProject": { en: "Next Project", id: "Proyek Berikutnya" },
  "projects.backToProjects": { en: "Back to Projects", id: "Kembali ke Proyek" },
  "projects.boardTitle": { en: "Projects", id: "Proyek" },
  "projects.viewAll": { en: "View All", id: "Lihat Semua" },

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
  "contact.newTitle": { en: "Got a project in mind?", id: "Punya project di pikiran?" },
  "contact.newDescription": { en: "Let's build something awesome together.", id: "Mari bangun sesuatu yang keren bersama." },

  // Footer
  "footer.rights": { en: "All rights reserved.", id: "Hak cipta dilindungi." },
  "footer.designed": { en: "Designed & built by Rehan Maulana", id: "Dirancang & dibangun oleh Rehan Maulana" },
  "footer.thanks": { en: "Thanks for stopping by!", id: "Terima kasih sudah mampir!" },

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

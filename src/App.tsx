import { useState, useEffect, useRef, ReactNode } from 'react';

// --- TIPE DATA ---
interface Experience {
  id: number;
  title: string;
  role: string;
  descEn: string;
  descId: string;
  image: string;
}

interface FadeInSectionProps {
  children: ReactNode;
  delay?: string;
}

// --- KAMUS BAHASA (BILINGUAL) ---
const dict = {
  en: {
    nav: { work: "Projects", about: "About", exp: "Experience", contact: "Contact" },
    hero: {
      role: "Full-Stack Web Developer",
      titleStart: "Building ",
      titleItalic: "functional",
      titleEnd: " digital systems.",
      desc: "Rooted in structured software engineering. I build robust, scalable web applications that bridge solid backend logic with seamless user experiences.",
      btn: "Explore Selected Work",
      scroll: "Scroll"
    },
    projects: {
      title: "Projects",
      p1: "E-Library Platform",
      p2: "Point of Sales System",
      p3: "Logistics Dashboard"
    },
    about: {
      title: "About Me",
      p1: "I am a web developer focused on creating structured, efficient, and dynamic digital solutions. My foundation lies in Software Engineering (Rekayasa Perangkat Lunak), where I developed a passion for full-stack architecture.",
      p2: "Based in Jakarta, my technical stack revolves around PHP, MySQL, JavaScript, and modern frameworks like React. From designing relational databases to building responsive interfaces, I approach development as a balanced mix of logic and creativity.",
      photoHint: "[ Insert Profile Photo ]"
    },
    skills: {
      title: "Expertise",
      fe: "Frontend Development",
      feDesc: "Building responsive, interactive user interfaces using React, JavaScript, and Tailwind.",
      be: "Backend Systems",
      beDesc: "Developing secure and efficient server-side logic and APIs utilizing PHP.",
      db: "Database Management",
      dbDesc: "Designing normalized relational databases and optimizing queries using MySQL."
    },
    exp: {
      title: "Experience & Awards",
      photoHint: "[ Insert Photo ]"
    },
    contact: {
      title: "Let's build something functional together.",
      desc: "Whether you need a dynamic web application, a scalable database system, or a functional frontend, I'm ready to collaborate.",
      btn: "Get in touch"
    },
    footer: "Crafted for efficient digital experiences."
  },
  id: {
    nav: { work: "Proyek", about: "Tentang", exp: "Pengalaman", contact: "Kontak" },
    hero: {
      role: "Pengembang Web Full-Stack",
      titleStart: "Membangun sistem digital yang ",
      titleItalic: "fungsional.",
      titleEnd: "",
      desc: "Berakar pada rekayasa perangkat lunak yang terstruktur. Saya membangun aplikasi web yang tangguh dan terukur, menjembatani logika backend yang solid dengan pengalaman pengguna yang mulus.",
      btn: "Lihat Karya Saya",
      scroll: "Gulir"
    },
    projects: {
      title: "Proyek",
      p1: "Platform E-Library",
      p2: "Sistem Kasir (POS)",
      p3: "Dasbor Logistik"
    },
    about: {
      title: "Tentang Saya",
      p1: "Saya adalah pengembang web yang berfokus pada penciptaan solusi digital yang terstruktur, efisien, dan dinamis. Dasar saya berada di bidang Rekayasa Perangkat Lunak (RPL), tempat saya mengembangkan minat pada arsitektur full-stack.",
      p2: "Berbasis di Jakarta, keahlian teknis saya berpusat pada PHP, MySQL, JavaScript, dan framework modern seperti React. Dari merancang database relasional hingga membangun antarmuka responsif, saya menganggap pengembangan sebagai perpaduan antara logika dan kreativitas.",
      photoHint: "[ Masukkan Foto Profil ]"
    },
    skills: {
      title: "Keahlian",
      fe: "Pengembangan Frontend",
      feDesc: "Membangun antarmuka pengguna yang responsif dan interaktif menggunakan React, JavaScript, dan Tailwind.",
      be: "Sistem Backend",
      beDesc: "Mengembangkan logika sisi server dan API yang aman serta efisien menggunakan PHP.",
      db: "Manajemen Database",
      dbDesc: "Merancang database relasional ternormalisasi dan mengoptimalkan kueri menggunakan MySQL."
    },
    exp: {
      title: "Pengalaman & Penghargaan",
      photoHint: "[ Masukkan Foto ]"
    },
    contact: {
      title: "Mari bangun sesuatu yang fungsional bersama.",
      desc: "Apakah Anda membutuhkan aplikasi web dinamis, sistem database yang tangguh, atau frontend yang mulus, saya siap berkolaborasi.",
      btn: "Hubungi Saya"
    },
    footer: "Dirancang untuk pengalaman digital yang efisien."
  }
};

// --- KOMPONEN ANIMASI SCROLL ---
const FadeInSection = ({ children, delay = '0ms' }: FadeInSectionProps) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.1 }); // Menambahkan threshold agar animasi lebih mulus

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

// --- KOMPONEN UTAMA ---
function App(): JSX.Element {
  // States
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [lang, setLang] = useState<'en' | 'id'>('en');
  const [isDark, setIsDark] = useState<boolean>(false);

  const t = dict[lang];

  // Efek Dark Mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Efek Navbar Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80); // Diubah menjadi 80px agar transisi tidak terlalu sensitif
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Data Pengalaman
  const experiences: Experience[] = [
    {
      id: 1,
      title: "Internship (Praktik Kerja Lapangan)",
      role: "Logistics & Admin at PT. Telkom Akses",
      descEn: "Responsible for stock opname procedures and logistics management for hardware/NTE. Ensuring inventory data accuracy to support operational efficiency.",
      descId: "Bertanggung jawab atas prosedur pelaksanaan stock opname dan manajemen logistik untuk perangkat keras/NTE. Memastikan akurasi data inventaris untuk mendukung efisiensi operasional.",
      image: "" 
    },
    {
      id: 2,
      title: "TOEIC Certification",
      role: "English Proficiency Award",
      descEn: "Achieved TOEIC certification, demonstrating professional-level English proficiency for business communication and the global workforce.",
      descId: "Meraih sertifikasi TOEIC, yang menunjukkan kemampuan bahasa Inggris tingkat profesional untuk komunikasi bisnis dan dunia kerja global.",
      image: "" 
    },
    {
      id: 3,
      title: "Software Engineering Student",
      role: "SMK Negeri 71 Jakarta",
      descEn: "Developing various functional web-based applications such as Point of Sales systems and an e-library platform.",
      descId: "Mengembangkan berbagai aplikasi fungsional berbasis web seperti sistem Point of Sales (Kasir) dan platform e-library (Libraria).",
      image: "" 
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));

  return (
    <div className="bg-background text-on-background dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container transition-colors duration-500">
      
      {/* --- DYNAMIC NAVBAR --- */}
      {/* Transisi dioptimalkan menggunakan ease-out dan durasi lebih panjang untuk efek yang lebih "soft" */}
      <nav 
        className={`fixed z-50 left-1/2 transform -translate-x-1/2 flex justify-between items-center transition-all duration-700 ease-out origin-top ${
          isScrolled 
            ? 'top-6 w-[90%] md:w-[700px] bg-background/85 dark:bg-gray-800/85 backdrop-blur-md shadow-xl rounded-full py-4 px-8 border border-outline-variant/30 dark:border-gray-700/50 scale-100' 
            : 'top-0 w-full bg-background/95 dark:bg-gray-900/95 py-6 px-6 md:px-12 shadow-sm rounded-none border-b border-outline-variant/10 dark:border-gray-800 scale-100'
        }`}
      >
        <ul className="flex items-center gap-4 md:gap-8 font-label text-[10px] md:text-sm uppercase tracking-widest font-bold">
          <li><a className="text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#work">{t.nav.work}</a></li>
          <li><a className="text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#about">{t.nav.about}</a></li>
          <li className="hidden md:block"><a className="text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#experience">{t.nav.exp}</a></li>
          <li className="hidden md:block"><a className="text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#contact">{t.nav.contact}</a></li>
        </ul>

        {/* Action Toggles (Lang & Theme) */}
        <div className="flex items-center gap-4 ml-4 md:ml-8 pl-4 md:pl-8 border-l border-outline-variant/30 dark:border-gray-700">
          <button 
            onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
            className="font-label font-bold text-xs md:text-sm text-on-background dark:text-gray-200 hover:text-primary transition-colors"
          >
            {lang === 'en' ? 'ID' : 'EN'}
          </button>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="text-on-background dark:text-gray-200 hover:text-primary transition-colors flex items-center"
          >
            <span className="material-symbols-outlined text-xl md:text-2xl">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {/* --- HERO SECTION --- */}
        <section 
          className="relative pt-32 pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[819px] overflow-hidden"
        >
          {/* Ilustrasi Background Ghibli Style */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-[0.05] pointer-events-none mix-blend-multiply dark:mix-blend-screen bg-cover bg-center bg-fixed transition-opacity duration-1000"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542459954-d47f12363b96?auto=format&fit=crop&q=80&w=2000')" }}
          ></div>
          {/* Gradien overlay agar teks tetap terbaca */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background dark:via-gray-900/50 dark:to-gray-900 z-0"></div>

          <div className="absolute top-1/4 left-10 w-64 h-64 bg-surface-container-low dark:bg-primary-container/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse z-0"></div>
          <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-tertiary-container dark:bg-tertiary-container/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
            <div className="animate-[fadeInUp_1s_ease-out_0.2s_both]">
              <p className="font-label text-sm uppercase tracking-[0.2em] text-tertiary dark:text-tertiary-fixed font-semibold mb-4">
                {t.hero.role}
              </p>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-medium leading-tight text-on-background dark:text-white tracking-tight">
                {t.hero.titleStart}<span className="italic text-tertiary dark:text-tertiary-fixed">{t.hero.titleItalic}</span> <br /> {t.hero.titleEnd}
              </h1>
            </div>
            
            <div className="animate-[fadeInUp_1s_ease-out_0.4s_both]">
              <p className="font-body text-lg md:text-xl text-on-surface-variant dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mt-8">
                {t.hero.desc}
              </p>
              <div className="pt-12">
                <a className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-xl font-label font-bold tracking-wide hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-all duration-300 shadow-lg group hover:-translate-y-1" href="#work">
                  {t.hero.btn}
                  <span className="material-symbols-outlined ml-2 transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
            <span className="text-outline dark:text-gray-500 text-xs uppercase tracking-widest mb-2 font-label">{t.hero.scroll}</span>
            <span className="material-symbols-outlined text-outline dark:text-gray-500">arrow_downward</span>
          </div>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section className="py-32 px-6 md:px-12 bg-surface-container-lowest dark:bg-gray-900 relative overflow-hidden z-10" id="work">
          <div className="max-w-7xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-20">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background dark:text-white">{t.projects.title}</h2>
                <div className="h-px bg-outline-variant/50 dark:bg-gray-800 flex-grow ml-8 hidden md:block"></div>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FadeInSection delay="100ms">
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded-2xl bg-surface-container dark:bg-gray-800 shadow-sm mb-6 aspect-square relative bg-surface-variant flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="material-symbols-outlined text-5xl text-outline dark:text-gray-600 opacity-50 absolute z-0">image</span>
                    <img alt="Libraria project" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out relative z-10 opacity-0" src="" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline text-2xl text-on-background dark:text-white mb-2 group-hover:text-primary transition-colors">Libraria</h3>
                      <p className="font-label text-sm text-on-surface-variant dark:text-gray-400 uppercase tracking-wider">{t.projects.p1}</p>
                    </div>
                    <span className="material-symbols-outlined text-tertiary dark:text-primary opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 duration-300">north_east</span>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection delay="300ms">
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded-2xl bg-secondary-container dark:bg-gray-800 shadow-sm mb-6 aspect-square relative bg-surface-variant flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="material-symbols-outlined text-5xl text-outline dark:text-gray-600 opacity-50 absolute z-0">image</span>
                    <img alt="Sistem Kasir project" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out relative z-10 opacity-0" src="" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline text-xl text-on-background dark:text-white mb-1 group-hover:text-primary transition-colors">Sistem Kasir</h3>
                      <p className="font-label text-xs text-on-surface-variant dark:text-gray-400 uppercase tracking-wider">{t.projects.p2}</p>
                    </div>
                    <span className="material-symbols-outlined text-tertiary dark:text-primary opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 duration-300">north_east</span>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection delay="500ms">
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded-2xl bg-surface-container-high dark:bg-gray-800 shadow-sm mb-6 aspect-square relative bg-surface-variant flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="material-symbols-outlined text-5xl text-outline dark:text-gray-600 opacity-50 absolute z-0">image</span>
                    <img alt="Stock Opname project" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out relative z-10 opacity-0" src="" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline text-xl text-on-background dark:text-white mb-1 group-hover:text-primary transition-colors">Stock Opname</h3>
                      <p className="font-label text-xs text-on-surface-variant dark:text-gray-400 uppercase tracking-wider">{t.projects.p3}</p>
                    </div>
                    <span className="material-symbols-outlined text-tertiary dark:text-primary opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 duration-300">north_east</span>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section className="py-32 px-6 md:px-12 bg-surface-container dark:bg-gray-800/50" id="about">
          <div className="max-w-7xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-20">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background dark:text-white">{t.about.title}</h2>
                <div className="h-px bg-outline-variant/50 dark:bg-gray-700 flex-grow ml-8 hidden md:block"></div>
              </div>
            </FadeInSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <FadeInSection delay="100ms">
                <div className="pt-8">
                  <p className="font-body text-xl text-on-surface-variant dark:text-gray-300 leading-relaxed mb-6">{t.about.p1}</p>
                  <p className="font-body text-lg text-on-surface-variant dark:text-gray-400 leading-relaxed mb-12">{t.about.p2}</p>
                </div>
              </FadeInSection>
              
              <FadeInSection delay="300ms">
                <div className="flex items-center justify-center lg:justify-end">
                  <div className="w-full max-w-md aspect-[4/5] overflow-hidden rounded-2xl bg-surface-variant dark:bg-gray-800 shadow-md flex flex-col items-center justify-center relative group">
                    <span className="material-symbols-outlined text-6xl text-outline dark:text-gray-600 mb-4 group-hover:scale-110 transition-transform duration-500">account_circle</span>
                    <span className="font-label text-sm text-outline dark:text-gray-500">{t.about.photoHint}</span>
                    <img alt="Raka Anugrah Satya Profile" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-0" src="" />
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* --- EXPERTISE SECTION --- */}
        <section className="py-32 px-6 md:px-12 bg-surface-container-low dark:bg-gray-900" id="skills">
          <div className="max-w-7xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-20">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background dark:text-white">{t.skills.title}</h2>
                <div className="h-px bg-outline-variant/50 dark:bg-gray-800 flex-grow ml-8 hidden md:block"></div>
              </div>
            </FadeInSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FadeInSection delay="100ms">
                <div className="bg-surface dark:bg-gray-800 p-8 rounded-2xl border border-outline-variant/30 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary-fixed/50 hover:-translate-y-2 transition-all duration-500">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed text-3xl mb-4">devices</span>
                  <h3 className="font-headline text-2xl text-on-background dark:text-white mb-3">{t.skills.fe}</h3>
                  <p className="font-body text-on-surface-variant dark:text-gray-400">{t.skills.feDesc}</p>
                </div>
              </FadeInSection>
              
              <FadeInSection delay="200ms">
                <div className="bg-surface dark:bg-gray-800 p-8 rounded-2xl border border-outline-variant/30 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary-fixed/50 hover:-translate-y-2 transition-all duration-500">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed text-3xl mb-4">dns</span>
                  <h3 className="font-headline text-2xl text-on-background dark:text-white mb-3">{t.skills.be}</h3>
                  <p className="font-body text-on-surface-variant dark:text-gray-400">{t.skills.beDesc}</p>
                </div>
              </FadeInSection>
              
              <FadeInSection delay="300ms">
                <div className="bg-surface dark:bg-gray-800 p-8 rounded-2xl border border-outline-variant/30 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary-fixed/50 hover:-translate-y-2 transition-all duration-500">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed text-3xl mb-4">database</span>
                  <h3 className="font-headline text-2xl text-on-background dark:text-white mb-3">{t.skills.db}</h3>
                  <p className="font-body text-on-surface-variant dark:text-gray-400">{t.skills.dbDesc}</p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE SECTION (CAROUSEL) --- */}
        <section className="py-32 px-6 md:px-12 bg-surface dark:bg-gray-800/20" id="experience">
          <div className="max-w-5xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-16">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background dark:text-white">{t.exp.title}</h2>
                <div className="h-px bg-outline-variant/50 dark:bg-gray-700 flex-grow ml-8 hidden md:block"></div>
              </div>
            </FadeInSection>

            <FadeInSection delay="200ms">
              <div className="relative bg-surface-container-lowest dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-sm border border-outline-variant/20 dark:border-gray-700">
                <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-surface-variant dark:bg-gray-900 mb-8 group">
                  {experiences.map((exp, index) => (
                    <div
                      key={exp.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                    >
                      {exp.image ? (
                        <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-outline dark:text-gray-600 bg-surface-variant dark:bg-gray-900">
                          <span className="material-symbols-outlined text-6xl mb-2 opacity-50">photo_library</span>
                          <span className="font-label text-sm tracking-widest uppercase opacity-70">{t.exp.photoHint}</span>
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-inverse-surface/40 hover:bg-primary dark:bg-black/50 dark:hover:bg-primary-fixed text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-inverse-surface/40 hover:bg-primary dark:bg-black/50 dark:hover:bg-primary-fixed text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>

                <div className="text-center md:text-left min-h-[140px] px-4 md:px-0">
                  <h3 className="font-headline text-3xl text-on-background dark:text-white mb-2">{experiences[currentSlide].title}</h3>
                  <p className="font-label text-sm text-primary dark:text-primary-fixed font-bold uppercase tracking-widest mb-4">{experiences[currentSlide].role}</p>
                  <p className="font-body text-lg text-on-surface-variant dark:text-gray-400 leading-relaxed max-w-3xl">
                    {lang === 'en' ? experiences[currentSlide].descEn : experiences[currentSlide].descId}
                  </p>
                </div>

                <div className="flex justify-center md:justify-start gap-3 mt-8 px-4 md:px-0">
                  {experiences.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentSlide ? "bg-primary dark:bg-primary-fixed w-8" : "bg-outline-variant dark:bg-gray-600 w-2 hover:bg-outline dark:hover:bg-gray-500"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section className="py-32 px-6 md:px-12 bg-secondary-container dark:bg-gray-900 relative overflow-hidden" id="contact">
          {/* Ilustrasi Background Ghibli Style (Footer) */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.1] dark:opacity-[0.05] pointer-events-none mix-blend-multiply dark:mix-blend-screen bg-cover bg-bottom transition-opacity duration-1000"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542459954-d47f12363b96?auto=format&fit=crop&q=80&w=2000')" }}
          ></div>

          <div className="absolute top-0 right-0 w-96 h-96 bg-tertiary-container dark:bg-tertiary-container/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2 z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container dark:bg-primary-container/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2 z-0"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <FadeInSection>
              <h2 className="font-headline text-5xl md:text-6xl text-on-secondary-container dark:text-white mb-8">{t.contact.title}</h2>
              <p className="font-body text-xl text-on-surface-variant dark:text-gray-400 mb-12 max-w-2xl mx-auto">{t.contact.desc}</p>
              <a className="inline-flex items-center justify-center px-10 py-5 bg-primary dark:bg-primary-fixed text-on-primary dark:text-black rounded-xl font-label font-bold text-lg tracking-wide hover:-translate-y-1 transition-all duration-300 shadow-lg" href="mailto:raka.anugrah@example.com">
                {t.contact.btn}
                <span className="material-symbols-outlined ml-3 animate-pulse">mail</span>
              </a>
            </FadeInSection>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-inverse-surface dark:bg-black full-width flat relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full px-6 md:px-12 py-16 gap-8 max-w-7xl mx-auto">
          <div className="space-y-4">
            <span className="font-headline text-2xl text-tertiary-fixed dark:text-gray-200 block">Raka Anugrah Satya</span>
            <p className="font-body text-sm text-tertiary-fixed-dim dark:text-gray-500 max-w-xs leading-relaxed">
              © {new Date().getFullYear()} Raka Anugrah Satya. {t.footer}
            </p>
          </div>
          <ul className="flex flex-col md:flex-row gap-6 font-label text-sm tracking-wide">
            <li><a className="text-tertiary-fixed dark:text-gray-400 hover:text-primary-fixed-dim dark:hover:text-white transition-colors duration-300" href="#">LinkedIn</a></li>
            <li><a className="text-tertiary-fixed dark:text-gray-400 hover:text-primary-fixed-dim dark:hover:text-white transition-colors duration-300" href="#">GitHub</a></li>
            <li><a className="text-tertiary-fixed dark:text-gray-400 hover:text-primary-fixed-dim dark:hover:text-white transition-colors duration-300" href="#">Email</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;

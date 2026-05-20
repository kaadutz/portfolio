import { useState, useEffect, useRef, ReactNode } from 'react';

// --- TIPE DATA ---
interface CarouselItem {
  id: number;
  title: string;
  role?: string;
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
      role: "Fresh Graduate | Software Engineering",
      titleStart: "Ready to build ",
      titleItalic: "impactful",
      titleEnd: " digital solutions.",
      desc: "I am a highly motivated Software Engineering fresh graduate from SMKN 71 Jakarta. Fluent in English (TOEIC 950) and equipped with strong technical skills, I am eager to bring fresh perspectives and great teamwork to the professional industry.",
      btn: "See My Profile",
      scroll: "Scroll"
    },
    projects: {
      title: "Featured Projects",
      viewProject: "View Project"
    },
    about: {
      title: "About Me",
      p1: "I am a recent Software Engineering (Rekayasa Perangkat Lunak) graduate from SMK Negeri 71 Jakarta. During my studies, I developed a strong foundation in building functional web-based systems, ranging from point-of-sale applications to e-library platforms.",
      p2: "Beyond coding, I possess excellent English communication skills, validated by a TOEIC score of 950. I am highly adaptable, enjoy collaborating within teams, and am actively seeking opportunities to start my career and grow in a real-world working environment.",
      photoHint: "[ Insert Profile Photo ]"
    },
    skills: {
      title: "Core Competencies",
      s1: "Web Development",
      s1Desc: "Capable of building responsive and functional websites using technologies like PHP, MySQL, React, and Tailwind CSS.",
      s2: "English Proficiency",
      s2Desc: "Achieved a TOEIC score of 950, demonstrating a highly professional level of English for global business communication.",
      s3: "Adaptability & Collaboration",
      s3Desc: "Proven ability to adapt quickly, lead creative projects, and collaborate effectively within professional environments."
    },
    exp: {
      title: "Experience & Awards",
      photoHint: "[ Insert Photo ]"
    },
    contact: {
      title: "Let's connect and grow together.",
      desc: "Whether it's for an entry-level position, internship, or a collaborative project, I am ready to contribute and learn. Feel free to reach out!",
      btn: "Get in touch"
    },
    footer: "Ready to contribute to the digital industry."
  },
  id: {
    nav: { work: "Proyek", about: "Tentang", exp: "Pengalaman", contact: "Kontak" },
    hero: {
      role: "Lulusan Baru | Rekayasa Perangkat Lunak",
      titleStart: "Siap berkontribusi membangun ",
      titleItalic: "solusi",
      titleEnd: " digital.",
      desc: "Saya adalah lulusan baru (Fresh Graduate) jurusan Rekayasa Perangkat Lunak dari SMKN 71 Jakarta. Memiliki motivasi tinggi, mahir berbahasa Inggris (TOEIC 950), dan siap memberikan kemampuan teknis serta kolaborasi tim yang hebat di dunia industri.",
      btn: "Lihat Profil Saya",
      scroll: "Gulir"
    },
    projects: {
      title: "Sorotan Proyek",
      viewProject: "Lihat Proyek"
    },
    about: {
      title: "Tentang Saya",
      p1: "Saya adalah lulusan baru jurusan Rekayasa Perangkat Lunak (RPL) dari SMK Negeri 71 Jakarta. Selama masa studi, saya telah membangun dasar yang kuat dalam mengembangkan sistem berbasis web, mulai dari aplikasi kasir hingga platform e-library.",
      p2: "Selain kemampuan pemrograman, saya memiliki kemampuan komunikasi bahasa Inggris yang sangat baik, dibuktikan dengan skor TOEIC 950. Saya mudah beradaptasi, senang bekerja dalam tim, dan sedang aktif mencari peluang untuk memulai karier di lingkungan kerja profesional.",
      photoHint: "[ Masukkan Foto Profil ]"
    },
    skills: {
      title: "Kompetensi Utama",
      s1: "Pengembangan Web",
      s1Desc: "Mampu membangun website yang responsif dan fungsional menggunakan teknologi seperti PHP, MySQL, React, dan Tailwind CSS.",
      s2: "Kemampuan Bahasa Inggris",
      s2Desc: "Meraih skor TOEIC 950, menunjukkan tingkat kemahiran bahasa Inggris profesional untuk komunikasi bisnis global.",
      s3: "Adaptabilitas & Kolaborasi Tim",
      s3Desc: "Terbukti mampu beradaptasi dengan cepat, memimpin proyek kreatif, dan berkolaborasi secara efektif di lingkungan profesional."
    },
    exp: {
      title: "Pengalaman & Penghargaan",
      photoHint: "[ Masukkan Foto ]"
    },
    contact: {
      title: "Mari terhubung dan berkembang bersama.",
      desc: "Baik untuk posisi entry-level, magang, atau proyek kolaborasi, saya siap berkontribusi dan belajar. Jangan ragu untuk menghubungi saya!",
      btn: "Hubungi Saya"
    },
    footer: "Siap berkontribusi untuk industri digital."
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
    }, { threshold: 0.1 }); 

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
  const [currentExpSlide, setCurrentExpSlide] = useState<number>(0);
  const [currentProjSlide, setCurrentProjSlide] = useState<number>(0);
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
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Data Projects
  const projectsData: CarouselItem[] = [
    {
      id: 1,
      title: "Libraria - E-Library Platform",
      descEn: "A digital library management system built to efficiently handle book inventories, user borrowing logs, and digital catalogs.",
      descId: "Sistem manajemen perpustakaan digital yang dibangun untuk mengelola inventaris buku, log peminjaman, dan katalog digital secara efisien.",
      image: "" 
    },
    {
      id: 2,
      title: "Point of Sales (Sistem Kasir)",
      descEn: "A functional POS system designed to manage daily transactions, print receipts, and maintain product stock records.",
      descId: "Sistem kasir fungsional yang dirancang untuk mengelola transaksi harian, mencetak struk, dan memelihara catatan stok produk.",
      image: "" 
    },
    {
      id: 3,
      title: "Stock Opname Dashboard",
      descEn: "A logistics monitoring dashboard developed to assist in tracking and updating hardware/NTE stock counts accurately.",
      descId: "Dasbor pemantauan logistik yang dikembangkan untuk membantu melacak dan memperbarui jumlah stok perangkat keras/NTE secara akurat.",
      image: "" 
    }
  ];

  // Auto-play Effect untuk Projects Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProjSlide((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
    }, 4000); 
    return () => clearInterval(timer);
  }, [projectsData.length]);

  // Data Pengalaman & Penghargaan
  const experiencesData: CarouselItem[] = [
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
      title: "TOEIC Certification (Score: 950)",
      role: "English Proficiency Award",
      descEn: "Achieved an outstanding TOEIC score of 950, demonstrating professional-level English proficiency ready for global business communication.",
      descId: "Meraih skor TOEIC 950 yang luar biasa, menunjukkan tingkat kemahiran bahasa Inggris profesional yang siap untuk komunikasi bisnis global.",
      image: "" 
    },
    {
      id: 3,
      title: "Social Harmony Video Campaign",
      role: "Project Lead & Technical Role",
      descEn: "Led a creative video project titled 'Jeda Sejenak', demonstrating strong teamwork, project management, and creative problem-solving skills.",
      descId: "Memimpin proyek video kreatif berjudul 'Jeda Sejenak', yang membuktikan kemampuan kerja sama tim, manajemen proyek, dan pemecahan masalah kreatif.",
      image: "" 
    }
  ];

  const nextExpSlide = () => setCurrentExpSlide((prev) => (prev === experiencesData.length - 1 ? 0 : prev + 1));
  const prevExpSlide = () => setCurrentExpSlide((prev) => (prev === 0 ? experiencesData.length - 1 : prev - 1));

  // --- SVG Icons Component ---
  const GithubIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );

  return (
    <div className="bg-background text-on-background dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container transition-colors duration-500">
      
      {/* --- DYNAMIC NAVBAR --- */}
      <nav 
        className={`fixed z-50 left-1/2 transform -translate-x-1/2 flex justify-between items-center transition-all duration-700 ease-out origin-top ${
          isScrolled 
            ? 'top-6 w-[90%] md:w-[750px] bg-background/85 dark:bg-gray-800/85 backdrop-blur-md shadow-xl rounded-full py-4 px-6 md:px-8 border border-outline-variant/30 dark:border-gray-700/50 scale-100' 
            : 'top-0 w-full bg-background/95 dark:bg-gray-900/95 py-6 px-6 md:px-12 shadow-sm rounded-none border-b border-outline-variant/10 dark:border-gray-800 scale-100'
        }`}
      >
        {/* LOGO INISIAL SEDERHANA */}
        <div className={`font-headline font-bold text-lg md:text-xl tracking-tighter text-primary dark:text-primary-fixed mr-4 md:mr-8 transition-opacity duration-300 ${isScrolled ? 'opacity-0 hidden md:block' : 'opacity-100'}`}>
          RAS.
        </div>

        <ul className="flex items-center gap-4 md:gap-8 font-label text-[10px] md:text-sm uppercase tracking-widest font-bold w-full justify-center md:w-auto">
          <li><a className="text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#work">{t.nav.work}</a></li>
          <li><a className="text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#about">{t.nav.about}</a></li>
          <li className="hidden md:block"><a className="text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#experience">{t.nav.exp}</a></li>
          <li className="hidden md:block"><a className="text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#contact">{t.nav.contact}</a></li>
        </ul>

        {/* Action Toggles */}
        <div className="flex items-center gap-4 ml-auto md:ml-8 pl-4 md:pl-8 border-l border-outline-variant/30 dark:border-gray-700">
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
          <div 
            className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-[0.05] pointer-events-none mix-blend-multiply dark:mix-blend-screen bg-cover bg-center bg-fixed transition-opacity duration-1000"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542459954-d47f12363b96?auto=format&fit=crop&q=80&w=2000')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background dark:via-gray-900/50 dark:to-gray-900 z-0"></div>

          <div className="absolute top-1/4 left-10 w-64 h-64 bg-surface-container-low dark:bg-primary-container/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse z-0"></div>
          <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-tertiary-container dark:bg-tertiary-container/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
            <div className="animate-[fadeInUp_1s_ease-out_0.2s_both]">
              <p className="font-label text-sm uppercase tracking-[0.15em] text-tertiary dark:text-tertiary-fixed font-bold mb-4 bg-tertiary/10 dark:bg-tertiary-fixed/10 inline-block px-4 py-2 rounded-full border border-tertiary/20">
                {t.hero.role}
              </p>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-medium leading-tight text-on-background dark:text-white tracking-tight mt-6">
                {t.hero.titleStart}<span className="italic text-tertiary dark:text-tertiary-fixed">{t.hero.titleItalic}</span> <br /> {t.hero.titleEnd}
              </h1>
            </div>
            
            <div className="animate-[fadeInUp_1s_ease-out_0.4s_both]">
              <p className="font-body text-lg md:text-xl text-on-surface-variant dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mt-8">
                {t.hero.desc}
              </p>
              <div className="pt-12">
                <a className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-xl font-label font-bold tracking-wide hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-all duration-300 shadow-lg group hover:-translate-y-1" href="#about">
                  {t.hero.btn}
                  <span className="material-symbols-outlined ml-2 transform group-hover:translate-x-1 transition-transform">arrow_downward</span>
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
          <div className="max-w-6xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-16">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background dark:text-white">{t.projects.title}</h2>
                <div className="h-px bg-outline-variant/50 dark:bg-gray-800 flex-grow ml-8 hidden md:block"></div>
              </div>
            </FadeInSection>

            <FadeInSection delay="200ms">
              <div className="relative w-full aspect-video md:aspect-[16/7] bg-surface-variant dark:bg-gray-800 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(46,50,48,0.08)] group border border-outline-variant/20 dark:border-gray-700">
                {projectsData.map((proj, index) => (
                  <div
                    key={proj.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentProjSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    {proj.image ? (
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-outline dark:text-gray-600">
                        <span className="material-symbols-outlined text-6xl mb-4 opacity-50">web</span>
                        <span className="font-label text-sm tracking-widest uppercase opacity-70">[ Insert {proj.title} Screenshot ]</span>
                      </div>
                    )}
                    
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-32 pb-8 px-8 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div className="max-w-2xl">
                        <h3 className="font-headline text-3xl md:text-4xl text-white mb-3">{proj.title}</h3>
                        <p className="font-body text-gray-300 text-sm md:text-base leading-relaxed">
                          {lang === 'en' ? proj.descEn : proj.descId}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="absolute top-6 right-8 z-20 flex gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
                  {projectsData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProjSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        index === currentProjSlide ? "bg-primary-fixed w-6" : "bg-white/50 w-2 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </FadeInSection>
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
                <div className="pt-4">
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FadeInSection delay="100ms">
                <div className="bg-surface dark:bg-gray-800 p-8 rounded-2xl border border-outline-variant/30 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary-fixed/50 hover:-translate-y-2 transition-all duration-500 h-full">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed text-4xl mb-6 bg-primary/10 dark:bg-primary-fixed/10 p-4 rounded-xl inline-block">computer</span>
                  <h3 className="font-headline text-2xl text-on-background dark:text-white mb-3">{t.skills.s1}</h3>
                  <p className="font-body text-on-surface-variant dark:text-gray-400">{t.skills.s1Desc}</p>
                </div>
              </FadeInSection>
              
              <FadeInSection delay="200ms">
                <div className="bg-surface dark:bg-gray-800 p-8 rounded-2xl border border-outline-variant/30 dark:border-gray-700 hover:border-tertiary/50 dark:hover:border-tertiary-fixed/50 hover:-translate-y-2 transition-all duration-500 h-full">
                  <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed text-4xl mb-6 bg-tertiary/10 dark:bg-tertiary-fixed/10 p-4 rounded-xl inline-block">language</span>
                  <h3 className="font-headline text-2xl text-on-background dark:text-white mb-3">{t.skills.s2}</h3>
                  <p className="font-body text-on-surface-variant dark:text-gray-400">{t.skills.s2Desc}</p>
                </div>
              </FadeInSection>
              
              <FadeInSection delay="300ms">
                <div className="bg-surface dark:bg-gray-800 p-8 rounded-2xl border border-outline-variant/30 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary-fixed/50 hover:-translate-y-2 transition-all duration-500 h-full">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed text-4xl mb-6 bg-primary/10 dark:bg-primary-fixed/10 p-4 rounded-xl inline-block">groups</span>
                  <h3 className="font-headline text-2xl text-on-background dark:text-white mb-3">{t.skills.s3}</h3>
                  <p className="font-body text-on-surface-variant dark:text-gray-400">{t.skills.s3Desc}</p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE SECTION --- */}
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
                  {experiencesData.map((exp, index) => (
                    <div
                      key={exp.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentExpSlide ? "opacity-100 z-10" : "opacity-0 z-0"
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
                    onClick={prevExpSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-inverse-surface/40 hover:bg-primary dark:bg-black/50 dark:hover:bg-primary-fixed text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button
                    onClick={nextExpSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-inverse-surface/40 hover:bg-primary dark:bg-black/50 dark:hover:bg-primary-fixed text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>

                <div className="text-center md:text-left min-h-[140px] px-4 md:px-0">
                  <h3 className="font-headline text-3xl text-on-background dark:text-white mb-2">{experiencesData[currentExpSlide].title}</h3>
                  <p className="font-label text-sm text-primary dark:text-primary-fixed font-bold uppercase tracking-widest mb-4">{experiencesData[currentExpSlide].role}</p>
                  <p className="font-body text-lg text-on-surface-variant dark:text-gray-400 leading-relaxed max-w-3xl">
                    {lang === 'en' ? experiencesData[currentExpSlide].descEn : experiencesData[currentExpSlide].descId}
                  </p>
                </div>

                <div className="flex justify-center md:justify-start gap-3 mt-8 px-4 md:px-0">
                  {experiencesData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentExpSlide(index)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentExpSlide ? "bg-primary dark:bg-primary-fixed w-8" : "bg-outline-variant dark:bg-gray-600 w-2 hover:bg-outline dark:hover:bg-gray-500"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section className="py-32 px-6 md:px-12 bg-secondary-container dark:bg-gray-900 relative overflow-hidden" id="contact">
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
              
              {/* Added Contact Buttons (Email, LinkedIn, Github) */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a className="inline-flex items-center justify-center px-8 py-4 bg-primary dark:bg-primary-fixed text-on-primary dark:text-black rounded-xl font-label font-bold text-base tracking-wide hover:-translate-y-1 transition-all duration-300 shadow-lg w-full sm:w-auto" href="mailto:raka.anugrah@example.com">
                  <span className="material-symbols-outlined mr-3">mail</span>
                  {t.contact.btn}
                </a>
                <a className="inline-flex items-center justify-center px-8 py-4 bg-surface dark:bg-gray-800 text-on-surface dark:text-white border border-outline-variant/30 rounded-xl font-label font-bold text-base tracking-wide hover:border-primary transition-all duration-300 w-full sm:w-auto" href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">
                  <LinkedInIcon />
                  <span className="ml-3">LinkedIn</span>
                </a>
                <a className="inline-flex items-center justify-center px-8 py-4 bg-surface dark:bg-gray-800 text-on-surface dark:text-white border border-outline-variant/30 rounded-xl font-label font-bold text-base tracking-wide hover:border-primary transition-all duration-300 w-full sm:w-auto" href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                  <GithubIcon />
                  <span className="ml-3">GitHub</span>
                </a>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-inverse-surface dark:bg-black full-width flat relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full px-6 md:px-12 py-12 gap-8 max-w-7xl mx-auto">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-headline font-bold text-xl text-primary dark:text-primary-fixed">RAS.</span>
              <span className="text-outline-variant dark:text-gray-600">|</span>
              <span className="font-headline text-lg text-tertiary-fixed dark:text-gray-200 block">Raka Anugrah Satya</span>
            </div>
            <p className="font-body text-sm text-tertiary-fixed-dim dark:text-gray-500 max-w-xs leading-relaxed">
              © {new Date().getFullYear()} Raka Anugrah Satya. <br/> {t.footer}
            </p>
          </div>
          <ul className="flex items-center gap-6 font-label text-sm tracking-wide">
            <li>
              <a className="text-tertiary-fixed dark:text-gray-400 hover:text-primary-fixed-dim dark:hover:text-white transition-colors duration-300 flex items-center gap-2" href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">
                <LinkedInIcon />
              </a>
            </li>
            <li>
              <a className="text-tertiary-fixed dark:text-gray-400 hover:text-primary-fixed-dim dark:hover:text-white transition-colors duration-300 flex items-center gap-2" href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                <GithubIcon />
              </a>
            </li>
            <li>
              <a className="text-tertiary-fixed dark:text-gray-400 hover:text-primary-fixed-dim dark:hover:text-white transition-colors duration-300 flex items-center gap-2" href="mailto:raka.anugrah@example.com">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;

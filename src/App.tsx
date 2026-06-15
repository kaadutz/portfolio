Ini dia kode lengkapnya! Saya sudah mengintegrasikan semua komponen animasi (Cursor Spotlight, Floating Particles, Typewriter, Tilt Card, dan Magnetic Button) ke dalam *file* kamu.

Pastikan kamu *copy* semua kode di bawah ini dan *paste* ke *file* `App.tsx` (atau `App.jsx`) milikmu.

```tsx
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
    nav: { work: "Projects", about: "About", experience: "Experience", contact: "Contact" },
    hero: {
      role: "Fresh Graduate | Software Engineering",
      titleStart: "Ready to build ",
      typewriterWords: ["impactful", "scalable", "efficient", "aesthetic"],
      titleEnd: " digital solutions.",
      desc: "I am a highly motivated Software Engineering fresh graduate from SMKN 71 Jakarta. Fluent in English and equipped with strong technical skills, I am eager to bring fresh perspectives and great teamwork to the professional industry.",
      btn: "See My Profile"
    },
    projects: {
      title: "Featured Projects"
    },
    about: {
      title: "About Me",
      p1: "Hello! I'm Raka Anugrah Satya, a Software Engineering fresh graduate from SMK Negeri 71 Jakarta. During my studies, I developed a strong passion for designing and building web systems that are both functional and efficient, such as Point of Sales (POS) applications and digital library platforms.",
      p2: "I possess professional-level English communication skills, validated by an outstanding TOEIC score of 950—the highest in my school in 2025. Beyond my technical skills, I am highly adaptable and experienced in working within teams, a skill honed through various collaborative projects. I am now eager to bring my enthusiasm, technical foundation, and teamwork skills to start my professional career in the tech industry.",
    },
    skills: {
      title: "Core Competencies",
      s1: "Web Development & Cloud",
      s1Desc: "Skilled in PHP, MySQL, React, and Tailwind. Certified in Cloud Computing (AWS) and proficient in Microsoft Office suite.",
      s2: "English Proficiency",
      s2Desc: "Achieved an outstanding TOEIC score of 950 in 2025 (highest in school), improving from 920 in 2024. Demonstrates professional-level English for global business.",
      s3: "Adaptability & Teamwork",
      s3Desc: "Proven ability to adapt quickly, lead creative projects, and collaborate effectively within professional team environments."
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
    nav: { work: "Proyek", about: "Tentang", experience: "Pengalaman", contact: "Kontak" },
    hero: {
      role: "Lulusan Baru | Rekayasa Perangkat Lunak",
      titleStart: "Siap membangun ",
      typewriterWords: ["solusi", "sistem", "aplikasi", "karya"],
      titleEnd: " digital.",
      desc: "Saya adalah lulusan baru (Fresh Graduate) jurusan Rekayasa Perangkat Lunak dari SMKN 71 Jakarta. Memiliki motivasi tinggi, mahir berbahasa Inggris, dan siap memberikan kemampuan teknis serta kolaborasi tim yang hebat di dunia industri.",
      btn: "Lihat Profil Saya"
    },
    projects: {
      title: "Sorotan Proyek"
    },
    about: {
      title: "Tentang Saya",
      p1: "Halo! Saya Raka Anugrah Satya, lulusan baru (fresh graduate) jurusan Rekayasa Perangkat Lunak dari SMK Negeri 71 Jakarta. Selama masa studi, saya menemukan minat yang besar dalam merancang dan membangun sistem web yang fungsional dan efisien, seperti aplikasi sistem kasir (POS) dan platform perpustakaan digital.",
      p2: "Saya memiliki kemampuan komunikasi bahasa Inggris yang profesional, dibuktikan dengan skor TOEIC 950 (tertinggi di sekolah pada tahun 2025). Selain keahlian teknis, saya adalah pribadi yang adaptif dan terbiasa bekerja dalam tim, yang terasah melalui berbagai proyek kreatif dan kolaborasi selama masa studi. Saat ini, saya sangat antusias mencari peluang untuk memulai karier dan memberikan kontribusi nyata di industri teknologi.",
    },
    skills: {
      title: "Kompetensi Utama",
      s1: "Pengembangan Web & Cloud",
      s1Desc: "Mahir dalam PHP, MySQL, React, dan Tailwind. Memiliki sertifikasi Cloud Computing (AWS) dan menguasai Microsoft Office.",
      s2: "Kemampuan Bahasa Inggris",
      s2Desc: "Skor TOEIC 950 pada tahun 2025 (tertinggi di sekolah saat itu), meningkat dari skor 920 di tahun 2024. Menunjukkan kemahiran bahasa Inggris profesional untuk komunikasi bisnis.",
      s3: "Adaptabilitas & Kerja Tim",
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

// --- CUSTOM COMPONENTS (ANIMASI & EFEK) ---

const CursorSpotlight = () => {
  const [pos, setPos] = useState({ x: -1000, y: -1000 }); // Mulai di luar layar

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(100, 116, 139, 0.08), transparent 40%)`
      }}
    />
  );
};

const FloatingParticles = () => {
  const particles = Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0px) scale(1); opacity: 0; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-150px) scale(1.5); opacity: 0; }
          }
        `}
      </style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/40 dark:bg-tertiary-fixed/40 blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `floatUp ${p.duration}s infinite ease-in-out ${p.delay}s`
          }}
        />
      ))}
    </div>
  );
};

const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index >= words.length) return;
    
    if (subIndex === words[index].length + 1 && !reverse) {
      const timer = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timer);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="italic text-tertiary dark:text-tertiary-fixed inline-block text-left text-primary min-w-[200px]">
      {words[index]?.substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const TiltCard = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    setStyle({
      transform: `perspective(1000px) rotateY(${x * 15}deg) rotateX(${y * -15}deg)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setStyle({ transform: 'perspective(1000px) rotateY(0) rotateX(0)', transition: 'transform 0.5s ease-out' });
  };

  return (
    <div 
      className={`will-change-transform ${className}`} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave} 
      style={style}
    >
      {children}
    </div>
  );
};

const MagneticButton = ({ children, href, className = "" }: { children: ReactNode, href: string, className?: string }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.3; 
    const y = (e.clientY - (top + height / 2)) * 0.3;
    setPos({ x, y });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <a
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-100 ease-out ${className}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      {children}
    </a>
  );
};

// --- KOMPONEN ANIMASI SCROLL SECTION ---
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
  // Global States
  const [lang, setLang] = useState<'en' | 'id'>('en');
  const [isDark, setIsDark] = useState<boolean>(true); // Diubah default dark biar efek lebih terlihat
  
  // UI & Animation States
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Carousel States
  const [currentExpSlide, setCurrentExpSlide] = useState<number>(0);
  const [currentProjSlide, setCurrentProjSlide] = useState<number>(0);

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

  // Efek Scroll Interaktif
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      setIsScrolled(scrollY > 80);

      const sections = ['work', 'about', 'skills', 'experience', 'contact'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          if (scrollY >= element.offsetTop - 300) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Kunci scroll saat mobile menu terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Tutup mobile menu ketika link di klik
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Data Projects 
  const projectsData: CarouselItem[] = [
    {
      id: 1,
      title: "Libraria - E-Library Platform",
      descEn: "A digital library management system built to efficiently handle book inventories, user borrowing logs, and digital catalogs.",
      descId: "Sistem manajemen perpustakaan digital yang dibangun untuk mengelola inventaris buku, log peminjaman, dan katalog digital secara efisien.",
      image: "/images/projeklibraria.jpg" 
    },
    {
      id: 2,
      title: "Point of Sales (Sistem Kasir)",
      descEn: "A functional POS system designed to manage daily transactions, print receipts, and maintain product stock records.",
      descId: "Sistem kasir fungsional yang dirancang untuk mengelola transaksi harian, mencetak struk, dan memelihara catatan stok produk.",
      image: "/images/projekkasir.jpg" 
    },
    {
      id: 3,
      title: "E-Parking System",
      descEn: "A digital parking management system designed to track vehicle entry/exit, calculate dynamic parking fees, and generate reports.",
      descId: "Sistem manajemen parkir digital yang dirancang untuk melacak keluar/masuk kendaraan, menghitung tarif parkir dinamis, dan menghasilkan laporan.",
      image: "/images/projekparkir.jpg" 
    },
    {
      id: 4,
      title: "Five'r - Multimedia Campaign",
      descEn: "A creative digital promotional campaign for traditional Indonesian snacks (Es Poteng & Klepon Kecerit), utilizing beautiful Ghibli-inspired visual styles and animations.",
      descId: "Kampanye promosi digital kreatif untuk jajanan tradisional Indonesia (Es Poteng & Klepon Kecerit), memanfaatkan gaya visual estetik dan animasi yang terinspirasi dari Studio Ghibli.",
      image: "/images/projekfiver.jpg" 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProjSlide((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
    }, 4500); 
    return () => clearInterval(timer);
  }, [projectsData.length]);

  const nextProjSlide = () => setCurrentProjSlide((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
  const prevProjSlide = () => setCurrentProjSlide((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1));

  // Data Pengalaman
  const experiencesData: CarouselItem[] = [
    {
      id: 1,
      title: "Internship (Praktik Kerja Lapangan)",
      role: "Logistics & Admin at PT. Telkom Akses",
      descEn: "Responsible for stock opname procedures and logistics management for hardware/NTE. Ensuring inventory data accuracy to support operational efficiency.",
      descId: "Bertanggung jawab atas prosedur pelaksanaan stock opname dan manajemen logistik untuk perangkat keras/NTE. Memastikan akurasi data inventaris untuk mendukung efisiensi operasional.",
      image: "/images/pkl1.jpeg" 
    },
    {
      id: 2,
      title: "TOEIC Certification (Score: 950)",
      role: "English Proficiency Award",
      descEn: "Achieved the highest TOEIC score in school with a 950 in 2025, a significant improvement from 920 in 2024. Demonstrates professional-level English proficiency ready for global business communication.",
      descId: "Meraih skor TOEIC tertinggi di sekolah dengan nilai 950 pada tahun 2025, meningkat dari skor 920 pada tahun 2024. Menunjukkan tingkat kemahiran bahasa Inggris profesional yang siap untuk komunikasi bisnis global.",
      image: "/images/toeci.jpeg" 
    },
    {
      id: 3,
      title: "RPL Competency Certification",
      role: "Software Engineering Certification",
      descEn: "Successfully passed the Software Engineering (RPL) competency certification, validating skills in web application development, database management, and programming logic.",
      descId: "Berhasil lulus uji sertifikasi kompetensi Rekayasa Perangkat Lunak (RPL), memvalidasi keterampilan dalam pengembangan aplikasi web, manajemen basis data, dan logika pemrograman.",
      image: "/images/usk.jpeg" 
    }
  ];

  const nextExpSlide = () => setCurrentExpSlide((prev) => (prev === experiencesData.length - 1 ? 0 : prev + 1));
  const prevExpSlide = () => setCurrentExpSlide((prev) => (prev === 0 ? experiencesData.length - 1 : prev - 1));

  // --- SVG Icons ---
  const GithubIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
  );
  
  const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
  );

  const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
  );

  return (
    <div className="bg-background text-on-background dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container transition-colors duration-500">
      
      {/* --- EFEK SPOTLIGHT GLOBAL --- */}
      <CursorSpotlight />

      {/* --- DYNAMIC NAVBAR --- */}
      <nav 
        className={`fixed z-50 left-1/2 transform -translate-x-1/2 transition-all duration-[700ms] ease-out origin-top ${
          isScrolled 
            ? 'top-4 w-[95%] sm:w-[90%] md:w-auto md:min-w-[500px] bg-background/85 dark:bg-gray-800/85 backdrop-blur-md shadow-xl rounded-full py-3 px-4 md:px-6 border border-outline-variant/30 dark:border-gray-700/50' 
            : 'top-0 w-full bg-background dark:bg-gray-900 py-4 px-4 md:px-12 shadow-sm rounded-none border-b border-outline-variant/10 dark:border-gray-800'
        }`}
      >
        <div className="flex items-center justify-between md:justify-center w-full max-w-7xl mx-auto gap-4">
          
          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-on-surface-variant dark:text-gray-300 hover:text-primary transition-colors p-1"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          {/* Desktop Links (Hidden on Mobile) */}
          <ul className="hidden md:flex items-center justify-center gap-4 font-label text-sm uppercase tracking-widest font-bold">
            {['work', 'about', 'experience', 'contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item}`} 
                  className={`px-4 py-2 block transition-colors duration-300 ${
                    activeSection === item || (item === 'about' && activeSection === 'skills') 
                      ? 'text-primary dark:text-primary-fixed' 
                      : 'text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-primary-fixed'
                  }`}
                >
                  {t.nav[item as keyof typeof t.nav]}
                </a>
              </li>
            ))}
          </ul>

          {/* Toggles Lang & Dark Mode */}
          <div className="flex items-center gap-2 md:pl-4 md:border-l border-outline-variant/30 dark:border-gray-700 shrink-0">
            <button 
              onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
              className="font-label font-bold text-sm text-on-background dark:text-gray-200 hover:text-primary transition-colors px-2"
            >
              {lang === 'en' ? 'ID' : 'EN'}
            </button>
            <button 
              onClick={() => setIsDark(!isDark)}
              className="text-on-background dark:text-gray-200 hover:text-primary transition-colors flex items-center bg-surface dark:bg-gray-800 p-1.5 md:p-2 rounded-full shadow-sm z-50 relative"
              aria-label="Toggle Dark Mode"
            >
              <span className="material-symbols-outlined text-lg md:text-xl">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          </div>

        </div>
      </nav>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <div 
        className={`fixed inset-0 z-40 bg-background/95 dark:bg-gray-900/95 backdrop-blur-lg flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center gap-8 font-headline text-2xl uppercase tracking-widest font-bold">
          {['work', 'about', 'experience', 'contact'].map((item) => (
            <li key={item} className="overflow-hidden">
              <a 
                href={`#${item}`} 
                onClick={closeMobileMenu}
                className={`block transform transition-transform duration-500 ${
                  isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
                } ${
                  activeSection === item || (item === 'about' && activeSection === 'skills') 
                    ? 'text-primary dark:text-primary-fixed' 
                    : 'text-on-background dark:text-gray-200 hover:text-primary'
                }`}
              >
                {t.nav[item as keyof typeof t.nav]}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <main className="flex-grow">
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[819px] overflow-hidden">
          
          {/* EFEK PARTIKEL MELAYANG (MAGICAL DUST) */}
          <FloatingParticles />

          <div 
            className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-[0.05] pointer-events-none mix-blend-multiply dark:mix-blend-screen bg-cover bg-center bg-fixed transition-opacity duration-1000"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542459954-d47f12363b96?auto=format&fit=crop&q=80&w=2000')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background dark:via-gray-900/50 dark:to-gray-900 z-0"></div>

          <div className="absolute top-1/4 left-10 w-64 h-64 bg-surface-container-low dark:bg-primary-container/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse z-0"></div>
          <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-tertiary-container dark:bg-tertiary-container/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
            <div className="animate-[fadeInUp_1s_ease-out_0.2s_both]">
              <p className="font-label text-xs md:text-sm uppercase tracking-[0.15em] text-tertiary dark:text-tertiary-fixed font-bold mb-4 bg-tertiary/10 dark:bg-tertiary-fixed/10 inline-block px-4 py-2 rounded-full border border-tertiary/20">
                {t.hero.role}
              </p>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-medium leading-tight text-on-background dark:text-white tracking-tight mt-6">
                {t.hero.titleStart}
                
                {/* EFEK TYPEWRITER */}
                <Typewriter words={t.hero.typewriterWords} />
                
                <br /> {t.hero.titleEnd}
              </h1>
            </div>
            
            <div className="animate-[fadeInUp_1s_ease-out_0.4s_both]">
              <p className="font-body text-lg md:text-xl text-on-surface-variant dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mt-8">
                {t.hero.desc}
              </p>
              <div className="pt-12">
                {/* EFEK MAGNETIC BUTTON */}
                <MagneticButton href="#about" className="group relative z-20">
                  <span className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary dark:text-white rounded-xl font-label font-bold tracking-wide hover:bg-primary-fixed-dim dark:hover:bg-primary-fixed transition-all duration-300 shadow-lg">
                    {t.hero.btn}
                    <span className="material-symbols-outlined ml-2 transform group-hover:translate-y-1 transition-transform">arrow_downward</span>
                  </span>
                </MagneticButton>
              </div>
            </div>
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
              <TiltCard>
                <div className="relative w-full aspect-[4/3] md:aspect-[16/7] bg-surface-variant dark:bg-gray-800 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(46,50,48,0.08)] group border border-outline-variant/20 dark:border-gray-700">
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
                          <span className="font-label text-sm tracking-widest uppercase opacity-70 text-center px-4">[ Insert {proj.title} Screenshot ]</span>
                        </div>
                      )}
                      
                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                        <div className="max-w-2xl mt-12 md:mt-0">
                          <h3 className="font-headline text-2xl md:text-4xl text-white mb-2">{proj.title}</h3>
                          <p className="font-body text-gray-200 text-xs md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
                            {lang === 'en' ? proj.descEn : proj.descId}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Arrow Navigation for Projects */}
                  <button 
                    onClick={prevProjSlide} 
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-inverse-surface/40 hover:bg-primary dark:bg-black/50 dark:hover:bg-primary-fixed text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
                  >
                    <span className="material-symbols-outlined text-lg md:text-2xl">chevron_left</span>
                  </button>
                  <button 
                    onClick={nextProjSlide} 
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-inverse-surface/40 hover:bg-primary dark:bg-black/50 dark:hover:bg-primary-fixed text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
                  >
                    <span className="material-symbols-outlined text-lg md:text-2xl">chevron_right</span>
                  </button>

                  <div className="absolute top-4 right-4 md:top-6 md:right-8 z-20 flex gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                    {projectsData.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentProjSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          index === currentProjSlide ? "bg-primary-fixed w-4 md:w-6" : "bg-white/50 w-1.5 md:w-2 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </TiltCard>
            </FadeInSection>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section className="py-32 px-6 md:px-12 bg-surface-container dark:bg-gray-800/50 relative z-10" id="about">
          <div className="max-w-7xl mx-auto relative">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-20">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background dark:text-white">{t.about.title}</h2>
                <div className="h-px bg-outline-variant/50 dark:bg-gray-700 flex-grow ml-8 hidden md:block"></div>
              </div>
            </FadeInSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <FadeInSection delay="100ms">
                <div>
                  <p className="font-body text-xl text-on-surface-variant dark:text-gray-300 leading-relaxed mb-6">{t.about.p1}</p>
                  <p className="font-body text-lg text-on-surface-variant dark:text-gray-400 leading-relaxed mb-12">{t.about.p2}</p>
                </div>
              </FadeInSection>
              
              <FadeInSection delay="300ms">
                <TiltCard>
                  <div className="flex items-center justify-center lg:justify-end">
                    <div className="w-full max-w-md aspect-[4/5] overflow-hidden rounded-2xl bg-surface-variant dark:bg-gray-800 shadow-md flex flex-col items-center justify-center relative group border-4 border-white/50 dark:border-gray-700/50">
                      <img 
                        alt="Raka Anugrah Satya Profile" 
                        className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
                        src="/images/fotogw.jpeg" 
                      />
                    </div>
                  </div>
                </TiltCard>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* --- EXPERTISE SECTION --- */}
        <section className="py-32 px-6 md:px-12 bg-surface-container-low dark:bg-gray-900 relative z-10" id="skills">
          <div className="max-w-7xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-20">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background dark:text-white">{t.skills.title}</h2>
                <div className="h-px bg-outline-variant/50 dark:bg-gray-800 flex-grow ml-8 hidden md:block"></div>
              </div>
            </FadeInSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FadeInSection delay="100ms">
                <TiltCard className="h-full">
                  <div className="bg-surface dark:bg-gray-800 p-8 rounded-2xl border border-outline-variant/30 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary-fixed/50 transition-all duration-500 h-full relative z-20">
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed text-4xl mb-6 bg-primary/10 dark:bg-primary-fixed/10 p-4 rounded-xl inline-block">computer</span>
                    <h3 className="font-headline text-2xl text-on-background dark:text-white mb-3">{t.skills.s1}</h3>
                    <p className="font-body text-on-surface-variant dark:text-gray-400">{t.skills.s1Desc}</p>
                  </div>
                </TiltCard>
              </FadeInSection>
              
              <FadeInSection delay="200ms">
                <TiltCard className="h-full">
                  <div className="bg-surface dark:bg-gray-800 p-8 rounded-2xl border border-outline-variant/30 dark:border-gray-700 hover:border-tertiary/50 dark:hover:border-tertiary-fixed/50 transition-all duration-500 h-full relative z-20">
                    <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed text-4xl mb-6 bg-tertiary/10 dark:bg-tertiary-fixed/10 p-4 rounded-xl inline-block">language</span>
                    <h3 className="font-headline text-2xl text-on-background dark:text-white mb-3">{t.skills.s2}</h3>
                    <p className="font-body text-on-surface-variant dark:text-gray-400">{t.skills.s2Desc}</p>
                  </div>
                </TiltCard>
              </FadeInSection>
              
              <FadeInSection delay="300ms">
                <TiltCard className="h-full">
                  <div className="bg-surface dark:bg-gray-800 p-8 rounded-2xl border border-outline-variant/30 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary-fixed/50 transition-all duration-500 h-full relative z-20">
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed text-4xl mb-6 bg-primary/10 dark:bg-primary-fixed/10 p-4 rounded-xl inline-block">groups</span>
                    <h3 className="font-headline text-2xl text-on-background dark:text-white mb-3">{t.skills.s3}</h3>
                    <p className="font-body text-on-surface-variant dark:text-gray-400">{t.skills.s3Desc}</p>
                  </div>
                </TiltCard>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE SECTION --- */}
        <section className="py-32 px-6 md:px-12 bg-surface dark:bg-gray-800/20 relative z-10" id="experience">
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

                  {/* Arrow Navigation for Experience */}
                  <button 
                    onClick={prevExpSlide} 
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-inverse-surface/40 hover:bg-primary dark:bg-black/50 dark:hover:bg-primary-fixed text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
                  >
                    <span className="material-symbols-outlined text-lg md:text-2xl">chevron_left</span>
                  </button>
                  <button 
                    onClick={nextExpSlide} 
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-inverse-surface/40 hover:bg-primary dark:bg-black/50 dark:hover:bg-primary-fixed text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
                  >
                    <span className="material-symbols-outlined text-lg md:text-2xl">chevron_right</span>
                  </button>
                </div>

                <div className="text-center md:text-left min-h-[140px] px-4 md:px-0 relative z-20">
                  <h3 className="font-headline text-2xl md:text-3xl text-on-background dark:text-white mb-2">{experiencesData[currentExpSlide].title}</h3>
                  <p className="font-label text-xs md:text-sm text-primary dark:text-primary-fixed font-bold uppercase tracking-widest mb-4">{experiencesData[currentExpSlide].role}</p>
                  <p className="font-body text-sm md:text-lg text-on-surface-variant dark:text-gray-400 leading-relaxed max-w-3xl">
                    {lang === 'en' ? experiencesData[currentExpSlide].descEn : experiencesData[currentExpSlide].descId}
                  </p>
                </div>

                <div className="flex justify-center md:justify-start gap-3 mt-8 px-4 md:px-0 relative z-20">
                  {experiencesData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentExpSlide(index)}
                      className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                        index === currentExpSlide ? "bg-primary dark:bg-primary-fixed w-6 md:w-8" : "bg-outline-variant dark:bg-gray-600 w-1.5 md:w-2 hover:bg-outline dark:hover:bg-gray-500"
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
          
          <div className="max-w-4xl mx-auto text-center relative z-20">
            <FadeInSection>
              <h2 className="font-headline text-4xl md:text-6xl text-on-secondary-container dark:text-white mb-8">{t.contact.title}</h2>
              <p className="font-body text-base md:text-xl text-on-surface-variant dark:text-gray-400 mb-12 max-w-2xl mx-auto">{t.contact.desc}</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton href="mailto:rakacembol@gmail.com" className="w-full sm:w-auto">
                  <span className="flex items-center justify-center px-8 py-4 bg-primary dark:bg-primary-fixed text-on-primary dark:text-black rounded-xl font-label font-bold text-sm md:text-base tracking-wide hover:bg-primary-fixed-dim dark:hover:bg-primary transition-colors duration-300 shadow-lg w-full sm:w-auto">
                    <span className="material-symbols-outlined mr-3">mail</span>
                    {t.contact.btn}
                  </span>
                </MagneticButton>
                <MagneticButton href="https://www.linkedin.com/in/raka-anugrah-satya/" className="w-full sm:w-auto">
                  <span className="flex items-center justify-center px-8 py-4 bg-surface dark:bg-gray-800 text-on-surface dark:text-white border border-outline-variant/30 rounded-xl font-label font-bold text-sm md:text-base tracking-wide hover:border-primary transition-all duration-300 w-full sm:w-auto">
                    <LinkedInIcon />
                    <span className="ml-3">LinkedIn</span>
                  </span>
                </MagneticButton>
                <MagneticButton href="https://github.com/kaadutz" className="w-full sm:w-auto">
                  <span className="flex items-center justify-center px-8 py-4 bg-surface dark:bg-gray-800 text-on-surface dark:text-white border border-outline-variant/30 rounded-xl font-label font-bold text-sm md:text-base tracking-wide hover:border-primary transition-all duration-300 w-full sm:w-auto">
                    <GithubIcon />
                    <span className="ml-3">GitHub</span>
                  </span>
                </MagneticButton>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-inverse-surface dark:bg-black full-width flat relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center w-full px-6 md:px-12 py-12 gap-8 max-w-7xl mx-auto">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-headline text-lg md:text-xl text-tertiary-fixed dark:text-gray-200 block">Raka Anugrah Satya</span>
            <p className="font-body text-xs md:text-sm text-tertiary-fixed-dim dark:text-gray-500 max-w-xs leading-relaxed mx-auto md:mx-0">
              © {new Date().getFullYear()} Raka Anugrah Satya. <br/> {t.footer}
            </p>
          </div>
          <ul className="flex items-center gap-6 font-label text-sm tracking-wide relative z-30">
            <li>
              <a className="text-tertiary-fixed dark:text-gray-400 hover:text-primary-fixed-dim dark:hover:text-white transition-colors duration-300 flex items-center gap-2" href="https://www.linkedin.com/in/raka-anugrah-satya/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </li>
            <li>
              <a className="text-tertiary-fixed dark:text-gray-400 hover:text-primary-fixed-dim dark:hover:text-white transition-colors duration-300 flex items-center gap-2" href="https://www.instagram.com/rakaa_204/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a className="text-tertiary-fixed dark:text-gray-400 hover:text-primary-fixed-dim dark:hover:text-white transition-colors duration-300 flex items-center gap-2" href="https://github.com/kaadutz" target="_blank" rel="noreferrer" aria-label="GitHub">
                <GithubIcon />
              </a>
            </li>
            <li>
              <a className="text-tertiary-fixed dark:text-gray-400 hover:text-primary-fixed-dim dark:hover:text-white transition-colors duration-300 flex items-center gap-2" href="mailto:rakacembol@gmail.com" aria-label="Email">
                <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
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

```

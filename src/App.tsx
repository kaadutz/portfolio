import { useState, useEffect, useRef, useMemo, ReactNode } from 'react';
import characterSvg from './assets/character.svg'; 

// --- TIPE DATA ---
interface PortfolioItem {
  id: number;
  title: string;
  role?: string;
  descEn: string;
  descId: string;
  image: string;
  tech?: string[];
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
      titleStart: "Ready to build",
      typewriterWords: ["impactful", "scalable", "efficient", "aesthetic"],
      titleEnd: "digital solutions.",
      desc: "I am a highly motivated Software Engineering fresh graduate from SMKN 71 Jakarta. Fluent in English and equipped with strong technical skills, I am eager to bring fresh perspectives and great teamwork to the professional industry.",
      btn: "See My Profile"
    },
    projects: {
      title: "Featured Projects"
    },
    about: {
      title: "About Me",
      p1: "Hello! I'm Raka Anugrah Satya, a Software Engineering fresh graduate from SMK Negeri 71 Jakarta. During my studies, I developed a strong passion for designing and building web systems that are both functional and efficient, such as Point of Sales (POS) applications and digital library platforms.",
      p2: "I possess professional-level English communication skills, validated by an outstanding TOEIC score of 950—the highest in my school in 2025. Beyond my technical skills, I am highly adaptable and experienced in working within teams, a skill honed through various collaborative projects. I am eager to bring my enthusiasm, technical foundation, and teamwork skills to start my professional career in the tech industry.",
    },
    skills: {
      title: "Core Competencies",
      s1: "Web Development",
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
      titleStart: "Siap membangun",
      typewriterWords: ["solusi", "sistem", "aplikasi", "karya"],
      titleEnd: "digital.",
      desc: "Saya adalah lulusan baru (Fresh Graduate) jurusan Rekayasa Perangkat Lunak dari SMKN 71 Jakarta. Memiliki motivasi tinggi, mahir berbahasa Inggris, dan siap memberikan kemampuan teknis serta kolaborasi tim yang hebat di dunia industri.",
      btn: "Lihat Profil Saya"
    },
    projects: {
      title: "Sorotan Proyek"
    },
    about: {
      title: "Tentang Saya",
      p1: "Halo! Saya Raka Anugrah Satya, lulusan baru (fresh graduate) jurusan Rekayasa Perangkat Lunak dari SMK Negeri 71 Jakarta. Selama masa studi, saya menemukan minat yang besar dalam merancang dan membangun sistem web yang fungsional dan efisien, seperti aplikasi sistem kasir (POS) dan platform perpustakaan digital.",
      p2: "Saya memiliki kemampuan komunikasi bahasa Inggris yang profesional, dibuktikan dengan skor TOEIC 950 (tertinggi di sekolah pada tahun 2025). Selain keahlian teknis, saya adalah pribadi yang adaptif dan terbiasa bekerja dalam tim, yang terasah melalui berbagai proyek kreatif dan kolaborasi selama masa studi. Saya sangat antusias mencari peluang untuk memulai karier di industri teknologi.",
    },
    skills: {
      title: "Kompetensi Utama",
      s1: "Pengembangan Web",
      s1Desc: "Mahir dalam PHP, MySQL, React, dan Tailwind. Memiliki sertifikasi Cloud Computing (AWS) dan menguasai Microsoft Office.",
      s2: "Bahasa Inggris",
      s2Desc: "Skor TOEIC 950 pada tahun 2025 (tertinggi di sekolah), meningkat dari 920 di tahun 2024. Menunjukkan kemahiran bahasa Inggris profesional.",
      s3: "Adaptabilitas & Tim",
      s3Desc: "Terbukti mampu beradaptasi dengan cepat, memimpin proyek kreatif, dan berkolaborasi secara efektif di lingkungan profesional."
    },
    exp: {
      title: "Pengalaman & Penghargaan",
      photoHint: "[ Masukkan Foto ]"
    },
    contact: {
      title: "Mari terhubung & berkembang.",
      desc: "Baik untuk posisi entry-level, magang, atau proyek kolaborasi, saya siap berkontribusi dan belajar. Jangan ragu untuk menghubungi saya!",
      btn: "Hubungi Saya"
    },
    footer: "Siap berkontribusi untuk industri digital."
  }
};

// --- CUSTOM COMPONENTS (ANIMASI & EFEK) ---

const CursorSpotlight = () => {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

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
  const particles = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatUpParticle {
          0% { transform: translateY(0px) scale(1); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-150px) scale(1.5); opacity: 0; }
        }
      ` }} />
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/40 blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `floatUpParticle ${p.duration}s infinite ease-in-out ${p.delay}s`
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
    <span className="italic inline-block text-center text-primary">
      {words[index]?.substring(0, subIndex)}
      <span className="animate-pulse text-content-light dark:text-content-dark">|</span>
    </span>
  );
};

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

// --- KOMPONEN UTAMA APP ---
function App(): JSX.Element {
  const [lang, setLang] = useState<'en' | 'id'>('en');
  const [isDark, setIsDark] = useState<boolean>(true);
  
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const t = dict[lang];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Data Projects 
  const projectsData: PortfolioItem[] = [
    {
      id: 1,
      title: "Libraria - E-Library",
      descEn: "A digital library management system built to efficiently handle book inventories, user borrowing logs, and digital catalogs.",
      descId: "Sistem manajemen perpustakaan digital yang dibangun untuk mengelola inventaris buku, log peminjaman, dan katalog digital secara efisien.",
      image: "/images/projeklibraria.jpg",
      tech: ["HTML", "CSS", "JavaScript", "MySQL"]
    },
    {
      id: 2,
      title: "Point of Sales (Kasir)",
      descEn: "A functional POS system designed to manage daily transactions, print receipts, and maintain product stock records.",
      descId: "Sistem kasir fungsional yang dirancang untuk mengelola transaksi harian, mencetak struk, dan memelihara catatan stok produk.",
      image: "/images/projekkasir.jpg",
      tech: ["HTML", "CSS", "JavaScript", "MySQL"]
    },
    {
      id: 3,
      title: "E-Parking System",
      descEn: "A digital parking management system designed to track vehicle entry/exit, calculate dynamic parking fees, and generate reports.",
      descId: "Sistem manajemen parkir digital yang dirancang untuk melacak keluar/masuk kendaraan, menghitung tarif parkir dinamis, dan menghasilkan laporan.",
      image: "/images/projekparkir.jpg",
      tech: ["HTML", "CSS", "JavaScript", "MySQL"]
    },
    {
      id: 4,
      title: "Five'r Campaign",
      descEn: "A creative digital promotional campaign for traditional Indonesian snacks, utilizing beautiful Ghibli-inspired visual styles.",
      descId: "Kampanye promosi digital kreatif untuk jajanan tradisional, memanfaatkan gaya visual estetik dan animasi yang terinspirasi dari Studio Ghibli.",
      image: "/images/projekfiver.jpg",
      tech: ["React", "Vite"]
    }
  ];

  // Data Pengalaman 
  const experiencesData: PortfolioItem[] = [
    {
      id: 1,
      title: "Internship (Praktik Kerja Lapangan)",
      role: "Logistics & Admin at PT. Telkom Akses",
      descEn: "Responsible for stock opname procedures and logistics management for hardware/NTE. Ensuring inventory data accuracy to support operational efficiency.",
      descId: "Bertanggung jawab atas prosedur pelaksanaan stock opname dan manajemen logistik untuk perangkat keras/NTE. Memastikan akurasi data inventaris.",
      image: "/images/pkl1.jpeg" 
    },
    {
      id: 2,
      title: "TOEIC Certification (Score: 950)",
      role: "English Proficiency Award",
      descEn: "Achieved the highest TOEIC score in school with a 950 in 2025. Demonstrates professional-level English proficiency.",
      descId: "Meraih skor TOEIC tertinggi di sekolah dengan nilai 950 pada tahun 2025. Menunjukkan tingkat kemahiran bahasa Inggris profesional.",
      image: "/images/toeic.jpeg" 
    },
    {
      id: 3,
      title: "RPL Competency Certification",
      role: "Software Engineering Certification",
      descEn: "Successfully passed the Software Engineering (RPL) competency certification, validating skills in web application development and databases.",
      descId: "Berhasil lulus uji sertifikasi kompetensi Rekayasa Perangkat Lunak (RPL), memvalidasi keterampilan dalam pengembangan aplikasi web dan basis data.",
      image: "/images/usk.jpeg" 
    }
  ];

  // SVG Icons
  const GithubIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
  );
  
  const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
  );

  const EmailIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );

  return (
    <div className="bg-bg-light dark:bg-bg-dark text-content-light dark:text-content-dark font-sans min-h-screen flex flex-col overflow-x-hidden transition-colors duration-500 relative">
      
      {/* Background Grid Pattern & Spotlight */}
      <div className="fixed inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <CursorSpotlight />

      {/* FLOATING PILL NAVBAR */}
      <nav className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'top-6' : 'top-8'}`}>
        <div className="px-8 py-4 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-pill shadow-lg flex items-center gap-8">
          <span className="font-bold text-xl tracking-tighter">Raka.</span>
          <div className="hidden md:flex gap-6 font-medium text-sm">
            {['work', 'about', 'experience'].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                className={`transition-colors ease-spring ${
                  activeSection === item ? 'text-primary' : 'hover:text-primary'
                }`}
              >
                {t.nav[item as keyof typeof t.nav]}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-3 border-l border-gray-300 dark:border-gray-700 pl-6">
            <button 
              onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
              className="font-bold text-sm hover:text-primary transition-colors ease-spring"
            >
              {lang === 'en' ? 'ID' : 'EN'}
            </button>
            <button 
              onClick={() => setIsDark(!isDark)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark hover:scale-110 active:scale-95 transition-all ease-spring text-sm"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow z-10 relative">
        {/* HERO SECTION */}
        <section className="relative w-full h-screen flex flex-col items-center justify-center px-6">
          <FloatingParticles />
          
          <div className="z-10 text-center relative max-w-5xl mx-auto flex flex-col items-center">
            <span className="px-6 py-2 rounded-pill bg-surface-dark text-white dark:bg-surface-light dark:text-content-light font-medium tracking-widest text-xs uppercase shadow-sm mb-8 animate-[fadeInUp_1s_ease-out_0.2s_both]">
              {t.hero.role}
            </span>
            
            <h1 className="text-5xl md:text-[120px] font-medium leading-[0.95] tracking-tighter mb-8 animate-[fadeInUp_1s_ease-out_0.4s_both]">
              {t.hero.titleStart} <br className="hidden md:block" />
              <Typewriter words={t.hero.typewriterWords} /> <br className="hidden md:block" />
              {t.hero.titleEnd}
            </h1>
            
            <p className="max-w-2xl text-lg opacity-80 mb-10 animate-[fadeInUp_1s_ease-out_0.6s_both]">
              {t.hero.desc}
            </p>

            <a href="#about" className="px-8 py-4 bg-primary text-white rounded-pill font-bold tracking-wide hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:-translate-y-1 ease-spring animate-[fadeInUp_1s_ease-out_0.8s_both]">
              {t.hero.btn}
            </a>
          </div>

          {/* SVG KARAKTER STIKER MELAYANG */}
          <img
            src={characterSvg}
            alt="Raka Character"
            className="absolute bottom-12 right-4 md:bottom-20 md:right-32 w-48 md:w-80 z-20 drop-shadow-2xl animate-floating transition-all duration-300 ease-spring hover:scale-110 hover:rotate-6 active:scale-95 active:-rotate-2 cursor-grab"
          />
        </section>

        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col gap-[120px]">
          
          {/* PROJECTS BENTO GRID */}
          <section id="work" className="flex flex-col gap-10">
            <FadeInSection>
              <h2 className="text-5xl md:text-[81px] font-medium tracking-tighter leading-tight">
                {t.projects.title.split(' ')[0]} <br/> {t.projects.title.split(' ')[1] || ''}.
              </h2>
            </FadeInSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsData.map((proj, index) => (
                <FadeInSection key={proj.id} delay={`${index * 100}ms`}>
                  <a href="#" className="group relative h-[400px] rounded-pill bg-surface-light dark:bg-surface-dark overflow-hidden flex flex-col justify-end p-10 hover:-translate-y-2 transition-all duration-500 ease-spring border border-transparent dark:border-gray-800">
                    <div className="absolute inset-0 w-full h-full p-6">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover rounded-[40px] group-hover:scale-105 transition-transform duration-700 ease-spring" />
                    </div>
                    <div className="relative z-10 bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-md px-6 py-4 rounded-pill self-start shadow-sm flex flex-col gap-1">
                      <span className="font-bold tracking-tight text-lg">{proj.title}</span>
                      <div className="flex gap-2">
                        {proj.tech?.slice(0, 2).map((t, i) => (
                          <span key={i} className="text-[10px] uppercase font-bold px-2 py-1 bg-primary text-white rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                  </a>
                </FadeInSection>
              ))}
            </div>
          </section>

          {/* ABOUT SECTION */}
          <section id="about" className="flex flex-col gap-10">
            <FadeInSection>
              <h2 className="text-5xl md:text-[81px] font-medium tracking-tighter leading-tight">
                {t.about.title}.
              </h2>
            </FadeInSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <FadeInSection delay="100ms">
                <div className="space-y-6 text-lg opacity-90 leading-relaxed">
                  <p>{t.about.p1}</p>
                  <p>{t.about.p2}</p>
                </div>
              </FadeInSection>
              <FadeInSection delay="300ms">
                <div className="w-full aspect-[4/5] rounded-pill overflow-hidden border-8 border-surface-light dark:border-surface-dark relative group">
                  <img src="/images/fotogw.jpeg" alt="Raka Anugrah" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-spring" />
                </div>
              </FadeInSection>
            </div>
          </section>

          {/* SKILLS SECTION */}
          <section id="skills" className="flex flex-col gap-10">
             <FadeInSection>
              <h2 className="text-5xl md:text-[81px] font-medium tracking-tighter leading-tight">
                {t.skills.title}.
              </h2>
            </FadeInSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: t.skills.s1, desc: t.skills.s1Desc },
                { title: t.skills.s2, desc: t.skills.s2Desc },
                { title: t.skills.s3, desc: t.skills.s3Desc },
              ].map((skill, i) => (
                <FadeInSection key={i} delay={`${i * 100}ms`}>
                  <div className="bg-surface-light dark:bg-surface-dark p-10 rounded-pill hover:-translate-y-2 transition-transform duration-500 ease-spring h-full flex flex-col justify-center text-center border border-transparent dark:border-gray-800">
                    <h3 className="text-2xl font-bold mb-4 tracking-tight">{skill.title}</h3>
                    <p className="opacity-70 text-sm leading-relaxed">{skill.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <section id="experience" className="flex flex-col gap-10 pb-20">
            <FadeInSection>
              <h2 className="text-5xl md:text-[81px] font-medium tracking-tighter leading-tight">
                {t.exp.title.split(' ')[0]} <br/> {t.exp.title.split(' ').slice(1).join(' ')}.
              </h2>
            </FadeInSection>
            <div className="flex flex-col gap-6">
              {experiencesData.map((exp, index) => (
                <FadeInSection key={exp.id} delay={`${index * 100}ms`}>
                  <div className="flex flex-col md:flex-row items-center gap-6 bg-surface-light dark:bg-surface-dark p-8 rounded-pill hover:scale-[1.02] transition-transform duration-500 ease-spring border border-transparent dark:border-gray-800">
                    <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-bg-light dark:border-bg-dark shadow-sm">
                       <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-primary font-bold text-xs uppercase tracking-widest mb-1">{exp.role}</p>
                      <h3 className="text-2xl font-bold tracking-tight mb-2">{exp.title}</h3>
                      <p className="opacity-70 text-sm">{lang === 'en' ? exp.descEn : exp.descId}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER & CONTACT */}
      <footer id="contact" className="bg-surface-dark text-white rounded-t-[50px] pt-20 pb-10 px-6 mt-10 relative z-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-6">{t.contact.title}</h2>
          <p className="opacity-70 mb-10 max-w-lg">{t.contact.desc}</p>
          
          <div className="flex gap-4 mb-16">
            <a href="mailto:rakacembol@gmail.com" className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform ease-spring">
              <EmailIcon />
            </a>
            <a href="https://www.linkedin.com/in/raka-anugrah-satya/" target="_blank" rel="noreferrer" className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors ease-spring">
              <LinkedInIcon />
            </a>
            <a href="https://github.com/kaadutz" target="_blank" rel="noreferrer" className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors ease-spring">
              <GithubIcon />
            </a>
          </div>
          
          <div className="opacity-50 text-sm">
            <p>© {new Date().getFullYear()} Raka Anugrah Satya.</p>
            <p>{t.footer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

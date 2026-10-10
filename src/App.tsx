import { useState, useEffect, useRef, useMemo, ReactNode } from 'react';
import characterSvg from './assets/character.svg'; // Pastikan path ini sesuai dengan lokasi SVG/JPG kamu

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Data Projects (Dipertahankan)
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

  // Data Pengalaman (Dipertahankan)
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
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.0

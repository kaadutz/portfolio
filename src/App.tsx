import { useState, useEffect, useRef, useMemo, ReactNode, useCallback } from 'react';

// --- TIPE DATA ---
interface TechItem {
  name: string;
  id: string;
}

interface Project {
  id: number;
  title: string;
  role: Record<'en' | 'id', string>;
  desc: Record<'en' | 'id', string>;
  problem: Record<'en' | 'id', string>;
  result: Record<'en' | 'id', string>;
  image: string;
  tech: TechItem[];
  liveUrl?: string;
  repoUrl?: string;
}

interface PortfolioItem {
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

// --- HELPER UNTUK IKON TEKNOLOGI (CDN DEVICON) ---
const getIconUrl = (id: string) => {
  const iconMap: Record<string, string> = {
    php: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    tailwindcss: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    css3: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    html5: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    react: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    vitejs: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    figma: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    aws: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  };
  return iconMap[id.toLowerCase()] || "";
};

// --- KAMUS BAHASA ---
const dict = {
  en: {
    nav: { work: "Projects", about: "About", skills: "Skills", experience: "Experience", contact: "Contact" },
    hero: {
      role: "Fresh Graduate | Software Engineering",
      titleStart: "Ready to build",
      typewriterWords: ["impactful", "scalable", "efficient", "aesthetic"],
      titleEnd: "digital solutions.",
      desc: "I am a highly motivated Software Engineering fresh graduate from SMKN 71 Jakarta. Fluent in English and equipped with strong technical skills, I am eager to bring fresh perspectives and great teamwork to the professional industry.",
      btnProfile: "See My Profile",
      btnCv: "Download CV"
    },
    projects: {
      title: "Featured Projects",
      problem: "Problem:",
      role: "Role:",
      result: "Result:",
      repo: "Source Code",
      live: "Live Demo"
    },
    building: {
      title: "Currently Building",
      desc: "MieRumah - A digital promotional campaign and website for a local MSME, utilizing aesthetic visual styles to boost digital presence."
    },
    about: {
      title: "About Me",
      p1: "Hello! I'm Raka Anugrah Satya, a Software Engineering fresh graduate from SMK Negeri 71 Jakarta. During my studies, I developed a strong passion for designing and building web systems that are both functional and efficient, such as Point of Sales (POS) applications and digital library platforms.",
      p2: "I possess professional-level English communication skills, validated by an outstanding TOEIC score of 950—the highest in my school in 2025. Beyond my technical skills, I am highly adaptable and experienced in working within teams, a skill honed through various collaborative projects. I am now eager to bring my enthusiasm, technical foundation, and teamwork skills to start my professional career in the tech industry.",
    },
    skills: {
      title: "Core Competencies",
      tech: "Technologies I Use",
      s1: "Web Development",
      s1Desc: "Skilled in full-stack development using modern frameworks, with entry-level knowledge of Cloud Computing (AWS).",
      s2: "English Proficiency",
      s2Desc: "Achieved an outstanding TOEIC score of 950 in 2025 (highest in school). Demonstrates professional-level English for global business.",
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
    nav: { work: "Proyek", about: "Tentang", skills: "Keahlian", experience: "Pengalaman", contact: "Kontak" },
    hero: {
      role: "Lulusan Baru | Rekayasa Perangkat Lunak",
      titleStart: "Siap membangun",
      typewriterWords: ["solusi", "sistem", "aplikasi", "karya"],
      titleEnd: "digital.",
      desc: "Saya adalah lulusan baru (Fresh Graduate) jurusan Rekayasa Perangkat Lunak dari SMKN 71 Jakarta. Memiliki motivasi tinggi, mahir berbahasa Inggris, dan siap memberikan kemampuan teknis serta kolaborasi tim yang hebat di dunia industri.",
      btnProfile: "Lihat Profil",
      btnCv: "Unduh CV"
    },
    projects: {
      title: "Sorotan Proyek",
      problem: "Masalah:",
      role: "Peran:",
      result: "Hasil:",
      repo: "Kode Sumber",
      live: "Demo Langsung"
    },
    building: {
      title: "Sedang Dibangun",
      desc: "MieRumah - Kampanye promosi digital dan website untuk UMKM lokal, memanfaatkan gaya visual estetik untuk meningkatkan kehadiran digital."
    },
    about: {
      title: "Tentang Saya",
      p1: "Halo! Saya Raka Anugrah Satya, lulusan baru (fresh graduate) jurusan Rekayasa Perangkat Lunak dari SMK Negeri 71 Jakarta. Selama masa studi, saya menemukan minat yang besar dalam merancang dan membangun sistem web yang fungsional dan efisien, seperti aplikasi sistem kasir (POS) dan platform perpustakaan digital.",
      p2: "Saya memiliki kemampuan komunikasi bahasa Inggris yang profesional, dibuktikan dengan skor TOEIC 950 (tertinggi di sekolah pada tahun 2025). Selain keahlian teknis, saya adalah pribadi yang adaptif dan terbiasa bekerja dalam tim, yang terasah melalui berbagai proyek kreatif dan kolaborasi selama masa studi. Saat ini, saya sangat antusias mencari peluang untuk memulai karier dan memberikan kontribusi nyata di industri teknologi.",
    },
    skills: {
      title: "Kompetensi Utama",
      tech: "Teknologi yang Saya Gunakan",
      s1: "Pengembangan Web",
      s1Desc: "Mahir dalam pengembangan full-stack menggunakan framework modern, disertai pemahaman dasar arsitektur Cloud Computing (AWS).",
      s2: "Kemampuan Bahasa Inggris",
      s2Desc: "Skor TOEIC 950 pada tahun 2025 (tertinggi di sekolah). Menunjukkan kemahiran bahasa Inggris profesional untuk bisnis.",
      s3: "Adaptabilitas & Kerja Tim",
      s3Desc: "Terbukti mampu beradaptasi dengan cepat, memimpin proyek kreatif, dan berkolaborasi secara efektif di lingkungan profesional."
    },
    exp: {
      title: "Pengalaman & Penghargaan",
      photoHint: "[ Masukkan Foto ]"
    },
    contact: {
      title: "Mari terhubung dan berkembang.",
      desc: "Baik untuk posisi entry-level, magang, atau proyek kolaborasi, saya siap berkontribusi dan belajar. Jangan ragu untuk menghubungi saya!",
      btn: "Hubungi Saya"
    },
    footer: "Siap berkontribusi untuk industri digital."
  }
};

// --- DATA PROYEK & PENGALAMAN ---
const projectsData: Project[] = [
  {
    id: 1,
    title: "Libraria - E-Library Platform",
    role: {
      en: "Fullstack Developer (Designed database structure, UI, and application logic).",
      id: "Fullstack Developer (Merancang struktur database, antarmuka pengguna, dan alur aplikasi)."
    },
    desc: {
      en: "A digital library management system built to efficiently handle book inventories.",
      id: "Sistem manajemen perpustakaan digital untuk mengelola inventaris buku secara efisien."
    },
    problem: {
      en: "A structured digital book management system was needed to replace inefficient manual logging.",
      id: "Kebutuhan akan sistem manajemen buku digital yang terstruktur untuk mengatasi pencatatan manual yang kurang rapi."
    },
    result: {
      en: "Delivered a fully functional digital library platform, streamlining book inventory tracking seamlessly.",
      id: "Menghasilkan platform perpustakaan digital yang fungsional, mempermudah pelacakan inventaris buku secara otomatis."
    },
    image: "/images/projeklibraria.jpg",
    tech: [
      { name: "PHP", id: "php" }, { name: "MySQL", id: "mysql" }, 
      { name: "JavaScript", id: "javascript" }, { name: "Tailwind", id: "tailwindcss" }
    ],
    repoUrl: "https://github.com/kaadutz/libraria-v1.git"
  },
  {
    id: 2,
    title: "Point of Sales (Sistem Kasir)",
    role: {
      en: "Fullstack Developer (Built transaction calculation logic, stock management, and point integration).",
      id: "Fullstack Developer (Membangun logika perhitungan transaksi, manajemen stok, dan integrasi poin loyalitas)."
    },
    desc: {
      en: "A POS system designed to manage daily transactions and print receipts.",
      id: "Sistem kasir fungsional untuk mengelola transaksi harian dan mencetak struk."
    },
    problem: {
      en: "Cashiers required an integrated transaction system with loyalty point features to minimize human error.",
      id: "Dibutuhkan sistem pencatatan transaksi terintegrasi dengan fitur poin loyalitas untuk meminimalisir human error."
    },
    result: {
      en: "Successfully implemented the POS system, drastically cutting down manual data recap errors.",
      id: "Sistem POS berhasil diimplementasikan, memangkas waktu rekap data manual dan menekan kesalahan perhitungan."
    },
    image: "/images/projekkasir.jpg",
    tech: [
      { name: "PHP", id: "php" }, { name: "MySQL", id: "mysql" }, 
      { name: "JavaScript", id: "javascript" }, { name: "CSS", id: "css3" }
    ]
  },
  {
    id: 3,
    title: "E-Parking System",
    role: {
      en: "Fullstack Developer (Integrated USB scanners & webcams into a web-based system).",
      id: "Fullstack Developer (Mengintegrasikan hardware scanner USB & webcam ke dalam sistem berbasis web)."
    },
    desc: {
      en: "A digital parking management system designed to track vehicle entry/exit.",
      id: "Sistem manajemen parkir digital untuk melacak keluar/masuk kendaraan."
    },
    problem: {
      en: "Conventional parking processes were slow and needed automated tracking with dynamic tariffs.",
      id: "Proses parkir konvensional tergolong lambat dan membutuhkan pelacakan kendaraan otomatis dengan perhitungan tarif dinamis."
    },
    result: {
      en: "Accelerated vehicle entry/exit processes with unique barcode ticketing and accurate progressive tariffs.",
      id: "Mempercepat proses keluar-masuk kendaraan dengan tiket barcode unik dan perhitungan tarif progresif otomatis yang akurat."
    },
    image: "/images/projekparkir.jpg",
    tech: [
      { name: "PHP", id: "php" }, { name: "MySQL", id: "mysql" }, { name: "JavaScript", id: "javascript" }
    ],
    repoUrl: "https://github.com/kaadutz/parkirkita.git"
  },
  {
    id: 4,
    title: "Five'r - Multimedia Campaign",
    role: {
      en: "Fullstack Developer (Built an interactive landing page with aesthetic visual elements).",
      id: "Fullstack Developer (Membangun landing page interaktif dengan elemen animasi visual estetik)."
    },
    desc: {
      en: "A creative digital promotional campaign for traditional Indonesian snacks.",
      id: "Kampanye promosi digital kreatif untuk jajanan tradisional Indonesia."
    },
    problem: {
      en: "The local MSME lacked a digital presence and an engaging visual promotional strategy to reach a wider market.",
      id: "UMKM lokal membutuhkan presensi digital dan strategi promosi visual yang menarik untuk menjangkau pasar yang lebih luas."
    },
    result: {
      en: "Elevated brand awareness and directly contributed to a notable increase in MSME product sales.",
      id: "Meningkatkan kesadaran merek (brand awareness) dan secara langsung berkontribusi pada peningkatan volume penjualan produk."
    },
    image: "/images/projekfiver.jpg",
    tech: [
      { name: "React", id: "react" }, { name: "Vite", id: "vitejs" }, 
      { name: "Tailwind", id: "tailwindcss" }, { name: "Figma", id: "figma" }
    ],
    liveUrl: "https://fiver-ntb.vercel.app/"
  }
];

const experiencesData: PortfolioItem[] = [
  {
    id: 1,
    title: "Internship (Praktik Kerja Lapangan)",
    role: "Logistics & Admin at PT. Telkom Akses",
    descEn: "Responsible for stock opname procedures and logistics management for hardware/NTE (May 5 - Sept 4, 2025).",
    descId: "Bertanggung jawab atas prosedur pelaksanaan stock opname dan manajemen logistik perangkat keras (5 Mei - 4 Sept 2025).",
    image: "/images/pkl1.jpeg" 
  },
  {
    id: 2,
    title: "TOEIC Certification (Score: 950)",
    role: "English Proficiency Award",
    descEn: "Achieved the highest TOEIC score in school with a 950 in 2025. Ready for global business communication.",
    descId: "Meraih skor TOEIC tertinggi di sekolah (950) pada tahun 2025. Siap untuk komunikasi bisnis global.",
    image: "/images/toeic.jpeg" 
  },
  {
    id: 3,
    title: "RPL Competency Certification",
    role: "Software Engineering Certification",
    descEn: "Successfully passed the RPL competency certification, validating skills in web development and databases.",
    descId: "Lulus uji sertifikasi kompetensi Rekayasa Perangkat Lunak (RPL) untuk pengembangan web dan basis data.",
    image: "/images/usk.jpeg" 
  }
];

// --- ICONS ---
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

// --- CUSTOM COMPONENTS ---
const CursorSpotlight = () => {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [isHoverable, setIsHoverable] = useState(false);

  useEffect(() => {
    setIsHoverable(window.matchMedia('(hover: hover)').matches);
    const handleMouseMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    if (isHoverable) window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHoverable]);

  if (!isHoverable) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-300"
      style={{ background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(100, 116, 139, 0.08), transparent 40%)` }}
    />
  );
};

const FloatingParticles = () => {
  const prefersReduced = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  
  const particles = useMemo(() => {
    if (prefersReduced) return [];
    const count = window.innerWidth < 768 ? 12 : 25; 
    return Array.from({ length: count }).map((_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 3 + 1, duration: Math.random() * 10 + 10, delay: Math.random() * 5,
    }));
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatUp {
          0% { transform: translateY(0px) scale(1); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-150px) scale(1.5); opacity: 0; }
        }
      ` }} />
      {particles.map((p) => (
        <div key={p.id} className="absolute rounded-full bg-primary/40 dark:bg-tertiary-fixed/40 blur-[1px]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, animation: `floatUp ${p.duration}s infinite ease-in-out ${p.delay}s` }}
        />
      ))}
    </div>
  );
};

const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const prefersReduced = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  useEffect(() => {
    if (prefersReduced) {
      setSubIndex(words[0].length);
      return;
    }
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
    const timeout = setTimeout(() => setSubIndex((prev) => prev + (reverse ? -1 : 1)), reverse ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, prefersReduced]);

  return (
    <span className="italic text-primary dark:text-tertiary-fixed inline-block text-center">
      {prefersReduced ? words[0] : words[index]?.substring(0, subIndex)}
      {!prefersReduced && <span className="animate-pulse">|</span>}
    </span>
  );
};

const FadeInSection = ({ children, delay = '0ms' }: FadeInSectionProps) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(true);
      return;
    }
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
  }, [prefersReduced]);

  return (
    <div ref={domRef} className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: prefersReduced ? '0ms' : delay }}>
      {children}
    </div>
  );
};

// --- KOMPONEN UTAMA ---
function App(): JSX.Element {
  // Preferensi Tema dan Bahasa disimpan di localStorage
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [lang, setLang] = useState<'en' | 'id'>(() =>
    (localStorage.getItem('lang') as 'en' | 'id') ?? (navigator.language.startsWith('id') ? 'id' : 'en')
  );
  
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const t = dict[lang];

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Efek Scroll & Deteksi Section Aktif (IntersectionObserver)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-30% 0px -70% 0px' });

    const sections = ['work', 'about', 'skills', 'experience', 'contact'];
    sections.forEach(sec => {
      const el = document.getElementById(sec);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Aksesibilitas Menu Mobile
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMobileMenu(); };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen, closeMobileMenu]);

  // List Tech Stack untuk animasi Marquee
  const allTechSkills: TechItem[] = [
    { name: 'React', id: 'react' },
    { name: 'TypeScript', id: 'typescript' },
    { name: 'Tailwind', id: 'tailwindcss' },
    { name: 'PHP', id: 'php' },
    { name: 'MySQL', id: 'mysql' },
    { name: 'JavaScript', id: 'javascript' },
    { name: 'AWS', id: 'aws' },
    { name: 'Git', id: 'git' },
    { name: 'HTML5', id: 'html5' },
    { name: 'CSS3', id: 'css3' },
  ];

  return (
    <div className="bg-background text-on-background dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col overflow-x-hidden scroll-smooth selection:bg-primary-container selection:text-on-primary-container transition-colors duration-500 relative">
      <div className="fixed inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <CursorSpotlight />

      {/* --- NAVBAR --- */}
      <header className={`fixed top-0 left-0 right-0 z-[110] flex justify-center transition-all duration-500 ease-in-out pointer-events-none ${isScrolled ? 'pt-4 px-4' : 'pt-0 px-0'}`}>
        <nav className={`pointer-events-auto w-full transition-all duration-500 ease-in-out overflow-hidden flex items-center justify-between md:justify-center ${isScrolled ? 'max-w-[100%] md:max-w-max bg-background/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl rounded-full border border-outline-variant/30 dark:border-gray-700/50' : 'max-w-full bg-background/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-sm rounded-none border-b border-outline-variant/10 dark:border-gray-800'}`}>
          <div className={`flex items-center justify-between md:justify-center w-full max-w-7xl mx-auto transition-all duration-500 ${isScrolled ? 'py-3 px-4 md:px-6 gap-4 md:gap-8' : 'py-4 px-6 md:px-12 gap-4'}`}>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-expanded={isMobileMenuOpen} aria-label="Toggle Menu" className="md:hidden text-on-surface-variant dark:text-gray-300 hover:text-primary transition-colors p-1">
              <span className="material-symbols-outlined text-2xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>

            <ul className="hidden md:flex items-center justify-center gap-4 font-label text-sm uppercase tracking-widest font-bold">
              {['work', 'about', 'skills', 'experience', 'contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className={`px-4 py-2 block transition-colors duration-300 ${activeSection === item ? 'text-primary dark:text-primary-fixed' : 'text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-primary-fixed'}`}>
                    {t.nav[item as keyof typeof t.nav]}
                  </a>
                </li>
              ))}
            </ul>

            <div className={`flex items-center gap-2 md:pl-4 transition-all duration-500 shrink-0 ${isScrolled ? 'border-none md:border-l md:border-outline-variant/30 md:dark:border-gray-700' : 'md:border-l border-outline-variant/30 dark:border-gray-700'}`}>
              <button onClick={() => setLang(lang === 'en' ? 'id' : 'en')} className="font-label font-bold text-sm text-on-background dark:text-gray-200 hover:text-primary transition-colors px-2">
                {lang === 'en' ? 'ID' : 'EN'}
              </button>
              <button onClick={() => setIsDark(!isDark)} aria-label="Toggle Dark Mode" className="text-on-background dark:text-gray-200 hover:text-primary transition-colors flex items-center bg-surface/50 dark:bg-gray-800/50 backdrop-blur-sm p-1.5 md:p-2 rounded-full shadow-sm z-50 border border-outline-variant/20 dark:border-gray-700">
                <span className="material-symbols-outlined text-lg md:text-xl">{isDark ? 'light_mode' : 'dark_mode'}</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* --- MOBILE MENU --- */}
      <div className={`fixed inset-0 z-[100] bg-background/95 dark:bg-gray-900/95 backdrop-blur-lg flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <ul className="flex flex-col items-center gap-8 font-headline text-2xl uppercase tracking-widest font-bold">
          {['work', 'about', 'skills', 'experience', 'contact'].map((item) => (
            <li key={item} className="overflow-hidden">
              <a href={`#${item}`} onClick={closeMobileMenu} className={`block transform transition-transform duration-500 ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'} ${activeSection === item ? 'text-primary dark:text-primary-fixed' : 'text-on-background dark:text-gray-200 hover:text-primary'}`}>
                {t.nav[item as keyof typeof t.nav]}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <main className="flex-grow">
        {/* --- HERO SECTION --- */}
        <section className="relative pt-40 pb-48 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen overflow-hidden z-10">
          <FloatingParticles />
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-surface-container-low dark:bg-primary-container/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse z-0"></div>
          <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-tertiary-container dark:bg-tertiary-container/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
            <FadeInSection>
              <p className="font-label text-xs md:text-sm uppercase tracking-[0.15em] text-tertiary dark:text-tertiary-fixed font-bold mb-4 bg-tertiary/10 dark:bg-tertiary-fixed/10 inline-block px-4 py-2 rounded-full border border-tertiary/20">
                {t.hero.role}
              </p>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-medium leading-tight tracking-tight mt-6 flex flex-col items-center justify-center">
                <span className="block mb-2 bg-gradient-to-r from-primary to-tertiary dark:from-primary-fixed dark:to-purple-400 bg-clip-text text-transparent pb-2">{t.hero.titleStart}</span>
                <span className="block h-[1.3em] min-h-[1.3em] overflow-hidden text-on-background dark:text-white"><Typewriter words={t.hero.typewriterWords} /></span>
                <span className="block mt-2 text-on-background dark:text-white">{t.hero.titleEnd}</span>
              </h1>
            </FadeInSection>
            
            <FadeInSection delay="200ms">
              <p className="font-body text-lg md:text-xl text-on-surface-variant dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mt-8 bg-background/50 dark:bg-gray-900/50 backdrop-blur-sm p-4 rounded-2xl">
                {t.hero.desc}
              </p>
              <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#about" className="group relative z-20 w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary dark:text-white rounded-xl font-label font-bold tracking-wide hover:bg-primary-fixed-dim dark:hover:bg-primary-fixed transition-all duration-300 shadow-lg hover:-translate-y-1">
                  {t.hero.btnProfile} <span className="material-symbols-outlined ml-2 transform group-hover:translate-y-1 transition-transform">arrow_downward</span>
                </a>
                <a href="/files/CV_Raka_Anugrah_Satya.pdf" download className="group relative z-20 w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-surface dark:bg-gray-800 text-on-surface dark:text-white border border-outline-variant/30 rounded-xl font-label font-bold tracking-wide hover:border-primary transition-all duration-300 hover:-translate-y-1">
                  {t.hero.btnCv} <span className="material-symbols-outlined ml-2">download</span>
                </a>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section id="work" className="scroll-mt-24 pt-32 pb-48 px-6 md:px-12 bg-surface-container-lowest/50 dark:bg-gray-900/50 relative overflow-hidden z-20 -mt-24 rounded-t-[3rem] border-t border-outline-variant/20 dark:border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="max-w-6xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-16">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background dark:text-white">{t.projects.title}</h2>
                <div className="h-px bg-outline-variant/50 dark:bg-gray-800 flex-grow ml-8 hidden md:block"></div>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsData.map((proj, index) => (
                <FadeInSection key={proj.id} delay={`${index * 150}ms`}>
                  <div className="group flex flex-col h-full bg-white/50 dark:bg-gray-800/30 backdrop-blur-md rounded-3xl overflow-hidden border border-outline-variant/30 dark:border-gray-700/50 hover:border-primary/50 dark:hover:border-primary-fixed/50 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-lg">
                    
                    <div className="relative w-full aspect-video overflow-hidden bg-surface-variant/50 dark:bg-gray-900/50">
                      <img src={proj.image} alt={proj.title} loading="lazy" decoding="async" className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                    </div>
                    
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <h3 className="font-headline text-2xl text-on-background dark:text-white mb-3">{proj.title}</h3>
                      
                      {/* Tech Badges with Icons */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {proj.tech.map((t, i) => (
                          <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] sm:text-xs font-bold font-label rounded-md bg-surface-variant/50 dark:bg-gray-700/50 text-on-surface-variant dark:text-gray-200 border border-outline-variant/20">
                            {getIconUrl(t.id) && <img src={getIconUrl(t.id)} alt={t.name} className="w-3.5 h-3.5 object-contain" />}
                            {t.name}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-4 font-body text-sm md:text-base text-on-surface-variant dark:text-gray-400 mb-6 flex-grow">
                        <p><strong>{t.projects.problem}</strong> {proj.problem[lang]}</p>
                        <p><strong>{t.projects.role}</strong> {proj.role[lang]}</p>
                        <p><strong>{t.projects.result}</strong> <span className="text-primary dark:text-primary-fixed font-medium">{proj.result[lang]}</span></p>
                      </div>

                      <div className="flex gap-4 mt-auto">
                        {proj.repoUrl && (
                          <a href={proj.repoUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm font-bold text-on-background dark:text-gray-300 hover:text-primary transition-colors"><GithubIcon /><span className="ml-2">{t.projects.repo}</span></a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm font-bold text-on-background dark:text-gray-300 hover:text-primary transition-colors"><span className="material-symbols-outlined mr-1 text-[20px]">open_in_new</span>{t.projects.live}</a>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>

            {/* Currently Building */}
            <FadeInSection delay="300ms">
              <div className="mt-16 bg-tertiary-container/30 dark:bg-tertiary-container/10 border border-tertiary/20 dark:border-tertiary/10 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="bg-tertiary/20 p-4 rounded-full flex-shrink-0"><span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed text-4xl animate-pulse">construction</span></div>
                <div>
                  <h3 className="font-headline text-2xl text-on-background dark:text-white mb-2">{t.building.title}</h3>
                  <p className="font-body text-on-surface-variant dark:text-gray-400">{t.building.desc}</p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section id="about" className="scroll-mt-24 pt-32 pb-48 px-6 md:px-12 bg-surface-container/80 dark:bg-gray-800/80 relative z-30 -mt-24 rounded-t-[3rem] border-t border-outline-variant/20 dark:border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
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
                <div className="flex items-center justify-center lg:justify-end">
                  <div className="w-full max-w-md aspect-[4/5] overflow-hidden rounded-2xl bg-surface-variant dark:bg-gray-800 shadow-md flex flex-col items-center justify-center relative group border-4 border-white/50 dark:border-gray-700/50">
                    <img alt="Raka Anugrah Satya Profile" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" src="/images/fotogw.jpeg" />
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* --- SKILLS SECTION --- */}
        <section id="skills" className="scroll-mt-24 pt-32 pb-48 px-6 md:px-12 bg-surface-container-low/80 dark:bg-gray-900/80 relative z-40 -mt-24 rounded-t-[3rem] border-t border-outline-variant/20 dark:border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-20">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background dark:text-white">{t.skills.title}</h2>
                <div className="h-px bg-outline-variant/50 dark:bg-gray-800 flex-grow ml-8 hidden md:block"></div>
              </div>
            </FadeInSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <FadeInSection delay="100ms">
                <div className="bg-white/50 dark:bg-gray-800/30 p-8 rounded-2xl border border-outline-variant/30 dark:border-gray-700/50 hover:border-primary/50 dark:hover:border-primary-fixed/50 transition-all h-full">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed text-4xl mb-6 bg-primary/10 dark:bg-primary-fixed/10 p-4 rounded-xl inline-block">computer</span>
                  <h3 className="font-headline text-2xl text-on-background dark:text-white mb-3">{t.skills.s1}</h3>
                  <p className="font-body text-on-surface-variant dark:text-gray-400">{t.skills.s1Desc}</p>
                </div>
              </FadeInSection>
              <FadeInSection delay="200ms">
                <div className="bg-white/50 dark:bg-gray-800/30 p-8 rounded-2xl border border-outline-variant/30 dark:border-gray-700/50 hover:border-tertiary/50 transition-all h-full">
                  <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed text-4xl mb-6 bg-tertiary/10 dark:bg-tertiary-fixed/10 p-4 rounded-xl inline-block">language</span>
                  <h3 className="font-headline text-2xl text-on-background dark:text-white mb-3">{t.skills.s2}</h3>
                  <p className="font-body text-on-surface-variant dark:text-gray-400">{t.skills.s2Desc}</p>
                </div>
              </FadeInSection>
              <FadeInSection delay="300ms">
                <div className="bg-white/50 dark:bg-gray-800/30 p-8 rounded-2xl border border-outline-variant/30 dark:border-gray-700/50 hover:border-primary/50 transition-all h-full">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed text-4xl mb-6 bg-primary/10 dark:bg-primary-fixed/10 p-4 rounded-xl inline-block">groups</span>
                  <h3 className="font-headline text-2xl text-on-background dark:text-white mb-3">{t.skills.s3}</h3>
                  <p className="font-body text-on-surface-variant dark:text-gray-400">{t.skills.s3Desc}</p>
                </div>
              </FadeInSection>
            </div>
            
            {/* Tech Stack Marquee Animation */}
            <FadeInSection delay="400ms">
              <div className="text-center">
                <h4 className="font-label text-sm uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-8">{t.skills.tech}</h4>
                
                <div className="relative w-full overflow-hidden flex bg-surface-variant/20 dark:bg-gray-800/30 py-8 rounded-3xl border border-outline-variant/20">
                  <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
                    {/* Render dua kali untuk ilusi infinite loop */}
                    {[...allTechSkills, ...allTechSkills].map((tech, i) => (
                      <div key={i} className="inline-flex flex-col items-center justify-center w-32 shrink-0 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 cursor-default">
                        <img src={getIconUrl(tech.id)} alt={tech.name} className="h-12 w-12 md:h-14 md:w-14 object-contain mb-4 drop-shadow-sm" />
                        <span className="font-label text-[10px] md:text-xs font-bold tracking-widest text-on-surface-variant dark:text-gray-400">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CSS untuk Marquee */}
                  <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes marquee {
                      0% { transform: translateX(0); }
                      100% { transform: translateX(-50%); } 
                    }
                    .animate-marquee {
                      animation: marquee 20s linear infinite;
                      width: max-content;
                    }
                  `}} />
                </div>

              </div>
            </FadeInSection>
          </div>
        </section>

        {/* --- EXPERIENCE SECTION --- */}
        <section id="experience" className="scroll-mt-24 pt-32 pb-48 px-6 md:px-12 bg-surface/80 dark:bg-gray-800/60 relative z-50 -mt-24 rounded-t-[3rem] border-t border-outline-variant/20 dark:border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="max-w-5xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-16">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background dark:text-white">{t.exp.title}</h2>
                <div className="h-px bg-outline-variant/50 dark:bg-gray-700 flex-grow ml-8 hidden md:block"></div>
              </div>
            </FadeInSection>
            <div className="space-y-8">
              {experiencesData.map((exp, index) => (
                <FadeInSection key={exp.id} delay={`${index * 150}ms`}>
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-outline-variant/20 dark:border-gray-700/50 hover:border-primary/50 transition-colors shadow-sm group">
                    <div className="w-full md:w-1/3 aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden bg-surface-variant/50 dark:bg-gray-800 shrink-0 relative">
                      <img src={exp.image} alt={exp.title} loading="lazy" decoding="async" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center flex-grow">
                      <p className="font-label text-sm text-primary dark:text-primary-fixed font-bold uppercase tracking-widest mb-2">{exp.role}</p>
                      <h3 className="font-headline text-2xl md:text-3xl text-on-background dark:text-white mb-4">{exp.title}</h3>
                      <p className="font-body text-sm md:text-base text-on-surface-variant dark:text-gray-400 leading-relaxed">
                        {lang === 'en' ? exp.descEn : exp.descId}
                      </p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="scroll-mt-24 pt-32 pb-40 px-6 md:px-12 bg-secondary-container/90 dark:bg-gray-900/90 relative overflow-hidden z-[60] -mt-24 rounded-t-[3rem] border-t border-outline-variant/20 dark:border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-tertiary-container dark:bg-tertiary-container/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2 z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container dark:bg-primary-container/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2 z-0"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-20">
            <FadeInSection>
              <h2 className="font-headline text-4xl md:text-6xl text-on-secondary-container dark:text-white mb-8">{t.contact.title}</h2>
              <p className="font-body text-base md:text-xl text-on-surface-variant dark:text-gray-400 mb-12 max-w-2xl mx-auto">{t.contact.desc}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="mailto:rakacembol@gmail.com" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-primary dark:bg-primary-fixed text-on-primary dark:text-black rounded-xl font-label font-bold text-sm md:text-base tracking-wide hover:bg-primary-fixed-dim dark:hover:bg-primary transition-colors shadow-lg hover:-translate-y-1">
                  <span className="material-symbols-outlined mr-3">mail</span> {t.contact.btn}
                </a>
                <a href="https://www.linkedin.com/in/raka-anugrah-satya/" target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-surface dark:bg-gray-800 text-on-surface dark:text-white border border-outline-variant/30 rounded-xl font-label font-bold text-sm md:text-base tracking-wide hover:border-primary transition-all hover:-translate-y-1">
                  <LinkedInIcon /> <span className="ml-3">LinkedIn</span>
                </a>
                <a href="https://github.com/kaadutz" target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-surface dark:bg-gray-800 text-on-surface dark:text-white border border-outline-variant/30 rounded-xl font-label font-bold text-sm md:text-base tracking-wide hover:border-primary transition-all hover:-translate-y-1">
                  <GithubIcon /> <span className="ml-3">GitHub</span>
                </a>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-inverse-surface dark:bg-black relative z-[70] rounded-t-[3rem] -mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 py-12 gap-8 max-w-7xl mx-auto">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-headline text-lg md:text-xl text-tertiary-fixed dark:text-gray-200 block">Raka Anugrah Satya</span>
            <p className="font-body text-xs md:text-sm text-tertiary-fixed-dim dark:text-gray-500 max-w-xs mx-auto md:mx-0 leading-relaxed">
              © {new Date().getFullYear()} Raka Anugrah Satya. <br/> {t.footer}
            </p>
          </div>
          
          <ul className="flex items-center gap-6 font-label text-sm tracking-wide">
            <li><a className="text-tertiary-fixed dark:text-gray-400 hover:text-white transition-colors flex items-center gap-2" href="https://www.linkedin.com/in/raka-anugrah-satya/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a></li>
            <li><a className="text-tertiary-fixed dark:text-gray-400 hover:text-white transition-colors flex items-center gap-2" href="https://www.instagram.com/rakaa_204/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a></li>
            <li><a className="text-tertiary-fixed dark:text-gray-400 hover:text-white transition-colors flex items-center gap-2" href="https://github.com/kaadutz" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a></li>
            <li><a className="text-tertiary-fixed dark:text-gray-400 hover:text-white transition-colors flex items-center gap-2" href="mailto:rakacembol@gmail.com" aria-label="Email"><EmailIcon /></a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;

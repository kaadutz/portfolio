import { useState, useEffect, useRef, ReactNode, useCallback } from 'react';

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
      desc: "I am a highly motivated Software Engineering fresh graduate from SMKN 71 Jakarta. Fluent in English and equipped with strong technical skills, I am eager to bring fresh perspectives and great teamwork to the professional industry.",
      btn: "See My Profile"
    },
    projects: { title: "Featured Projects", viewProject: "View Project" },
    about: {
      title: "About Me",
      p1: "Hello! I'm Raka Anugrah Satya, a Software Engineering fresh graduate from SMK Negeri 71 Jakarta. During my studies, I developed a strong passion for designing and building web systems that are both functional and efficient, such as Point of Sales (POS) applications and digital library platforms.",
      p2: "I possess professional-level English communication skills, validated by an outstanding TOEIC score of 950—the highest in my school in 2025. Beyond my technical skills, I am highly adaptable and experienced in working within teams, a skill honed through various collaborative projects. I am now eager to bring my enthusiasm, technical foundation, and teamwork skills to start my professional career in the tech industry.",
    },
    skills: {
      title: "Core Competencies",
      s1: "Web Development",
      s1Desc: "Capable of building responsive and functional websites using technologies like PHP, MySQL, React, and Tailwind CSS.",
      s2: "English Proficiency",
      s2Desc: "Achieved an outstanding TOEIC score of 950 in 2025 (the highest in the school at that time), improving from 920 in 2024. Demonstrates a highly professional level of English for global communication.",
      s3: "Adaptability & Collaboration",
      s3Desc: "Proven ability to adapt quickly, lead creative projects, and collaborate effectively within professional environments."
    },
    exp: { title: "Experience & Awards", photoHint: "[ Insert Photo ]" },
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
      desc: "Saya adalah lulusan baru (Fresh Graduate) jurusan Rekayasa Perangkat Lunak dari SMKN 71 Jakarta. Memiliki motivasi tinggi, mahir berbahasa Inggris, dan siap memberikan kemampuan teknis serta kolaborasi tim yang hebat di dunia industri.",
      btn: "Lihat Profil Saya"
    },
    projects: { title: "Sorotan Proyek", viewProject: "Lihat Proyek" },
    about: {
      title: "Tentang Saya",
      p1: "Halo! Saya Raka Anugrah Satya, lulusan baru (fresh graduate) jurusan Rekayasa Perangkat Lunak dari SMK Negeri 71 Jakarta. Selama masa studi, saya menemukan minat yang besar dalam merancang dan membangun sistem web yang fungsional dan efisien, seperti aplikasi sistem kasir (POS) dan platform perpustakaan digital.",
      p2: "Saya memiliki kemampuan komunikasi bahasa Inggris yang profesional, dibuktikan dengan skor TOEIC 950 (tertinggi di sekolah pada tahun 2025). Selain keahlian teknis, saya adalah pribadi yang adaptif dan terbiasa bekerja dalam tim, yang terasah melalui berbagai proyek kreatif dan kolaborasi selama masa studi. Saat ini, saya sangat antusias mencari peluang untuk memulai karier dan memberikan kontribusi nyata di industri teknologi.",
    },
    skills: {
      title: "Kompetensi Utama",
      s1: "Pengembangan Web",
      s1Desc: "Mampu membangun website yang responsif dan fungsional menggunakan teknologi seperti PHP, MySQL, React, dan Tailwind CSS.",
      s2: "Kemampuan Bahasa Inggris",
      s2Desc: "Meraih skor TOEIC 950 pada tahun 2025 (tertinggi di sekolah saat itu), meningkat dari skor 920 di tahun 2024. Menunjukkan tingkat kemahiran bahasa Inggris profesional untuk komunikasi global.",
      s3: "Adaptabilitas & Kolaborasi Tim",
      s3Desc: "Terbukti mampu beradaptasi dengan cepat, memimpin proyek kreatif, dan berkolaborasi secara efektif di lingkungan profesional."
    },
    exp: { title: "Pengalaman & Penghargaan", photoHint: "[ Masukkan Foto ]" },
    contact: {
      title: "Mari terhubung dan berkembang bersama.",
      desc: "Baik untuk posisi entry-level, magang, atau proyek kolaborasi, saya siap berkontribusi dan belajar. Jangan ragu untuk menghubungi saya!",
      btn: "Hubungi Saya"
    },
    footer: "Siap berkontribusi untuk industri digital."
  }
};

// ─── ANIMATED DOT GRID BACKGROUND ───────────────────────────────────────────
const DotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = 30;
    const rows = 20;
    const spacing = { x: 0, y: 0 };
    const dots: { bx: number; by: number; x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      spacing.x = canvas.width / (cols - 1);
      spacing.y = canvas.height / (rows - 1);
      dots.length = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ bx: c * spacing.x, by: r * spacing.y, x: c * spacing.x, y: r * spacing.y, vx: 0, vy: 0 });
        }
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const src = 'touches' in e ? e.touches[0] : e;
      mouseRef.current = { x: src.clientX - rect.left, y: src.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });

    const isDarkMode = () => document.documentElement.classList.contains('dark');

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const d of dots) {
        const dx = mx - d.bx;
        const dy = my - d.by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 120;
        const force = Math.max(0, 1 - dist / radius);
        const tx = d.bx - dx * force * 0.35;
        const ty = d.by - dy * force * 0.35;

        d.vx += (tx - d.x) * 0.12;
        d.vy += (ty - d.y) * 0.12;
        d.vx *= 0.78;
        d.vy *= 0.78;
        d.x += d.vx;
        d.y += d.vy;

        const dark = isDarkMode();
        const alpha = dark ? (0.08 + force * 0.25) : (0.12 + force * 0.35);
        const dotR = 1.5 + force * 2.5;
        ctx.beginPath();
        ctx.arc(d.x, d.y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(168,200,255,${alpha})`
          : `rgba(60,90,150,${alpha})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
};

// ─── CUSTOM MAGNETIC CURSOR ──────────────────────────────────────────────────
const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', move);

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.1;
      pos.current.y += (target.current.y - pos.current.y) * 0.1;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onEnter = () => cursorRef.current?.classList.add('cursor-hover');
    const onLeave = () => cursorRef.current?.classList.remove('cursor-hover');
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-300"
        style={{ background: 'rgba(255,255,255,0.85)', willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{ background: '#fff', willChange: 'transform' }}
      />
      <style>{`
        .cursor-hover { transform: scale(2.5) !important; opacity: 0.5; }
        @media (pointer: coarse) { .magnetic-cursor { display: none; } }
      `}</style>
    </>
  );
};

// ─── TYPEWRITER EFFECT HOOK ──────────────────────────────────────────────────
const useTypewriter = (words: string[], speed = 80, pause = 2000) => {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(current.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIdx((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words, speed, pause]);

  return text;
};

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
const AnimatedCounter = ({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = Date.now();
        const tick = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
        };
        tick();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ─── MARQUEE STRIP ───────────────────────────────────────────────────────────
const MarqueeStrip = ({ items }: { items: string[] }) => (
  <div className="overflow-hidden py-5 bg-primary dark:bg-primary-fixed relative z-10 border-y border-primary/20">
    <div className="flex gap-12 animate-marquee whitespace-nowrap">
      {[...items, ...items, ...items].map((item, i) => (
        <span key={i} className="text-on-primary dark:text-black font-label font-bold text-sm uppercase tracking-widest flex items-center gap-4 shrink-0">
          {item}
          <span className="w-1.5 h-1.5 rounded-full bg-on-primary/40 dark:bg-black/40 inline-block" />
        </span>
      ))}
    </div>
  </div>
);

// ─── SCROLL FADE ─────────────────────────────────────────────────────────────
const FadeInSection = ({ children, delay = '0ms' }: FadeInSectionProps) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { setVisible(true); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    const el = domRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

// ─── FLOATING ORBS (enhanced) ─────────────────────────────────────────────────
const FloatingOrbs = () => (
  <>
    <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full pointer-events-none z-0 animate-float-slow"
      style={{ background: 'radial-gradient(circle, var(--md-sys-color-surface-container-low, #e8f5e9) 0%, transparent 70%)', filter: 'blur(40px)', opacity: 0.7 }} />
    <div className="absolute bottom-1/3 right-16 w-64 h-64 rounded-full pointer-events-none z-0 animate-float-medium"
      style={{ background: 'radial-gradient(circle, var(--md-sys-color-tertiary-container, #cce5ff) 0%, transparent 70%)', filter: 'blur(50px)', opacity: 0.45, animationDelay: '2s' }} />
    <div className="absolute top-3/4 left-1/3 w-48 h-48 rounded-full pointer-events-none z-0 animate-float-fast"
      style={{ background: 'radial-gradient(circle, var(--md-sys-color-primary-container, #dce3ff) 0%, transparent 70%)', filter: 'blur(35px)', opacity: 0.4, animationDelay: '4s' }} />
  </>
);

// ─── GLITCH TEXT ─────────────────────────────────────────────────────────────
const GlitchText = ({ text, className = '' }: { text: string; className?: string }) => (
  <span className={`glitch-text relative inline-block ${className}`} data-text={text}>
    {text}
  </span>
);

// ─── SKILL CARD with animated bar ─────────────────────────────────────────────
const SkillBar = ({ label, pct, delay }: { label: string; pct: number; delay: number }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setWidth(pct), delay);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pct, delay]);

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="font-label text-xs font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-wider">{label}</span>
        <span className="font-label text-xs font-bold text-primary dark:text-primary-fixed">{pct}%</span>
      </div>
      <div className="h-1 bg-outline-variant/30 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-tertiary dark:from-primary-fixed dark:to-tertiary-fixed rounded-full transition-all ease-out"
          style={{ width: `${width}%`, transitionDuration: '1.5s' }}
        />
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function App(): JSX.Element {
  const [currentExpSlide, setCurrentExpSlide] = useState(0);
  const [currentProjSlide, setCurrentProjSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<'en' | 'id'>('en');
  const [isDark, setIsDark] = useState(false);

  const t = dict[lang];

  const typewriterWords = lang === 'en'
    ? ['Web Developer', 'Team Player', 'Problem Solver', 'English Pro']
    : ['Web Developer', 'Tim yang Solid', 'Problem Solver', 'Mahir Inggris'];
  const typedText = useTypewriter(typewriterWords);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projectsData: CarouselItem[] = [
    { id: 1, title: "Libraria - E-Library Platform", descEn: "A digital library management system built to efficiently handle book inventories, user borrowing logs, and digital catalogs.", descId: "Sistem manajemen perpustakaan digital yang dibangun untuk mengelola inventaris buku, log peminjaman, dan katalog digital secara efisien.", image: "" },
    { id: 2, title: "Point of Sales (Sistem Kasir)", descEn: "A functional POS system designed to manage daily transactions, print receipts, and maintain product stock records.", descId: "Sistem kasir fungsional yang dirancang untuk mengelola transaksi harian, mencetak struk, dan memelihara catatan stok produk.", image: "" },
    { id: 3, title: "Stock Opname Dashboard", descEn: "A logistics monitoring dashboard developed to assist in tracking and updating hardware/NTE stock counts accurately.", descId: "Dasbor pemantauan logistik yang dikembangkan untuk membantu melacak dan memperbarui jumlah stok perangkat keras/NTE secara akurat.", image: "" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProjSlide((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [projectsData.length]);

  const experiencesData: CarouselItem[] = [
    { id: 1, title: "Internship (Praktik Kerja Lapangan)", role: "Logistics & Admin at PT. Telkom Akses", descEn: "Responsible for stock opname procedures and logistics management for hardware/NTE. Ensuring inventory data accuracy to support operational efficiency.", descId: "Bertanggung jawab atas prosedur pelaksanaan stock opname dan manajemen logistik untuk perangkat keras/NTE. Memastikan akurasi data inventaris untuk mendukung efisiensi operasional.", image: "" },
    { id: 2, title: "TOEIC Certification (Score: 950)", role: "English Proficiency Award", descEn: "Achieved the highest TOEIC score in school with a 950 in 2025, a significant improvement from 920 in 2024. Demonstrates professional-level English proficiency ready for global business communication.", descId: "Meraih skor TOEIC tertinggi di sekolah dengan nilai 950 pada tahun 2025, meningkat dari skor 920 pada tahun 2024. Menunjukkan tingkat kemahiran bahasa Inggris profesional yang siap untuk komunikasi bisnis global.", image: "" },
    { id: 3, title: "Social Harmony Video Campaign", role: "Project Lead & Technical Role", descEn: "Led a creative video project titled 'Jeda Sejenak', demonstrating strong teamwork, project management, and creative problem-solving skills.", descId: "Memimpin proyek video kreatif berjudul 'Jeda Sejenak', yang membuktikan kemampuan kerja sama tim, manajemen proyek, dan pemecahan masalah kreatif.", image: "" }
  ];

  const nextExpSlide = () => setCurrentExpSlide((prev) => (prev === experiencesData.length - 1 ? 0 : prev + 1));
  const prevExpSlide = () => setCurrentExpSlide((prev) => (prev === 0 ? experiencesData.length - 1 : prev - 1));

  const marqueeItems = ['Web Development', 'TOEIC 950', 'React & PHP', 'Team Collaboration', 'Problem Solving', 'Fresh Graduate 2025', 'Open to Work'];

  const GithubIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
  );
  const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
  );

  return (
    <div className="bg-background text-on-background dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container transition-colors duration-500">

      {/* Global Styles for custom animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee { animation: marquee 28s linear infinite; }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) scale(1); }
          33% { transform: translateY(-15px) scale(0.95); }
          66% { transform: translateY(10px) scale(1.05); }
        }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 8s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 6s ease-in-out infinite; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* Glitch effect */
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          opacity: 0;
        }
        .glitch-text:hover::before {
          opacity: 0.7;
          color: #a855f7;
          animation: glitch1 0.4s steps(2, end) forwards;
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
        }
        .glitch-text:hover::after {
          opacity: 0.7;
          color: #06b6d4;
          animation: glitch2 0.4s steps(2, end) forwards;
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
        }
        @keyframes glitch1 {
          0% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          100% { transform: translateX(0); opacity: 0; }
        }
        @keyframes glitch2 {
          0% { transform: translateX(4px); }
          50% { transform: translateX(-4px); }
          100% { transform: translateX(0); opacity: 0; }
        }

        /* Typewriter cursor */
        .typewriter-cursor::after {
          content: '|';
          animation: blink 1s step-end infinite;
          color: currentColor;
          margin-left: 2px;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }

        /* Noise texture overlay */
        .noise-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 200px;
        }

        /* Scrolling progress line */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--md-sys-color-primary, #4f6df5), var(--md-sys-color-tertiary, #43bfca));
          z-index: 9999;
          transition: width 0.1s linear;
        }

        /* Shine sweep on cards */
        .shine-card {
          position: relative;
          overflow: hidden;
        }
        .shine-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .shine-card:hover::after {
          left: 125%;
        }

        /* Cursor mix-blend */
        @media (hover: hover) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Custom Cursor — Desktop only */}
      <div className="hidden md:block">
        <MagneticCursor />
      </div>

      {/* ── NAVBAR ─────────────────────────────────── */}
      <nav className={`fixed z-50 left-1/2 transform -translate-x-1/2 flex justify-between items-center transition-all duration-700 ease-out origin-top ${
        isScrolled
          ? 'top-6 w-[95%] md:w-[650px] bg-background/85 dark:bg-gray-800/85 backdrop-blur-md shadow-xl rounded-full py-4 px-4 md:px-8 border border-outline-variant/30 dark:border-gray-700/50'
          : 'top-0 w-full bg-background/95 dark:bg-gray-900/95 py-6 px-4 md:px-12 shadow-sm rounded-none border-b border-outline-variant/10 dark:border-gray-800'
      }`}>
        <ul className="flex items-center gap-6 md:gap-8 font-label text-[11px] md:text-sm uppercase tracking-widest font-bold w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {(['work', 'about', 'exp', 'contact'] as const).map((key, i) => (
            <li key={i} className="shrink-0">
              <a className="text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300 relative group" href={`#${key === 'exp' ? 'experience' : key === 'work' ? 'work' : key}`}>
                {t.nav[key as keyof typeof t.nav]}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 ml-4 pl-4 border-l border-outline-variant/30 dark:border-gray-700 shrink-0">
          <button onClick={() => setLang(lang === 'en' ? 'id' : 'en')} className="font-label font-bold text-xs md:text-sm text-on-background dark:text-gray-200 hover:text-primary transition-colors">
            {lang === 'en' ? 'ID' : 'EN'}
          </button>
          <button onClick={() => setIsDark(!isDark)} className="text-on-background dark:text-gray-200 hover:text-primary transition-colors flex items-center">
            <span className="material-symbols-outlined text-xl md:text-2xl">{isDark ? 'light_mode' : 'dark_mode'}</span>
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {/* ── HERO ───────────────────────────────────── */}
        <section className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[900px] overflow-hidden noise-overlay">

          {/* Animated dot grid */}
          <DotGrid />

          {/* Floating Orbs */}
          <FloatingOrbs />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background dark:via-gray-900/30 dark:to-gray-900 z-0" />

          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
            <div className="animate-[fadeInUp_1s_ease-out_0.2s_both]">
              <p className="font-label text-xs md:text-sm uppercase tracking-[0.15em] text-tertiary dark:text-tertiary-fixed font-bold mb-6 bg-tertiary/10 dark:bg-tertiary-fixed/10 inline-block px-5 py-2 rounded-full border border-tertiary/20">
                {t.hero.role}
              </p>

              {/* Typewriter badge */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-8 h-px bg-primary/40" />
                <span className="font-label text-xs text-primary dark:text-primary-fixed uppercase tracking-widest typewriter-cursor min-w-[140px] text-left">{typedText}</span>
                <span className="w-8 h-px bg-primary/40" />
              </div>

              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-medium leading-tight text-on-background dark:text-white tracking-tight">
                <GlitchText text={t.hero.titleStart} />
                <span className="italic text-tertiary dark:text-tertiary-fixed">{t.hero.titleItalic}</span>
                {' '}{t.hero.titleEnd}
              </h1>
            </div>

            <div className="animate-[fadeInUp_1s_ease-out_0.4s_both]">
              <p className="font-body text-lg md:text-xl text-on-surface-variant dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mt-8">
                {t.hero.desc}
              </p>

              {/* Stat counters */}
              <div className="flex items-center justify-center gap-8 md:gap-16 mt-10 mb-10">
                {[
                  { end: 950, suffix: '', label: 'TOEIC Score' },
                  { end: 3, suffix: '+', label: lang === 'en' ? 'Projects Built' : 'Proyek' },
                  { end: 2025, suffix: '', label: lang === 'en' ? 'Grad Year' : 'Lulus' },
                ].map(({ end, suffix, label }, i) => (
                  <div key={i} className="text-center animate-[fadeIn_1s_ease-out_0.6s_both]">
                    <p className="font-headline text-3xl md:text-4xl font-bold text-primary dark:text-primary-fixed">
                      <AnimatedCounter end={end} suffix={suffix} />
                    </p>
                    <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant dark:text-gray-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>

              <a className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-xl font-label font-bold tracking-wide hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-all duration-300 shadow-lg group hover:-translate-y-1" href="#about">
                {t.hero.btn}
                <span className="material-symbols-outlined ml-2 transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform">arrow_downward</span>
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-[fadeIn_1s_ease-out_1.2s_both]">
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50">scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent animate-pulse" />
          </div>
        </section>

        {/* ── MARQUEE ────────────────────────────────── */}
        <MarqueeStrip items={marqueeItems} />

        {/* ── PROJECTS ───────────────────────────────── */}
        <section className="py-32 px-6 md:px-12 bg-surface-container-lowest dark:bg-gray-900 relative overflow-hidden z-10" id="work">
          <div className="max-w-6xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-16">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background dark:text-white">{t.projects.title}</h2>
                <div className="h-px bg-outline-variant/50 dark:bg-gray-800 flex-grow ml-8 hidden md:block" />
              </div>
            </FadeInSection>
            <FadeInSection delay="200ms">
              <div className="relative w-full aspect-[4/3] md:aspect-[16/7] bg-surface-variant dark:bg-gray-800 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(46,50,48,0.08)] group border border-outline-variant/20 dark:border-gray-700 shine-card">
                {projectsData.map((proj, index) => (
                  <div key={proj.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentProjSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                    {proj.image ? (
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-outline dark:text-gray-600">
                        <span className="material-symbols-outlined text-6xl mb-4 opacity-50">web</span>
                        <span className="font-label text-sm tracking-widest uppercase opacity-70 text-center px-4">[ Insert {proj.title} Screenshot ]</span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                      <div className="max-w-2xl">
                        <h3 className="font-headline text-2xl md:text-4xl text-white mb-2">{proj.title}</h3>
                        <p className="font-body text-gray-200 text-xs md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
                          {lang === 'en' ? proj.descEn : proj.descId}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="absolute top-4 right-4 md:top-6 md:right-8 z-20 flex gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                  {projectsData.map((_, index) => (
                    <button key={index} onClick={() => setCurrentProjSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${index === currentProjSlide ? "bg-primary-fixed w-4 md:w-6" : "bg-white/50 w-1.5 md:w-2 hover:bg-white"}`} />
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* ── ABOUT ──────────────────────────────────── */}
        <section className="py-32 px-6 md:px-12 bg-surface-container dark:bg-gray-800/50" id="about">
          <div className="max-w-7xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-20">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background dark:text-white">{t.about.title}</h2>
                <div className="h-px bg-outline-variant/50 dark:bg-gray-700 flex-grow ml-8 hidden md:block" />
              </div>
            </FadeInSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <FadeInSection delay="100ms">
                <div>
                  <p className="font-body text-xl text-on-surface-variant dark:text-gray-300 leading-relaxed mb-6">{t.about.p1}</p>
                  <p className="font-body text-lg text-on-surface-variant dark:text-gray-400 leading-relaxed mb-10">{t.about.p2}</p>
                  {/* Skill bars */}
                  <div className="space-y-1">
                    <SkillBar label="Web Development" pct={85} delay={200} />
                    <SkillBar label="English (TOEIC 950)" pct={95} delay={400} />
                    <SkillBar label="Team Collaboration" pct={90} delay={600} />
                    <SkillBar label="Problem Solving" pct={80} delay={800} />
                  </div>
                </div>
              </FadeInSection>
              <FadeInSection delay="300ms">
                <div className="flex items-center justify-center lg:justify-end">
                  <div className="w-full max-w-md aspect-[4/5] overflow-hidden rounded-2xl bg-surface-variant dark:bg-gray-800 shadow-md flex flex-col items-center justify-center relative group border-4 border-white/50 dark:border-gray-700/50 shine-card">
                    <img
                      alt="Raka Anugrah Satya Profile"
                      className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                      src="/images/fotogw.jpeg"
                    />
                    {/* Name tag overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="font-headline text-white text-xl">Raka Anugrah Satya</p>
                      <p className="font-label text-primary-fixed text-xs uppercase tracking-widest">Software Engineering</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* ── SKILLS ─────────────────────────────────── */}
        <section className="py-32 px-6 md:px-12 bg-surface-container-low dark:bg-gray-900" id="skills">
          <div className="max-w-7xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-20">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background dark:text-white">{t.skills.title}</h2>
                <div className="h-px bg-outline-variant/50 dark:bg-gray-800 flex-grow ml-8 hidden md:block" />
              </div>
            </FadeInSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: 'computer', colorClass: 'text-primary dark:text-primary-fixed', bgClass: 'bg-primary/10 dark:bg-primary-fixed/10', borderHover: 'hover:border-primary/50', title: t.skills.s1, desc: t.skills.s1Desc, delay: '100ms' },
                { icon: 'language', colorClass: 'text-tertiary dark:text-tertiary-fixed', bgClass: 'bg-tertiary/10 dark:bg-tertiary-fixed/10', borderHover: 'hover:border-tertiary/50', title: t.skills.s2, desc: t.skills.s2Desc, delay: '200ms' },
                { icon: 'groups', colorClass: 'text-primary dark:text-primary-fixed', bgClass: 'bg-primary/10 dark:bg-primary-fixed/10', borderHover: 'hover:border-primary/50', title: t.skills.s3, desc: t.skills.s3Desc, delay: '300ms' },
              ].map(({ icon, colorClass, bgClass, borderHover, title, desc, delay }, i) => (
                <FadeInSection key={i} delay={delay}>
                  <div className={`bg-surface dark:bg-gray-800 p-8 rounded-2xl border border-outline-variant/30 dark:border-gray-700 ${borderHover} hover:-translate-y-3 transition-all duration-500 h-full shine-card group`}>
                    <span className={`material-symbols-outlined ${colorClass} text-4xl mb-6 ${bgClass} p-4 rounded-xl inline-block transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}>{icon}</span>
                    <h3 className="font-headline text-2xl text-on-background dark:text-white mb-3">{title}</h3>
                    <p className="font-body text-on-surface-variant dark:text-gray-400">{desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ─────────────────────────────── */}
        <section className="py-32 px-6 md:px-12 bg-surface dark:bg-gray-800/20" id="experience">
          <div className="max-w-5xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-16">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background dark:text-white">{t.exp.title}</h2>
                <div className="h-px bg-outline-variant/50 dark:bg-gray-700 flex-grow ml-8 hidden md:block" />
              </div>
            </FadeInSection>
            <FadeInSection delay="200ms">
              <div className="relative bg-surface-container-lowest dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-sm border border-outline-variant/20 dark:border-gray-700 shine-card">
                <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-surface-variant dark:bg-gray-900 mb-8 group">
                  {experiencesData.map((exp, index) => (
                    <div key={exp.id} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentExpSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                      {exp.image ? (
                        <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-outline dark:text-gray-600">
                          <span className="material-symbols-outlined text-6xl mb-2 opacity-50">photo_library</span>
                          <span className="font-label text-sm tracking-widest uppercase opacity-70">{t.exp.photoHint}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  <button onClick={prevExpSlide} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-inverse-surface/40 hover:bg-primary dark:bg-black/50 dark:hover:bg-primary-fixed text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110">
                    <span className="material-symbols-outlined text-lg md:text-2xl">chevron_left</span>
                  </button>
                  <button onClick={nextExpSlide} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-inverse-surface/40 hover:bg-primary dark:bg-black/50 dark:hover:bg-primary-fixed text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110">
                    <span className="material-symbols-outlined text-lg md:text-2xl">chevron_right</span>
                  </button>
                </div>
                <div className="text-center md:text-left min-h-[140px] px-4 md:px-0">
                  <h3 className="font-headline text-2xl md:text-3xl text-on-background dark:text-white mb-2">{experiencesData[currentExpSlide].title}</h3>
                  <p className="font-label text-xs md:text-sm text-primary dark:text-primary-fixed font-bold uppercase tracking-widest mb-4">{experiencesData[currentExpSlide].role}</p>
                  <p className="font-body text-sm md:text-lg text-on-surface-variant dark:text-gray-400 leading-relaxed max-w-3xl">
                    {lang === 'en' ? experiencesData[currentExpSlide].descEn : experiencesData[currentExpSlide].descId}
                  </p>
                </div>
                <div className="flex justify-center md:justify-start gap-3 mt-8 px-4 md:px-0">
                  {experiencesData.map((_, index) => (
                    <button key={index} onClick={() => setCurrentExpSlide(index)}
                      className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${index === currentExpSlide ? "bg-primary dark:bg-primary-fixed w-6 md:w-8" : "bg-outline-variant dark:bg-gray-600 w-1.5 md:w-2 hover:bg-outline"}`} />
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* ── CONTACT ────────────────────────────────── */}
        <section className="py-32 px-6 md:px-12 bg-secondary-container dark:bg-gray-900 relative overflow-hidden noise-overlay" id="contact">
          <FloatingOrbs />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <FadeInSection>
              <h2 className="font-headline text-4xl md:text-6xl text-on-secondary-container dark:text-white mb-8">{t.contact.title}</h2>
              <p className="font-body text-base md:text-xl text-on-surface-variant dark:text-gray-400 mb-12 max-w-2xl mx-auto">{t.contact.desc}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a className="inline-flex items-center justify-center px-8 py-4 bg-primary dark:bg-primary-fixed text-on-primary dark:text-black rounded-xl font-label font-bold text-sm md:text-base tracking-wide hover:-translate-y-1 transition-all duration-300 shadow-lg w-full sm:w-auto shine-card" href="mailto:raka.anugrah@example.com">
                  <span className="material-symbols-outlined mr-3">mail</span>
                  {t.contact.btn}
                </a>
                <a className="inline-flex items-center justify-center px-8 py-4 bg-surface dark:bg-gray-800 text-on-surface dark:text-white border border-outline-variant/30 rounded-xl font-label font-bold text-sm md:text-base tracking-wide hover:border-primary transition-all duration-300 w-full sm:w-auto shine-card" href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">
                  <LinkedInIcon /><span className="ml-3">LinkedIn</span>
                </a>
                <a className="inline-flex items-center justify-center px-8 py-4 bg-surface dark:bg-gray-800 text-on-surface dark:text-white border border-outline-variant/30 rounded-xl font-label font-bold text-sm md:text-base tracking-wide hover:border-primary transition-all duration-300 w-full sm:w-auto shine-card" href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                  <GithubIcon /><span className="ml-3">GitHub</span>
                </a>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────── */}
      <footer className="bg-inverse-surface dark:bg-black relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 py-12 gap-8 max-w-7xl mx-auto">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-headline text-lg md:text-xl text-tertiary-fixed dark:text-gray-200 block">Raka Anugrah Satya</span>
            <p className="font-body text-xs md:text-sm text-tertiary-fixed-dim dark:text-gray-500 max-w-xs leading-relaxed mx-auto md:mx-0">
              © {new Date().getFullYear()} Raka Anugrah Satya. <br />{t.footer}
            </p>
          </div>
          <ul className="flex items-center gap-6">
            <li><a className="text-tertiary-fixed dark:text-gray-400 hover:text-primary-fixed-dim dark:hover:text-white transition-colors duration-300" href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer"><LinkedInIcon /></a></li>
            <li><a className="text-tertiary-fixed dark:text-gray-400 hover:text-primary-fixed-dim dark:hover:text-white transition-colors duration-300" href="https://github.com/yourusername" target="_blank" rel="noreferrer"><GithubIcon /></a></li>
            <li>
              <a className="text-tertiary-fixed dark:text-gray-400 hover:text-primary-fixed-dim dark:hover:text-white transition-colors" href="mailto:raka.anugrah@example.com">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

// ─── SCROLL PROGRESS BAR ─────────────────────────────────────────────────────
const ScrollProgressBar = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
};

export default App;

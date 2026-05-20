import { useState, useEffect, useRef, ReactNode } from 'react';

// --- TIPE DATA ---
interface Experience {
  id: number;
  title: string;
  role: string;
  description: string;
  image: string;
}

interface FadeInSectionProps {
  children: ReactNode;
  delay?: string;
}

// --- KOMPONEN ANIMASI SCROLL ---
// Komponen ini akan membuat elemen di dalamnya muncul secara halus (fade-in & slide-up) saat di-scroll
const FadeInSection = ({ children, delay = '0ms' }: FadeInSectionProps) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Hentikan observasi setelah elemen terlihat agar tidak berkedip saat di-scroll naik-turun
          observer.unobserve(entry.target); 
        }
      });
    });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
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
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const experiences: Experience[] = [
    {
      id: 1,
      title: "Internship (Praktik Kerja Lapangan)",
      role: "Logistics & Admin at PT. Telkom Akses",
      description: "Bertanggung jawab atas prosedur pelaksanaan stock opname dan manajemen logistik untuk perangkat keras/NTE. Memastikan akurasi data inventaris untuk mendukung efisiensi operasional.",
      image: "" 
    },
    {
      id: 2,
      title: "Social Harmony Campaign Project",
      role: "Project Lead & Technical Role",
      description: "Memimpin produksi proyek video kreatif berjudul 'Jeda Sejenak'. Proyek ini merupakan kampanye sekolah yang bertujuan untuk mempromosikan toleransi di lingkungan sosial.",
      image: "" 
    },
    {
      id: 3,
      title: "Software Engineering Student",
      role: "SMK Negeri 71 Jakarta",
      description: "Mengembangkan berbagai aplikasi fungsional berbasis web seperti sistem Point of Sales (Kasir) dan platform e-library (Libraria).",
      image: "" 
    }
  ];

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      
      {/* --- FLOATING NAVBAR (CENTERED) --- */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-2xl transition-all duration-500 animate-[fadeInDown_1s_ease-out]">
        <div className="bg-background/80 backdrop-blur-md shadow-[0_8px_32px_rgba(46,50,48,0.1)] rounded-full px-6 py-4 flex items-center justify-center border border-outline-variant/20">
          <ul className="flex items-center gap-6 md:gap-12 font-label text-xs md:text-sm uppercase tracking-widest font-bold">
            <li><a className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="#work">Projects</a></li>
            <li><a className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="#about">About</a></li>
            <li><a className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="#experience">Experience</a></li>
            <li><a className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main className="flex-grow">
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[819px]">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-surface-container-low rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-tertiary-container rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
            <div className="animate-[fadeInUp_1s_ease-out_0.2s_both]">
              <p className="font-label text-sm uppercase tracking-[0.2em] text-tertiary font-semibold mb-4">
                Full-Stack Web Developer
              </p>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-medium leading-tight text-on-background tracking-tight">
                Building <span className="italic text-tertiary">functional</span> <br /> digital systems.
              </h1>
            </div>
            
            <div className="animate-[fadeInUp_1s_ease-out_0.4s_both]">
              <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed mt-8">
                Rooted in structured software engineering. I build robust, scalable web applications that bridge solid backend logic with seamless user experiences.
              </p>
              <div className="pt-12">
                <a className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-xl font-label font-bold tracking-wide hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-all duration-300 shadow-[0_4px_20px_rgba(46,50,48,0.06)] group hover:-translate-y-1" href="#work">
                  Explore Selected Work
                  <span className="material-symbols-outlined ml-2 transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-outline text-xs uppercase tracking-widest mb-2 font-label">Scroll</span>
            <span className="material-symbols-outlined text-outline">arrow_downward</span>
          </div>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section className="py-32 px-6 md:px-12 bg-surface-container-lowest relative overflow-hidden" id="work">
          <div className="max-w-7xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-20">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background">Projects</h2>
                <div className="h-px bg-outline-variant flex-grow ml-8 opacity-50 hidden md:block"></div>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FadeInSection delay="100ms">
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded-2xl bg-surface-container shadow-[0_4px_20px_rgba(46,50,48,0.06)] mb-6 aspect-square relative bg-surface-variant flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="material-symbols-outlined text-5xl text-outline opacity-50 absolute z-0">image</span>
                    <img alt="Libraria project preview" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out relative z-10 opacity-0" src="" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline text-2xl text-on-background mb-2 group-hover:text-primary transition-colors">Libraria</h3>
                      <p className="font-label text-sm text-on-surface-variant uppercase tracking-wider">E-Library Platform</p>
                    </div>
                    <span className="material-symbols-outlined text-tertiary opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 duration-300">north_east</span>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection delay="300ms">
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded-2xl bg-secondary-container shadow-[0_4px_20px_rgba(46,50,48,0.06)] mb-6 aspect-square relative bg-surface-variant flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="material-symbols-outlined text-5xl text-outline opacity-50 absolute z-0">image</span>
                    <img alt="Sistem Kasir project preview" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out relative z-10 opacity-0" src="" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline text-xl text-on-background mb-1 group-hover:text-primary transition-colors">Sistem Kasir</h3>
                      <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider">Point of Sales System</p>
                    </div>
                    <span className="material-symbols-outlined text-tertiary opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 duration-300">north_east</span>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection delay="500ms">
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded-2xl bg-surface-container-high shadow-[0_4px_20px_rgba(46,50,48,0.06)] mb-6 aspect-square relative bg-surface-variant flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="material-symbols-outlined text-5xl text-outline opacity-50 absolute z-0">image</span>
                    <img alt="Logistics Management Preview" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out relative z-10 opacity-0" src="" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline text-xl text-on-background mb-1 group-hover:text-primary transition-colors">Stock Opname</h3>
                      <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider">Logistics Dashboard</p>
                    </div>
                    <span className="material-symbols-outlined text-tertiary opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 duration-300">north_east</span>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section className="py-32 px-6 md:px-12 bg-surface-container" id="about">
          <div className="max-w-7xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-20">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background">About Me</h2>
                <div className="h-px bg-outline-variant flex-grow ml-8 opacity-50 hidden md:block"></div>
              </div>
            </FadeInSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <FadeInSection delay="100ms">
                <div>
                  <p className="font-body text-xl text-on-surface-variant leading-relaxed mb-6">
                    I am a web developer focused on creating structured, efficient, and dynamic digital solutions. My foundation lies in Software Engineering (Rekayasa Perangkat Lunak), where I developed a passion for full-stack architecture.
                  </p>
                  <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-12">
                    Based in Jakarta, my technical stack revolves around PHP, MySQL, JavaScript, and modern frameworks like React. From designing relational databases to building responsive interfaces, I approach development as a balanced mix of logic and creativity.
                  </p>
                  <div className="flex flex-col gap-6">
                    <div className="border-l-2 border-primary pl-6 py-2 hover:border-l-4 transition-all duration-300">
                      <h4 className="font-headline text-xl text-on-background mb-2">Technical Philosophy</h4>
                      <p className="font-body text-on-surface-variant">Code should be clean, maintainable, and serve a clear purpose. Good software solves complex problems through straightforward logic.</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
              
              <FadeInSection delay="300ms">
                <div className="flex items-center justify-center lg:justify-end">
                  <div className="w-full max-w-md aspect-[4/5] overflow-hidden rounded-2xl bg-surface-variant shadow-[0_4px_20px_rgba(46,50,48,0.06)] flex flex-col items-center justify-center relative group">
                    <span className="material-symbols-outlined text-6xl text-outline mb-4 group-hover:scale-110 transition-transform duration-500">account_circle</span>
                    <span className="font-label text-sm text-outline">[ Insert Profile Photo ]</span>
                    <img alt="Raka Anugrah Satya Profile" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-0" src="" />
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* --- EXPERTISE SECTION --- */}
        <section className="py-32 px-6 md:px-12 bg-surface-container-low" id="skills">
          <div className="max-w-7xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-20">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background">Expertise</h2>
                <div className="h-px bg-outline-variant flex-grow ml-8 opacity-50 hidden md:block"></div>
              </div>
            </FadeInSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FadeInSection delay="100ms">
                <div className="bg-surface p-8 rounded-2xl border border-outline-variant/30 hover:border-primary/50 hover:shadow-lg hover:-translate-y-2 transition-all duration-500 cursor-default">
                  <span className="material-symbols-outlined text-primary text-3xl mb-4">devices</span>
                  <h3 className="font-headline text-2xl text-on-background mb-3">Frontend Development</h3>
                  <p className="font-body text-on-surface-variant">Building responsive, interactive user interfaces using React, JavaScript, and Tailwind.</p>
                </div>
              </FadeInSection>
              
              <FadeInSection delay="200ms">
                <div className="bg-surface p-8 rounded-2xl border border-outline-variant/30 hover:border-primary/50 hover:shadow-lg hover:-translate-y-2 transition-all duration-500 cursor-default">
                  <span className="material-symbols-outlined text-primary text-3xl mb-4">dns</span>
                  <h3 className="font-headline text-2xl text-on-background mb-3">Backend Systems</h3>
                  <p className="font-body text-on-surface-variant">Developing secure and efficient server-side logic and APIs utilizing PHP.</p>
                </div>
              </FadeInSection>
              
              <FadeInSection delay="300ms">
                <div className="bg-surface p-8 rounded-2xl border border-outline-variant/30 hover:border-primary/50 hover:shadow-lg hover:-translate-y-2 transition-all duration-500 cursor-default">
                  <span className="material-symbols-outlined text-primary text-3xl mb-4">database</span>
                  <h3 className="font-headline text-2xl text-on-background mb-3">Database Management</h3>
                  <p className="font-body text-on-surface-variant">Designing normalized relational databases and optimizing queries using MySQL.</p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE SECTION (CAROUSEL) --- */}
        <section className="py-32 px-6 md:px-12 bg-surface" id="experience">
          <div className="max-w-5xl mx-auto">
            <FadeInSection>
              <div className="flex items-baseline justify-between mb-16">
                <h2 className="font-headline text-4xl md:text-5xl text-on-background">Experience &amp; Roles</h2>
                <div className="h-px bg-outline-variant flex-grow ml-8 opacity-50 hidden md:block"></div>
              </div>
            </FadeInSection>

            <FadeInSection delay="200ms">
              <div className="relative bg-surface-container-lowest rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgba(46,50,48,0.08)] border border-outline-variant/20 hover:shadow-[0_8px_40px_rgba(46,50,48,0.12)] transition-shadow duration-500">
                <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-surface-variant mb-8 group">
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
                        <div className="w-full h-full flex flex-col items-center justify-center text-outline bg-surface-variant">
                          <span className="material-symbols-outlined text-6xl mb-2 opacity-50">photo_library</span>
                          <span className="font-label text-sm tracking-widest uppercase opacity-70">[ Insert {exp.title} Photo ]</span>
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-inverse-surface/40 hover:bg-primary text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-inverse-surface/40 hover:bg-primary text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>

                <div className="text-center md:text-left min-h-[140px] px-4 md:px-0">
                  <h3 className="font-headline text-3xl text-on-background mb-2">{experiences[currentSlide].title}</h3>
                  <p className="font-label text-sm text-primary font-bold uppercase tracking-widest mb-4">{experiences[currentSlide].role}</p>
                  <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-3xl">
                    {experiences[currentSlide].description}
                  </p>
                </div>

                <div className="flex justify-center md:justify-start gap-3 mt-8 px-4 md:px-0">
                  {experiences.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentSlide ? "bg-primary w-8" : "bg-outline-variant w-2 hover:bg-outline"
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
        <section className="py-32 px-6 md:px-12 bg-secondary-container relative overflow-hidden" id="contact">
          <div className="absolute top-0 right-0 w-96 h-96 bg-tertiary-container rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <FadeInSection>
              <h2 className="font-headline text-5xl md:text-6xl text-on-secondary-container mb-8">Let's build something functional together.</h2>
              <p className="font-body text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
                Whether you need a dynamic web application, a scalable database system, or a functional frontend, I'm ready to collaborate.
              </p>
              <a className="inline-flex items-center justify-center px-10 py-5 bg-primary text-on-primary rounded-xl font-label font-bold text-lg tracking-wide hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1" href="mailto:raka.anugrah@example.com">
                Get in touch
                <span className="material-symbols-outlined ml-3 animate-pulse">mail</span>
              </a>
            </FadeInSection>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-inverse-surface dark:bg-inverse-surface full-width flat no shadows">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full px-6 md:px-12 py-16 gap-8 max-w-7xl mx-auto">
          <div className="space-y-4">
            <span className="font-headline text-2xl text-tertiary-fixed block">Raka Anugrah Satya</span>
            <p className="font-body text-sm text-tertiary-fixed-dim max-w-xs leading-relaxed">
              © {new Date().getFullYear()} Raka Anugrah Satya. Crafted for efficient digital experiences.
            </p>
          </div>
          <ul className="flex flex-col md:flex-row gap-6 font-label text-sm tracking-wide">
            <li><a className="text-tertiary-fixed hover:text-primary-fixed-dim transition-colors duration-300" href="#">LinkedIn</a></li>
            <li><a className="text-tertiary-fixed hover:text-primary-fixed-dim transition-colors duration-300" href="#">GitHub</a></li>
            <li><a className="text-tertiary-fixed hover:text-primary-fixed-dim transition-colors duration-300" href="#">Email</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Globe, 
  Database, 
  Layers, 
  Smartphone, 
  Search, 
  Target, 
  Megaphone, 
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Languages
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { translations } from "./translations";

const LOGO_URL = "https://i.ibb.co/dw21V75n/Black-and-White-Simple-Modern-Quirky-Letter-M-Logo-1-removebg-preview.png";

type Language = "en" | "ar";

const PARTNERS = [
  { name: "IKH Fashion", url: "https://www.ikhfashion.com/", logo: "https://logo.clearbit.com/ikhfashion.com" },
  { name: "Dofoq", url: "https://dofoq.sa/", logo: "https://logo.clearbit.com/dofoq.sa" },
  { name: "Sallat", url: "https://sallat.sa/", logo: "https://logo.clearbit.com/sallat.sa" },
  { name: "iBoat", url: "https://iboatinternational.com/", logo: "https://logo.clearbit.com/iboatinternational.com" },
  { name: "Naan Bar", url: "https://www.naanbar.com/", logo: "https://logo.clearbit.com/naanbar.com" },
  { name: "Mez", url: "https://mezrestaurants.com/", logo: "https://logo.clearbit.com/mezrestaurants.com" },
  { name: "Chatterbox", url: "https://www.chatterboxrestaurants.com/", logo: "https://logo.clearbit.com/chatterboxrestaurants.com" },
  { name: "JetClub", url: "https://jetclubcharter.com/", logo: "https://logo.clearbit.com/jetclubcharter.com" },
  { name: "Abra", url: "https://www.abra.com.mt/", logo: "https://logo.clearbit.com/abra.com.mt" },
  { name: "Glow", url: "https://glow.acesads.com/", logo: "https://logo.clearbit.com/glow.acesads.com" },
  { name: "Alex Life Land", url: "https://alex-life-land.com/", logo: "https://logo.clearbit.com/alex-life-land.com" },
];

const SERVICE_ICONS = [Globe, Database, Layers, Smartphone, Megaphone, Search, Target];

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const t = translations[lang];
  const isRtl = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const services = Object.values(t.services.items).map((item: any, i) => ({
    ...item,
    icon: SERVICE_ICONS[i] || Globe,
  }));

  const team = t.team.members;
  const locations = t.locations.items;

  const toggleLang = () => {
    setLang(prev => prev === "en" ? "ar" : "en");
  };

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white bg-brand-white text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-2 md:py-4 transition-all duration-500 ${scrolled ? 'bg-white/20 backdrop-blur-md border-b border-white/30 shadow-2xl' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2 md:gap-3 group cursor-pointer">
          <img src={LOGO_URL} alt="Mutqun Logo" className="h-12 md:h-20 w-auto invert group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
          <div className="flex flex-col">
            <span className="text-lg md:text-2xl font-bold uppercase tracking-tighter text-gradient-logo group-hover:brightness-125 transition-all duration-300 leading-none">Mutqun</span>
            <div className="flex flex-col mt-0.5 md:mt-1">
              <span className="text-[8px] md:text-[10px] font-medium tracking-wider text-white/60 uppercase leading-tight">For IT solutions</span>
              <span className="text-[8px] md:text-[10px] font-medium tracking-wider text-white/60 leading-tight">متقن لتقنية المعلومات</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/80">
          <a href="#services" className="hover:text-brand-accent hover:scale-110 transition-all duration-300">{t.nav.services}</a>
          <a href="#partners" className="hover:text-brand-accent hover:scale-110 transition-all duration-300">{t.nav.partners}</a>
          <a href="#team" className="hover:text-brand-accent hover:scale-110 transition-all duration-300">{t.nav.team}</a>
          <a href="#locations" className="hover:text-brand-accent hover:scale-110 transition-all duration-300">{t.nav.locations}</a>
          <a href="#about" className="hover:text-brand-accent hover:scale-110 transition-all duration-300">{t.nav.about}</a>
          
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 hover:text-brand-accent transition-colors font-bold liquid-glass-button px-4 py-2 rounded-full"
          >
            <Languages size={18} />
            {lang === "en" ? "العربية" : "English"}
          </button>

          <button className="px-8 py-3 bg-brand-accent/20 backdrop-blur-md text-white rounded-full font-bold hover:scale-105 hover:bg-brand-accent/30 transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] border border-white/30">
            {t.nav.startProject}
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleLang}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest"
          >
            {lang === "en" ? "AR" : "EN"}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 100 : -100 }}
            className="fixed inset-0 z-40 bg-white/20 backdrop-blur-md pt-24 px-8 flex flex-col gap-6 text-3xl font-display font-bold text-white"
          >
            <a href="#services" className="hover:text-brand-accent hover:translate-x-4 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t.nav.services}</a>
            <a href="#partners" className="hover:text-brand-accent hover:translate-x-4 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t.nav.partners}</a>
            <a href="#team" className="hover:text-brand-accent hover:translate-x-4 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t.nav.team}</a>
            <a href="#locations" className="hover:text-brand-accent hover:translate-x-4 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t.nav.locations}</a>
            <a href="#about" className="hover:text-brand-accent hover:translate-x-4 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t.nav.about}</a>
            <div className="mt-auto mb-12 flex flex-col gap-4">
              <button className="bg-brand-accent text-white px-8 py-4 rounded-full text-lg shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                {t.nav.startProject}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={targetRef} className="relative min-h-screen flex flex-col px-6 md:px-12 lg:px-24 pt-32 md:pt-48 overflow-hidden">
        {/* Animated Liquid Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-accent/30 rounded-full blur-[100px] -z-10 animate-liquid-blob"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-lavender-glow/20 rounded-full blur-[120px] -z-10 animate-liquid-blob"
        />

        {/* Moving Light Lines */}
        <div className="absolute inset-0 overflow-hidden -z-5 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-light-line" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-light-line [animation-delay:2s]" />
          <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-light-line [animation-delay:4s]" />
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/40 to-transparent animate-light-line [animation-delay:1s]" />
          <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/30 to-transparent animate-light-line [animation-delay:3s]" />
        </div>

        <motion.div style={{ opacity, scale }} className="max-w-5xl relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-2 text-white/40"
          >
            {t.hero.tagline}
          </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] md:leading-[1.1] tracking-tighter mb-8 cursor-default ${isRtl ? 'font-arabic-display' : 'font-display'}`}
            >
              <motion.span whileHover={{ scale: 1.02, color: '#a78bfa' }} className="text-gradient-logo inline-block transition-colors duration-300">{t.hero.title1}</motion.span> <br />
              <motion.span whileHover={{ scale: 1.02, color: '#ffffff' }} className="text-neutral-400/60 inline-block transition-colors duration-300">{t.hero.title2}</motion.span> <br />
              <motion.span whileHover={{ scale: 1.02, color: '#a78bfa' }} className="text-gradient-logo inline-block transition-colors duration-300">{t.hero.title3}</motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ color: 'rgba(255, 255, 255, 0.9)' }}
              className="text-xl md:text-2xl text-white/60 max-w-2xl mb-12 leading-relaxed cursor-default transition-colors duration-300"
            >
              {t.hero.description}
            </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <button className="group flex items-center gap-2 bg-brand-accent/60 backdrop-blur-3xl text-white px-8 py-4 rounded-full text-lg font-medium hover:scale-105 hover:bg-brand-accent/80 transition-all shadow-[0_0_40px_rgba(139,92,246,0.4)] border border-white/20">
              {t.hero.ctaServices}
              <ArrowRight className={`transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </button>
            <button className="px-8 py-4 rounded-full text-lg font-medium liquid-glass-button text-white">
              {t.hero.ctaPartners}
            </button>
          </motion.div>
        </motion.div>

        {/* Decorative background element */}
        <div className={`absolute top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-100 rounded-full blur-[120px] -z-10 opacity-50 ${isRtl ? 'left-0 -translate-x-1/4' : 'right-0 translate-x-1/4'}`} />
      </section>

      {/* Partners Ticker */}
      <section id="partners" className="py-12 border-y border-white/5 overflow-hidden bg-white/[0.02] backdrop-blur-3xl">
        <div className={`flex whitespace-nowrap ${isRtl ? 'animate-marquee-rtl' : 'animate-marquee'}`}>
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <div key={i} className="flex items-center gap-8 px-12">
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open(partner.url, '_blank')}>
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100 invert"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                  referrerPolicy="no-referrer"
                />
                <span className="hidden text-2xl font-display font-bold uppercase tracking-tighter opacity-20 group-hover:opacity-100 group-hover:text-brand-accent transition-all duration-300 text-white">
                  {partner.name}
                </span>
              </div>
              <div className="w-2 h-2 bg-white/10 rounded-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className={`text-4xl md:text-6xl font-bold tracking-tighter mb-6 cursor-default ${isRtl ? 'font-arabic-display' : 'font-display'}`}>
                <motion.span whileHover={{ color: '#a78bfa' }} className="text-gradient-logo inline-block transition-colors duration-300">{t.services.title}</motion.span> <br />
                <motion.span whileHover={{ color: '#ffffff' }} className="text-neutral-400/60 inline-block transition-colors duration-300">{t.services.subtitle}</motion.span>
              </h2>
              <motion.p whileHover={{ color: 'rgba(255, 255, 255, 0.9)' }} className="text-lg text-white/60 transition-colors duration-300">
                {t.services.description}
              </motion.p>
            </div>
            <div className={`${isRtl ? 'text-left' : 'text-right'}`}>
              <span className="text-sm font-bold uppercase tracking-widest text-white/40">{t.services.label}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card p-8 md:p-12 flex flex-col gap-6 group rounded-[2.5rem] relative overflow-hidden border-white/5 hover:border-white/20 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl -z-10 group-hover:bg-brand-accent/20 transition-colors" />
                <div className="w-12 h-12 bg-white/[0.03] backdrop-blur-3xl rounded-xl flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all duration-500 border border-white/10">
                  <service.icon size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-accent transition-colors duration-300">{service.title}</h3>
                  <p className="text-white/50 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
                <div className="mt-auto pt-8">
                  <button 
                    onClick={() => setSelectedService(service)}
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all text-brand-accent"
                  >
                    {t.services.learnMore} <ChevronRight size={16} className={isRtl ? 'rotate-180' : ''} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 px-6 md:px-12 lg:px-24 bg-brand-white/50 relative overflow-hidden">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] -z-10 animate-liquid-blob"
        />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className={`text-4xl md:text-6xl font-bold tracking-tighter mb-6 cursor-default ${isRtl ? 'font-arabic-display' : 'font-display'}`}>
                <motion.span whileHover={{ color: '#a78bfa' }} className="text-gradient-logo inline-block transition-colors duration-300">{t.team.title}</motion.span> <br />
                <motion.span whileHover={{ color: '#ffffff' }} className="text-neutral-400/60 inline-block transition-colors duration-300">{t.team.subtitle}</motion.span>
              </h2>
              <motion.p whileHover={{ color: 'rgba(255, 255, 255, 0.9)' }} className="text-lg text-white/60 transition-colors duration-300">
                {t.team.description}
              </motion.p>
            </div>
            <div className={`${isRtl ? 'text-left' : 'text-right'}`}>
              <span className="text-sm font-bold uppercase tracking-widest text-white/40">{t.team.label}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group glass-card p-8 rounded-[2rem] border-white/5 hover:border-white/20 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-48 aspect-square rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10 shadow-sm">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-bold mb-1 group-hover:text-brand-accent transition-colors duration-300">{member.name}</h3>
                    <span className="block text-sm font-bold uppercase tracking-widest text-white/40 mb-4 group-hover:text-white/60 transition-colors duration-300">{member.role}</span>
                    <p className="text-white/60 leading-relaxed mb-6 italic group-hover:text-white/90 transition-colors duration-300">
                      "{member.speech}"
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <span className="px-4 py-1.5 bg-brand-accent/60 backdrop-blur-3xl text-white rounded-full shadow-lg border border-white/10 group-hover:bg-brand-accent transition-all duration-300">{member.phone}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-24 px-6 md:px-12 lg:px-24 bg-brand-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className={`text-4xl md:text-6xl font-bold tracking-tighter mb-6 cursor-default ${isRtl ? 'font-arabic-display' : 'font-display'}`}>
                <motion.span whileHover={{ color: '#a78bfa' }} className="text-gradient-logo inline-block transition-colors duration-300">{t.locations.title}</motion.span> <br />
                <motion.span whileHover={{ color: '#ffffff' }} className="text-neutral-400/60 inline-block transition-colors duration-300">{t.locations.subtitle}</motion.span>
              </h2>
              <motion.p whileHover={{ color: 'rgba(255, 255, 255, 0.9)' }} className="text-lg text-white/60 transition-colors duration-300">
                {t.locations.description}
              </motion.p>
            </div>
            <div className={`${isRtl ? 'text-left' : 'text-right'}`}>
              <span className="text-sm font-bold uppercase tracking-widest text-white/40">{t.locations.label}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {locations.map((loc, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 glass-card rounded-3xl border border-white/5 hover:border-brand-accent/30 transition-all duration-500 group"
              >
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-brand-accent transition-colors duration-300">{loc.city}</h3>
                <span className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-6 group-hover:text-white/60 transition-colors duration-300">{loc.office}</span>
                <p className="text-sm text-white/50 mb-8 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {loc.address}
                </p>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/20">{t.locations.contact}</span>
                  <a href={`tel:${loc.phone}`} className="text-sm font-bold hover:text-brand-accent transition-colors">{loc.phone}</a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Split Layout */}
      <section id="about" className="py-24 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 cursor-default ${isRtl ? 'font-arabic-display' : 'font-display'}`}>
              <motion.span whileHover={{ color: '#a78bfa' }} className="text-gradient-logo inline-block transition-colors duration-300">{t.about.title}</motion.span> <br />
              <motion.span whileHover={{ color: '#ffffff' }} className="text-neutral-500 italic inline-block transition-colors duration-300">{t.about.subtitle}</motion.span> <motion.span whileHover={{ color: '#a78bfa' }} className="text-gradient-logo inline-block transition-colors duration-300">{t.about.titleEnd}</motion.span>
            </h2>
            <motion.p whileHover={{ color: 'rgba(255, 255, 255, 0.9)' }} className="text-xl text-neutral-400 leading-relaxed mb-12 transition-colors duration-300">
              {t.about.description}
            </motion.p>
            <div className="grid grid-cols-2 gap-12">
              <motion.div whileHover={{ scale: 1.05 }}>
                <span className="block text-4xl font-display font-bold mb-2 text-gradient-logo">10+</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500">{t.about.partnersLabel}</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <span className="block text-4xl font-display font-bold mb-2 text-gradient-logo">50+</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500">{t.about.projectsLabel}</span>
              </motion.div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-neutral-900 rounded-3xl overflow-hidden border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
                alt="Office Space" 
                className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating element */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute -bottom-12 glass-card p-8 rounded-2xl shadow-2xl hidden md:block border-white/20 backdrop-blur-[60px] ${isRtl ? '-right-12' : '-left-12'}`}
            >
              <span className="text-xs font-bold uppercase tracking-widest block mb-2 text-white/40">{t.about.philosophyLabel}</span>
              <p className="font-display font-bold text-xl text-white">{t.about.philosophyText}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-white/50 -z-20" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px] -z-10 animate-liquid-blob"
        />
        <div className="max-w-4xl mx-auto liquid-glass-container p-8 md:p-16 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-12 text-gradient-logo cursor-default">
            <motion.span whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }} className="inline-block transition-all duration-300">{t.cta.title}</motion.span> <br />
            <motion.span whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }} className="inline-block transition-all duration-300">{t.cta.subtitle}</motion.span>
          </h2>
          <button className="bg-brand-accent/20 backdrop-blur-md text-white px-8 md:px-12 py-4 md:py-6 rounded-full text-lg md:text-xl font-bold hover:scale-105 hover:bg-brand-accent/30 transition-all shadow-[0_0_50px_rgba(139,92,246,0.5)] border border-white/30">
            {t.cta.button}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-6 border-t border-white/30 bg-white/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 text-center md:text-left">
            <img src={LOGO_URL} alt="Mutqun Logo" className="h-20 md:h-32 w-auto invert group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xl md:text-3xl font-display font-bold uppercase tracking-tighter text-gradient-logo leading-none">Mutqun</span>
              <div className="flex flex-col mt-1">
                <span className="text-[10px] md:text-[12px] font-medium tracking-wider text-white/40 uppercase leading-tight">For IT solutions</span>
                <span className="text-[10px] md:text-[12px] font-medium tracking-wider text-white/40 leading-tight">متقن لتقنية المعلومات</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/30">
            <a href="#" className="hover:text-brand-accent hover:scale-110 transition-all duration-300">Twitter</a>
            <a href="#" className="hover:text-brand-accent hover:scale-110 transition-all duration-300">LinkedIn</a>
            <a href="#" className="hover:text-brand-accent hover:scale-110 transition-all duration-300">Instagram</a>
            <a href="#" className="hover:text-brand-accent hover:scale-110 transition-all duration-300">Behance</a>
          </div>

          <div className="text-[10px] md:text-xs font-medium text-white/30 flex flex-col items-center md:items-end gap-1 text-center md:text-right">
            <span>{t.footer.rights}</span>
            <span className="text-[10px] opacity-60">Website developed and designed by Medhat Khalil</span>
          </div>
        </div>
      </footer>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-card backdrop-blur-md w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border-white/30"
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                    <selectedService.icon size={32} />
                  </div>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 group-hover:text-brand-accent transition-colors duration-300">{selectedService.title}</h3>
                
                <div className="space-y-6">
                  <motion.div whileHover={{ x: 10 }} className="transition-all duration-300">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 block mb-2">{t.services.modal.how}</span>
                    <p className="text-lg text-white/50 leading-relaxed">
                      {selectedService.details}
                    </p>
                  </motion.div>
                  
                  <div className="pt-6 border-t border-white/5">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 block mb-4">{t.services.modal.improvement}</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }} className="p-4 bg-white/[0.02] rounded-xl border border-white/5 transition-all duration-300">
                        <span className="block font-bold mb-1">{t.services.modal.dataAnalysis}</span>
                        <p className="text-sm text-white/30">{t.services.modal.dataAnalysisDesc}</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }} className="p-4 bg-white/[0.02] rounded-xl border border-white/5 transition-all duration-300">
                        <span className="block font-bold mb-1">{t.services.modal.iterativeTesting}</span>
                        <p className="text-sm text-white/30">{t.services.modal.iterativeTestingDesc}</p>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="w-full bg-brand-accent/20 backdrop-blur-md text-white py-4 rounded-xl font-bold hover:scale-[1.02] hover:bg-brand-accent/30 transition-all shadow-[0_0_30px_rgba(139,92,246,0.4)] border border-white/30"
                  >
                    {t.services.modal.close}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-rtl {
          animation: marquee-rtl 30s linear infinite;
        }
      `}</style>
    </div>
  );
}


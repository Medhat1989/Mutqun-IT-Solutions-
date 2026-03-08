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

const LOGO_URL = "https://i.ibb.co/ZkRFZ2C/Black-and-White-Simple-Modern-Quirky-Letter-M-Logo-removebg-preview.png";

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
    <div className="min-h-screen selection:bg-black selection:text-white bg-brand-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 ${scrolled ? 'bg-white/60 backdrop-blur-2xl border-b border-white/20 shadow-sm' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2">
          <img src={LOGO_URL} alt="Mutqun Logo" className="h-12 md:h-16 w-auto" referrerPolicy="no-referrer" />
          <span className="text-lg md:text-xl font-bold uppercase tracking-tighter text-gradient-logo">Mutqun</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          <a href="#services" className="hover:opacity-50 transition-opacity">{t.nav.services}</a>
          <a href="#partners" className="hover:opacity-50 transition-opacity">{t.nav.partners}</a>
          <a href="#team" className="hover:opacity-50 transition-opacity">{t.nav.team}</a>
          <a href="#locations" className="hover:opacity-50 transition-opacity">{t.nav.locations}</a>
          <a href="#about" className="hover:opacity-50 transition-opacity">{t.nav.about}</a>
          
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 hover:opacity-50 transition-opacity font-bold"
          >
            <Languages size={18} />
            {lang === "en" ? "العربية" : "English"}
          </button>

          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-neutral-800 transition-colors">
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
            className="fixed inset-0 z-40 bg-white/90 backdrop-blur-2xl pt-24 px-8 flex flex-col gap-6 text-3xl font-display font-bold"
          >
            <a href="#services" className="hover:text-neutral-500 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.services}</a>
            <a href="#partners" className="hover:text-neutral-500 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.partners}</a>
            <a href="#team" className="hover:text-neutral-500 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.team}</a>
            <a href="#locations" className="hover:text-neutral-500 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.locations}</a>
            <a href="#about" className="hover:text-neutral-500 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.about}</a>
            <div className="mt-auto mb-12 flex flex-col gap-4">
              <button className="bg-black text-white px-8 py-4 rounded-full text-lg shadow-xl">
                {t.nav.startProject}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={targetRef} className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 md:pt-0 overflow-hidden">
        {/* Animated Liquid Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-lavender-glow/40 rounded-full blur-[100px] -z-10 animate-liquid-blob"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-lavender-light/30 rounded-full blur-[120px] -z-10 animate-liquid-blob"
        />

        {/* Moving Light Lines */}
        <div className="absolute inset-0 overflow-hidden -z-5 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-light-line" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-light-line [animation-delay:2s]" />
          <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-light-line [animation-delay:4s]" />
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/40 to-transparent animate-light-line [animation-delay:1s]" />
          <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/30 to-transparent animate-light-line [animation-delay:3s]" />
        </div>

        <motion.div style={{ opacity, scale }} className="max-w-5xl relative z-10 -mt-12 md:-mt-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-2 text-neutral-500"
          >
            {t.hero.tagline}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-bold leading-[1.1] md:leading-[0.9] tracking-tighter mb-8 ${isRtl ? 'font-arabic-display' : 'font-display'}`}
          >
            <span className="text-gradient-logo">{t.hero.title1}</span> <br />
            <span className="text-neutral-400/60">{t.hero.title2}</span> <br />
            <span className="text-gradient-logo">{t.hero.title3}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-neutral-600 max-w-2xl mb-12 leading-relaxed"
          >
            {t.hero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <button className="group flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-neutral-800 transition-all">
              {t.hero.ctaServices}
              <ArrowRight className={`transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </button>
            <button className="px-8 py-4 rounded-full text-lg font-medium border border-black/10 hover:bg-black/5 transition-all">
              {t.hero.ctaPartners}
            </button>
          </motion.div>
        </motion.div>

        {/* Decorative background element */}
        <div className={`absolute top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-100 rounded-full blur-[120px] -z-10 opacity-50 ${isRtl ? 'left-0 -translate-x-1/4' : 'right-0 translate-x-1/4'}`} />
      </section>

      {/* Partners Ticker */}
      <section id="partners" className="py-12 border-y border-black/5 overflow-hidden bg-white/40 backdrop-blur-md">
        <div className={`flex whitespace-nowrap ${isRtl ? 'animate-marquee-rtl' : 'animate-marquee'}`}>
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <div key={i} className="flex items-center gap-8 px-12">
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open(partner.url, '_blank')}>
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                  referrerPolicy="no-referrer"
                />
                <span className="hidden text-2xl font-display font-bold uppercase tracking-tighter opacity-20 group-hover:opacity-100 transition-opacity">
                  {partner.name}
                </span>
              </div>
              <div className="w-2 h-2 bg-black/10 rounded-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className={`text-4xl md:text-6xl font-bold tracking-tighter mb-6 ${isRtl ? 'font-arabic-display' : 'font-display'}`}>
                <span className="text-gradient-logo">{t.services.title}</span> <br />
                <span className="text-neutral-400/60">{t.services.subtitle}</span>
              </h2>
              <p className="text-lg text-neutral-600">
                {t.services.description}
              </p>
            </div>
            <div className={`${isRtl ? 'text-left' : 'text-right'}`}>
              <span className="text-sm font-bold uppercase tracking-widest text-neutral-400">{t.services.label}</span>
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
                className="glass-card p-8 md:p-12 flex flex-col gap-6 group rounded-[2.5rem] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full blur-3xl -z-10 group-hover:bg-black/10 transition-colors" />
                <div className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm">
                  <service.icon size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                  <p className="text-neutral-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-auto pt-8">
                  <button 
                    onClick={() => setSelectedService(service)}
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all"
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
      <section id="team" className="py-24 px-6 md:px-12 lg:px-24 bg-neutral-50 relative overflow-hidden">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-0 w-64 h-64 bg-neutral-200/40 rounded-full blur-[80px] -z-10 animate-liquid-blob"
        />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className={`text-4xl md:text-6xl font-bold tracking-tighter mb-6 ${isRtl ? 'font-arabic-display' : 'font-display'}`}>
                <span className="text-gradient-logo">{t.team.title}</span> <br />
                <span className="text-neutral-400/60">{t.team.subtitle}</span>
              </h2>
              <p className="text-lg text-neutral-600">
                {t.team.description}
              </p>
            </div>
            <div className={`${isRtl ? 'text-left' : 'text-right'}`}>
              <span className="text-sm font-bold uppercase tracking-widest text-neutral-400">{t.team.label}</span>
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
                className="group glass-card p-8 rounded-[2rem] border-white/50"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-48 aspect-square rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-black/5 shadow-sm">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-bold mb-1">{member.name}</h3>
                    <span className="block text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">{member.role}</span>
                    <p className="text-neutral-600 leading-relaxed mb-6 italic">
                      "{member.speech}"
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <span className="px-4 py-1.5 bg-black text-white rounded-full shadow-lg">{member.phone}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className={`text-4xl md:text-6xl font-bold tracking-tighter mb-6 ${isRtl ? 'font-arabic-display' : 'font-display'}`}>
                <span className="text-gradient-logo">{t.locations.title}</span> <br />
                <span className="text-neutral-400/60">{t.locations.subtitle}</span>
              </h2>
              <p className="text-lg text-neutral-600">
                {t.locations.description}
              </p>
            </div>
            <div className={`${isRtl ? 'text-left' : 'text-right'}`}>
              <span className="text-sm font-bold uppercase tracking-widest text-neutral-400">{t.locations.label}</span>
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
                className="p-8 glass-card rounded-3xl border border-white/40 hover:border-black/10 transition-all group"
              >
                <h3 className="text-2xl font-display font-bold mb-2">{loc.city}</h3>
                <span className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">{loc.office}</span>
                <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
                  {loc.address}
                </p>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-300">{t.locations.contact}</span>
                  <a href={`tel:${loc.phone}`} className="text-sm font-bold hover:underline">{loc.phone}</a>
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
            <h2 className={`text-4xl md:text-7xl font-bold tracking-tighter mb-8 ${isRtl ? 'font-arabic-display' : 'font-display'}`}>
              <span className="text-gradient-logo">{t.about.title}</span> <br />
              <span className="text-neutral-500 italic">{t.about.subtitle}</span> <span className="text-gradient-logo">{t.about.titleEnd}</span>
            </h2>
            <p className="text-xl text-neutral-400 leading-relaxed mb-12">
              {t.about.description}
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <span className="block text-4xl font-display font-bold mb-2">10+</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500">{t.about.partnersLabel}</span>
              </div>
              <div>
                <span className="block text-4xl font-display font-bold mb-2">50+</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500">{t.about.projectsLabel}</span>
              </div>
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
              className={`absolute -bottom-12 glass-card text-black p-8 rounded-2xl shadow-2xl hidden md:block border-white/50 ${isRtl ? '-right-12' : '-left-12'}`}
            >
              <span className="text-xs font-bold uppercase tracking-widest block mb-2">{t.about.philosophyLabel}</span>
              <p className="font-display font-bold text-xl">{t.about.philosophyText}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-neutral-50 -z-20" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-96 h-96 bg-neutral-200/50 rounded-full blur-[100px] -z-10 animate-liquid-blob"
        />
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border-white/60">
          <h2 className="text-4xl md:text-8xl font-bold tracking-tighter mb-12 text-gradient-logo">
            {t.cta.title} <br />
            {t.cta.subtitle}
          </h2>
          <button className="bg-black text-white px-8 md:px-12 py-4 md:py-6 rounded-full text-lg md:text-xl font-bold hover:scale-105 transition-transform shadow-xl">
            {t.cta.button}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-black/5 bg-white/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Mutqun Logo" className="h-10 md:h-12 w-auto grayscale" referrerPolicy="no-referrer" />
            <span className="text-lg font-display font-bold uppercase tracking-tighter text-gradient-logo">Mutqun</span>
          </div>
          
          <div className="flex flex-wrap gap-8 text-xs font-bold uppercase tracking-widest text-neutral-500">
            <a href="#" className="hover:text-black transition-colors">Twitter</a>
            <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-black transition-colors">Instagram</a>
            <a href="#" className="hover:text-black transition-colors">Behance</a>
          </div>

          <div className="text-xs font-medium text-neutral-400 flex flex-col items-end gap-1">
            <span>{t.footer.rights}</span>
            <span className="text-[10px] opacity-80">Website developed and designed by Medhat Khalil</span>
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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-card backdrop-blur-3xl w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl border-white/60"
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-sm">
                    <selectedService.icon size={32} />
                  </div>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">{selectedService.title}</h3>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-2">{t.services.modal.how}</span>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                      {selectedService.details}
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-black/5">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-4">{t.services.modal.improvement}</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-neutral-50 rounded-xl">
                        <span className="block font-bold mb-1">{t.services.modal.dataAnalysis}</span>
                        <p className="text-sm text-neutral-500">{t.services.modal.dataAnalysisDesc}</p>
                      </div>
                      <div className="p-4 bg-neutral-50 rounded-xl">
                        <span className="block font-bold mb-1">{t.services.modal.iterativeTesting}</span>
                        <p className="text-sm text-neutral-500">{t.services.modal.iterativeTestingDesc}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
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


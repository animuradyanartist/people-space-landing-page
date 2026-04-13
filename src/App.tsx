/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, FormEvent } from "react";
import { AdminProvider, useAdmin } from "./AdminContext";
import { AdminBar } from "./AdminBar";
import { translations } from "./translations";
import Dashboard from "./Dashboard";
import {
  Users,
  Clock,
  MapPin,
  Calendar,
  ShieldCheck,
  FileText,
  Settings,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Layers,
  Globe,
  Zap,
  ChevronRight,
  UserCircle,
  AlertCircle,
  Languages,
  Building2,
  Mail,
  X,
} from "lucide-react";

// --- Components ---

const RADIUS_MAP: Record<string, string> = {
  '2xl': 'rounded-2xl',
  'full': 'rounded-full',
  'lg': 'rounded-lg',
  'none': 'rounded-none',
};

const Logo = ({ className = "w-12 h-12", iconClassName = "w-7 h-7" }: { className?: string, iconClassName?: string }) => {
  const { branding } = useAdmin();
  const bg          = branding.logoColor  || '#4CAF50';
  const radiusClass = RADIUS_MAP[branding.logoRadius || '2xl'] ?? 'rounded-2xl';
  return (
    <div
      className={`relative flex items-center justify-center ${radiusClass} shadow-lg ${className}`}
      style={{ backgroundColor: bg, boxShadow: `0 8px 24px ${bg}33` }}
    >
      {branding.logoImage ? (
        <img src={branding.logoImage} className={`${iconClassName} object-contain`} alt="Logo" />
      ) : (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${iconClassName} text-white`}>
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(-35 12 12)" />
          <circle cx="19" cy="7" r="1.5" fill="currentColor" />
        </svg>
      )}
    </div>
  );
};

const Navbar = ({ t, lang, setLang, onStartTrial }: { t: any, lang: string, setLang: (l: string) => void, onStartTrial: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 pointer-events-none">
    <div className="container-custom flex items-center justify-between pointer-events-auto">
      <div className="flex items-center gap-4 group cursor-pointer">
        <Logo className="w-12 h-12 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(76,175,80,0.4)] transition-all duration-500" />
        <span className="text-2xl font-bold tracking-tighter text-brand group-hover:text-[#4CAF50] transition-colors duration-500">People Space</span>
      </div>
      
      <div className="hidden md:flex items-center gap-12 bg-white/70 backdrop-blur-xl px-8 py-3 rounded-full border border-line shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        {[
          { key: "platform", label: t.nav.platform },
          { key: "modules", label: t.nav.modules },
          { key: "ecosystem", label: t.nav.ecosystem },
          { key: "enterprise", label: t.nav.enterprise }
        ].map((item) => (
          <a key={item.key} href={`#${item.key}`} className="text-[11px] font-bold uppercase tracking-widest text-brand/60 hover:text-accent transition-colors relative group">
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
          </a>
        ))}
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xl px-3 py-2 rounded-full border border-line shadow-sm">
          <Languages className="w-4 h-4 text-brand/40" />
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent text-[10px] font-bold uppercase tracking-widest text-brand outline-none cursor-pointer hover:text-accent transition-colors"
          >
            <option value="en">EN</option>
            <option value="am">AM</option>
          </select>
        </div>
        <button
          onClick={onStartTrial}
          className="group relative px-8 py-3 bg-brand text-white overflow-hidden rounded-full transition-all duration-500 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
        >
          <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 text-sm font-bold group-hover:text-brand transition-colors duration-500">{t.nav.bookDemo}</span>
        </button>
      </div>
    </div>
  </nav>
);

const Hero = ({ t, onStartTrial }: { t: any, onStartTrial: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section className="relative pt-28 pb-32 px-6 overflow-hidden bg-paper">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] -mr-96 -mt-96 animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] -ml-72 -mb-72 pointer-events-none" />
      
      {/* Architectural Grid Lines */}
      <div className="grid-line-v left-1/4 opacity-30" />
      <div className="grid-line-v left-1/2 opacity-30" />
      <div className="grid-line-v left-3/4 opacity-30" />
      <div className="grid-line-h top-1/3 opacity-30" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="micro-label mb-12 flex items-center gap-4 group cursor-default">
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-px bg-accent group-hover:w-16 transition-all duration-500" 
              />
              <span className="group-hover:text-accent transition-colors">{t.hero.microLabel}</span>
            </div>
            
            <h1 className="text-[10vw] lg:text-[8rem] font-bold text-brand leading-[0.85] mb-8 tracking-tighter uppercase">
              {t.hero.title1} <br />
              <span className="text-accent italic font-serif lowercase tracking-normal hover:text-brand transition-colors duration-700 cursor-default">{t.hero.title2}</span> <br />
              <span className="text-brand/20 hover:text-accent transition-colors duration-700 cursor-default">{t.hero.title3}</span>
            </h1>

            <div className="grid md:grid-cols-12 gap-12 items-end">
              <div className="md:col-span-7">
                <p className="text-xl text-[#3e4448] leading-relaxed font-medium tracking-tight mb-8 max-w-xl">
                  {t.hero.description}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <button
                    onClick={onStartTrial}
                    className="btn-primary group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 flex items-center group-hover:text-brand transition-colors duration-500">
                      {t.hero.bookDemoBtn}
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-paper bg-white overflow-hidden grayscale shadow-sm">
                          <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-brand">{t.hero.trustedBy}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] text-accent font-bold uppercase tracking-widest">{t.hero.liveSync}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div style={{ y: y1 }} className="md:col-span-5 flex flex-col gap-4">
                {/* Product preview card */}
                <div className="bg-white border border-line rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="bg-brand/5 border-b border-line px-5 py-3 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
                    <span className="ml-3 text-[10px] font-bold uppercase tracking-widest text-brand/30">People Space — Dashboard</span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Employees', value: '248', color: 'bg-accent/10 text-accent' },
                        { label: 'On Leave', value: '12', color: 'bg-yellow-50 text-yellow-600' },
                        { label: 'Requests', value: '34', color: 'bg-blue-50 text-blue-500' },
                      ].map(stat => (
                        <div key={stat.label} className={`${stat.color} rounded-xl p-3 text-center`}>
                          <div className="text-xl font-bold">{stat.value}</div>
                          <div className="text-[9px] font-bold uppercase tracking-widest opacity-70 mt-0.5">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-brand/3 rounded-xl p-4 space-y-2.5">
                      {[
                        { name: 'Anna K.', action: 'Vacation approved', time: '2m ago', dot: 'bg-accent' },
                        { name: 'Mark T.', action: 'Check-in recorded', time: '8m ago', dot: 'bg-blue-400' },
                        { name: 'Sara M.', action: 'Trip request submitted', time: '15m ago', dot: 'bg-yellow-400' },
                      ].map(item => (
                        <div key={item.name} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${item.dot} shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-brand">{item.name}</span>
                            <span className="text-xs text-brand/40 ml-1.5">{item.action}</span>
                          </div>
                          <span className="text-[10px] text-brand/30 shrink-0">{item.time}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] text-brand/30 font-bold uppercase tracking-widest">Attendance today</span>
                      <span className="text-[10px] font-bold text-accent">94% present</span>
                    </div>
                    <div className="h-1.5 bg-brand/5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: '94%' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Value Strip */}
          <motion.div 
            style={{ y: y2 }}
            className="mt-32 pt-16 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-16"
          >
            {[
              { label: t.hero.value1, desc: t.hero.value1Desc },
              { label: t.hero.value2, desc: t.hero.value2Desc },
              { label: t.hero.value3, desc: t.hero.value3Desc },
              { label: t.hero.value4, desc: t.hero.value4Desc }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -5 }}
                className="space-y-2 group cursor-default"
              >
                <div className="text-sm font-bold text-brand uppercase tracking-tight group-hover:text-accent transition-colors">{item.label}</div>
                <div className="text-[10px] text-brand/40 uppercase tracking-widest font-bold group-hover:text-brand/60 transition-colors">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PlatformOverview = ({ t }: { t: any }) => (
  <section className="section-padding bg-paper relative overflow-hidden" id="platform">
    <div className="grid-line-v left-1/2 opacity-30" />
    <div className="container-custom relative z-10">
      <div className="grid lg:grid-cols-2 gap-32 items-start">
        <div className="max-w-xl">
          <div className="micro-label mb-12">{t.overview.microLabel}</div>
          <h2 className="text-7xl md:text-8xl font-bold text-brand mb-12 leading-[0.85] tracking-tighter uppercase">
            {t.overview.title1} <br />
            <span className="text-brand/20">{t.overview.title2}</span> <br />
            <span className="text-accent italic font-serif lowercase tracking-normal">{t.overview.title3}</span>
          </h2>
          <p className="text-2xl text-brand/70 leading-tight font-medium tracking-tight">
            {t.overview.description}
          </p>
        </div>
        
        <div className="grid gap-12 pt-24 lg:pt-48">
          {[
            { 
              title: t.overview.card1Title, 
              desc: t.overview.card1Desc,
              icon: () => <Logo className="w-12 h-12" iconClassName="w-6 h-6" />
            },
            { 
              title: t.overview.card2Title, 
              desc: t.overview.card2Desc,
              icon: Zap
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-12 bg-white border border-line hover:border-accent transition-all duration-500 group"
            >
              <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center mb-8 group-hover:bg-accent transition-colors duration-500">
                {typeof item.icon === 'function' ? <item.icon /> : <item.icon className="w-5 h-5 text-white group-hover:text-brand transition-colors duration-500" />}
              </div>
              <h3 className="text-2xl font-bold text-brand mb-4 uppercase tracking-tighter">{item.title}</h3>
              <p className="text-brand/60 leading-snug font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ProblemSection = ({ t }: { t: any }) => (
  <section className="section-padding bg-brand text-white relative overflow-hidden">
    {/* Interactive Background */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none" />
    
    <div className="grid-line-v left-1/4 opacity-10" />
    <div className="grid-line-v left-1/2 opacity-10" />
    <div className="grid-line-v left-3/4 opacity-10" />
    
    <div className="container-custom relative z-10">
      <div className="grid lg:grid-cols-12 gap-20 items-end mb-32">
        <div className="lg:col-span-8">
          <div className="micro-label text-accent mb-12">{t.problem.microLabel}</div>
          <h2 className="text-7xl md:text-9xl font-bold mb-0 leading-[0.8] tracking-tighter uppercase">
            {t.problem.title1} <br />
            <span className="text-white/20 hover:text-accent transition-colors duration-700 cursor-default">{t.problem.title2}</span> <br />
            <span className="text-accent italic font-serif lowercase tracking-normal">{t.problem.title3}</span>
          </h2>
        </div>
        <div className="lg:col-span-4">
          <p className="text-[20px] text-white/60 leading-[32px] font-medium tracking-tight">
            {t.problem.description}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-white/10">
        {[
          { title: t.problem.card1Title, desc: t.problem.card1Desc },
          { title: t.problem.card2Title, desc: t.problem.card2Desc },
          { title: t.problem.card3Title, desc: t.problem.card3Desc },
          { title: t.problem.card4Title, desc: t.problem.card4Desc }
        ].map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)', y: -5 }}
            className="p-12 border-r border-b border-white/10 transition-all duration-500 group relative"
          >
            <div className="text-6xl font-bold text-white/5 mb-12 group-hover:text-accent/20 transition-colors font-serif italic">0{i + 1}</div>
            <h4 className="text-xl font-bold mb-6 group-hover:text-accent transition-colors uppercase tracking-tight">{item.title}</h4>
            <p className="text-white/40 leading-snug font-medium group-hover:text-white/60 transition-colors">{item.desc}</p>
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent transition-all duration-700 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ModulesSection = ({ t }: { t: any }) => (
  <section className="section-padding bg-paper relative overflow-hidden" id="modules">
    {/* Dynamic Background Accents */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(114,191,68,0.03),transparent)] pointer-events-none" />
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[100px] animate-pulse pointer-events-none" />
    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand/5 rounded-full blur-[100px] pointer-events-none" />
    
    <div className="grid-line-h top-0 opacity-30" />
    <div className="container-custom relative z-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32">
        <div className="max-w-3xl">
          <div className="micro-label mb-12 flex items-center gap-3">
            <span className="w-8 h-px bg-accent" />
            {t.modules.microLabel}
          </div>
          <h2 className="text-7xl md:text-9xl font-bold text-brand mb-12 leading-[0.8] tracking-tighter uppercase">
            {t.modules.title1} <br />
            <span className="text-brand/20 hover:text-accent transition-colors duration-700 cursor-default">{t.modules.title2}</span> <br />
            <span className="text-accent italic font-serif lowercase tracking-normal">{t.modules.title3}</span>
          </h2>
          <p className="text-2xl text-brand/70 leading-tight font-medium tracking-tight max-w-2xl">
            {t.modules.description}
          </p>
        </div>
        <div className="hidden lg:block pb-4">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-brand/30">
            <div className="w-12 h-px bg-line" />
            Scroll to explore
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: <ShieldCheck className="w-6 h-6" />,
            name: t.modules.module1Name,
            desc: t.modules.module1Desc,
            use: t.modules.module1Use,
            visualType: 0,
            tag: "Core",
            color: "bg-blue-500"
          },
          {
            icon: <Users className="w-6 h-6" />,
            name: t.modules.module2Name,
            desc: t.modules.module2Desc,
            use: t.modules.module2Use,
            visualType: 2,
            tag: "Structure",
            color: "bg-purple-500"
          },
          {
            icon: <UserCircle className="w-6 h-6" />,
            name: t.modules.module3Name,
            desc: t.modules.module3Desc,
            use: t.modules.module3Use,
            visualType: 0,
            tag: "Self-Service",
            color: "bg-orange-500"
          },
          {
            icon: <Calendar className="w-6 h-6" />,
            name: t.modules.module4Name,
            desc: t.modules.module4Desc,
            use: t.modules.module4Use,
            visualType: 1,
            tag: "Planning",
            color: "bg-accent"
          },
          {
            icon: <Clock className="w-6 h-6" />,
            name: t.modules.module5Name,
            desc: t.modules.module5Desc,
            use: t.modules.module5Use,
            visualType: 4,
            tag: "Real-time",
            color: "bg-red-500"
          },
          {
            icon: <MapPin className="w-6 h-6" />,
            name: t.modules.module6Name,
            desc: t.modules.module6Desc,
            use: t.modules.module6Use,
            visualType: 3,
            tag: "Mobility",
            color: "bg-teal-500"
          }
        ].map((module, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10 }}
            className="group relative p-10 bg-white border border-line hover:border-accent/50 transition-all duration-700 cursor-default flex flex-col overflow-hidden rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_rgba(114,191,68,0.1)]"
          >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Animated Gradient Orb */}
            <div className={`absolute -top-20 -right-20 w-64 h-64 ${module.color} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-[80px] transition-all duration-1000 group-hover:scale-150 pointer-events-none`} />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  className={`w-16 h-16 rounded-3xl ${module.color} flex items-center justify-center shadow-2xl shadow-brand/10 group-hover:shadow-accent/40 transition-all duration-500`}
                >
                  <div className="text-white group-hover:scale-110 transition-transform duration-500">{module.icon}</div>
                </motion.div>
                <div className="px-4 py-1.5 bg-brand/5 rounded-full text-[10px] font-black text-brand/40 uppercase tracking-widest group-hover:bg-accent group-hover:text-brand transition-all duration-500">
                  {module.tag}
                </div>
              </div>

              <h4 className="text-3xl font-bold text-brand mb-6 tracking-tighter group-hover:text-accent transition-colors duration-500">
                {module.name}
              </h4>
              <p className="text-lg text-brand/60 mb-12 leading-relaxed font-medium group-hover:text-brand/80 transition-colors duration-500">
                {module.desc}
              </p>
              
              <div className="mb-12 transform group-hover:scale-[1.05] transition-transform duration-700 ease-[0.16, 1, 0.3, 1]">
                <ModuleVisual type={module.visualType} t={t} />
              </div>

              <div className="pt-8 border-t border-line/50 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-brand/30 group-hover:text-accent transition-colors">{t.modules.primaryUseCase}</span>
                  <div className="w-10 h-10 rounded-full bg-paper border border-line flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 text-brand/40 group-hover:text-brand transition-all duration-500" />
                  </div>
                </div>
                <p className="text-sm text-brand/50 italic font-serif leading-relaxed group-hover:text-brand transition-colors duration-500">
                  "{module.use}"
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ModuleVisual = ({ type, t }: { type: number, t: any }) => {
  if (type === 0) {
    // Core / Profile Visual
    return (
      <div className="relative w-full aspect-[16/10] bg-white border border-line rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col group/card">
        <div className="flex items-center gap-4 mb-6 bg-paper/30 p-4 rounded-2xl border border-line/50 group-hover/card:bg-white group-hover/card:shadow-lg group-hover/card:shadow-brand/5 transition-all duration-500">
          <div className="w-14 h-14 rounded-full bg-brand/5 border-2 border-white shadow-sm overflow-hidden relative">
            <img src="https://picsum.photos/seed/hermine/150/150" alt="" className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-brand/10 opacity-0 group-hover/card:opacity-100 transition-opacity" />
          </div>
          <div className="space-y-2 flex-1">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '80%' }}
              className="h-2.5 bg-brand rounded-full" 
            />
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '50%' }}
              className="h-1.5 bg-brand/20 rounded-full" 
            />
          </div>
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover/card:rotate-12 transition-transform duration-500">
            <UserCircle className="w-5 h-5 text-accent" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-brand/5 rounded-2xl border border-line flex flex-col p-4 gap-3 group-hover/card:border-brand/20 transition-colors">
            <div className="w-16 h-2 bg-brand/20 rounded-full" />
            <div className="space-y-1.5">
              <div className="w-full h-1.5 bg-brand/5 rounded-full" />
              <div className="w-3/4 h-1.5 bg-brand/5 rounded-full" />
            </div>
          </div>
          <div className="h-20 bg-accent/5 rounded-2xl border border-accent/10 flex flex-col p-4 gap-3 group-hover/card:border-accent/30 transition-colors">
            <div className="w-16 h-2 bg-accent/30 rounded-full" />
            <div className="space-y-1.5">
              <div className="w-full h-1.5 bg-accent/5 rounded-full" />
              <div className="w-2/3 h-1.5 bg-accent/5 rounded-full" />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover/card:bg-accent/10 transition-colors" />
      </div>
    );
  }
  if (type === 1) {
    // Vacation / Calendar Visual
    return (
      <div className="relative w-full aspect-[16/10] bg-white border border-line rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col group/card">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand/5 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-brand" />
            </div>
            <div className="w-24 h-2.5 bg-brand/10 rounded-full" />
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="w-2 h-2 rounded-full bg-brand/20" />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2.5">
          {Array.from({ length: 21 }).map((_, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className={`aspect-square rounded-xl border transition-all duration-500 ${
                i >= 8 && i <= 12 
                  ? 'bg-accent border-accent shadow-[0_8px_16px_rgba(183,235,70,0.3)] scale-110 z-10' 
                  : 'bg-paper/30 border-line group-hover/card:bg-paper/50'
              }`} 
            />
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-5 border-t border-line/50">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm hover:z-20 transition-all hover:scale-110 cursor-pointer">
                <img src={`https://picsum.photos/seed/u${i}/100/100`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 bg-accent/10 rounded-full text-[9px] font-black text-accent uppercase tracking-widest border border-accent/20"
          >
            5 Pending
          </motion.div>
        </div>
      </div>
    );
  }
  if (type === 2) {
    // Org Structure Visual
    return (
      <div className="relative w-full aspect-[16/10] bg-white border border-line rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col items-center justify-center group/card">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(114,191,68,0.05),transparent)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
        <div className="relative">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 rounded-2xl bg-brand/5 border border-line flex items-center justify-center mb-8 relative z-10 shadow-sm group-hover/card:border-accent group-hover/card:bg-white transition-all duration-500"
          >
            <Users className="w-8 h-8 text-brand/40 group-hover/card:text-accent transition-colors" />
          </motion.div>
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-px h-10 bg-gradient-to-b from-line to-transparent" />
        </div>
        <div className="flex gap-12 relative">
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-40 h-px bg-line" />
          {[1, 2, 3].map(i => (
            <div key={i} className="relative pt-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-10 bg-line" />
              <motion.div 
                whileHover={{ y: -5 }}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 ${i === 2 ? 'bg-accent/10 border-accent shadow-[0_10px_20px_rgba(183,235,70,0.2)] scale-110' : 'bg-brand/5 border-line bg-white'}`}
              >
                <div className={`w-6 h-6 rounded-full ${i === 2 ? 'bg-accent shadow-[0_0_10px_rgba(183,235,70,0.5)]' : 'bg-brand/20'}`} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (type === 3) {
    // Business Trip / Map Visual
    return (
      <div className="relative w-full aspect-[16/10] bg-white border border-line rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col group/card">
        <div className="absolute inset-0 opacity-40 group-hover/card:opacity-60 transition-opacity duration-700">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <motion.path 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
              d="M10,50 Q30,20 50,50 T90,50" stroke="currentColor" className="text-line" strokeWidth="0.5" 
            />
            <motion.path 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              d="M20,30 Q40,60 60,30 T80,60" stroke="currentColor" className="text-line" strokeWidth="0.5" 
            />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <div className="w-28 h-2.5 bg-brand/10 rounded-full" />
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shadow-[0_10px_20px_rgba(183,235,70,0.2)] border border-accent/20"
            >
              <MapPin className="w-6 h-6 text-accent" />
            </motion.div>
          </div>
          <div className="mt-auto bg-white/80 backdrop-blur-xl border border-line p-5 rounded-3xl shadow-2xl transform group-hover/card:translate-y-[-8px] transition-all duration-500 border-white/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(183,235,70,0.8)] animate-pulse" />
              <div className="w-40 h-2.5 bg-brand/20 rounded-full" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-brand/20" />
              <div className="w-24 h-2.5 bg-brand/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Attendance / Clock Visual (Default)
  return (
    <div className="relative w-full aspect-[16/10] bg-white border border-line rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col group/card">
      <div className="flex items-center justify-between mb-12">
        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shadow-lg shadow-accent/5 border border-accent/10 group-hover/card:rotate-[-5deg] transition-transform">
          <Clock className="w-7 h-7 text-accent" />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-brand rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Now</span>
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="w-32 h-3 bg-brand/10 rounded-full" />
            <div className="w-20 h-2 bg-brand/5 rounded-full" />
          </div>
          <span className="text-2xl font-black text-brand tracking-tighter tabular-nums">09:41<span className="text-accent animate-pulse">:</span>00</span>
        </div>
        <div className="h-3 bg-gray-50 rounded-full overflow-hidden p-0.5 border border-line/50">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '75%' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-gradient-to-r from-brand to-accent rounded-full shadow-[0_0_10px_rgba(183,235,70,0.3)]" 
          />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5, zIndex: 10 }}
                className="w-9 h-9 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-md cursor-pointer"
              >
                <img src={`https://picsum.photos/seed/at${i}/100/100`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
            <div className="w-9 h-9 rounded-full border-2 border-white bg-paper flex items-center justify-center text-[10px] font-bold text-brand/40 shadow-sm">
              +12
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="w-16 h-2 bg-brand/10 rounded-full" />
            <div className="w-10 h-1.5 bg-brand/5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

const UserRoles = ({ t }: { t: any }) => (
  <section className="section-padding bg-paper relative overflow-hidden">
    <div className="grid-line-v left-1/3 opacity-30" />
    <div className="grid-line-v left-2/3 opacity-30" />
    
    <div className="container-custom">
      <div className="max-w-4xl mb-32">
        <div className="micro-label mb-12">{t.roles.microLabel}</div>
        <h2 className="text-7xl md:text-8xl font-bold text-brand mb-12 leading-[0.85] tracking-tighter uppercase">
          {t.roles.title1} <br />
          <span className="text-brand/20">{t.roles.title2}</span> <br />
          <span className="text-accent italic font-serif lowercase tracking-normal">{t.roles.title3}</span>
        </h2>
        <p className="text-[20px] text-brand/70 leading-[32px] font-medium tracking-tight max-w-3xl">
          {t.roles.description}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-0 border border-line">
        {[
          {
            role: t.roles.role1,
            icon: <UserCircle className="w-6 h-6" />,
            desc: t.roles.role1Desc,
            actions: t.roles.role1Actions
          },
          {
            role: t.roles.role2,
            icon: <Users className="w-6 h-6" />,
            desc: t.roles.role2Desc,
            actions: t.roles.role2Actions
          },
          {
            role: t.roles.role3,
            icon: <ShieldCheck className="w-6 h-6" />,
            desc: t.roles.role3Desc,
            actions: t.roles.role3Actions
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-16 border-r last:border-r-0 border-line hover:bg-white transition-all duration-500"
          >
            <div className="text-7xl font-bold text-brand/5 mb-12 group-hover:text-accent/10 transition-colors font-serif italic">0{i + 1}</div>
            <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white mb-10 group-hover:bg-accent group-hover:text-brand transition-colors duration-500">
              {item.icon}
            </div>
            <h4 className="text-2xl font-bold text-brand mb-6 uppercase tracking-tight">{item.role}</h4>
            <p className="text-brand/60 mb-12 leading-snug font-medium">{item.desc}</p>
            <ul className="space-y-6">
              {item.actions.map((action: string, j: number) => (
                <li key={j} className="flex items-start gap-4 text-[13px] text-brand/50 font-medium">
                  <div className="mt-1 w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-2.5 h-2.5 text-accent" />
                  </div>
                  {action}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProductVisuals = ({ t }: { t: any }) => (
  <section className="section-padding bg-paper overflow-hidden relative">
    <div className="grid-line-h top-0 opacity-30" />
    
    {/* Background Accents */}
    <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
    
    <div className="container-custom relative z-10">
      <div className="grid lg:grid-cols-2 gap-32 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="space-y-12 relative z-10">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -20, rotate: -2, scale: 1.02 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative p-12 bg-white border border-line shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_60px_100px_-20px_rgba(114,191,68,0.15)] transition-all duration-700 group"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white group-hover:bg-accent group-hover:text-brand transition-colors duration-500">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-brand text-lg uppercase tracking-tight group-hover:text-accent transition-colors">{t.visuals.cardTitle}</h5>
                    <p className="text-[9px] text-brand/30 font-bold tracking-widest uppercase">{t.visuals.cardSubtitle}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-brand/10" />
                  <div className="w-2 h-2 rounded-full bg-brand/10" />
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { name: t.visuals.user1Name, status: t.visuals.user1Status, time: "09:02 AM", color: "bg-accent" },
                  { name: t.visuals.user2Name, status: t.visuals.user2Status, time: "08:45 AM", color: "bg-accent/40" },
                  { name: t.visuals.user3Name, status: t.visuals.user3Status, time: "12:15 PM", color: "bg-orange-400" }
                ].map((user, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10, backgroundColor: 'rgba(114,191,68,0.05)' }}
                    className="flex items-center justify-between p-4 border border-line hover:border-accent transition-all bg-paper/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand/20 border border-line overflow-hidden">
                          <img src={`https://picsum.photos/seed/p${i}/100/100`} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.color}`} />
                      </div>
                      <div>
                        <p className="font-bold text-brand text-sm">{user.name}</p>
                        <p className="text-[10px] text-brand/40 font-medium">{user.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-brand">{user.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="micro-label mb-12">{t.visuals.microLabel}</div>
          <h2 className="text-[87px] font-bold text-brand mb-12 leading-[83.6px] tracking-tighter uppercase">
            {t.visuals.title1} <br />
            <span className="text-brand/20 hover:text-accent transition-colors duration-700 cursor-default">{t.visuals.title2}</span> <br />
            <span className="text-accent italic font-serif lowercase tracking-normal text-[90px] leading-[97.6px]">{t.visuals.title3}</span>
          </h2>
          <p className="text-[20px] text-brand/70 leading-[32px] font-medium tracking-tight mb-12">
            {t.visuals.description}
          </p>
          <div className="space-y-8">
            {[
              { title: t.visuals.feature1Title, desc: t.visuals.feature1Desc },
              { title: t.visuals.feature2Title, desc: t.visuals.feature2Desc }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 10 }}
                className="flex items-start gap-6 group cursor-default"
              >
                <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white group-hover:bg-accent group-hover:text-brand transition-colors duration-500 shrink-0 shadow-lg shadow-brand/10">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h6 className="text-lg font-bold text-brand mb-1 uppercase tracking-tight group-hover:text-accent transition-colors">{item.title}</h6>
                  <p className="text-brand/50 text-sm font-medium leading-snug">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Benefits = ({ t }: { t: any }) => (
  <section className="section-padding bg-paper relative overflow-hidden leading-[27px]">
    <div className="grid-line-h top-0 opacity-30" />
    <div className="container-custom relative z-10">
      <div className="grid lg:grid-cols-2 gap-32 items-center">
        <div>
          <div className="micro-label mb-12">{t.benefits.microLabel}</div>
          <h2 className="text-[71px] font-bold text-brand mb-12 leading-[89.6px] tracking-tighter uppercase">
            {t.benefits.title1} <br />
            <span className="text-accent italic font-serif lowercase tracking-normal">{t.benefits.title2}</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-12">
            {[
              { title: t.benefits.card1Title, desc: t.benefits.card1Desc },
              { title: t.benefits.card2Title, desc: t.benefits.card2Desc }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4 group"
              >
                <div className="w-12 h-px bg-line group-hover:bg-accent transition-colors duration-500" />
                <h4 className="text-xl font-bold text-brand uppercase tracking-tight">{item.title}</h4>
                <p className="text-brand/50 leading-snug font-medium text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative group">
          <div className="aspect-square bg-brand flex items-center justify-center p-12 md:p-24 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(114,191,68,0.2),transparent)]" />
             <div className="relative z-10 text-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[100px] font-bold text-white tracking-tighter leading-none"
                >
                  98<span className="text-accent">%</span>
                </motion.div>
                <div className="text-accent uppercase tracking-[0.4em] text-[17px] font-bold">{t.benefits.statLabel}</div>
                <div className="text-white/30 text-[11px] mt-3 font-medium">Based on customer surveys</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Ecosystem = ({ t }: { t: any }) => (
  <section className="section-padding bg-brand text-white overflow-hidden relative" id="ecosystem">
    {/* Dynamic Background */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
    
    <div className="grid-line-v left-1/2 opacity-10" />
    <div className="container-custom relative z-10">
      <div className="grid lg:grid-cols-12 gap-20 items-end mb-32">
        <div className="lg:col-span-8">
          <div className="micro-label text-accent mb-12 border-accent/20">{t.ecosystem.microLabel}</div>
          <h2 className="text-7xl md:text-9xl font-bold mb-0 leading-[0.8] tracking-tighter uppercase">
            {t.ecosystem.title1} <br />
            <span className="text-white/20 hover:text-accent transition-colors duration-700 cursor-default">{t.ecosystem.title2}</span>
          </h2>
        </div>
        <div className="lg:col-span-4">
          <p className="text-[20px] text-white/60 leading-[33px] font-medium tracking-tight">
            {t.ecosystem.description}
          </p>
        </div>
      </div>

      <div className="relative flex justify-center py-20">
        <div className="w-full max-w-5xl aspect-square md:aspect-video relative flex items-center justify-center border border-white/5 overflow-hidden group/eco">
          {/* Central Core */}
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: ["0 0 20px rgba(114,191,68,0.2)", "0 0 60px rgba(114,191,68,0.4)", "0 0 20px rgba(114,191,68,0.2)"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-64 h-64 rounded-full border border-white/20 flex items-center justify-center relative z-10 backdrop-blur-2xl bg-white/10 group-hover/eco:border-accent transition-colors duration-700"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(114,191,68,0.4)] group-hover/eco:scale-110 transition-transform duration-700">
                <Layers className="w-8 h-8 text-brand" />
              </div>
              <div className="text-xl font-bold tracking-tighter uppercase">{t.ecosystem.coreTitle}</div>
              <div className="text-[9px] text-accent font-bold uppercase tracking-widest mt-2">{t.ecosystem.coreSubtitle}</div>
            </div>
          </motion.div>

          {/* Orbiting Modules */}
          {[
            { label: t.ecosystem.module1, icon: <Clock className="w-4 h-4" />, pos: "top-10 left-10", color: "hover:bg-accent hover:text-brand" },
            { label: t.ecosystem.module2, icon: <Calendar className="w-4 h-4" />, pos: "top-10 right-10", color: "hover:bg-accent hover:text-brand" },
            { label: t.ecosystem.module3, icon: <Users className="w-4 h-4" />, pos: "bottom-10 left-10", color: "hover:bg-accent hover:text-brand" },
            { label: t.ecosystem.module4, icon: <FileText className="w-4 h-4" />, pos: "bottom-10 right-10", color: "hover:bg-accent hover:text-brand" }
          ].map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className={`absolute ${m.pos} flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-full group transition-all cursor-pointer z-20 ${m.color}`}
            >
              <div className="text-accent group-hover:text-inherit transition-colors duration-500">
                {m.icon}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest">{m.label}</div>
            </motion.div>
          ))}

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 1000 600">
            <motion.path 
              d="M500 300 L150 100 M500 300 L850 100 M500 300 L150 500 M500 300 L850 500" 
              stroke="url(#line-gradient)" 
              strokeWidth="2" 
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#72BF44" stopOpacity="0" />
                <stop offset="50%" stopColor="#72BF44" stopOpacity="1" />
                <stop offset="100%" stopColor="#72BF44" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  </section>
);

const BusinessValue = ({ t }: { t: any }) => (
  <section className="section-padding bg-paper" id="business" data-nav="enterprise">
    <div className="container-custom">
      <div className="grid lg:grid-cols-2 gap-32 items-start">
        <div>
          <div className="micro-label mb-12">{t.business.microLabel}</div>
          <h2 className="text-7xl md:text-8xl font-bold text-brand mb-16 leading-[0.85] tracking-tighter uppercase">
            {t.business.title1} <br />
            <span className="text-accent italic font-serif lowercase tracking-normal">{t.business.title2}</span>
          </h2>
          <div className="space-y-12">
            {[
              { title: t.business.card1Title, desc: t.business.card1Desc },
              { title: t.business.card2Title, desc: t.business.card2Desc }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center shrink-0 group-hover:bg-accent transition-all duration-500">
                  <BarChart3 className="w-5 h-5 text-white group-hover:text-brand transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand mb-2 uppercase tracking-tight">{item.title}</h4>
                  <p className="text-brand/60 leading-snug font-medium text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-brand p-16 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl opacity-20" />
          <div className="relative z-10">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-tight">{t.business.whyTitle}</h4>
            </div>
            <ul className="space-y-8">
              {t.business.whyList.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-6 text-white/50 font-medium text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const FinalCTA = ({ t, onStartTrial }: { t: any, onStartTrial: () => void }) => (
  <section className="py-64 px-6 bg-paper relative overflow-hidden">
    <div className="grid-line-h top-0 opacity-30" />
    <div className="max-w-6xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-[103.3px] font-bold text-brand mb-16 tracking-tighter leading-[112.04px] uppercase">
          {t.cta.title1} <br />
          <span className="text-brand/20">{t.cta.title2}</span> <br />
          <span className="text-accent italic font-serif lowercase tracking-normal">{t.cta.title3}</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={onStartTrial}
            className="btn-primary"
          >
            {t.cta.bookDemoBtn}
            <ArrowRight className="w-5 h-5 ml-3" />
          </button>
          <button
            onClick={onStartTrial}
            className="btn-secondary"
          >
            {t.cta.contactSalesBtn}
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const ALL_COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
  "Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia",
  "Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Brazzaville)","Congo (Kinshasa)",
  "Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador",
  "Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France",
  "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau",
  "Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland",
  "Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait",
  "Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico",
  "Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru",
  "Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman",
  "Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
  "Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","São Tomé and Príncipe",
  "Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia",
  "South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
  "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey",
  "Turkmenistan","Tuvalu","UAE","Uganda","Ukraine","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu",
  "Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

const CountrySelect = ({ value, onChange, placeholder, inputClass }: {
  value: string; onChange: (v: string) => void; placeholder: string; inputClass: string;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filtered = ALL_COUNTRIES.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if (!open) setSearch('');
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className={`${inputClass} cursor-pointer flex items-center justify-between`}
        onClick={() => setOpen(v => !v)}>
        <span className={value ? 'text-brand' : 'text-brand/30'}>{value || placeholder}</span>
        <ChevronRight className={`w-4 h-4 text-brand/30 transition-transform ${open ? 'rotate-90' : ''}`} />
      </div>
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-paper border border-line rounded-xl shadow-xl overflow-hidden">
          <div className="p-2 border-b border-line">
            <input autoFocus type="text" className="w-full bg-brand/5 rounded-lg px-3 py-2 text-sm text-brand placeholder:text-brand/30 focus:outline-none"
              placeholder="Search country..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="max-h-52 overflow-y-auto">
            {filtered.length === 0
              ? <div className="px-4 py-3 text-sm text-brand/30">No results</div>
              : filtered.map(c => (
                <div key={c} className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-accent/10 transition-colors ${value === c ? 'bg-accent/10 font-semibold text-accent' : 'text-brand'}`}
                  onMouseDown={() => { onChange(c); setOpen(false); }}>
                  {c}
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

const ContactModal = ({ isOpen, onClose, lang, onSuccess }: { isOpen: boolean, onClose: () => void, lang: string, onSuccess?: () => void }) => {
  const t = (translations as any)[lang].contact;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ companyName: '', email: '', companySize: '', phone: '', country: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full bg-brand/5 border border-line rounded-xl px-4 py-3 text-brand placeholder:text-brand/30 focus:outline-none focus:border-accent transition-colors text-sm";
  const labelClass = "block text-[10px] font-bold uppercase tracking-widest text-brand/40 mb-1.5";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-brand/50 backdrop-blur-md" />

      <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-paper rounded-3xl shadow-2xl overflow-hidden">

        <button onClick={onClose} className="absolute top-5 right-5 text-brand/30 hover:text-brand transition-colors z-10 p-1">
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="p-10 sm:p-12">

              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <Logo className="w-10 h-10" iconClassName="w-6 h-6" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand/30">People Space</p>
                  <h3 className="text-2xl font-bold text-brand tracking-tight leading-tight">{t.title}</h3>
                </div>
              </div>

              <p className="text-brand/50 text-sm leading-relaxed mb-8">{t.subtitle}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={labelClass}><span className="flex items-center gap-1.5"><Building2 className="w-3 h-3" />{t.companyName}</span></label>
                  <input type="text" required className={inputClass} placeholder={t.companyNamePlaceholder}
                    value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} />
                </div>

                <div>
                  <label className={labelClass}><span className="flex items-center gap-1.5"><Mail className="w-3 h-3" />{t.email}</span></label>
                  <input type="email" required className={inputClass} placeholder={t.emailPlaceholder}
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>

                <div>
                  <label className={labelClass}><span className="flex items-center gap-1.5"><Users className="w-3 h-3" />{t.companySize}</span></label>
                  <select required className={inputClass}
                    value={formData.companySize} onChange={e => setFormData({ ...formData, companySize: e.target.value })}>
                    <option value="" disabled>{t.companySizePlaceholder}</option>
                    <option value="1-10">1–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-200">51–200</option>
                    <option value="201-500">201–500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}><span className="flex items-center gap-1.5"><AlertCircle className="w-3 h-3" />{t.phone}</span></label>
                  <input type="tel" required className={inputClass} placeholder={t.phonePlaceholder}
                    value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>

                <div>
                  <label className={labelClass}><span className="flex items-center gap-1.5"><Globe className="w-3 h-3" />{t.country}</span></label>
                  <CountrySelect value={formData.country} onChange={v => setFormData({ ...formData, country: v })}
                    placeholder={t.countryPlaceholder} inputClass={inputClass} />
                  {/* hidden input so form required validation works */}
                  <input type="text" required className="sr-only" value={formData.country} onChange={() => {}} tabIndex={-1} />
                </div>

                <button type="submit"
                  className="w-full mt-2 bg-brand text-white py-4 rounded-xl font-bold hover:bg-accent hover:text-brand transition-all duration-500 flex items-center justify-center gap-2 group">
                  {t.submitBtn}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <p className="text-center text-[11px] text-brand/30 mt-6">{t.disclaimer}</p>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="p-10 sm:p-12 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-10 h-10 text-accent" />
              </motion.div>
              <h3 className="text-3xl font-bold text-brand mb-4 tracking-tight uppercase">{t.successTitle}</h3>
              <p className="text-brand/50 text-sm leading-relaxed max-w-xs mx-auto mb-8">{t.successDesc}</p>
              <button onClick={onClose}
                className="w-full bg-brand/5 text-brand py-3 rounded-xl font-bold hover:bg-brand/10 transition-all text-sm">
                {t.closeBtn}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Keep RegistrationModal name as alias so existing call sites still compile
const RegistrationModal = ContactModal;

const FooterCTA = ({ onStartTrial }: { onStartTrial: () => void }) => (
  <div className="bg-accent px-6 py-10">
    <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-6">
      <div>
        <p className="text-brand font-bold text-lg tracking-tight">Ready to bring structure to your team?</p>
        <p className="text-brand/60 text-sm mt-1">Join 500+ companies already using People Space.</p>
      </div>
      <button
        onClick={onStartTrial}
        className="shrink-0 px-8 py-3 bg-brand text-white rounded-full text-sm font-bold hover:bg-brand/90 transition-colors flex items-center gap-2 group"
      >
        Book a Demo
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

const Footer = ({ t, onStartTrial }: { t: any; onStartTrial: () => void }) => (
  <>
  <FooterCTA onStartTrial={onStartTrial} />
  <footer className="bg-paper border-t border-line py-32 px-6 relative overflow-hidden">
    {/* Background Accents */}
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
    <div className="absolute top-0 left-0 w-64 h-64 bg-brand/5 rounded-full blur-[80px] pointer-events-none" />

    <div className="container-custom relative z-10">
      <div className="grid md:grid-cols-12 gap-24 mb-32">
        <div className="md:col-span-6">
          <div className="flex items-center gap-4 mb-12 group cursor-pointer">
            <Logo className="w-12 h-12 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(76,175,80,0.4)] transition-all duration-500" />
            <span className="text-2xl font-bold tracking-tighter text-brand group-hover:text-accent transition-colors duration-500">People Space</span>
          </div>
          <p className="text-brand/50 max-w-sm leading-snug text-lg mb-12 font-medium">
            {t.footer.description}
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="micro-label mb-10 border-brand/10">{t.footer.platform}</div>
          <ul className="space-y-4 text-sm text-brand/60 font-medium">
            <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-accent group-hover:w-4 transition-all" />{t.footer.coreModule}</a></li>
            <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-accent group-hover:w-4 transition-all" />{t.footer.attendance}</a></li>
            <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-accent group-hover:w-4 transition-all" />{t.footer.vacation}</a></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="micro-label mb-10 border-brand/10">{t.footer.company}</div>
          <ul className="space-y-4 text-sm text-brand/60 font-medium">
            <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-accent group-hover:w-4 transition-all" />{t.footer.about}</a></li>
            <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-accent group-hover:w-4 transition-all" />{t.footer.careers}</a></li>
            <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-accent group-hover:w-4 transition-all" />{t.footer.privacy}</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-12 border-t border-line flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-brand/30 text-[10px] font-bold uppercase tracking-widest">{t.footer.rights}</div>
        <div className="flex gap-10 text-brand/30 text-[10px] font-bold uppercase tracking-widest items-center">
          <a href="#" className="hover:text-brand transition-colors">{t.footer.privacyLink}</a>
          <a href="#" className="hover:text-brand transition-colors">{t.footer.termsLink}</a>
          <AdminTrigger />
        </div>
      </div>
    </div>
  </footer>
  </>
);

const AdminTrigger = () => {
  const { enterAdmin } = useAdmin();
  return (
    <button
      onClick={enterAdmin}
      title="Admin Mode"
      className="opacity-0 hover:opacity-40 transition-opacity duration-300 text-brand/30 hover:text-accent"
    >
      ⚙
    </button>
  );
};

function AppInner() {
  const [lang, setLang] = useState("en");
  const [view, setView] = useState<"landing" | "dashboard">("landing");
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const { getContent } = useAdmin();
  const t = getContent(lang as "en" | "am");
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (view === "dashboard") {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-paper font-sans text-brand selection:bg-accent/20 selection:text-brand">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
        style={{ scaleX }}
      />
      <Navbar t={t} lang={lang} setLang={setLang} onStartTrial={() => setIsRegistrationOpen(true)} />
      <main>
        <Hero t={t} onStartTrial={() => setIsRegistrationOpen(true)} />
        <PlatformOverview t={t} />
        <ModulesSection t={t} />
        <ProblemSection t={t} />
        <UserRoles t={t} />
        <ProductVisuals t={t} />
        <Benefits t={t} />
        <Ecosystem t={t} />
        <BusinessValue t={t} />
        <FinalCTA t={t} onStartTrial={() => setIsRegistrationOpen(true)} />
      </main>

      <Footer t={t} onStartTrial={() => setIsRegistrationOpen(true)} />

      <AnimatePresence>
        {isRegistrationOpen && (
          <RegistrationModal
            isOpen={isRegistrationOpen}
            onClose={() => setIsRegistrationOpen(false)}
            onSuccess={() => {
              setIsRegistrationOpen(false);
              setView("dashboard");
            }}
            lang={lang}
          />
        )}
      </AnimatePresence>

      <AdminBar lang={lang as "en" | "am"} />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppInner />
    </AdminProvider>
  );
}

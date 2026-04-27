import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, ChevronDown, ExternalLink } from 'lucide-react'
import { personalInfo } from '../data/portfolioData'

function TypeWriter({ texts, speed = 72, pause = 2600 }) {
  const [txt, setTxt] = useState('')
  const [idx, setIdx] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const cur = texts[idx]
    let t
    if (!del && txt.length < cur.length) t = setTimeout(() => setTxt(cur.slice(0, txt.length + 1)), speed)
    else if (!del && txt.length === cur.length) t = setTimeout(() => setDel(true), pause)
    else if (del && txt.length > 0) t = setTimeout(() => setTxt(txt.slice(0, -1)), speed / 2.2)
    else { setDel(false); setIdx((i) => (i + 1) % texts.length) }
    return () => clearTimeout(t)
  }, [txt, del, idx, texts, speed, pause])

  return <span className="text-[#7bb3e8]">{txt}<span className="animate-pulse opacity-70">|</span></span>
}

export default function Hero() {
  const titles = ['Azure Data & AI Engineer', 'Generative AI Developer', 'Document Intelligence', 'Cloud Solutions Builder']

  const stats = [
    { value: '4', label: 'Certificaciones Microsoft' },
    { value: '6+', label: 'Proyectos técnicos' },
    { value: 'Azure', label: 'Cloud especialidad' },
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full pt-16">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center min-h-[calc(100vh-4rem)]">

          {/* LEFT — main content */}
          <div className="py-20 lg:py-0">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/30 font-mono text-xs tracking-[0.28em] uppercase mb-8"
            >
              Portfolio · Madrid, España
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="font-bold leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
            >
              <span className="block" style={{ color: '#7bb3e8' }}>Alejandro</span>
              <span className="block text-white/60">Benítez Berná</span>
            </motion.h1>

            <div className="font-mono text-base md:text-lg mb-6 h-7">
              <TypeWriter texts={titles} />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/45 text-sm leading-relaxed mb-8 max-w-lg"
            >
              {personalInfo.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-3"
            >
              <a href={personalInfo.github} target="_blank" rel="noreferrer"
                className="glass flex items-center gap-2 px-4 py-2.5 text-white/65 hover:text-white text-sm transition-colors">
                <Github size={15} /> GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer"
                className="glass flex items-center gap-2 px-4 py-2.5 text-white/65 hover:text-white text-sm transition-colors">
                <Linkedin size={15} /> LinkedIn
              </a>
              <a href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-4 py-2.5 text-white text-sm font-medium transition-colors rounded-xl"
                style={{ background: 'rgba(79,131,196,0.25)', border: '1px solid rgba(79,131,196,0.4)' }}>
                <Mail size={15} /> Contactar
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-2 mt-8 text-white/25 text-xs font-mono"
            >
              <MapPin size={11} />
              <span>{personalInfo.location}</span>
              <span className="mx-2 opacity-40">·</span>
              <span>{personalInfo.phone}</span>
            </motion.div>
          </div>

          {/* RIGHT — stats / info card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* Stats */}
            <div className="glass p-6">
              <p className="text-xs text-white/30 uppercase tracking-widest font-mono mb-5">Resumen</p>
              <div className="space-y-4">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">{s.label}</span>
                    <span className="font-bold text-white text-lg font-mono" style={{ color: '#7bb3e8' }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available card */}
            <div className="glass p-5 flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">Disponible</p>
                <p className="text-white/35 text-xs">Abierto a nuevas oportunidades</p>
              </div>
            </div>

            {/* Tech stack pill cloud */}
            <div className="glass p-5">
              <p className="text-xs text-white/30 uppercase tracking-widest font-mono mb-4">Tecnologías clave</p>
              <div className="flex flex-wrap gap-2">
                {['Azure OpenAI', 'Python', 'GPT-4o', 'Document Intelligence', 'RAG', 'Flutter', 'Next.js', 'SQL'].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 hover:text-white/50 transition-colors animate-float"
      >
        <ChevronDown size={24} />
      </motion.button>
    </section>
  )
}

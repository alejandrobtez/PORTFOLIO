import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ExternalLink, Calendar } from 'lucide-react'
import { experience } from '../data/portfolioData'

export default function Experience() {
  const [expanded, setExpanded] = useState(null)

  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Asymmetric header — left */}
        <div className="mb-14">
          <h2 className="section-title">Experiencia</h2>
          <p className="section-sub">Trayectoria profesional</p>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-10">
          {/* Left rail — sticky label */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <p className="text-white/25 text-xs font-mono leading-relaxed">
                {experience.length} posiciones<br />
                <span style={{ color: '#7bb3e8' }}>2021 — Actualidad</span>
              </p>
              <div className="space-y-1">
                {experience.map((e, i) => (
                  <button key={e.id} onClick={() => setExpanded(expanded === e.id ? null : e.id)}
                    className={`block w-full text-left text-xs py-1.5 px-0 transition-colors border-l-2 pl-3 ${
                      expanded === e.id
                        ? 'text-white border-[#4f83c4]'
                        : 'text-white/35 hover:text-white/65 border-white/10 hover:border-white/30'
                    }`}>
                    {e.company}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — cards */}
          <div className="space-y-3">
            {experience.map((item, i) => (
              <motion.div key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div
                  className="glass p-5 cursor-pointer"
                  onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                        <h3 className="font-semibold text-white text-sm">{item.role}</h3>
                        {item.current && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                            style={{ background: 'rgba(79,131,196,0.18)', border: '1px solid rgba(79,131,196,0.35)', color: '#7bb3e8' }}>
                            Actual
                          </span>
                        )}
                      </div>
                      <a href={item.companyUrl} target="_blank" rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs text-white/35 hover:text-white/65 transition-colors">
                        {item.company} <ExternalLink size={9} />
                      </a>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="hidden sm:flex items-center gap-1.5 text-xs text-white/25 font-mono">
                        <Calendar size={10} /> {item.period}
                      </span>
                      <motion.span animate={{ rotate: expanded === item.id ? 180 : 0 }} transition={{ duration: 0.2 }}
                        className="text-white/25">
                        <ChevronDown size={14} />
                      </motion.span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expanded === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-white/7">
                          <p className="text-white/50 text-sm leading-relaxed mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

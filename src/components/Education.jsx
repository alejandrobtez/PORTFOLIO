import { motion } from 'framer-motion'
import { ExternalLink, GraduationCap, Monitor, BarChart2 } from 'lucide-react'
import { education, languages } from '../data/portfolioData'

const icons = { 0: GraduationCap, 1: Monitor, 2: BarChart2 }

export default function Education() {
  return (
    <section id="education" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-4">
          <div>
            <h2 className="section-title">Formación</h2>
            <p className="section-sub">Educación académica</p>
          </div>
          {/* Idiomas inline right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-5 min-w-[260px]"
          >
            <p className="text-xs text-white/28 uppercase tracking-widest font-mono mb-4">Idiomas</p>
            <div className="space-y-3">
              {languages.map((l, i) => (
                <div key={l.lang}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-white/70 text-xs">{l.lang}</span>
                    <span className="text-xs font-mono" style={{ color: '#7bb3e8' }}>{l.level}</span>
                  </div>
                  <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.9 }}
                      className="h-full rounded-full"
                      style={{ background: 'rgba(79,131,196,0.7)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Education cards — full width horizontal */}
        <div className="space-y-4">
          {education.map((item, i) => {
            const Icon = icons[i] || GraduationCap
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6 }}
                className="glass flex items-center gap-5 p-5 group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(79,131,196,0.15)', border: '1px solid rgba(79,131,196,0.25)' }}>
                  <Icon size={18} style={{ color: '#7bb3e8' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm leading-snug">{item.degree}</h3>
                  <a href={item.institutionUrl} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-white/35 hover:text-white/65 transition-colors mt-0.5">
                    {item.institution} <ExternalLink size={9} />
                  </a>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-mono" style={{ color: '#7bb3e8', opacity: 0.75 }}>{item.period}</p>
                  <p className="text-white/22 text-xs mt-0.5">{item.location}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

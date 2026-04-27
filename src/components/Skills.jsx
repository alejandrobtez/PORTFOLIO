import { motion } from 'framer-motion'
import { useState } from 'react'
import { skills } from '../data/portfolioData'

const CATEGORIES = ['Todos', 'Languages', 'Azure', 'AI/ML', 'Dev']

function SkillRow({ skill, index }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="mb-5 cursor-default"
    >
      <div className="flex justify-between mb-1.5">
        <span className={`text-sm transition-colors ${hov ? 'text-white' : 'text-white/60'}`}>{skill.name}</span>
        <span className="text-xs font-mono" style={{ color: hov ? '#7bb3e8' : 'rgba(255,255,255,0.28)' }}>{skill.level}%</span>
      </div>
      <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 + 0.15, duration: 0.9, ease: 'easeOut' }}
          className="h-full rounded-full transition-all duration-300"
          style={{ background: hov ? 'rgba(79,131,196,0.85)' : 'rgba(255,255,255,0.38)' }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [cat, setCat] = useState('Todos')
  const filtered = cat === 'Todos' ? skills : skills.filter((s) => s.category === cat)

  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[220px_1fr] gap-14">
          {/* LEFT — section label + filters (sticky) */}
          <div>
            <div className="lg:sticky lg:top-24">
              <h2 className="section-title mb-1">Skills</h2>
              <p className="section-sub mb-8">Dominio técnico</p>
              <div className="space-y-1.5">
                {CATEGORIES.map((c) => (
                  <button key={c} onClick={() => setCat(c)}
                    className={`block w-full text-left text-sm px-3.5 py-2 rounded-lg transition-all ${
                      cat === c ? 'text-white' : 'text-white/35 hover:text-white/65'
                    }`}
                    style={cat === c
                      ? { background: 'rgba(79,131,196,0.18)', border: '1px solid rgba(79,131,196,0.3)' }
                      : {}
                    }>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — skill bars */}
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="glass p-8"
          >
            <div className="grid md:grid-cols-2 gap-x-12">
              {filtered.map((s, i) => <SkillRow key={s.name} skill={s} index={i} />)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

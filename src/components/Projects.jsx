import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, RotateCcw } from 'lucide-react'
import { projects } from '../data/portfolioData'

const FILTERS = ['Todos', 'AI/ML', 'GenAI', 'Vision', 'NLP']

function FlipCard({ project }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flip-card cursor-pointer h-56`}
      onClick={() => setFlipped(!flipped)}
      style={{ minHeight: project.highlight ? '14rem' : '14rem' }}
    >
      <div className={`flip-inner h-full ${flipped ? 'flipped' : ''}`}>
        {/* FRONT */}
        <div className="flip-front glass flex flex-col p-5 h-full">
          <div className="flex items-start justify-between mb-3">
            <span className="tag">{project.category}</span>
            <RotateCcw size={12} className="text-white/20 mt-1 flex-shrink-0" />
          </div>
          <h3 className="font-semibold text-white text-sm mb-2 leading-snug">{project.name}</h3>
          <p className="text-white/38 text-xs leading-relaxed flex-1 line-clamp-4">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.slice(0, 3).map((t) => <span key={t} className="tag">{t}</span>)}
            {project.tags.length > 3 && <span className="tag text-white/20">+{project.tags.length - 3}</span>}
          </div>
        </div>

        {/* BACK */}
        <div className="flip-back flex flex-col p-5 h-full"
          style={{ background: 'rgba(10,14,28,0.88)', border: '1px solid rgba(79,131,196,0.28)', backdropFilter: 'blur(22px)' }}>
          <p className="text-xs font-mono mb-3" style={{ color: '#7bb3e8' }}>{project.name}</p>
          <p className="text-white/60 text-xs leading-relaxed flex-1">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 my-3">
            {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-white/8">
            <a href={project.github} target="_blank" rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
              <Github size={13} /> Código
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="ml-auto flex items-center gap-1.5 text-xs font-medium transition-colors"
                style={{ color: '#7bb3e8' }}>
                <ExternalLink size={13} /> Demo live
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [active, setActive] = useState('Todos')

  const filtered = active === 'Todos' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="section-title">Proyectos</h2>
            <p className="section-sub">Clic en cada tarjeta para ver detalles</p>
          </div>
          {/* Filters right-aligned */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setActive(f)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active === f
                    ? 'text-white'
                    : 'text-white/35 hover:text-white/70'
                }`}
                style={active === f
                  ? { background: 'rgba(79,131,196,0.25)', border: '1px solid rgba(79,131,196,0.4)' }
                  : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }
                }>
                {f}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.93 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                <FlipCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

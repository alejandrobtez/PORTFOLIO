import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Experiencia', href: '#experience' },
  { label: 'Formación', href: '#education' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certificaciones', href: '#certifications' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href) => {
    setActive(href)
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        {/* Brand left */}
        <button onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(79,131,196,0.2)', border: '1px solid rgba(79,131,196,0.35)' }}>
            <span className="text-[11px] font-bold text-[#7bb3e8] font-mono">AB</span>
          </div>
          <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">
            Alejandro Benítez
          </span>
        </button>

        {/* Links right */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <button key={l.href} onClick={() => go(l.href)}
              className={`px-3.5 py-1.5 text-xs rounded-lg transition-all ${
                active === l.href
                  ? 'bg-white/12 text-white'
                  : 'text-white/45 hover:text-white hover:bg-white/6'
              }`}>
              {l.label}
            </button>
          ))}
        </div>

        <button className="md:hidden text-white/50 hover:text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} className="md:hidden glass-nav border-t border-white/6">
            {links.map((l) => (
              <button key={l.href} onClick={() => go(l.href)}
                className="block w-full text-left px-6 py-3 text-sm text-white/55 hover:text-white hover:bg-white/5">
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

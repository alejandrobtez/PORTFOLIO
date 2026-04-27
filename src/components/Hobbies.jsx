import { motion } from 'framer-motion'
import { hobbies, volunteering } from '../data/portfolioData'

export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="section-title">Más sobre mí</h2>
        <p className="section-sub">Más allá del código</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {hobbies.map((h, i) => (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1, y: -4 }}
            className="glass flex flex-col items-center gap-2 px-7 py-5 cursor-default"
          >
            <span className="text-3xl">{h.icon}</span>
            <span className="text-xs text-white/45">{h.label}</span>
          </motion.div>
        ))}
      </div>

      {volunteering.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="glass p-5"
        >
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Voluntariado</p>
          {volunteering.map((v) => (
            <div key={v.role} className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h4 className="font-semibold text-white text-sm">{v.org}</h4>
                <p className="text-white/45 text-xs mt-0.5">{v.role}</p>
              </div>
              <div className="text-right">
                <p className="text-white/30 text-xs font-mono">{v.period}</p>
                <p className="text-white/20 text-xs">{v.location}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  )
}

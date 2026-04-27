import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { certifications } from '../data/portfolioData'

export default function Certifications() {
  return (
    <section id="certifications" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <h2 className="section-title">Certificaciones</h2>
            <p className="section-sub">Microsoft Certified</p>
          </div>
          <p className="text-white/22 text-xs font-mono">4 badges activos</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {certifications.map((cert, i) => (
            <motion.a
              key={cert.id}
              href={cert.verifyUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -7, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="glass flex flex-col items-center text-center p-6 group cursor-pointer"
            >
              <img
                src={cert.image}
                alt={cert.name}
                className="w-20 h-20 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-[10px] font-mono mb-1.5" style={{ color: '#7bb3e8', opacity: 0.7 }}>
                {cert.code}
              </span>
              <p className="text-white/65 text-[11px] font-medium leading-snug">{cert.name}</p>
              <span className="mt-3 flex items-center gap-1 text-[10px] text-white/18 group-hover:text-white/45 transition-colors">
                <ExternalLink size={9} /> Verificar
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

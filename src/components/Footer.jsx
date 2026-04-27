import { Github, Linkedin, Mail } from 'lucide-react'
import { personalInfo } from '../data/portfolioData'

export default function Footer() {
  return (
    <footer className="relative z-10 py-10 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/22 font-mono">
          © {new Date().getFullYear()} {personalInfo.name} · Madrid
        </p>
        <div className="flex items-center gap-5">
          {[
            { href: personalInfo.github, Icon: Github },
            { href: personalInfo.linkedin, Icon: Linkedin },
            { href: `mailto:${personalInfo.email}`, Icon: Mail },
          ].map(({ href, Icon }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer"
              className="text-white/22 hover:text-white/65 transition-colors">
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

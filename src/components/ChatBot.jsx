import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { personalInfo } from '../data/portfolioData'

const INITIAL = {
  id: 1, role: 'bot',
  text: 'Hola. Puedo contarte sobre la experiencia de Alejandro, proyectos, certificaciones o cómo contactarle.',
}
const QUICK = ['Proyectos', 'Certificaciones', 'Contacto', 'Stack técnico']

const R = {
  proyectos: `Proyectos destacados:\n\n• **LaCuchara** — Plataforma AI para restaurantes (Azure OpenAI + XGBoost)\n• **RecognitionFaceGym** — Reconocimiento facial serverless con Azure (demo live)\n• **FacturasDocumentIntelligence** — ETL con Azure Document Intelligence\n• **IA Generativa** — RAG, multi-agent, fine-tuning con Microsoft`,
  certs: `Certificaciones Microsoft:\n\n• **AI-102** — Azure AI Engineer Associate\n• **DP-300** — Azure Database Administrator Associate\n• **DP-700** — Fabric Analytics Engineer Associate\n• **DP-900** — Azure Data Fundamentals`,
  contacto: `Contacto directo:\n\n${personalInfo.email}\n${personalInfo.phone}\nLinkedIn: Alejandro Benítez Berná\nGitHub: @alejandrobtez`,
  stack: `Stack técnico:\n\n• **Azure** — OpenAI, Document Intelligence, Cognitive Services, SQL, Blob\n• **Python** — XGBoost, scikit-learn, Pandas\n• **GenAI** — RAG, LangChain, Azure AI Foundry, GPT-4o\n• **Dev** — Next.js, Flutter/Dart, TypeScript`,
  exp: `Experiencia:\n\n• **ENCAMINA** (Mar-Jun 2025) — Cloud Solutions Developer, Flutter + Azure\n• **CE Inter de Valdemoro** (Sep 2024-Actual) — Coach & Community Manager\n\nFormación actual: Máster Big Data, Gen AI & ML en Tajamar (2025-2026)`,
  default: `No tengo esa información aquí, pero puedes escribir a ${personalInfo.email} para más detalles.`,
}

function getReply(t) {
  const s = t.toLowerCase()
  if (s.includes('proyecto') || s.includes('github') || s.includes('app')) return R.proyectos
  if (s.includes('certif') || s.includes('microsoft') || s.includes('dp') || s.includes('ai-102')) return R.certs
  if (s.includes('contact') || s.includes('email') || s.includes('linkedin')) return R.contacto
  if (s.includes('stack') || s.includes('tecnolog') || s.includes('skill') || s.includes('python') || s.includes('azure')) return R.stack
  if (s.includes('experi') || s.includes('empresa') || s.includes('formaci') || s.includes('trabaj')) return R.exp
  return R.default
}

function Msg({ text }) {
  return (
    <span>
      {text.split(/(\*\*[^*]+\*\*)/).map((p, i) =>
        p.startsWith('**')
          ? <strong key={i} className="text-white font-medium">{p.slice(2, -2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </span>
  )
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([INITIAL])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

  const send = (text) => {
    const t = (text || input).trim()
    if (!t) return
    setMsgs((m) => [...m, { id: Date.now(), role: 'user', text: t }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { id: Date.now() + 1, role: 'bot', text: getReply(t) }])
    }, 600 + Math.random() * 500)
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white shadow-lg"
        style={{ background: 'rgba(12,14,22,0.75)', backdropFilter: 'blur(20px)', border: '1px solid rgba(79,131,196,0.3)' }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.14 }}><X size={19} /></motion.div>
            : <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.14 }}><MessageCircle size={19} /></motion.div>
          }
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 290, damping: 25 }}
            className="fixed bottom-20 right-6 z-50 w-80 sm:w-[360px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{ maxHeight: '510px', background: 'rgba(8,9,18,0.82)', backdropFilter: 'blur(40px)', border: '1px solid rgba(79,131,196,0.2)' }}
          >
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(79,131,196,0.15)', border: '1px solid rgba(79,131,196,0.25)' }}>
                <Bot size={14} style={{ color: '#7bb3e8' }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Asistente Portfolio</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400/70 animate-pulse" />
                  <p className="text-xs text-white/28">Alejandro · Azure & AI</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '320px' }}>
              {msgs.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: msg.role === 'bot' ? 'rgba(79,131,196,0.15)' : 'rgba(255,255,255,0.08)' }}>
                    {msg.role === 'bot' ? <Bot size={10} style={{ color: '#7bb3e8' }} /> : <User size={10} className="text-white/50" />}
                  </div>
                  <div className={`max-w-[80%] px-3 py-2.5 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                    msg.role === 'bot' ? 'text-white/52' : 'text-white/78'
                  }`}
                  style={{ background: msg.role === 'bot' ? 'rgba(255,255,255,0.04)' : 'rgba(79,131,196,0.13)',
                    border: `1px solid ${msg.role === 'bot' ? 'rgba(255,255,255,0.07)' : 'rgba(79,131,196,0.2)'}` }}>
                    <Msg text={msg.text} />
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(79,131,196,0.15)' }}>
                    <Bot size={10} style={{ color: '#7bb3e8' }} />
                  </div>
                  <div className="px-3 py-2.5 rounded-xl flex gap-1 items-center"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    {[0, 0.18, 0.36].map((d, i) => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
                        style={{ background: 'rgba(79,131,196,0.5)' }}
                        animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.7, delay: d }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={endRef} />
            </div>

            {msgs.length <= 1 && (
              <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                {QUICK.map((q) => (
                  <button key={q} onClick={() => send(q)}
                    className="text-xs px-2.5 py-1 rounded-lg text-white/38 hover:text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                  placeholder="Pregunta algo..."
                  className="flex-1 py-2 px-3 rounded-xl text-xs text-white/65 placeholder-white/18 outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}
                />
                <button onClick={() => send()} disabled={!input.trim()}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/45 hover:text-white disabled:opacity-20 transition-colors"
                  style={{ background: 'rgba(79,131,196,0.18)', border: '1px solid rgba(79,131,196,0.28)' }}>
                  <Send size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [p, setP] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setP(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent">
      <div
        className="h-full bg-white/30 origin-left transition-all duration-75"
        style={{ width: `${p}%` }}
      />
    </div>
  )
}

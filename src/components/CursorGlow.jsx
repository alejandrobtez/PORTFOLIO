import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const dotRef = useRef(null)
  const glowRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const glow = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    let rafId
    const animate = () => {
      glow.current.x += (pos.current.x - glow.current.x) * 0.08
      glow.current.y += (pos.current.y - glow.current.y) * 0.08

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glow.current.x - 200}px, ${glow.current.y - 200}px)`
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-[200] pointer-events-none mix-blend-screen"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,255,0.03) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />
    </>
  )
}

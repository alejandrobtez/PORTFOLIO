import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  return (
    <div className="min-h-screen text-white relative">
      {/* Background image */}
      <div className="fixed inset-0 z-0 bg-wanda" style={{ filter: 'brightness(0.62) saturate(0.8)' }} />
      {/* Very subtle dark layer so glass cards read well */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'rgba(8,9,13,0.18)' }} />

      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Certifications />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}

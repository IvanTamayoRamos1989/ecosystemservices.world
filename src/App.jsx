import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ImpactMetrics from './components/ImpactMetrics'
import Services from './components/Services'
import Frameworks from './components/Frameworks'
import Approach from './components/Approach'
import Finance from './components/Finance'
import GlobalPresence from './components/GlobalPresence'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ImageBreak from './components/ImageBreak'
import ESWChat from './components/ESWChat'
import DecarbonizationTool from './components/decarb/DecarbonizationTool'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [decarbOpen, setDecarbOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleOpenChat = () => setChatOpen(true)
    window.addEventListener('open-esw-ai', handleOpenChat)
    return () => window.removeEventListener('open-esw-ai', handleOpenChat)
  }, [])

  useEffect(() => {
    const handleOpenDecarb = () => setDecarbOpen(true)
    window.addEventListener('open-decarb-tool', handleOpenDecarb)
    return () => window.removeEventListener('open-decarb-tool', handleOpenDecarb)
  }, [])

  if (decarbOpen) {
    return <DecarbonizationTool onClose={() => setDecarbOpen(false)} />
  }

  if (chatOpen) {
    return <ESWChat onClose={() => setChatOpen(false)} />
  }

  return (
    <div className="bg-white text-charcoal min-h-screen">
      <Navbar scrolled={scrolled} />
      <Hero />
      <ImageBreak imageKey="forest" />
      <About />
      <ImpactMetrics />
      <ImageBreak imageKey="wetland" />
      <Services />
      <Frameworks />
      <Approach />
      <ImageBreak imageKey="mangrove" />
      <Finance />
      <GlobalPresence />
      <Contact />
      <Footer />
    </div>
  )
}

export default App

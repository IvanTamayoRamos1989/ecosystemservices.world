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
import CaseStudies from './components/CaseStudies'
import Testimonials from './components/Testimonials'
import Intel from './components/Intel'
import Contact from './components/Contact'
import PrivacyPolicy from './components/PrivacyPolicy'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-dark text-white min-h-screen">
      <Navbar scrolled={scrolled} />
      <Hero />
      <About />
      <ImpactMetrics />
      <Services />
      <Frameworks />
      <Approach />
      <Finance />
      <GlobalPresence />
      <CaseStudies />
      <Testimonials />
      <Intel />
      <Contact />
      <PrivacyPolicy />
      <Footer />
      <CookieConsent />
    </div>
  )
}

export default App

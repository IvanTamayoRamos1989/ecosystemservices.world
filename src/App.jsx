import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Approach from './components/Approach'
import Finance from './components/Finance'
import CaseStudies from './components/CaseStudies'
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
      <Services />
      <Approach />
      <Finance />
      <CaseStudies />
      <Intel />
      <Contact />
      <PrivacyPolicy />
      <Footer />
      <CookieConsent />
    </div>
  )
}

export default App

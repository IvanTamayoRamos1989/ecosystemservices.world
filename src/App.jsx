import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ClientDashboard from './components/ClientDashboard'
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
import ROICalculator from './components/ROICalculator'
import VendorPortal from './components/VendorPortal'
import Contact from './components/Contact'
import PrivacyPolicy from './components/PrivacyPolicy'
import Footer from './components/Footer'
import ImageBreak from './components/ImageBreak'
import CookieConsent from './components/CookieConsent'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-white text-charcoal min-h-screen">
      <Navbar scrolled={scrolled} />
      <Hero />
      <ImageBreak imageKey="highway" caption="Infrastructure at Scale" />
      <ClientDashboard />
      <About />
      <ImpactMetrics />
      <ImageBreak imageKey="bridge" caption="Urban Systems" />
      <Services />
      <Frameworks />
      <Approach />
      <ImageBreak imageKey="viaduct" caption="Structural Engineering" />
      <Finance />
      <GlobalPresence />
      <ImageBreak imageKey="industrial" caption="Industrial Ecology" />
      <CaseStudies />
      <Testimonials />
      <Intel />
      <ROICalculator />
      <VendorPortal />
      <Contact />
      <PrivacyPolicy />
      <Footer />
      <CookieConsent />
    </div>
  )
}

export default App

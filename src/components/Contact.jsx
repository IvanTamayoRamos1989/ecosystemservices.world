import React, { useState } from 'react'
import useReveal from '../hooks/useReveal'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [ref, visible] = useReveal()

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://formspree.io/f/xpwzgkvl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          organization: formData.organization,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', organization: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-accent text-sm tracking-wider uppercase">Contact</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Engage with ESW
          </h2>
          <p className="text-gray-400 mb-12">
            For project inquiries, partnership opportunities, or to discuss how
            ESW can support your environmental and financial objectives.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {status === 'sent' ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Inquiry Received</h3>
              <p className="text-gray-400">
                Our team will review your submission and respond within two business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-colors"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-colors"
                    placeholder="Company or institution"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="Professional email"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Project Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                  placeholder="Brief description of your project, location, and the nature of the engagement you are seeking."
                />
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm">
                  Submission failed. Please try again or contact us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full sm:w-auto px-10 py-3 bg-accent text-dark font-medium rounded hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact

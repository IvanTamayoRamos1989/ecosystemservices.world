import React from 'react'

function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
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
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Organization</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="Company or institution"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-colors"
                placeholder="Professional email"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Project Details</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                placeholder="Brief description of your project, location, and the nature of the engagement you are seeking."
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-3 bg-accent text-dark font-medium rounded hover:bg-accent/90 transition-colors"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

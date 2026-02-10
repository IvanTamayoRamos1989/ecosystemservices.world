import React, { useState, useEffect } from 'react'

function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('esw-cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('esw-cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('esw-cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-[#111] border border-white/10 rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-400 flex-1">
          This site uses cookies to improve your experience and analyze site traffic.
          See our{' '}
          <a href="#privacy" className="text-accent hover:underline">
            Privacy Policy
          </a>{' '}
          for details.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="text-sm px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm px-5 py-2 bg-accent text-dark font-medium rounded hover:bg-accent/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent

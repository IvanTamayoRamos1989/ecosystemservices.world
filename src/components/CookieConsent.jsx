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
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-slate flex-1">
          This site uses cookies to improve your experience and analyze site traffic.
          See our{' '}
          <a href="#privacy" className="text-dark hover:underline">
            Privacy Policy
          </a>{' '}
          for details.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="text-sm px-4 py-2 text-slate hover:text-charcoal transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm px-5 py-2 bg-dark text-white font-medium rounded-sm hover:bg-charcoal transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent

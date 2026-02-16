import React from 'react'

function PrivacyPolicy() {
  return (
    <section id="privacy" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <span className="text-navy text-sm tracking-wider uppercase">Legal</span>
        <h2 className="text-3xl md:text-4xl font-bold font-serif mt-3 mb-8">Privacy Policy</h2>

        <div className="space-y-8 text-slate text-sm leading-relaxed">
          <div>
            <h3 className="text-sovereign-ink font-semibold text-base mb-3">1. Data Controller</h3>
            <p>
              Ecosystem Services World (&quot;ESW&quot;, &quot;we&quot;, &quot;us&quot;) is the data
              controller for personal data collected through this website (ecosystemservices.world).
            </p>
          </div>

          <div>
            <h3 className="text-sovereign-ink font-semibold text-base mb-3">2. Data We Collect</h3>
            <p className="mb-2">When you use our website, we may collect:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Information you submit via the contact form (name, organization, email, project details)</li>
              <li>Technical data (IP address, browser type, device information, pages visited)</li>
              <li>Cookies and similar tracking technologies for analytics purposes</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sovereign-ink font-semibold text-base mb-3">3. Purpose & Legal Basis</h3>
            <p className="mb-2">We process your data for the following purposes:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-sovereign-ink">Contact inquiries</strong> — to respond to your requests (legal basis: legitimate interest / pre-contractual measures)</li>
              <li><strong className="text-sovereign-ink">Analytics</strong> — to understand website usage and improve our services (legal basis: consent)</li>
              <li><strong className="text-sovereign-ink">Legal compliance</strong> — to meet our obligations under applicable law</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sovereign-ink font-semibold text-base mb-3">4. Data Sharing</h3>
            <p>
              We do not sell your personal data. We may share data with service providers who
              process data on our behalf (e.g., form handling services, analytics providers),
              subject to appropriate data processing agreements. Data may be transferred outside
              the EEA only with adequate safeguards in place.
            </p>
          </div>

          <div>
            <h3 className="text-sovereign-ink font-semibold text-base mb-3">5. Cookies</h3>
            <p className="mb-2">This website uses:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-sovereign-ink">Essential cookies</strong> — required for site functionality (e.g., cookie consent preference)</li>
              <li><strong className="text-sovereign-ink">Analytics cookies</strong> — used only with your consent to understand site traffic</li>
            </ul>
            <p className="mt-2">
              You can withdraw cookie consent at any time by clearing your browser storage.
            </p>
          </div>

          <div>
            <h3 className="text-sovereign-ink font-semibold text-base mb-3">6. Data Retention</h3>
            <p>
              Contact form submissions are retained for the duration necessary to respond to
              your inquiry and for a reasonable period thereafter. Analytics data is retained
              in aggregated, anonymized form.
            </p>
          </div>

          <div>
            <h3 className="text-sovereign-ink font-semibold text-base mb-3">7. Your Rights</h3>
            <p className="mb-2">Under GDPR and applicable data protection law, you have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access the personal data we hold about you</li>
              <li>Rectify inaccurate data</li>
              <li>Request erasure of your data</li>
              <li>Restrict or object to processing</li>
              <li>Data portability</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sovereign-ink font-semibold text-base mb-3">8. Contact</h3>
            <p>
              For data protection inquiries, contact us via the{' '}
              <a href="#contact" className="text-navy hover:underline">contact form</a> or
              write to: ESW — Ecosystem Services World, Data Protection.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              Last updated: February 2026. This policy may be updated periodically. Material
              changes will be posted on this page.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicy

import { useState } from 'react'
import './fd-calculator.css'

 
export default function CalculatorToolsPage() {
 
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
 

  

  return (
    <div className="fdc">
      <nav>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <div className="logo-icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            Online Tools<span style={{ color: 'var(--accent)' }}> Hub</span>
          </a>

          <ul className="nav-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/tools">All Tools</a>
            </li>
            <li>
              <a href="/calculator-tools" className="active">
                Calculator Tools
              </a>
            </li>
            <li>
              <a href="/pdf-tools">PDF Tools</a>
            </li>
            <li>
              <a href="/dev-tools">Dev Tools</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/tools" className="nav-cta">
                All Tools →
              </a>
            </li>
          </ul>

          <button className="hamburger" aria-label="Menu" onClick={() => setMobileMenuOpen((v) => !v)}>
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="/">Home</a>
          <a href="/tools">All Tools</a>
          <a href="/calculator-tools">Calculator Tools</a>
          <a href="/pdf-tools">PDF Tools</a>
          <a href="/dev-tools">Dev Tools</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>

      <div className="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <a href="/calculator-tools">Calculator Tools</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div> 

      <div className="related-section">
        <div className="section-title">Calculator Tools</div>
        <div className="related-grid">
          <a href="/calculator-tools/sip-calculator" className="related-card">
            <div className="rc-icon">📈</div>
            <div className="rc-name">SIP Calculator</div>
            <div className="rc-desc">Calculate mutual fund SIP returns and future value of monthly investments.</div>
            <div className="rc-link">
              Try now{' '}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </a>
          <a href="/calculator-tools/swp-calculator" className="related-card">
            <div className="rc-icon">💸</div>
            <div className="rc-name">SWP Calculator</div>
            <div className="rc-desc">Plan your systematic withdrawal from mutual funds with this free calculator.</div>
            <div className="rc-link">
              Try now{' '}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </a>
          <a href="/calculator-tools/emi-calculator" className="related-card">
            <div className="rc-icon">🏠</div>
            <div className="rc-name">EMI Calculator</div>
            <div className="rc-desc">Calculate your loan EMI, total interest and repayment schedule instantly.</div>
            <div className="rc-link">
              Try now{' '}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </a>
          <a href="/calculator-tools/ppf-calculator" className="related-card">
            <div className="rc-icon">🛡️</div>
            <div className="rc-name">PPF Calculator</div>
            <div className="rc-desc">Calculate your Public Provident Fund maturity and tax-free returns.</div>
            <div className="rc-link">
              Try now{' '}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="nav-logo" style={{ marginBottom: 14, color: '#fff' }}>
                <div className="logo-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
                Online Tools Hub
              </div>
              <p>Free online tools for students, professionals and developers. No sign-up. No cost. Ever.</p>
            </div>

            <div className="footer-col">
              <h4>PDF Tools</h4>
              <ul>
                <li>
                  <a href="/pdf-tools/merge-pdf">Merge PDF</a>
                </li>
                <li>
                  <a href="/pdf-tools/split-pdf">Split PDF</a>
                </li>
                <li>
                  <a href="/pdf-tools/compress-pdf">Compress PDF</a>
                </li>
                <li>
                  <a href="/pdf-tools/pdf-to-word">PDF to Word</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Calculator Tools</h4>
              <ul>
                <li>
                  <a href="/calculator-tools/fd-calculator">FD Calculator</a>
                </li>
                <li>
                  <a href="/calculator-tools/sip-calculator">SIP Calculator</a>
                </li>
                <li>
                  <a href="/calculator-tools/emi-calculator">EMI Calculator</a>
                </li>
                <li>
                  <a href="/calculator-tools/swp-calculator">SWP Calculator</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/tools">All Tools</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © 2025 <a href="/">OnlineToolsUI.shop</a> · All tools are free to use.
            </p>
            <div className="footer-badges">
              <span className="footer-badge">🔒 No Sign-Up</span>
              <span className="footer-badge">⚡ Free Forever</span>
              <span className="footer-badge">📱 Mobile Friendly</span>
            </div>
          </div>
        </div>
      </footer>

 
    </div>
  )
}


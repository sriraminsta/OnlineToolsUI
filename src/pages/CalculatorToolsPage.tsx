 
import '../features/FinancialTools/Styles/fd-calculator.css'

 
export default function CalculatorToolsPage() {
 

  return (
    <div className="fdc">
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
    </div>
  )
}


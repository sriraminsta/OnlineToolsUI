import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './emi-calculator.css'

type CurrencyOption = { code: string; symbol: string; locale: string; label: string }

const currencies: CurrencyOption[] = [
  { code: 'INR', symbol: '₹', locale: 'en-IN', label: '🇮🇳 Indian Rupee (₹ INR)' },
  { code: 'USD', symbol: '$', locale: 'en-US', label: '🇺🇸 US Dollar ($ USD)' },
  { code: 'EUR', symbol: '€', locale: 'de-DE', label: '🇪🇺 Euro (€ EUR)' },
  { code: 'GBP', symbol: '£', locale: 'en-GB', label: '🇬🇧 British Pound (£ GBP)' },
  { code: 'AED', symbol: 'AED ', locale: 'en-US', label: '🇦🇪 UAE Dirham (AED)' },
  { code: 'SGD', symbol: 'S$', locale: 'en-SG', label: '🇸🇬 Singapore Dollar (S$)' },
  { code: 'AUD', symbol: 'A$', locale: 'en-AU', label: '🇦🇺 Australian Dollar (A$)' },
  { code: 'CAD', symbol: 'C$', locale: 'en-CA', label: '🇨🇦 Canadian Dollar (C$)' },
  { code: 'JPY', symbol: '¥', locale: 'ja-JP', label: '🇯🇵 Japanese Yen (¥ JPY)' },
  { code: 'SAR', symbol: '﷼', locale: 'en-US', label: '🇸🇦 Saudi Riyal (﷼ SAR)' },
  { code: 'MYR', symbol: 'RM', locale: 'ms-MY', label: '🇲🇾 Malaysian Ringgit (RM)' },
]

const LOAN_TYPES = [
  { type: 'home' as const, label: 'Home Loan' },
  { type: 'car' as const, label: 'Car Loan' },
  { type: 'personal' as const, label: 'Personal' },
  { type: 'education' as const, label: 'Education' },
]

const RATE_PRESETS: Record<(typeof LOAN_TYPES)[number]['type'], number> = {
  home: 8.5,
  car: 9.0,
  personal: 14.0,
  education: 10.5,
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

function safeNumber(v: string) {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

function rangeFill(min: number, max: number, val: number) {
  const pct = max === min ? 0 : ((val - min) / (max - min)) * 100
  const p = clamp(pct, 0, 100)
  return `linear-gradient(to right, var(--accent) 0%, var(--accent) ${p}%, #d1d5db ${p}%, #d1d5db 100%)`
}

function calcEMI(P: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 12 / 100
  const n = years * 12
  if (r === 0) return P / n
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

function formatMoney(symbol: string, locale: string, num: number) {
  const rounded = Math.round(num)
  try {
    return `${symbol}${rounded.toLocaleString(locale)}`
  } catch {
    return `${symbol}${rounded.toLocaleString('en-US')}`
  }
}

function buildAmortizationRows(
  P: number,
  annualRatePct: number,
  years: number,
  emi: number,
): Array<{ year: number; yearPrincipal: number; yearInterest: number; balance: number; barPct: number; totalPaid: number }> {
  const r = annualRatePct / 12 / 100
  let balance = P
  const maxBal = P
  const rows: Array<{
    year: number
    yearPrincipal: number
    yearInterest: number
    balance: number
    barPct: number
    totalPaid: number
  }> = []

  for (let y = 1; y <= years; y++) {
    let yearPrincipal = 0
    let yearInterest = 0
    for (let m = 1; m <= 12; m++) {
      if (balance <= 0.01) break
      const intCharge = balance * r
      let principalPaid = Math.min(emi - intCharge, balance)
      if (principalPaid < 0) principalPaid = 0
      yearInterest += intCharge
      yearPrincipal += principalPaid
      balance -= principalPaid
      if (balance < 0.01) balance = 0
    }
    const barPct = Math.max(0, Math.round((balance / maxBal) * 100))
    const totalPaid = yearPrincipal + yearInterest
    rows.push({ year: y, yearPrincipal, yearInterest, balance, barPct, totalPaid })
  }
  return rows
}

type CopyKey = 'emi' | 'principal' | 'interest' | 'total'

export default function EMICalculatorPage() {
  const [currencyCode, setCurrencyCode] = useState('INR')
  const currency = useMemo(() => currencies.find((c) => c.code === currencyCode) ?? currencies[0], [currencyCode])

  const [principal, setPrincipal] = useState(2_000_000)
  const [ratePct, setRatePct] = useState(8.5)
  const [years, setYears] = useState(20)
  const [loanType, setLoanType] = useState<(typeof LOAN_TYPES)[number]['type']>('home')

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toast, setToast] = useState({ show: false, text: '' })
  const toastTimer = useRef<number | null>(null)
  const [copiedKey, setCopiedKey] = useState<CopyKey | null>(null)
  const copiedTimer = useRef<number | null>(null)

  const prMin = 10_000
  const prMax = 10_000_000
  const prStep = 10_000
  const rateSlMin = 1
  const rateSlMax = 20
  const tenureSlMin = 1
  const tenureSlMax = 30

  const principalSlider = clamp(principal, prMin, prMax)
  const rateSlider = clamp(ratePct, rateSlMin, rateSlMax)
  const yearsSlider = clamp(years, tenureSlMin, tenureSlMax)

  const isValid = principal > 0 && ratePct > 0 && years > 0

  const fmt = useCallback(
    (n: number) => formatMoney(currency.symbol, currency.locale, n),
    [currency.locale, currency.symbol],
  )

  const results = useMemo(() => {
    if (!isValid) {
      return {
        emi: 0,
        totalPay: 0,
        totalInt: 0,
        intPct: 0,
        halfYears: 1,
        halfEMI: 0,
        halfTotal: 0,
        halfInt: 0,
        saved: 0,
      }
    }
    const emi = calcEMI(principal, ratePct, years)
    const totalPay = emi * years * 12
    const totalInt = totalPay - principal
    const intPct = totalPay > 0 ? (totalInt / totalPay) * 100 : 0
    const halfYears = Math.max(1, Math.round(years / 2))
    const halfEMI = calcEMI(principal, ratePct, halfYears)
    const halfTotal = halfEMI * halfYears * 12
    const halfInt = halfTotal - principal
    const saved = totalInt - halfInt
    return { emi, totalPay, totalInt, intPct, halfYears, halfEMI, halfTotal, halfInt, saved }
  }, [isValid, principal, ratePct, years])

  const amortRows = useMemo(() => {
    if (!isValid) return []
    const emi = calcEMI(principal, ratePct, years)
    return buildAmortizationRows(principal, ratePct, years, emi)
  }, [isValid, principal, ratePct, years])

  const donut = useMemo(() => {
    const circ = 2 * Math.PI * 70
    const { totalPay, totalInt, emi } = results
    if (!isValid || totalPay <= 0) {
      return {
        principalDash: `${circ} 0`,
        interestDash: `0 ${circ}`,
        interestOffset: 110,
        center: fmt(0),
      }
    }
    const pDash = (principal / totalPay) * circ
    const iDash = (totalInt / totalPay) * circ
    return {
      principalDash: `${pDash} ${circ - pDash}`,
      interestDash: `${iDash} ${circ - iDash}`,
      interestOffset: 110 - pDash,
      center: fmt(emi),
    }
  }, [fmt, isValid, principal, results.emi, results.totalInt, results.totalPay])

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current)
    }
  }, [])

  const showToast = (text: string) => {
    setToast({ show: true, text })
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast({ show: false, text: '' }), 2200)
  }

  const onCopy = async (key: CopyKey) => {
    const v =
      key === 'emi'
        ? results.emi
        : key === 'principal'
          ? principal
          : key === 'interest'
            ? results.totalInt
            : results.totalPay
    const text = fmt(v)
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.cssText = 'position:fixed;opacity:0'
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
      } finally {
        document.body.removeChild(ta)
      }
    }
    setCopiedKey(key)
    showToast(`✓ Copied: ${text}`)
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current)
    copiedTimer.current = window.setTimeout(() => setCopiedKey(null), 2500)
  }

  const reset = () => {
    setCurrencyCode('INR')
    setPrincipal(2_000_000)
    setRatePct(8.5)
    setYears(20)
    setLoanType('home')
  }

  const selectLoanType = (type: (typeof LOAN_TYPES)[number]['type']) => {
    setLoanType(type)
    setRatePct(RATE_PRESETS[type])
  }

  const tenureLabel = `${years} ${years === 1 ? 'Year' : 'Years'}`
  const summaryText = isValid
    ? `Interest is ${results.intPct.toFixed(1)}% of total payment  |  Tenure: ${years} year${years > 1 ? 's' : ''}`
    : 'Interest % of Total: — \u00a0|\u00a0 Tenure: —'

  const CopyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  )

  return (
    <div className="emi">
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
          <button type="button" className="hamburger" aria-label="Open menu" onClick={() => setMobileMenuOpen((o) => !o)}>
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

      <div className="breadcrumb">
        <a href="/">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <a href="/calculator-tools">Calculator Tools</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span>EMI Calculator</span>
      </div>

      <div className="page-header">
        <div className="page-header-inner">
          <div className="ph-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <div className="ph-text">
            <div className="ph-badge">
              <span />
              No Sign-Up · Instant · Free
            </div>
            <h1>EMI Calculator – Loan EMI Calculator</h1>
            <p>
              Calculate your monthly EMI, total interest payable and total loan cost for any loan. Includes a full year-by-year
              amortization schedule.
            </p>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="inputs-col">
          <div className="card">
            <div className="card-header">
              <div className="card-header-icon" style={{ background: 'var(--green-l)' }}>
                🧮
              </div>
              <span className="card-title">Enter Loan Details</span>
            </div>
            <div className="card-body">
              <div className="form-group" style={{ marginBottom: 18 }}>
                <div className="form-label">
                  <span>Currency</span>
                </div>
                <select className="styled-select" value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)}>
                  {currencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <div className="form-label">
                  <span>Loan Type</span>
                </div>
                <div className="freq-toggle" role="group" aria-label="Loan type">
                  {LOAN_TYPES.map(({ type, label }) => (
                    <button
                      key={type}
                      type="button"
                      className={`freq-btn ${loanType === type ? 'active' : ''}`}
                      onClick={() => selectLoanType(type)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <div className="form-label">
                  <span>Loan Amount</span>
                  <span className="form-label-right">{fmt(principal)}</span>
                </div>
                <div className="input-row">
                  <input
                    type="number"
                    className="num-input"
                    min={1}
                    step={10000}
                    value={principal || ''}
                    onChange={(e) => setPrincipal(Math.max(0, safeNumber(e.target.value)))}
                  />
                  <input
                    type="range"
                    min={prMin}
                    max={prMax}
                    step={prStep}
                    value={principalSlider}
                    onChange={(e) => setPrincipal(safeNumber(e.target.value))}
                    style={{ background: rangeFill(prMin, prMax, principalSlider) }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, padding: '0 2px' }}>
                  <span style={{ fontSize: '.7rem', color: 'var(--muted)' }}>Tip: type any amount in the box above</span>
                  <span style={{ fontSize: '.7rem', color: 'var(--muted)' }}>Slider: up to 1 Cr</span>
                </div>
              </div>

              <div className="form-group">
                <div className="form-label">
                  <span>Annual Interest Rate (%)</span>
                  <span className="form-label-right">{ratePct.toFixed(1)}%</span>
                </div>
                <div className="input-row">
                  <input
                    type="number"
                    className="num-input"
                    min={1}
                    max={30}
                    step={0.1}
                    value={ratePct}
                    onChange={(e) => setRatePct(clamp(safeNumber(e.target.value), rateSlMin, rateSlMax))}
                  />
                  <input
                    type="range"
                    min={rateSlMin}
                    max={rateSlMax}
                    step={0.1}
                    value={rateSlider}
                    onChange={(e) => setRatePct(safeNumber(e.target.value))}
                    style={{ background: rangeFill(rateSlMin, rateSlMax, rateSlider) }}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label">
                  <span>Loan Tenure</span>
                  <span className="form-label-right">{tenureLabel}</span>
                </div>
                <div className="input-row">
                  <input
                    type="number"
                    className="num-input"
                    min={1}
                    max={30}
                    value={years}
                    onChange={(e) => setYears(clamp(Math.round(safeNumber(e.target.value)), tenureSlMin, tenureSlMax))}
                  />
                  <input
                    type="range"
                    min={tenureSlMin}
                    max={tenureSlMax}
                    value={yearsSlider}
                    onChange={(e) => setYears(Math.round(safeNumber(e.target.value)))}
                    style={{ background: rangeFill(tenureSlMin, tenureSlMax, yearsSlider) }}
                  />
                </div>
              </div>

              <button type="button" className="calc-btn" onClick={() => showToast('✓ Updated results')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Calculate EMI
              </button>
              <span
                className="reset-link"
                role="button"
                tabIndex={0}
                onClick={reset}
                onKeyDown={(e) => e.key === 'Enter' && reset()}
              >
                ↺ Reset to defaults
              </span>
            </div>
          </div>

          <div className="card compare-card">
            <div className="card-header">
              <div className="card-header-icon" style={{ background: 'var(--purple-l)' }}>
                ⚡
              </div>
              <span className="card-title">Tenure Comparison</span>
            </div>
            <div className="compare-grid">
              <div className="cmp-half">
                <div className="cmp-label">📅 Your Chosen Tenure</div>
                <div className="cmp-row">
                  <span className="cmp-key">Monthly EMI</span>
                  <span className="cmp-val blue">{isValid ? fmt(results.emi) : '—'}</span>
                </div>
                <div className="cmp-row">
                  <span className="cmp-key">Total Interest</span>
                  <span className="cmp-val red">{isValid ? fmt(results.totalInt) : '—'}</span>
                </div>
                <div className="cmp-row">
                  <span className="cmp-key">Total Payment</span>
                  <span className="cmp-val">{isValid ? fmt(results.totalPay) : '—'}</span>
                </div>
                <div className="cmp-row">
                  <span className="cmp-key">Interest %</span>
                  <span className="cmp-val red">{isValid ? `${results.intPct.toFixed(1)}%` : '—'}</span>
                </div>
              </div>
              <div className="cmp-half">
                <div className="cmp-label">🕐 Half Tenure ({isValid ? results.halfYears : '—'} yrs)</div>
                <div className="cmp-row">
                  <span className="cmp-key">Monthly EMI</span>
                  <span className="cmp-val blue">{isValid ? fmt(results.halfEMI) : '—'}</span>
                </div>
                <div className="cmp-row">
                  <span className="cmp-key">Total Interest</span>
                  <span className="cmp-val green">{isValid ? fmt(results.halfInt) : '—'}</span>
                </div>
                <div className="cmp-row">
                  <span className="cmp-key">Total Payment</span>
                  <span className="cmp-val">{isValid ? fmt(results.halfTotal) : '—'}</span>
                </div>
                <div className="cmp-row">
                  <span className="cmp-key">Interest Saved</span>
                  <span className="cmp-val green">{isValid ? fmt(results.saved) : '—'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card table-card" style={{ display: isValid ? 'block' : 'none' }}>
            <div className="card-header">
              <div className="card-header-icon" style={{ background: 'var(--accent-l)' }}>
                📊
              </div>
              <span className="card-title">Year-by-Year Amortization Schedule</span>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Principal Paid</th>
                    <th>Interest Paid</th>
                    <th>Total Paid</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {amortRows.map((row) => (
                    <tr key={row.year}>
                      <td className="td-year">Year {row.year}</td>
                      <td className="td-total">{fmt(row.yearPrincipal)}</td>
                      <td className="td-returns">{fmt(row.yearInterest)}</td>
                      <td>{fmt(row.totalPaid)}</td>
                      <td>
                        <div className="bar-cell">
                          <div
                            className="mini-bar"
                            style={{ width: `${Math.min(row.barPct, 80)}px`, maxWidth: 80, background: 'var(--accent)' }}
                          />
                          {fmt(row.balance)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="results-col">
          <div className="card">
            <div className="donut-wrap">
              <svg className="donut-svg" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="70" fill="none" stroke="#e5e7eb" strokeWidth="22" />
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="22"
                  strokeDasharray={donut.interestDash}
                  strokeLinecap="round"
                  strokeDashoffset={donut.interestOffset}
                  style={{ transition: 'stroke-dasharray .6s ease' }}
                />
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="22"
                  strokeDasharray={donut.principalDash}
                  strokeLinecap="round"
                  strokeDashoffset={110}
                  style={{ transition: 'stroke-dasharray .6s ease' }}
                />
                <text
                  x="90"
                  y="82"
                  textAnchor="middle"
                  fontFamily="'Bricolage Grotesque',sans-serif"
                  fontSize="11"
                  fontWeight="700"
                  fill="#6b7280"
                >
                  Monthly EMI
                </text>
                <text
                  x="90"
                  y="100"
                  textAnchor="middle"
                  fontFamily="'Bricolage Grotesque',sans-serif"
                  fontSize="14"
                  fontWeight="800"
                  fill="#0f1629"
                >
                  {donut.center}
                </text>
              </svg>
              <div className="donut-legend">
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: '#2563eb' }} />
                  Principal
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: '#dc2626' }} />
                  Interest
                </div>
              </div>
            </div>

            <div className="returns-badge">
              <span>📅</span>
              <span>{summaryText}</span>
            </div>

            <div className="stat-cards">
              <div className="stat-card sc-total">
                <div className="stat-card-left">
                  <div className="stat-icon" style={{ background: 'var(--green)' }} aria-hidden>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: 18, height: 18 }}
                    >
                      <rect x="1" y="4" width="22" height="16" rx="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <div className="stat-label">Monthly EMI</div>
                    <div className="stat-value">{fmt(results.emi)}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className={`copy-btn ${copiedKey === 'emi' ? 'copied' : ''}`}
                  onClick={() => onCopy('emi')}
                >
                  {copiedKey === 'emi' ? (
                    '✓ Copied!'
                  ) : (
                    <>
                      <CopyIcon />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="stat-card sc-invested">
                <div className="stat-card-left">
                  <div className="stat-icon">🏦</div>
                  <div>
                    <div className="stat-label">Principal (Loan Amount)</div>
                    <div className="stat-value">{fmt(principal)}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className={`copy-btn ${copiedKey === 'principal' ? 'copied' : ''}`}
                  onClick={() => onCopy('principal')}
                >
                  {copiedKey === 'principal' ? (
                    '✓ Copied!'
                  ) : (
                    <>
                      <CopyIcon />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="stat-card sc-interest">
                <div className="stat-card-left">
                  <div className="stat-icon">💸</div>
                  <div>
                    <div className="stat-label">Total Interest Payable</div>
                    <div className="stat-value">{fmt(results.totalInt)}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className={`copy-btn ${copiedKey === 'interest' ? 'copied' : ''}`}
                  onClick={() => onCopy('interest')}
                >
                  {copiedKey === 'interest' ? (
                    '✓ Copied!'
                  ) : (
                    <>
                      <CopyIcon />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="stat-card sc-returns">
                <div className="stat-card-left">
                  <div className="stat-icon">🧾</div>
                  <div>
                    <div className="stat-label">Total Amount Payable</div>
                    <div className="stat-value">{fmt(results.totalPay)}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className={`copy-btn ${copiedKey === 'total' ? 'copied' : ''}`}
                  onClick={() => onCopy('total')}
                >
                  {copiedKey === 'total' ? (
                    '✓ Copied!'
                  ) : (
                    <>
                      <CopyIcon />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="formula-card">
          <div className="formula-left">
            <h3>How is EMI Calculated?</h3>
            <p>
              EMI uses the reducing balance method. Each month, interest is charged only on the outstanding principal — so as you
              repay, the interest component shrinks and the principal component grows.
            </p>
            <div className="formula-vars">
              <div className="formula-var">
                <b>EMI</b> = Monthly Instalment &nbsp;|&nbsp; <b>P</b> = Principal loan amount
              </div>
              <div className="formula-var">
                <b>r</b> = Monthly interest rate (annual rate ÷ 12 ÷ 100)
              </div>
              <div className="formula-var">
                <b>n</b> = Total number of monthly instalments (years × 12)
              </div>
            </div>
          </div>
          <div className="formula-code">EMI = P × r × (1+r)ⁿ / [(1+r)ⁿ – 1]</div>
        </div>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">🏠</div>
            <div className="info-title">What is EMI?</div>
            <div className="info-text">
              Equated Monthly Instalment is the fixed amount you pay your lender every month to repay a loan. It includes both a
              principal component and an interest component, calculated on a reducing balance basis.
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">📉</div>
            <div className="info-title">Reducing Balance Method</div>
            <div className="info-text">
              Unlike flat-rate loans, EMI is calculated on the outstanding balance. In early months, you pay more interest. As the
              principal reduces, interest drops and more of your EMI goes toward repaying the principal.
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">⏱️</div>
            <div className="info-title">Tenure vs EMI Trade-off</div>
            <div className="info-text">
              A longer tenure means a lower monthly EMI but significantly higher total interest paid. A shorter tenure means a higher
              EMI but saves a large amount in interest over the loan lifetime. Use the comparison card above to see this clearly.
            </div>
          </div>
        </div>
      </div>

      <div className="related-section">
        <div className="section-title">Related Calculator Tools</div>
        <div className="related-grid">
          <a href="/calculator-tools/sip-calculator" className="related-card">
            <div className="rc-icon">📈</div>
            <div className="rc-name">SIP Calculator</div>
            <div className="rc-desc">Calculate mutual fund SIP returns and future maturity value.</div>
            <div className="rc-link">
              Try now{' '}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </a>
          <a href="/calculator-tools/fd-calculator" className="related-card">
            <div className="rc-icon">🏦</div>
            <div className="rc-name">FD Calculator</div>
            <div className="rc-desc">Calculate fixed deposit maturity amount and interest earned.</div>
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
            <div className="rc-desc">Plan your systematic withdrawals from a mutual fund corpus.</div>
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
            <div className="rc-desc">Calculate Public Provident Fund maturity and tax-free returns.</div>
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
              <h4>Calculator Tools</h4>
              <ul>
                <li>
                  <a href="/calculator-tools/sip-calculator">SIP Calculator</a>
                </li>
                <li>
                  <a href="/calculator-tools/fd-calculator">FD Calculator</a>
                </li>
                <li>
                  <a href="/calculator-tools/swp-calculator">SWP Calculator</a>
                </li>
                <li>
                  <a href="/calculator-tools/emi-calculator">EMI Calculator</a>
                </li>
                <li>
                  <a href="/calculator-tools/ppf-calculator">PPF Calculator</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Other Tools</h4>
              <ul>
                <li>
                  <a href="/pdf-tools/merge-pdf">Merge PDF</a>
                </li>
                <li>
                  <a href="/image-tools/background-remover">Background Remover</a>
                </li>
                <li>
                  <a href="/image-tools/qr-code-generator">QR Code Generator</a>
                </li>
                <li>
                  <a href="/dev-tools/json-formatter">JSON Formatter</a>
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

      <div className={`toast ${toast.show ? 'show' : ''}`} aria-live="polite">
        {toast.text}
      </div>
    </div>
  )
}

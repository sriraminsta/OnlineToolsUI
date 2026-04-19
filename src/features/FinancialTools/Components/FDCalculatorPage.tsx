import { useEffect, useMemo, useRef, useState } from 'react'
import '../Styles/fd-calculator.css'
import {FAQS} from '../Data/FDCalculatorFAQ'
import FAQSection from '../../../Components/FAQSection'

type CurrencyOption = {
  code: string
  symbol: string
  locale: string
  label: string
}

const currencies: CurrencyOption[] = [
  { code: 'INR', symbol: '₹', locale: 'en-IN', label: '🇮🇳 Indian Rupee (₹ INR)' },
  { code: 'USD', symbol: '$', locale: 'en-US', label: '🇺🇸 US Dollar ($ USD)' },
  { code: 'EUR', symbol: '€', locale: 'de-DE', label: '🇪🇺 Euro (€ EUR)' },
  { code: 'GBP', symbol: '£', locale: 'en-GB', label: '🇬🇧 British Pound (£ GBP)' },
  { code: 'AED', symbol: 'د.إ', locale: 'ar-AE', label: '🇦🇪 UAE Dirham (AED)' },
  { code: 'SGD', symbol: 'S$', locale: 'en-SG', label: '🇸🇬 Singapore Dollar (S$)' },
  { code: 'AUD', symbol: 'A$', locale: 'en-AU', label: '🇦🇺 Australian Dollar (A$)' },
  { code: 'CAD', symbol: 'C$', locale: 'en-CA', label: '🇨🇦 Canadian Dollar (C$)' },
  { code: 'JPY', symbol: '¥', locale: 'ja-JP', label: '🇯🇵 Japanese Yen (¥ JPY)' },
  { code: 'CHF', symbol: 'Fr', locale: 'de-CH', label: '🇨🇭 Swiss Franc (Fr CHF)' },
  { code: 'CNY', symbol: '¥', locale: 'zh-CN', label: '🇨🇳 Chinese Yuan (¥ CNY)' },
  { code: 'SAR', symbol: '﷼', locale: 'ar-SA', label: '🇸🇦 Saudi Riyal (﷼ SAR)' },
  { code: 'MYR', symbol: 'RM', locale: 'ms-MY', label: '🇲🇾 Malaysian Ringgit (RM)' },
  { code: 'BDT', symbol: '৳', locale: 'bn-BD', label: '🇧🇩 Bangladeshi Taka (৳)' },
  { code: 'PKR', symbol: '₨', locale: 'ur-PK', label: '🇵🇰 Pakistani Rupee (₨)' },
]

type TenureUnit = 'years' | 'months'
type CopyKey = 'principal' | 'interest' | 'maturity'

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

export default function FDCalculatorPage() {
  const [currencyCode, setCurrencyCode] = useState<string>('INR')
  const currency = useMemo(() => currencies.find((c) => c.code === currencyCode) ?? currencies[0], [currencyCode])

  const [principal, setPrincipal] = useState<number>(100000)
  const [ratePct, setRatePct] = useState<number>(7)
  const [tenureUnit, setTenureUnit] = useState<TenureUnit>('years')
  const [tenureRaw, setTenureRaw] = useState<number>(5)
  const [compoundPerYear, setCompoundPerYear] = useState<number>(4)

  const [toast, setToast] = useState<{ show: boolean; text: string }>({ show: false, text: '✓ Copied to clipboard!' })
  const toastTimer = useRef<number | null>(null)

  const [copiedKey, setCopiedKey] = useState<CopyKey | null>(null)
  const copiedTimer = useRef<number | null>(null)

  const tenureYears = useMemo(() => (tenureUnit === 'years' ? tenureRaw : tenureRaw / 12), [tenureRaw, tenureUnit])
  const rate = useMemo(() => ratePct / 100, [ratePct])

  const isValid = principal > 0 && rate > 0 && tenureYears > 0 && compoundPerYear > 0

  const results = useMemo(() => {
    if (!isValid) {
      return { maturity: 0, interest: 0, effRatePct: 0 }
    }
    const A = principal * Math.pow(1 + rate / compoundPerYear, compoundPerYear * tenureYears)
    const I = A - principal
    const effRatePct = (Math.pow(1 + rate / compoundPerYear, compoundPerYear) - 1) * 100
    return { maturity: A, interest: I, effRatePct }
  }, [compoundPerYear, isValid, principal, rate, tenureYears])

  const fmt = (n: number) => {
    const rounded = Math.round(n)
    try {
      return `${currency.symbol}${rounded.toLocaleString(currency.locale)}`
    } catch {
      return `${currency.symbol}${rounded.toLocaleString('en-US')}`
    }
  }

  const tenureLabel = useMemo(() => {
    const v = Math.max(0, Math.round(tenureRaw))
    if (tenureUnit === 'years') return `${v} ${v === 1 ? 'Year' : 'Years'}`
    return `${v} ${v === 1 ? 'Month' : 'Months'}`
  }, [tenureRaw, tenureUnit])

  const donut = useMemo(() => {
    const r = 70
    const circ = 2 * Math.PI * r
    const A = results.maturity
    const P = principal
    const I = results.interest
    if (!isValid || A <= 0) {
      return {
        principalDash: `${circ} 0`,
        interestDash: `0 ${circ}`,
        interestOffset: 110,
        center: fmt(0),
      }
    }
    const pFrac = P / A
    const iFrac = I / A
    const pDash = pFrac * circ
    const iDash = iFrac * circ
    const interestOffset = 110 - pDash
    return {
      principalDash: `${pDash} ${circ - pDash}`,
      interestDash: `${iDash} ${circ - iDash}`,
      interestOffset,
      center: fmt(A),
    }
  }, [fmt, isValid, principal, results.interest, results.maturity])

  const tableRows = useMemo(() => {
    if (!isValid) return []
    const rows = Math.ceil(tenureYears)
    const maxBalance = results.maturity
    let balance = principal

    const out: Array<{
      year: number
      partial: boolean
      opening: number
      interest: number
      closing: number
      growthPct: number
    }> = []

    for (let y = 1; y <= rows; y++) {
      const yEnd = Math.min(y, tenureYears)
      const newBalance = principal * Math.pow(1 + rate / compoundPerYear, compoundPerYear * yEnd)
      const interestThisYear = newBalance - balance
      const openingBal = balance
      balance = newBalance
      const growthPct = maxBalance > 0 ? Math.round((newBalance / maxBalance) * 100) : 0
      out.push({
        year: y,
        partial: y === rows && tenureYears % 1 !== 0,
        opening: openingBal,
        interest: interestThisYear,
        closing: newBalance,
        growthPct,
      })
    }
    return out
  }, [compoundPerYear, isValid, principal, rate, results.maturity, tenureYears])

  const principalSliderMax = 1_000_000
  const principalSliderMin = 1000
  const principalSliderStep = 1000

  const principalSliderValue = clamp(principal, principalSliderMin, principalSliderMax)
  const rateSliderMin = 1
  const rateSliderMax = 20
  const rateSliderStep = 0.1
  const rateSliderValue = clamp(ratePct, rateSliderMin, rateSliderMax)

  const tenureSliderMin = 1
  const tenureSliderMax = tenureUnit === 'years' ? 40 : 480
  const tenureSliderValue = clamp(tenureRaw, tenureSliderMin, tenureSliderMax)

  useEffect(() => {
    if (tenureRaw > tenureSliderMax) setTenureRaw(tenureSliderMax)
  }, [tenureSliderMax, tenureRaw])

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current)
    }
  }, [])

  const showToast = (text: string) => {
    setToast({ show: true, text })
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast({ show: false, text }), 2200)
  }

  const onCopy = async (key: CopyKey) => {
    const value = key === 'principal' ? principal : key === 'interest' ? results.interest : results.maturity
    const text = fmt(value)

    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0'
      document.body.appendChild(ta)
      ta.focus()
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

  const onReset = () => {
    setCurrencyCode('INR')
    setPrincipal(100000)
    setRatePct(7)
    setTenureRaw(5)
    setTenureUnit('years')
    setCompoundPerYear(4)
  }

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
        <span>FD Calculator</span>
      </div>

      <div className="page-header">
        <div className="page-header-inner">
          <div className="ph-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
              <line x1="7" y1="15" x2="7.01" y2="15" />
              <line x1="11" y1="15" x2="13" y2="15" />
            </svg>
          </div>
          <div className="ph-text">
            <div className="ph-badge">
              <span />
              No Sign-Up · Instant · Free
            </div>
            <h1>Fixed Deposit (FD) Calculator</h1>
            <p>Calculate your FD maturity amount, total interest earned, and a year-by-year growth breakdown in seconds.</p>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="inputs-col">
          <div className="card">
            <div className="card-header">
              <div className="card-header-icon" style={{ background: '#ecfdf5' }}>
                🧮
              </div>
              <span className="card-title">Enter FD Details</span>
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
                  <span>Principal Amount</span>
                  <span className="form-label-right">{fmt(principal)}</span>
                </div>
                <div className="input-row">
                  <input
                    type="number"
                    className="num-input"
                    value={Number.isFinite(principal) ? principal : 0}
                    min={1}
                    step={1000}
                    onChange={(e) => setPrincipal(Math.max(0, safeNumber(e.target.value)))}
                  />
                  <input
                    type="range"
                    min={principalSliderMin}
                    max={principalSliderMax}
                    step={principalSliderStep}
                    value={principalSliderValue}
                    onChange={(e) => setPrincipal(safeNumber(e.target.value))}
                    style={{ background: rangeFill(principalSliderMin, principalSliderMax, principalSliderValue) }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, padding: '0 2px' }}>
                  <span style={{ fontSize: '.7rem', color: 'var(--muted)' }}>Tip: type any amount in the box above</span>
                  <span style={{ fontSize: '.7rem', color: 'var(--muted)' }}>Slider: up to 10L</span>
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
                    value={Number.isFinite(ratePct) ? ratePct : 0}
                    min={1}
                    max={20}
                    step={0.1}
                    onChange={(e) => setRatePct(clamp(safeNumber(e.target.value), rateSliderMin, rateSliderMax))}
                  />
                  <input
                    type="range"
                    min={rateSliderMin}
                    max={rateSliderMax}
                    step={rateSliderStep}
                    value={rateSliderValue}
                    onChange={(e) => setRatePct(safeNumber(e.target.value))}
                    style={{ background: rangeFill(rateSliderMin, rateSliderMax, rateSliderValue) }}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label">
                  <span>Tenure</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="unit-toggle" role="group" aria-label="Tenure unit">
                      <button
                        type="button"
                        className={`unit-btn ${tenureUnit === 'years' ? 'active' : ''}`}
                        onClick={() => setTenureUnit('years')}
                      >
                        Years
                      </button>
                      <button
                        type="button"
                        className={`unit-btn ${tenureUnit === 'months' ? 'active' : ''}`}
                        onClick={() => setTenureUnit('months')}
                      >
                        Months
                      </button>
                    </div>
                    <span className="form-label-right">{tenureLabel}</span>
                  </div>
                </div>
                <div className="input-row">
                  <input
                    type="number"
                    className="num-input"
                    value={Number.isFinite(tenureRaw) ? tenureRaw : 0}
                    min={1}
                    max={600}
                    onChange={(e) => setTenureRaw(clamp(safeNumber(e.target.value), 1, 600))}
                  />
                  <input
                    type="range"
                    min={tenureSliderMin}
                    max={tenureSliderMax}
                    value={tenureSliderValue}
                    onChange={(e) => setTenureRaw(safeNumber(e.target.value))}
                    style={{ background: rangeFill(tenureSliderMin, tenureSliderMax, tenureSliderValue) }}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label">
                  <span>Compounding Frequency</span>
                </div>
                <select
                  className="styled-select"
                  value={compoundPerYear}
                  onChange={(e) => setCompoundPerYear(safeNumber(e.target.value))}
                >
                  <option value={1}>Annually (once a year)</option>
                  <option value={2}>Half-Yearly (every 6 months)</option>
                  <option value={4}>Quarterly (every 3 months)</option>
                  <option value={12}>Monthly (every month)</option>
                </select>
              </div>

              <button type="button" className="calc-btn" onClick={() => showToast('✓ Updated results')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Calculate FD Returns
              </button>
              <span className="reset-link" role="button" tabIndex={0} onClick={onReset} onKeyDown={(e) => e.key === 'Enter' && onReset()}>
                ↺ Reset to defaults
              </span>
            </div>
          </div>

          <div className="card table-card" style={{ display: isValid ? 'block' : 'none' }}>
            <div className="card-header">
              <div className="card-header-icon" style={{ background: '#eff6ff' }}>
                📊
              </div>
              <span className="card-title">Year-by-Year Breakdown</span>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Opening Balance</th>
                    <th>Interest Earned</th>
                    <th>Closing Balance</th>
                    <th>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((r) => (
                    <tr key={r.year}>
                      <td className="td-year">
                        Year {r.year}
                        {r.partial ? ' (partial)' : ''}
                      </td>
                      <td>{fmt(r.opening)}</td>
                      <td className="td-interest">+{fmt(r.interest)}</td>
                      <td className="td-maturity">{fmt(r.closing)}</td>
                      <td>
                        <div className="bar-cell">
                          <div className="mini-bar" style={{ width: `${Math.min(r.growthPct, 80)}px`, maxWidth: 80 }} />
                          {r.growthPct}%
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
                  stroke="#059669"
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
                  Maturity
                </text>
                <text
                  x="90"
                  y="100"
                  textAnchor="middle"
                  fontFamily="'Bricolage Grotesque',sans-serif"
                  fontSize="15"
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
                  <div className="legend-dot" style={{ background: '#059669' }} />
                  Interest
                </div>
              </div>
            </div>

            <div className="rate-badge">
              <span>📅</span>
              <span>
                Effective Annual Rate: <strong>{isValid ? `${results.effRatePct.toFixed(2)}% p.a.` : '—'}</strong>
              </span>
            </div>

            <div className="stat-cards">
              <div className="stat-card sc-principal">
                <div className="stat-card-left">
                  <div className="stat-icon">💰</div>
                  <div>
                    <div className="stat-label">Principal Amount</div>
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="stat-card sc-interest">
                <div className="stat-card-left">
                  <div className="stat-icon">📈</div>
                  <div>
                    <div className="stat-label">Total Interest Earned</div>
                    <div className="stat-value">{fmt(results.interest)}</div>
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="stat-card sc-maturity">
                <div className="stat-card-left">
                  <div className="stat-icon" style={{ background: 'var(--accent)' }} aria-hidden>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: 18, height: 18 }}
                    >
                      <polyline points="20 12 20 22 4 22 4 12" />
                      <rect x="2" y="7" width="20" height="5" />
                      <line x1="12" y1="22" x2="12" y2="7" />
                      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
                      <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="stat-label">Maturity Amount</div>
                    <div className="stat-value">{fmt(results.maturity)}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className={`copy-btn ${copiedKey === 'maturity' ? 'copied' : ''}`}
                  onClick={() => onCopy('maturity')}
                >
                  {copiedKey === 'maturity' ? (
                    '✓ Copied!'
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
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
            <h3>How is FD Interest Calculated?</h3>
            <p>
              FD uses compound interest formula. The interest earned each period is added back to the principal so you earn interest on
              interest — making your money grow faster over time.
            </p>
            <div className="formula-vars">
              <div className="formula-var">
                <b>A</b> = Maturity Amount &nbsp;|&nbsp; <b>P</b> = Principal
              </div>
              <div className="formula-var">
                <b>r</b> = Annual Rate (decimal) &nbsp;|&nbsp; <b>n</b> = Compounding frequency/year
              </div>
              <div className="formula-var">
                <b>t</b> = Time in years
              </div>
            </div>
          </div>
          <div className="formula-code">A = P × (1 + r/n)^(n×t)</div>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">🏦</div>
            <div className="info-title">What is an FD?</div>
            <div className="info-text">
              A Fixed Deposit is a financial instrument where you deposit a lump sum with a bank for a fixed period at a guaranteed
              interest rate. It's one of the safest investments in India.
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">⚡</div>
            <div className="info-title">Compounding Frequency</div>
            <div className="info-text">
              Higher compounding frequency = higher returns. Quarterly compounding gives more interest than annual compounding at the
              same rate because interest is calculated more often.
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">📅</div>
            <div className="info-title">Tenure Tips</div>
            <div className="info-text">
              Most banks offer the highest FD rates for 1–3 year tenures. Locking in for longer doesn't always mean higher rates —
              compare your bank's rate card before deciding.
            </div>
          </div>
        </div>
      </div>

      {/* SEO Section */}
    <div className="seo-section">

      <h2>What is a Fixed Deposit (FD)?</h2>
      <p>
        A <strong>Fixed Deposit (FD)</strong> is a savings instrument offered by banks and NBFCs where you invest a lump sum for a predetermined period at a guaranteed interest rate. Unlike a savings account or liquid fund, the rate on an FD is locked in at the time of booking and remains unchanged for the entire tenure — regardless of any changes in market interest rates during that period.
      </p>
      <p>
        FDs are regulated by the Reserve Bank of India for scheduled commercial banks and are covered under DICGC insurance for up to <strong>&#x20B9;5 lakh per depositor per bank</strong> (principal and interest combined). This combination of guaranteed returns, capital safety and insurance coverage makes the FD one of the most trusted savings instruments in India across all income groups.
      </p>

      <h2>How Does This FD Calculator Work?</h2>
      <p>
        This calculator applies the standard <strong>compound interest formula — A = P × (1 + r/n)<sup>n×t</sup></strong> — to compute your maturity amount from four inputs: principal, annual interest rate, tenure and compounding frequency. It instantly displays the total interest earned, the effective annual yield and a year-by-year growth table showing how your deposit grows each year.
      </p>
      <p>
        The <strong>effective annual rate (EAR)</strong> is the true annualised yield after accounting for within-year compounding. It is always equal to or higher than the stated nominal rate. For example, a 7% FD compounded quarterly carries an EAR of approximately 7.19%, while the same rate compounded monthly gives an EAR of about 7.23%.
      </p>

      <h2>Key Benefits of Fixed Deposits</h2>
      <ul>
        <li><strong>Guaranteed returns:</strong> The interest rate is fixed at booking and cannot be changed by the bank during the tenure — your maturity amount is known upfront.</li>
        <li><strong>Capital safety:</strong> Bank FDs are backed by DICGC insurance for up to &#x20B9;5 lakh per depositor per bank, covering both principal and accrued interest.</li>
        <li><strong>Flexible tenure:</strong> FDs are available from as short as 7 days to as long as 10 years.</li>
        <li><strong>Regular income option:</strong> Non-cumulative FDs pay interest monthly, quarterly or half-yearly.</li>
        <li><strong>Loan against FD:</strong> Most banks allow an overdraft or loan of up to 90% of the FD value.</li>
        <li><strong>Tax-saving FDs (Section 80C):</strong> 5-year FDs qualify for deduction up to &#x20B9;1.5 lakh per year.</li>
        <li><strong>Senior citizen premium:</strong> Extra 0.25%–0.50% interest for senior citizens.</li>
      </ul>

      <h2>FD Returns at Different Rates and Tenures</h2>
      <p>
        The table below shows how a <strong>&#x20B9;1,00,000 FD</strong> grows at various rates over different tenures (quarterly compounding):
      </p>

      <div className="fd-table-wrap">
        <table className="fd-table">
          <thead>
            <tr>
              <th>Tenure</th>
              <th>At 6.5% p.a.</th>
              <th>At 7.0% p.a.</th>
              <th>At 7.5% p.a.</th>
              <th>At 8.0% p.a.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 Year</td>
              <td className="td-green">&#x20B9;1,06,614</td>
              <td className="td-green">&#x20B9;1,07,186</td>
              <td className="td-green">&#x20B9;1,07,763</td>
              <td className="td-green">&#x20B9;1,08,243</td>
            </tr>
            <tr>
              <td>2 Years</td>
              <td className="td-green">&#x20B9;1,13,866</td>
              <td className="td-green">&#x20B9;1,14,888</td>
              <td className="td-green">&#x20B9;1,15,969</td>
              <td className="td-green">&#x20B9;1,17,166</td>
            </tr>
            <tr>
              <td>3 Years</td>
              <td className="td-green">&#x20B9;1,21,599</td>
              <td className="td-green">&#x20B9;1,23,144</td>
              <td className="td-green">&#x20B9;1,24,870</td>
              <td className="td-green">&#x20B9;1,26,824</td>
            </tr>
            <tr>
              <td>5 Years</td>
              <td className="td-green">&#x20B9;1,38,475</td>
              <td className="td-blue">&#x20B9;1,41,478</td>
              <td className="td-blue">&#x20B9;1,44,995</td>
              <td className="td-blue">&#x20B9;1,48,594</td>
            </tr>
            <tr>
              <td>10 Years</td>
              <td className="td-green">&#x20B9;1,91,754</td>
              <td className="td-blue">&#x20B9;2,00,160</td>
              <td className="td-blue">&#x20B9;2,09,757</td>
              <td className="td-blue">&#x20B9;2,20,804</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: ".78rem", color: "var(--muted)", marginTop: "-10px" }}>
        * Computed using A = P(1+r/n)^(nt) with quarterly compounding. No TDS applied.
      </p>

      <h2>Cumulative vs Non-Cumulative FD</h2>

      <h3>Cumulative FD</h3>
      <p>
        In a cumulative FD, interest is reinvested and paid at maturity as a lump sum.
      </p>

      <h3>Non-Cumulative FD</h3>
      <p>
        In a non-cumulative FD, interest is paid periodically (monthly/quarterly/half-yearly).
      </p>

      <h2>Tax on FD Interest Income</h2>
      <ul>
        <li>TDS applies above threshold limits.</li>
        <li>Form 15G/15H can avoid TDS if eligible.</li>
        <li>Interest is fully taxable as per slab rate.</li>
      </ul>

      <h2>FD vs Other Investment Options</h2>

      <div className="fd-table-wrap">
        <table className="fd-table">
          <thead>
            <tr>
              <th>Investment</th>
              <th>Typical Returns</th>
              <th>Risk</th>
              <th>Liquidity</th>
              <th>Tax on Gains</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fixed Deposit</td>
              <td>6.5%–9%</td>
              <td>Very Low</td>
              <td>Medium</td>
              <td>Slab rate</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Tips to Maximise Your FD Returns</h2>
      <ol>
        <li>Compare bank rates.</li>
        <li>Use FD laddering.</li>
        <li>Prefer monthly compounding.</li>
        <li>Submit Form 15G/15H if eligible.</li>
        <li>Split deposits across banks.</li>
      </ol>

    </div>
        <FAQSection faqData={FAQS}/>
      <div className="related-section">
        <div className="section-title">Related Calculator Tools</div>
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
      <div className={`toast ${toast.show ? 'show' : ''}`} aria-live="polite">
        {toast.text}
      </div>
    </div>
  )
}


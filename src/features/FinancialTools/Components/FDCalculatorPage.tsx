import { useEffect, useMemo, useRef, useState } from 'react'
import '../Styles/fd-calculator.css'

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

      <div className={`toast ${toast.show ? 'show' : ''}`} aria-live="polite">
        {toast.text}
      </div>
    </div>
  )
}


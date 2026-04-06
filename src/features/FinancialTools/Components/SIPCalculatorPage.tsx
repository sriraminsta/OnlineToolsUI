import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import '../Styles/sip-calculator.css'

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

const FREQ_OPTIONS = [
  { freq: 12, label: 'Monthly' },
  { freq: 4, label: 'Quarterly' },
  { freq: 2, label: 'Half-Yearly' },
  { freq: 1, label: 'Yearly' },
] as const

const FREQ_INLINE: Record<number, string> = {
  12: '(per month)',
  4: '(per quarter)',
  2: '(per half-year)',
  1: '(per year)',
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

function sipMaturity(P: number, i: number, n: number) {
  if (i <= 0) return P * n
  return (P * (Math.pow(1 + i, n) - 1)) / i * (1 + i)
}

function formatMoney(symbol: string, locale: string, num: number) {
  const rounded = Math.round(num)
  try {
    return `${symbol}${rounded.toLocaleString(locale)}`
  } catch {
    return `${symbol}${rounded.toLocaleString('en-US')}`
  }
}

type CopyKey = 'invested' | 'returns' | 'total'

export default function SIPCalculatorPage() {
  const [currencyCode, setCurrencyCode] = useState('INR')
  const currency = useMemo(() => currencies.find((c) => c.code === currencyCode) ?? currencies[0], [currencyCode])

  const [freq, setFreq] = useState<number>(12)
  const [amount, setAmount] = useState(5000)
  const [ratePct, setRatePct] = useState(12)
  const [years, setYears] = useState(10)

  const [toast, setToast] = useState({ show: false, text: '' })
  const toastTimer = useRef<number | null>(null)
  const [copiedKey, setCopiedKey] = useState<CopyKey | null>(null)
  const copiedTimer = useRef<number | null>(null)

  const amountSlMin = 500
  const amountSlMax = 200000
  const amountSlStep = 500
  const rateSlMin = 1
  const rateSlMax = 30
  const rateSlStep = 0.5
  const periodSlMin = 1
  const periodSlMax = 40

  const amountSlider = clamp(amount, amountSlMin, amountSlMax)
  const rateSlider = clamp(ratePct, rateSlMin, rateSlMax)
  const yearsSlider = clamp(years, periodSlMin, periodSlMax)

  const r = ratePct / 100
  const i = r / freq
  const n = freq * years
  const isValid = amount > 0 && ratePct > 0 && years > 0 && freq > 0

  const results = useMemo(() => {
    if (!isValid) {
      return {
        M: 0,
        invested: 0,
        returns: 0,
        cagr: 0,
        absRet: 0,
        lsM: 0,
        lsRet: 0,
        lsPct: 0,
      }
    }
    const M = sipMaturity(amount, i, n)
    const invested = amount * n
    const returns = M - invested
    const absRet = invested > 0 ? ((M - invested) / invested) * 100 : 0
    const cagr = invested > 0 && years > 0 ? (Math.pow(M / invested, 1 / years) - 1) * 100 : 0
    const lsM = invested * Math.pow(1 + r, years)
    const lsRet = lsM - invested
    const lsPct = invested > 0 ? (lsRet / invested) * 100 : 0
    return { M, invested, returns, cagr, absRet, lsM, lsRet, lsPct }
  }, [amount, freq, i, isValid, n, r, ratePct, years])

  const fmt = useCallback(
    (num: number) => formatMoney(currency.symbol, currency.locale, num),
    [currency.locale, currency.symbol],
  )

  const periodLabel = `${years} ${years === 1 ? 'Year' : 'Years'}`
  const freqInline = FREQ_INLINE[freq] ?? '(per period)'

  const donut = useMemo(() => {
    const circ = 2 * Math.PI * 70
    const { M: maturity, invested, returns } = results
    if (!isValid || maturity <= 0) {
      return {
        investedDash: `${circ} 0`,
        returnsDash: `0 ${circ}`,
        returnsOffset: 110,
        center: fmt(0),
      }
    }
    const investedLen = (invested / maturity) * circ
    const returnsLen = (returns / maturity) * circ
    return {
      investedDash: `${investedLen} ${circ - investedLen}`,
      returnsDash: `${returnsLen} ${circ - returnsLen}`,
      returnsOffset: 110 - investedLen,
      center: fmt(maturity),
    }
  }, [fmt, isValid, results.M, results.invested, results.returns])

  const tableRows = useMemo(() => {
    if (!isValid || !Number.isFinite(i) || i < 0) return []
    const finalM = results.M
    const rows: Array<{ year: number; inv: number; ret: number; val: number; pct: number }> = []
    for (let y = 1; y <= years; y++) {
      const periods = freq * y
      const val = sipMaturity(amount, i, periods)
      const inv = amount * periods
      const ret = val - inv
      const pct = finalM > 0 ? Math.round((val / finalM) * 100) : 0
      rows.push({ year: y, inv, ret, val, pct })
    }
    return rows
  }, [amount, freq, i, isValid, results.M, years])

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
    const value = key === 'invested' ? results.invested : key === 'returns' ? results.returns : results.M
    const text = fmt(value)
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
    setFreq(12)
    setAmount(5000)
    setRatePct(12)
    setYears(10)
  }

  const CopyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  )

  return (
    <div className="sip">
            <div className="breadcrumb">
        <a href="/">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <a href="/calculator-tools">Calculator Tools</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span>SIP Calculator</span>
      </div>

      <div className="page-header">
        <div className="page-header-inner">
          <div className="ph-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <div className="ph-text">
            <div className="ph-badge">
              <span />
              No Sign-Up · Instant · Free
            </div>
            <h1>SIP Calculator – Systematic Investment Plan</h1>
            <p>
              Calculate your SIP maturity value, total wealth gained and see a year-by-year growth breakdown of your monthly investments.
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
              <span className="card-title">Enter SIP Details</span>
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
                  <span>Investment Frequency</span>
                </div>
                <div className="freq-toggle" role="group" aria-label="Investment frequency">
                  {FREQ_OPTIONS.map(({ freq: f, label }) => (
                    <button
                      key={f}
                      type="button"
                      className={`freq-btn ${freq === f ? 'active' : ''}`}
                      onClick={() => setFreq(f)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <div className="form-label">
                  <span>
                    Investment Amount{' '}
                    <span style={{ fontWeight: 400, color: 'var(--muted)' }}>{freqInline}</span>
                  </span>
                  <span className="form-label-right">{fmt(amount)}</span>
                </div>
                <div className="input-row">
                  <input
                    type="number"
                    className="num-input"
                    min={1}
                    step={500}
                    value={amount || ''}
                    onChange={(e) => setAmount(Math.max(0, safeNumber(e.target.value)))}
                  />
                  <input
                    type="range"
                    min={amountSlMin}
                    max={amountSlMax}
                    step={amountSlStep}
                    value={amountSlider}
                    onChange={(e) => setAmount(safeNumber(e.target.value))}
                    style={{ background: rangeFill(amountSlMin, amountSlMax, amountSlider) }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, padding: '0 2px' }}>
                  <span style={{ fontSize: '.7rem', color: 'var(--muted)' }}>Tip: type any amount in the box above</span>
                  <span style={{ fontSize: '.7rem', color: 'var(--muted)' }}>Slider: up to 2L</span>
                </div>
              </div>

              <div className="form-group">
                <div className="form-label">
                  <span>Expected Annual Return (%)</span>
                  <span className="form-label-right">{ratePct.toFixed(1)}%</span>
                </div>
                <div className="input-row">
                  <input
                    type="number"
                    className="num-input"
                    min={1}
                    max={30}
                    step={0.5}
                    value={ratePct}
                    onChange={(e) => setRatePct(clamp(safeNumber(e.target.value), rateSlMin, rateSlMax))}
                  />
                  <input
                    type="range"
                    min={rateSlMin}
                    max={rateSlMax}
                    step={rateSlStep}
                    value={rateSlider}
                    onChange={(e) => setRatePct(safeNumber(e.target.value))}
                    style={{ background: rangeFill(rateSlMin, rateSlMax, rateSlider) }}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label">
                  <span>Investment Period</span>
                  <span className="form-label-right">{periodLabel}</span>
                </div>
                <div className="input-row">
                  <input
                    type="number"
                    className="num-input"
                    min={1}
                    max={40}
                    value={years}
                    onChange={(e) => setYears(clamp(Math.round(safeNumber(e.target.value)), periodSlMin, periodSlMax))}
                  />
                  <input
                    type="range"
                    min={periodSlMin}
                    max={periodSlMax}
                    value={yearsSlider}
                    onChange={(e) => setYears(Math.round(safeNumber(e.target.value)))}
                    style={{ background: rangeFill(periodSlMin, periodSlMax, yearsSlider) }}
                  />
                </div>
              </div>

              <button type="button" className="calc-btn" onClick={() => showToast('✓ Updated results')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                Calculate SIP Returns
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
              <span className="card-title">SIP vs Lump Sum Comparison</span>
            </div>
            <div className="compare-grid">
              <div className="cmp-half">
                <div className="cmp-label">📅 SIP (Periodic)</div>
                <div className="cmp-row">
                  <span className="cmp-key">Total Invested</span>
                  <span className="cmp-val blue">{isValid ? fmt(results.invested) : '—'}</span>
                </div>
                <div className="cmp-row">
                  <span className="cmp-key">Returns Earned</span>
                  <span className="cmp-val green">{isValid ? fmt(results.returns) : '—'}</span>
                </div>
                <div className="cmp-row">
                  <span className="cmp-key">Maturity Value</span>
                  <span className="cmp-val">{isValid ? fmt(results.M) : '—'}</span>
                </div>
                <div className="cmp-row">
                  <span className="cmp-key">Return %</span>
                  <span className="cmp-val green">{isValid ? `${results.absRet.toFixed(1)}%` : '—'}</span>
                </div>
              </div>
              <div className="cmp-half">
                <div className="cmp-label">💰 Lump Sum (one-time)</div>
                <div className="cmp-row">
                  <span className="cmp-key">Amount Invested</span>
                  <span className="cmp-val blue">{isValid ? fmt(results.invested) : '—'}</span>
                </div>
                <div className="cmp-row">
                  <span className="cmp-key">Returns Earned</span>
                  <span className="cmp-val green">{isValid ? fmt(results.lsRet) : '—'}</span>
                </div>
                <div className="cmp-row">
                  <span className="cmp-key">Maturity Value</span>
                  <span className="cmp-val">{isValid ? fmt(results.lsM) : '—'}</span>
                </div>
                <div className="cmp-row">
                  <span className="cmp-key">Return %</span>
                  <span className="cmp-val green">{isValid ? `${results.lsPct.toFixed(1)}%` : '—'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card table-card" style={{ display: isValid ? 'block' : 'none' }}>
            <div className="card-header">
              <div className="card-header-icon" style={{ background: 'var(--accent-l)' }}>
                📊
              </div>
              <span className="card-title">Year-by-Year Breakdown</span>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Amount Invested</th>
                    <th>Returns Earned</th>
                    <th>Total Value</th>
                    <th>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr key={row.year}>
                      <td className="td-year">Year {row.year}</td>
                      <td>{fmt(row.inv)}</td>
                      <td className="td-returns">+{fmt(row.ret)}</td>
                      <td className="td-total">{fmt(row.val)}</td>
                      <td>
                        <div className="bar-cell">
                          <div className="mini-bar" style={{ width: `${Math.min(row.pct, 80)}px`, maxWidth: 80 }} />
                          {row.pct}%
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
                  strokeDasharray={donut.returnsDash}
                  strokeLinecap="round"
                  strokeDashoffset={donut.returnsOffset}
                  style={{ transition: 'stroke-dasharray .6s ease' }}
                />
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="22"
                  strokeDasharray={donut.investedDash}
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
                  Total Value
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
                  Invested
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: '#059669' }} />
                  Returns
                </div>
              </div>
            </div>

            <div className="returns-badge">
              <span>📊</span>
              <span>
                Absolute Returns:{' '}
                <strong>{isValid ? `${results.absRet.toFixed(1)}%` : '—'}</strong>
                &nbsp;|&nbsp; CAGR:{' '}
                <strong>{isValid ? `${results.cagr.toFixed(2)}% p.a.` : '—'}</strong>
              </span>
            </div>

            <div className="stat-cards">
              <div className="stat-card sc-invested">
                <div className="stat-card-left">
                  <div className="stat-icon">💰</div>
                  <div>
                    <div className="stat-label">Total Amount Invested</div>
                    <div className="stat-value">{fmt(results.invested)}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className={`copy-btn ${copiedKey === 'invested' ? 'copied' : ''}`}
                  onClick={() => onCopy('invested')}
                >
                  {copiedKey === 'invested' ? (
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
                  <div className="stat-icon">📈</div>
                  <div>
                    <div className="stat-label">Wealth Gained (Returns)</div>
                    <div className="stat-value">{fmt(results.returns)}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className={`copy-btn ${copiedKey === 'returns' ? 'copied' : ''}`}
                  onClick={() => onCopy('returns')}
                >
                  {copiedKey === 'returns' ? (
                    '✓ Copied!'
                  ) : (
                    <>
                      <CopyIcon />
                      Copy
                    </>
                  )}
                </button>
              </div>
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
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="stat-label">Total Maturity Value</div>
                    <div className="stat-value">{fmt(results.M)}</div>
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
            <h3>How is SIP Return Calculated?</h3>
            <p>
              SIP uses the Future Value of Annuity formula. Each instalment grows independently from the time it&apos;s invested until
              the end of the tenure. Earlier investments grow the most.
            </p>
            <div className="formula-vars">
              <div className="formula-var">
                <b>M</b> = Maturity Amount &nbsp;|&nbsp; <b>P</b> = Periodic investment
              </div>
              <div className="formula-var">
                <b>i</b> = Rate per period (annual rate ÷ frequency) &nbsp;|&nbsp; <b>n</b> = Total periods
              </div>
            </div>
          </div>
          <div className="formula-code">M = P × [(1+i)ⁿ – 1] ÷ i × (1+i)</div>
        </div>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">📅</div>
            <div className="info-title">What is SIP?</div>
            <div className="info-text">
              A Systematic Investment Plan lets you invest a fixed amount at regular intervals in a mutual fund. It averages your
              purchase cost over time (rupee cost averaging) and builds disciplined saving habits.
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">⚡</div>
            <div className="info-title">Power of Compounding</div>
            <div className="info-text">
              The longer you stay invested, the more compounding works in your favour. A ₹5,000/month SIP at 12% for 30 years grows to
              over ₹1.7 Crore — from just ₹18L invested!
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">📊</div>
            <div className="info-title">SIP vs Lump Sum</div>
            <div className="info-text">
              Lump sum investing beats SIP in a strongly rising market. But SIP beats lump sum in volatile markets by spreading risk.
              For most retail investors, SIP is the safer and more practical choice.
            </div>
          </div>
        </div>
      </div>

      <div className="related-section">
        <div className="section-title">Related Calculator Tools</div>
        <div className="related-grid">
          <a href="/calculator-tools/fd-calculator" className="related-card">
            <div className="rc-icon">🏦</div>
            <div className="rc-name">FD Calculator</div>
            <div className="rc-desc">Calculate fixed deposit maturity and interest earned.</div>
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
            <div className="rc-desc">Plan your systematic withdrawals from mutual funds.</div>
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
            <div className="rc-desc">Calculate your loan EMI and repayment schedule.</div>
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
            <div className="rc-desc">Calculate Public Provident Fund maturity value.</div>
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
                  <a href="/calculator-tools/emi-calculator">EMI Calculator</a>
                </li>
                <li>
                  <a href="/calculator-tools/swp-calculator">SWP Calculator</a>
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

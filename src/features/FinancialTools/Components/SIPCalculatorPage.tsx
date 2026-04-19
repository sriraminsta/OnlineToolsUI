import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/sip-calculator.css'
import {FAQS} from '../Data/SIPCalculatorFAQ'
import FAQSection from '../../../Components/FAQSection'

/* ─── Types ─────────────────────────────────────────────────────────────── */
type CurrencyOption = { code: string; symbol: string; locale: string; label: string }
type CopyKey = 'invested' | 'returns' | 'total'

/* ─── Constants ──────────────────────────────────────────────────────────── */
const currencies: CurrencyOption[] = [
  { code: 'INR', symbol: '₹',    locale: 'en-IN', label: '🇮🇳 Indian Rupee (₹ INR)' },
  { code: 'USD', symbol: '$',    locale: 'en-US', label: '🇺🇸 US Dollar ($ USD)' },
  { code: 'EUR', symbol: '€',    locale: 'de-DE', label: '🇪🇺 Euro (€ EUR)' },
  { code: 'GBP', symbol: '£',    locale: 'en-GB', label: '🇬🇧 British Pound (£ GBP)' },
  { code: 'AED', symbol: 'AED ', locale: 'en-US', label: '🇦🇪 UAE Dirham (AED)' },
  { code: 'SGD', symbol: 'S$',   locale: 'en-SG', label: '🇸🇬 Singapore Dollar (S$)' },
  { code: 'AUD', symbol: 'A$',   locale: 'en-AU', label: '🇦🇺 Australian Dollar (A$)' },
  { code: 'CAD', symbol: 'C$',   locale: 'en-CA', label: '🇨🇦 Canadian Dollar (C$)' },
  { code: 'JPY', symbol: '¥',    locale: 'ja-JP', label: '🇯🇵 Japanese Yen (¥ JPY)' },
  { code: 'SAR', symbol: '﷼',   locale: 'en-US', label: '🇸🇦 Saudi Riyal (﷼ SAR)' },
  { code: 'MYR', symbol: 'RM',   locale: 'ms-MY', label: '🇲🇾 Malaysian Ringgit (RM)' },
]

const FREQ_OPTIONS = [
  { freq: 12, label: 'Monthly' },
  { freq: 4,  label: 'Quarterly' },
  { freq: 2,  label: 'Half-Yearly' },
  { freq: 1,  label: 'Yearly' },
] as const

const FREQ_INLINE: Record<number, string> = {
  12: '(per month)', 4: '(per quarter)', 2: '(per half-year)', 1: '(per year)',
}

const ALL_TOOLS = [
  { name: 'SIP Calculator',        path: '/financial-calculators/sip-calculator',    cat: 'Financial' },
  { name: 'FD Calculator',         path: '/financial-calculators/fd-calculator',     cat: 'Financial' },
  { name: 'EMI Calculator',        path: '/financial-calculators/emi-calculator',    cat: 'Financial' },
  { name: 'PPF Calculator',        path: '/financial-calculators/ppf-calculator',    cat: 'Financial' },
  { name: 'SWP Calculator',        path: '/financial-calculators/swp-calculator',    cat: 'Financial' },
  { name: 'GST Calculator',        path: '/financial-calculators/gst-calculator',    cat: 'Financial' },
  { name: 'Income Tax Calculator', path: '/financial-calculators/income-tax',        cat: 'Financial' },
  { name: 'Compound Interest',     path: '/financial-calculators/compound-interest', cat: 'Financial' },
  { name: 'BMI Calculator',        path: '/health-tools/bmi-calculator',             cat: 'Health' },
  { name: 'BMR Calculator',        path: '/health-tools/bmr-calculator',             cat: 'Health' },
  { name: 'Calorie Calculator',    path: '/health-tools/calorie-calculator',         cat: 'Health' },
  { name: 'Age Calculator',        path: '/health-tools/age-calculator',             cat: 'Health' },
  { name: 'JSON Formatter',        path: '/developer-tools/json-formatter',          cat: 'Dev' },
  { name: 'Base64 Encoder',        path: '/developer-tools/base64-encoder',          cat: 'Dev' },
  { name: 'Password Generator',    path: '/developer-tools/password-generator',      cat: 'Dev' },
  { name: 'UUID Generator',        path: '/developer-tools/uuid-generator',          cat: 'Dev' },
  { name: 'Word Counter',          path: '/text-tools/word-counter',                 cat: 'Text' },
  { name: 'Case Converter',        path: '/text-tools/case-converter',               cat: 'Text' },
  { name: 'Lorem Ipsum Generator', path: '/text-tools/lorem-ipsum',                 cat: 'Text' },
  { name: 'Merge PDF',             path: '/pdf-tools/merge-pdf',                    cat: 'PDF' },
  { name: 'Split PDF',             path: '/pdf-tools/split-pdf',                    cat: 'PDF' },
  { name: 'Image Compressor',      path: '/image-tools/image-compressor',           cat: 'Image' },
  { name: 'Background Remover',    path: '/image-tools/background-remover',         cat: 'Image' },
  { name: 'Length Converter',      path: '/unit-converters/length',                 cat: 'Converter' },
  { name: 'Temperature Converter', path: '/unit-converters/temperature',            cat: 'Converter' },
  { name: 'Password Strength',     path: '/security-tools/password-strength',       cat: 'Security' },
  { name: 'SHA256 Hash',           path: '/security-tools/sha256',                  cat: 'Security' },
  { name: 'Age Calculator',        path: '/date-tools/age-calculator',              cat: 'Date' },
  { name: 'Timezone Converter',    path: '/date-tools/timezone-converter',          cat: 'Date' },
  { name: 'Percentage Calculator', path: '/math-tools/percentage-calculator',       cat: 'Math' },
]

const RELATED_CALCS = [
  { name: 'SIP Calculator', path: '/financial-calculators/sip-calculator', icon: '📈', current: true },
  { name: 'FD Calculator',  path: '/financial-calculators/fd-calculator',  icon: '🏦', current: false },
  { name: 'EMI Calculator', path: '/financial-calculators/emi-calculator', icon: '🏠', current: false },
  { name: 'PPF Calculator', path: '/financial-calculators/ppf-calculator', icon: '🛡️', current: false },
  { name: 'SWP Calculator', path: '/financial-calculators/swp-calculator', icon: '💸', current: false },
]

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function clamp(n: number, min: number, max: number) { return Math.min(Math.max(n, min), max) }
function safeNumber(v: string) { const n = Number(v); return Number.isFinite(n) ? n : 0 }
function rangeFill(min: number, max: number, val: number) {
  const p = clamp(max === min ? 0 : ((val - min) / (max - min)) * 100, 0, 100)
  return `linear-gradient(to right, var(--accent) 0%, var(--accent) ${p}%, #d1d5db ${p}%, #d1d5db 100%)`
}
function sipMaturity(P: number, i: number, n: number) {
  if (i <= 0) return P * n
  return (P * (Math.pow(1 + i, n) - 1)) / i * (1 + i)
}
function formatMoney(symbol: string, locale: string, num: number) {
  const rounded = Math.round(num)
  try { return `${symbol}${rounded.toLocaleString(locale)}` }
  catch { return `${symbol}${rounded.toLocaleString('en-US')}` }
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */
const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
)
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)


/* ─── Search Bar ─────────────────────────────────────────────────────────── */
function SearchBar() {
  const [query, setQuery] = useState('')
  const [open, setOpen]   = useState(false)
  const ref               = useRef<HTMLDivElement>(null)
  const navigate          = useNavigate()

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return ALL_TOOLS.filter((t) => t.name.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q)).slice(0, 6)
  }, [query])

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function go(path: string) { setQuery(''); setOpen(false); navigate(path) }

  return (
    <div className="search-wrap" ref={ref}>
      <div className="search-box">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text" className="search-input" placeholder="Search 160+ tools…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') { setQuery(''); setOpen(false) }
            if (e.key === 'Enter' && results.length > 0) go(results[0].path)
          }}
          aria-label="Search tools"
        />
        {query && <button className="search-clear" onClick={() => { setQuery(''); setOpen(false) }}>✕</button>}
      </div>
      {open && results.length > 0 && (
        <div className="search-dropdown">
          {results.map((t) => (
            <button key={t.path} className="search-result-item" onClick={() => go(t.path)}>
              <span className="sri-name">{t.name}</span>
              <span className="sri-cat">{t.cat}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function SIPCalculatorPage() {
  const [currencyCode, setCurrencyCode] = useState('INR')
  const currency = useMemo(() => currencies.find((c) => c.code === currencyCode) ?? currencies[0], [currencyCode])

  const [freq, setFreq]       = useState<number>(12)
  const [amount, setAmount]   = useState(5000)
  const [ratePct, setRatePct] = useState(12)
  const [years, setYears]     = useState(10)

  const [toast, setToast]         = useState({ show: false, text: '' })
  const toastTimer                 = useRef<number | null>(null)
  const [copiedKey, setCopiedKey] = useState<CopyKey | null>(null)
  const copiedTimer                = useRef<number | null>(null)


  const amountSlMin = 500, amountSlMax = 200000, amountSlStep = 500
  const rateSlMin   = 1,   rateSlMax   = 30,     rateSlStep   = 0.5
  const periodSlMin = 1,   periodSlMax = 40

  const amountSlider = clamp(amount,  amountSlMin,  amountSlMax)
  const rateSlider   = clamp(ratePct, rateSlMin,    rateSlMax)
  const yearsSlider  = clamp(years,   periodSlMin,  periodSlMax)

  const r       = ratePct / 100
  const i       = r / freq
  const n       = freq * years
  const isValid = amount > 0 && ratePct > 0 && years > 0 && freq > 0

  const results = useMemo(() => {
    if (!isValid) return { M: 0, invested: 0, returns: 0, cagr: 0, absRet: 0, lsM: 0, lsRet: 0, lsPct: 0 }
    const M       = sipMaturity(amount, i, n)
    const invested = amount * n
    const returns  = M - invested
    const absRet   = invested > 0 ? ((M - invested) / invested) * 100 : 0
    const cagr     = invested > 0 && years > 0 ? (Math.pow(M / invested, 1 / years) - 1) * 100 : 0
    const lsM      = invested * Math.pow(1 + r, years)
    const lsRet    = lsM - invested
    const lsPct    = invested > 0 ? (lsRet / invested) * 100 : 0
    return { M, invested, returns, cagr, absRet, lsM, lsRet, lsPct }
  }, [amount, freq, i, isValid, n, r, years])

  const fmt = useCallback((num: number) => formatMoney(currency.symbol, currency.locale, num), [currency])

  const donut = useMemo(() => {
    const circ = 2 * Math.PI * 70
    if (!isValid || results.M <= 0) return { investedDash: `${circ} 0`, returnsDash: `0 ${circ}`, returnsOffset: 110, center: fmt(0) }
    const iLen = (results.invested / results.M) * circ
    const rLen = (results.returns  / results.M) * circ
    return { investedDash: `${iLen} ${circ - iLen}`, returnsDash: `${rLen} ${circ - rLen}`, returnsOffset: 110 - iLen, center: fmt(results.M) }
  }, [fmt, isValid, results])

  const tableRows = useMemo(() => {
    if (!isValid || !Number.isFinite(i) || i < 0) return []
    return Array.from({ length: years }, (_, idx) => {
      const y = idx + 1, periods = freq * y
      const val = sipMaturity(amount, i, periods)
      return { year: y, inv: amount * periods, ret: val - amount * periods, val, pct: results.M > 0 ? Math.round((val / results.M) * 100) : 0 }
    })
  }, [amount, freq, i, isValid, results.M, years])

  useEffect(() => () => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current)
  }, [])

  const showToast = (text: string) => {
    setToast({ show: true, text })
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast({ show: false, text: '' }), 2200)
  }

  const onCopy = async (key: CopyKey) => {
    const value = key === 'invested' ? results.invested : key === 'returns' ? results.returns : results.M
    const text = fmt(value)
    try { await navigator.clipboard.writeText(text) }
    catch {
      const ta = document.createElement('textarea')
      ta.value = text; ta.style.cssText = 'position:fixed;opacity:0'
      document.body.appendChild(ta); ta.select()
      try { document.execCommand('copy') } finally { document.body.removeChild(ta) }
    }
    setCopiedKey(key); showToast(`✓ Copied: ${text}`)
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current)
    copiedTimer.current = window.setTimeout(() => setCopiedKey(null), 2500)
  }

  const reset = () => { setCurrencyCode('INR'); setFreq(12); setAmount(5000); setRatePct(12); setYears(10) }

  const statCards = [
    { key: 'invested' as CopyKey, icon: <span>💰</span>, label: 'Total Amount Invested',  val: results.invested, cls: 'sc-invested' },
    { key: 'returns'  as CopyKey, icon: <span>📈</span>, label: 'Wealth Gained (Returns)', val: results.returns,  cls: 'sc-returns'  },
    {
      key: 'total' as CopyKey,
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
      label: 'Total Maturity Value', val: results.M, cls: 'sc-total',
    },
  ]

  return (
    <div className="sip">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        <a href="/financial-calculators">Calculator Tools</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        <span>SIP Calculator</span>
      </div>

      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-inner">
          <div className="ph-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <div className="ph-text">
            <div className="ph-badge"><span />No Sign-Up · Instant · Free</div>
            <h1>SIP Calculator – Systematic Investment Plan</h1>
            <p>Calculate your SIP maturity value, total wealth gained and see a year-by-year growth breakdown of your monthly investments.</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="search-section">
        <SearchBar />
      </div>

      {/* Main 2-column */}
      <div className="main">
        <div className="inputs-col">

          {/* Input Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-header-icon" style={{ background: 'var(--green-l)' }}>🧮</div>
              <span className="card-title">Enter SIP Details</span>
            </div>
            <div className="card-body">
              <div className="form-group" style={{ marginBottom: 18 }}>
                <div className="form-label"><span>Currency</span></div>
                <select className="styled-select" value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)}>
                  {currencies.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
                </select>
              </div>

              <div className="form-group">
                <div className="form-label"><span>Investment Frequency</span></div>
                <div className="freq-toggle" role="group">
                  {FREQ_OPTIONS.map(({ freq: f, label }) => (
                    <button key={f} type="button" className={`freq-btn${freq === f ? ' active' : ''}`} onClick={() => setFreq(f)}>{label}</button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <div className="form-label">
                  <span>Investment Amount <span style={{ fontWeight: 400, color: 'var(--muted)' }}>{FREQ_INLINE[freq]}</span></span>
                  <span className="form-label-right">{fmt(amount)}</span>
                </div>
                <div className="input-row">
                  <input type="number" className="num-input" min={1} step={500} value={amount || ''} onChange={(e) => setAmount(Math.max(0, safeNumber(e.target.value)))} />
                  <input type="range" min={amountSlMin} max={amountSlMax} step={amountSlStep} value={amountSlider} onChange={(e) => setAmount(safeNumber(e.target.value))} style={{ background: rangeFill(amountSlMin, amountSlMax, amountSlider) }} />
                </div>
                <div className="hint-text">Tip: type any amount — slider is a quick guide up to 2L</div>
              </div>

              <div className="form-group">
                <div className="form-label">
                  <span>Expected Annual Return (%)</span>
                  <span className="form-label-right">{ratePct.toFixed(1)}%</span>
                </div>
                <div className="input-row">
                  <input type="number" className="num-input" min={1} max={50} step={0.5} value={ratePct} onChange={(e) => setRatePct(clamp(safeNumber(e.target.value), rateSlMin, rateSlMax))} />
                  <input type="range" min={rateSlMin} max={rateSlMax} step={rateSlStep} value={rateSlider} onChange={(e) => setRatePct(safeNumber(e.target.value))} style={{ background: rangeFill(rateSlMin, rateSlMax, rateSlider) }} />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label">
                  <span>Investment Period</span>
                  <span className="form-label-right">{years} {years === 1 ? 'Year' : 'Years'}</span>
                </div>
                <div className="input-row">
                  <input type="number" className="num-input" min={1} max={50} value={years} onChange={(e) => setYears(clamp(Math.round(safeNumber(e.target.value)), periodSlMin, periodSlMax))} />
                  <input type="range" min={periodSlMin} max={periodSlMax} value={yearsSlider} onChange={(e) => setYears(Math.round(safeNumber(e.target.value)))} style={{ background: rangeFill(periodSlMin, periodSlMax, yearsSlider) }} />
                </div>
              </div>

              <button type="button" className="calc-btn" onClick={() => showToast('✓ Results updated!')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
                </svg>
                Calculate SIP Returns
              </button>
              <span className="reset-link" role="button" tabIndex={0} onClick={reset} onKeyDown={(e) => e.key === 'Enter' && reset()}>↺ Reset to defaults</span>
            </div>
          </div>

          {/* SIP vs Lump Sum */}
          <div className="card compare-card" style={{ marginTop: 20 }}>
            <div className="card-header">
              <div className="card-header-icon" style={{ background: 'var(--purple-l)' }}>⚡</div>
              <span className="card-title">SIP vs Lump Sum Comparison</span>
            </div>
            <div className="compare-grid">
              <div className="cmp-half">
                <div className="cmp-label">📅 SIP (Periodic)</div>
                <div className="cmp-row"><span className="cmp-key">Total Invested</span>    <span className="cmp-val blue">{isValid ? fmt(results.invested) : '—'}</span></div>
                <div className="cmp-row"><span className="cmp-key">Returns Earned</span>    <span className="cmp-val green">{isValid ? fmt(results.returns) : '—'}</span></div>
                <div className="cmp-row"><span className="cmp-key">Maturity Value</span>    <span className="cmp-val">{isValid ? fmt(results.M) : '—'}</span></div>
                <div className="cmp-row"><span className="cmp-key">Absolute Return %</span><span className="cmp-val green">{isValid ? `${results.absRet.toFixed(1)}%` : '—'}</span></div>
              </div>
              <div className="cmp-half">
                <div className="cmp-label">💰 Lump Sum (one-time)</div>
                <div className="cmp-row"><span className="cmp-key">Amount Invested</span>  <span className="cmp-val blue">{isValid ? fmt(results.invested) : '—'}</span></div>
                <div className="cmp-row"><span className="cmp-key">Returns Earned</span>   <span className="cmp-val green">{isValid ? fmt(results.lsRet) : '—'}</span></div>
                <div className="cmp-row"><span className="cmp-key">Maturity Value</span>   <span className="cmp-val">{isValid ? fmt(results.lsM) : '—'}</span></div>
                <div className="cmp-row"><span className="cmp-key">Absolute Return %</span><span className="cmp-val green">{isValid ? `${results.lsPct.toFixed(1)}%` : '—'}</span></div>
              </div>
            </div>
          </div>

          {/* Year-by-Year Table */}
          {isValid && tableRows.length > 0 && (
            <div className="card table-card" style={{ marginTop: 20 }}>
              <div className="card-header">
                <div className="card-header-icon" style={{ background: 'var(--accent-l)' }}>📊</div>
                <span className="card-title">Year-by-Year Breakdown</span>
              </div>
              <div className="table-scroll">
                <table>
                  <thead><tr><th>Year</th><th>Amount Invested</th><th>Returns Earned</th><th>Total Value</th><th>Growth</th></tr></thead>
                  <tbody>
                    {tableRows.map((row) => (
                      <tr key={row.year}>
                        <td className="td-year">Year {row.year}</td>
                        <td>{fmt(row.inv)}</td>
                        <td className="td-returns">+{fmt(row.ret)}</td>
                        <td className="td-total">{fmt(row.val)}</td>
                        <td><div className="bar-cell"><div className="mini-bar" style={{ width: `${Math.min(row.pct, 80)}px`, maxWidth: 80 }} />{row.pct}%</div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>{/* /inputs-col */}

        {/* Right Column */}
        <div className="results-col">
          <div className="card">
            <div className="donut-wrap">
              <svg className="donut-svg" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="70" fill="none" stroke="#e5e7eb" strokeWidth="22" />
                <circle cx="90" cy="90" r="70" fill="none" stroke="#059669" strokeWidth="22" strokeDasharray={donut.returnsDash} strokeLinecap="round" strokeDashoffset={donut.returnsOffset} style={{ transition: 'stroke-dasharray .6s ease' }} />
                <circle cx="90" cy="90" r="70" fill="none" stroke="#2563eb" strokeWidth="22" strokeDasharray={donut.investedDash} strokeLinecap="round" strokeDashoffset={110} style={{ transition: 'stroke-dasharray .6s ease' }} />
                <text x="90" y="82" textAnchor="middle" fontFamily="'Bricolage Grotesque',sans-serif" fontSize="11" fontWeight="700" fill="#6b7280">Total Value</text>
                <text x="90" y="100" textAnchor="middle" fontFamily="'Bricolage Grotesque',sans-serif" fontSize="14" fontWeight="800" fill="#0f1629">{donut.center}</text>
              </svg>
              <div className="donut-legend">
                <div className="legend-item"><div className="legend-dot" style={{ background: '#2563eb' }} />Invested</div>
                <div className="legend-item"><div className="legend-dot" style={{ background: '#059669' }} />Returns</div>
              </div>
            </div>

            <div className="returns-badge">
              <span>📊</span>
              <span>Absolute Returns: <strong>{isValid ? `${results.absRet.toFixed(1)}%` : '—'}</strong>&nbsp;|&nbsp;CAGR: <strong>{isValid ? `${results.cagr.toFixed(2)}% p.a.` : '—'}</strong></span>
            </div>

            <div className="stat-cards">
              {statCards.map(({ key, icon, label, val, cls }) => (
                <div key={key} className={`stat-card ${cls}`}>
                  <div className="stat-card-left">
                    <div className="stat-icon" style={key === 'total' ? { background: 'var(--green)' } : {}}>{icon}</div>
                    <div><div className="stat-label">{label}</div><div className="stat-value">{fmt(val)}</div></div>
                  </div>
                  <button type="button" className={`copy-btn${copiedKey === key ? ' copied' : ''}`} onClick={() => onCopy(key)}>
                    {copiedKey === key ? '✓ Copied!' : <><CopyIcon />Copy</>}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Related Calculators Mini Widget */}
          <div className="related-mini-card" style={{ marginTop: 16 }}>
            <div className="card-header">
              <div className="card-header-icon" style={{ background: 'var(--green-l)' }}>🧮</div>
              <span className="card-title">Other Calculators</span>
            </div>
            <div className="related-mini-list">
              {RELATED_CALCS.map((c) => (
                <a key={c.path} href={c.path} className={`related-mini-item${c.current ? ' current' : ''}`}>
                  <div className="rmi-icon">{c.icon}</div>
                  <span className="rmi-name">{c.name}</span>
                  <span className="rmi-arr">{c.current ? '✓ Here' : '→'}</span>
                </a>
              ))}
              <a href="/financial-calculators" className="related-mini-all">View all calculators →</a>
            </div>
          </div>
        </div>
      </div>{/* /main */}

      {/* Info Section */}
      <div className="info-section">
        <div className="formula-card">
          <div className="formula-left">
            <h3>How is SIP Return Calculated?</h3>
            <p>SIP uses the Future Value of Annuity formula. Each instalment compounds independently from the date of investment to the end of tenure — earlier instalments grow the most.</p>
            <div className="formula-vars">
              <div className="formula-var"><b>M</b> = Maturity Amount &nbsp;|&nbsp; <b>P</b> = Periodic investment</div>
              <div className="formula-var"><b>i</b> = Rate per period (annual ÷ frequency) &nbsp;|&nbsp; <b>n</b> = Total periods</div>
            </div>
          </div>
          <div className="formula-code">M = P × [(1+i)ⁿ – 1] ÷ i × (1+i)</div>
        </div>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">📅</div>
            <div className="info-title">What is SIP?</div>
            <div className="info-text">A Systematic Investment Plan lets you invest a fixed amount at regular intervals in a mutual fund. It builds disciplined saving habits and averages your purchase cost over time through rupee cost averaging.</div>
          </div>
          <div className="info-card">
            <div className="info-icon">⚡</div>
            <div className="info-title">Power of Compounding</div>
            <div className="info-text">The longer you stay invested, the more compounding works in your favour. A ₹5,000/month SIP at 12% p.a. for 30 years can grow to over ₹1.7 Crore — from just ₹18 lakh invested!</div>
          </div>
          <div className="info-card">
            <div className="info-icon">📊</div>
            <div className="info-title">SIP vs Lump Sum</div>
            <div className="info-text">Lump sum can outperform in strongly rising markets. SIP shines in volatile markets by spreading your purchase across different price points — the safer choice for most salaried investors.</div>
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div className="seo-section">
        <h2>What is a Systematic Investment Plan (SIP)?</h2>
        <p>A <strong>Systematic Investment Plan (SIP)</strong> is a method of investing in mutual funds where you contribute a fixed amount at regular intervals — typically monthly — rather than investing a large lump sum at once. Each contribution purchases units of the chosen mutual fund scheme at the prevailing Net Asset Value (NAV). Over time, these units accumulate and grow with the fund's performance, building substantial wealth through the combined effect of market participation and compounding.</p>
        <p>SIPs are particularly well suited to salaried individuals who receive a regular income. By automating a monthly deduction, investors remove the temptation to spend and instead channel savings directly into wealth-building assets. The minimum SIP amount at most fund houses starts as low as <strong>₹500 per month</strong>, making it accessible to investors at every income level.</p>

        <h2>How Does a SIP Calculator Work?</h2>
        <p>A SIP calculator uses the <strong>Future Value of an Annuity</strong> formula to project the maturity value of your investments. You provide three inputs — your periodic investment amount, the expected annual return rate and the investment duration — and the calculator instantly shows the total corpus you could build.</p>
        <p>The formula is: <strong>M = P × &#123;[(1 + i)ⁿ – 1] / i&#125; × (1 + i)</strong>, where M is the maturity value, P is the periodic instalment, i is the interest rate per period and n is the total number of instalments. Because each instalment is invested at a different point in time, earlier contributions have more time to compound — which is why starting early makes such a dramatic difference to your final corpus.</p>

        <h2>Benefits of Investing Through SIP</h2>
        <ul>
          <li><strong>Disciplined saving:</strong> Automating a monthly investment removes the decision fatigue of timing the market. You invest consistently regardless of market conditions.</li>
          <li><strong>Rupee cost averaging:</strong> A fixed monthly amount automatically buys more units when prices are low and fewer when prices are high — averaging out your cost per unit over time.</li>
          <li><strong>Power of compounding:</strong> Returns earned in earlier periods are reinvested and themselves earn returns, creating an accelerating snowball effect over long investment horizons.</li>
          <li><strong>Flexibility:</strong> You can start, pause, increase, decrease or stop a SIP at any time without penalty in most open-ended mutual fund schemes.</li>
          <li><strong>Low entry barrier:</strong> With SIPs starting from ₹500/month, even first-time investors can participate in equity markets without needing large upfront capital.</li>
          <li><strong>Professional management:</strong> Your money is managed by experienced fund managers who research and select securities on your behalf.</li>
        </ul>

        <h2>SIP Returns: What to Realistically Expect</h2>
        <p>SIP returns are <strong>market-linked</strong> and not guaranteed. Historically, diversified equity mutual funds in India have delivered annualised returns of <strong>10%–15% over long periods (10+ years)</strong>, though individual fund performance varies significantly.</p>
        <p>The table below illustrates how a monthly SIP of <strong>₹5,000</strong> can grow at different return assumptions:</p>

        <div className="sip-table-wrap">
          <table className="sip-table">
            <thead>
              <tr><th>Duration</th><th>Total Invested</th><th>At 8% p.a.</th><th>At 12% p.a.</th><th>At 15% p.a.</th></tr>
            </thead>
            <tbody>
              <tr><td>5 Years</td>  <td>₹3,00,000</td>  <td className="td-green">₹3,67,752</td>   <td className="td-green">₹4,12,432</td>   <td className="td-green">₹4,45,914</td></tr>
              <tr><td>10 Years</td> <td>₹6,00,000</td>  <td className="td-green">₹9,10,740</td>   <td className="td-green">₹11,61,695</td>  <td className="td-green">₹13,93,269</td></tr>
              <tr><td>15 Years</td> <td>₹9,00,000</td>  <td className="td-green">₹17,38,501</td>  <td className="td-green">₹25,22,880</td>  <td className="td-green">₹33,93,980</td></tr>
              <tr><td>20 Years</td> <td>₹12,00,000</td> <td className="td-green">₹29,64,511</td>  <td className="td-blue">₹49,95,740</td>   <td className="td-blue">₹75,78,657</td></tr>
              <tr><td>30 Years</td> <td>₹18,00,000</td> <td className="td-green">₹74,97,493</td>  <td className="td-blue">₹1,76,49,569</td> <td className="td-blue">₹3,49,12,047</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: -10 }}>* Indicative figures based on the SIP annuity formula with monthly compounding. Actual returns will vary.</p>

        <h2>Types of SIP to Know About</h2>
        <ul>
          <li><strong>Regular SIP:</strong> Fixed amount at fixed intervals. Simple, predictable and the most widely used.</li>
          <li><strong>Step-Up SIP:</strong> Increase your SIP by a fixed amount or percentage each year — significantly accelerates corpus building.</li>
          <li><strong>Flexible SIP:</strong> Vary the instalment amount based on your cash flow each period.</li>
          <li><strong>Perpetual SIP:</strong> No fixed end date — continues until you actively stop or redeem.</li>
          <li><strong>Trigger SIP:</strong> Investments triggered by pre-set market conditions rather than calendar dates.</li>
        </ul>

        <h2>Tax Treatment of SIP Returns</h2>
        <ul>
          <li><strong>Equity Funds (held &gt; 1 year):</strong> LTCG at 10% on gains exceeding ₹1 lakh per year. Gains up to ₹1 lakh are exempt.</li>
          <li><strong>Equity Funds (held &lt; 1 year):</strong> STCG at 15% on the entire gain.</li>
          <li><strong>Debt Mutual Funds:</strong> Gains taxed at your applicable slab rate, irrespective of holding period (post April 2023 rules).</li>
          <li><strong>ELSS Funds:</strong> Investments qualify under Section 80C up to ₹1.5 lakh/year. Returns taxed as LTCG at 10% above ₹1 lakh after 3-year lock-in.</li>
        </ul>

        <h2>Tips to Maximise Your SIP Returns</h2>
        <ol>
          <li><strong>Start as early as possible.</strong> Even a 5-year head start can more than double your eventual corpus due to compounding.</li>
          <li><strong>Use Step-Up SIP.</strong> Increasing your SIP by just 10% every year dramatically accelerates wealth creation.</li>
          <li><strong>Stay invested through volatility.</strong> Down markets are when SIPs accumulate the most units at the lowest prices. Stopping during a correction is the most common investor mistake.</li>
          <li><strong>Align fund selection with your goal.</strong> Equity funds for goals 5+ years away. Debt/hybrid funds for shorter horizons.</li>
          <li><strong>Review annually — don't react.</strong> Avoid making changes in response to short-term market news.</li>
        </ol>
      </div>

    <FAQSection faqData={FAQS}/>

      {/* Related Tools */}
      <div className="related-section">
        <div className="section-title">Related Calculator Tools</div>
        <div className="related-grid">
          {[
            { icon: '🏦', name: 'FD Calculator',  desc: 'Calculate fixed deposit maturity amount and interest earned.',    path: '/financial-calculators/fd-calculator' },
            { icon: '💸', name: 'SWP Calculator', desc: 'Plan systematic withdrawals from your investment corpus.',        path: '/financial-calculators/swp-calculator' },
            { icon: '🏠', name: 'EMI Calculator', desc: 'Calculate your loan EMI and full amortization schedule.',         path: '/financial-calculators/emi-calculator' },
            { icon: '🛡️', name: 'PPF Calculator', desc: 'Calculate Public Provident Fund maturity and tax-free returns.', path: '/financial-calculators/ppf-calculator' },
          ].map((c) => (
            <a key={c.path} href={c.path} className="related-card">
              <div className="rc-icon">{c.icon}</div>
              <div className="rc-name">{c.name}</div>
              <div className="rc-desc">{c.desc}</div>
              <div className="rc-link">Try now <ArrowIcon /></div>
            </a>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer">
        <p><strong>Disclaimer:</strong> Results are indicative estimates based on the values entered. Mutual fund investments are subject to market risks. Past performance does not guarantee future returns. Please read all scheme-related documents carefully before investing. This calculator is for educational purposes only and does not constitute financial advice.</p>
      </div>

      <div className={`toast${toast.show ? ' show' : ''}`} aria-live="polite">{toast.text}</div>
    </div>
  )
}

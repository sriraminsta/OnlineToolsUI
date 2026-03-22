function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function IconPdfDoc({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <rect x="12" y="8" width="40" height="48" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
      <path d="M22 22h20M22 30h20M22 38h12" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
      <text x="32" y="52" textAnchor="middle" fill="#DC2626" fontSize="10" fontWeight="700" fontFamily="system-ui">
        PDF
      </text>
    </svg>
  )
}

function IconLandscape({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <rect x="8" y="14" width="48" height="36" rx="4" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
      <path d="M8 42 24 26l8 8 12-14 12 14v8H8z" fill="#34D399" opacity="0.9" />
      <circle cx="46" cy="22" r="4" fill="#FBBF24" />
    </svg>
  )
}

function IconCalculator({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <rect x="14" y="10" width="36" height="44" rx="4" fill="#F3F4F6" stroke="#374151" strokeWidth="2" />
      <rect x="20" y="16" width="24" height="10" rx="2" fill="#E5E7EB" />
      <circle cx="24" cy="34" r="3" fill="#6B7280" />
      <circle cx="32" cy="34" r="3" fill="#6B7280" />
      <circle cx="40" cy="34" r="3" fill="#6B7280" />
      <circle cx="24" cy="44" r="3" fill="#6B7280" />
      <circle cx="32" cy="44" r="3" fill="#6B7280" />
    </svg>
  )
}

function IconCode({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <rect x="10" y="14" width="44" height="36" rx="4" fill="#1E3A5F" />
      <path d="M24 28l-6 6 6 6M40 28l6 6-6 6M34 24l-4 16" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function IconMergePdf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="6" y="10" width="16" height="22" rx="2" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
      <rect x="26" y="10" width="16" height="22" rx="2" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" opacity="0.85" />
      <path d="M20 24h8M22 22l4 4 4-4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconQr({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="8" y="8" width="12" height="12" fill="#1F2937" />
      <rect x="28" y="8" width="12" height="12" fill="#1F2937" />
      <rect x="8" y="28" width="12" height="12" fill="#1F2937" />
      <rect x="24" y="24" width="4" height="4" fill="#1F2937" />
      <rect x="32" y="24" width="4" height="4" fill="#1F2937" />
      <rect x="24" y="32" width="4" height="4" fill="#1F2937" />
      <rect x="32" y="32" width="8" height="8" fill="#1F2937" />
    </svg>
  )
}

function IconSipCoin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="10" y="12" width="28" height="28" rx="4" fill="#F3F4F6" stroke="#6B7280" strokeWidth="1.5" />
      <circle cx="24" cy="26" r="8" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
      <text x="24" y="29" textAnchor="middle" fill="#92400E" fontSize="8" fontWeight="700" fontFamily="system-ui">
        ₹
      </text>
    </svg>
  )
}

function IconWordCount({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="10" y="8" width="28" height="32" rx="2" fill="white" stroke="#9CA3AF" strokeWidth="1.5" />
      <text x="24" y="28" textAnchor="middle" fill="#2563EB" fontSize="12" fontWeight="700" fontFamily="system-ui">
        123
      </text>
    </svg>
  )
}

const navLinks: { label: string; href: string; active?: boolean }[] = [
  { label: 'Home', href: '#', active: true },
  { label: 'All Tools', href: '#' },
  { label: 'Calculator Tools', href: '#' },
  { label: 'PDF Tools', href: '#' },
  { label: 'Dev Tools', href: '#' },
  { label: 'Contact', href: '#' },
]

const categories = [
  { title: 'PDF Tools', Icon: IconPdfDoc },
  { title: 'Image Tools', Icon: IconLandscape },
  { title: 'Calculator Tools', Icon: IconCalculator },
  { title: 'Developer Tools', Icon: IconCode },
] as const

const popularTools = [
  {
    title: 'Merge PDF',
    description: 'Combine multiple PDFs.',
    Icon: IconMergePdf,
  },
  {
    title: 'QR Code Generator',
    description: 'Create custom QR codes.',
    Icon: IconQr,
  },
  {
    title: 'SIP Calculator',
    description: 'Calculate SIP Returns.',
    Icon: IconSipCoin,
  },
  {
    title: 'Word Counter',
    description: 'Count words & characters.',
    Icon: IconWordCount,
  },
] as const

const financialLinks = ['FD Calculator', 'SIP Calculator', 'SWP Calculator'] as const
const devLinks = ['JSON Formatter', 'Base64 Encoder', 'Password Generator'] as const

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <header className="sticky top-0 z-50 border-b border-slate-100/80 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="shrink-0 text-xl font-bold tracking-tight">
            <span className="text-slate-900">Online Tools</span>{' '}
            <span className="text-blue-600">Hub</span>
          </a>
          <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xs font-medium text-slate-600 sm:gap-x-6 sm:text-sm">
            {navLinks.map(({ label, href, active }) => (
              <a
                key={label}
                href={href}
                className={
                  active
                    ? 'border-b-2 border-blue-600 pb-0.5 text-slate-900'
                    : 'transition-colors hover:text-blue-600'
                }
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-b from-slate-50 to-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            The Best Free Online Tools in One Place
          </h1>
          <p className="mt-4 text-lg text-gray-500">Simple, fast &amp; secure tools for all your needs.</p>
          <form
            className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-stretch"
            onSubmit={(e) => e.preventDefault()}
            role="search"
          >
            <label htmlFor="tool-search" className="sr-only">
              Search for a tool
            </label>
            <input
              id="tool-search"
              type="search"
              placeholder="Search for a tool..."
              className="min-h-12 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-blue-600/20 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4"
            />
            <button
              type="submit"
              className="min-h-12 shrink-0 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ title, Icon }) => (
            <a
              key={title}
              href="#"
              className="group flex flex-col items-center rounded-xl border border-slate-100 bg-white p-8 shadow-md shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Icon className="h-16 w-16" />
              <span className="mt-4 text-center font-semibold text-slate-900">{title}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-slate-50/80 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Popular Tools</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularTools.map(({ title, description, Icon }) => (
              <a
                key={title}
                href="#"
                className="flex flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Icon className="h-12 w-12 shrink-0" />
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-md shadow-slate-200/50">
            <h2 className="text-lg font-bold text-slate-900">Financial Calculators</h2>
            <ul className="mt-6 space-y-3">
              {financialLinks.map((name) => (
                <li key={name}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-slate-700 transition hover:text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4 shrink-0 text-blue-600" />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-md shadow-slate-200/50">
            <h2 className="text-lg font-bold text-slate-900">Developer Utilities</h2>
            <ul className="mt-6 space-y-3">
              {devLinks.map((name) => (
                <li key={name}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-slate-700 transition hover:text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4 shrink-0 text-blue-600" />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Get Started with Our Free Tools
          </h2>
          <a
            href="#"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-10 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Explore All Tools
          </a>
        </div>
      </section>
    </div>
  )
}

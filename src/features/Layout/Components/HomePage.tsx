 import '../Styles/shared.css'
 import '../Styles/homepage.css'
 import SearchPage from  './SearchPage'

 export default function HomePage() {
  return (
    <>
        <section className="hero">
      {/* Background layers */}
      <div className="hero-bg"></div>
      <div className="hero-glow"></div>

      <div className="hero-inner">
        {/* Badge */}
        <div className="hero-badge fu">
          <span></span> 160+ Tools &middot; 10 Categories &middot; Always Free
        </div>

        {/* Main Heading */}
        <h1 className="fu d1">
          Your Everyday
          <br />
          <em>Online Toolbox</em>
        </h1>

        {/* Subheading */}
        <p className="hero-sub fu d2">
          PDF editing, image tools, financial calculators, developer utilities and more &mdash; instant results, no downloads, no account needed.
        </p>

 <SearchPage></SearchPage>
        {/* Search */}
        {/* Hero stats */}
        <div className="hero-stats fu d4">
          <div className="hstat">
            <span className="hstat-icon">🛠️</span>
            <span className="hstat-text">
              <strong>160+</strong> Free Tools
            </span>
          </div>
          <div className="stat-divider"></div>

          <div className="hstat">
            <span className="hstat-icon">⚡</span>
            <span className="hstat-text">
              <strong>Instant</strong> Results
            </span>
          </div>
          <div className="stat-divider"></div>

          <div className="hstat">
            <span className="hstat-icon">📱</span>
            <span className="hstat-text">
              <strong>Works</strong> on Mobile
            </span>
          </div>
          <div className="stat-divider"></div>

          <div className="hstat">
            <span className="hstat-icon">📥</span>
            <span className="hstat-text">
              <strong>No</strong> Downloads
            </span>
          </div>
        </div>
      </div>
    </section>
    <ins className="adsbygoogle"
     style={{display:'block'}}
     data-ad-client="ca-pub-9173866185064071"
     data-ad-slot="9558183636"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
     <main className="main-content" id="all-groups">
        
  <div className="sec-hdr">
    <div><div className="sec-title">Browse All 10 Categories</div><div className="sec-sub">160+ tools organised by type — pick a group to explore</div></div>
  </div>
  <div className="cats10">
    <a href="./pdf-tools/index.html" className="cat-card" style={{'--c' :'#ea580c','--cb':'#fff7ed'} as React.CSSProperties}><div className="cat-icon">&#x1F4C4;</div><div className="cat-name">PDF Tools</div><div className="cat-desc">Merge, split, compress, convert PDFs</div><span className="cat-badge">18 tools</span></a>
   <a href="./image-tools/index.html" className="cat-card" style={{'--c':'#3b5bdb','--cb':'#eef1ff"'} as React.CSSProperties}><div className="cat-icon">&#x1F5BC;&#xFE0F;</div><div className="cat-name">Image Tools</div><div className="cat-desc">Compress, resize, convert images</div><span className="cat-badge">20 tools</span></a>
    <a href="./calculator-tools/index.html" className="cat-card" style={{'--c':'#059669','--cb':'#ecfdf5'} as React.CSSProperties}><div className="cat-icon">&#x1F9EE;</div><div className="cat-name">Financial</div><div className="cat-desc">SIP, FD, EMI, GST, Tax calculators</div><span className="cat-badge">22 tools</span></a>
    <a href="./text-tools/index.html" className="cat-card" style={{'--c':'#7c3aed','--cb':'#f5f3ff'} as React.CSSProperties}><div className="cat-icon">&#x1F4DD;</div><div className="cat-name">Text Tools</div><div className="cat-desc">Word count, case, diff, slug tools</div><span className="cat-badge">21 tools</span></a>
    <a href="./dev-tools/index.html" className="cat-card" style={{'--c':'#0891b2','--cb':'#ecfeff'} as React.CSSProperties}><div className="cat-icon">&#x1F4BB;</div><div className="cat-name">Dev Tools</div><div className="cat-desc">JSON, Base64, regex, hash generator</div><span className="cat-badge">26 tools</span></a>
    <a href="./unit-converters/index.html" className="cat-card" style={{'--c':'#ea580c','--cb':'#fff7ed'} as React.CSSProperties}><div className="cat-icon">&#x1F504;</div><div className="cat-name">Unit Converters</div><div className="cat-desc">Length, weight, temp, data storage</div><span className="cat-badge">14 tools</span></a>
    <a href="./health-tools/index.html" className="cat-card" style={{'--c':'#dc2626','--cb':'#fef2f2'} as React.CSSProperties}><div className="cat-icon">&#x2764;&#xFE0F;</div><div className="cat-name">Health &amp; Fitness</div><div className="cat-desc">BMI, calorie, BMR, age, sleep</div><span className="cat-badge">12 tools</span></a>
    <a href="./math-tools/index.html" className="cat-card" style={{'--c':'#374151','--cb':'#f8f9fc'} as React.CSSProperties}><div className="cat-icon">&#x1F4D0;</div><div className="cat-name">Math &amp; Science</div><div className="cat-desc">Percentage, fractions, stats</div><span className="cat-badge">16 tools</span></a>
    <a href="./security-tools/index.html" className="cat-card" style={{'--c':'#7c3aed','--cb':'#f5f3ff'} as React.CSSProperties}><div className="cat-icon">&#x1F510;</div><div className="cat-name">Security Tools</div><div className="cat-desc">Hash, password, JWT, cipher</div><span className="cat-badge">12 tools</span></a>
    <a href="./date-tools/index.html" className="cat-card" style={{'--c':'#059669','--cb':'#ecfdf5'} as React.CSSProperties}><div className="cat-icon">&#x1F4C5;</div><div className="cat-name">Date &amp; Time</div><div className="cat-desc">Age, date diff, timezone tools</div><span className="cat-badge">10 tools</span></a>
    </div>

    <div id="all-tools-section">
    <div className="sec-hdr"><div><div className="sec-title">Search Results</div><div className="sec-sub" id="search-count"></div></div></div>
    <div className="tgrid4" id="all-tools-grid"></div>
  </div>
  {/*    GROUP 1: Financial Calculators   */}
    <div className="grp">
    <div className="grp-hdr" style={{background : '#ecfdf5', border: '1px solid #a7f3d0'}}>
      <div className="grp-hdr-l"><div className="grp-icon" style={{background : '#a7f3d0'}}>&#x1F9EE;</div><div><div className="grp-title">Financial Calculators</div><div className="grp-sub">Investment returns, loan EMI, tax and savings planning</div></div></div>
      <a href="./calculator-tools/index.html" className="see-all">All calculators <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
    </div>
    <div className="tgrid4">
      <a href="./calculator-tools/sip-calculator.html" className="tc"><div className="tc-icon" style={{background:'#ecfdf5'}}>&#x1F4C8;</div><div className="tc-name">SIP Calculator</div><div className="tc-desc">Mutual fund SIP returns and maturity value.</div><div className="tc-ft"><span className="t-built">Built</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./calculator-tools/fd-calculator.html" className="tc"><div className="tc-icon" style={{background:'#ecfdf5'}}>&#x1F3E6;</div><div className="tc-name">FD Calculator</div><div className="tc-desc">Fixed deposit maturity and interest earned.</div><div className="tc-ft"><span className="t-built">Built</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./calculator-tools/emi-calculator.html" className="tc"><div className="tc-icon" style={{background:'#ecfdf5'}}>&#x1F3E0;</div><div className="tc-name">EMI Calculator</div><div className="tc-desc">Loan EMI, total interest and amortization.</div><div className="tc-ft"><span className="t-built">Built</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./calculator-tools/ppf-calculator.html" className="tc"><div className="tc-icon" style={{background:'#ecfdf5'}}>&#x1F6E1;&#xFE0F;</div><div className="tc-name">PPF Calculator</div><div className="tc-desc">PPF maturity and tax-free interest returns.</div><div className="tc-ft"><span className="t-built">Built</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./calculator-tools/swp-calculator.html" className="tc"><div className="tc-icon" style={{background:'#ecfdf5'}}>&#x1F4B8;</div><div className="tc-name">SWP Calculator</div><div className="tc-desc">Corpus withdrawal planning and balance.</div><div className="tc-ft"><span className="t-built">Built</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./calculator-tools/gst-calculator.html" className="tc"><div className="tc-icon" style={{background:'#ecfdf5'}}>&#x1F9FE;</div><div className="tc-name">GST Calculator</div><div className="tc-desc">Add or remove GST — 5%, 12%, 18%, 28%.</div><div className="tc-ft"><span className="t-soon">Coming Soon</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./calculator-tools/income-tax.html" className="tc"><div className="tc-icon" style={{background:'#ecfdf5'}}>&#x1F4CB;</div><div className="tc-name">Income Tax Calculator</div><div className="tc-desc">Old vs New regime tax comparison.</div><div className="tc-ft"><span className="t-soon">Coming Soon</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./calculator-tools/index.html" className="tc-more">+15 more calculators &rarr;</a>
    </div>
  </div>

    {/*  AD SLOT 2: RECTANGLE between sections -->
  <!-- Best size: 728×90 or 320×100 on mobile. Earns well between content sections. 
  <!-- Google AdSense Responsive Ad Unit */}
<ins className="adsbygoogle"
     style={{display:'block'}}
     data-ad-client="ca-pub-9173866185064071"
     data-ad-slot="9558183636"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
     {/* GROUP 2: Image Tools */}
   <div className="grp">
    <div className="grp-hdr" style={{background:'#eef1ff',border:'1px solid #c5cbf5'}}>
      <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#c5cbf5'}}>&#x1F5BC;&#xFE0F;</div><div><div className="grp-title">Image Tools</div><div className="grp-sub">Compress, resize, crop, convert and enhance images</div></div></div>
      <a href="./image-tools/index.html" className="see-all">All image tools <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
    </div>
    <div className="tgrid4">
      <a href="./image-tools/background-remover.html" className="tc"><div className="tc-icon" style={{background:'#eef1ff'}}>&#x2702;&#xFE0F;</div><div className="tc-name">Background Remover</div><div className="tc-desc">Remove image backgrounds with AI — free PNG.</div><div className="tc-ft"><span className="t-built">Built</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./image-tools/qr-code-generator.html" className="tc"><div className="tc-icon" style={{background:'#eef1ff'}}>&#x1F4F2;</div><div className="tc-name">QR Code Generator</div><div className="tc-desc">Create custom QR codes for any URL or text.</div><div className="tc-ft"><span className="t-popular">Popular</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./image-tools/image-compressor.html" className="tc"><div className="tc-icon" style={{background:'#eef1ff'}}>&#x1F5DC;&#xFE0F;</div><div className="tc-name">Image Compressor</div><div className="tc-desc">Reduce image size without visible quality loss.</div><div className="tc-ft"><span className="t-soon">Coming Soon</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./image-tools/image-resizer.html" className="tc"><div className="tc-icon" style={{background:'#eef1ff'}}>&#x1F4CF;</div><div className="tc-name">Image Resizer</div><div className="tc-desc">Resize images to any dimension instantly.</div><div className="tc-ft"><span className="t-soon">Coming Soon</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./image-tools/image-converter.html" className="tc"><div className="tc-icon" style={{background:'#eef1ff'}}>&#x1F504;</div><div className="tc-name">Image Converter</div><div className="tc-desc">Convert JPG, PNG, WebP formats easily.</div><div className="tc-ft"><span className="t-soon">Coming Soon</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./image-tools/color-picker.html" className="tc"><div className="tc-icon" style={{background:'#eef1ff'}}>&#x1F3A8;</div><div className="tc-name">Color Picker</div><div className="tc-desc">Pick any color from an image — HEX, RGB, HSL.</div><div className="tc-ft"><span className="t-soon">Coming Soon</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./image-tools/favicon-generator.html" className="tc"><div className="tc-icon" style={{background:'#eef1ff'}}>&#x1F516;</div><div className="tc-name">Favicon Generator</div><div className="tc-desc">Create favicons from any image — 16/32/64px.</div><div className="tc-ft"><span className="t-soon">Coming Soon</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./image-tools/index.html" className="tc-more">+13 more image tools &rarr;</a>
    </div>
  </div>
      {/* GROUP 2: PDF Tools */}
    <div className="grp">
    <div className="grp-hdr" style={{background:'#fff7ed',border:'1px solid #fed7aa'}}>
      <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#fed7aa'}}>&#x1F4C4;</div><div><div className="grp-title">PDF Tools</div><div className="grp-sub">Merge, split, compress, convert and secure your PDFs</div></div></div>
      <a href="./pdf-tools/index.html" className="see-all">All PDF tools <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
    </div>
    <div className="tgrid4">
      <a href="./pdf-tools/merge-pdf.html" className="tc"><div className="tc-icon" style={{background:'#fff7ed'}}>&#x1F4CE;</div><div className="tc-name">Merge PDF</div><div className="tc-desc">Combine multiple PDFs into one document.</div><div className="tc-ft"><span className="t-popular">Popular</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./pdf-tools/split-pdf.html" className="tc"><div className="tc-icon" style={{background:'#fff7ed'}}>&#x2702;&#xFE0F;</div><div className="tc-name">Split PDF</div><div className="tc-desc">Split a PDF by page ranges or extract pages.</div><div className="tc-ft"><span className="t-soon">Coming Soon</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./pdf-tools/jpg-to-pdf.html" className="tc"><div className="tc-icon" style={{background:'#fff7ed'}}>&#x1F4F8;</div><div className="tc-name">JPG to PDF</div><div className="tc-desc">Convert images to a PDF document.</div><div className="tc-ft"><span className="t-soon">Coming Soon</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./pdf-tools/index.html" className="tc-more">+15 more PDF tools &rarr;</a>
    </div>
  </div>
    {/* GROUP 4: Developer Tools */}
  <div className="grp">
    <div className="grp-hdr" style={{background:'#ecfeff',border:'1px solid #a5f3fc'}}>
      <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#a5f3fc'}}>&#x1F4BB;</div><div><div className="grp-title">Developer Tools</div><div className="grp-sub">JSON, Base64, regex, hash generator, UUID and more</div></div></div>
      <a href="./dev-tools/index.html" className="see-all">All dev tools <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
    </div>
    <div className="tgrid4">
      <a href="./dev-tools/json-formatter.html" className="tc"><div className="tc-icon" style={{background:'#ecfeff'}}>&#x1F527;</div><div className="tc-name">JSON Formatter</div><div className="tc-desc">Beautify, minify and validate JSON instantly.</div><div className="tc-ft"><span className="t-popular">Popular</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./dev-tools/base64-encoder.html" className="tc"><div className="tc-icon" style={{background:'#ecfeff'}}>&#x1F510;</div><div className="tc-name">Base64 Encoder</div><div className="tc-desc">Encode and decode Base64 strings and files.</div><div className="tc-ft"><span className="t-popular">Popular</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./dev-tools/password-generator.html" className="tc"><div className="tc-icon" style={{background:'#ecfeff'}}>&#x1F511;</div><div className="tc-name">Password Generator</div><div className="tc-desc">Generate strong, secure random passwords.</div><div className="tc-ft"><span className="t-popular">Popular</span><span className="tc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></div></a>
      <a href="./dev-tools/index.html" className="tc-more">+23 more dev tools &rarr;</a>
    </div>
  </div>
    {/*  AD SLOT 3: MID-PAGE RECTANGLE between major groups
   300×250 rectangle ads earn more CPM than banners. Great between content. 
  <!-- AD SLOT 3: between major groups -->
<!-- Google AdSense Responsive Ad Unit */}
<ins className="adsbygoogle"
     style={{display:'block'}} 
     data-ad-client="ca-pub-9173866185064071"
     data-ad-slot="9558183636"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
   {/* GROUPS 5–10: compact 2-column layout  */}
  <div className="grp2">

    {/* Text Tools  */}
    <div className="grp">
      <div className="grp-hdr" style={{background:'#f5f3ff',border:'1px solid #ddd6fe'}}>
        <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#ddd6fe'}}>&#x1F4DD;</div><div><div className="grp-title">Text Tools</div><div className="grp-sub">Word count, case, diff, slug tools</div></div></div>
        <a href="./text-tools/index.html" className="see-all" style={{fontSize:'.75rem'}}>All <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      </div>
      <div className="mini-list">
        <a href="./text-tools/word-counter.html" className="mini-tc"><div className="mini-icon" style={{background:'#f5f3ff'}}>&#x1F4CA;</div><div className="mini-name">Word Counter</div><span className="t-soon">Soon</span></a>
        <a href="./text-tools/case-converter.html" className="mini-tc"><div className="mini-icon" style={{background:'#f5f3ff'}} >&#x1F524;</div><div className="mini-name">Case Converter</div><span className="t-soon">Soon</span></a>
        <a href="./text-tools/diff-checker.html" className="mini-tc"><div className="mini-icon" style={{background:'#f5f3ff'}} >&#x1F50D;</div><div className="mini-name">Text Diff Checker</div><span className="t-soon">Soon</span></a>
        <a href="./text-tools/lorem-ipsum.html" className="mini-tc"><div className="mini-icon" style={{background:'#f5f3ff'}} >&#x1F4AC;</div><div className="mini-name">Lorem Ipsum Generator</div><span className="t-soon">Soon</span></a>
        <a href="./text-tools/index.html" className="mini-tc" style={{color:'var(--accent)',fontSize:'.8rem',fontWeight:'600',justifyContent:'center'}}>+17 more text tools &rarr;</a>
      </div>
    </div>

        {/* Unit Converters  */}
    <div className="grp">
      <div className="grp-hdr" style={{background:'#fff7ed',border:'1px solid #fed7aa'}}>
        <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#fed7aa'}}>&#x1F504;</div><div><div className="grp-title">Unit Converters</div><div className="grp-sub">Length, weight, temp, data storage</div></div></div>
        <a href="./unit-converters/index.html" className="see-all" style={{fontSize:'.75rem'}}>All <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      </div>
      <div className="mini-list">
        <a href="./unit-converters/length.html" className="mini-tc"><div className="mini-icon" style={{background:'#fff7ed'}} >&#x1F4CF;</div><div className="mini-name">Length Converter</div><span className="t-soon">Soon</span></a>
        <a href="./unit-converters/temperature.html" className="mini-tc"><div className="mini-icon" style={{background:'#fff7ed'}} >&#x1F321;&#xFE0F;</div><div className="mini-name">Temperature Converter</div><span className="t-soon">Soon</span></a>
        <a href="./unit-converters/data-storage.html" className="mini-tc"><div className="mini-icon" style={{background:'#fff7ed'}} >&#x1F4BE;</div><div className="mini-name">Data Storage Converter</div><span className="t-soon">Soon</span></a>
        <a href="./unit-converters/weight.html" className="mini-tc"><div className="mini-icon" style={{background:'#fff7ed'}} >&#x2696;&#xFE0F;</div><div className="mini-name">Weight Converter</div><span className="t-soon">Soon</span></a>
        <a href="./unit-converters/index.html" className="mini-tc" style={{color:'var(--accent)',fontSize:'.8rem',fontWeight:'600',justifyContent:'center'}} >+10 more converters &rarr;</a>
      </div>
    </div>

    {/* Health & Fitness  */}
    <div className="grp">
      <div className="grp-hdr" style={{background:'#fef2f2',border:'1px solid #fecaca'}}>
        <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#fecaca'}} >&#x2764;&#xFE0F;</div><div><div className="grp-title">Health &amp; Fitness</div><div className="grp-sub">BMI, calorie, age, sleep calculators</div></div></div>
        <a href="./health-tools/index.html" className="see-all" style={{fontSize:'.75rem'}}>All <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      </div>
      <div className="mini-list">
        <a href="./health-tools/bmi-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#fef2f2'}} >&#x2696;&#xFE0F;</div><div className="mini-name">BMI Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./health-tools/calorie-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#fef2f2'}} >&#x1F355;</div><div className="mini-name">Calorie Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./health-tools/age-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#fef2f2'}} >&#x1F382;</div><div className="mini-name">Age Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./health-tools/sleep-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#fef2f2'}}>&#x1F4A4;</div><div className="mini-name">Sleep Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./health-tools/index.html" className="mini-tc" style={{color:'var(--accent)',fontSize:'.8rem',fontWeight:'600',justifyContent:'center'}} >+8 more health tools &rarr;</a>
      </div>
    </div>
    {/* Math & Science  */}
    <div className="grp">
      <div className="grp-hdr" style={{background:'#f8f9fc',border:'1px solid #d1d5db'}}>
        <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#d1d5db'}}>&#x1F4D0;</div><div><div className="grp-title">Math &amp; Science</div><div className="grp-sub">Percentage, fractions, stats, equations</div></div></div>
        <a href="./math-tools/index.html" className="see-all" style={{fontSize:'.75rem'}}>All <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      </div>
      <div className="mini-list">
        <a href="./math-tools/percentage-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#f8f9fc'}} >&#x25;</div><div className="mini-name">Percentage Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./math-tools/scientific-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#f8f9fc'}} >&#x1F9EE;</div><div className="mini-name">Scientific Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./math-tools/fraction-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#f8f9fc'}} >&#x2797;</div><div className="mini-name">Fraction Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./math-tools/standard-deviation.html" className="mini-tc"><div className="mini-icon" style={{background:'#f8f9fc'}} >&#x1F4CA;</div><div className="mini-name">Standard Deviation</div><span className="t-soon">Soon</span></a>
        <a href="./math-tools/index.html" className="mini-tc" style={{color:'var(--accent)',fontSize:'.8rem',fontWeight:'600',justifyContent:'center'}}>+12 more math tools &rarr;</a>
      </div>
    </div>
        {/* Security Tools  */}
    <div className="grp">
      <div className="grp-hdr" style={{background:'#f5f3ff',border:'1px solid #ddd6fe'}}>
        <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#ddd6fe'}}>&#x1F512;</div><div><div className="grp-title">Security Tools</div><div className="grp-sub">Hash, password, JWT, cipher tools</div></div></div>
        <a href="./security-tools/index.html" className="see-all" style={{fontSize:'.75rem'}}>All <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      </div>
      <div className="mini-list">
        <a href="./security-tools/password-strength.html" className="mini-tc"><div className="mini-icon" style={{background:'#f5f3ff'}}>&#x1F6E1;&#xFE0F;</div><div className="mini-name">Password Strength Checker</div><span className="t-soon">Soon</span></a>
        <a href="./security-tools/sha256.html" className="mini-tc"><div className="mini-icon" style={{background:'#f5f3ff'}} >&#x1F9F2;</div><div className="mini-name">SHA-256 Generator</div><span className="t-soon">Soon</span></a>
        <a href="./security-tools/jwt-decoder.html" className="mini-tc"><div className="mini-icon" style={{background:'#f5f3ff'}} >&#x1F511;</div><div className="mini-name">JWT Decoder</div><span className="t-soon">Soon</span></a>
        <a href="./security-tools/aes-encrypt.html" className="mini-tc"><div className="mini-icon" style={{background:'#f5f3ff'}}>&#x1F510;</div><div className="mini-name">AES Encryption</div><span className="t-soon">Soon</span></a>
        <a href="./security-tools/index.html" className="mini-tc" style={{color:'var(--accent)',fontSize:'.8rem',fontWeight:'600',justifyContent:'center'}}>+8 more security tools &rarr;</a>
      </div>
    </div>
        {/* Date & Time  */}
    <div className="grp">
      <div className="grp-hdr" style={{background:'#ecfdf5',border:'1px solid #a7f3d0'}}>
        <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#a7f3d0'}}>&#x1F4C5;</div><div><div className="grp-title">Date &amp; Time Tools</div><div className="grp-sub">Age, date diff, timezone converter</div></div></div>
        <a href="./date-tools/index.html" className="see-all" style={{fontSize:'.75rem'}}>All <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      </div>
      <div className="mini-list">
        <a href="./date-tools/age-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#ecfdf5'}} >&#x1F382;</div><div className="mini-name">Age Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./date-tools/date-difference.html" className="mini-tc"><div className="mini-icon" style={{background:'#ecfdf5'}} >&#x1F4C6;</div><div className="mini-name">Date Difference</div><span className="t-soon">Soon</span></a>
        <a href="./date-tools/timezone-converter.html" className="mini-tc"><div className="mini-icon" style={{background:'#ecfdf5'}} >&#x1F30D;</div><div className="mini-name">Timezone Converter</div><span className="t-soon">Soon</span></a>
        <a href="./date-tools/countdown-timer.html" className="mini-tc"><div className="mini-icon" style={{background:'#ecfdf5'}} >&#x23F3;</div><div className="mini-name">Countdown Timer</div><span className="t-soon">Soon</span></a>
        <a href="./date-tools/index.html" className="mini-tc" style={{color:'var(--accent)',fontSize:'.8rem',fontWeight:'600',justifyContent:'center'}}>+6 more date tools &rarr;</a>
      </div>
    </div>
  </div>{/* /grp2  */}
    {/*CTA */}
  <div className="cta-banner">
    <div className="cta-t">
      <h2>More Tools Added Every Week</h2>
      <p>We're building all 160+ tools category by category. Bookmark ToollyX and come back as we expand.</p>
    </div>
    <div className="cta-btns">
      <a href="./calculator-tools/index.html" className="btn btn-white">&#x1F9EE; Try Calculators</a>
      <a href="./image-tools/background-remover.html" className="btn btn-outline">Remove Background &rarr;</a>
    </div>
  </div>

  {/* ══ AD SLOT 4: ABOVE FOOTER ══
     This is a high-visibility position — users pause here before leaving.
     Best size: 728×90 Leaderboard or 970×90 Large Banner.
     Replace the div.ad-slot with your AdSense <ins> tag. 
<!-- Google AdSense Responsive Ad Unit --> */}
<ins className="adsbygoogle"
     style={{display:'block'}} 
     data-ad-client="ca-pub-9173866185064071"
     data-ad-slot="9558183636"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

</main>
</>
  )
}


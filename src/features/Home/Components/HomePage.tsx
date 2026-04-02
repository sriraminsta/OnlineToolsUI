 import '../Styles/shared.css'
 import '../Styles/homepage.css'

 export default function HomePage() {
  return (
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
     </main>
  )
}


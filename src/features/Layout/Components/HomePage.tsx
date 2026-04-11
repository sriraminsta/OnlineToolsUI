 import '../Styles/shared.css'
 import '../Styles/homepage.css'
 import SearchPage from  './SearchPage'
import CatToolCardComponent from '../../../Components/CatToolCardComponent'
import {FinToolCardComponent} from '../../FinancialTools/Components/FinToolCardComponent'; 
import { ImageToolCardComponent}  from '../../ImageTools/Components/ImageToolCardComponent';
import { PDFToolCardComponent } from '../../PDFTools/Components/PDFToolCardComponent';
import { DeveloperToolCardComponent } from '../../DeveloperTools/Components/DeveloperToolCardComponent';
import{TextToolsCardComponent} from '../../TextTools/Components/TextToolsCardComponent';
import { UnitToolsCardComponent } from '../../UnitConverterTools/Components/UnitToolsCardComponent'
import { HealthToolsCardComponent } from '../../HealthTools/Components/HealthToolsCardComponent';
import { MathToolsCardComponent } from '../../ScienceTools/Components/ScienceToolsCardComponent';
import { SecurityToolsCardComponent } from '../../SecurityTools/Components/SecurityToolsCardComponent';
import { DateTimeToolsCardComponent } from '../../TimeTools/Components/TimeToolsCardComponent';

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
   <CatToolCardComponent />
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
    <FinToolCardComponent/>
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
<ImageToolCardComponent/> 
    </div>
  </div>
      {/* GROUP 2: PDF Tools */}
    <div className="grp">
    <div className="grp-hdr" style={{background:'#fff7ed',border:'1px solid #fed7aa'}}>
      <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#fed7aa'}}>&#x1F4C4;</div><div><div className="grp-title">PDF Tools</div><div className="grp-sub">Merge, split, compress, convert and secure your PDFs</div></div></div>
      <a href="./pdf-tools/index.html" className="see-all">All PDF tools <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
    </div>
    <div className="tgrid4">
        <PDFToolCardComponent/>
    </div>
  </div>
    {/* GROUP 4: Developer Tools */}
  <div className="grp">
    <div className="grp-hdr" style={{background:'#ecfeff',border:'1px solid #a5f3fc'}}>
      <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#a5f3fc'}}>&#x1F4BB;</div><div><div className="grp-title">Developer Tools</div><div className="grp-sub">JSON, Base64, regex, hash generator, UUID and more</div></div></div>
      <a href="./dev-tools/index.html" className="see-all">All dev tools <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
    </div>
    <div className="tgrid4">
        <DeveloperToolCardComponent/>
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
        <TextToolsCardComponent/>
      </div>
    </div>

        {/* Unit Converters  */}
    <div className="grp">
      <div className="grp-hdr" style={{background:'#fff7ed',border:'1px solid #fed7aa'}}>
        <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#fed7aa'}}>&#x1F504;</div><div><div className="grp-title">Unit Converters</div><div className="grp-sub">Length, weight, temp, data storage</div></div></div>
        <a href="./unit-converters/index.html" className="see-all" style={{fontSize:'.75rem'}}>All <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      </div>
      <div className="mini-list">
        <UnitToolsCardComponent/>
{/*         <a href="./unit-converters/length.html" className="mini-tc"><div className="mini-icon" style={{background:'#fff7ed'}} >&#x1F4CF;</div><div className="mini-name">Length Converter</div><span className="t-soon">Soon</span></a>
        <a href="./unit-converters/temperature.html" className="mini-tc"><div className="mini-icon" style={{background:'#fff7ed'}} >&#x1F321;&#xFE0F;</div><div className="mini-name">Temperature Converter</div><span className="t-soon">Soon</span></a>
        <a href="./unit-converters/data-storage.html" className="mini-tc"><div className="mini-icon" style={{background:'#fff7ed'}} >&#x1F4BE;</div><div className="mini-name">Data Storage Converter</div><span className="t-soon">Soon</span></a>
        <a href="./unit-converters/weight.html" className="mini-tc"><div className="mini-icon" style={{background:'#fff7ed'}} >&#x2696;&#xFE0F;</div><div className="mini-name">Weight Converter</div><span className="t-soon">Soon</span></a>
        <a href="./unit-converters/index.html" className="mini-tc" style={{color:'var(--accent)',fontSize:'.8rem',fontWeight:'600',justifyContent:'center'}} >+10 more converters &rarr;</a> */}
      </div>
    </div>

    {/* Health & Fitness  */}
    <div className="grp">
      <div className="grp-hdr" style={{background:'#fef2f2',border:'1px solid #fecaca'}}>
        <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#fecaca'}} >&#x2764;&#xFE0F;</div><div><div className="grp-title">Health &amp; Fitness</div><div className="grp-sub">BMI, calorie, age, sleep calculators</div></div></div>
        <a href="./health-tools/index.html" className="see-all" style={{fontSize:'.75rem'}}>All <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      </div>
      <div className="mini-list">
        <HealthToolsCardComponent/>
{/*        <a href="./health-tools/bmi-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#fef2f2'}} >&#x2696;&#xFE0F;</div><div className="mini-name">BMI Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./health-tools/calorie-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#fef2f2'}} >&#x1F355;</div><div className="mini-name">Calorie Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./health-tools/age-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#fef2f2'}} >&#x1F382;</div><div className="mini-name">Age Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./health-tools/sleep-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#fef2f2'}}>&#x1F4A4;</div><div className="mini-name">Sleep Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./health-tools/index.html" className="mini-tc" style={{color:'var(--accent)',fontSize:'.8rem',fontWeight:'600',justifyContent:'center'}} >+8 more health tools &rarr;</a>*/}
      </div>
    </div>
    {/* Math & Science  */}
    <div className="grp">
      <div className="grp-hdr" style={{background:'#f8f9fc',border:'1px solid #d1d5db'}}>
        <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#d1d5db'}}>&#x1F4D0;</div><div><div className="grp-title">Math &amp; Science</div><div className="grp-sub">Percentage, fractions, stats, equations</div></div></div>
        <a href="./math-tools/index.html" className="see-all" style={{fontSize:'.75rem'}}>All <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      </div>
      <div className="mini-list">
        <MathToolsCardComponent/>
     {/*   <a href="./math-tools/percentage-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#f8f9fc'}} >&#x25;</div><div className="mini-name">Percentage Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./math-tools/scientific-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#f8f9fc'}} >&#x1F9EE;</div><div className="mini-name">Scientific Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./math-tools/fraction-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#f8f9fc'}} >&#x2797;</div><div className="mini-name">Fraction Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./math-tools/standard-deviation.html" className="mini-tc"><div className="mini-icon" style={{background:'#f8f9fc'}} >&#x1F4CA;</div><div className="mini-name">Standard Deviation</div><span className="t-soon">Soon</span></a>
        <a href="./math-tools/index.html" className="mini-tc" style={{color:'var(--accent)',fontSize:'.8rem',fontWeight:'600',justifyContent:'center'}}>+12 more math tools &rarr;</a>*/}
      </div>
    </div>
        {/* Security Tools  */}
    <div className="grp">
      <div className="grp-hdr" style={{background:'#f5f3ff',border:'1px solid #ddd6fe'}}>
        <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#ddd6fe'}}>&#x1F512;</div><div><div className="grp-title">Security Tools</div><div className="grp-sub">Hash, password, JWT, cipher tools</div></div></div>
        <a href="./security-tools/index.html" className="see-all" style={{fontSize:'.75rem'}}>All <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      </div>
      <div className="mini-list">
        <SecurityToolsCardComponent/>
    {/*    <a href="./security-tools/password-strength.html" className="mini-tc"><div className="mini-icon" style={{background:'#f5f3ff'}}>&#x1F6E1;&#xFE0F;</div><div className="mini-name">Password Strength Checker</div><span className="t-soon">Soon</span></a>
        <a href="./security-tools/sha256.html" className="mini-tc"><div className="mini-icon" style={{background:'#f5f3ff'}} >&#x1F9F2;</div><div className="mini-name">SHA-256 Generator</div><span className="t-soon">Soon</span></a>
        <a href="./security-tools/jwt-decoder.html" className="mini-tc"><div className="mini-icon" style={{background:'#f5f3ff'}} >&#x1F511;</div><div className="mini-name">JWT Decoder</div><span className="t-soon">Soon</span></a>
        <a href="./security-tools/aes-encrypt.html" className="mini-tc"><div className="mini-icon" style={{background:'#f5f3ff'}}>&#x1F510;</div><div className="mini-name">AES Encryption</div><span className="t-soon">Soon</span></a>
        <a href="./security-tools/index.html" className="mini-tc" style={{color:'var(--accent)',fontSize:'.8rem',fontWeight:'600',justifyContent:'center'}}>+8 more security tools &rarr;</a> */}
      </div>
    </div>
        {/* Date & Time  */}
    <div className="grp">
      <div className="grp-hdr" style={{background:'#ecfdf5',border:'1px solid #a7f3d0'}}>
        <div className="grp-hdr-l"><div className="grp-icon" style={{background:'#a7f3d0'}}>&#x1F4C5;</div><div><div className="grp-title">Date &amp; Time Tools</div><div className="grp-sub">Age, date diff, timezone converter</div></div></div>
        <a href="./date-tools/index.html" className="see-all" style={{fontSize:'.75rem'}}>All <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      </div>
      <div className="mini-list">
        <DateTimeToolsCardComponent/>
      {/*  <a href="./date-tools/age-calculator.html" className="mini-tc"><div className="mini-icon" style={{background:'#ecfdf5'}} >&#x1F382;</div><div className="mini-name">Age Calculator</div><span className="t-soon">Soon</span></a>
        <a href="./date-tools/date-difference.html" className="mini-tc"><div className="mini-icon" style={{background:'#ecfdf5'}} >&#x1F4C6;</div><div className="mini-name">Date Difference</div><span className="t-soon">Soon</span></a>
        <a href="./date-tools/timezone-converter.html" className="mini-tc"><div className="mini-icon" style={{background:'#ecfdf5'}} >&#x1F30D;</div><div className="mini-name">Timezone Converter</div><span className="t-soon">Soon</span></a>
        <a href="./date-tools/countdown-timer.html" className="mini-tc"><div className="mini-icon" style={{background:'#ecfdf5'}} >&#x23F3;</div><div className="mini-name">Countdown Timer</div><span className="t-soon">Soon</span></a>
        <a href="./date-tools/index.html" className="mini-tc" style={{color:'var(--accent)',fontSize:'.8rem',fontWeight:'600',justifyContent:'center'}}>+6 more date tools &rarr;</a>*/}
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


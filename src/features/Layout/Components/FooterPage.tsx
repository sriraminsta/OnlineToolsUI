import logo from '../../../assets/toollyx_logo.png'
 import '../Styles/shared.css'
 import '../Styles/homepage.css'

export default function FooterPage()
{
    return(
<footer>
  <div className="footer-inner">
    <div className="footer-top">
      <div className="footer-brand">
        {/*  Logo inverted for dark footer background */}
        <img src={logo} alt="ToollyX" className="footer-logo"
             />
        <span style={{display:'none', fontSize:'1.2rem',fontWeight:'800',color:'#fff',marginBottom:'12px', fontFamily: "'Bricolage Grotesque', sans-serif"}} >ToollyX</span>
        <p>Free online tools for students, professionals and developers. Fast, accurate and easy to use.</p>
      </div>
      <div className="footer-col"><h4>Calculator Tools</h4><ul>
        <li><a href="/financial-calculators/sip-calculator">SIP Calculator</a></li>
        <li><a href="/financial-calculators/fd-calculator">FD Calculator</a></li>
        <li><a href="/financial-calculators/emi-calculator">EMI Calculator</a></li>
        <li><a href="/financial-calculators/ppf-calculator">PPF Calculator</a></li>
        <li><a href="/financial-calculators/swp-calculator">SWP Calculator</a></li>
      </ul></div>
      <div className="footer-col"><h4>Popular Tools</h4><ul>
        <li><a href="/image-tools/background-remover">Background Remover</a></li>
        <li><a href="/image-tools/qr-code-generator">QR Code Generator</a></li>
        <li><a href="/dev-tools/json-formatter">JSON Formatter</a></li>
        <li><a href="/dev-tools/password-generator">Password Generator</a></li>
        <li><a href="/pdf-tools/merge-pdf">Merge PDF</a></li>
      </ul></div>
      <div className="footer-col"><h4>ToollyX</h4><ul>
        <li><a href="./index.html">Home</a></li>
        <li><a href="./about.html">About</a></li>
        <li><a href="./contact.html">Contact</a></li>
        <li><a href="./privacy.html">Privacy Policy</a></li>
      </ul></div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2025 <a href="./index.html">ToollyX</a> &middot; All tools are free to use.</p>
      <div className="footer-badges">
        <span className="footer-badge">&#x26A1; Fast &amp; Accurate</span>
        <span className="footer-badge">&#x1F4F1; Mobile Friendly</span>
        <span className="footer-badge">&#x1F6E0;&#xFE0F; 160+ Tools</span>
      </div>
    </div>
  </div>
</footer>
    )
}
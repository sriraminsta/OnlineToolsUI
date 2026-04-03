import { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuPage() {
  const [imgError, setImgError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          {!imgError && (
            <img
              src="/toollyx_logo.png"
              alt="ToollyX"
              className="nav-logo-img"
              onError={() => setImgError(true)}
            />
          )}
          {imgError && (
            <span className="nav-logo-text">
              Toollyx<em>X</em>
            </span>
          )}
        </Link>

        {/* Links */}
        <ul className="nav-links">
          <li>
            <Link to="/" className="active">
              Home
            </Link>
          </li>

          {/* All Tools */}
          <li>
            <Link to="#all-groups">
              All Tools
              <svg
                className="nav-chevron"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <polyline points="4 6 8 10 12 6" />
              </svg>
            </Link>

            <div className="mega-dropdown">
              <div className="mega-grid">
                <Link to="/calculator-tools" className="mega-item">
                  <div
                    className="mega-item-icon"
                    style={{ background: "#ecfdf5" }}
                  >
                    🧮
                  </div>
                  <div className="mega-item-name">Financial</div>
                  <div className="mega-item-count">22 tools</div>
                </Link>

                <Link to="/image-tools" className="mega-item">
                  <div
                    className="mega-item-icon"
                    style={{ background: "#eef1ff" }}
                  >
                    🖼️
                  </div>
                  <div className="mega-item-name">Image Tools</div>
                  <div className="mega-item-count">20 tools</div>
                </Link>
                <Link to="/pdf-tools" className="mega-item">
                  <div
                    className="mega-item-icon"
                    style={{ background: "#fff7ed" }}
                  >
                    &#x1F4C4;
                  </div>
                  <div className="mega-item-name">PDF Tools</div>
                  <div className="mega-item-count">18 tools</div>
                </Link>

                <Link to="/text-tools" className="mega-item">
                  <div
                    className="mega-item-icon"
                    style={{ background: "#f5f3ff" }}
                  >
                    &#x1F4DD;
                  </div>
                  <div className="mega-item-name">Text Tools</div>
                  <div className="mega-item-count">21 tools</div>
                </Link>
                <Link to="/dev-tools" className="mega-item">
                  <div
                    className="mega-item-icon"
                    style={{ background: "#ecfeff" }}
                  >
                    &#x1F4BB;
                  </div>
                  <div className="mega-item-name">Dev Tools</div>
                  <div className="mega-item-count">26 tools</div>
                </Link>

                <Link to="/unit-converters" className="mega-item">
                  <div
                    className="mega-item-icon"
                    style={{ background: "#fff7ed" }}
                  >
                    &#x1F504;
                  </div>
                  <div className="mega-item-name">Converters</div>
                  <div className="mega-item-count">14 tools</div>
                </Link>
                <Link to="/health-tools" className="mega-item">
                  <div
                    className="mega-item-icon"
                    style={{ background: "#fef2f2" }}
                  >
                    &#x2764;&#xFE0F;
                  </div>
                  <div className="mega-item-name">Health</div>
                  <div className="mega-item-count">12 tools</div>
                </Link>

                <Link to="/math-tools" className="mega-item">
                  <div
                    className="mega-item-icon"
                    style={{ background: "#f8f9fc" }}
                  >
                    &#x1F4D0;
                  </div>
                  <div className="mega-item-name">Math</div>
                  <div className="mega-item-count">16 tools</div>
                </Link>
                <Link to="/security-tools" className="mega-item">
                  <div
                    className="mega-item-icon"
                    style={{ background: "#f5f3ff" }}
                  >
                    &#x1F512;
                  </div>
                  <div className="mega-item-name">Security</div>
                  <div className="mega-item-count">12 tools</div>
                </Link>

                <Link to="/date-tools" className="mega-item">
                  <div
                    className="mega-item-icon"
                    style={{ background: "#ecfdf5" }}
                  >
                    &#x1F4C5;
                  </div>
                  <div className="mega-item-name">Date &amp; Time</div>
                  <div className="mega-item-count">10 tools</div>
                </Link>
                {/* Add rest similarly */}
              </div>
            </div>
          </li>
          {/* Contact */}
          <li>
            <Link
              to="/pdf-tools"
              className="nav-link"
            >  PDF Tools
              <svg
                className="nav-chevron"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="4 6 8 10 12 6" />
              </svg>
            </Link>

            <div className="simple-dropdown">
              <Link to="/pdf-tools/merge-pdf" className="drop-item">
                <span className="drop-item-icon">📎</span> Merge PDF
              </Link>

              <Link to="/pdf-tools/split-pdf" className="drop-item">
                <span className="drop-item-icon">✂️</span> Split PDF
              </Link>

              <Link to="/pdf-tools/jpg-to-pdf" className="drop-item">
                <span className="drop-item-icon">📸</span> JPG to PDF
              </Link>

              <Link
                to="/pdf-tools"
                className="drop-item"
                style={{
                  color: "var(--accent)",
                  fontWeight: 600,
                  borderTop: "1px solid var(--border)",
                  marginTop: "4px",
                  paddingTop: "10px",
                }}
              >
                All PDF Tools →
              </Link>
            </div>
          </li>

          <li>
      <Link to="/calculator-tools" className="nav-link">
        Calculators
        <svg
          className="nav-chevron"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 6 8 10 12 6" />
        </svg>
      </Link>

      <div className="simple-dropdown">
        <Link to="/calculator-tools/sip-calculator" className="drop-item">
          <span className="drop-item-icon">📈</span> SIP Calculator
        </Link>

        <Link to="/calculator-tools/fd-calculator" className="drop-item">
          <span className="drop-item-icon">🏦</span> FD Calculator
        </Link>

        <Link to="/calculator-tools/emi-calculator" className="drop-item">
          <span className="drop-item-icon">🏠</span> EMI Calculator
        </Link>

        <Link to="/calculator-tools/ppf-calculator" className="drop-item">
          <span className="drop-item-icon">🛡️</span> PPF Calculator
        </Link>

        <Link to="/calculator-tools/swp-calculator" className="drop-item">
          <span className="drop-item-icon">💸</span> SWP Calculator
        </Link>

        <Link
          to="/calculator-tools"
          className="drop-item"
          style={{
            color: "var(--accent)",
            fontWeight: 600,
            borderTop: "1px solid var(--border)",
            marginTop: "4px",
            paddingTop: "10px",
          }}
        >
          All Calculators →
        </Link>
      </div>
    </li>

        <li>
      <Link to="/image-tools" className="nav-link">
        Image Tools
        <svg
          className="nav-chevron"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 6 8 10 12 6" />
        </svg>
      </Link>

      <div className="simple-dropdown">
        <Link to="/image-tools/background-remover" className="drop-item">
          <span className="drop-item-icon">✂️</span> Background Remover
        </Link>

        <Link to="/image-tools/qr-code-generator" className="drop-item">
          <span className="drop-item-icon">📲</span> QR Code Generator
        </Link>

        <Link to="/image-tools/image-compressor" className="drop-item">
          <span className="drop-item-icon">🗜️</span> Image Compressor
        </Link>

        <Link to="/image-tools/image-resizer" className="drop-item">
          <span className="drop-item-icon">📏</span> Image Resizer
        </Link>

        <Link
          to="/image-tools"
          className="drop-item"
          style={{
            color: "var(--accent)",
            fontWeight: 600,
            borderTop: "1px solid var(--border)",
            marginTop: "4px",
            paddingTop: "10px",
          }}
        >
          All Image Tools →
        </Link>
      </div>
    </li>
    <li>
      <Link to="/dev-tools" className="nav-link">
        Dev Tools
        <svg
          className="nav-chevron"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 6 8 10 12 6" />
        </svg>
      </Link>

      <div className="simple-dropdown">
        <Link to="/dev-tools/json-formatter" className="drop-item">
          <span className="drop-item-icon">🔧</span> JSON Formatter
        </Link>

        <Link to="/dev-tools/base64-encoder" className="drop-item">
          <span className="drop-item-icon">🔐</span> Base64 Encoder
        </Link>

        <Link to="/dev-tools/password-generator" className="drop-item">
          <span className="drop-item-icon">🔑</span> Password Generator
        </Link>

        <Link
          to="/dev-tools"
          className="drop-item"
          style={{
            color: "var(--accent)",
            fontWeight: 600,
            borderTop: "1px solid var(--border)",
            marginTop: "4px",
            paddingTop: "10px",
          }}
        >
          All Dev Tools →
        </Link>
      </div>
    </li>
          {/* "More" Dropdown */}
      <li>
        <Link to="#" className="nav-link">
          More
          <svg
            className="nav-chevron"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 6 8 10 12 6" />
          </svg>
        </Link>

        <div className="simple-dropdown">
          <Link to="/text-tools" className="drop-item">
            <span className="drop-item-icon">📝</span> Text Tools
          </Link>

          <Link to="/unit-converters" className="drop-item">
            <span className="drop-item-icon">🔄</span> Unit Converters
          </Link>

          <Link to="/health-tools" className="drop-item">
            <span className="drop-item-icon">❤️</span> Health & Fitness
          </Link>

          <Link to="/math-tools" className="drop-item">
            <span className="drop-item-icon">📐</span> Math & Science
          </Link>

          <Link to="/security-tools" className="drop-item">
            <span className="drop-item-icon">🔒</span> Security Tools
          </Link>

          <Link to="/date-tools" className="drop-item">
            <span className="drop-item-icon">📅</span> Date & Time
          </Link>
        </div>
      </li>

      {/* Single Links */}
      <li>
        <Link to="/contact">Contact</Link>
      </li>

      <li>
        <Link to="#all-groups" className="nav-cta">
          Explore →
        </Link>
      </li>
        </ul>

        {/* Hamburger */}
        <button
          className="hamburger"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
 <div className="mobile-menu" id="mobile-menu">
      {/* Home */}
      <div className="mob-section">
        <Link to="/">&#x1F3E0; Home</Link>
      </div>
      <div className="mob-divider"></div>

      {/* Calculators */}
      <div className="mob-section">
        <div className="mob-section-title">Calculators</div>
        <Link to="/calculator-tools/sip-calculator">&#x1F4C8; SIP Calculator</Link>
        <Link to="/calculator-tools/fd-calculator">&#x1F3E6; FD Calculator</Link>
        <Link to="/calculator-tools/emi-calculator">&#x1F3E0; EMI Calculator</Link>
        <Link to="/calculator-tools/ppf-calculator">&#x1F6E1;&#xFE0F; PPF Calculator</Link>
        <Link
          to="/calculator-tools"
          style={{ color: "var(--accent)", fontWeight: 600 }}
        >
          All Calculators &rarr;
        </Link>
      </div>
      <div className="mob-divider"></div>

      {/* Image & PDF */}
      <div className="mob-section">
        <div className="mob-section-title">Image & PDF</div>
        <Link to="/image-tools/background-remover">&#x2702;&#xFE0F; Background Remover</Link>
        <Link to="/image-tools/qr-code-generator">&#x1F4F2; QR Code Generator</Link>
        <Link to="/pdf-tools/merge-pdf">&#x1F4CE; Merge PDF</Link>
        <Link
          to="/image-tools"
          style={{ color: "var(--accent)", fontWeight: 600 }}
        >
          All Image Tools &rarr;
        </Link>
        <Link
          to="/pdf-tools"
          style={{ color: "var(--accent)", fontWeight: 600 }}
        >
          All PDF Tools &rarr;
        </Link>
      </div>
      <div className="mob-divider"></div>

      {/* Developers & Text */}
      <div className="mob-section">
        <div className="mob-section-title">Developers & Text</div>
        <Link to="/dev-tools/json-formatter">&#x1F527; JSON Formatter</Link>
        <Link to="/dev-tools/password-generator">&#x1F511; Password Generator</Link>
        <Link to="/text-tools/word-counter">&#x1F4CA; Word Counter</Link>
        <Link
          to="/dev-tools"
          style={{ color: "var(--accent)", fontWeight: 600 }}
        >
          All Dev Tools &rarr;
        </Link>
      </div>
      <div className="mob-divider"></div>

      {/* More Categories */}
      <div className="mob-section">
        <div className="mob-section-title">More Categories</div>
        <Link to="/health-tools">&#x2764;&#xFE0F; Health & Fitness</Link>
        <Link to="/unit-converters">&#x1F504; Unit Converters</Link>
        <Link to="/math-tools">&#x1F4D0; Math & Science</Link>
        <Link to="/security-tools">&#x1F512; Security Tools</Link>
        <Link to="/date-tools">&#x1F4C5; Date & Time</Link>
      </div>
      <div className="mob-divider"></div>

      {/* Contact */}
      <Link to="/contact">&#x1F4E7; Contact</Link>
    </div>
      )}
    </nav>
  );
}
import { FinancialToolsList } from "../../../Constants/FinancialToolsList";
import { SubCategoriesList } from "../../../Constants/SubCategoriesList";
import { Link } from "react-router-dom";
import SearchPage from "../../Layout/Components/SearchPage";
import { Fragment } from "react"; 
import FAQSection from "../../../Components/FAQSection";
import { faqData } from "../Data/FAQ";

import '../Styles/FinToolsHomePage.css'
import '../../Layout/Styles/homepage.css'
import '../../Layout/Styles/shared.css'

export default function FinToolsListHomeComponent() {

  const financialSubcategories = SubCategoriesList.filter(sub => sub.category == 'financial');
  console.log(financialSubcategories)

  return (
    <>
      <div className="cat-hero">
        <div className="cat-hero-inner">
          <div className="cat-hero-badge">
            💰 Investment & Loan Calculators
          </div>

          <h1>Financial Calculators</h1>

          <p className="cat-hero-sub">
            Plan investments, calculate EMIs, track savings and grow your wealth — all with free, instant calculators. No sign-up required.
          </p>

          {/* Search bar */}
          <SearchPage />

          {/* Stats strip */}
          <div className="cat-stats">
            <div className="cat-stat">
              <div
                className="cat-stat-dot"
                style={{ background: "#059669" }}
              />
              16 tools in this category
            </div>

            <div className="cat-stat">
              <div
                className="cat-stat-dot"
                style={{ background: "var(--green)" }}
              />
              5 live now
            </div>

            <div className="cat-stat">
              <div
                className="cat-stat-dot"
                style={{ background: "var(--orange)" }}
              />
              11 coming soon
            </div>
          </div>
        </div>
      </div>

<div className="ad-wrap" style={{paddingTop:'28px'}}>
  <div className="ad-slot-placeholder">
    <span className="ad-label">Advertisement</span>
    <span>Ad · Leaderboard 728×90</span>
  </div>
</div>
<div className="tools-section">
      {financialSubcategories.map((subcat) => (
          <Fragment key= {subcat.id}>
         <div className="tools-section-title"
          style={{ "--sec-color": "#059669" } as React.CSSProperties}>
          {subcat.icon}  {subcat.label} 
        </div >
      <div className="tools-cards">
        {FinancialToolsList.filter((tool) => tool.subCategory == subcat.label ).map((item) => (
          <Link to={item.url} className="tool-big-card coming-soon" key={item.id}>
            <div className="tbc-icon" style={{ background: '#ecfdf5' }} dangerouslySetInnerHTML={{ __html: item.icon }}></div>
            <div className="tbc-name">{item.name}</div>
            <div className="tbc-desc">{item.description}</div>
            <div className="tbc-tags">
              {item.toolTags?.map((tag,index) => (
                <span className="tbc-tag" key ={index}>{tag}</span>
              ))}
            </div>
            <div className="tbc-link">Open tool <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></div>
          </Link>
        ))
        }
      </div> 
        <div className="ad-wrap"><div className="ad-slot-placeholder">
          <span className="ad-label">Advertisement</span><span>Ad • 728×90</span></div></div> 
      </Fragment>
      ))}
      </div>     
             <FAQSection faqData={faqData}/>
    </>
  );
}

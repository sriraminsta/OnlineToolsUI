import { useState } from "react";
import type FAQItem from  "../types/FAQItem";

interface FAQSectionProps {
  faqData: FAQItem[];
}


export default function FAQSection( { faqData }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
setOpenIndex((prev) => (prev === index ? null : index));  
  };

  return (
    <> 
      {/* FAQ */}
      <div className="cat-faq">
        <h2 className="faq-title">Frequently Asked Questions</h2>

        <div className="faq-list">
          {faqData.map((item) => (
            <div className="faq-item" key={item.id}>
              <button
                className="faq-q"
                onClick={() => toggleFAQ(item.id)}
              >
                {item.question}
                <svg
                  className="faq-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openIndex === item.id && (
                <div className="faq-a"  dangerouslySetInnerHTML={{ __html: item.answer }}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer">
        <p>
          <strong>Disclaimer:</strong> All tools on ToollyX are provided for
          informational and convenience purposes only. Results should be
          verified independently before use in professional, financial,
          legal or medical decisions. ToollyX is not responsible for any
          errors or omissions.
        </p>
      </div>
    </>
  );
};


import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  id:number;
}

const faqData: FAQItem[] = [
  {
    id:1,
    question: "Are all financial calculators free to use?",
    answer:
      "Yes — every tool on ToollyX is 100% free. There is no sign-up, no account, no subscription and no hidden paywall. All tools in this category run directly in your browser and will remain free.",
  },
  {
        id:2,
    question: "Do these tools work offline or without internet?",
    answer:
      "Most tools in this category are pure JavaScript and run entirely in your browser after the page loads. Once the page is cached, many tools will continue to work with limited or no internet connection.",
  },
  {
        id:3,
    question: "Is my data safe? Is anything uploaded to a server?",
    answer:
      "For the vast majority of tools here, all processing happens locally inside your browser — nothing is sent to any server. Any exceptions are clearly labelled.",
  },
  {
        id:4,
    question: "Can I use ToollyX on my phone or tablet?",
    answer:
      "Absolutely. Every page on ToollyX is fully responsive and optimised for mobile, tablet and desktop.",
  },
  {
        id:5,
    question: "How do I search for a specific tool?",
    answer: (
      <>
        Click the search bar at the top of this page (or press{" "}
        <strong>⌘K</strong> / <strong>Ctrl+K</strong>) to open the global
        search.
      </>
    ),
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
                <div className="faq-a">{item.answer}</div>
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


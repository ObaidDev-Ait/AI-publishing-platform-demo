"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "How does the AI Article Generator work?",
    answer: "Our AI uses advanced large language models optimized specifically for SEO and readability. You provide a title and keywords, and the AI generates a complete, structured article with headings, FAQs, and a high predicted SEO score.",
  },
  {
    question: "How much can I earn from publishing?",
    answer: "Earnings depend on traffic, engagement, and the specific monetization strategies implemented on your connected sites. Top publishers earn upwards of $10,000/month by consistently posting high-quality, AI-assisted content.",
  },
  {
    question: "Can I connect my existing WordPress site?",
    answer: "Yes! Our platform integrates seamlessly with WordPress. You can connect your site via the Admin dashboard using an API key, allowing you to publish AI-generated articles directly to your blog with one click.",
  },
  {
    question: "Is the generated content detected as AI by search engines?",
    answer: "Our generation models are fine-tuned to produce highly natural, human-like text that prioritizes value and readability. While we cannot guarantee zero detection, our content consistently ranks well on major search engines when paired with good SEO practices.",
  },
  {
    question: "What is the payout schedule?",
    answer: "Payouts are processed automatically at the end of each month for the previous month's finalized earnings, provided you meet the minimum payout threshold of $50.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32 relative bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet/20 bg-violet/5 text-xs font-medium text-violet mb-4">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about the platform and how it works.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-xl bg-card overflow-hidden transition-colors ${
                  isOpen ? "border-violet/30 shadow-sm" : "border-border/50 hover:border-border"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full px-6 py-5 text-left focus:outline-none"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-violet" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

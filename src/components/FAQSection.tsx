import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SchemaMarkup } from './SchemaMarkup';
import { HelpCircle } from 'lucide-react';

export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

const mortgageFAQs: FAQ[] = [
  {
    question: "What's the difference between a mortgage broker and a bank?",
    answer: "A mortgage broker like myself works with multiple lenders (30+ in my case) to find you the best rate and terms. Banks can only offer their own products. I work for YOU, not the lender, ensuring you get unbiased advice and the best deal possible.",
    category: "Basics"
  },
  {
    question: "How much down payment do I need in Ontario?",
    answer: "In Ontario, you need minimum 5% down for homes under $500,000. For homes $500,000-$999,999, it's 5% on the first $500,000 and 10% on the remainder. Homes $1 million+ require 20% down. I can help you explore down payment assistance programs too!",
    category: "First-Time Buyers"
  },
  {
    question: "What credit score do I need for a mortgage?",
    answer: "Most lenders prefer a credit score of 680+, but I work with lenders who accept scores as low as 600. Don't let your credit score discourage you - I've helped many clients with less-than-perfect credit secure mortgages. Let's discuss your options!",
    category: "Qualification"
  },
  {
    question: "Should I choose fixed or variable rate?",
    answer: "It depends on your risk tolerance and financial goals. Fixed rates offer stability and predictable payments. Variable rates typically start lower but can fluctuate. Currently, about 60% of my clients choose fixed rates for peace of mind. I'll help you decide what's best for YOUR situation.",
    category: "Rates"
  },
  {
    question: "How much mortgage can I afford?",
    answer: "Generally, lenders use the 'stress test' rate (currently 5.25% or your rate + 2%, whichever is higher) to qualify you. Your total housing costs shouldn't exceed 32% of gross income (GDS), and total debt payments shouldn't exceed 44% (TDS). I'll calculate your exact affordability during our consultation.",
    category: "Affordability"
  },
  {
    question: "What documents do I need for a mortgage application?",
    answer: "Typically: proof of income (pay stubs, T4s, NOAs), down payment verification, ID, and employment letter. Self-employed? You'll need 2 years of tax returns and financial statements. I'll provide you with a complete checklist tailored to your situation.",
    category: "Application"
  },
  {
    question: "How long does mortgage approval take?",
    answer: "Pre-approval takes 24-48 hours. Full approval after an accepted offer typically takes 5-7 business days. I work closely with lenders to expedite the process and keep you informed every step of the way.",
    category: "Timeline"
  },
  {
    question: "What are the current mortgage rates in Ontario?",
    answer: "Rates change daily and vary by lender, term, and your qualification. As of today, 5-year fixed rates range from 4.79% to 5.49%, and variable rates from Prime - 0.85% to Prime + 0.5%. Contact me for today's best rates based on YOUR profile.",
    category: "Rates"
  },
  {
    question: "Can I get a mortgage if I'm self-employed?",
    answer: "Absolutely! I specialize in helping self-employed individuals. We'll need 2 years of tax returns and may use stated income programs if your declared income doesn't reflect your true earning capacity. I work with lenders who understand entrepreneurial income.",
    category: "Self-Employed"
  },
  {
    question: "What is mortgage default insurance (CMHC)?",
    answer: "If your down payment is less than 20%, you'll need mortgage default insurance from CMHC, Sagen, or Canada Guaranty. The premium ranges from 2.8% to 4% of your mortgage amount and can be added to your mortgage. This actually helps you qualify for better rates!",
    category: "Insurance"
  }
];

interface FAQSectionProps {
  faqs?: FAQ[];
  title?: string;
  subtitle?: string;
  showCategories?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs = mortgageFAQs,
  title = "Frequently Asked Questions",
  subtitle = "Making mortgages make sense, one question at a time",
  showCategories = false
}) => {
  const categories = showCategories 
    ? [...new Set(faqs.map(faq => faq.category).filter(Boolean))]
    : [];

  const getFAQsByCategory = (category?: string) => {
    return category 
      ? faqs.filter(faq => faq.category === category)
      : faqs;
  };

  return (
    <>
      <SchemaMarkup type="FAQPage" data={{ faqs }} />
      
      <section className="py-16 px-4 bg-gradient-to-b from-white to-light-azure/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <HelpCircle className="w-12 h-12 text-muted-red" />
            </div>
            <h2 className="font-abril text-4xl md:text-5xl text-pure-black mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          </div>

          {showCategories && categories.length > 0 ? (
            <div className="space-y-8">
              {categories.map(category => (
                <div key={category}>
                  <h3 className="font-hammersmith text-2xl text-hunter-green mb-4">
                    {category}
                  </h3>
                  <Accordion type="single" collapsible className="space-y-4">
                    {getFAQsByCategory(category).map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category}-item-${index}`}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <AccordionTrigger className="px-6 py-4 text-left hover:bg-light-azure/10 transition-colors">
                          <span className="font-opensauce text-lg text-pure-black pr-4">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 py-4 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:bg-light-azure/10 transition-colors">
                    <span className="font-opensauce text-lg text-pure-black pr-4">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Still have questions? I'm here to help!
            </p>
            <a
              href="https://calendly.com/mortgagewithford"
              className="inline-flex items-center justify-center px-6 py-3 bg-muted-red hover:bg-brand-red text-white font-semibold rounded-lg transition-colors"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
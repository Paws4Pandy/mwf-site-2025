import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: "item-1",
    question: "What is the current Bank of Canada interest rate and how does it affect Ontario mortgage rates?",
    answer: "The Bank of Canada's policy interest rate, now at 2.75%, sets the foundation for mortgage rates across Canada. Changes directly impact variable-rate mortgages in Ontario and influence fixed mortgage rates via bond yields, affecting your monthly payments and qualifying limits."
  },
  {
    id: "item-2", 
    question: "Will Canadian mortgage rates decrease in 2025?",
    answer: "Most mortgage experts expect interest rates in Canada to decrease gradually by the end of 2025 as inflation stabilizes. However, Ontario homeowners renewing mortgages may still see higher rates than those from earlier, ultra-low cycles."
  },
  {
    id: "item-3",
    question: "How does CMHC (Canada Mortgage and Housing Corporation) influence my mortgage or interest rate?",
    answer: "While CMHC doesn't set rates, CMHC-insured mortgages may offer slightly lower interest rates and more options for homebuyers who qualify for mortgage default insurance, as they reduce lender risk."
  },
  {
    id: "item-4",
    question: "What factors influence mortgage rate changes in Canada and Ontario?",
    answer: "Key drivers include the Bank of Canada overnight rate, inflation trends, Canadian and Ontario economic growth, unemployment levels, and CMHC guidelines. Lenders may also adjust rates due to global markets or risk appetite."
  },
  {
    id: "item-5",
    question: "How can I get the best Ontario mortgage rate in 2025?",
    answer: "Compare rates from multiple mortgage brokers, use an online mortgage rate comparison tool, and check \"mortgage broker near me.\" A local, licensed mortgage agent can match you with lenders offering the lowest rates given your credit, down payment, and income."
  },
  {
    id: "item-6",
    question: "Should I choose a fixed or variable-rate mortgage in 2025?",
    answer: "A fixed rate offers predictability, while a variable rate could save you money if the Bank of Canada reduces rates further. Use a mortgage calculator and discuss your risk tolerance and goals with a mortgage professional to find the best product in today's market."
  },
  {
    id: "item-7",
    question: "How much will my mortgage payments increase if I renew at higher rates?",
    answer: "With 85% of mortgages set to renew at higher rates in 2025, use a \"mortgage renewal calculator\" and consult your agent. Your payments could rise by 1–2.25% if you locked in when rates were at historic lows, especially across Ontario."
  },
  {
    id: "item-8",
    question: "When are the Bank of Canada interest rate announcements in 2025?",
    answer: "Scheduled dates for 2025 include September 17, October 29, and December 10—crucial moments that often prompt rate changes for Toronto, Ottawa, and all Ontario mortgage holders."
  },
  {
    id: "item-9",
    question: "Can I lock in my Ontario mortgage rate today?",
    answer: "Yes, many lenders provide a mortgage rate hold or guarantee for 90-120 days, letting you shop with confidence and protection against rising rates. Ask your broker about the best rate lock policy."
  },
  {
    id: "item-10",
    question: "Where can I find the latest mortgage rates and market updates for Ontario?",
    answer: "Check the Bank of Canada website and CMHC market reports for real-time rates, or contact a local mortgage agent for personalized, up-to-date advice tailored to your property and situation."
  }
];

const MortgageFAQ = () => {
  return (
    <div className="w-full">
      {/* FAQ Header */}
      <div className="text-center mb-12">
        <h2 className="font-anton text-4xl md:text-5xl lg:text-6xl text-[#ED8071] leading-[0.85] mb-4">
          Mortgage Interest Rate
          <br />
          <span className="text-white">FAQs for Ontario & Canada</span>
        </h2>
      </div>

      {/* FAQ Accordion */}
      <div className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 blur-xl" />
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="border-b border-white/20 last:border-b-0"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6 px-4 hover:bg-white/5 rounded-lg transition-all duration-200">
                  <span className="text-white font-hammersmith text-lg md:text-xl leading-relaxed pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6">
                  <div className="text-white/90 font-opensauce text-base md:text-lg leading-relaxed">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default MortgageFAQ;
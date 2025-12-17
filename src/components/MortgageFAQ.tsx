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
    question: "What is the Bank of Canada interest rate and how does it affect Ontario mortgage rates?",
    answer: "The Bank of Canada's policy interest rate (also called the overnight lending rate) sets the foundation for mortgage rates across Canada. Changes to this rate directly impact variable-rate mortgages in Ontario and influence fixed mortgage rates via bond yields, affecting your monthly payments and qualifying limits. The Bank of Canada reviews and adjusts this rate regularly based on economic conditions."
  },
  {
    id: "item-2", 
    question: "Will Canadian mortgage rates decrease?",
    answer: "Mortgage rates fluctuate based on economic conditions, inflation trends, and Bank of Canada policy decisions. Most mortgage experts monitor these factors to predict rate movements, but rates can change based on various economic indicators. Ontario homeowners should stay informed about current market conditions when planning their mortgage strategy."
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
    question: "How can I get the best Ontario mortgage rate?",
    answer: "Compare rates from multiple mortgage brokers, use an online mortgage rate comparison tool, and check \"mortgage broker near me.\" A local, licensed mortgage agent can match you with lenders offering competitive rates given your credit, down payment, and income."
  },
  {
    id: "item-6",
    question: "Should I choose a fixed or variable-rate mortgage?",
    answer: "A fixed rate offers predictability and stable payments, while a variable rate may fluctuate with market conditions. Use a mortgage calculator and discuss your risk tolerance and goals with a mortgage professional to find the best product for your situation."
  },
  {
    id: "item-7",
    question: "How much will my mortgage payments change if I renew at different rates?",
    answer: "Mortgage payments can change significantly when renewing, depending on current market rates compared to your original rate. Use a \"mortgage renewal calculator\" and consult your agent to understand how rate changes might affect your payments, especially across Ontario markets."
  },
  {
    id: "item-8",
    question: "When does the Bank of Canada announce interest rate changes?",
    answer: "The Bank of Canada makes interest rate announcements on scheduled dates throughout the year. These announcements are crucial moments that often prompt rate changes for Toronto, Ottawa, and all Ontario mortgage holders. Check the Bank of Canada website for the current schedule of announcement dates."
  },
  {
    id: "item-9",
    question: "Can I lock in my Ontario mortgage rate?",
    answer: "Yes, many lenders provide a mortgage rate hold or guarantee for 90-120 days, letting you shop with confidence and protection against rising rates. Ask your broker about the best rate lock policy available."
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
                  <span className="text-white font-roboto-flex font-bold text-lg md:text-xl leading-relaxed pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6">
                  <div className="text-white/90 font-roboto-flex text-base md:text-lg leading-relaxed">
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
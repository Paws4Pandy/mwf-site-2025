import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import PageBackground from '@/components/PageBackground';
import Header from '@/components/Header';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Getting Started',
    question: 'What documents do I need for a mortgage application?',
    answer: 'You\'ll typically need: proof of income (pay stubs, T4s, NOAs), employment letter, bank statements, ID, proof of down payment, and information about any debts or assets. Self-employed individuals may need additional documentation like business financials.'
  },
  {
    category: 'Getting Started',
    question: 'How much can I afford to borrow?',
    answer: 'Your borrowing capacity depends on your income, debts, credit score, and down payment. Generally, your total housing costs shouldn\'t exceed 32% of your gross income (GDS ratio), and total debt payments shouldn\'t exceed 44% (TDS ratio).'
  },
  {
    category: 'Getting Started',
    question: 'What\'s the minimum down payment required?',
    answer: 'In Canada, the minimum down payment is 5% for homes under $500,000. For homes between $500,000-$999,999, it\'s 5% on the first $500,000 and 10% on the remainder. Homes over $1 million require 20% down.'
  },
  {
    category: 'Mortgage Types',
    question: 'Fixed vs Variable rate - which is better?',
    answer: 'Fixed rates offer stability and predictable payments, ideal if you prefer certainty or expect rates to rise. Variable rates typically start lower and can save money if rates remain stable or decline, but payments may fluctuate with market conditions.'
  },
  {
    category: 'Mortgage Types',
    question: 'What is mortgage default insurance?',
    answer: 'Also known as CMHC insurance, it\'s required when your down payment is less than 20%. It protects the lender if you default on your mortgage. The premium ranges from 0.6% to 4.5% of your mortgage amount.'
  },
  {
    category: 'Process & Timeline',
    question: 'How long does the mortgage approval process take?',
    answer: 'Pre-approval typically takes 24-48 hours. Full approval after an accepted offer usually takes 5-10 business days, depending on documentation completeness and property requirements.'
  },
  {
    category: 'Process & Timeline',
    question: 'What\'s the difference between pre-qualification and pre-approval?',
    answer: 'Pre-qualification is an estimate based on self-reported information. Pre-approval involves credit checks and document verification, providing a conditional commitment from a lender for a specific amount.'
  },
  {
    category: 'Credit & Qualification',
    question: 'What credit score do I need for a mortgage?',
    answer: 'Most lenders prefer a credit score of 680 or higher for the best rates. Scores between 600-679 may still qualify but with higher rates or stricter conditions. Below 600 may require alternative lenders.'
  },
  {
    category: 'Credit & Qualification',
    question: 'Can I get a mortgage if I\'m self-employed?',
    answer: 'Yes! Self-employed individuals can qualify for mortgages. You\'ll typically need 2 years of business financials, NOAs, and may need a larger down payment. Some lenders offer stated income programs for established businesses.'
  },
  {
    category: 'Costs & Fees',
    question: 'What are closing costs?',
    answer: 'Closing costs typically range from 1.5-4% of the purchase price and include: land transfer tax, legal fees, title insurance, home inspection, appraisal fees, and adjustments for property taxes or utilities.'
  },
  {
    category: 'Costs & Fees',
    question: 'Do I pay fees for using a mortgage broker?',
    answer: 'For most residential mortgages, brokers are paid by the lender, so there\'s no direct cost to you. Some specialized mortgages or private lending may involve broker fees, which would be disclosed upfront.'
  },
  {
    category: 'Renewals & Refinancing',
    question: 'When should I start shopping for renewal rates?',
    answer: 'Start 4-6 months before your renewal date. This gives you time to compare options and potentially switch lenders if you find better terms. Most lenders allow you to lock in a rate 120 days before renewal.'
  }
];

const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageBackground>
      <div className="min-h-screen">
        <Header />
        
        {/* Hero Section */}
        <div className="pt-32 pb-12 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="font-anton text-5xl md:text-7xl text-pure-white mb-4">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="font-opensauce text-lg text-light-azure/80">
              Find answers to common mortgage questions
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="container mx-auto max-w-4xl px-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-light-azure/60" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-pure-white/5 backdrop-blur-md border border-light-azure/20 rounded-full text-pure-white placeholder-light-azure/40 focus:outline-none focus:border-light-azure/40 transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="container mx-auto max-w-4xl px-4 mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-hammersmith text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-muted-red text-pure-white'
                    : 'bg-pure-white/5 backdrop-blur-md text-light-azure hover:bg-pure-white/10 border border-light-azure/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="container mx-auto max-w-4xl px-4 pb-20">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-gradient-to-br from-pure-white/10 via-pure-white/5 to-transparent border border-light-azure/20 rounded-2xl overflow-hidden hover:border-light-azure/30 transition-all"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-pure-white/5 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-light-azure/60 text-xs font-hammersmith uppercase tracking-wider">
                      {faq.category}
                    </span>
                    <h3 className="text-pure-white font-hammersmith text-lg mt-1">
                      {faq.question}
                    </h3>
                  </div>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-light-azure flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-light-azure flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-light-azure/10 pt-4">
                      <p className="text-light-azure/80 font-opensauce leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-light-azure/60 font-opensauce">
                No questions found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageBackground>
  );
}
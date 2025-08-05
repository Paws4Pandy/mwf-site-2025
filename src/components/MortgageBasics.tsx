import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
const MortgageBasics = () => {
  const [activeSection, setActiveSection] = useState<string | null>("terms");
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId === activeSection ? null : sectionId);
  };
  return <div className="bg-pure-white bg-opacity-70 backdrop-blur-sm border border-hunter-green/30 rounded-lg p-8 mb-10 shadow-sm">
      <h2 className="text-2xl font-hammersmith mb-6 text-hunter-green">Mortgage Basics 101</h2>
      
      <Accordion type="single" collapsible defaultValue="terms" className="space-y-4">
        <AccordionItem value="terms" className="border border-hunter-green/10 rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-hunter-green/5 hover:bg-hunter-green/10 text-xl font-hammersmith text-hunter-green">
            Understanding Mortgage Terms
          </AccordionTrigger>
          <AccordionContent className="p-4 text-hunter-green/80">
            <p className="mb-4">
              Navigating mortgage terminology doesn't have to be intimidating. Here's a simple breakdown of key terms you'll encounter.
            </p>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-hunter-green mb-2">Key Players</h4>
                <ul className="list-disc pl-5 space-y-2 text-hunter-green/80">
                  <li><span className="font-medium">Mortgagee:</span> The lender</li>
                  <li><span className="font-medium">Mortgagor:</span> The borrower</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-hunter-green mb-2">Time Periods</h4>
                <ul className="list-disc pl-5 space-y-2 text-hunter-green/80">
                  <li><span className="font-medium">Term:</span> The length of time your mortgage contract is in effect with a lender. Most typical is 5 or 3 year fixed or variable rate terms.</li>
                  <li><span className="font-medium">Amortization:</span> The total length of time the loan amount is spread across - often 25 or 30 years (IE: You take a 5 year term on a 25 year amortization, when the 5 years is up, you have 20 years left on amortization.</li>
                  <li><span className="font-medium">Maturity Date:</span> The last day of the mortgage term, when the balance is due or the mortgage must be renewed</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-hunter-green mb-2">Mortgage Types</h4>
                <ul className="list-disc pl-5 space-y-2 text-hunter-green/80">
                  <li><span className="font-medium">Closed Mortgage:</span> A mortgage that cannot be paid off in full before the end of its term without paying a penalty</li>
                  <li><span className="font-medium">Open Mortgage:</span> A mortgage that can be paid off at any time without penalty</li>
                  <li><span className="font-medium">Conventional Mortgage (AKA Uninsured mortgage):</span> The down payment is MORE than 20%</li>
                  <li><span className="font-medium">High Ratio Mortgage (AKA Insured mortgage):</span> The down payment is LESS than 20%, requiring mortgage default insurance</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-hunter-green mb-2">Financial Components</h4>
                <ul className="list-disc pl-5 space-y-2 text-hunter-green/80">
                  <li><span className="font-medium">Principal:</span> The original amount borrowed, or the remaining balance of the mortgage excluding interest costs.</li>
                  <li><span className="font-medium">Down Payment:</span> The portion of the property's purchase price paid upfront by the buyer.</li>
                  <li><span className="font-medium">Mortgage Default Insurance:</span> A lump sum fee, rolled into the mortgage that protects the lender, should you default on the loan.</li>
                  <li><span className="font-medium">CMHC / Sagen / Canada Guarantee:</span> Mortgage Insurers</li>
                  <li><span className="font-medium">Loan-to-Value Ratio (LTV):</span> The percentage of the property's value that is financed by the mortgage.</li>
                  <li><span className="font-medium">Equity:</span> The difference between your home's market value and the outstanding mortgage balance, (including any secured credit)</li>
                  <li><span className="font-medium">Collateral:</span> The property pledged as security for the mortgage loan</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-hunter-green mb-2">Interest Options</h4>
                <ul className="list-disc pl-5 space-y-2 text-hunter-green/80">
                  <li><span className="font-medium">Interest Rate:</span> The percentage charged by the lender for borrowing money, applied to the mortgage balance</li>
                  <li><span className="font-medium">Variable Interest Rate Mortgage:</span> A mortgage with a fluctuating interest rate, based on the Bank of Canada's prime lending rate</li>
                  <li><span className="font-medium">Fixed Interest Rate:</span> The rate that remains the same for the entire term</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-hunter-green mb-2">Qualifying Ratios</h4>
                <ul className="list-disc pl-5 space-y-2 text-hunter-green/80">
                  <li><span className="font-medium">Gross Debt Service Ratio (GDS):</span> The percentage of your gross income used to cover housing costs, (property taxes, mortgage payment and any condo fees).</li>
                  <li><span className="font-medium">Total Debt Service Ratio (TDS):</span> The percentage of your gross income used to cover housing costs PLUS credit products such as cards, lines, loans.</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        
        
        
      </Accordion>
    </div>;
};
export default MortgageBasics;
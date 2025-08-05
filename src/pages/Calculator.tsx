import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator as CalculatorIcon, Home, Mail, Send } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const Calculator = () => {
  // Annual income inputs
  const [annualIncome, setAnnualIncome] = useState<number>(80000);
  const [coApplicantIncome, setCoApplicantIncome] = useState<number>(0);
  
  // Monthly expenses
  const [carPayments, setCarPayments] = useState<number>(0);
  const [creditCardPayments, setCreditCardPayments] = useState<number>(0);
  const [otherLoanPayments, setOtherLoanPayments] = useState<number>(0);
  const [heatingCosts, setHeatingCosts] = useState<number>(150);
  const [condoFees, setCondoFees] = useState<number>(0);
  
  // Down payment
  const [downPayment, setDownPayment] = useState<number>(50000);
  
  // Mortgage details
  const [interestRate, setInterestRate] = useState<number>(5);
  const [amortizationYears, setAmortizationYears] = useState<number>(25);
  
  // Results
  const [affordability, setAffordability] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [calculated, setCalculated] = useState<boolean>(false);

  // Email report
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [additionalEmails, setAdditionalEmails] = useState<string>("");
  const [sendToAndreina, setSendToAndreina] = useState<boolean>(false);

  const calculateAffordability = () => {
    // Total annual household income
    const totalIncome = annualIncome + coApplicantIncome;
    const monthlyIncome = totalIncome / 12;
    
    // Total monthly debt payments
    const totalMonthlyDebt = carPayments + creditCardPayments + otherLoanPayments;
    
    // Monthly heating and condo fees
    const monthlyPropertyExpenses = heatingCosts + condoFees;
    
    // CMHC Guidelines: GDS ratio max 39%, TDS ratio max 44%
    // Gross Debt Service (GDS) ratio - housing costs / income
    // Total Debt Service (TDS) ratio - (housing costs + other debt) / income
    
    // Estimate property taxes as 1% of house value annually
    const estHouseValue = 400000; // Starting estimate
    const estPropertyTaxRate = 0.01;
    const estMonthlyPropertyTax = (estHouseValue * estPropertyTaxRate) / 12;
    
    // Target GDS ratio (housing costs should be <= 39% of income)
    const gdsRatio = 0.39;
    const tdsRatio = 0.44;
    
    // Maximum monthly housing costs based on GDS
    const maxMonthlyHousingCost = monthlyIncome * gdsRatio;
    
    // Maximum monthly total debt payment based on TDS
    const maxTotalDebtPayment = monthlyIncome * tdsRatio;
    const maxHousingAfterDebt = maxTotalDebtPayment - totalMonthlyDebt;
    
    // Use the lower of GDS and TDS calculations as constraint
    const maxMonthlyPaymentForHousing = Math.min(maxMonthlyHousingCost, maxHousingAfterDebt);
    
    // Available for mortgage payment after accounting for property tax and other property expenses
    const availableForMortgagePayment = maxMonthlyPaymentForHousing - estMonthlyPropertyTax - monthlyPropertyExpenses;
    
    // Calculate mortgage amount using payment, interest rate, and amortization
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = amortizationYears * 12;
    
    // Present value of mortgage calculation (mortgage affordability)
    const pvFactor = (1 - Math.pow(1 + monthlyRate, -totalPayments)) / monthlyRate;
    const mortgageAffordability = availableForMortgagePayment * pvFactor;
    
    // Total home price affordability = mortgage amount + down payment
    const totalAffordability = mortgageAffordability + downPayment;
    
    // Calculate monthly mortgage payment
    const mortgageAmount = totalAffordability - downPayment;
    const x = Math.pow(1 + monthlyRate, totalPayments);
    const monthlyMortgagePayment = (mortgageAmount * x * monthlyRate) / (x - 1);
    
    setAffordability(totalAffordability);
    setMonthlyPayment(monthlyMortgagePayment);
    setCalculated(true);
  };

  const handleSendReport = () => {
    // TODO: Implement actual email sending functionality
    console.log("Sending report to:", emailAddress);
    if (additionalEmails) console.log("Additional recipients:", additionalEmails);
    if (sendToAndreina) console.log("Also sending to Andreina");
    
    alert("Report sent successfully!");
    setShowEmailForm(false);
  };

  const handleQuestionsAboutReport = () => {
    window.location.href = "mailto:ask@mortgagewithford.ca?subject=Questions about my mortgage affordability report";
  };

  return (
    <PageBackground>
      {/* Content container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header section */}
        <Header />
        
        {/* Main content */}
        <section className="mb-16 opacity-0 animate-fade-in-delay-1">
          <h1 className="text-4xl md:text-6xl font-league-spartan font-bold mb-8 text-center text-pure-black">
            Home <span className="text-muted-red">Affordability</span> Calculator
          </h1>
          
          <div className="bg-white bg-opacity-70 backdrop-blur-sm border border-hunter-green/30 rounded-lg p-8 mb-10 shadow-sm">
            <div className="mb-8 text-center">
              <div className="inline-block p-4 bg-brx-dark rounded-full text-white mb-4">
                <Home size={48} />
              </div>
              <h2 className="text-2xl font-serif mb-4 text-brx-dark">How much home can you afford?</h2>
              <p className="text-brx-dark/80 mb-4 max-w-2xl mx-auto">
                Use this calculator to estimate how much home you can afford based on your income, expenses, and down payment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <h3 className="text-xl font-serif font-bold text-brx-dark border-b border-brx-dark/20 pb-2">Income Information</h3>
                
                <div>
                  <label htmlFor="annualIncome" className="block mb-2 text-brx-dark font-medium">Your Annual Income ($)</label>
                  <input
                    id="annualIncome"
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="w-full p-3 border border-brx-dark/30 rounded-md text-brx-dark"
                  />
                </div>
                
                <div>
                  <label htmlFor="coApplicantIncome" className="block mb-2 text-brx-dark font-medium">Co-Applicant Annual Income ($)</label>
                  <input
                    id="coApplicantIncome"
                    type="number"
                    value={coApplicantIncome}
                    onChange={(e) => setCoApplicantIncome(Number(e.target.value))}
                    className="w-full p-3 border border-brx-dark/30 rounded-md text-brx-dark"
                  />
                </div>
                
                <h3 className="text-xl font-serif font-bold text-brx-dark border-b border-brx-dark/20 pb-2 pt-4">Monthly Expenses</h3>
                
                <div>
                  <label htmlFor="carPayments" className="block mb-2 text-brx-dark font-medium">Car Payments ($)</label>
                  <input
                    id="carPayments"
                    type="number"
                    value={carPayments}
                    onChange={(e) => setCarPayments(Number(e.target.value))}
                    className="w-full p-3 border border-brx-dark/30 rounded-md text-brx-dark"
                  />
                </div>
                
                <div>
                  <label htmlFor="creditCardPayments" className="block mb-2 text-brx-dark font-medium">Credit Card Payments ($)</label>
                  <input
                    id="creditCardPayments"
                    type="number"
                    value={creditCardPayments}
                    onChange={(e) => setCreditCardPayments(Number(e.target.value))}
                    className="w-full p-3 border border-brx-dark/30 rounded-md text-brx-dark"
                  />
                </div>
                
                <div>
                  <label htmlFor="otherLoanPayments" className="block mb-2 text-brx-dark font-medium">Other Loan Payments ($)</label>
                  <input
                    id="otherLoanPayments"
                    type="number"
                    value={otherLoanPayments}
                    onChange={(e) => setOtherLoanPayments(Number(e.target.value))}
                    className="w-full p-3 border border-brx-dark/30 rounded-md text-brx-dark"
                  />
                </div>
                
                <div>
                  <label htmlFor="heatingCosts" className="block mb-2 text-brx-dark font-medium">Monthly Heating Costs ($)</label>
                  <input
                    id="heatingCosts"
                    type="number"
                    value={heatingCosts}
                    onChange={(e) => setHeatingCosts(Number(e.target.value))}
                    className="w-full p-3 border border-brx-dark/30 rounded-md text-brx-dark"
                  />
                </div>
                
                <div>
                  <label htmlFor="condoFees" className="block mb-2 text-brx-dark font-medium">Monthly Condo Fees (if applicable) ($)</label>
                  <input
                    id="condoFees"
                    type="number"
                    value={condoFees}
                    onChange={(e) => setCondoFees(Number(e.target.value))}
                    className="w-full p-3 border border-brx-dark/30 rounded-md text-brx-dark"
                  />
                </div>
                
                <h3 className="text-xl font-serif font-bold text-brx-dark border-b border-brx-dark/20 pb-2 pt-4">Down Payment & Mortgage Details</h3>
                
                <div>
                  <label htmlFor="downPayment" className="block mb-2 text-brx-dark font-medium">Down Payment Amount ($)</label>
                  <input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full p-3 border border-brx-dark/30 rounded-md text-brx-dark"
                  />
                </div>
                
                <div>
                  <label htmlFor="interestRate" className="block mb-2 text-brx-dark font-medium">Mortgage Interest Rate (%)</label>
                  <input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full p-3 border border-brx-dark/30 rounded-md text-brx-dark"
                  />
                </div>
                
                <div>
                  <label htmlFor="amortizationYears" className="block mb-2 text-brx-dark font-medium">Amortization Period (years)</label>
                  <select
                    id="amortizationYears"
                    value={amortizationYears}
                    onChange={(e) => setAmortizationYears(Number(e.target.value))}
                    className="w-full p-3 border border-brx-dark/30 rounded-md text-brx-dark"
                  >
                    <option value="10">10 years</option>
                    <option value="15">15 years</option>
                    <option value="20">20 years</option>
                    <option value="25">25 years</option>
                    <option value="30">30 years</option>
                  </select>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={calculateAffordability}
                    className="w-full py-3 px-6 rounded border-2 border-hunter-green text-pure-white bg-hunter-green hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300 font-medium font-opensauce"
                  >
                    Calculate Affordability
                  </Button>
                </div>
              </div>
              
              <Card className="bg-brx-cream bg-opacity-60">
                <CardContent className="p-8">
                  <h3 className="text-xl font-serif font-bold mb-6 text-brx-dark">Affordability Summary</h3>
                  
                  <div className="border-t border-brx-dark/20 pt-6 mt-4">
                    <div className="flex justify-between mb-4">
                      <span className="text-lg font-bold text-brx-dark">Maximum Home Price</span>
                      <span className="text-lg font-bold text-brx-dark">
                        {calculated ? `$${affordability.toLocaleString('en-US', {maximumFractionDigits: 0})}` : '-'}
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-lg font-bold text-brx-dark">Monthly Mortgage Payment</span>
                      <span className="text-lg font-bold text-brx-dark">
                        {calculated ? `$${monthlyPayment.toLocaleString('en-US', {maximumFractionDigits: 2})}` : '-'}
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-lg font-bold text-brx-dark">Mortgage Amount</span>
                      <span className="text-lg font-bold text-brx-dark">
                        {calculated ? `$${(affordability - downPayment).toLocaleString('en-US', {maximumFractionDigits: 0})}` : '-'}
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-lg font-bold text-brx-dark">Down Payment</span>
                      <span className="text-lg font-bold text-brx-dark">
                        {calculated ? `$${downPayment.toLocaleString('en-US', {maximumFractionDigits: 0})}` : '-'}
                      </span>
                    </div>
                    {calculated && (
                      <div className="text-lg font-bold text-brx-green mt-6 border-t border-brx-dark/20 pt-4">
                        Down Payment: {((downPayment / affordability) * 100).toFixed(1)}% of purchase price
                      </div>
                    )}
                  </div>
                  
                  {calculated && (
                    <div className="mt-6 border-t border-brx-dark/20 pt-4 space-y-4">
                      {!showEmailForm ? (
                        <div className="flex flex-col space-y-3">
                          <Button 
                            onClick={() => setShowEmailForm(true)} 
                            className="bg-brx-dark hover:bg-brx-accent text-white flex items-center gap-2"
                          >
                            <Mail size={16} />
                            Email Report to Myself
                          </Button>
                          <Button 
                            onClick={handleQuestionsAboutReport} 
                            variant="outline" 
                            className="border-brx-dark text-brx-dark hover:bg-brx-dark hover:text-white"
                          >
                            I Have Questions About My Report
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="emailAddress" className="block mb-2 text-brx-dark font-medium">Your Email Address</label>
                            <input
                              id="emailAddress"
                              type="email"
                              value={emailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                              className="w-full p-3 border border-brx-dark/30 rounded-md text-brx-dark"
                              placeholder="your@email.com"
                            />
                          </div>
                          <div>
                            <label htmlFor="additionalEmails" className="block mb-2 text-brx-dark font-medium">Additional Recipients (comma separated)</label>
                            <input
                              id="additionalEmails"
                              type="text"
                              value={additionalEmails}
                              onChange={(e) => setAdditionalEmails(e.target.value)}
                              className="w-full p-3 border border-brx-dark/30 rounded-md text-brx-dark"
                              placeholder="friend@email.com, partner@email.com"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="sendToAndreina" 
                              checked={sendToAndreina} 
                              onCheckedChange={(checked) => setSendToAndreina(checked as boolean)} 
                            />
                            <label htmlFor="sendToAndreina" className="text-sm text-brx-dark cursor-pointer">
                              Email to Andreina
                            </label>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button 
                              onClick={handleSendReport} 
                              className="bg-brx-dark hover:bg-brx-accent text-white flex-1 flex items-center justify-center gap-2"
                            >
                              <Send size={16} />
                              Send Report
                            </Button>
                            <Button 
                              onClick={() => setShowEmailForm(false)} 
                              variant="outline" 
                              className="border-brx-dark text-brx-dark hover:bg-brx-dark hover:text-white flex-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <p className="text-sm text-brx-dark/60 mt-6">
                    This calculator provides an estimate based on CMHC guidelines. For a personalized assessment, please book a consultation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <a href="/" className="inline-block px-6 py-3 rounded border-2 border-hunter-green text-pure-white bg-hunter-green hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300 font-medium font-opensauce">
              Back to Home
            </a>
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </PageBackground>
  );
};

export default Calculator;

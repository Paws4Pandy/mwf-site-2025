import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';

const Terms = () => {
  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Header />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-league-spartan font-bold mb-8 text-pure-black">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none font-opensauce text-hunter-green space-y-6">
            <p className="text-xl mb-8 italic" style={{fontFamily: 'Times, "Times New Roman", serif'}}>
              Terms and conditions for using MortgageWithFord.ca services
            </p>
            
            <div className="bg-light-azure/20 p-8 rounded-lg mb-8">
              <p className="text-base">
                <strong>Note:</strong> You can add your complete terms of service content in the file: 
                <code className="bg-hunter-green/10 px-2 py-1 rounded text-sm ml-2">
                  /src/assets/policy/terms.md
                </code>
              </p>
            </div>
            
            <section className="mb-12">
              <h2 className="text-2xl font-hammersmith mb-4 text-pure-black">Acceptance of Terms</h2>
              <p>By using our services, you agree to these terms...</p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-hammersmith mb-4 text-pure-black">Professional Services</h2>
              <p>Information about mortgage agent services...</p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-hammersmith mb-4 text-pure-black">Regulatory Compliance</h2>
              <p>
                Andreina Ford is licensed by FSRA Ontario (License #M24000357) 
                and operates under BRX Mortgage #13463.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-hammersmith mb-4 text-pure-black">Contact</h2>
              <p>
                For questions about these terms, contact:{' '}
                <a href="mailto:hello@mortgagewithford.ca" className="text-muted-red hover:underline">
                  hello@mortgagewithford.ca
                </a>
              </p>
            </section>
          </div>
        </div>
        
        <Footer />
      </div>
    </PageBackground>
  );
};

export default Terms;
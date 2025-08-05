import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';

const Privacy = () => {
  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Header />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-league-spartan font-bold mb-8 text-pure-black">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none font-opensauce text-hunter-green space-y-6">
            <p className="text-xl mb-8 italic" style={{fontFamily: 'Times, "Times New Roman", serif'}}>
              Your privacy is important to us at MortgageWithFord.ca
            </p>
            
            <div className="bg-light-azure/20 p-8 rounded-lg mb-8">
              <p className="text-base">
                <strong>Note:</strong> You can add your complete privacy policy content in the file: 
                <code className="bg-hunter-green/10 px-2 py-1 rounded text-sm ml-2">
                  /src/assets/policy/privacy.md
                </code>
              </p>
            </div>
            
            <section className="mb-12">
              <h2 className="text-2xl font-hammersmith mb-4 text-pure-black">Information We Collect</h2>
              <p>Details about information collection practices...</p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-hammersmith mb-4 text-pure-black">How We Use Your Information</h2>
              <p>Information about data usage...</p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-hammersmith mb-4 text-pure-black">Contact Information</h2>
              <p>
                For privacy concerns, contact Andreina Ford at:{' '}
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

export default Privacy;
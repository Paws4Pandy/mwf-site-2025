import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';

const Playbooks = () => {
  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Header />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-league-spartan font-bold mb-6 text-charcoal">
              Free Mortgage Playbooks
            </h1>
            <p className="text-xl md:text-2xl font-opensauce text-slate-blue max-w-3xl mx-auto leading-relaxed">
              Download my comprehensive guides to navigate your mortgage process with confidence and transparency.
            </p>
          </div>

          {/* Playbook Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            
            {/* First-Time Buyer Playbook */}
            <div className="bg-warm-cream/50 border border-brand-burgundy/20 rounded-lg p-8 hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-brand-burgundy rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl text-soft-white">🏠</span>
                </div>
                <h3 className="text-xl font-league-spartan font-bold text-charcoal mb-3">
                  First-Time Buyer's Guide
                </h3>
                <p className="font-opensauce text-slate-blue text-sm leading-relaxed">
                  Everything you need to know for your first home purchase. No BS, just the facts that protect your investment.
                </p>
              </div>
              <button className="w-full px-6 py-3 bg-brand-burgundy text-soft-white font-opensauce font-medium rounded-lg hover:bg-charcoal transition-all duration-300">
                Download Free
              </button>
            </div>

            {/* Pre-Approval Playbook */}
            <div className="bg-warm-cream/50 border border-brand-burgundy/20 rounded-lg p-8 hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-bronze rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl text-soft-white">✅</span>
                </div>
                <h3 className="text-xl font-league-spartan font-bold text-charcoal mb-3">
                  Pre-Approval Mastery
                </h3>
                <p className="font-opensauce text-slate-blue text-sm leading-relaxed">
                  Get approved faster and for more than you thought possible. My insider strategies revealed.
                </p>
              </div>
              <button className="w-full px-6 py-3 bg-bronze text-soft-white font-opensauce font-medium rounded-lg hover:bg-slate-blue transition-all duration-300">
                Download Free
              </button>
            </div>

            {/* Rate Protection Guide */}
            <div className="bg-warm-cream/50 border border-brand-burgundy/20 rounded-lg p-8 hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-slate-blue rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl text-soft-white">🛡️</span>
                </div>
                <h3 className="text-xl font-league-spartan font-bold text-charcoal mb-3">
                  Rate Protection Secrets
                </h3>
                <p className="font-opensauce text-slate-blue text-sm leading-relaxed">
                  How to lock in rates and protect yourself from market volatility. Industry secrets exposed.
                </p>
              </div>
              <button className="w-full px-6 py-3 bg-slate-blue text-soft-white font-opensauce font-medium rounded-lg hover:bg-brand-burgundy transition-all duration-300">
                Download Free
              </button>
            </div>

            {/* Investment Property Guide */}
            <div className="bg-warm-cream/50 border border-brand-burgundy/20 rounded-lg p-8 hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-brand-burgundy rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl text-soft-white">💰</span>
                </div>
                <h3 className="text-xl font-league-spartan font-bold text-charcoal mb-3">
                  Investment Property Playbook
                </h3>
                <p className="font-opensauce text-slate-blue text-sm leading-relaxed">
                  Build wealth through real estate. The financing strategies big investors use.
                </p>
              </div>
              <button className="w-full px-6 py-3 bg-brand-burgundy text-soft-white font-opensauce font-medium rounded-lg hover:bg-charcoal transition-all duration-300">
                Download Free
              </button>
            </div>

            {/* Refinancing Guide */}
            <div className="bg-warm-cream/50 border border-brand-burgundy/20 rounded-lg p-8 hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-bronze rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl text-soft-white">🔄</span>
                </div>
                <h3 className="text-xl font-league-spartan font-bold text-charcoal mb-3">
                  Refinancing Optimization
                </h3>
                <p className="font-opensauce text-slate-blue text-sm leading-relaxed">
                  When and how to refinance to save thousands. Timing strategies that work.
                </p>
              </div>
              <button className="w-full px-6 py-3 bg-bronze text-soft-white font-opensauce font-medium rounded-lg hover:bg-slate-blue transition-all duration-300">
                Download Free
              </button>
            </div>

            {/* Mortgage Protection */}
            <div className="bg-warm-cream/50 border border-brand-burgundy/20 rounded-lg p-8 hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-slate-blue rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl text-soft-white">🔒</span>
                </div>
                <h3 className="text-xl font-league-spartan font-bold text-charcoal mb-3">
                  Mortgage Protection Guide
                </h3>
                <p className="font-opensauce text-slate-blue text-sm leading-relaxed">
                  Insurance and protection strategies to safeguard your family's largest investment.
                </p>
              </div>
              <button className="w-full px-6 py-3 bg-slate-blue text-soft-white font-opensauce font-medium rounded-lg hover:bg-brand-burgundy transition-all duration-300">
                Download Free
              </button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-brand-burgundy/10 border border-brand-burgundy/20 rounded-lg p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-league-spartan font-bold text-charcoal mb-6">
              Want Personalized Guidance?
            </h2>
            <p className="text-lg font-opensauce text-slate-blue mb-8 max-w-2xl mx-auto">
              These playbooks are just the beginning. Get a custom strategy for your specific situation.
            </p>
            <a 
              href="https://callme.mortgagewithford.ca"
              className="inline-flex items-center px-8 py-4 bg-brand-burgundy text-soft-white font-opensauce font-semibold text-lg rounded-lg hover:bg-charcoal transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              📞 Book Your Strategy Session
            </a>
          </div>
        </div>
        
        <Footer />
      </div>
    </PageBackground>
  );
};

export default Playbooks;
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import { getH1Classes, getBodyClasses } from '@/assets/config/typography';

const Disclaimer = () => {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      
      {/* Main Content */}
      <main className="min-h-screen py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
            <h1 className={`${getH1Classes('text-white mb-8')}`}>Disclaimer</h1>
            <p className={`${getBodyClasses('text-white/80 mb-4')}`}>
              <strong>For:</strong> Andreina Ford – Mortgage Agent Level 2, BRX Mortgage #13463
            </p>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">General Information Only</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  The content on this website is for general informational purposes and does not constitute financial, legal, or mortgage advice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">No Client Relationship</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  Visiting this website or contacting us does not create a client-agent relationship unless explicitly agreed.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Accuracy of Information</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  We strive to keep all information current, but mortgage rates, policies, and regulations change often. Always confirm details with Andreina Ford directly.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">External Links</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  Occasionally, we may reference external sources. We are not responsible for the content or practices of these third-party sites.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  Questions or clarifications? Please reach out to{' '}
                  <a href="mailto:hello@mortgagewithford.ca" className="text-design-gold hover:underline">
                    hello@mortgagewithford.ca
                  </a>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Disclaimer;
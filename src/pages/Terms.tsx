import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import { getH1Classes, getBodyClasses } from '@/assets/config/typography';

const Terms = () => {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      
      {/* Main Content */}
      <main className="min-h-screen py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
            <h1 className={`${getH1Classes('text-white mb-8')}`}>Terms of Service</h1>
            <p className={`${getBodyClasses('text-white/80 mb-4')}`}>
              <strong>For:</strong> Andreina Ford – Mortgage Agent Level 2, Tango ON #13691
            </p>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Agreement to Terms</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  By accessing and using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Use of Website</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  This website is provided for informational purposes about mortgage services. You may not use this website for any illegal or unauthorized purpose.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Intellectual Property</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  All content on this website, including text, graphics, logos, and images, is the property of Andreina Ford and Tango ON and is protected by copyright laws.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Limitation of Liability</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  Andreina Ford and Tango ON shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use this website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Mortgage Services</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  All mortgage services are subject to qualification and approval. Rates and terms are subject to change without notice. Please contact us directly for current rates and personalized advice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Privacy</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy for information about how we collect, use, and protect your information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Changes to Terms</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  We reserve the right to modify these terms at any time. Your continued use of the website following any changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Contact Information</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  For questions about these Terms of Service, please contact us at hello@mortgagewithford.ca
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

export default Terms;
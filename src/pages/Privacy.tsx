import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import { getH1Classes, getBodyClasses } from '@/assets/config/typography';

const Privacy = () => {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      
      {/* Main Content */}
      <main className="min-h-screen py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
            <h1 className={`${getH1Classes('text-white mb-8')}`}>Privacy Policy</h1>
            <p className={`${getBodyClasses('text-white/80 mb-4')}`}>
              <strong>For:</strong> Andreina Ford – Mortgage Agent Level 2, BRX Mortgage #13463
            </p>
            
            <div className="space-y-6">
              <p className={`${getBodyClasses('text-white/90')}`}>
                Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
              </p>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>
                <ul className={`${getBodyClasses('text-white/90')} space-y-2 list-disc pl-6`}>
                  <li>Contact details (name, email, phone number)</li>
                  <li>Financial information necessary for mortgage inquiries/applications</li>
                  <li>Website usage data for improving site functionality</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h2>
                <ul className={`${getBodyClasses('text-white/90')} space-y-2 list-disc pl-6`}>
                  <li>To respond to your questions and service requests</li>
                  <li>To process mortgage applications</li>
                  <li>To improve our website and services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Sharing Your Information</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  Your data is used solely for mortgage purposes. We do not sell or share personal information except with legitimate partners required to process mortgage requests, and only with your consent or as required by law.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Your Rights and Choices</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  You may request access, correction, or deletion of your personal information at any time by emailing{' '}
                  <a href="mailto:hello@mortgagewithford.ca" className="text-design-gold hover:underline">
                    hello@mortgagewithford.ca
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Security</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  We take reasonable steps to protect your information from unauthorized access.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
                <p className={`${getBodyClasses('text-white/90')}`}>
                  For any privacy concerns, reach out to:{' '}
                  <a href="mailto:hello@mortgagewithford.ca" className="text-design-gold hover:underline">
                    hello@mortgagewithford.ca
                  </a>
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

export default Privacy;
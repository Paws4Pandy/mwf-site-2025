
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Perks = () => {
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [referralData, setReferralData] = useState({
    yourName: '',
    yourEmail: '',
    referralName: '',
    referralEmail: '',
    message: ''
  });

  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReferralData({
      ...referralData,
      [e.target.name]: e.target.value
    });
  };

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with referral data
    const subject = `Referral from ${referralData.yourName}`;
    const body = `Your Name: ${referralData.yourName}\nYour Email: ${referralData.yourEmail}\n\nReferral Name: ${referralData.referralName}\nReferral Email: ${referralData.referralEmail}\n\nMessage:\n${referralData.message}`;
    const mailtoLink = `mailto:ask@mortgagewithford.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Hide form after submission
    setShowReferralForm(false);
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
            Customer <span className="text-muted-red">Perks</span>
          </h1>
          
          {/* Referral Program Section */}
          <div className="mb-12 bg-white bg-opacity-70 backdrop-blur-sm border border-brx-dark/30 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6">
                <h2 className="text-2xl font-serif mb-4 text-brx-dark">Referral Program</h2>
                <p className="text-brx-dark/80 mb-6 text-lg">
                  Know someone who could benefit from a mortgage conversation? Refer them over and once we have a chat; you're entered into our brokerage's monthly draw to win your mortgage payment or rent for a month! (Up to $2,500)
                </p>
                {!showReferralForm ? (
                  <Button 
                    onClick={() => setShowReferralForm(true)}
                    className="bg-brx-dark hover:bg-brx-accent text-white">
                    Refer Someone Today
                  </Button>
                ) : (
                  <div className="bg-white p-4 rounded-md border border-brx-dark/10">
                    <h3 className="font-medium mb-4 text-brx-dark">Referral Form</h3>
                    <form onSubmit={handleReferralSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-brx-dark mb-1">Your Name</label>
                          <input 
                            type="text"
                            name="yourName"
                            value={referralData.yourName}
                            onChange={handleReferralChange}
                            required
                            className="w-full px-3 py-2 border border-brx-dark/30 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-brx-dark mb-1">Your Email</label>
                          <input 
                            type="email"
                            name="yourEmail"
                            value={referralData.yourEmail}
                            onChange={handleReferralChange}
                            required
                            className="w-full px-3 py-2 border border-brx-dark/30 rounded"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-brx-dark mb-1">Referral Name</label>
                          <input 
                            type="text"
                            name="referralName"
                            value={referralData.referralName}
                            onChange={handleReferralChange}
                            required
                            className="w-full px-3 py-2 border border-brx-dark/30 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-brx-dark mb-1">Referral Email</label>
                          <input 
                            type="email"
                            name="referralEmail"
                            value={referralData.referralEmail}
                            onChange={handleReferralChange}
                            required
                            className="w-full px-3 py-2 border border-brx-dark/30 rounded"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-brx-dark mb-1">Additional Message (Optional)</label>
                        <textarea
                          name="message"
                          value={referralData.message}
                          onChange={handleReferralChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-brx-dark/30 rounded"
                        ></textarea>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button type="submit" className="bg-brx-dark hover:bg-brx-accent text-white">
                          Submit Referral
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => setShowReferralForm(false)}
                          variant="outline"
                          className="border-brx-dark/30 text-brx-dark hover:bg-brx-dark/10">
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              <div className="bg-brx-dark h-full">
                <img 
                  src="/lovable-uploads/2bf82171-cb06-4cfa-93f8-426680e52e50.png" 
                  alt="Win Your Mortgage Payment" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* VIP Club Section */}
          <div className="mb-12 bg-white bg-opacity-70 backdrop-blur-sm border border-brx-dark/30 rounded-lg overflow-hidden p-6">
            <h2 className="text-2xl font-serif mb-4 text-brx-dark">Join my VIP Club monthly giveaway!</h2>
            <p className="text-brx-dark/80 mb-6 text-lg">
              All you have to do is enter your email and name to be notified of the next contest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="px-4 py-2 border border-brx-dark/30 rounded"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="px-4 py-2 border border-brx-dark/30 rounded"
              />
              <Button className="bg-brx-dark hover:bg-brx-accent text-white">
                Join VIP Club
              </Button>
            </div>
            
            {/* Recent Winners Section */}
            <div className="mt-6 p-4 bg-brx-dark/5 rounded-lg">
              <h3 className="text-xl font-serif font-semibold mb-3 text-brx-dark">Congratulations to our recent winners!</h3>
              <ul className="list-disc pl-5 space-y-1 text-brx-dark/80">
                <li>Megan M. - April 2025</li>
                <li>Scott M. - March 2025</li>
                <li>Kaitlyn C. - February 2025</li>
                <li>Jane W. - January 2025</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-16">
            <div className="bg-white bg-opacity-70 backdrop-blur-sm border border-brx-dark/30 rounded-lg p-8 mb-10 shadow-sm">
              <h2 className="text-2xl font-serif mb-6 text-brx-dark">Exclusive Benefits</h2>
              <p className="text-brx-dark/80 mb-6">
                Getting a mortgage shouldn't be daunting for my borrowers; that's why I give access to exclusive perks and resources to help you throughout your mortgage journey.
              </p>
              <ul className="list-disc pl-5 space-y-4 text-brx-dark/80">
                <li>Holistic planning for the next 5 years</li>
                <li>Priority access to trusted referral partners</li>
                <li>Special rate promotions</li>
                <li>Ongoing mortgage health check-ups</li>
                <li>A collaborative experience, taking the coordination off your shoulders!</li>
                <li>Connection and support after funding</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <a 
              href="https://app.ownwell.ca/join/mymortgageassistant" 
              className="block w-full px-6 py-3 rounded border border-brx-accent text-white bg-brx-dark hover:bg-brx-accent hover:text-brx-white transition-all duration-300 font-medium text-center mb-6"
            >
              Already own a home? Get a free automated analysis to start planning
            </a>
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </PageBackground>
  );
};

export default Perks;

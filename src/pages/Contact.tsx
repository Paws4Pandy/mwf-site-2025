
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import { Instagram, Facebook, Linkedin, Home, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = `Contact Form Message from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:ask@mortgagewithford.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({
      ...formData,
      [e.target.id]: e.target.value,
    });
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
            Get in <span className="text-muted-red">Touch</span>
          </h1>
          
          <div className="bg-pure-white bg-opacity-70 backdrop-blur-sm border border-hunter-green/30 rounded-lg p-8 mb-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-hammersmith mb-6 text-hunter-green">Reach Out Anytime</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-hunter-green text-pure-white rounded-full">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-hunter-green font-hammersmith">Phone</h3>
                      <p className="text-hunter-green/80 font-opensauce text-lg">613-743-7866</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-hunter-green text-pure-white rounded-full">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-hunter-green font-hammersmith">Email</h3>
                      <p className="text-hunter-green/80 font-opensauce text-lg">ask@mortgagewithford.ca</p>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <h3 className="text-lg font-medium text-hunter-green mb-3 font-hammersmith">Follow Me</h3>
                    <div className="flex gap-4">
                      <a href="https://www.instagram.com/mortgage.with.ford" target="_blank" rel="noopener noreferrer" className="p-3 bg-light-azure text-hunter-green border border-hunter-green/10 rounded-full hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300">
                        <Instagram size={20} />
                      </a>
                      <a href="http://facebook.mortgagewithford.ca" target="_blank" rel="noopener noreferrer" className="p-3 bg-light-azure text-hunter-green border border-hunter-green/10 rounded-full hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300">
                        <Facebook size={20} />
                      </a>
                      <a href="https://www.linkedin.com/in/mortgagewithford/" target="_blank" rel="noopener noreferrer" className="p-3 bg-light-azure text-hunter-green border border-hunter-green/10 rounded-full hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300">
                        <Linkedin size={20} />
                      </a>
                      <a href="https://app.ownwell.ca/join/mymortgageassistant" target="_blank" rel="noopener noreferrer" className="p-3 bg-light-azure text-hunter-green border border-hunter-green/10 rounded-full hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300">
                        <Home size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-hammersmith mb-6 text-hunter-green">Send a Message</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block mb-2 text-hunter-green font-hammersmith font-semibold">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-hunter-green/30 rounded-md font-opensauce text-hunter-green text-lg"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 text-hunter-green font-hammersmith font-semibold">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-hunter-green/30 rounded-md font-opensauce text-hunter-green text-lg"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 text-hunter-green font-hammersmith font-semibold">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 border border-hunter-green/30 rounded-md font-opensauce text-hunter-green text-lg"
                      placeholder="How can I help you today?"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full py-3 px-6 rounded border-2 border-hunter-green text-pure-white bg-hunter-green hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300 font-medium font-opensauce"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <Link to="/" className="inline-block px-6 py-3 rounded border-2 border-hunter-green text-pure-white bg-hunter-green hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300 font-medium font-opensauce">
              Back to Home
            </Link>
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </PageBackground>
  );
};

export default Contact;

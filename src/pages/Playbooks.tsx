import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, Download, FileText, ExternalLink, Phone, Calculator, Rocket } from 'lucide-react';
import PageBackground from '@/components/PageBackground';

// Template structure for user to populate with actual playbooks
const playbooksData = [
  {
    id: 'volume-1',
    volume: 'Volume 1',
    title: 'Your Playbook Title Here',
    description: 'Your playbook description will go here.',
    readTime: '15 min read',
    icon: BookOpen,
    downloadUrl: '/downloads/volume-1.pdf'
  },
  {
    id: 'volume-2', 
    volume: 'Volume 2',
    title: 'Your Playbook Title Here',
    description: 'Your playbook description will go here.',
    readTime: '12 min read', 
    icon: FileText,
    downloadUrl: '/downloads/volume-2.pdf'
  },
  {
    id: 'volume-3',
    volume: 'Volume 3', 
    title: 'Your Playbook Title Here',
    description: 'Your playbook description will go here.',
    readTime: '18 min read',
    icon: BookOpen,
    downloadUrl: '/downloads/volume-3.pdf'
  }
  // Add more volumes as needed
];

const handleDownload = (downloadUrl: string, title: string) => {
  // Create a temporary link element for download
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `${title}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Playbooks = () => {
  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-12 relative z-10">
          <Header />
          
          {/* Hero Section - Futuristic Glass Design */}
          <section className="py-20 md:py-32">
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-12 opacity-0 animate-fade-in-delay-1">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-anton font-normal text-design-charcoal tracking-tighter leading-[0.85] mb-8 premium-text">
                  Mortgage
                  <br />
                  <span className="text-design-plum">Playbooks</span>
                </h1>
              </div>
              
              <div className="mb-16 opacity-0 animate-fade-in-delay-2">
                <p className="text-xl md:text-2xl font-hk-grotesk-light font-light text-design-charcoal/80 max-w-4xl mx-auto leading-relaxed">
                  Professional mortgage guidance with radical transparency and insider knowledge.
                </p>
              </div>

              {/* Stats - Clean Cards */}
              <div className="flex flex-wrap justify-center gap-8 mb-20 opacity-0 animate-fade-in-delay-3">
                <div className="bg-design-cream/50 border border-design-plum/20 rounded-2xl p-8 text-center backdrop-blur-sm">
                  <div className="text-4xl font-anton text-design-plum mb-2">{playbooksData.length}</div>
                  <div className="text-sm font-hk-grotesk-light text-design-charcoal/70 uppercase tracking-widest">Volumes</div>
                </div>
                <div className="bg-design-cream/50 border border-design-plum/20 rounded-2xl p-8 text-center backdrop-blur-sm">
                  <div className="text-4xl font-anton text-design-plum mb-2">100%</div>
                  <div className="text-sm font-hk-grotesk-light text-design-charcoal/70 uppercase tracking-widest">Professional</div>
                </div>
                <div className="bg-design-cream/50 border border-design-plum/20 rounded-2xl p-8 text-center backdrop-blur-sm">
                  <div className="text-4xl font-anton text-design-plum mb-2">Free</div>
                  <div className="text-sm font-hk-grotesk-light text-design-charcoal/70 uppercase tracking-widest">Download</div>
                </div>
              </div>
            </div>
          </section>

          {/* Playbooks Grid with Resource Sidebar */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-12">
                
                {/* Main Content Area - Glass Morphism Cards */}
                <div className="lg:col-span-3">
                  <div className="grid md:grid-cols-2 gap-10">
                    {playbooksData.map((playbook, index) => {
                      const IconComponent = playbook.icon;
                      return (
                        <article 
                          key={playbook.id}
                          className={`group bg-design-cream/50 border border-design-plum/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-design-plum/10 transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-fade-in-delay-${Math.min(index + 1, 6)}`}
                        >
                          {/* Cover Area */}
                          <div className="relative h-56 bg-gradient-to-br from-design-sage/30 to-design-plum/20 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-texture opacity-30"></div>
                            
                            {/* Icon Container */}
                            <div className="relative z-10 w-24 h-24 bg-design-plum rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                              <IconComponent size={32} className="text-white drop-shadow-lg" />
                            </div>
                            
                            {/* Volume Badge */}
                            <div className="absolute top-6 left-6">
                              <span className="bg-white/90 px-4 py-2 text-design-charcoal text-sm font-hk-grotesk-light font-medium rounded-full backdrop-blur-sm">
                                {playbook.volume}
                              </span>
                            </div>
                            
                            {/* Read Time Badge */}
                            <div className="absolute top-6 right-6">
                              <span className="bg-design-gold/90 px-4 py-2 text-white text-sm font-hk-grotesk-light rounded-full">
                                {playbook.readTime}
                              </span>
                            </div>
                          </div>

                          {/* Content Area */}
                          <div className="p-10">
                            <div className="mb-8">
                              <h3 className="text-3xl font-tan-ashford font-normal text-design-charcoal mb-4 premium-text group-hover:text-design-plum transition-colors duration-500">
                                {playbook.title}
                              </h3>
                              <p className="font-hk-grotesk-light text-design-charcoal/70 text-lg leading-relaxed mb-8">
                                {playbook.description}
                              </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                              <Link
                                to={`/playbooks/${playbook.id}`}
                                className="flex-1 group/btn bg-design-gold text-white relative inline-flex items-center justify-center px-8 py-4 font-hk-grotesk-light font-medium rounded-xl hover:bg-design-charcoal transition-all duration-500 shadow-lg transform hover:-translate-y-1"
                              >
                                <BookOpen size={20} className="mr-3 group-hover/btn:animate-icon-float" />
                                Read Online
                              </Link>
                              
                              <button 
                                onClick={() => handleDownload(playbook.downloadUrl, playbook.title)}
                                className="px-8 py-4 bg-transparent border-2 border-design-plum text-design-plum font-hk-grotesk-light font-medium rounded-xl hover:bg-design-plum hover:text-white transition-all duration-500 shadow-lg transform hover:-translate-y-1"
                              >
                                <Download size={20} />
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>

                {/* Resource Sidebar - Glass Morphism */}
                <aside className="lg:col-span-1">
                  <div className="sticky top-8 space-y-8">
                    
                    {/* Quick Resources */}
                    <div className="bg-design-cream/80 border border-design-plum/10 rounded-3xl p-8 backdrop-blur-sm">
                      <h4 className="text-2xl font-tan-ashford text-design-charcoal mb-8 premium-text">
                        Quick Resources
                      </h4>
                      <div className="space-y-4">
                        <a 
                          href="https://callme.mortgagewithford.ca"
                          className="group flex items-center p-4 bg-design-sage/20 rounded-xl hover:bg-design-plum/10 transition-all duration-500"
                        >
                          <div className="w-12 h-12 bg-design-gold rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                            <Phone size={18} className="text-white" />
                          </div>
                          <div>
                            <div className="font-hk-grotesk-light font-medium text-design-charcoal text-base">Book a Call</div>
                            <div className="font-hk-grotesk-light text-design-charcoal/60 text-sm">Free consultation</div>
                          </div>
                        </a>

                        <Link 
                          to="/calculator"
                          className="group flex items-center p-4 bg-design-sage/20 rounded-xl hover:bg-design-plum/10 transition-all duration-500"
                        >
                          <div className="w-12 h-12 bg-design-plum rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                            <Calculator size={18} className="text-white" />
                          </div>
                          <div>
                            <div className="font-hk-grotesk-light font-medium text-design-charcoal text-base">Calculators</div>
                            <div className="font-hk-grotesk-light text-design-charcoal/60 text-sm">Run the numbers</div>
                          </div>
                        </Link>

                        <a 
                          href="https://andreina-ford.mtg-app.com/signup?brokerName=andreina.ford&brokerId=7208e0a3-3590-47b7-a99d-4704d9c75268"
                          className="group flex items-center p-4 bg-design-sage/20 rounded-xl hover:bg-design-plum/10 transition-all duration-500"
                        >
                          <div className="w-12 h-12 bg-design-sage rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                            <Rocket size={18} className="text-white" />
                          </div>
                          <div>
                            <div className="font-hk-grotesk-light font-medium text-design-charcoal text-base">Apply Now</div>
                            <div className="font-hk-grotesk-light text-design-charcoal/60 text-sm">Start application</div>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Important Links */}
                    <div className="bg-design-cream/80 border border-design-plum/10 rounded-3xl p-8 backdrop-blur-sm">
                      <h4 className="text-2xl font-tan-ashford text-design-charcoal mb-8 premium-text">
                        Important Links
                      </h4>
                      <div className="space-y-3">
                        <a href="https://www.cmhc-schl.gc.ca/" target="_blank" rel="noopener noreferrer" className="block p-4 rounded-xl hover:bg-design-sage/20 transition-colors duration-300">
                          <div className="font-hk-grotesk-light font-medium text-design-charcoal text-base mb-1">CMHC</div>
                          <div className="font-hk-grotesk-light text-design-charcoal/60 text-sm">Mortgage insurance info</div>
                        </a>
                        
                        <a href="https://www.bankofcanada.ca/" target="_blank" rel="noopener noreferrer" className="block p-4 rounded-xl hover:bg-design-sage/20 transition-colors duration-300">
                          <div className="font-hk-grotesk-light font-medium text-design-charcoal text-base mb-1">Bank of Canada</div>
                          <div className="font-hk-grotesk-light text-design-charcoal/60 text-sm">Current rates & policy</div>
                        </a>
                        
                        <a href="https://www.fsrao.ca/" target="_blank" rel="noopener noreferrer" className="block p-4 rounded-xl hover:bg-design-sage/20 transition-colors duration-300">
                          <div className="font-hk-grotesk-light font-medium text-design-charcoal text-base mb-1">FSRAO</div>
                          <div className="font-hk-grotesk-light text-design-charcoal/60 text-sm">Regulatory authority</div>
                        </a>

                        <a href="https://www.canada.ca/en/financial-consumer-agency.html" target="_blank" rel="noopener noreferrer" className="block p-4 rounded-xl hover:bg-design-sage/20 transition-colors duration-300">
                          <div className="font-hk-grotesk-light font-medium text-design-charcoal text-base mb-1">FCAC</div>
                          <div className="font-hk-grotesk-light text-design-charcoal/60 text-sm">Consumer protection</div>
                        </a>
                      </div>
                    </div>

                    {/* Contact Card */}
                    <div className="bg-design-charcoal rounded-3xl p-8 text-design-cream">
                      <h4 className="text-2xl font-tan-ashford mb-4 premium-text text-design-cream">
                        Need Help?
                      </h4>
                      <p className="font-hk-grotesk-light text-design-cream/90 text-base mb-8 leading-relaxed">
                        Questions about these playbooks? Get personalized guidance.
                      </p>
                      <a 
                        href="mailto:ask@mortgagewithford.ca"
                        className="inline-flex items-center px-6 py-4 bg-design-gold text-white font-hk-grotesk-light font-medium text-base rounded-xl hover:bg-design-plum transition-all duration-300"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Ask Andreina
                      </a>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
          
          <Footer />
      </div>
    </PageBackground>
  );
};

export default Playbooks;
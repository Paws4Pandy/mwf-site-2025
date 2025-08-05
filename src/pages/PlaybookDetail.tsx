import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, BookOpen, Clock, CheckCircle, ChevronRight, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';

// Sample playbook data with chapters
const playbooksData = {
  'first-time-buyer': {
    title: 'First-Time Buyer\'s Playbook',
    subtitle: 'Your Complete Guide to Home Ownership',
    description: 'Everything you need to know for your first home purchase. No BS, just the facts that protect your investment.',
    readTime: '15 min read',
    icon: '🏠',
    color: 'design-plum',
    coverImage: '/src/assets/images/playbooks/first-time-buyer-cover.jpg',
    chapters: [
      {
        id: 1,
        title: 'Pre-Purchase Preparation',
        subtitle: 'Setting Your Foundation',
        readTime: '5 min',
        content: `
          <h3>Understanding Your Financial Position</h3>
          <p>Before you start house hunting, you need to understand exactly where you stand financially. This isn't just about having enough for a down payment – it's about understanding your complete financial picture.</p>
          
          <h4>Credit Score Optimization</h4>
          <p>Your credit score directly impacts your interest rate. Even a 0.25% difference can save you thousands over the life of your mortgage.</p>
          <ul>
            <li>Check your credit report for errors</li>
            <li>Pay down high-utilization credit cards</li>
            <li>Don't close old credit accounts</li>
            <li>Avoid new credit applications 6 months before buying</li>
          </ul>

          <h4>Down Payment Strategy</h4>
          <p>The minimum down payment in Canada is 5% for homes under $500,000, but there are strategic considerations:</p>
          <ul>
            <li>5-9.99%: Requires mortgage insurance (CMHC)</li>
            <li>10-19.99%: Lower insurance premiums</li>
            <li>20%+: No insurance required, more lender options</li>
          </ul>

          <blockquote>
            <p><strong>Insider Tip:</strong> Many first-time buyers focus only on the down payment and forget about closing costs (1.5-4% of purchase price), moving expenses, and immediate home improvements.</p>
          </blockquote>
        `,
        keyTakeaways: [
          'Check credit score 6 months before buying',
          'Budget for closing costs beyond down payment',
          'Understand mortgage insurance requirements'
        ]
      },
      {
        id: 2,
        title: 'The Pre-Approval Process',
        subtitle: 'Getting Your Financial Power',
        readTime: '6 min',
        content: `
          <h3>Pre-Approval vs Pre-Qualification</h3>
          <p>Many buyers confuse these terms, but the difference is crucial to your success.</p>
          
          <h4>Pre-Qualification (Basic)</h4>
          <p>A rough estimate based on information you provide. No verification, no commitment from the lender.</p>

          <h4>Pre-Approval (Powerful)</h4>
          <p>A conditional commitment from a lender based on verified information. This is what gives you negotiating power.</p>

          <h3>Documents You'll Need</h3>
          <ul>
            <li><strong>Income Verification:</strong> 2 years of T4s, recent pay stubs</li>
            <li><strong>Employment Letter:</strong> Confirming position and salary</li>
            <li><strong>Asset Verification:</strong> Bank statements, investment accounts</li>
            <li><strong>Identification:</strong> Driver's license, passport</li>
            <li><strong>Down Payment Source:</strong> Gift letter if applicable</li>
          </ul>

          <h3>The Pre-Approval Meeting</h3>
          <p>This is where having an experienced mortgage professional makes the difference. We'll:</p>
          <ul>
            <li>Review multiple lender options</li>
            <li>Find the best rate and terms</li>
            <li>Identify potential issues before they become problems</li>
            <li>Provide rate protection during your search</li>
          </ul>

          <blockquote>
            <p><strong>Pro Strategy:</strong> Get pre-approved for more than you plan to spend. This gives you flexibility and negotiating power without committing you to spend the maximum.</p>
          </blockquote>
        `,
        keyTakeaways: [
          'Pre-approval gives you negotiating power',
          'Gather documents before meeting with lender',
          'Get approved for more than you plan to spend'
        ]
      },
      {
        id: 3,
        title: 'House Hunting & Closing',
        subtitle: 'From Offer to Keys',
        readTime: '4 min',
        content: `
          <h3>Making Competitive Offers</h3>
          <p>In competitive markets, your pre-approval letter is your weapon. But there are additional strategies:</p>
          
          <h4>Offer Strategy</h4>
          <ul>
            <li><strong>Financing Clause:</strong> Keep it short (5-7 days max)</li>
            <li><strong>Closing Date:</strong> Be flexible to seller's needs</li>
            <li><strong>Deposit:</strong> Larger deposits show serious intent</li>
            <li><strong>Conditions:</strong> Minimize to strengthen your offer</li>
          </ul>

          <h3>The Financing Clause Period</h3>
          <p>Once your offer is accepted, you typically have 5-7 days to finalize financing:</p>
          <ol>
            <li><strong>Property Appraisal:</strong> Lender orders to confirm value</li>
            <li><strong>Final Approval:</strong> Underwriter reviews complete file</li>
            <li><strong>Insurance Arranged:</strong> Home and mortgage insurance</li>
            <li><strong>Legal Review:</strong> Lawyer reviews all documents</li>
          </ol>

          <h3>Closing Day Preparation</h3>
          <p>The final week before closing is critical:</p>
          <ul>
            <li>Final walk-through of the property</li>
            <li>Certified funds for closing costs</li>
            <li>Home insurance policy in effect</li>
            <li>Utilities transfer arranged</li>
          </ul>

          <h3>Your First 30 Days</h3>
          <p>After getting your keys:</p>
          <ul>
            <li>Set up automatic mortgage payments</li>
            <li>Review your mortgage statement</li>
            <li>Consider accelerated payment options</li>
            <li>Build your home maintenance fund</li>
          </ul>

          <blockquote>
            <p><strong>Final Thought:</strong> Buying your first home is a marathon, not a sprint. Work with professionals who put your long-term financial health first, not just the transaction.</p>
          </blockquote>
        `,
        keyTakeaways: [
          'Strong pre-approval makes competitive offers',
          'Act quickly during financing clause period',
          'Set up systems for long-term success'
        ]
      }
    ]
  }
  // Add more playbooks here as needed
};

const PlaybookDetail = () => {
  const { playbookId } = useParams();
  const [activeChapter, setActiveChapter] = useState(1);
  
  const playbook = playbooksData[playbookId as keyof typeof playbooksData];
  
  if (!playbook) {
    return (
      <PageBackground>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <Header />
          <div className="max-w-4xl mx-auto text-center py-20">
            <h1 className="text-4xl font-anton text-design-charcoal mb-4">Playbook Not Found</h1>
            <p className="text-design-charcoal/70 mb-8">The playbook you're looking for doesn't exist.</p>
            <Link to="/playbooks" className="inline-flex items-center px-6 py-3 bg-design-gold text-white font-hk-grotesk-light rounded-lg hover:bg-design-charcoal transition-all duration-300">
              <ArrowLeft size={18} className="mr-2" />
              Back to Playbooks
            </Link>
          </div>
          <Footer />
        </div>
      </PageBackground>
    );
  }

  const currentChapter = playbook.chapters[activeChapter - 1];

  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Header />
        
        {/* Navigation */}
        <div className="max-w-6xl mx-auto mb-8">
          <Link 
            to="/playbooks" 
            className="inline-flex items-center text-design-charcoal/80 hover:text-design-plum transition-colors duration-300 font-hk-grotesk-light"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Playbooks
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              
              {/* Playbook Header */}
              <div className="mb-12">
                <div className="bg-design-cream/80 border border-design-plum/10 rounded-3xl p-10 mb-8 relative overflow-hidden backdrop-blur-sm">
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-design-plum rounded-full flex items-center justify-center shadow-2xl">
                        <span className="text-2xl text-white">{playbook.icon}</span>
                      </div>
                      <div>
                        <h1 className="text-4xl md:text-5xl font-anton font-normal text-design-charcoal premium-text">
                          {playbook.title}
                        </h1>
                        <p className="text-xl font-hk-grotesk-light text-design-plum mt-2">
                          {playbook.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    <p className="font-hk-grotesk-light text-design-charcoal/80 text-lg leading-relaxed mb-6">
                      {playbook.description}
                    </p>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center text-design-charcoal/70">
                        <Clock size={16} className="mr-2" />
                        <span className="font-hk-grotesk-light text-sm">{playbook.readTime}</span>
                      </div>
                      <div className="flex items-center text-design-charcoal/70">
                        <BookOpen size={16} className="mr-2" />
                        <span className="font-hk-grotesk-light text-sm">{playbook.chapters.length} Chapters</span>
                      </div>
                      <button className="ml-auto bg-design-gold text-white px-6 py-3 font-hk-grotesk-light font-medium rounded-lg hover:bg-design-charcoal transition-all duration-300 shadow-lg flex items-center">
                        <Download size={16} className="mr-2" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chapter Content */}
              <div className="bg-design-cream/80 border border-design-plum/10 rounded-3xl p-8 md:p-12 shadow-lg backdrop-blur-sm">
                
                {/* Chapter Header */}
                <div className="mb-8 pb-6 border-b border-design-plum/20">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 bg-design-plum rounded-full flex items-center justify-center text-sm font-hk-grotesk-light font-medium text-white">
                      {currentChapter.id}
                    </span>
                    <div>
                      <h2 className="text-3xl font-tan-ashford font-normal text-design-charcoal premium-text">
                        {currentChapter.title}
                      </h2>
                      <p className="text-lg font-hk-grotesk-light text-design-plum">
                        {currentChapter.subtitle}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center text-design-charcoal/60">
                      <Clock size={14} className="mr-1" />
                      <span className="font-hk-grotesk-light text-sm">{currentChapter.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Chapter Content */}
                <div 
                  className="prose prose-lg max-w-none font-hk-grotesk-light text-design-charcoal/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: currentChapter.content }}
                />

                {/* Key Takeaways */}
                <div className="mt-12 bg-design-sage/30 border border-design-plum/10 p-6 rounded-xl backdrop-blur-sm">
                  <h4 className="text-xl font-tan-ashford text-design-charcoal mb-4 premium-text">
                    Key Takeaways
                  </h4>
                  <ul className="space-y-3">
                    {currentChapter.keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle size={18} className="text-design-gold mr-3 mt-0.5 flex-shrink-0" />
                        <span className="font-hk-grotesk-light text-design-charcoal/80">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Chapter Navigation */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-design-plum/20">
                  <button
                    onClick={() => setActiveChapter(Math.max(1, activeChapter - 1))}
                    disabled={activeChapter === 1}
                    className="bg-design-sage/30 border border-design-plum/10 px-6 py-3 text-design-charcoal font-hk-grotesk-light rounded-lg hover:bg-design-plum/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center backdrop-blur-sm"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Previous Chapter
                  </button>
                  
                  <div className="text-center">
                    <span className="font-hk-grotesk-light text-design-charcoal/60 text-sm">
                      Chapter {activeChapter} of {playbook.chapters.length}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setActiveChapter(Math.min(playbook.chapters.length, activeChapter + 1))}
                    disabled={activeChapter === playbook.chapters.length}
                    className="bg-design-gold text-white px-6 py-3 font-hk-grotesk-light rounded-lg hover:bg-design-charcoal transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    Next Chapter
                    <ChevronRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                
                {/* Table of Contents */}
                <div className="bg-design-cream/80 border border-design-plum/10 rounded-3xl p-6 backdrop-blur-sm">
                  <h4 className="text-lg font-tan-ashford text-design-charcoal mb-4 premium-text">
                    Table of Contents
                  </h4>
                  <nav className="space-y-3">
                    {playbook.chapters.map((chapter) => (
                      <button
                        key={chapter.id}
                        onClick={() => setActiveChapter(chapter.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                          activeChapter === chapter.id
                            ? 'bg-design-gold text-white'
                            : 'hover:bg-design-plum/10 text-design-charcoal/80'
                        }`}
                      >
                        <div className="font-hk-grotesk-light font-medium text-sm mb-1">
                          Chapter {chapter.id}: {chapter.title}
                        </div>
                        <div className="font-hk-grotesk-light text-xs opacity-80">
                          {chapter.readTime}
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Quick Actions */}
                <div className="bg-design-cream/80 border border-design-plum/10 rounded-3xl p-6 backdrop-blur-sm">
                  <h4 className="text-lg font-tan-ashford text-design-charcoal mb-4 premium-text">
                    Quick Actions
                  </h4>
                  <div className="space-y-3">
                    <button className="w-full flex items-center p-3 bg-design-gold text-white rounded-lg hover:bg-design-charcoal transition-all duration-300">
                      <Download size={16} className="mr-3" />
                      <span className="font-hk-grotesk-light text-sm">Download PDF</span>
                    </button>
                    
                    <a 
                      href="https://callme.mortgagewithford.ca"
                      className="w-full flex items-center p-3 bg-design-sage/30 border border-design-plum/10 text-design-charcoal rounded-lg hover:bg-design-plum/10 transition-all duration-300 backdrop-blur-sm"
                    >
                      <ExternalLink size={16} className="mr-3" />
                      <span className="font-hk-grotesk-light text-sm">Book Consultation</span>
                    </a>
                  </div>
                </div>

                {/* Related Playbooks */}
                <div className="bg-design-cream/80 border border-design-plum/10 rounded-3xl p-6 backdrop-blur-sm">
                  <h4 className="text-lg font-tan-ashford text-design-charcoal mb-4 premium-text">
                    Related Playbooks
                  </h4>
                  <div className="space-y-3">
                    <Link to="/playbooks/volume-2" className="block p-3 rounded-lg hover:bg-design-plum/10 transition-colors duration-300">
                      <div className="font-hk-grotesk-light font-medium text-design-charcoal text-sm mb-1">Volume 2</div>
                      <div className="font-hk-grotesk-light text-design-charcoal/60 text-xs">Next in series</div>
                    </Link>
                    
                    <Link to="/playbooks/volume-3" className="block p-3 rounded-lg hover:bg-design-plum/10 transition-colors duration-300">
                      <div className="font-hk-grotesk-light font-medium text-design-charcoal text-sm mb-1">Volume 3</div>
                      <div className="font-hk-grotesk-light text-design-charcoal/60 text-xs">Advanced strategies</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Playbook Footer - Agent Information */}
        <div className="bg-design-charcoal rounded-xl p-6 mt-16 text-center">
          <p className="font-hk-grotesk-light text-design-cream text-sm">
            Andreina Ford • Mortgage Agent Level 2 • BRX Mortgage
          </p>
        </div>
        
        <Footer />
      </div>
    </PageBackground>
  );
};

export default PlaybookDetail;
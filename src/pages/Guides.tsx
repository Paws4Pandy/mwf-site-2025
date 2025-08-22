import React from 'react';
import { Download, FileText, BookOpen, Calculator, Home, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import AGlassCard from '@/components/ui/AGlassCard';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';

const guides = [
  {
    title: "First-Time Home Buyer's Guide",
    description: "Everything you need to know about buying your first home in Ontario",
    icon: Home,
    downloadUrl: "/guides/first-time-buyer-guide.pdf",
    topics: ["Down payment options", "Government programs", "Step-by-step process", "Common mistakes to avoid"]
  },
  {
    title: "Mortgage Pre-Approval Checklist",
    description: "Complete checklist of documents and information needed for pre-approval",
    icon: FileText,
    downloadUrl: "/guides/pre-approval-checklist.pdf",
    topics: ["Required documents", "Income verification", "Credit requirements", "Timeline expectations"]
  },
  {
    title: "Understanding Mortgage Rates",
    description: "Comprehensive guide to fixed vs variable rates and how to choose",
    icon: DollarSign,
    downloadUrl: "/guides/mortgage-rates-guide.pdf",
    topics: ["Fixed vs Variable", "Rate factors", "Payment calculations", "Rate negotiation tips"]
  },
  {
    title: "Mortgage Calculator Guide",
    description: "How to use mortgage calculators effectively for planning",
    icon: Calculator,
    downloadUrl: "/guides/calculator-guide.pdf",
    topics: ["Affordability calculations", "Payment schedules", "Amortization explained", "Stress test calculations"]
  },
  {
    title: "Refinancing Your Mortgage",
    description: "When and how to refinance for better rates or access equity",
    icon: BookOpen,
    downloadUrl: "/guides/refinancing-guide.pdf",
    topics: ["When to refinance", "Cost-benefit analysis", "Process overview", "Equity access options"]
  }
];

const Guides = () => {
  const handleDownload = (url: string, title: string) => {
    // For now, we'll just show an alert since the PDFs don't exist yet
    // In production, this would trigger an actual download
    alert(`Guide "${title}" will be available soon! Please contact us at hello@mortgagewithford.ca to request this guide.`);
  };

  return (
    <PageBackground>
      <Header transparent={true} />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Free Mortgage Guides
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Download our comprehensive guides to help you navigate the mortgage process with confidence.
              These resources are designed to answer your questions and simplify complex topics.
            </p>
          </div>

          {/* Success Message for Form Redirects */}
          <div className="mb-12">
            <AGlassCard className="bg-green-500/10 border-green-500/30">
              <div className="p-6 text-center">
                <p className="text-white text-lg">
                  ✅ Thank you for your submission! Browse our guides below to learn more about the mortgage process.
                </p>
              </div>
            </AGlassCard>
          </div>

          {/* Guides Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <AGlassCard key={index} className="group hover:scale-[1.02] transition-transform duration-300">
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-brand-red/20 to-muted-red/20 group-hover:from-brand-red/30 group-hover:to-muted-red/30 transition-colors">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{guide.title}</h3>
                        <p className="text-white/70">{guide.description}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white/90 mb-3">What's Included:</h4>
                      <ul className="space-y-2">
                        {guide.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-white/70">
                            <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                            <span className="text-sm">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <LiquidGlassButton
                      onClick={() => handleDownload(guide.downloadUrl, guide.title)}
                      className="w-full justify-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Guide
                    </LiquidGlassButton>
                  </div>
                </AGlassCard>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <AGlassCard>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Need Personalized Advice?
                </h2>
                <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                  While these guides provide valuable information, every mortgage situation is unique.
                  Let's discuss your specific needs and create a customized plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <LiquidGlassButton
                    onClick={() => window.location.href = 'https://callme.mortgagewithford.ca'}
                    variant="primary"
                  >
                    Book a Free Consultation
                  </LiquidGlassButton>
                  <LiquidGlassButton
                    onClick={() => window.location.href = 'mailto:hello@mortgagewithford.ca'}
                    variant="secondary"
                  >
                    Email Us Your Questions
                  </LiquidGlassButton>
                </div>
              </div>
            </AGlassCard>
          </div>
        </div>
      </div>
      
      <Footer />
    </PageBackground>
  );
};

export default Guides;
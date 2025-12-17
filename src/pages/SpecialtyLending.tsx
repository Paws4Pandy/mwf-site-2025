import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageBackground from '../components/PageBackground';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  ChevronDown, 
  Search, 
  Building2, 
  Home, 
  DollarSign, 
  Users, 
  Briefcase,
  Heart,
  HardHat,
  TrendingUp,
  Shield,
  FileText,
  Check
} from 'lucide-react';
import { CONTACT_CONFIG } from '../assets/config/contact';
import { externalLinks } from '../assets/config/links';

interface Lender {
  name: string;
  productTypes: string[];
  areasServed: string[];
  specialties: string[];
  popularProducts: string[];
  category: string[];
}

const lenders: Lender[] = [
  {
    name: "Alternative/Private Lenders",
    productTypes: ["Alternative", "Private", "Equity"],
    areasServed: ["Ontario"],
    specialties: ["Bad Credit", "Quick Close", "Proposal"],
    popularProducts: ["Private", "Equity"],
    category: ["bad-credit", "private", "debt-consolidation"]
  }
];

const mortgageTypes = [
  { name: "Fixed Rate Mortgages", description: "Lock in your rate for peace of mind", icon: Shield },
  { name: "Variable Rate Mortgages", description: "Flexibility with market-based rates", icon: TrendingUp },
  { name: "High-ratio Mortgages", description: "Purchase with less than 20% down", icon: Home },
  { name: "Reverse Mortgages", description: "Access your home equity in retirement", icon: DollarSign },
  { name: "Self-employed/Alt-doc", description: "Flexible income verification", icon: Briefcase },
  { name: "Newcomer/Non-resident", description: "New to Canada mortgage solutions", icon: Users },
  { name: "Second Homes/Vacation", description: "Finance your getaway property", icon: Heart },
  { name: "Construction/Renovation", description: "Build or improve your dream home", icon: HardHat },
  { name: "Bridge/Short-term", description: "Temporary financing solutions", icon: Building2 },
  { name: "Private & Alternative", description: "Non-traditional lending options", icon: FileText }
];

const filterCategories = [
  { id: "self-employed", label: "Self-employed", icon: Briefcase },
  { id: "professional", label: "Medical/Professional", icon: Shield },
  { id: "newcomer", label: "Newcomer", icon: Users },
  { id: "insured", label: "Insured/High-ratio", icon: Home },
  { id: "bad-credit", label: "Bad Credit/Bankruptcy", icon: TrendingUp },
  { id: "debt-consolidation", label: "Paying off debt", icon: DollarSign },
  { id: "construction", label: "Construction/Renovation", icon: HardHat },
  { id: "reverse", label: "Reverse/HELOC", icon: Heart },
  { id: "investment", label: "Investment Property", icon: Building2 },
  { id: "private", label: "Private Lending", icon: FileText }
];

const faqs = [
  {
    question: "What documents do I need for self-employed applications?",
    answer: "Self-employed applicants typically need 2 years of tax returns, Notice of Assessments, bank statements, and proof of business registration. Some lenders offer stated income programs with alternative documentation."
  },
  {
    question: "Can I get a mortgage with recent bankruptcy?",
    answer: "Yes, through private lenders and alternative financing. Generally, you'll need to be discharged for at least 1 year and have re-established credit. We work with lenders specializing in these situations."
  },
  {
    question: "What is a reverse mortgage and who qualifies?",
    answer: "A reverse mortgage lets homeowners 55+ access up to 55% of their home's value without monthly payments. You must own your home and it must be your primary residence."
  },
  {
    question: "How does insured mortgage work for first-time buyers?",
    answer: "Insured mortgages allow purchases with as little as 5% down. The insurance protects the lender and is added to your mortgage amount. First-time buyers may also qualify for incentive programs."
  },
  {
    question: "Which lenders serve new Canadians or professionals?",
    answer: "Many major banks and financial institutions have newcomer programs. Professional mortgages with preferred rates are available through various lenders for doctors, lawyers, and other professionals."
  },
  {
    question: "What is the difference between private and conventional lending?",
    answer: "Conventional lenders (banks, credit unions) offer lower rates but stricter qualification. Private lenders provide faster approvals and flexible criteria but at higher rates, typically for short-term solutions."
  }
];

export default function SpecialtyLending() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [expandedLender, setExpandedLender] = useState<string | null>(null);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredLenders = lenders.filter(lender => {
    const matchesSearch = searchTerm === '' || 
      lender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lender.productTypes.some(p => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
      lender.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilters = selectedFilters.length === 0 ||
      selectedFilters.some(filter => lender.category.includes(filter));

    return matchesSearch && matchesFilters;
  });

  return (
    <PageBackground>
      <Header />
      
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display text-pure-white mb-6">
              Find the Right Ontario Mortgage Lender
            </h1>
            <p className="text-xl text-light-azure mb-8 max-w-3xl mx-auto">
              Filter by specialty—self-employed, new Canadians, bad credit, and more. 
              Access our network of 50+ trusted lenders tailored to your unique needs.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-brand-red hover:bg-muted-red text-pure-white"
                onClick={() => document.getElementById('lender-directory')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Lenders
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-light-azure text-pure-white hover:bg-hunter-green/20"
                onClick={() => window.open(externalLinks.bookACall, '_blank')}
              >
                Get Expert Advice
              </Button>
            </div>
          </div>
        </section>

        {/* Mortgage Types Section */}
        <section className="py-16 px-4 bg-hunter-green/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display text-pure-white mb-12 text-center">
              All Types of Mortgages Offered
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mortgageTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <Card key={index} className="bg-hunter-green/20 border-light-azure/20 hover:bg-hunter-green/30 transition-all cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Icon className="w-8 h-8 text-brand-red" />
                        <CardTitle className="text-pure-white text-lg">{type.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-light-azure">
                        {type.description}
                      </CardDescription>
                      <Button 
                        variant="link" 
                        className="text-brand-red p-0 mt-2"
                        onClick={() => navigate('/contact')}
                      >
                        Learn more →
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lender Directory with Filters */}
        <section id="lender-directory" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-display text-pure-white mb-8 text-center">
              Lender Partners Directory
            </h2>
            
            {/* Search and Filters */}
            <div className="mb-8 space-y-6">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-azure w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search lenders, products, or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-hunter-green/20 border-light-azure/20 text-pure-white placeholder:text-light-azure/50"
                />
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {filterCategories.map(filter => {
                  const Icon = filter.icon;
                  const isSelected = selectedFilters.includes(filter.id);
                  return (
                    <Button
                      key={filter.id}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter(filter.id)}
                      className={isSelected 
                        ? "bg-brand-red hover:bg-muted-red text-pure-white" 
                        : "border-light-azure/20 text-light-azure hover:bg-hunter-green/20"
                      }
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {filter.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Lenders Table/Cards */}
            <div className="space-y-4">
              {filteredLenders.map((lender, index) => (
                <Card 
                  key={index} 
                  className="bg-hunter-green/20 border-light-azure/20 overflow-hidden"
                >
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => setExpandedLender(expandedLender === lender.name ? null : lender.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-pure-white text-xl">{lender.name}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {lender.specialties.slice(0, 3).map((specialty, i) => (
                            <Badge key={i} variant="secondary" className="bg-brand-red/20 text-light-azure">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-light-azure transition-transform ${
                          expandedLender === lender.name ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </CardHeader>
                  {expandedLender === lender.name && (
                    <CardContent className="border-t border-light-azure/10">
                      <div className="grid md:grid-cols-2 gap-6 mt-4">
                        <div>
                          <h4 className="text-brand-red font-semibold mb-2">Product Types</h4>
                          <ul className="space-y-1">
                            {lender.productTypes.map((product, i) => (
                              <li key={i} className="text-light-azure flex items-center gap-2">
                                <Check className="w-4 h-4 text-brand-red" />
                                {product}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-brand-red font-semibold mb-2">Popular Products</h4>
                          <ul className="space-y-1">
                            {lender.popularProducts.map((product, i) => (
                              <li key={i} className="text-light-azure flex items-center gap-2">
                                <Check className="w-4 h-4 text-brand-red" />
                                {product}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-brand-red font-semibold mb-2">Areas Served</h4>
                          <p className="text-light-azure">{lender.areasServed.join(', ')}</p>
                        </div>
                        <div>
                          <h4 className="text-brand-red font-semibold mb-2">Specialties</h4>
                          <p className="text-light-azure">{lender.specialties.join(', ')}</p>
                        </div>
                      </div>
                      <Button 
                        className="mt-4 bg-brand-red hover:bg-muted-red text-pure-white"
                        onClick={() => navigate('/contact')}
                      >
                        Connect for {lender.name} Products
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {filteredLenders.length === 0 && (
              <Card className="bg-hunter-green/20 border-light-azure/20 p-8">
                <p className="text-center text-light-azure">
                  No lenders found matching your criteria. 
                  <Button 
                    variant="link" 
                    className="text-brand-red"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedFilters([]);
                    }}
                  >
                    Clear filters
                  </Button>
                </p>
              </Card>
            )}
          </div>
        </section>

        {/* Featured Products by Category */}
        <section className="py-16 px-4 bg-hunter-green/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display text-pure-white mb-12 text-center">
              Featured Products by Category
            </h2>
            <Tabs defaultValue="self-employed" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-hunter-green/20 p-2">
                <TabsTrigger value="self-employed">Self-Employed</TabsTrigger>
                <TabsTrigger value="bad-credit">Bad Credit</TabsTrigger>
                <TabsTrigger value="newcomers">Newcomers</TabsTrigger>
                <TabsTrigger value="seniors">Seniors</TabsTrigger>
              </TabsList>
              
              <TabsContent value="self-employed" className="mt-6">
                <Card className="bg-hunter-green/20 border-light-azure/20">
                  <CardHeader>
                    <CardTitle className="text-pure-white">Self-Employed Solutions</CardTitle>
                    <CardDescription className="text-light-azure">
                      Alternative documentation and stated income programs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-light-azure">
                      <li>• Alt-doc programs with bank statement verification</li>
                      <li>• Stated income options for established businesses</li>
                      <li>• Flexible qualification from alternative lenders</li>
                      <li>• Up to 90% financing available</li>
                    </ul>
                    <Button className="mt-4 bg-brand-red hover:bg-muted-red" onClick={() => navigate('/contact')}>
                      Get Self-Employed Mortgage
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bad-credit" className="mt-6">
                <Card className="bg-hunter-green/20 border-light-azure/20">
                  <CardHeader>
                    <CardTitle className="text-pure-white">Bad Credit & Bankruptcy Recovery</CardTitle>
                    <CardDescription className="text-light-azure">
                      Private lending and equity solutions for credit challenges
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-light-azure">
                      <li>• Private mortgage options starting at 7.99%</li>
                      <li>• Post-bankruptcy financing (1 year after discharge)</li>
                      <li>• Consumer proposal friendly lenders</li>
                      <li>• Quick approvals from private and alternative lenders</li>
                    </ul>
                    <Button className="mt-4 bg-brand-red hover:bg-muted-red" onClick={() => navigate('/contact')}>
                      Explore Bad Credit Options
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="newcomers" className="mt-6">
                <Card className="bg-hunter-green/20 border-light-azure/20">
                  <CardHeader>
                    <CardTitle className="text-pure-white">New to Canada Programs</CardTitle>
                    <CardDescription className="text-light-azure">
                      Special programs for newcomers and non-residents
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-light-azure">
                      <li>• 5% down payment options for newcomers</li>
                      <li>• No Canadian credit history required</li>
                      <li>• Programs from major financial institutions</li>
                      <li>• International income accepted</li>
                    </ul>
                    <Button className="mt-4 bg-brand-red hover:bg-muted-red" onClick={() => navigate('/contact')}>
                      New to Canada Mortgage
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seniors" className="mt-6">
                <Card className="bg-hunter-green/20 border-light-azure/20">
                  <CardHeader>
                    <CardTitle className="text-pure-white">Reverse Mortgages for 55+</CardTitle>
                    <CardDescription className="text-light-azure">
                      Access your home equity without monthly payments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-light-azure">
                      <li>• Access up to 55% of your home's value</li>
                      <li>• No monthly payments required</li>
                      <li>• Available from specialized reverse mortgage lenders</li>
                      <li>• Stay in your home, maintain ownership</li>
                    </ul>
                    <Button className="mt-4 bg-brand-red hover:bg-muted-red" onClick={() => navigate('/contact')}>
                      Learn About Reverse Mortgages
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display text-pure-white mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-hunter-green/20 border-light-azure/20">
                  <CardHeader>
                    <CardTitle className="text-pure-white text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-light-azure">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-muted-red to-brand-red">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display text-pure-white mb-6">
              Ready to Discuss Your Best-Fit Mortgage?
            </h2>
            <p className="text-xl text-pure-white/90 mb-8">
              Connect with a mortgage expert who understands your unique situation
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-pure-white text-muted-red hover:bg-light-azure"
                onClick={() => window.open(externalLinks.bookACall, '_blank')}
              >
                Book a Consultation
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-pure-white text-pure-white hover:bg-pure-white/10"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </Button>
            </div>
            <p className="mt-6 text-pure-white/80">
              Fast follow-up • Local expertise • {CONTACT_CONFIG.phone}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </PageBackground>
  );
}
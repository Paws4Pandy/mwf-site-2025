import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Search, Filter } from 'lucide-react';
import PageBackground from '@/components/PageBackground';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'First-Time Home Buyer\'s Complete Guide',
    excerpt: 'Everything you need to know about buying your first home in Canada, from pre-approval to closing.',
    category: 'First-Time Buyers',
    readTime: '8 min read',
    date: 'January 15, 2025',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    featured: true
  },
  {
    id: '2',
    title: 'Understanding Mortgage Pre-Approval',
    excerpt: 'Learn why pre-approval is crucial and how to strengthen your application for better rates.',
    category: 'Mortgage Basics',
    readTime: '5 min read',
    date: 'January 12, 2025',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop'
  },
  {
    id: '3',
    title: 'Fixed vs Variable Rate Mortgages',
    excerpt: 'Discover the pros and cons of each mortgage type to make an informed decision.',
    category: 'Mortgage Types',
    readTime: '6 min read',
    date: 'January 10, 2025',
    image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&h=600&fit=crop'
  },
  {
    id: '4',
    title: 'How to Improve Your Credit Score',
    excerpt: 'Practical tips to boost your credit score before applying for a mortgage.',
    category: 'Credit & Finance',
    readTime: '7 min read',
    date: 'January 8, 2025',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'
  },
  {
    id: '5',
    title: 'The Hidden Costs of Homeownership',
    excerpt: 'Beyond the mortgage: understanding all the costs involved in owning a home.',
    category: 'Homeownership',
    readTime: '10 min read',
    date: 'January 5, 2025',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
  },
  {
    id: '6',
    title: 'Mortgage Renewal Strategies',
    excerpt: 'How to negotiate better terms when your mortgage comes up for renewal.',
    category: 'Renewals',
    readTime: '6 min read',
    date: 'January 3, 2025',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop'
  }
];

const categories = [
  'All Posts',
  'First-Time Buyers',
  'Mortgage Basics',
  'Mortgage Types',
  'Credit & Finance',
  'Homeownership',
  'Renewals',
  'Market Updates'
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageBackground>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative py-20 px-4">
          <div className="container mx-auto max-w-7xl text-center">
            <h1 className="font-anton text-6xl md:text-8xl text-pure-white mb-4 tracking-wide">
              MORTGAGE INSIGHTS
            </h1>
            <p className="font-hammersmith text-xl text-light-azure/90 max-w-2xl mx-auto">
              Your source for mortgage tips, market updates, and homebuying guidance
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="sticky top-0 z-40 backdrop-blur-xl bg-hunter-green/20 border-y border-light-azure/10">
          <div className="container mx-auto max-w-7xl px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-azure/60" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-pure-white/5 backdrop-blur-md border border-light-azure/20 rounded-full text-pure-white placeholder-light-azure/40 focus:outline-none focus:border-light-azure/40 transition-all"
                />
              </div>

              {/* Category Pills */}
              <div className="flex gap-2 flex-wrap justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-1.5 rounded-full font-hammersmith text-sm transition-all ${
                      selectedCategory === category
                        ? 'bg-muted-red text-pure-white'
                        : 'bg-pure-white/5 backdrop-blur-md text-light-azure hover:bg-pure-white/10 border border-light-azure/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="container mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className={`group relative overflow-hidden rounded-2xl ${
                  post.featured && index === 0 ? 'md:col-span-2 lg:col-span-2 row-span-2' : ''
                }`}
              >
                {/* Liquid Glass Card */}
                <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-pure-white/10 via-pure-white/5 to-transparent border border-light-azure/20 rounded-2xl overflow-hidden transition-all duration-500 hover:border-light-azure/40 hover:shadow-2xl hover:shadow-light-azure/10">
                  {/* Glass Reflection Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pure-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Image Section */}
                  <div className={`relative overflow-hidden ${
                    post.featured && index === 0 ? 'h-80' : 'h-48'
                  }`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-hunter-green/80 via-hunter-green/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-muted-red/90 backdrop-blur-md text-pure-white text-xs font-hammersmith rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={`p-6 ${post.featured && index === 0 ? 'lg:p-8' : ''}`}>
                    <h3 className={`font-hammersmith text-pure-white mb-3 leading-tight ${
                      post.featured && index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                    }`}>
                      {post.title}
                    </h3>
                    
                    <p className={`text-light-azure/80 font-opensauce mb-4 ${
                      post.featured && index === 0 ? 'text-base lg:text-lg' : 'text-sm'
                    }`}>
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-light-azure/10">
                      <div className="flex items-center gap-4 text-light-azure/60 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                        <span>{post.date}</span>
                      </div>
                      
                      {/* Read More Link */}
                      <Link
                        to={`/blog/${post.id}`}
                        className="flex items-center gap-1 text-brand-red hover:text-light-crimson transition-colors group/link"
                      >
                        <span className="font-hammersmith text-sm">Read</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-light-azure/20 via-brand-red/20 to-light-azure/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-pure-white/10 to-pure-white/5 backdrop-blur-xl border border-light-azure/30 rounded-full text-pure-white font-hammersmith hover:border-light-azure/50 hover:shadow-lg hover:shadow-light-azure/20 transition-all duration-300">
              Load More Articles
            </button>
          </div>

          {/* Newsletter Section */}
          <div className="mt-20 relative">
            <div className="backdrop-blur-xl bg-gradient-to-br from-muted-red/20 via-pure-white/5 to-transparent border border-light-azure/20 rounded-3xl p-8 lg:p-12 text-center">
              <h2 className="font-abril text-4xl text-pure-white mb-4">
                Stay Informed
              </h2>
              <p className="font-opensauce text-light-azure/80 max-w-2xl mx-auto mb-8">
                Get the latest mortgage insights, market updates, and exclusive tips delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 bg-pure-white/10 backdrop-blur-md border border-light-azure/30 rounded-full text-pure-white placeholder-light-azure/50 focus:outline-none focus:border-light-azure/50"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-muted-red hover:bg-brand-red text-pure-white font-hammersmith rounded-full transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}
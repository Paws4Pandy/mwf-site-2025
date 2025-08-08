
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageBackground>
      {/* Content container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Header />
        
        <div className="bg-design-cream/20 backdrop-blur-sm border border-design-plum/30 rounded-lg p-8 mb-10 shadow-sm max-w-md mx-auto text-center">
          <h1 className="text-4xl font-league-spartan font-bold mb-4 text-pure-black">404</h1>
          <p className="text-xl text-hunter-green/80 mb-6 font-opensauce">Oops! Page not found</p>
          <a href="/" className="inline-block px-6 py-3 rounded border-2 border-hunter-green text-pure-white bg-hunter-green hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300 font-medium font-opensauce">
            Return to Home
          </a>
        </div>
        
        <Footer />
      </div>
    </PageBackground>
  );
};

export default NotFound;
